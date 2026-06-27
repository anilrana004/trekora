import { queryKeys } from "@/lib/query-keys";
import {
  type ReviewsBySlugResponse,
  type TrekoraReview,
  fetchReviewsBySlug,
} from "@/lib/reviews-api";
import {
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const PAGE_SIZE = 25;

type UseProductReviewsResult = {
  reviews: TrekoraReview[];
  count: number;
  avgRating: number;
  distribution: Record<number, number>;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  refetch: (options?: { silent?: boolean }) => void;
  loadMore: () => void;
  prependReview: (review: TrekoraReview) => void;
};

const EMPTY_DIST: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

function statsFromReviews(reviews: TrekoraReview[], trekSlug: string) {
  const count = reviews.length;
  const avgRating =
    count > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) /
        10
      : 0;
  const distribution = { ...EMPTY_DIST };
  for (const r of reviews) {
    if (r.rating >= 1 && r.rating <= 5) distribution[r.rating]++;
  }
  return {
    success: true as const,
    trekSlug,
    count,
    avgRating,
    distribution,
    reviews,
    hasMore: false,
  };
}

export function useProductReviews(
  slug: string | undefined,
): UseProductReviewsResult {
  const normalized = slug?.trim().toLowerCase() ?? "";
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: queryKeys.reviews.infinite(normalized),
    queryFn: ({ pageParam = 0 }) =>
      fetchReviewsBySlug(normalized, {
        limit: PAGE_SIZE,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (last) => {
      if (!last.success || !last.hasMore) return undefined;
      return (last.skip ?? 0) + (last.reviews?.length ?? 0);
    },
    enabled: Boolean(normalized),
    staleTime: 90_000,
    gcTime: 15 * 60_000,
  });

  const firstPage = data?.pages[0];
  const reviews = useMemo(
    () => data?.pages.flatMap((p) => p.reviews ?? []) ?? [],
    [data?.pages],
  );

  const prependReview = useCallback(
    (review: TrekoraReview) => {
      if (!normalized) return;
      queryClient.setQueryData(
        queryKeys.reviews.infinite(normalized),
        (
          prev:
            | { pages: ReviewsBySlugResponse[]; pageParams: number[] }
            | undefined,
        ) => {
          if (!prev) {
            return {
              pages: [statsFromReviews([review], normalized)],
              pageParams: [0],
            };
          }
          const first = prev.pages[0];
          const merged = [
            review,
            ...(first?.reviews ?? []).filter((r) => r.id !== review.id),
          ];
          return {
            ...prev,
            pages: [
              { ...first, ...statsFromReviews(merged, normalized) },
              ...prev.pages.slice(1),
            ],
          };
        },
      );
    },
    [normalized, queryClient],
  );

  const apiError =
    firstPage && !firstPage.success
      ? (firstPage.message ?? "Could not load reviews")
      : null;
  const fetchError = error ? "Could not load reviews. Please try again." : null;

  const distribution = { ...EMPTY_DIST, ...firstPage?.distribution };
  const totalCount = firstPage?.count ?? reviews.length;

  return {
    reviews,
    count: totalCount,
    avgRating: firstPage?.avgRating ?? 0,
    distribution,
    loading: isLoading,
    loadingMore: isFetchingNextPage,
    error: apiError ?? fetchError,
    hasMore: Boolean(hasNextPage),
    refetch: (options) => {
      void refetch({ cancelRefetch: !options?.silent });
    },
    loadMore: () => {
      if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
    },
    prependReview,
  };
}
