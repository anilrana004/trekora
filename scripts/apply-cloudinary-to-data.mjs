/**
 * Maps Cloudinary trek/yatra photos onto data files (excludes Cloudinary demo samples).
 * Run: node scripts/apply-cloudinary-to-data.mjs [--dry-run]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, "src", ".env");
const DRY = process.argv.includes("--dry-run");

const SAMPLE_PREFIXES = ["samples/", "cld-sample", "upscale-face"];
const SAMPLE_IDS = new Set([
  "sample",
  "sample.jpg",
  "sample.png",
]);

function loadEnv(filePath) {
  const env = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

function isRealTrekMedia(publicId) {
  if (SAMPLE_PREFIXES.some((p) => publicId.startsWith(p) || publicId.includes(p))) {
    return false;
  }
  if (SAMPLE_IDS.has(publicId) || publicId.endsWith("/sample")) return false;
  if (publicId.startsWith("trekora/")) return true;
  // Legacy uploads: random hash id at root (e.g. qs0zitesubzqzagtwzee)
  const leaf = publicId.split("/").pop() ?? publicId;
  return /^[a-z0-9_-]{8,}$/i.test(leaf) && !leaf.includes("logo");
}

function publicIdFromUrl(url) {
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.(?:jpg|jpeg|png|webp|avif|svg)/i);
  return m ? m[1] : null;
}

async function fetchAllImages(env) {
  const cloud = env.VITE_CLOUDINARY_CLOUD_NAME || "ddbcauxef";
  const auth = Buffer.from(`${env.CLOUDINARY_API_KEY}:${env.CLOUDINARY_API_SECRET}`).toString("base64");
  const all = [];
  let cursor;
  do {
    const params = new URLSearchParams({
      type: "upload",
      max_results: "500",
      ...(cursor ? { next_cursor: cursor } : {}),
    });
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/resources/image?${params}`,
      { headers: { Authorization: `Basic ${auth}` } },
    );
    const page = await res.json();
    all.push(...(page.resources || []));
    cursor = page.next_cursor;
  } while (cursor);
  return all
    .filter((r) => isRealTrekMedia(r.public_id))
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

function clusterByTime(resources, gapSec = 600) {
  const clusters = [];
  let current = [];
  for (const r of resources) {
    if (current.length === 0) {
      current.push(r);
      continue;
    }
    const prev = new Date(current[current.length - 1].created_at).getTime();
    const cur = new Date(r.created_at).getTime();
    if (cur - prev > gapSec * 1000) {
      clusters.push(current);
      current = [r];
    } else {
      current.push(r);
    }
  }
  if (current.length) clusters.push(current);
  return clusters.filter((c) => c.length >= 1);
}

function parseTreks(tsContent) {
  const treks = [];
  const re =
    /\{\s*id:\s*(\d+),[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?image:\s*\n\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\],/g;
  let m;
  while ((m = re.exec(tsContent))) {
    const imagesBlock = m[4];
    const imgs = [...imagesBlock.matchAll(/"(https:\/\/[^"]+)"/g)].map((x) => x[1]);
    treks.push({
      id: Number(m[1]),
      slug: m[2],
      image: m[3],
      images: imgs.length ? imgs : [m[3]],
    });
  }
  return treks;
}

function parseYatras(tsContent) {
  const yatras = [];
  const re =
    /\{\s*id:\s*(\d+),[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?image:\s*\n\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\],/g;
  let m;
  while ((m = re.exec(tsContent))) {
    const imagesBlock = m[4];
    const imgs = [...imagesBlock.matchAll(/"(https:\/\/[^"]+)"/g)].map((x) => x[1]);
    yatras.push({
      id: Number(m[1]),
      slug: m[2],
      image: m[3],
      images: imgs.length ? imgs : [m[3]],
    });
  }
  return yatras;
}

function isValidUrl(url) {
  if (!url.includes("res.cloudinary.com")) return false;
  const pid = publicIdFromUrl(url);
  return pid ? isRealTrekMedia(pid) : false;
}

function replaceEntityImages(content, slug, image, images) {
  const slugIdx = content.indexOf(`slug: "${slug}"`);
  if (slugIdx < 0) return content;
  const blockStart = content.lastIndexOf("{", slugIdx);
  const blockEnd = content.indexOf("\n  },", slugIdx);
  if (blockEnd < 0) return content;
  let block = content.slice(blockStart, blockEnd);
  const imgLines = images.map((u) => `      "${u}",`).join("\n");
  block = block.replace(/image:\s*\n\s*"[^"]*"/, `image:\n      "${image}"`);
  block = block.replace(/images:\s*\[[\s\S]*?\],/, `images: [\n${imgLines}\n    ],`);
  return content.slice(0, blockStart) + block + content.slice(blockEnd);
}

function buildSlugFolderMap(resources) {
  const map = {};
  for (const r of resources) {
    const parts = r.public_id.split("/");
    if (parts[0] === "trekora" && parts[1] === "treks" && parts[2]) {
      if (!map[trekSlug(parts[2])]) map[trekSlug(parts[2])] = [];
      map[parts[2]].push(r.secure_url);
    }
    if (parts[0] === "trekora" && parts[1] === "yatras" && parts[2]) {
      if (!map[`yatra:${parts[2]}`]) map[`yatra:${parts[2]}`] = [];
      map[`yatra:${parts[2]}`].push(r.secure_url);
    }
  }
  return map;
}

function trekSlug(s) {
  return s;
}

function urlsFromCluster(cluster) {
  return [...new Set(cluster.map((r) => r.secure_url))];
}

function findClusterByAnchor(clusters, publicId) {
  return clusters.find((c) => c.some((r) => r.public_id === publicId));
}

async function main() {
  const env = loadEnv(ENV_PATH);
  const allResources = await fetchAllImages(env);
  console.log(`[apply] ${allResources.length} real media assets (samples excluded)`);

  const folderMap = buildSlugFolderMap(allResources);
  const flatResources = allResources.filter((r) => !r.public_id.startsWith("trekora/"));
  const clusters = clusterByTime(flatResources, 600);
  console.log(`[apply] ${clusters.length} upload batches`);

  const treksPath = path.join(ROOT, "src/frontend/src/data/treks.ts");
  const yatrasPath = path.join(ROOT, "src/frontend/src/data/yatras.ts");
  const galleryPath = path.join(ROOT, "src/frontend/src/data/gallery.ts");

  let treksContent = fs.readFileSync(treksPath, "utf8");
  let yatrasContent = fs.readFileSync(yatrasPath, "utf8");

  const treks = parseTreks(treksContent);
  const yatras = parseYatras(yatrasContent);

  const usedClusterIndexes = new Set();
  let trekUpdated = 0;

  for (const trek of treks) {
    let urls;

    if (folderMap[trek.slug]?.length) {
      urls = [
        ...new Set([
          ...folderMap[trek.slug],
          ...trek.images.filter(isValidUrl),
        ]),
      ];
    } else if (isValidUrl(trek.image) && !trek.image.includes("unsplash")) {
      // Keep curated Cloudinary sets already in the repo
      urls = [...new Set(trek.images.filter(isValidUrl))];
      if (!urls.length) urls = [trek.image];
      const pid = publicIdFromUrl(trek.image);
      const batch = findClusterByAnchor(clusters, pid);
      if (batch) usedClusterIndexes.add(clusters.indexOf(batch));
    } else if (trek.image.includes("unsplash") || !isValidUrl(trek.image)) {
      const idx = clusters.findIndex(
        (c, i) => !usedClusterIndexes.has(i) && c.length >= 2,
      );
      if (idx < 0) {
        const idx2 = clusters.findIndex((c, i) => !usedClusterIndexes.has(i));
        if (idx2 < 0) continue;
        usedClusterIndexes.add(idx2);
        urls = urlsFromCluster(clusters[idx2]).slice(0, 6);
      } else {
        usedClusterIndexes.add(idx);
        urls = urlsFromCluster(clusters[idx]).slice(0, 6);
      }
    } else {
      continue;
    }

    if (!urls?.length) continue;
    treksContent = replaceEntityImages(treksContent, trek.slug, urls[0], urls.slice(0, 6));
    trekUpdated++;
  }

  let yatraUpdated = 0;
  const yatraClusters = clusters.filter((_, i) => !usedClusterIndexes.has(i));
  let yIdx = 0;

  for (const yatra of yatras) {
    const key = `yatra:${yatra.slug}`;
    let urls;

    if (folderMap[key]?.length) {
      urls = [...new Set(folderMap[key])];
    } else if (isValidUrl(yatra.image) && !yatra.image.includes("unsplash")) {
      continue;
    } else if (yatra.image.includes("unsplash")) {
      const batch = yatraClusters[yIdx++];
      if (!batch) continue;
      urls = urlsFromCluster(batch).slice(0, 6);
    } else continue;

    if (!urls?.length) continue;
    yatrasContent = replaceEntityImages(yatrasContent, yatra.slug, urls[0], urls);
    yatraUpdated++;
  }

  const trekNames = Object.fromEntries(treks.map((t) => [t.slug, t]));
  const photoPool = allResources.map((r) => r.secure_url);
  const categories = ["Uttarakhand", "Himachal", "Treks", "Yatras", "Sunrises", "Snow"];
  const galleryItems = photoPool.slice(0, 60).map((src, i) => {
    const trek = treks[i % treks.length];
    return {
      id: i + 1,
      src,
      title: trek?.name ?? `Himalayan trek ${i + 1}`,
      category: categories[i % categories.length],
      credit: "Trekora",
    };
  });

  let galleryContent = fs.readFileSync(galleryPath, "utf8");
  const galleryBody = galleryItems
    .map(
      (g) => `  {
    id: ${g.id},
    src: "${g.src}",
    title: "${g.title.replace(/"/g, '\\"')}",
    category: "${g.category}",
    credit: "${g.credit}",
  },`,
    )
    .join("\n");
  galleryContent = galleryContent.replace(
    /export const GALLERY_ITEMS: GalleryItem\[\] = \[[\s\S]*?\];/,
    `export const GALLERY_ITEMS: GalleryItem[] = [\n${galleryBody}\n];`,
  );

  console.log(`[apply] treks: ${trekUpdated}, yatras: ${yatraUpdated}, gallery: ${galleryItems.length}`);

  if (DRY) {
    console.log("[apply] dry-run");
    return;
  }

  fs.writeFileSync(treksPath, treksContent);
  fs.writeFileSync(yatrasPath, yatrasContent);
  fs.writeFileSync(galleryPath, galleryContent);
  console.log("[apply] done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
