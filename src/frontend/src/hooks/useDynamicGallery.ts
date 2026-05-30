import { filterCommunityGalleryItems } from "@/lib/gallery-community";
import { mergeGalleryItems } from "@/lib/merge-gallery-items";
import { queryKeys } from "@/lib/query-keys";
import {
  type GalleryApiItem,
  type GalleryResponse,
  type ProductKind,
  fetchGallery,
} from "@/lib/reviews-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

export function useDynamicGallery(params?: {
  trekSlug?: string;
  type?: ProductKind;
  enabled?: boolean;
  /** Trekker uploads only (excludes catalog / folder scans). Default true for site gallery. */
  communityOnly?: boolean;
  limit?: number;
}) {
  const enabled = params?.enabled !== false;
  const trekSlug = params?.trekSlug ?? "";
  const type = params?.type;
  const communityOnly = params?.communityOnly !== false;
  const queryClient = useQueryClient();

  const queryKey = queryKeys.gallery.list({
    trekSlug: trekSlug || undefined,
    type,
    fast: true,
    communityOnly,
    productUploadSource: "all",
    includeReviews: true,
  });

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey,
    queryFn: async (): Promise<GalleryResponse> => {
      const res = await fetchGallery({
        trekSlug: trekSlug || undefined,
        type,
        limit: params?.limit ?? (trekSlug ? 48 : 200),
        includeCloudinary: false,
        uploadSource: "all",
        includeReviews: true,
      });
      if (!res.success) return res;

      const cached = queryClient.getQueryData<GalleryResponse>(queryKey);
      const prev = cached?.success ? (cached.items ?? []) : [];
      let fromApi = res.items ?? [];
      if (communityOnly) fromApi = filterCommunityGalleryItems(fromApi);
      return {
        ...res,
        items: mergeGalleryItems(fromApi, prev),
      };
    },
    enabled,
    staleTime: 120_000,
    gcTime: 20 * 60_000,
  });

  useEffect(() => {
    const onRefresh = () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all });
    };
    window.addEventListener("trekora-gallery-refresh", onRefresh);
    return () =>
      window.removeEventListener("trekora-gallery-refresh", onRefresh);
  }, [queryClient]);

  const items: GalleryApiItem[] = data?.success ? (data.items ?? []) : [];
  const loadError =
    data && !data.success
      ? (data.message ?? "Could not load gallery")
      : error
        ? "Could not load gallery photos."
        : null;

  const refetchGallery = useCallback(
    (silent = true) => {
      void refetch({ cancelRefetch: !silent });
    },
    [refetch],
  );

  return {
    items,
    loading: isLoading && items.length === 0,
    refreshing: isFetching && items.length > 0,
    error: loadError,
    refetch: refetchGallery,
  };
}
