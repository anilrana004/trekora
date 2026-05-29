import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryKeys } from "@/lib/query-keys";
import { fetchGallery, type ProductKind } from "@/lib/reviews-api";

/** Warm trekker/gallery cache when a trek or yatra detail page loads. */
export function usePrefetchProductGallery(
  productSlug: string | undefined,
  productType: ProductKind,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const slug = productSlug?.trim().toLowerCase();
    if (!slug) return;

    const queryKey = queryKeys.gallery.list({
      trekSlug: slug,
      type: productType,
      fast: true,
      communityOnly: true,
      productUploadSource: "product-page",
      includeReviews: false,
    });

    void queryClient.prefetchQuery({
      queryKey,
      queryFn: () =>
        fetchGallery({
          trekSlug: slug,
          type: productType,
          limit: 48,
          includeCloudinary: false,
          uploadSource: "product-page",
          includeReviews: false,
        }),
      staleTime: 60_000,
    });
  }, [productSlug, productType, queryClient]);
}
