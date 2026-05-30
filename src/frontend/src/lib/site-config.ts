import { resolvePublicSiteOrigin } from "./public-site-origin";

/**
 * Canonical production site URL. Set VITE_SITE_ORIGIN in src/.env
 * (e.g. https://www.trekora.in). Never use the API host (api.trekora.in).
 */
export const SITE_ORIGIN = resolvePublicSiteOrigin(
  import.meta.env.VITE_SITE_ORIGIN,
);

/** Default Open Graph image (Cloudinary CDN). */
export const DEFAULT_OG_IMAGE =
  import.meta.env.VITE_DEFAULT_OG_IMAGE ||
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110196/zicesdvggif1pxye65kq.webp";
