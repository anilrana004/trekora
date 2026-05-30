/** Public marketing site — never the API host. */
export const TREKORA_PUBLIC_SITE_ORIGIN = "https://www.trekora.in";

/**
 * Resolve canonical marketing origin for SEO meta and JSON-LD.
 * Rejects api.* and non-www trekora.in when VITE_SITE_ORIGIN is misconfigured.
 */
export function resolvePublicSiteOrigin(envValue: string | undefined): string {
  const fallback = TREKORA_PUBLIC_SITE_ORIGIN;
  const raw = envValue?.replace(/\/$/, "") || fallback;

  try {
    const { hostname, protocol, host } = new URL(raw);

    if (
      hostname === "api.trekora.in" ||
      (hostname.startsWith("api.") && hostname.endsWith("trekora.in")) ||
      hostname === "trekora.in"
    ) {
      return fallback;
    }

    return `${protocol}//${host}`;
  } catch {
    return fallback;
  }
}
