import { Mountain, Search, SlidersHorizontal, X } from "lucide-react";
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title="Himalayan Treks 2025 — All Treks in Uttarakhand & Himachal Pradesh | EternaWings"
        description="Browse 40+ Himalayan treks by difficulty, duration, and season. Expert-guided treks in Uttarakhand and Himachal Pradesh. Book online with EternaWings."
        keywords="Himalayan treks, Uttarakhand treks, Himachal Pradesh treks, trekking India 2025, guided treks, EternaWings"
        canonical="https://www.eternawings.com/treks"
      />
      {/* Hero Banner */}
      <div
        className="relative pt-16"
        style={{ backgroundColor: "var(--ew-red)", minHeight: 220 }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <Mountain
            className="absolute -bottom-8 right-16 text-white"
            size={300}
            strokeWidth={0.5}
          />
          <Mountain
            className="absolute -bottom-4 right-64 text-white"
            size={180}
            strokeWidth={0.5}
          />
        </div>
        <div className="relative container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-2 inline-block"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              EternaWings — Where Every Peak Tells a Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Explore Himalayan Treks
            </h1>
            <p
              style={{ color: "rgba(255,255,255,0.85)" }}
              className="text-base max-w-xl"
            >
              40+ curated treks across Uttarakhand and Himachal Pradesh — for
              every level of trekker.
            </p>
          </motion.div>
        </div>

        {/* Breadcrumb strip */}
        <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
          <div
            className="container mx-auto px-4 py-2 flex items-center gap-2 text-xs"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <a
              href="/"
              style={{ color: "rgba(255,255,255,0.7)" }}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <span>/</span>
            <span className="text-white font-medium">Treks</span>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div
        className="bg-white shadow-sm sticky top-16 z-30"
        style={{ borderBottom: "1px solid var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4 py-3">
          {/* State tabs */}
          <div className="flex flex-wrap gap-2 items-center mb-3">
            {(
              [
                { key: "all", label: "All States" },
                { key: "uttarakhand", label: "Uttarakhand" },
                { key: "himachal", label: "Himachal Pradesh" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStateFilter(key)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  stateFilter === key
                    ? {
                        backgroundColor: "var(--ew-red)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(192,0,28,0.3)",
                      }
                    : {
                        backgroundColor: "var(--ew-gray-lt)",
                        color: "var(--ew-text)",
                        border: "1px solid var(--ew-gray-mid)",
                      }
                }
                data-ocid={`treks.state_filter.${key}`}
              >
                {label}
              </button>
            ))}

            {/* Sort — pushed to right on desktop */}
            <div className="ml-auto flex items-center gap-2">
              <SlidersHorizontal
                size={15}
                style={{ color: "var(--ew-gray-dark)" }}
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
                className="text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                  backgroundColor: "#fff",
                }}
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

          {/* Filters row */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--ew-gray-dark)" }}
              />
              <input
                type="search"
                placeholder="Search treks or destinations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg text-sm focus:outline-none"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  backgroundColor: "var(--ew-gray-lt)",
                  color: "var(--ew-text)",
                }}
                data-ocid="treks.search_input"
              />
            </div>

            {/* Difficulty */}
            <select
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(e.target.value as TrekDifficulty | "all")
              }
              className="px-3 py-2 rounded-lg text-sm focus:outline-none"
              style={{
                border: "1px solid var(--ew-gray-mid)",
                color: "var(--ew-text)",
                backgroundColor: "#fff",
              }}
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

            {/* Duration */}
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm focus:outline-none"
              style={{
                border: "1px solid var(--ew-gray-mid)",
                color: "var(--ew-text)",
                backgroundColor: "#fff",
              }}
              aria-label="Filter by duration"
              data-ocid="treks.duration.select"
            >
              {DURATION_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: "var(--ew-red)",
                  border: "1px solid var(--ew-red)",
                  backgroundColor: "var(--ew-red-lt)",
                }}
                data-ocid="treks.clear_filters_button"
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Trek Recommender Quiz */}
      <TrekRecommenderQuiz />

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Showing{" "}
            <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
              {filtered.length}
            </span>{" "}
            trek{filtered.length !== 1 ? "s" : ""} found
            {stateFilter !== "all" && (
              <span>
                {" "}
                in{" "}
                <span
                  className="font-medium"
                  style={{ color: "var(--ew-red)" }}
                >
                  {stateFilter === "uttarakhand"
                    ? "Uttarakhand"
                    : "Himachal Pradesh"}
                </span>
              </span>
            )}
          </p>
        </div>

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
              Try adjusting your filters or search for a different destination.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((trek, i) => (
              <motion.div
                key={trek.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.4) }}
              >
                <TrekCard trek={trek} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
