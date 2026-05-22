import { RESPONSIVE_IMAGE_WIDTHS } from "./breakpoints";
import { getCloudinaryCloudName } from "./cloudinary-config";

export type ImageDeliveryOptions = {
  /** Target width in px (`w_` transformation). */
  width?: number;
  /**
   * Extra Cloudinary transforms (e.g. `c_fill`, `g_auto`).
   * If omitted, defaults to `c_limit` so assets are not upscaled and layout stays predictable with `object-cover`.
   */
  crop?: string;
  /** Effect chain segment, e.g. `e_blur:1200` for LQIP placeholders. */
  effects?: string;
};

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

function isDataOrBlob(s: string): boolean {
  return s.startsWith("data:") || s.startsWith("blob:");
}

export function isCloudinaryUrl(s: string): boolean {
  const t = s.trim();
  try {
    const host = new URL(t).hostname.toLowerCase();
    return (
      host === "res.cloudinary.com" || host.endsWith(".res.cloudinary.com")
    );
  } catch {
    // Scheme-relative or non-URL strings
    return /res\.cloudinary\.com\//i.test(t);
  }
}

/** Uploaded asset public_id (no scheme), e.g. `trekora/hero/home/my-file`. */
function isCloudinaryPublicIdPath(s: string): boolean {
  if (s.startsWith("/") || s.startsWith(".")) return false;
  if (isHttpUrl(s) || isDataOrBlob(s)) return false;
  return s.startsWith("trekora/");
}

/** Insert default auto format/quality (+ optional width) after `/image/upload/`. */
function enhanceUploadUrl(url: string, transformSegment: string): string {
  const marker = "/image/upload/";
  const i = url.indexOf(marker);
  if (i === -1) return url;
  const rest = url.slice(i + marker.length);
  if (/\bf_auto\b/.test(rest)) {
    return url;
  }
  return `${url.slice(0, i + marker.length)}${transformSegment}/${rest}`;
}

/** Default chain segment before format/quality (Cloudinary optimizes raster safely for mixed sources). */
const DEFAULT_GEOMETRY = "c_limit";

function buildTransformChain(opts: ImageDeliveryOptions): string {
  const parts = [opts.crop ?? DEFAULT_GEOMETRY];
  if (opts.effects) parts.push(opts.effects);
  parts.push("f_auto", "q_auto");
  if (opts.width) parts.push(`w_${opts.width}`);
  return parts.join(",");
}

/**
 * Resolve absolute URL for local `/public` paths when using fetch delivery.
 */
function absolutizeIfRootRelative(src: string): string {
  if (!src.startsWith("/")) return src;
  if (typeof window === "undefined") return src;
  return `${window.location.origin}${src}`;
}

/**
 * Upgrade Unsplash URLs when Cloudinary is not configured (lighter bandwidth).
 */
function fallbackTuneRemoteUrl(
  src: string,
  opts: ImageDeliveryOptions,
): string {
  try {
    const u = new URL(src);
    if (u.hostname.includes("images.unsplash.com")) {
      if (opts.width) u.searchParams.set("w", String(opts.width));
      u.searchParams.set("q", "80");
      u.searchParams.set("fm", "webp");
      u.searchParams.set("fit", "max");
      return u.toString();
    }
  } catch {
    /* ignore */
  }
  return src;
}

/**
 * Single delivery URL: Cloudinary fetch/upload with `f_auto`,`q_auto`, optional `w_`.
 */
export function buildOptimizedImageUrl(
  src: string,
  opts: ImageDeliveryOptions = {},
): string {
  if (isDataOrBlob(src)) return src;

  let working = src.trim();
  const cloud = getCloudinaryCloudName();
  const transforms = buildTransformChain(opts);

  working = absolutizeIfRootRelative(working);

  // Direct Cloudinary delivery URLs — enhance even when `VITE_CLOUDINARY_CLOUD_NAME`
  // is unset (transforms are applied on the URL's own cloud host).
  if (isCloudinaryUrl(working)) {
    return enhanceUploadUrl(working, transforms);
  }

  if (!cloud) {
    if (!isHttpUrl(working)) return working;
    return fallbackTuneRemoteUrl(working, opts);
  }

  if (isCloudinaryPublicIdPath(working)) {
    const base = `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${working}`;
    return enhanceUploadUrl(base, transforms);
  }

  if (!isHttpUrl(working)) return src;

  const encoded = encodeURIComponent(working);
  return `https://res.cloudinary.com/${cloud}/image/fetch/${transforms}/${encoded}`;
}

/**
 * Responsive `srcset` string for `<img srcSet={...} />`.
 */
export function buildResponsiveSrcSet(
  src: string,
  widths: readonly number[] = RESPONSIVE_IMAGE_WIDTHS,
): string {
  const parts: string[] = [];
  for (const w of widths) {
    parts.push(`${buildOptimizedImageUrl(src, { width: w })} ${w}w`);
  }
  return parts.join(", ");
}

/** Pick a sensible default `src` fallback (largest bucket). */
export function defaultFallbackSrc(src: string, targetWidth = 1200): string {
  return buildOptimizedImageUrl(src, { width: targetWidth });
}

/** OG / Twitter cards — single sharp URL without responsive srcset. */
export function buildSeoImageUrl(src: string, width = 1200): string {
  return buildOptimizedImageUrl(src, { width });
}

/** Tiny blurred image for blur-up / progressive reveal (LQIP-style). */
export function buildBlurPlaceholderUrl(src: string): string {
  return buildOptimizedImageUrl(src, {
    width: 32,
    crop: "c_limit",
    effects: "e_blur:1000",
  });
}
