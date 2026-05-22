/** Routes with hero + listing sticky toolbar (mobile scroll chrome). */
const LISTING_CHROME_PATH =
  /^\/(treks|yatras|packages|destinations|blog|gallery|corporate)(\/|$)/;

export function isListingScrollChromeRoute(pathname: string): boolean {
  return LISTING_CHROME_PATH.test(pathname);
}

export const LISTING_SCROLL_IDLE_MS = 200;
