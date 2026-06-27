import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, MapPin } from "lucide-react";
import { motion } from "@/lib/motion";
import type { Yatra } from "../data/yatras";
import OptimizedImage from "./media/OptimizedImage";

const SIGNIFICANCE_LABELS: Record<string, string> = {
  "char-dham-yatra": "Moksha Pilgrimage",
  "panch-kedar-yatra": "Shiva Circuit",
  "panch-badri-yatra": "Vishnu Circuit",
  "hemkund-sahib-yatra": "Sikh Pilgrimage",
  "adi-kailash-om-parvat": "Indian Kailash",
  "kartik-swami-temple": "Kartikeya Shrine",
  "triyuginarayan-temple": "Divine Wedding Site",
  "mani-mahesh-yatra": "Shiva's Throne",
  "kinnaur-kailash-yatra": "Sacred Parikrama",
  "shrikhand-mahadev-yatra": "Shiva Lingam",
  "churdhar-yatra": "Shirgul Maharaj",
};

function stateLabel(state: Yatra["state"]): string {
  return state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
}

function significanceBadge(yatra: Yatra): string {
  return SIGNIFICANCE_LABELS[yatra.slug] ?? stateLabel(yatra.state);
}

interface YatraCardProps {
  yatra: Yatra;
  index?: number;
  /** Matches `TrekCard` listing on `/treks` and home carousels. */
  variant?: "default" | "listing";
  /** Narrow carousels: smaller CTA row (same as `TrekCard`). */
  compactCta?: boolean;
}

export default function YatraCard({
  yatra,
  index,
  variant = "default",
  compactCta,
}: YatraCardProps) {
  const mi = index !== undefined ? `.${index + 1}` : "";

  const body = (
    <>
      <div className="relative h-52 overflow-hidden trek-card-img">
        <OptimizedImage
          src={yatra.image}
          alt={yatra.name}
          fill
          variant="yatra-card"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white max-w-[55%] truncate"
          style={{ backgroundColor: "var(--ew-red)" }}
        >
          {significanceBadge(yatra)}
        </span>
        <span
          className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full max-w-[42%] truncate"
          style={{
            backgroundColor: "var(--ew-red-lt)",
            color: "var(--ew-red)",
          }}
        >
          {stateLabel(yatra.state)}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-lg mb-1"
          style={{ color: "var(--ew-text)" }}
        >
          {yatra.name}
        </h3>
        <p
          className="text-sm line-clamp-2 mb-3"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {yatra.significance}
        </p>
        <div
          className="flex items-center gap-4 text-xs mb-3"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <span className="flex items-center gap-1 shrink-0">
            <Clock size={12} aria-hidden /> {yatra.duration} Days
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <MapPin size={12} className="shrink-0" aria-hidden />
            <span className="truncate">{yatra.startPoint}</span>
          </span>
        </div>
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
                    ₹{yatra.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
              <Link
                to="/yatras/$slug"
                params={{ slug: yatra.slug }}
                className="w-full justify-center text-[11px] font-semibold py-1.5 px-3 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] inline-flex items-center gap-1 hover:bg-[var(--ew-red)] hover:text-white transition-colors"
                data-ocid={`yatra.view_details_button${mi}`}
              >
                View Yatra <ChevronRight size={12} aria-hidden />
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
                  ₹{yatra.price.toLocaleString("en-IN")}
                </div>
              </div>
              <Link
                to="/yatras/$slug"
                params={{ slug: yatra.slug }}
                className="btn-secondary text-sm shrink-0 inline-flex items-center gap-1"
                data-ocid={`yatra.view_details_button${mi}`}
              >
                View Yatra <ChevronRight size={14} aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );

  if (variant === "listing") {
    return (
      <div className="flex flex-col h-full" data-ocid={`yatra.card${mi}`}>
        {body}
      </div>
    );
  }

  return (
    <motion.div
      className="card flex flex-col h-full group cursor-default overflow-hidden bg-white"
      data-ocid={`yatra.card${mi}`}
      whileHover={{
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ transformOrigin: "center center" }}
    >
      {body}
    </motion.div>
  );
}
