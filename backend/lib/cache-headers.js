/**
 * CDN/browser cache hints for read-heavy API routes (Redis-ready later).
 */

export function cacheControlMiddleware(maxAgeSec = 60, staleWhileRevalidate = 120) {
  return function cacheControl(req, res, next) {
    if (req.method === "GET") {
      res.setHeader(
        "Cache-Control",
        `public, max-age=${maxAgeSec}, stale-while-revalidate=${staleWhileRevalidate}`,
      );
    } else {
      res.setHeader("Cache-Control", "no-store");
    }
    next();
  };
}
