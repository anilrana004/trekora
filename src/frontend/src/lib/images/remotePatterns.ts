/**
 * Mirrors Next.js `images.remotePatterns` documentation for this Vite SPA.
 * Configure `VITE_CLOUDINARY_CLOUD_NAME`; delivery uses `res.cloudinary.com`.
 */
export const remoteImagePatterns = [
  {
    protocol: "https" as const,
    hostname: "res.cloudinary.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];
