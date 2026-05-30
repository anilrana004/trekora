import type { Trek } from "@/data/treks";
import type { Yatra } from "@/data/yatras";

/** Stable compare inputs for memoized trek/yatra listing cards. */
export function trekCardPropsEqual(
  prev: {
    trek: Trek;
    variant?: string;
    index?: number;
    showEmiBadge?: boolean;
    compactCta?: boolean;
  },
  next: typeof prev,
): boolean {
  return (
    prev.trek.slug === next.trek.slug &&
    prev.trek.price === next.trek.price &&
    prev.trek.rating === next.trek.rating &&
    prev.trek.reviewCount === next.trek.reviewCount &&
    prev.trek.image === next.trek.image &&
    prev.variant === next.variant &&
    prev.index === next.index &&
    prev.showEmiBadge === next.showEmiBadge &&
    prev.compactCta === next.compactCta
  );
}

export function yatraCardPropsEqual(
  prev: {
    yatra: Yatra;
    variant?: string;
    index?: number;
    compactCta?: boolean;
  },
  next: typeof prev,
): boolean {
  return (
    prev.yatra.slug === next.yatra.slug &&
    prev.yatra.price === next.yatra.price &&
    prev.yatra.image === next.yatra.image &&
    prev.variant === next.variant &&
    prev.index === next.index &&
    prev.compactCta === next.compactCta
  );
}
