import { RESPONSIVE_IMAGE_WIDTHS } from "@/lib/images/breakpoints";
/**
 * Media URL helpers: Cloudinary fetch delivery for images and video with auto format/quality.
 * Used by OptimizedImage / OptimizedVideo and SEO utilities.
 */
import {
  cloudNameFromCloudinaryUrl,
  getCloudinaryCloudName,
} from "@/lib/images/cloudinary-config";
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

export type VideoDeliveryProfile =
  | "hero-mobile"
  | "card-mobile"
  | "lightbox-mobile"
  | "lightbox-desktop"
  | "hero-desktop"
  | "logo";

const VIDEO_PROFILE_WIDTH: Record<VideoDeliveryProfile, number> = {
  "hero-mobile": 720,
  "card-mobile": 480,
  "lightbox-mobile": 720,
  "lightbox-desktop": 1080,
  "hero-desktop": 1280,
  logo: 320,
};

export function videoWidthForProfile(profile: VideoDeliveryProfile): number {
  return VIDEO_PROFILE_WIDTH[profile];
}

export function isRemoteHttpUrl(src: string): boolean {
  return /^https?:\/\//i.test(src.trim());
}

function absolutizeIfRootRelative(src: string): string {
  if (!src.startsWith("/")) return src;
  if (typeof window === "undefined") return src;
  return `${window.location.origin}${src}`;
}

function resolveCloudName(src: string): string | undefined {
  return getCloudinaryCloudName() ?? cloudNameFromCloudinaryUrl(src);
}

function videoTransformChain(opts: { width?: number }): string {
  const parts = ["c_limit", "f_mp4", "q_auto:good", "vc_h264"];
  if (opts.width) parts.push(`w_${opts.width}`);
  return parts.join(",");
}

function hasVideoDeliveryTransforms(rest: string): boolean {
  return /\bf_auto\b/.test(rest) || /\bq_auto\b/.test(rest);
}

function injectVideoTransforms(url: string, chain: string): string {
  const marker = "/video/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const rest = url.slice(i + marker.length);
  if (hasVideoDeliveryTransforms(rest)) return url;
  return `${url.slice(0, i + marker.length)}${chain}/${rest}`;
}

export type BuildOptimizedVideoOptions = {
  width?: number;
  profile?: VideoDeliveryProfile;
};

/**
 * Video delivery: adaptive format/quality via Cloudinary (works after deploy when
 * `VITE_CLOUDINARY_CLOUD_NAME` is set — falls back to cloud name in asset URLs).
 */
export function buildOptimizedVideoUrl(
  src: string,
  opts: BuildOptimizedVideoOptions = {},
): string {
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("blob:") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  const width =
    opts.width ??
    (opts.profile ? VIDEO_PROFILE_WIDTH[opts.profile] : undefined) ??
    1280;

  const cloud = resolveCloudName(trimmed);
  if (!cloud) return trimmed;

  const working = absolutizeIfRootRelative(trimmed);
  const chain = videoTransformChain({ width });

  if (isCloudinaryUrl(working)) {
    return injectVideoTransforms(working, chain);
  }

  if (!/^https?:\/\//i.test(working)) return trimmed;

  const encoded = encodeURIComponent(working);
  return `https://res.cloudinary.com/${cloud}/video/fetch/${chain}/${encoded}`;
}

/** Versioned asset path after `/video/upload/` (strips any transform segment). */
function cloudinaryVideoVersionPath(afterUpload: string): string | undefined {
  const m = afterUpload.match(/(v\d+\/.+)$/i);
  return m?.[1];
}

/** First-frame JPG poster for reel cards and hero fallbacks. */
export function buildVideoPosterUrl(
  videoSrc: string,
  width = 480,
): string | undefined {
  const trimmed = videoSrc.trim();
  const marker = "/video/upload/";
  const i = trimmed.indexOf(marker);
  if (i === -1) return undefined;

  const afterUpload = trimmed.slice(i + marker.length);
  const versionPath = cloudinaryVideoVersionPath(afterUpload);
  if (!versionPath) return undefined;

  const jpgPath = versionPath.replace(/\.(mp4|webm|mov)$/i, ".jpg");
  const chain = `so_0,w_${width},c_fill,q_auto,f_jpg`;
  return `${trimmed.slice(0, i + marker.length)}${chain}/${jpgPath}`;
}

/** @deprecated Use buildVideoPosterUrl — kept for ReelsShortsRow imports. */
export function reelPosterFromVideo(
  videoSrc: string,
  width = 480,
): string | undefined {
  return buildVideoPosterUrl(videoSrc, width);
}

export { RESPONSIVE_IMAGE_WIDTHS };
