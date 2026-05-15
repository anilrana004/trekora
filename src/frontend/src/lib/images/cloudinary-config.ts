/**
 * Client-safe Cloudinary cloud name (Vite exposes `VITE_*` to the browser).
 * API key / secret belong only in server-side env (upload APIs, CI), never here.
 */
export function getCloudinaryCloudName(): string | undefined {
  const raw =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ??
    import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (typeof raw !== "string") return undefined;
  const v = raw.trim();
  return v.length > 0 ? v : undefined;
}

/** Allowed remote hosts for documentation / future tooling (mirrors Next.js `remotePatterns` intent). */
export const CLOUDINARY_IMAGE_HOST = "res.cloudinary.com";
