/** Server-only secret — never read VITE_* (client-exposed) on the API. */
import { isProduction } from "./env-config.js";

export function getAdminApiSecret() {
  const primary = String(process.env.ADMIN_API_SECRET ?? "").trim();
  if (primary) return primary;
  // Local/dev convenience: allow UI secret when server secret is unset.
  if (!isProduction()) {
    return String(process.env.VITE_ADMIN_SECRET ?? "").trim();
  }
  return "";
}

export function isAdminRequest(req) {
  const expected = getAdminApiSecret();
  if (!expected) return false;
  const header =
    req.headers?.["x-admin-secret"] ??
    req.headers?.["X-Admin-Secret"];
  return String(header ?? "").trim() === expected;
}
