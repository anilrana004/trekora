/** Centralized React Query keys — deduplication + targeted invalidation. */

export const queryKeys = {
  reviews: {
    all: ["reviews"] as const,
    bySlug: (slug: string) => ["reviews", "slug", slug] as const,
    infinite: (slug: string) => ["reviews", "infinite", slug] as const,
  },
  gallery: {
    all: ["gallery"] as const,
    list: (params: {
      trekSlug?: string;
      type?: string;
      fast?: boolean;
      communityOnly?: boolean;
      productUploadSource?: "all" | "gallery-page" | "product-page";
      includeReviews?: boolean;
    }) => ["gallery", "list", params] as const,
  },
  treks: {
    all: ["treks"] as const,
    batches: (trekId: number) => ["treks", "batches", trekId] as const,
  },
} as const;
