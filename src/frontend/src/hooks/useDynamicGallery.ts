import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { queryKeys } from "@/lib/query-keys";
import {
  fetchGallery,
  type GalleryApiItem,
  type ProductKind,
} from "@/lib/reviews-api";

export function useDynamicGallery(params?: {
  trekSlug?: string;
  type?: ProductKind;
  enabled?: boolean;
  /** Skip slow Cloudinary Admin folder scan (Mongo + reviews only). */
  fast?: boolean;
}) {
  const enabled = params?.enabled !== false;
  const trekSlug = params?.trekSlug ?? "";
  const type = params?.type;
  const fast = params?.fast ?? Boolean(trekSlug);
  const queryClient = useQueryClient();

  const queryKey = queryKeys.gallery.list({
    trekSlug: trekSlug || undefined,
    type,
    fast,
  });

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey,
    queryFn: () =>
      fetchGallery({
        trekSlug: trekSlug || undefined,
        type,
        limit: trekSlug ? 48 : 120,
        includeCloudinary: fast ? false : undefined,
      }),
    enabled,
    staleTime: 120_000,
    gcTime: 20 * 60_000,
  });

  useEffect(() => {
    const onRefresh = () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.gallery.all });
    };
    window.addEventListener("trekora-gallery-refresh", onRefresh);
    return () => window.removeEventListener("trekora-gallery-refresh", onRefresh);
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
