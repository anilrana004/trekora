import { fetchJson, postJsonLenient } from "@/lib/api-fetch";
import { withRetry } from "@/lib/retry";
import type { GalleryApiItem, ProductKind, ReviewPhotoMeta } from "@/lib/reviews-api";

export async function submitProductPhotos(payload: {
  trekSlug: string;
  trekName: string;
  type: ProductKind;
  uploadedBy?: string;
  tags?: string[];
  photos?: ReviewPhotoMeta[];
  photoUrls?: string[];
}): Promise<{
  success: boolean;
  message?: string;
  count?: number;
}> {
  try {
    const data = await withRetry(
      () =>
        postJsonLenient<{
          success: boolean;
          message?: string;
          count?: number;
        }>("/api/product-photos", payload, { timeoutMs: 35_000 }),
      { attempts: 2, delayMs: 600 },
    );
    if (!data.success) {
      return {
        success: false,
        message:
          data.message ??
          "Could not save photos. Please try again in a moment.",
      };
    }
    return data;
  } catch {
    return {
      success: false,
      message:
        "Cannot reach the photo service. Check your connection and try again.",
    };
  }
}

export async function fetchProductPhotos(params: {
  trekSlug: string;
  type: ProductKind;
}): Promise<{
  success: boolean;
  items?: GalleryApiItem[];
  message?: string;
}> {
  try {
    const q = new URLSearchParams({
      trekSlug: params.trekSlug,
      type: params.type,
    });
    return await fetchJson<{
      success: boolean;
      items?: GalleryApiItem[];
      message?: string;
    }>(`/api/product-photos?${q}`);
  } catch {
    return {
      success: false,
      message: "Cannot reach the photo API.",
    };
  }
}
