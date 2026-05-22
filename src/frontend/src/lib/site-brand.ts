import type { ImageDeliveryOptions } from "./images/cloudinary-url";
import { buildOptimizedImageUrl } from "./images/cloudinary-url";

/**
 * Trekora wordmark — Cloudinary `trekora/brand/logo` (upload to that folder in Media Library).
 * Stable versioned delivery URL.
 */
export const SITE_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778744940/wpn00ko2pztesvmf8z76.png";

/**
 * Sharp PNG — preserves original brand colors (no filters / colorize).
 * Used in navbar, drawer, footer, and admin.
 */
export const SITE_LOGO_DELIVERY: ImageDeliveryOptions = {
  crop: "c_limit",
  format: "f_png",
  quality: "q_95",
};

/** Retina-friendly srcset buckets for ~220px display width. */
export const SITE_LOGO_WIDTHS = [320, 440, 560, 720, 880] as const;

export function buildSiteLogoUrl(width: number): string {
  return buildOptimizedImageUrl(SITE_LOGO_URL, {
    ...SITE_LOGO_DELIVERY,
    width,
  });
}

/** About page — “Our Story” hero watermark (TQ + trek silhouettes). */
export const ABOUT_STORY_WATERMARK_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779302570/de2i8ltblwa1wruiylw1.png";
