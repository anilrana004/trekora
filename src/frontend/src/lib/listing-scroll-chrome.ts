/** Below lg: legacy pin media query (navbar swap disabled — sticky toolbar stays under header). */
export const LISTING_CHROME_PIN_MEDIA = "(max-width: 1023px)";

/** Routes with hero + listing sticky toolbar. */
const LISTING_CHROME_PATH =
  /^\/(treks|yatras|packages|blog|corporate|upcoming-batches|destinations|gallery)(\/|$)/;

export function isListingScrollChromeRoute(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return true;
  return LISTING_CHROME_PATH.test(pathname);
}

/**
 * Mobile navbar ↔ filter swap — disabled on all routes.
 * Contact-style flow: sticky navbar (scroll hide/show) + filters stay below header.
 */
export function isListingChromeNavbarSwapRoute(_pathname: string): boolean {
  return false;
}

/** Reserved — all listing pages use scroll chrome; kept for API compatibility. */
export function isListingScrollWithPageRoute(_pathname: string): boolean {
  return false;
}

/** How long after the last scroll before the navbar returns (avoid flicker). */
export const LISTING_SCROLL_IDLE_MS = 780;

/** Brief pause before filters replace navbar (ignores tiny scroll jitter). */
export const LISTING_CHROME_ENGAGE_DELAY_MS = 200;

/** Minimum time filters stay pinned once engaged (prevents rapid toggle). */
export const LISTING_CHROME_MIN_PINNED_MS = 450;
