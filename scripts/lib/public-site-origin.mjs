/** Public marketing site — never the API host. Used for sitemap, robots, canonicals. */
export const TREKORA_PUBLIC_SITE_ORIGIN = "https://www.trekora.in";

/**
 * Resolve the public marketing origin for SEO URLs.
 * Rejects api.* hosts and bare trekora.in (non-www).
 */
export function resolvePublicSiteOrigin(envValue) {
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

/** Sitemap and robots.txt must always target the live marketing domain. */
export function resolveSitemapSiteOrigin(envValue) {
  const resolved = resolvePublicSiteOrigin(envValue);
  if (resolved !== TREKORA_PUBLIC_SITE_ORIGIN) {
    // Preview/staging URLs are allowed for non-trekora hosts only.
    try {
      const { hostname } = new URL(resolved);
      if (hostname.endsWith("trekora.in")) {
        return TREKORA_PUBLIC_SITE_ORIGIN;
      }
    } catch {
      return TREKORA_PUBLIC_SITE_ORIGIN;
    }
  }
  return TREKORA_PUBLIC_SITE_ORIGIN;
}
