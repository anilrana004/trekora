import { getAdminSecret, hasAdminSession } from "@/lib/admin-access";
import { fetchJsonLenient, postJsonLenient } from "@/lib/api-fetch";
import { withRetry } from "@/lib/retry";

export type ProductKind = "trek" | "yatra";

export type TrekoraReview = {
  id: string;
  trekSlug: string;
  trekName: string;
  type: ProductKind;
  userName: string;
  rating: number;
  reviewText: string;
  photoUrls: string[];
  tags: string[];
  approved: boolean;
  createdAt: string;
};

export type ReviewsBySlugResponse = {
  success: boolean;
  message?: string;
  trekSlug?: string;
  count?: number;
  avgRating?: number;
  distribution?: Record<number, number>;
  reviews?: TrekoraReview[];
  limit?: number;
  skip?: number;
  hasMore?: boolean;
};

export type ReviewPhotoMeta = {
  url: string;
  publicId?: string;
  cloudinaryFolder?: string;
  width?: number;
  height?: number;
};

export type GalleryApiItem = {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  category: string;
  credit: string;
  trekSlug: string;
  trekName: string;
  type: ProductKind;
  source?: "product" | "review" | "cloudinary";
  reviewId: string;
  createdAt: string;
  publicId?: string;
};

export type GalleryResponse = {
  success: boolean;
  message?: string;
  count?: number;
  items?: GalleryApiItem[];
};

function adminHeaders(): HeadersInit {
  if (!hasAdminSession()) return {};
  const secret = getAdminSecret();
  if (!secret) return {};
  return { "X-Admin-Secret": secret };
}

export async function fetchReviewsBySlug(
  slug: string,
  options?: { limit?: number; skip?: number },
): Promise<ReviewsBySlugResponse> {
  const params = new URLSearchParams();
  if (options?.limit != null) params.set("limit", String(options.limit));
  if (options?.skip != null) params.set("skip", String(options.skip));
  const qs = params.toString();
  return fetchJsonLenient<ReviewsBySlugResponse>(
    `/api/reviews/${encodeURIComponent(slug.trim().toLowerCase())}${qs ? `?${qs}` : ""}`,
  );
}

export async function submitReview(payload: {
  trekSlug: string;
  trekName: string;
  type: ProductKind;
  userName: string;
  rating: number;
  reviewText: string;
  photoUrls?: string[];
  photos?: ReviewPhotoMeta[];
  tags?: string[];
}): Promise<{
  success: boolean;
  message?: string;
  review?: TrekoraReview;
}> {
  return withRetry(
    () =>
      postJsonLenient<{
        success: boolean;
        message?: string;
        review?: TrekoraReview;
      }>("/api/reviews", payload, { timeoutMs: 30_000 }),
    { attempts: 2, delayMs: 500 },
  );
}

export type ProductUploadSourceFilter = "all" | "gallery-page" | "product-page";

export async function fetchGallery(params?: {
  trekSlug?: string;
  type?: ProductKind;
  limit?: number;
  /** When false, skips slow Cloudinary folder listing on the server. */
  includeCloudinary?: boolean;
  /** Which product_photos rows to include (default all). Trek pages use product-page only. */
  uploadSource?: ProductUploadSourceFilter;
  /** When false, excludes review-tab photos from the response. */
  includeReviews?: boolean;
}): Promise<GalleryResponse> {
  const q = new URLSearchParams();
  if (params?.trekSlug) q.set("trekSlug", params.trekSlug);
  if (params?.type) q.set("type", params.type);
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.includeCloudinary === false) q.set("includeCloudinary", "0");
  if (params?.uploadSource && params.uploadSource !== "all") {
    q.set("uploadSource", params.uploadSource);
  }
  if (params?.includeReviews === false) q.set("includeReviews", "0");
  const qs = q.toString();
  return fetchJsonLenient<GalleryResponse>(
    `/api/gallery${qs ? `?${qs}` : ""}`,
    {
      timeoutMs: 28_000,
    },
  );
}

export async function fetchPendingReviews(): Promise<{
  success: boolean;
  reviews?: TrekoraReview[];
  message?: string;
}> {
  const res = await fetch("/api/reviews/pending", {
    headers: adminHeaders(),
  });
  return res.json();
}

export async function approveReview(id: string): Promise<{
  success: boolean;
  message?: string;
}> {
  const res = await fetch(`/api/reviews/${id}/approve`, {
    method: "PATCH",
    headers: adminHeaders(),
  });
  return res.json();
}

export async function deleteReview(id: string): Promise<{
  success: boolean;
  message?: string;
}> {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
  return res.json();
}

export function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}
