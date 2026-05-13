import { j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { f as useCompare, T as TREKS, m as motion, A as AnimatePresence } from "./index-C6rgoof8.js";
import { a3 as ArrowLeft, S as Scale, ah as Trash2, N as CircleCheck } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
function DifficultyStars({ level }) {
  const score = {
    Easy: 1,
    "Easy-Moderate": 2,
    Moderate: 2,
    "Moderate-Difficult": 3,
    Difficult: 4,
    "Difficult-Extreme": 4,
    Extreme: 5
  };
  const filled = score[level] ?? 3;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "text-xs",
      style: {
        color: i <= filled ? "var(--ew-orange)" : "var(--ew-gray-mid)"
      },
      children: "★"
    },
    i
  )) });
}
const ROWS = [
  { label: "Price / person", key: "price" },
  { label: "Duration", key: "duration" },
  { label: "Max Altitude", key: "altitude" },
  { label: "Difficulty", key: "difficulty_stars" },
  { label: "Distance", key: "distance" },
  { label: "Best Season", key: "bestSeason" },
  { label: "State", key: "state" },
  { label: "Start Point", key: "startPoint" },
  { label: "Trek Type", key: "trekType" }
];
function formatValue(trek, key) {
  if (key === "price")
    return `₹${trek.price.toLocaleString("en-IN")}`;
  if (key === "duration") return `${trek.duration} Days`;
  if (key === "altitude")
    return `${trek.altitude.toLocaleString()}m`;
  if (key === "difficulty_stars")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyStars, { level: trek.difficulty });
  if (key === "distance") return `${trek.distance} km`;
  if (key === "state")
    return trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const val = trek[key];
  return String(val ?? "—");
}
function ComparePage() {
  const { compareTreks, removeFromCompare, clearCompare } = useCompare();
  const selectedTreks = compareTreks.map((id) => TREKS.find((t) => String(t.id) === id)).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen pt-20",
      style: { backgroundColor: "var(--ew-gray-lt)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/treks",
              className: "flex items-center gap-1.5 text-sm font-medium transition-colors",
              style: { color: "var(--ew-red)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
                "Back to Treks"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 22, style: { color: "var(--ew-red)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "text-2xl font-bold",
                style: { color: "var(--ew-text)" },
                children: "Compare Treks"
              }
            )
          ] }),
          selectedTreks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: clearCompare,
              className: "ml-auto flex items-center gap-1 text-sm font-medium transition-colors",
              style: { color: "var(--ew-gray-dark)" },
              "data-ocid": "compare.clear_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
                " Clear all"
              ]
            }
          )
        ] }),
        selectedTreks.length === 0 ? (
          /* ── Empty state ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-2xl p-16 text-center shadow-card",
              "data-ocid": "compare.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Scale,
                  {
                    size: 64,
                    className: "mx-auto mb-4",
                    style: { color: "var(--ew-orange)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-xl font-bold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "No Treks Selected"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm mb-6 max-w-sm mx-auto",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      "Add treks using the ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 13, className: "inline" }),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Compare" }),
                      " button on trek cards to see them side-by-side here."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Browse All Treks" })
              ]
            }
          )
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-white rounded-2xl shadow-card overflow-hidden",
              style: { border: "1px solid var(--ew-gray-mid)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    style: {
                      backgroundColor: "var(--ew-gray-lt)",
                      borderBottom: "2px solid var(--ew-gray-mid)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "text-left px-5 py-4 text-sm font-bold w-40",
                          style: { color: "var(--ew-text)" },
                          children: "Feature"
                        }
                      ),
                      selectedTreks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "th",
                        {
                          className: "px-4 py-4 text-center",
                          style: { minWidth: 220 },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: t.image,
                                alt: t.name,
                                className: "w-24 h-16 object-cover rounded-lg"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "text-sm font-bold leading-snug",
                                style: { color: "var(--ew-text)" },
                                children: t.name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => removeFromCompare(String(t.id)),
                                className: "text-[11px] font-medium transition-colors",
                                style: { color: "var(--ew-gray-dark)" },
                                "aria-label": `Remove ${t.name}`,
                                children: "✕ Remove"
                              }
                            )
                          ] })
                        },
                        t.id
                      )),
                      Array.from({ length: 3 - selectedTreks.length }).map(
                        (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "th",
                          {
                            className: "px-4 py-4 text-center",
                            style: { minWidth: 220 },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center h-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Link,
                              {
                                to: "/treks",
                                className: "text-sm font-medium transition-colors",
                                style: { color: "var(--ew-red)" },
                                children: "+ Add Trek"
                              }
                            ) })
                          },
                          `empty-slot-${3 - selectedTreks.length - i}`
                        )
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                  ROWS.map((row, ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      style: {
                        borderBottom: "1px solid var(--ew-gray-mid)",
                        backgroundColor: ri % 2 === 0 ? "#fff" : "var(--ew-gray-lt)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: "px-5 py-3.5 text-sm font-semibold",
                            style: { color: "var(--ew-gray-dark)" },
                            children: row.label
                          }
                        ),
                        selectedTreks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: "px-4 py-3.5 text-center text-sm font-medium",
                            style: { color: "var(--ew-text)" },
                            children: formatValue(t, row.key)
                          },
                          t.id
                        )),
                        Array.from({
                          length: 3 - selectedTreks.length
                        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: "px-4 py-3.5"
                          },
                          `empty-cell-${row.label}-${i}`
                        ))
                      ]
                    },
                    row.label
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "var(--ew-gray-lt)" }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-5 py-4 text-sm font-bold",
                        style: { color: "var(--ew-text)" },
                        children: "Book"
                      }
                    ),
                    selectedTreks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/treks/$slug",
                        params: { slug: t.slug },
                        className: "btn-primary text-xs",
                        "data-ocid": "compare.book_button",
                        children: "Book Now"
                      }
                    ) }, t.id)),
                    Array.from(
                      { length: 3 - selectedTreks.length },
                      (_, i) => `empty-book-${3 - selectedTreks.length - i}`
                    ).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", {}, key))
                  ] })
                ] })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedTreks.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 40 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -40 },
              transition: { delay: i * 0.07 },
              className: "flex-shrink-0 snap-start bg-white rounded-2xl shadow-card overflow-hidden",
              style: {
                width: "80vw",
                maxWidth: 320,
                border: "1px solid var(--ew-gray-mid)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: t.image,
                    alt: t.name,
                    className: "w-full h-40 object-cover"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base mb-3",
                      style: { color: "var(--ew-text)" },
                      children: t.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-4", children: ROWS.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex justify-between text-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-gray-dark)" }, children: row.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold",
                            style: { color: "var(--ew-text)" },
                            children: formatValue(t, row.key)
                          }
                        )
                      ]
                    },
                    row.label
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: "/treks/$slug",
                        params: { slug: t.slug },
                        className: "btn-primary flex-1 text-center text-xs",
                        "data-ocid": "compare.mobile.book_button",
                        children: "Book Now"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeFromCompare(String(t.id)),
                        className: "flex items-center justify-center w-10 h-10 rounded-lg",
                        style: {
                          border: "1px solid var(--ew-gray-mid)",
                          color: "var(--ew-gray-dark)"
                        },
                        "aria-label": `Remove ${t.name}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 15 })
                      }
                    )
                  ] })
                ] })
              ]
            },
            t.id
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              className: "mt-6 bg-white rounded-2xl p-5 shadow-card",
              style: { border: "1px solid var(--ew-gray-mid)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-bold text-base mb-4",
                    style: { color: "var(--ew-text)" },
                    children: "Key Highlights"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: selectedTreks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-semibold text-sm mb-2",
                      style: { color: "var(--ew-red)" },
                      children: t.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: [
                    "NCISM-Certified Guides",
                    "Small groups (max 12)",
                    "Full meals included",
                    "Emergency oxygen carried"
                  ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-center gap-2 text-xs",
                      style: { color: "var(--ew-text-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          CircleCheck,
                          {
                            size: 13,
                            style: { color: "var(--ew-green)" }
                          }
                        ),
                        h
                      ]
                    },
                    h
                  )) })
                ] }, t.id)) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  ComparePage as default
};
