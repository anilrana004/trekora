/** Below lg: filters can replace navbar while scrolling. Desktop uses sticky-only (no swap). */
export const LISTING_CHROME_PIN_MEDIA = "(max-width: 1023px)";

/** Routes with hero + listing sticky toolbar (scroll chrome on mobile + desktop). */
const LISTING_CHROME_PATH =
  /^\/(treks|yatras|packages|blog|corporate|upcoming-batches|destinations|gallery)(\/|$)/;

export function isListingScrollChromeRoute(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return true;
  return LISTING_CHROME_PATH.test(pathname);
}

/** Home uses sticky search only — no navbar swap / fixed toolbar slide-in on scroll. */
export function isListingChromeNavbarSwapRoute(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return false;
  return isListingScrollChromeRoute(pathname);
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
