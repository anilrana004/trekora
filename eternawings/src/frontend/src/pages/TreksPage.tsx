import {
  AlertCircle,
  Mountain,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SEOHead } from "../components/SEOHead";
import TrekCard from "../components/TrekCard";
import TrekRecommenderQuiz from "../components/TrekRecommenderQuiz";
import { HIMACHAL_TREKS, TREKS, UTTARAKHAND_TREKS } from "../data/treks";
import type { TrekDifficulty } from "../data/treks";

const DIFFICULTIES: TrekDifficulty[] = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme",
];

const DURATION_OPTIONS = [
  { label: "Any Duration", value: "all" },
  { label: "1–3 Days", value: "1-3" },
  { label: "4–6 Days", value: "4-6" },
  { label: "7–10 Days", value: "7-10" },
  { label: "10+ Days", value: "10+" },
];

function matchDuration(duration: number, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "1-3") return duration >= 1 && duration <= 3;
  if (filter === "4-6") return duration >= 4 && duration <= 6;
  if (filter === "7-10") return duration >= 7 && duration <= 10;
  if (filter === "10+") return duration > 10;
  return true;
}

export default function TreksPage() {
  const [stateFilter, setStateFilter] = useState<
    "all" | "uttarakhand" | "himachal"
  >("all");
  const [difficultyFilter, setDifficultyFilter] = useState<
    TrekDifficulty | "all"
  >("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<
    "price-asc" | "price-desc" | "rating" | "duration"
  >("rating");

  const baseList =
    stateFilter === "uttarakhand"
      ? UTTARAKHAND_TREKS
      : stateFilter === "himachal"
        ? HIMACHAL_TREKS
        : TREKS;

  const filtered = baseList
    .filter(
      (t) => difficultyFilter === "all" || t.difficulty === difficultyFilter,
    )
    .filter((t) => matchDuration(t.duration, durationFilter))
    .filter(
      (t) =>
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.startPoint.toLowerCase().includes(search.toLowerCase()) ||
        t.state.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "duration") return a.duration - b.duration;
      return b.rating - a.rating;
    });

  const hasActiveFilters =
    stateFilter !== "all" ||
    difficultyFilter !== "all" ||
    durationFilter !== "all" ||
    search !== "";

  function clearFilters() {
    setSearch("");
    setStateFilter("all");
    setDifficultyFilter("all");
    setDurationFilter("all");
  }

  return (
    <div className="pt-16 min-h-screen">
      <SEOHead
        title="Himalayan Treks 2025 — All Treks in Uttarakhand & Himachal Pradesh | Trekora"
        description="Browse 40+ Himalayan treks by difficulty, duration, and season. Expert-guided treks in Uttarakhand and Himachal Pradesh. Book online with Trekora."
        keywords="Himalayan treks, Uttarakhand treks, Himachal Pradesh treks, trekking India 2025, guided treks, Trekora"
        canonical="https://www.trekora.com/treks"
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

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Trekora — Where Every Peak Tells a Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              Explore Himalayan Treks
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-6">
              40+ curated treks across Uttarakhand and Himachal Pradesh —
            </p>
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              for every level of trekker.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── State tabs + filters (tabs row matches YatrasPage exactly) ── */}
      <div
        className="bg-white shadow-sm py-3 sticky top-16 z-20 border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4 flex items-center gap-3 justify-center flex-wrap">
          {(
            [
              { key: "all", label: "All Treks" },
              { key: "uttarakhand", label: "Uttarakhand" },
              { key: "himachal", label: "Himachal Pradesh" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setStateFilter(key)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                stateFilter === key
                  ? "text-white border-transparent"
                  : "bg-transparent border-current hover:opacity-80"
              }`}
              style={
                stateFilter === key
                  ? {
                      backgroundColor: "var(--ew-red)",
                      borderColor: "var(--ew-red)",
                    }
                  : { color: "var(--ew-gray-dark)" }
              }
              data-ocid={`treks.state_filter.${key}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="border-t mt-3 pt-3"
          style={{
            borderColor: "var(--ew-gray-mid)",
            backgroundColor: "var(--ew-gray-lt)",
          }}
        >
          <div className="container mx-auto px-4 flex flex-wrap gap-2 items-center justify-center sm:justify-between">
            <div className="flex flex-wrap gap-2 items-center justify-center flex-1">
              {/* Search */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--ew-gray-dark)" }}
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Search treks or destinations…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white"
                  style={
                    {
                      border: "1px solid var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                      "--tw-ring-color": "var(--ew-red)",
                    } as React.CSSProperties
                  }
                  data-ocid="treks.search_input"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) =>
                  setDifficultyFilter(e.target.value as TrekDifficulty | "all")
                }
                className="px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white border"
                style={
                  {
                    borderColor: "var(--ew-gray-mid)",
                    color: "var(--ew-text)",
                    "--tw-ring-color": "var(--ew-red)",
                  } as React.CSSProperties
                }
                aria-label="Filter by difficulty"
                data-ocid="treks.difficulty.select"
              >
                <option value="all">All Difficulties</option>
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white border"
                style={
                  {
                    borderColor: "var(--ew-gray-mid)",
                    color: "var(--ew-text)",
                    "--tw-ring-color": "var(--ew-red)",
                  } as React.CSSProperties
                }
                aria-label="Filter by duration"
                data-ocid="treks.duration.select"
              >
                {DURATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors border"
                  style={{
                    color: "var(--ew-red)",
                    borderColor: "var(--ew-red)",
                    backgroundColor: "#fff",
                  }}
                  data-ocid="treks.clear_filters_button"
                >
                  <X size={13} aria-hidden />
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 py-1">
              <SlidersHorizontal
                size={15}
                style={{ color: "var(--ew-gray-dark)" }}
                aria-hidden
              />
              <span
                className="text-xs font-medium"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Sort:
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 bg-white border"
                style={
                  {
                    borderColor: "var(--ew-gray-mid)",
                    color: "var(--ew-text)",
                    "--tw-ring-color": "var(--ew-red)",
                  } as React.CSSProperties
                }
                aria-label="Sort treks"
                data-ocid="treks.sort.select"
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>
        </div>
      </div>

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
                  data-ocid={`treks.grid_card.${i + 1}`}
                >
                  <TrekCard trek={trek} index={i} variant="listing" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <TrekRecommenderQuiz />
    </div>
  );
}
