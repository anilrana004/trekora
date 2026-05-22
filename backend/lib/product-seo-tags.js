/**
 * Backend mirror of curated product SEO tags (see src/frontend/src/lib/product-seo-taxonomy.ts).
 * Used for gallery/review tag enrichment in MongoDB.
 */

const GALLERY_BASE = [
  "trek photos",
  "himalayan photography",
  "trekora gallery",
  "adventure photos",
];

const BY_SLUG = {
  "kedarkantha-trek": [
    "kedarkantha trek",
    "snow trek",
    "winter trek",
    "uttarakhand trek",
  ],
  "valley-of-flowers": [
    "valley of flowers trek",
    "monsoon trek",
    "unesco site",
  ],
  "roopkund-trek": ["roopkund trek", "skeleton lake", "high altitude trek"],
  "hampta-pass": ["hampta pass", "crossover trek", "himachal trek"],
  "brahmatal-trek": ["brahmatal trek", "snow trek", "winter trek"],
  "kedarnath-yatra": ["kedarnath yatra", "char dham", "pilgrimage"],
  "badrinath-yatra": ["badrinath yatra", "char dham yatra", "pilgrimage tour"],
};

export function galleryTagsForSlug(slug, type = "trek") {
  const key = String(slug ?? "").trim().toLowerCase();
  const product = BY_SLUG[key] ?? [];
  const fallback =
    type === "yatra"
      ? [`${key.replace(/-/g, " ")} yatra`, "yatra moments"]
      : [`${key.replace(/-/g, " ")} trek`, "trek photos"];
  return [...new Set([...GALLERY_BASE, ...product, ...fallback])].slice(0, 12);
}

export function defaultReviewTags(slug, type = "trek") {
  return galleryTagsForSlug(slug, type).slice(0, 6);
}
