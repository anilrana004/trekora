/**
 * Central cache key builders — stable prefixes for future Redis namespaces.
 */

const PREFIX = "trekora:v1";

export function galleryCacheKey({ trekSlug = "", type = "", tag = "", limit = 120 } = {}) {
  const slug = String(trekSlug).trim().toLowerCase();
  const t = type === "trek" || type === "yatra" ? type : "all";
  const tg = String(tag).trim().toLowerCase().slice(0, 64);
  const lim = Math.min(500, Math.max(1, Number(limit) || 120));
  return `${PREFIX}:gallery:${slug || "_"}:${t}:${tg}:${lim}`;
}

export function reviewsCacheKey({
  trekSlug = "",
  page = 1,
  limit = 25,
  sort = "newest",
} = {}) {
  const slug = String(trekSlug).trim().toLowerCase();
  const p = Math.max(1, Number(page) || 1);
  const lim = Math.min(100, Math.max(1, Number(limit) || 25));
  const s = ["newest", "rating", "helpful"].includes(sort) ? sort : "newest";
  return `${PREFIX}:reviews:${slug}:${s}:${p}:${lim}`;
}

export function seoMetaCacheKey({ kind = "trek", slug = "" } = {}) {
  const k = kind === "yatra" || kind === "package" ? kind : "trek";
  const s = String(slug).trim().toLowerCase();
  return `${PREFIX}:seo:${k}:${s}`;
}

export function homepageSectionCacheKey(section = "default") {
  return `${PREFIX}:home:${String(section).trim().toLowerCase().slice(0, 32)}`;
}
