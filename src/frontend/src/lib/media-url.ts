export const CLOUDFLARE_MEDIA_ORIGIN = "https://media.trekora.in";

/** Trekora Cloudflare CDN — videos only; images stay on Cloudinary. */
export function isCloudflareMediaUrl(url: string): boolean {
  const u = url.trim();
  if (!u) return false;
  try {
    return new URL(u).hostname === "media.trekora.in";
  } catch {
    return false;
  }
}

/** True for Cloudinary video delivery URLs and common video file extensions. */
export function isVideoMediaUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u) return false;
  return /\/video\/upload\//.test(u) || /\.(mp4|webm|mov|m4v)(\?|#|$)/.test(u);
}

/** True for image delivery URLs and common image file extensions. */
export function isImageMediaUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u || isVideoMediaUrl(u)) return false;
  return (
    /\/image\/upload\//.test(u) ||
    /\.(avif|webp|jpe?g|png|gif|svg)(\?|#|$)/.test(u)
  );
}
