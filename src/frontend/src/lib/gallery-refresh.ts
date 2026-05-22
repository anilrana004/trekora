import type { ProductKind } from "@/lib/reviews-api";

/** Notify gallery / trekker photo grids for a specific trek or yatra. */
export function refreshTrekkerGallery(
  trekSlug: string,
  type: ProductKind,
) {
  window.dispatchEvent(
    new CustomEvent("trekora-gallery-refresh", {
      detail: {
        trekSlug: trekSlug.trim().toLowerCase(),
        type,
      },
    }),
  );
}
