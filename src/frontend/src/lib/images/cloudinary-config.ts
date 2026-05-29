/** Trekora production Cloudinary cloud (all trek reel / hero assets). */
export const TREKORA_CLOUDINARY_CLOUD_NAME = "ddbcauxef";

/**
 * Client-safe Cloudinary cloud name (Vite exposes `VITE_*` to the browser).
 * API key / secret belong only in server-side env (upload APIs, CI), never here.
 */
export function getCloudinaryCloudName(): string | undefined {
  const raw =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ??
    import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (typeof raw === "string") {
    const v = raw.trim();
    if (v.length > 0) return v;
  }
  return TREKORA_CLOUDINARY_CLOUD_NAME;
}

/** Read cloud name from a `res.cloudinary.com/{cloud}/…` URL when env is unset. */
export function cloudNameFromCloudinaryUrl(url: string): string | undefined {
  const m = /res\.cloudinary\.com\/([^/]+)\//i.exec(url.trim());
  const name = m?.[1]?.trim();
  return name && name.length > 0 ? name : undefined;
}

/** Allowed remote hosts for documentation / future tooling (mirrors Next.js `remotePatterns` intent). */
export const CLOUDINARY_IMAGE_HOST = "res.cloudinary.com";
