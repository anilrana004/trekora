/**
 * Server-side Cloudinary Admin API — list images by folder prefix.
 * Requires CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET in src/.env
 */
import { ensureTrekoraEnv } from "./load-env.js";

function getCloudinaryConfig() {
  ensureTrekoraEnv();
  const cloud = String(
    process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.VITE_CLOUDINARY_CLOUD_NAME ||
      "",
  ).trim();
  const key = String(process.env.CLOUDINARY_API_KEY ?? "").trim();
  const secret = String(process.env.CLOUDINARY_API_SECRET ?? "").trim();
  if (!cloud || !key || !secret) return null;
  return { cloud, key, secret };
}

async function cloudinaryListPage({ cloud, key, secret }, prefix, nextCursor) {
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const params = new URLSearchParams({
    type: "upload",
    prefix,
    max_results: "100",
    ...(nextCursor ? { next_cursor: nextCursor } : {}),
  });
  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image?${params}`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) {
    throw new Error(`Cloudinary list failed (${res.status})`);
  }
  return res.json();
}

/** List all uploaded images under a folder prefix (e.g. trekora/treks/roopkund-trek). */
export async function listCloudinaryImagesByPrefix(prefix) {
  const cfg = getCloudinaryConfig();
  if (!cfg) return [];

  const normalized = String(prefix ?? "").replace(/\/+$/, "");
  if (!normalized) return [];

  const all = [];
  let cursor;
  try {
    do {
      const page = await cloudinaryListPage(cfg, normalized, cursor);
      for (const r of page.resources ?? []) {
        if (r.secure_url) {
          all.push({
            url: r.secure_url,
            publicId: r.public_id,
            width: r.width,
            height: r.height,
            createdAt: r.created_at,
          });
        }
      }
      cursor = page.next_cursor;
    } while (cursor);
  } catch (err) {
    process.stderr.write(
      `[cloudinary] list "${normalized}": ${err instanceof Error ? err.message : err}\n`,
    );
    return [];
  }
  return all;
}

export function productCloudinaryFolder(type, trekSlug) {
  const safe = String(trekSlug ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const segment = type === "yatra" ? "yatras" : "treks";
  return `trekora/${segment}/${safe || "general"}`;
}

export function reviewCloudinaryFolder(type, trekSlug) {
  const safe = String(trekSlug ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const segment = type === "yatra" ? "yatras" : "treks";
  return `trekora/reviews/${segment}/${safe || "general"}`;
}
