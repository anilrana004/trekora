import { isFeatureLive } from "@/lib/dormant-features";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, MapPin, Star } from "lucide-react";
import TrailConditionBadge from "../components/TrailConditionBadge";
import { CompareButton } from "../components/TrekCompare";
import WishlistHeart from "../components/WishlistHeart";
import type { Trek } from "../data/treks";
import OptimizedImage from "./media/OptimizedImage";

interface TrekCardProps {
  trek: Trek;
  /** `/treks` listing: same structure & colors as `YatrasPage` cards (parent supplies `motion.div.card`). */
  variant?: "default" | "compact" | "listing";
  index?: number;
  showEmiBadge?: boolean;
  /** Narrow carousels (e.g. homepage Recommended Treks): smaller CTA + tighter footer. */
  compactCta?: boolean;
}

function stateLabel(s: string): string {
  return s === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
}

export default function TrekCard({
  trek,
  variant = "default",
  index,
  showEmiBadge,
  compactCta,
}: TrekCardProps) {
  const showEmi =
    isFeatureLive("emi") &&
    (showEmiBadge !== undefined ? showEmiBadge : trek.price > 8000);
  const mi = index !== undefined ? `.${index + 1}` : "";
  const safeRating = trek.rating ?? 4.5;
  const safeReviewCount = trek.reviewCount ?? 0;
  const stars = Math.round(safeRating);

  if (variant === "listing") {
    return (
      <div className="flex flex-col h-full" data-ocid={`trek.card${mi}`}>
        <div className="relative h-52 overflow-hidden trek-card-img">
          <OptimizedImage
            src={trek.image}
            alt={trek.name}
            fill
            variant="trek-card"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white max-w-[55%] truncate"
            style={{ backgroundColor: "var(--ew-red)" }}
          >
            {trek.difficulty}
          </span>
          <span
            className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full max-w-[42%] truncate"
            style={{
              backgroundColor: "var(--ew-red-lt)",
              color: "var(--ew-red)",
            }}
          >
            {stateLabel(trek.state)}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3
            className="font-bold text-lg mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            {trek.name}
          </h3>
          <p
            className="text-sm line-clamp-2 mb-3"
            style={{ color: "var(--ew-text-lt)" }}
          >
            {trek.shortDesc}
          </p>
          <div
            className="flex items-center gap-4 text-xs mb-3"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            <span className="flex items-center gap-1 shrink-0">
              <Clock size={12} aria-hidden /> {trek.duration} Days
            </span>
            <span className="flex items-center gap-1 min-w-0">
              <MapPin size={12} className="shrink-0" aria-hidden />
              <span className="truncate">{trek.startPoint}</span>
            </span>
          </div>
          <div
            className="flex items-center justify-between pt-3 border-t mt-auto gap-3"
            style={{ borderColor: "var(--ew-gray-mid)" }}
          >
            <div>
              <span
                className="text-xs"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Starting from
              </span>
              <div
                className="font-bold text-lg"
                style={{ color: "var(--ew-orange)" }}
              >
                ₹{trek.price.toLocaleString("en-IN")}
              </div>
            </div>
            <Link
              to="/treks/$slug"
              params={{ slug: trek.slug }}
              className="btn-secondary text-sm shrink-0 inline-flex items-center gap-1"
              data-ocid={`trek.view_details_button${mi}`}
            >
              View Trek <ChevronRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card flex flex-col h-full group cursor-default"
      data-ocid={`trek.card${mi}`}
    >
      <div className="relative h-52 w-full overflow-hidden">
        <OptimizedImage
          src={trek.image}
          alt={trek.name}
          fill
          variant="trek-card"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white max-w-[calc(100%-5rem)] truncate"
          style={{ backgroundColor: "var(--ew-red)" }}
        >
          {trek.difficulty}
        </span>
        <span
          className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full max-w-[40%] truncate"
          style={{
            backgroundColor: "var(--ew-red-lt)",
            color: "var(--ew-red)",
          }}
        >
          {stateLabel(trek.state)}
        </span>
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 flex-wrap pointer-events-none [&_*]:pointer-events-auto max-w-[72%]">
          {showEmi && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--ew-orange-lt)",
                color: "var(--ew-orange)",
              }}
            >
              EMI Available
            </span>
          )}
          <TrailConditionBadge trekSlug={trek.slug} variant="dot" />
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <WishlistHeart
            id={String(trek.id)}
            name={trek.name}
            type="trek"
            className="relative top-0 right-0"
          />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-lg mb-1"
          style={{ color: "var(--ew-text)" }}
        >
          {trek.name}
        </h3>

        <div className="flex items-center gap-0.5 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={12}
              className={
                i <= stars
                  ? "fill-[var(--ew-gold)] text-[var(--ew-gold)]"
                  : "fill-none text-[var(--ew-gold)] opacity-35"
              }
            />
          ))}
          <span
            className="text-xs font-semibold ml-1"
            style={{ color: "var(--ew-text)" }}
          >
            {safeRating}
          </span>
          <span className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
            {safeReviewCount === 0
              ? " · Be the first to review!"
              : ` (${safeReviewCount})`}
          </span>
        </div>

        {variant !== "compact" && (
          <p
            className="text-sm line-clamp-2 mb-3"
            style={{ color: "var(--ew-text-lt)" }}
          >
            {trek.shortDesc}
          </p>
        )}

        <div
          className="flex items-center gap-4 text-xs mb-3"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden /> {trek.duration} Days
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPin size={12} className="shrink-0" aria-hidden />
            <span className="truncate">{trek.startPoint}</span>
          </span>
        </div>

        {trek.tags && trek.tags.length > 0 && variant !== "compact" && (
          <div className="flex flex-wrap gap-1 mb-3">
            {trek.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: "var(--ew-gray-lt)",
                  color: "#555",
                  borderColor: "var(--ew-gray-mid)",
                }}
              >
                {tag}
              </span>
            ))}
            {trek.tags.length > 3 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full border cursor-default"
                title={trek.tags.slice(3).join(" · ")}
                style={{
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                  borderColor: "var(--ew-orange)",
                }}
              >
                +{trek.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div
          className="flex flex-col gap-3 pt-3 border-t mt-auto"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          {compactCta ? (
            <>
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span
                    className="text-[10px] uppercase tracking-wide font-medium block"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    Starting from
                  </span>
                  <div
                    className="font-bold text-base leading-tight truncate"
                    style={{ color: "var(--ew-orange)" }}
                  >
                    ₹{trek.price.toLocaleString("en-IN")}
                  </div>
                </div>
                <CompareButton trekId={trek.slug} />
              </div>
              <Link
                to="/treks/$slug"
                params={{ slug: trek.slug }}
                className="w-full justify-center text-[11px] font-semibold py-1.5 px-3 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] inline-flex items-center gap-1 hover:bg-[var(--ew-red)] hover:text-white transition-colors"
                data-ocid={`trek.view_details_button${mi}`}
              >
                View Details <ChevronRight size={12} aria-hidden />
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <span
                  className="text-xs"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Starting from
                </span>
                <div
                  className="font-bold text-lg"
                  style={{ color: "var(--ew-orange)" }}
                >
                  ₹{trek.price.toLocaleString("en-IN")}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <CompareButton trekId={trek.slug} />
                <Link
                  to="/treks/$slug"
                  params={{ slug: trek.slug }}
                  className="btn-secondary text-sm inline-flex items-center gap-1 whitespace-nowrap"
                  data-ocid={`trek.view_details_button${mi}`}
                >
                  View Details <ChevronRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
