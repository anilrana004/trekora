import type { CSSProperties, ReactNode } from "react";

const PRIMARY_BADGE: CSSProperties = {
  backgroundColor: "var(--ew-red)",
  color: "#fff",
};

const SECONDARY_BADGE: CSSProperties = {
  backgroundColor: "var(--ew-red-lt)",
  color: "var(--ew-red)",
};

type ListingCardBadgeRowProps = {
  /** Left badge (difficulty, package type, significance, etc.) */
  primary: ReactNode;
  /** Right badge (state, savings, etc.) */
  secondary: ReactNode;
  primaryStyle?: CSSProperties;
  secondaryStyle?: CSSProperties;
};

/**
 * Top overlay badges for trek/yatra/package listing media.
 * Flex row with gap — prevents difficulty + state pills from overlapping.
 */
export default function ListingCardBadgeRow({
  primary,
  secondary,
  primaryStyle = PRIMARY_BADGE,
  secondaryStyle = SECONDARY_BADGE,
}: ListingCardBadgeRowProps) {
  return (
    <div className="listing-card-badge-row pointer-events-none absolute top-3 left-3 right-3 z-[3] flex items-start justify-between gap-2">
      <span
        className="listing-card-badge-row__primary w-fit max-w-[calc(100%-6.5rem)] shrink truncate rounded-full px-2 py-0.5 text-xs font-semibold leading-tight whitespace-nowrap"
        style={primaryStyle}
        title={typeof primary === "string" ? primary : undefined}
      >
        {primary}
      </span>
      <span
        className="listing-card-badge-row__secondary shrink-0 rounded-full px-2 py-0.5 text-xs font-medium leading-tight whitespace-nowrap"
        style={secondaryStyle}
        title={typeof secondary === "string" ? secondary : undefined}
      >
        {secondary}
      </span>
    </div>
  );
}
