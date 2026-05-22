/**
 * This app ships with **Vite + React**, not Next.js. Import `Image` from here for an API
 * aligned with `next/image` patterns: responsive `srcset`, `sizes`, lazy loading, `fetchPriority`,
 * and Cloudinary **`f_auto` / `q_auto` / `c_limit`** delivery when `VITE_CLOUDINARY_CLOUD_NAME` is set.
 *
 * Next.js `images.remotePatterns` equivalent: `src/lib/images/remotePatterns.ts` + env docs in `.env.example`.
 * Enterprise helpers: `src/lib/images/` (`buildOptimizedImageUrl`, `buildSeoImageUrl`, CMS types).
 */
export {
  OptimizedImage as default,
  OptimizedImage as Image,
  type OptimizedImageProps,
  type ImageVariant,
} from "./OptimizedImage";
