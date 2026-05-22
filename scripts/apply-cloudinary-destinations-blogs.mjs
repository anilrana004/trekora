/**
 * Point destinations + blogs at Cloudinary (trek-matched heroes where possible).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadTreks() {
  const text = fs.readFileSync(path.join(ROOT, "src/frontend/src/data/treks.ts"), "utf8");
  const map = {};
  const re = /slug: "([^"]+)"[\s\S]*?images: \[([\s\S]*?)\],/g;
  let m;
  while ((m = re.exec(text))) {
    const imgs = [...m[2].matchAll(/"(https:\/\/res\.cloudinary[^"]+)"/g)].map((x) => x[1]);
    if (imgs.length) map[m[1]] = imgs;
  }
  return map;
}

function trekForBlogSlug(slug, trekMap) {
  for (const trekSlug of Object.keys(trekMap)) {
    const key = trekSlug.replace(/-trek$/, "").replace(/-/g, "");
    if (slug.includes(trekSlug) || slug.replace(/-/g, "").includes(key)) {
      return trekMap[trekSlug];
    }
  }
  return null;
}

function loadPool() {
  const media = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/frontend/src/data/cloudinary-media.json"), "utf8"),
  );
  const urls = [];
  for (const u of Object.values(media.treks || {})) urls.push(...u);
  for (const u of Object.values(media.yatras || {})) urls.push(...u);
  for (const u of media.gallery || []) urls.push(u);
  for (const u of media.unmapped || []) if (u.url) urls.push(u.url);
  return [...new Set(urls)].filter((u) => u.includes("cloudinary") && !u.includes("samples"));
}

async function main() {
  const trekMap = loadTreks();
  let pool = [];
  try {
    pool = loadPool();
  } catch {
    pool = Object.values(trekMap).flat();
  }
  let pi = 0;
  const next = () => pool[pi++ % pool.length];

  let destContent = fs.readFileSync(
    path.join(ROOT, "src/frontend/src/data/destinations.ts"),
    "utf8",
  );
  destContent = destContent.replace(
    /image:\s*\n\s*"https:\/\/images\.unsplash\.com[^"]*"/g,
    () => `image:\n      "${next()}"`,
  );

  let blogContent = fs.readFileSync(path.join(ROOT, "src/frontend/src/data/blogs.ts"), "utf8");
  const blogRe =
    /slug: "([^"]+)"[\s\S]*?heroImage:\s*\n\s*"([^"]+)"[\s\S]*?images: \[([\s\S]*?)\],/g;
  let m;
  const replacements = [];
  while ((m = blogRe.exec(blogContent))) {
    const slug = m[1];
    const matched = trekForBlogSlug(slug, trekMap);
    const hero = matched?.[0] ?? next();
    const images = (matched ?? [hero, next(), next(), next(), next()]).slice(0, 5);
    replacements.push({ slug, hero, images });
  }

  for (const { slug, hero, images } of replacements) {
    const slugIdx = blogContent.indexOf(`slug: "${slug}"`);
    if (slugIdx < 0) continue;
    const blockStart = blogContent.lastIndexOf("{", slugIdx);
    const blockEnd = blogContent.indexOf("\n  },", slugIdx);
    let block = blogContent.slice(blockStart, blockEnd);
    block = block.replace(/heroImage:\s*\n\s*"[^"]*"/, `heroImage:\n      "${hero}"`);
    const imgLines = images.map((u) => `      "${u}",`).join("\n");
    block = block.replace(/images: \[[\s\S]*?\],/, `images: [\n${imgLines}\n    ],`);
    block = block.replace(
      /authorImage:\s*\n\s*"https:\/\/images\.unsplash[^"]*"/,
      `authorImage:\n      "${hero}"`,
    );
    blogContent = blogContent.slice(0, blockStart) + block + blogContent.slice(blockEnd);
  }

  blogContent = blogContent.replace(
    /"https:\/\/images\.unsplash\.com[^"]*"/g,
    () => `"${next()}"`,
  );

  fs.writeFileSync(path.join(ROOT, "src/frontend/src/data/destinations.ts"), destContent);
  fs.writeFileSync(path.join(ROOT, "src/frontend/src/data/blogs.ts"), blogContent);
  console.log("[apply] destinations + blogs updated");
}

main();
