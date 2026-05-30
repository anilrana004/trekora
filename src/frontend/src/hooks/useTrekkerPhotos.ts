import { filterCommunityGalleryItems } from "@/lib/gallery-community";
import { mergeGalleryItems } from "@/lib/merge-gallery-items";
import { productGalleryQueryKey } from "@/lib/product-gallery-cache";
import {
  type GalleryApiItem,
  type GalleryResponse,
  type ProductKind,
  fetchGallery,
} from "@/lib/reviews-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

/**
 * Trekker Photos for one trek/yatra — React Query cache shared with gallery grids.
 */
export function useTrekkerPhotos(trekSlug: string, productType: ProductKind) {
  const slug = useMemo(() => trekSlug.trim().toLowerCase(), [trekSlug]);
  const queryClient = useQueryClient();
  const queryKey = productGalleryQueryKey(slug, productType);

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey,
    queryFn: async (): Promise<GalleryResponse> => {
      const res = await fetchGallery({
        trekSlug: slug,
        type: productType,
        limit: 48,
        includeCloudinary: false,
        uploadSource: "product-page",
        includeReviews: false,
      });
      if (!res.success) return res;

      const cached = queryClient.getQueryData<GalleryResponse>(queryKey);
      const prev = cached?.success ? (cached.items ?? []) : [];
      const fromApi = filterCommunityGalleryItems(res.items ?? []);
      return {
        ...res,
        items: mergeGalleryItems(fromApi, prev),
      };
    },
    enabled: Boolean(slug),
    staleTime: 60_000,
    gcTime: 15 * 60_000,
  });

  useEffect(() => {
    const onRefresh = (ev: Event) => {
      const detail = (ev as CustomEvent<{ trekSlug?: string; type?: string }>)
        .detail;
      if (detail?.trekSlug && detail.trekSlug !== slug) return;
      if (detail?.type && detail.type !== productType) return;
      void queryClient.invalidateQueries({ queryKey });
    };
    window.addEventListener("trekora-gallery-refresh", onRefresh);
    return () =>
      window.removeEventListener("trekora-gallery-refresh", onRefresh);
  }, [slug, productType, queryClient, queryKey]);

  const photos: GalleryApiItem[] = data?.success ? (data.items ?? []) : [];
  const loadError =
    data && !data.success
      ? (data.message ?? "Could not load trekker photos")
      : error
        ? "Could not load trekker photos."
        : null;

  const prependPhotos = useCallback(
    (incoming: GalleryApiItem[]) => {
      if (!incoming.length) return;
      queryClient.setQueryData<GalleryResponse>(queryKey, (old) => {
        const prev = old?.success ? (old.items ?? []) : [];
        return {
          success: true,
          items: mergeGalleryItems(incoming, prev),
        };
      });
    },
    [queryClient, queryKey],
  );

  const clearOptimistic = useCallback(() => {
    queryClient.setQueryData<GalleryResponse>(queryKey, (old) => ({
      success: true,
      items: (old?.items ?? []).filter((p) => !p.id.startsWith("optimistic-")),
    }));
  }, [queryClient, queryKey]);

  const reload = useCallback(
    async (silent = false) => {
      await refetch({ cancelRefetch: !silent });
    },
    [refetch],
  );

  return {
    photos,
    loading: isLoading && photos.length === 0,
    refreshing: isFetching && photos.length > 0,
    error: loadError,
    reload,
    prependPhotos,
    clearOptimistic,
  };
}
