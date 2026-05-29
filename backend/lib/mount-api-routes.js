/**
 * Registers Mongo API routes at /api and /api/v1 (versioned alias).
 */
import galleryRoutes from "../routes/gallery.routes.js";
import weatherRoutes from "../routes/weather.routes.js";
import productPhotoRoutes from "../routes/product-photo.routes.js";
import giftCardRoutes from "../routes/giftcard.routes.js";
import reviewRoutes from "../routes/review.routes.js";
import voucherRoutes from "../routes/voucher.routes.js";
import {
  apiGeneralLimiter,
  apiWriteLimiter,
} from "./rate-limit.js";
import { cacheControlMiddleware } from "./cache-headers.js";

/**
 * @param {import("express").Express} app
 */
export function mountApiRoutes(app) {
  const mounts = [
    {
      base: "/api/vouchers",
      router: voucherRoutes,
      limiter: apiWriteLimiter,
      cache: null,
    },
    {
      base: "/api/giftcards",
      router: giftCardRoutes,
      limiter: apiWriteLimiter,
      cache: null,
    },
    {
      base: "/api/reviews",
      router: reviewRoutes,
      limiter: apiGeneralLimiter,
      cache: cacheControlMiddleware(45, 90),
    },
    {
      base: "/api/gallery",
      router: galleryRoutes,
      limiter: apiGeneralLimiter,
      cache: cacheControlMiddleware(60, 120),
    },
    {
      base: "/api/weather",
      router: weatherRoutes,
      limiter: apiGeneralLimiter,
      cache: cacheControlMiddleware(30, 60),
    },
    {
      base: "/api/product-photos",
      router: productPhotoRoutes,
      limiter: apiWriteLimiter,
      cache: null,
    },
  ];

  for (const { base, router, limiter, cache } of mounts) {
    const stack = [limiter, ...(cache ? [cache] : []), router];
    app.use(base, ...stack);
    app.use(`/api/v1${base.slice(4)}`, ...stack);
  }
}
