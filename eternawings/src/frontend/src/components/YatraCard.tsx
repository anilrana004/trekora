import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import type { Yatra } from "../data/yatras";
import WishlistHeart from "./WishlistHeart";
import OptimizedImage from "./media/OptimizedImage";

interface YatraCardProps {
  yatra: Yatra;
  index?: number;
}

const YATRA_ICONS: Record<string, string> = {
  uttarakhand: "🕉️",
  himachal: "🙏",
};

export default function YatraCard({ yatra, index }: YatraCardProps) {
  const mi = index !== undefined ? `.${index + 1}` : "";
  const rating = yatra.rating ?? 4.7;
  const reviewCount = yatra.reviewCount ?? 0;
  const stars = Math.round(rating);
  const stateIcon = YATRA_ICONS[yatra.state] ?? "🛕";
  const stateLabel =
    yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";

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
      transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.8 }}
      data-ocid={`yatra.card${mi}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <OptimizedImage
            src={yatra.image}
            alt={yatra.name}
            fill
            variant="yatra-card"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Spiritual badge */}
        <span
          className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
        >
          🛕 Yatra
        </span>
        {/* State badge */}
        <span className="absolute top-2 right-10 badge-orange text-[10px]">
          {stateLabel}
        </span>
        {/* Wishlist heart */}
        <WishlistHeart id={String(yatra.id)} name={yatra.name} type="yatra" />
        {/* Duration bottom left */}
        <span
          className="absolute bottom-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
          }}
        >
          {yatra.duration} Days
        </span>
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
            {rating}
          </span>
          <span className="text-[11px] text-[var(--ew-gray-dark)] ml-0.5">
            {reviewCount === 0 ? "Be the first!" : `(${reviewCount})`}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-semibold text-[15px] leading-snug line-clamp-1 mb-0.5"
          style={{ color: "var(--ew-text)" }}
        >
          {stateIcon} {yatra.name}
        </h3>

        {/* Duration + State */}
        <p className="text-[12px] text-[var(--ew-gray-dark)] mb-2">
          {yatra.duration} Days &nbsp;|&nbsp; {stateLabel}
        </p>

        {/* Short desc */}
        <p className="text-[11px] text-[var(--ew-gray-dark)] line-clamp-2 mb-2 flex-1">
          {yatra.description.substring(0, 100)}…
        </p>

        {/* Tags */}
        {yatra.tags && yatra.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {yatra.tags.slice(0, 4).map((tag) => (
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
            {yatra.tags.length > 4 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full border cursor-default"
                title={yatra.tags.slice(4).join(" · ")}
                style={{
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                  borderColor: "var(--ew-orange)",
                }}
              >
                +{yatra.tags.length - 4}
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
            className="text-[18px] font-bold transition-colors duration-200 group-hover:text-[var(--ew-red)]"
            style={{ color: "var(--ew-orange)" }}
          >
            ₹{yatra.price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* View button */}
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(192,0,28,0.3)" }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="rounded"
        >
          <Link
            to="/yatras/$slug"
            params={{ slug: yatra.slug }}
            className="block text-center text-[13px] font-semibold border-2 border-[var(--ew-red)] text-[var(--ew-red)] rounded py-1.5 hover:bg-[var(--ew-red)] hover:text-white transition-colors"
            data-ocid={`yatra.view_details_button${mi}`}
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
