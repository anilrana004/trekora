import { isProduction } from "./env-config.js";

function requestId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Structured request logging — no bodies, no secrets.
 */
export function requestLoggerMiddleware(req, res, next) {
  const id = requestId();
  req.requestId = id;
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    const line = JSON.stringify({
      level: res.statusCode >= 500 ? "error" : "info",
      requestId: id,
      method: req.method,
      path: req.originalUrl?.split("?")[0] ?? req.url,
      status: res.statusCode,
      ms: Math.round(ms),
      ...(isProduction() ? {} : { ip: req.ip }),
    });
    const out = res.statusCode >= 500 ? process.stderr : process.stdout;
    out.write(`${line}\n`);
  });

  next();
}
