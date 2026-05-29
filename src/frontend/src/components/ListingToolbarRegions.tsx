import type { ReactNode } from "react";

export interface ListingToolbarRegionsProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standard wrapper for region/category pills inside {@link ListingStickyToolbar}.
 * Use this instead of duplicating `listing-sticky-toolbar__regions` markup on each page.
 * Optional `className` (e.g. `py-2.5`) for page-specific vertical padding only.
 */
export default function ListingToolbarRegions({
  children,
  className = "",
}: ListingToolbarRegionsProps) {
  return (
    <div
      className={`listing-sticky-toolbar__regions container mx-auto px-4${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
