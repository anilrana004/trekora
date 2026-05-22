import { Link, useSearch } from "@tanstack/react-router";
import { AlertCircle, Mountain } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ListingRegionFilterPills, {
  type ListingRegionTab,
} from "../components/ListingRegionFilterPills";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
import TreksListingFilters, {
  type TreksSortValue,
} from "../components/TreksListingFilters";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import TrekCard from "../components/TrekCard";
import { getTreksForDestination } from "../data/destination-treks";
import { getDestinationBySlug } from "../data/destinations";
import { TREKS } from "../data/treks";
import type { TrekDifficulty } from "../data/treks";
import { buildListingSEO, matchesSeoTag } from "@/lib/product-seo";

function matchDuration(duration: number, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "1-3") return duration >= 1 && duration <= 3;
  if (filter === "4-6") return duration >= 4 && duration <= 6;
  if (filter === "7-10") return duration >= 7 && duration <= 10;
  if (filter === "10+") return duration > 10;
  return true;
}

export default function TreksPage() {
  const { destination: destinationSlug, tag, filter } = useSearch({
    strict: false,
  }) as {
    destination?: string;
    tag?: string;
    filter?: string;
  };
  const seoTagQuery = tag ?? filter;
  const destinationHub = destinationSlug
    ? getDestinationBySlug(destinationSlug)
    : undefined;
  const hubTreks = destinationHub
    ? getTreksForDestination(destinationHub)
    : null;

  const [stateTab, setStateTab] = useState<ListingRegionTab>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<
    TrekDifficulty | "all"
  >("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TreksSortValue>("rating");

  const baseList = hubTreks ?? TREKS;

  const treksListingSeo = buildListingSEO("trek");

  const filtered = baseList
    .filter((t) => stateTab === "all" || t.state === stateTab)
    .filter(
      (t) => difficultyFilter === "all" || t.difficulty === difficultyFilter,
    )
    .filter((t) => matchDuration(t.duration, durationFilter))
    .filter((t) => !seoTagQuery || matchesSeoTag(t, seoTagQuery, "trek"))
    .filter(
      (t) =>
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.startPoint.toLowerCase().includes(search.toLowerCase()) ||
        t.state.toLowerCase().includes(search.toLowerCase()) ||
        matchesSeoTag(t, search, "trek"),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "duration") return a.duration - b.duration;
      return b.rating - a.rating;
    });

  const hasActiveFilters =
    Boolean(destinationSlug) ||
    Boolean(seoTagQuery) ||
    stateTab !== "all" ||
    difficultyFilter !== "all" ||
    durationFilter !== "all" ||
    search !== "";

  function clearFilters() {
    setSearch("");
    setStateTab("all");
    setDifficultyFilter("all");
    setDurationFilter("all");
  }

  return (
    <div className="pt-16 min-h-screen">
      <SEOHead
        title={treksListingSeo.title}
        description={treksListingSeo.description}
        keywords={treksListingSeo.keywords}
        canonical={treksListingSeo.canonical}
      />
      {/* ── Hero Banner (matches Yatras page shell) ── */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--ew-red)" }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z"
            fill="white"
          />
          <path
            d="M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
        <svg
          className="absolute right-8 top-4 opacity-10 pointer-events-none hidden md:block"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              stroke="white"
              strokeWidth="0.8"
              style={{
                transformOrigin: "100px 100px",
                transform: `rotate(${deg}deg)`,
              }}
            />
          ))}
          <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
        </svg>

        <div className="container mx-auto px-4 pt-16 pb-14 md:pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Trekora — Where Every Peak Tells a Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              {destinationHub
                ? `Treks from ${destinationHub.name}`
                : "Explore Himalayan Treks"}
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              {destinationHub ? (
                <>
                  {destinationHub.tagline}
                  <span className="block mt-2 text-white/70 text-sm">
                    {hubTreks?.length ?? 0} trek
                    {(hubTreks?.length ?? 0) === 1 ? "" : "s"} starting near{" "}
                    {destinationHub.name}.
                  </span>
                </>
              ) : (
                <>
                  40+ curated treks across Uttarakhand and Himachal Pradesh —
                  for every level of trekker.
                </>
              )}
            </p>
            {destinationHub ? (
              <Link
                to="/treks"
                className="inline-block mt-6 text-sm font-semibold text-white/90 underline underline-offset-2 hover:text-white"
              >
                View all treks
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>

      <div
        id={TRAVEL_HERO_SENTINEL_ID}
        className="h-0 w-full"
        aria-hidden
      />
      <TravelSideActionRail variant="listing-treks" />

      {/* ── Region tabs + search/filters (single “All Treks” control — no hero duplicate) ── */}
      <ListingStickyToolbar
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        {!destinationHub && (
          <div className="listing-sticky-toolbar__regions container mx-auto px-4">
            <ListingRegionFilterPills
              kind="treks"
              active={stateTab}
              onChange={setStateTab}
            />
          </div>
        )}
        <TreksListingFilters
          search={search}
          onSearchChange={setSearch}
          difficultyFilter={difficultyFilter}
          onDifficultyChange={setDifficultyFilter}
          durationFilter={durationFilter}
          onDurationChange={setDurationFilter}
          sort={sort}
          onSortChange={setSort}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          destinationHub={destinationHub}
        />
      </ListingStickyToolbar>

      {/* ── Urgency note (matches Yatras strip) ── */}
      <div className="py-2" style={{ backgroundColor: "var(--ew-red-lt)" }}>
        <div
          className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm font-medium"
          style={{ color: "var(--ew-red)" }}
        >
          <AlertCircle size={15} aria-hidden />
          Register early — spots fill fast for the 2025 trek season
        </div>
      </div>

      {/* ── Trek grid (same section structure as YatrasPage listing) ── */}
      <div className="py-12" style={{ backgroundColor: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          {/* Empty state */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
              data-ocid="treks.empty_state"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--ew-red-lt)" }}
              >
                <Mountain size={40} style={{ color: "var(--ew-red)" }} />
              </div>
              <h2
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                No treks found
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Try adjusting your filters or search for a different
                destination.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="btn-primary"
                data-ocid="treks.empty_clear_button"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((trek, i) => (
                <motion.div
                  key={trek.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="card"
                  style={{ pointerEvents: "auto" }}
                  data-ocid={`treks.grid_card.${i + 1}`}
                >
                  <TrekCard trek={trek} index={i} variant="listing" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
