/** Opaque session flag — never store the raw secret in sessionStorage. */
const ADMIN_SESSION_KEY = "trekora_admin_session";
const ADMIN_SESSION_OK = "1";

function envTruthy(name: string): boolean {
  const raw = import.meta.env[name];
  return raw === "true" || raw === "1";
}

/** When false, /admin routes redirect to home (production default). */
export function isAdminUiEnabled(): boolean {
  return envTruthy("VITE_ADMIN_ENABLED");
}

/** Shared secret gate — set a long random value in Vercel env. */
export function getAdminSecret(): string {
  return String(import.meta.env.VITE_ADMIN_SECRET ?? "").trim();
}

export function hasAdminSession(): boolean {
  if (!isAdminUiEnabled()) return false;
  const secret = getAdminSecret();
  if (!secret) return false;
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === ADMIN_SESSION_OK;
  } catch {
    return false;
  }
}

export function grantAdminSession(secret: string): boolean {
  const expected = getAdminSecret();
  if (!expected || secret !== expected) return false;
  try {
    sessionStorage.setItem(ADMIN_SESSION_KEY, ADMIN_SESSION_OK);
    return true;
  } catch {
    return false;
  }
}

export function revokeAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    /* ignore */
  }
}
