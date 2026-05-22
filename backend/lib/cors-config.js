/**
 * CORS — restrict origins in production; permissive in local dev.
 */
import { isProduction } from "./env-config.js";

function parseOrigins(raw) {
  return String(raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function createCorsMiddleware() {
  const production = isProduction();
  const allowed = parseOrigins(process.env.CORS_ORIGINS);

  if (!production) {
    return (_req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS",
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, x-admin-secret",
      );
      if (_req.method === "OPTIONS") return res.status(204).end();
      next();
    };
  }

  return (req, res, next) => {
    const origin = String(req.headers.origin ?? "").trim();
    if (req.method === "OPTIONS") {
      if (origin && allowed.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,POST,PATCH,DELETE,OPTIONS",
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, x-admin-secret",
        );
        return res.status(204).end();
      }
      return res.status(403).end();
    }
    if (!origin || allowed.includes(origin)) {
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Vary", "Origin");
      }
      return next();
    }
    return res.status(403).json({ success: false, message: "Forbidden" });
  };
}
