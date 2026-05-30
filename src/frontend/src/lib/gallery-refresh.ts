import type { ProductKind } from "@/lib/reviews-api";

/** Invalidate gallery queries site-wide (navbar Gallery page, etc.). */
export function refreshAllGalleries() {
  window.dispatchEvent(new CustomEvent("trekora-gallery-refresh"));
}

/** Notify gallery / trekker photo grids for a specific trek or yatra. */
export function refreshTrekkerGallery(trekSlug: string, type: ProductKind) {
  refreshAllGalleries();
  window.dispatchEvent(
    new CustomEvent("trekora-gallery-refresh", {
      detail: {
        trekSlug: trekSlug.trim().toLowerCase(),
        type,
      },
    }),
  );
}
