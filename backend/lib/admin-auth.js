/** Server-only secret — never read VITE_* (client-exposed) on the API. */
export function getAdminApiSecret() {
  return String(process.env.ADMIN_API_SECRET ?? "").trim();
}

export function isAdminRequest(req) {
  const expected = getAdminApiSecret();
  if (!expected) return false;
  const header =
    req.headers?.["x-admin-secret"] ??
    req.headers?.["X-Admin-Secret"];
  return String(header ?? "").trim() === expected;
}
