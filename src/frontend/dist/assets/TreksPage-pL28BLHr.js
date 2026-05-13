import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { T as TrekCard } from "./TrekCard-Zeetnzqb.js";
import { T as TrekRecommenderQuiz } from "./TrekRecommenderQuiz-Bmk9Pfnn.js";
import { U as UTTARAKHAND_TREKS, H as HIMACHAL_TREKS, T as TREKS, m as motion } from "./index-C6rgoof8.js";
import { M as Mountain, x as SlidersHorizontal, m as Search, X } from "./icons-DrFRvHmE.js";
import "./backend-JpGNVgMw.js";
import "./motion-CnUkbXTC.js";
const DIFFICULTIES = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme"
];
const DURATION_OPTIONS = [
  { label: "Any Duration", value: "all" },
  { label: "1–3 Days", value: "1-3" },
  { label: "4–6 Days", value: "4-6" },
  { label: "7–10 Days", value: "7-10" },
  { label: "10+ Days", value: "10+" }
];
function matchDuration(duration, filter) {
  if (filter === "all") return true;
  if (filter === "1-3") return duration >= 1 && duration <= 3;
  if (filter === "4-6") return duration >= 4 && duration <= 6;
  if (filter === "7-10") return duration >= 7 && duration <= 10;
  if (filter === "10+") return duration > 10;
  return true;
}
function TreksPage() {
  const [stateFilter, setStateFilter] = reactExports.useState("all");
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState("all");
  const [durationFilter, setDurationFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState("rating");
  const baseList = stateFilter === "uttarakhand" ? UTTARAKHAND_TREKS : stateFilter === "himachal" ? HIMACHAL_TREKS : TREKS;
  const filtered = baseList.filter(
    (t) => difficultyFilter === "all" || t.difficulty === difficultyFilter
  ).filter((t) => matchDuration(t.duration, durationFilter)).filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.startPoint.toLowerCase().includes(search.toLowerCase()) || t.state.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "duration") return a.duration - b.duration;
    return b.rating - a.rating;
  });
  const hasActiveFilters = stateFilter !== "all" || difficultyFilter !== "all" || durationFilter !== "all" || search !== "";
  function clearFilters() {
    setSearch("");
    setStateFilter("all");
    setDifficultyFilter("all");
    setDurationFilter("all");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { backgroundColor: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEOHead,
          {
            title: "Himalayan Treks 2025 — All Treks in Uttarakhand & Himachal Pradesh | EternaWings",
            description: "Browse 40+ Himalayan treks by difficulty, duration, and season. Expert-guided treks in Uttarakhand and Himachal Pradesh. Book online with EternaWings.",
            keywords: "Himalayan treks, Uttarakhand treks, Himachal Pradesh treks, trekking India 2025, guided treks, EternaWings",
            canonical: "https://www.eternawings.com/treks"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative pt-16",
            style: { backgroundColor: "var(--ew-red)", minHeight: 220 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 overflow-hidden opacity-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Mountain,
                  {
                    className: "absolute -bottom-8 right-16 text-white",
                    size: 300,
                    strokeWidth: 0.5
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Mountain,
                  {
                    className: "absolute -bottom-4 right-64 text-white",
                    size: 180,
                    strokeWidth: 0.5
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-semibold uppercase tracking-widest mb-2 inline-block",
                        style: { color: "rgba(255,255,255,0.75)" },
                        children: "EternaWings — Where Every Peak Tells a Story"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-white mb-3", children: "Explore Himalayan Treks" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: { color: "rgba(255,255,255,0.85)" },
                        className: "text-base max-w-xl",
                        children: "40+ curated treks across Uttarakhand and Himachal Pradesh — for every level of trekker."
                      }
                    )
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "rgba(0,0,0,0.2)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "container mx-auto px-4 py-2 flex items-center gap-2 text-xs",
                  style: { color: "rgba(255,255,255,0.8)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "/",
                        style: { color: "rgba(255,255,255,0.7)" },
                        className: "hover:text-white transition-colors",
                        children: "Home"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: "Treks" })
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white shadow-sm sticky top-16 z-30",
            style: { borderBottom: "1px solid var(--ew-gray-mid)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center mb-3", children: [
                [
                  { key: "all", label: "All States" },
                  { key: "uttarakhand", label: "Uttarakhand" },
                  { key: "himachal", label: "Himachal Pradesh" }
                ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setStateFilter(key),
                    className: "px-5 py-2 rounded-full text-sm font-semibold transition-all",
                    style: stateFilter === key ? {
                      backgroundColor: "var(--ew-red)",
                      color: "#fff",
                      boxShadow: "0 2px 8px rgba(192,0,28,0.3)"
                    } : {
                      backgroundColor: "var(--ew-gray-lt)",
                      color: "var(--ew-text)",
                      border: "1px solid var(--ew-gray-mid)"
                    },
                    "data-ocid": `treks.state_filter.${key}`,
                    children: label
                  },
                  key
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SlidersHorizontal,
                    {
                      size: 15,
                      style: { color: "var(--ew-gray-dark)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-medium",
                      style: { color: "var(--ew-gray-dark)" },
                      children: "Sort:"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      value: sort,
                      onChange: (e) => setSort(e.target.value),
                      className: "text-sm rounded-lg px-3 py-1.5 focus:outline-none",
                      style: {
                        border: "1px solid var(--ew-gray-mid)",
                        color: "var(--ew-text)",
                        backgroundColor: "#fff"
                      },
                      "aria-label": "Sort treks",
                      "data-ocid": "treks.sort.select",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "Top Rated" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-asc", children: "Price: Low → High" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price-desc", children: "Price: High → Low" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "duration", children: "Duration" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Search,
                    {
                      size: 14,
                      className: "absolute left-3 top-1/2 -translate-y-1/2",
                      style: { color: "var(--ew-gray-dark)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "search",
                      placeholder: "Search treks or destinations…",
                      value: search,
                      onChange: (e) => setSearch(e.target.value),
                      className: "w-full pl-8 pr-3 py-2 rounded-lg text-sm focus:outline-none",
                      style: {
                        border: "1px solid var(--ew-gray-mid)",
                        backgroundColor: "var(--ew-gray-lt)",
                        color: "var(--ew-text)"
                      },
                      "data-ocid": "treks.search_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: difficultyFilter,
                    onChange: (e) => setDifficultyFilter(e.target.value),
                    className: "px-3 py-2 rounded-lg text-sm focus:outline-none",
                    style: {
                      border: "1px solid var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                      backgroundColor: "#fff"
                    },
                    "aria-label": "Filter by difficulty",
                    "data-ocid": "treks.difficulty.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Difficulties" }),
                      DIFFICULTIES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    value: durationFilter,
                    onChange: (e) => setDurationFilter(e.target.value),
                    className: "px-3 py-2 rounded-lg text-sm focus:outline-none",
                    style: {
                      border: "1px solid var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                      backgroundColor: "#fff"
                    },
                    "aria-label": "Filter by duration",
                    "data-ocid": "treks.duration.select",
                    children: DURATION_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
                  }
                ),
                hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: clearFilters,
                    className: "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    style: {
                      color: "var(--ew-red)",
                      border: "1px solid var(--ew-red)",
                      backgroundColor: "var(--ew-red-lt)"
                    },
                    "data-ocid": "treks.clear_filters_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 }),
                      "Clear"
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrekRecommenderQuiz, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
            "Showing",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: filtered.length }),
            " ",
            "trek",
            filtered.length !== 1 ? "s" : "",
            " found",
            stateFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              " ",
              "in",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-medium",
                  style: { color: "var(--ew-red)" },
                  children: stateFilter === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"
                }
              )
            ] })
          ] }) }),
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "text-center py-24",
              "data-ocid": "treks.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
                    style: { backgroundColor: "var(--ew-red-lt)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 40, style: { color: "var(--ew-red)" } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-2xl font-bold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "No treks found"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "mb-6 text-sm",
                    style: { color: "var(--ew-gray-dark)" },
                    children: "Try adjusting your filters or search for a different destination."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: clearFilters,
                    className: "btn-primary",
                    "data-ocid": "treks.empty_clear_button",
                    children: "Clear All Filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filtered.map((trek, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: Math.min(i * 0.04, 0.4) },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek, index: i })
            },
            trek.id
          )) })
        ] })
      ]
    }
  );
}
export {
  TreksPage as default
};
