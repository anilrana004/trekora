import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import TrailConditionBadge from "../components/TrailConditionBadge";
import { CompareButton } from "../components/TrekCompare";
import WishlistHeart from "../components/WishlistHeart";
import type { Trek } from "../data/treks";

interface TrekCardProps {
  trek: Trek;
  variant?: "default" | "compact";
  index?: number;
  showEmiBadge?: boolean;
}

function difficultyClass(d: string): string {
  const map: Record<string, string> = {
    Easy: "trek-difficulty-easy",
    "Easy-Moderate": "trek-difficulty-easy",
    Moderate: "trek-difficulty-moderate",
    "Moderate-Difficult": "trek-difficulty-moderate",
    Difficult: "trek-difficulty-difficult",
    "Difficult-Extreme": "trek-difficulty-difficult",
    Extreme: "trek-difficulty-extreme",
  };
  return map[d] ?? "trek-difficulty-moderate";
}

function stateLabel(s: string): string {
  return s === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
}

export default function TrekCard({
  trek,
  variant = "default",
  index,
  showEmiBadge,
}: TrekCardProps) {
  const showEmi = showEmiBadge !== undefined ? showEmiBadge : trek.price > 8000;
  const mi = index !== undefined ? `.${index + 1}` : "";
  const safeRating = trek.rating ?? 4.5;
  const safeReviewCount = trek.reviewCount ?? 0;
  const stars = Math.round(safeRating);

  return (
    <motion.div
      className="trek-card card-hover-spring flex flex-col h-full group cursor-pointer rounded-xl overflow-hidden bg-white relative"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderLeft: "3px solid transparent",
        willChange: "transform",
      }}
      whileHover={{
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        borderLeftColor: "var(--ew-red)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.8,
      }}
      data-ocid={`trek.card${mi}`}
    >
      {/* Image */}
      <div
        className="trek-card-img relative overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <motion.img
          src={trek.image}
          alt={trek.name}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        {/* Difficulty badge top-left */}
        <span
          className={`absolute top-2 left-2 ${difficultyClass(trek.difficulty)}`}
        >
          {trek.difficulty}
        </span>
        {/* State badge top-right */}
        <span className="absolute top-2 right-10 badge-orange text-[10px]">
          {stateLabel(trek.state)}
        </span>
        {/* Wishlist heart */}
        <WishlistHeart id={String(trek.id)} name={trek.name} type="trek" />
        {/* EMI badge bottom-left */}
        {showEmi && (
          <span
            className="absolute bottom-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: "var(--ew-orange-lt)",
              color: "var(--ew-orange)",
            }}
          >
            EMI Available
          </span>
        )}
        {/* Trail condition dot — bottom-right */}
        <div className="absolute bottom-2 right-2">
          <TrailConditionBadge trekSlug={trek.slug} variant="dot" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        {/* Rating row */}
        <div className="flex items-center gap-1 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={11}
              className={
                i <= stars
                  ? "fill-[var(--ew-gold)] text-[var(--ew-gold)]"
                  : "fill-none text-[var(--ew-gold)]"
              }
            />
          ))}
          <span className="text-[11px] text-[var(--ew-text)] font-semibold ml-0.5">
            {safeRating}
          </span>
          <span className="text-[11px] text-[var(--ew-gray-dark)] ml-0.5">
            {safeReviewCount === 0
              ? "Be the first to review!"
              : `(${safeReviewCount})`}
          </span>
        </div>

        {/* Trek name */}
        <h3
          className="font-semibold text-[15px] leading-snug line-clamp-1 mb-0.5"
          style={{ color: "var(--ew-text)" }}
        >
          {trek.name}
        </h3>

        {/* Duration | State */}
        <p className="text-[12px] text-[var(--ew-gray-dark)] mb-2">
          {trek.duration} Days &nbsp;|&nbsp; {stateLabel(trek.state)}
        </p>

        {variant !== "compact" && (
          <p className="text-[11px] text-[var(--ew-gray-dark)] line-clamp-2 mb-2 flex-1">
            {trek.shortDesc}
          </p>
        )}

        {/* Tags */}
        {trek.tags && trek.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {trek.tags.slice(0, 4).map((tag) => (
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
            {trek.tags.length > 4 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full border cursor-default"
                title={trek.tags.slice(4).join(" · ")}
                style={{
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                  borderColor: "var(--ew-orange)",
                }}
              >
                +{trek.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-2">
          <p className="text-[11px] text-[var(--ew-gray-dark)]">
            Starting from
          </p>
          <p
            className="trek-price text-[18px] font-bold transition-colors duration-200 group-hover:text-[var(--ew-red)]"
            style={{ color: "var(--ew-orange)" }}
          >
            ₹{trek.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Compare button */}
        <div className="mb-2">
          <CompareButton trekId={String(trek.id)} />
        </div>

        {/* View Details button */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(192,0,28,0.3)" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="rounded"
        >
          <Link
            to="/treks/$slug"
            params={{ slug: trek.slug }}
            className="block text-center text-[13px] font-semibold border-2 border-[var(--ew-red)] text-[var(--ew-red)] rounded py-1.5 hover:bg-[var(--ew-red)] hover:text-white transition-colors"
            data-ocid={`trek.view_details_button${mi}`}
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
