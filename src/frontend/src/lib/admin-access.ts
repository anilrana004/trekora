import {
  isAdminHost,
  shouldEnforceAdminSubdomain,
} from "@/lib/admin-host";

/** Session flag — opaque OK marker. */
const ADMIN_SESSION_KEY = "trekora_admin_session";
/** Typed secret for this tab only — never bake into the client bundle. */
const ADMIN_SECRET_KEY = "trekora_admin_secret";
const ADMIN_SESSION_OK = "1";

function envTruthy(name: string): boolean {
  const raw = import.meta.env[name];
  return raw === "true" || raw === "1";
}

/**
 * Admin UI availability:
 * - `admin.trekora.in` → always on (still gated by ADMIN_API_SECRET)
 * - localhost / preview → only when `VITE_ADMIN_ENABLED=true`
 * - www storefront never serves /admin (router sends users to the admin host)
 */
export function isAdminUiEnabled(): boolean {
  if (shouldEnforceAdminSubdomain() && isAdminHost()) return true;
  return envTruthy("VITE_ADMIN_ENABLED");
}

/**
 * Secret entered at unlock (sessionStorage). Used as `x-admin-secret` for API calls.
 * Must match server `ADMIN_API_SECRET` — never use `VITE_ADMIN_SECRET` in the client.
 */
export function getAdminSecret(): string {
  try {
    return String(sessionStorage.getItem(ADMIN_SECRET_KEY) ?? "").trim();
  } catch {
    return "";
  }
}

export function hasAdminSession(): boolean {
  if (!isAdminUiEnabled()) return false;
  try {
    return (
      sessionStorage.getItem(ADMIN_SESSION_KEY) === ADMIN_SESSION_OK &&
      getAdminSecret().length > 0
    );
  } catch {
    return false;
  }
}

/**
 * Verify secret against the API, then keep it in sessionStorage for this tab.
 */
export async function grantAdminSession(secret: string): Promise<boolean> {
  const trimmed = secret.trim();
  if (!trimmed) return false;
  try {
    const res = await fetch("/api/blogs/meta/media", {
      headers: { "x-admin-secret": trimmed },
    });
    if (!res.ok) return false;
    sessionStorage.setItem(ADMIN_SECRET_KEY, trimmed);
    sessionStorage.setItem(ADMIN_SESSION_KEY, ADMIN_SESSION_OK);
    return true;
  } catch {
    return false;
  }
}

export function revokeAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    sessionStorage.removeItem(ADMIN_SECRET_KEY);
  } catch {
    /* ignore */
  }
}
