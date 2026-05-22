/**
 * Lightweight in-memory rate limiter for the discount/review API.
 * Suitable for single-instance Railway deploys; use Redis for multi-instance.
 */

const buckets = new Map();

function clientKey(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

/**
 * @param {{ windowMs?: number; max?: number; message?: string }} [opts]
 */
export function createRateLimiter(opts = {}) {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 120;
  const message =
    opts.message ?? "Too many requests. Please wait a moment and try again.";

  return function rateLimitMiddleware(req, res, next) {
    const key = clientKey(req);
    const now = Date.now();
    let bucket = buckets.get(key);
    if (!bucket || now >= bucket.resetAt) {
      bucket = { count: 0, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }
    bucket.count += 1;

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader(
      "X-RateLimit-Remaining",
      String(Math.max(0, max - bucket.count)),
    );
    res.setHeader(
      "X-RateLimit-Reset",
      String(Math.ceil(bucket.resetAt / 1000)),
    );

    if (bucket.count > max) {
      res.setHeader("Retry-After", String(Math.ceil((bucket.resetAt - now) / 1000)));
      return res.status(429).json({ success: false, message });
    }
    return next();
  };
}

/** Stricter limit for write endpoints (reviews, uploads metadata). */
export const apiWriteLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 30,
});

/** General read/write API traffic. */
export const apiGeneralLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 180,
});
