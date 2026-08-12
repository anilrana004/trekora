import { TREKORA_PUBLIC_SITE_ORIGIN } from "./public-site-origin";

/** Production admin UI host — never the marketing www origin. */
export const TREKORA_ADMIN_ORIGIN = "https://admin.trekora.in";

function stripSlash(origin: string): string {
  return origin.replace(/\/$/, "");
}

/**
 * Resolve admin origin. Prefer VITE_ADMIN_ORIGIN; otherwise derive
 * admin.* from the marketing www host.
 */
export function resolveAdminOrigin(
  envValue: string | undefined,
  siteOrigin: string = TREKORA_PUBLIC_SITE_ORIGIN,
): string {
  const fromEnv = envValue?.trim();
  if (fromEnv) {
    try {
      const u = new URL(fromEnv.includes("://") ? fromEnv : `https://${fromEnv}`);
      return stripSlash(u.origin);
    } catch {
      /* fall through */
    }
  }

  try {
    const site = new URL(siteOrigin);
    if (site.hostname.startsWith("www.")) {
      site.hostname = `admin.${site.hostname.slice(4)}`;
      return stripSlash(site.origin);
    }
    if (site.hostname === "trekora.in" || site.hostname.endsWith(".trekora.in")) {
      return TREKORA_ADMIN_ORIGIN;
    }
  } catch {
    /* fall through */
  }

  return TREKORA_ADMIN_ORIGIN;
}

export const ADMIN_ORIGIN = resolveAdminOrigin(
  import.meta.env.VITE_ADMIN_ORIGIN,
  import.meta.env.VITE_SITE_ORIGIN,
);

function currentHostname(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.toLowerCase();
}

/** Local Vite / preview — keep /admin on the same origin. */
export function isLocalDevHost(hostname = currentHostname()): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local")
  );
}

export function getAdminHostname(): string {
  try {
    return new URL(ADMIN_ORIGIN).hostname.toLowerCase();
  } catch {
    return "admin.trekora.in";
  }
}

/** True when the browser is on the admin subdomain. */
export function isAdminHost(hostname = currentHostname()): boolean {
  if (!hostname || isLocalDevHost(hostname)) return false;
  return hostname === getAdminHostname();
}

/**
 * Enforce www ↔ admin.trekora.in redirects in production.
 * Disabled on localhost so `pnpm dev` keeps using /admin on the same port.
 */
export function shouldEnforceAdminSubdomain(
  hostname = currentHostname(),
): boolean {
  return Boolean(hostname) && !isLocalDevHost(hostname);
}

export function isAdminPathname(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/** Absolute admin URL for a path that already starts with /admin. */
export function adminAbsoluteUrl(pathname: string, search = ""): string {
  const path = isAdminPathname(pathname) ? pathname : `/admin${pathname || ""}`;
  return `${ADMIN_ORIGIN}${path}${search || ""}`;
}
