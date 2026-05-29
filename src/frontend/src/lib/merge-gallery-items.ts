import type { GalleryApiItem } from "@/lib/reviews-api";

/** Dedupe by image URL; earlier groups win (API should be passed first). */
export function mergeGalleryItems(
  ...groups: GalleryApiItem[][]
): GalleryApiItem[] {
  const seen = new Set<string>();
  const out: GalleryApiItem[] = [];
  for (const group of groups) {
    for (const item of group) {
      if (!item.src || seen.has(item.src)) continue;
      seen.add(item.src);
      out.push(item);
    }
  }
  return out;
}
