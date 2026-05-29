/**
 * Production HTTP hardening (no secrets). Safe defaults for Railway + Vercel split deploy.
 */
import { isProduction } from "./env-config.js";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function securityHeadersMiddleware(_req, res, next) {
  res.removeHeader("X-Powered-By");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; frame-ancestors 'none'",
  );
  if (isProduction()) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }
  next();
}

/** Strip control chars; cap length for text fields. */
export function sanitizeText(value, maxLen = 2000) {
  if (value == null) return "";
  return String(value)
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function normalizeSlug(slug) {
  const s = sanitizeText(slug, 120).toLowerCase();
  if (!s || !SLUG_RE.test(s)) return "";
  return s;
}

export function sanitizeTagList(tags, max = 12) {
  if (!Array.isArray(tags)) return [];
  const out = [];
  for (const raw of tags) {
    const t = sanitizeText(raw, 80).toLowerCase();
    if (!t || out.includes(t)) continue;
    out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

export function parsePositiveInt(value, fallback, max = 10_000) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(Math.floor(n), max);
}
