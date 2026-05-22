import type { GalleryApiItem } from "@/lib/reviews-api";
import type { ProductGalleryPhoto } from "@/lib/product-gallery";

/** Merge API gallery items + static Cloudinary URLs for a trek/yatra Photos tab. */
export function mergeProductGalleryPhotos(
  apiItems: GalleryApiItem[],
  staticUrls: string[],
  productName: string,
  productLabel: string,
): ProductGalleryPhoto[] {
  const fromApi: ProductGalleryPhoto[] = apiItems.map((item) => ({
    src: item.src,
    trekName: item.trekName || item.title || productName,
    productLabel: item.subtitle ?? productLabel,
    fromReview: item.source === "review",
    source: item.source,
  }));

  const seen = new Set<string>();
  const merged: ProductGalleryPhoto[] = [];

  for (const p of fromApi) {
    if (!p.src || seen.has(p.src)) continue;
    seen.add(p.src);
    merged.push(p);
  }

  for (const src of staticUrls) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    merged.push({
      src,
      trekName: productName,
      productLabel,
      fromReview: false,
      source: "static",
    });
  }

  return merged;
}
