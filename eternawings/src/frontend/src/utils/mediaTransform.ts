import { RESPONSIVE_IMAGE_WIDTHS } from "@/lib/images/breakpoints";
/**
 * Media URL helpers: Cloudinary fetch delivery for images and video with auto format/quality.
 * Used by OptimizedImage / OptimizedVideo and SEO utilities.
 */
import { getCloudinaryCloudName } from "@/lib/images/cloudinary-config";
import {
  type ImageDeliveryOptions,
  buildBlurPlaceholderUrl,
  buildOptimizedImageUrl,
  buildResponsiveSrcSet,
  buildSeoImageUrl,
  isCloudinaryUrl,
} from "@/lib/images/cloudinary-url";

export type { ImageDeliveryOptions };

export {
  buildBlurPlaceholderUrl,
  buildOptimizedImageUrl,
  buildResponsiveSrcSet,
  buildSeoImageUrl,
};

export function isRemoteHttpUrl(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}

function absolutizeIfRootRelative(src: string): string {
  if (!src.startsWith("/")) return src;
  if (typeof window === "undefined") return src;
  return `${window.location.origin}${src}`;
}

/**
 * Video fetch delivery: adaptive streaming-friendly transforms.
 * Remote MP4/WebM URLs are pulled through Cloudinary when configured.
 */
export function buildOptimizedVideoUrl(
  src: string,
  opts: { width?: number } = {},
): string {
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  const cloud = getCloudinaryCloudName();
  if (!cloud) return trimmed;

  const working = absolutizeIfRootRelative(trimmed);

  if (isCloudinaryUrl(working)) {
    const marker = "/video/upload/";
    const i = working.indexOf(marker);
    if (i === -1) return working;
    const parts = ["c_limit", "f_auto", "q_auto", "vc_auto"];
    if (opts.width) parts.push(`w_${opts.width}`);
    const chain = parts.join(",");
    const rest = working.slice(i + marker.length);
    if (/\bf_auto\b/.test(rest)) return working;
    return `${working.slice(0, i + marker.length)}${chain}/${rest}`;
  }

  if (!/^https?:\/\//i.test(working)) return trimmed;

  const parts = ["c_limit", "f_auto", "q_auto", "vc_auto"];
  if (opts.width) parts.push(`w_${opts.width}`);
  const transforms = parts.join(",");
  const encoded = encodeURIComponent(working);
  return `https://res.cloudinary.com/${cloud}/video/fetch/${transforms}/${encoded}`;
}

export { RESPONSIVE_IMAGE_WIDTHS };
