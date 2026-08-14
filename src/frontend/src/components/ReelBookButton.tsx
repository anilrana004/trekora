import { Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";

import type { TrekReel } from "@/data/trek-reels";
import { reelBookCta } from "@/lib/reel-book-cta";

type ReelBookButtonProps = {
  reel: TrekReel;
  currentProductSlug?: string;
  variant?: "card" | "lightbox" | "feed";
  ocidPrefix?: string;
  index?: number;
};

const VARIANT_CLASS = {
  card: "btn-primary relative z-20 w-full justify-center gap-1.5 text-[11px] sm:text-xs py-2.5 px-3 min-h-[44px] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]",
  lightbox:
    "btn-primary relative z-20 w-full justify-center gap-2 text-sm py-3 px-4 min-h-[48px] shadow-lg",
  feed: "reel-feed__book btn-primary relative z-20 justify-center gap-1.5 shadow-lg transition-transform active:scale-[0.97]",
} as const;

export default function ReelBookButton({
  reel,
  currentProductSlug,
  variant = "card",
  ocidPrefix = "reels",
  index,
}: ReelBookButtonProps) {
  const cta = reelBookCta(reel, currentProductSlug);
  if (!cta || !reel.productSlug) return null;

  const mi = index !== undefined ? `.${index + 1}` : "";
  const isCompact = variant !== "lightbox";
  const className = VARIANT_CLASS[variant];
  const stop = {
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
    onPointerDown: (e: React.PointerEvent) => e.stopPropagation(),
  };
  const icon = (
    <>
      <Calendar size={isCompact ? 14 : 16} aria-hidden className="shrink-0" />
      {cta.label}
    </>
  );

  if (cta.to === "/book" && cta.search) {
    return (
      <Link
        to="/book"
        search={cta.search}
        {...stop}
        className={className}
        data-ocid={`${ocidPrefix}.reel.book${mi}`}
      >
        {icon}
      </Link>
    );
  }

  if (reel.productType === "yatra") {
    return (
      <Link
        to="/yatras/$slug"
        params={{ slug: reel.productSlug }}
        {...stop}
        className={className}
        data-ocid={`${ocidPrefix}.reel.book${mi}`}
      >
        {icon}
      </Link>
    );
  }

  return (
    <Link
      to="/treks/$slug"
      params={{ slug: reel.productSlug }}
      {...stop}
      className={className}
      data-ocid={`${ocidPrefix}.reel.book${mi}`}
    >
      {icon}
    </Link>
  );
}
