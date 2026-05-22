import zlib from "node:zlib";
import { promisify } from "node:util";

const gzipAsync = promisify(zlib.gzip);

const MIN_BYTES = 1400;

/**
 * Gzip JSON responses when client accepts it (Railway/Vercel-friendly, no extra deps).
 */
export function compressionMiddleware(req, res, next) {
  const accept = String(req.headers["accept-encoding"] ?? "");
  if (!accept.includes("gzip")) return next();

  const originalJson = res.json.bind(res);

  res.json = function jsonGzip(body) {
    const payload = JSON.stringify(body);
    if (Buffer.byteLength(payload) < MIN_BYTES) {
      return originalJson(body);
    }

    gzipAsync(Buffer.from(payload))
      .then((buf) => {
        if (res.headersSent) return;
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.removeHeader("Content-Length");
        res.status(res.statusCode || 200).end(buf);
      })
      .catch(() => {
        if (!res.headersSent) originalJson(body);
      });

    return res;
  };

  next();
}
