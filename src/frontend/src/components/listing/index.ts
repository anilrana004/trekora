/**
 * Listing page UI — import from here when adding or updating listing toolbars.
 *
 * Pattern:
 * 1. Wrap page in Layout (provides ListingScrollChromeProvider).
 * 2. Place TRAVEL_HERO_SENTINEL_ID sentinel after hero.
 * 3. Use ListingStickyToolbar for sticky chrome (navbar swap on mobile).
 * 4. Put region/category pills in ListingToolbarRegions.
 * 5. Put search/sort controls in a *Filters component (e.g. TreksListingFilters).
 *
 * Styles: index.css → `.listing-sticky-toolbar*` (change once, all listings update).
 * Routes: lib/listing-scroll-chrome.ts (add path when introducing a new listing page).
 */

export { default as ListingStickyToolbar } from "../ListingStickyToolbar";
export type { ListingStickyToolbarProps } from "../ListingStickyToolbar";

export { default as ListingToolbarRegions } from "../ListingToolbarRegions";
export type { ListingToolbarRegionsProps } from "../ListingToolbarRegions";

export { default as ListingRegionFilterPills } from "../ListingRegionFilterPills";
export type {
  ListingRegionFilterPillsProps,
  ListingRegionTab,
} from "../ListingRegionFilterPills";
