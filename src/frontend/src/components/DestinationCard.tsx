import { Link } from "@tanstack/react-router";
import { motion } from "@/lib/motion";
import type { CSSProperties, ReactNode } from "react";
import { resolveDestinationNavigation } from "../data/destination-treks";
import type { Destination } from "../data/destinations";
import OptimizedImage from "./media/OptimizedImage";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function DestinationTrekLink({
  dest,
  className,
  style,
  children,
  dataOcid,
}: {
  dest: Destination;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  dataOcid?: string;
}) {
  const nav = resolveDestinationNavigation(dest);
  const linkProps = { className, style, "data-ocid": dataOcid };

  if (nav.type === "trek") {
    return (
      <Link to="/treks/$slug" params={{ slug: nav.slug }} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (nav.type === "treks") {
    return (
      <Link
        to="/treks"
        search={{ destination: nav.destinationSlug }}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  if (nav.type === "yatras") {
    return (
      <Link to="/yatras" {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      to="/treks/state/$state"
      params={{ state: nav.stateSlug }}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export default function DestinationCard({
  dest,
  index,
}: {
  dest: Destination;
  index: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ transformOrigin: "center center" }}
      className="group bg-white rounded-xl overflow-hidden relative"
      data-ocid={`destination.card.${index + 1}`}
    >
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 z-10 pointer-events-none"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "var(--ew-red)",
          transformOrigin: "top",
        }}
      />

      <DestinationTrekLink
        dest={dest}
        className="block"
        dataOcid={`destination.card_image.${index + 1}`}
      >
        <motion.div
          className="h-[200px] sm:h-[220px] overflow-hidden relative bg-[#e8e4dc]"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <OptimizedImage
            src={dest.image}
            alt={`${dest.name} — ${dest.tagline}`}
            fill
            variant="destination"
            priority={index < 8}
            className="!object-cover !object-center"
            style={{ objectPosition: "center center" }}
          />
          <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <span
            className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "var(--ew-red)", color: "#fff" }}
          >
            {dest.stateBadge}
          </span>
          {dest.trekCount > 0 && (
            <span
              className="absolute bottom-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "var(--ew-orange)", color: "#fff" }}
            >
              {dest.trekCount} Trek{dest.trekCount !== 1 ? "s" : ""}
            </span>
          )}
          {dest.yatraCount ? (
            <span
              className="absolute bottom-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "rgba(192,0,28,0.85)", color: "#fff" }}
            >
              {dest.yatraCount} Yatra{dest.yatraCount !== 1 ? "s" : ""}
            </span>
          ) : null}
        </motion.div>
      </DestinationTrekLink>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <h3
            className="font-bold text-[16px] leading-tight truncate"
            style={{ color: "var(--ew-text)" }}
          >
            {dest.name}
          </h3>
          <span
            className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
              background: "var(--ew-red-lt)",
              color: "var(--ew-red)",
            }}
          >
            {dest.state}
          </span>
        </div>

        <p
          className="text-[12px] leading-relaxed line-clamp-2"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {dest.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "var(--ew-gray-lt)",
              color: "var(--ew-gray-dark)",
            }}
          >
            &#9650; {dest.altitude}
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "var(--ew-gray-lt)",
              color: "var(--ew-gray-dark)",
            }}
          >
            &#128336; {dest.bestSeason}
          </span>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="mt-1"
        >
          <DestinationTrekLink
            dest={dest}
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[13px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--ew-orange)", color: "#fff" }}
            dataOcid={`destination.explore_button.${index + 1}`}
          >
            View destination
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </DestinationTrekLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
