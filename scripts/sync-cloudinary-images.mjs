/**
 * Lists Cloudinary images and builds slug → URL maps for Trekora data files.
 * Usage: node scripts/sync-cloudinary-images.mjs
 * Reads credentials from trekora/src/.env
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ENV_PATH = path.join(ROOT, "src", ".env");
const OUT_PATH = path.join(ROOT, "src", "frontend", "src", "data", "cloudinary-media.json");

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function cloudinaryList(env, prefix, nextCursor) {
  const cloud = env.VITE_CLOUDINARY_CLOUD_NAME || "ddbcauxef";
  const key = env.CLOUDINARY_API_KEY;
  const secret = env.CLOUDINARY_API_SECRET;
  if (!key || !secret) throw new Error("Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET in src/.env");

  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const params = new URLSearchParams({
    type: "upload",
    prefix,
    max_results: "500",
    ...(nextCursor ? { next_cursor: nextCursor } : {}),
  });
  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?${params}`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary API ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

async function listAllWithPrefix(env, prefix) {
  const all = [];
  let cursor;
  do {
    const page = await cloudinaryList(env, prefix, cursor);
    all.push(...(page.resources || []));
    cursor = page.next_cursor;
  } while (cursor);
  return all;
}

/** Also list root-level uploads (legacy random public_ids used in treks.ts) */
async function listAllImages(env) {
  const prefixes = [
    "trekora/",
    "eternawings/",
    "eterna/",
  ];
  const byId = new Map();
  for (const prefix of prefixes) {
    try {
      const items = await listAllWithPrefix(env, prefix);
      for (const r of items) byId.set(r.public_id, r);
    } catch (e) {
      console.warn(`[warn] prefix "${prefix}":`, e.message);
    }
  }
  // Unprefixed bulk (first 500 newest) — catches legacy uploads
  try {
    let cursor;
    do {
      const cloud = env.VITE_CLOUDINARY_CLOUD_NAME || "ddbcauxef";
      const key = env.CLOUDINARY_API_KEY;
      const secret = env.CLOUDINARY_API_SECRET;
      const auth = Buffer.from(`${key}:${secret}`).toString("base64");
      const params = new URLSearchParams({
        type: "upload",
        max_results: "500",
        ...(cursor ? { next_cursor: cursor } : {}),
      });
      const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?${params}`;
      const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
      const page = await res.json();
      for (const r of page.resources || []) {
        if (!byId.has(r.public_id)) byId.set(r.public_id, r);
      }
      cursor = page.next_cursor;
    } while (cursor);
  } catch (e) {
    console.warn("[warn] root list:", e.message);
  }
  return [...byId.values()];
}

function secureUrl(resource) {
  return resource.secure_url;
}

function extractSlugFromPublicId(publicId) {
  const parts = publicId.split("/");
  // trekora/treks/roopkund-trek/01
  if (parts.length >= 3) {
    const folder = parts[1];
    if (["treks", "yatras", "destinations", "hero", "gallery", "blogs", "team"].includes(folder)) {
      return { kind: folder, slug: parts[2], publicId };
    }
  }
  // trekora/treks/roopkund-trek
  if (parts.length >= 3 && parts[0] === "trekora") {
    return { kind: parts[1], slug: parts[2], publicId };
  }
  // filename slug: roopkund-trek-cover
  const last = parts[parts.length - 1];
  const m = last.match(/^([a-z0-9-]+)-(cover|hero|main|\d+)$/i);
  if (m) return { kind: "guess", slug: m[1], publicId };
  if (last.includes("-trek") || last.includes("-yatra")) {
    return { kind: "guess", slug: slugify(last.replace(/-(cover|hero|main|\d+)$/i, "")), publicId };
  }
  return null;
}

function groupBySlug(resources) {
  const treks = {};
  const yatras = {};
  const destinations = {};
  const hero = [];
  const gallery = [];
  const blogs = {};
  const team = [];
  const unmapped = [];

  for (const r of resources) {
    const url = secureUrl(r);
    const meta = extractSlugFromPublicId(r.public_id);
    const tags = r.tags || [];
    const ctx = r.context?.custom || {};
    const slugFromTag = tags.find((t) => t.startsWith("slug:"))?.slice(5);
    const slugFromCtx = ctx.slug || ctx.trek_slug || ctx.yatra_slug;
    const slug = slugFromCtx || slugFromTag || meta?.slug;

    if (meta?.kind === "treks" || tags.includes("trek")) {
      const s = slug || meta.slug;
      if (!s) {
        unmapped.push({ public_id: r.public_id, url });
        continue;
      }
      if (!treks[s]) treks[s] = [];
      treks[s].push(url);
    } else if (meta?.kind === "yatras" || tags.includes("yatra")) {
      const s = slug || meta.slug;
      if (!s) {
        unmapped.push({ public_id: r.public_id, url });
        continue;
      }
      if (!yatras[s]) yatras[s] = [];
      yatras[s].push(url);
    } else if (meta?.kind === "destinations") {
      const s = slug || meta.slug;
      if (!s) continue;
      if (!destinations[s]) destinations[s] = [];
      destinations[s].push(url);
    } else if (meta?.kind === "hero" || r.public_id.includes("/hero")) {
      hero.push(url);
    } else if (meta?.kind === "gallery" || r.public_id.includes("/gallery")) {
      gallery.push(url);
    } else if (meta?.kind === "blogs") {
      const s = slug || meta.slug;
      if (!s) continue;
      if (!blogs[s]) blogs[s] = [];
      blogs[s].push(url);
    } else if (meta?.kind === "team") {
      team.push(url);
    } else if (meta?.kind === "guess" && slug) {
      if (slug.includes("yatra") || tags.includes("yatra")) {
        if (!yatras[slug]) yatras[slug] = [];
        yatras[slug].push(url);
      } else {
        if (!treks[slug]) treks[slug] = [];
        treks[slug].push(url);
      }
    } else {
      unmapped.push({ public_id: r.public_id, url, tags });
    }
  }

  for (const bucket of [treks, yatras, destinations, blogs]) {
    for (const k of Object.keys(bucket)) {
      bucket[k] = [...new Set(bucket[k])];
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    total: resources.length,
    treks,
    yatras,
    destinations,
    hero: [...new Set(hero)],
    gallery: [...new Set(gallery)],
    blogs,
    team: [...new Set(team)],
    unmapped: unmapped.slice(0, 100),
  };
}

async function main() {
  const env = loadEnv(ENV_PATH);
  console.log("[cloudinary] Fetching media library…");
  const resources = await listAllImages(env);
  console.log(`[cloudinary] Found ${resources.length} images`);
  const grouped = groupBySlug(resources);
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(grouped, null, 2));
  console.log(`[cloudinary] Wrote ${OUT_PATH}`);
  console.log(
    `  treks: ${Object.keys(grouped.treks).length} slugs, yatras: ${Object.keys(grouped.yatras).length}, unmapped: ${grouped.unmapped.length}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
