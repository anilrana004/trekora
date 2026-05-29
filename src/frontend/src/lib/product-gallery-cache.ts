import type { QueryClient } from "@tanstack/react-query";
import { mergeGalleryItems } from "@/lib/merge-gallery-items";
import { queryKeys } from "@/lib/query-keys";
import type { GalleryApiItem, GalleryResponse, ProductKind } from "@/lib/reviews-api";

export function productGalleryQueryKey(
  trekSlug: string,
  productType: ProductKind,
) {
  return queryKeys.gallery.list({
    trekSlug: trekSlug.trim().toLowerCase(),
    type: productType,
    fast: true,
    communityOnly: true,
    productUploadSource: "product-page",
    includeReviews: false,
  });
}

/** Site /gallery grid (all community uploads + reviews). */
export function siteGalleryQueryKey(params?: {
  trekSlug?: string;
  type?: ProductKind;
}) {
  return queryKeys.gallery.list({
    trekSlug: params?.trekSlug?.trim().toLowerCase() || undefined,
    type: params?.type,
    fast: true,
    communityOnly: true,
    productUploadSource: "all",
    includeReviews: true,
  });
}

export function pushSiteGalleryToCache(
  queryClient: QueryClient,
  incoming: GalleryApiItem[],
  scope?: { trekSlug?: string; type?: ProductKind },
) {
  if (!incoming.length) return;
  const queryKey = siteGalleryQueryKey(scope);
  queryClient.setQueryData<GalleryResponse>(queryKey, (old) => {
    const prev = old?.success ? (old.items ?? []) : [];
    return {
      success: true,
      items: mergeGalleryItems(incoming, prev),
    };
  });
}

/** Push trekker uploads into the shared React Query cache (top grid + trekker wall). */
export function pushProductGalleryToCache(
  queryClient: QueryClient,
  trekSlug: string,
  productType: ProductKind,
  incoming: GalleryApiItem[],
) {
  if (!incoming.length) return;
  const queryKey = productGalleryQueryKey(trekSlug, productType);
  queryClient.setQueryData<GalleryResponse>(queryKey, (old) => {
    const prev = old?.success ? (old.items ?? []) : [];
    return {
      success: true,
      items: mergeGalleryItems(incoming, prev),
    };
  });
}

export function clearOptimisticFromCache(
  queryClient: QueryClient,
  trekSlug: string,
  productType: ProductKind,
) {
  const queryKey = productGalleryQueryKey(trekSlug, productType);
  queryClient.setQueryData<GalleryResponse>(queryKey, (old) => ({
    success: true,
    items: (old?.items ?? []).filter((p) => !p.id.startsWith("optimistic-")),
  }));
}
