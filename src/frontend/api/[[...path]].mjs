/**
 * Single Vercel serverless entry for all /api/* routes (Hobby ≤12 function limit).
 * Handlers live under api/_handlers/ and are not separate Vercel functions.
 */
import { resolveApiHandler } from "./_lib/resolve-api-handler.mjs";

function pathnameFromReq(req) {
  const rawUrl = String(req.url ?? "/api");
  const pathOnly = rawUrl.split("?")[0] || "/api";

  // Optional catch-all: /api/[[...path]] → query.path is string | string[]
  const slug = req.query?.path;
  if (slug != null) {
    const parts = Array.isArray(slug) ? slug : [slug];
    const joined = parts.filter(Boolean).join("/");
    return joined ? `/api/${joined}` : "/api";
  }

  // Rewrite fallback: /api/booking → /api while original path may be in headers
  const forwarded =
    req.headers?.["x-forwarded-uri"] ||
    req.headers?.["x-invoke-path"] ||
    req.headers?.["x-vercel-original-path"];
  if (typeof forwarded === "string" && forwarded.startsWith("/api")) {
    return forwarded.split("?")[0];
  }

  if (pathOnly.startsWith("/api")) return pathOnly;
  return `/api${pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`}`;
}

export default async function handler(req, res) {
  const pathname = pathnameFromReq(req);
  const route = resolveApiHandler(pathname, req.method);

  if (!route) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
    return;
  }

  // Preserve full URL (path + query) for handlers that parse req.url
  if (!String(req.url ?? "").startsWith("/api/") && pathname.startsWith("/api/")) {
    const qs = String(req.url ?? "").includes("?")
      ? `?${String(req.url).split("?").slice(1).join("?")}`
      : "";
    req.url = `${pathname}${qs}`;
  }

  return route(req, res);
}
