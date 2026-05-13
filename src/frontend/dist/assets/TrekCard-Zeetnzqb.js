import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./router-Bky4FFc7.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-JpGNVgMw.js";
import { A as AnimatePresence, m as motion, u as ue, C as CompareButton } from "./index-C6rgoof8.js";
import { k as Heart, K as Star } from "./icons-DrFRvHmE.js";
const CACHE_KEY = "ew_trail_conditions";
const CACHE_TTL_MS = 30 * 60 * 1e3;
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
  }
}
function useTrailConditions() {
  const { actor, isFetching } = useActor(createActor);
  const query = useQuery({
    queryKey: ["trailConditions"],
    queryFn: async () => {
      const cached = readCache();
      if (cached) return cached;
      if (!actor) return [];
      const result = await actor.getAllTrailConditions();
      writeCache(result);
      return result;
    },
    enabled: !!actor && !isFetching,
    staleTime: CACHE_TTL_MS
  });
  function getCondition(slug) {
    var _a;
    return ((_a = query.data) == null ? void 0 : _a.find((c) => c.trekSlug === slug)) ?? null;
  }
  return { getCondition, isLoading: query.isLoading };
}
const Variant_closed_good_moderate_difficult = {
  good: "good",
  moderate: "moderate",
  difficult: "difficult",
  closed: "closed"
};
const CONDITION_CONFIG = {
  [Variant_closed_good_moderate_difficult.good]: {
    label: "Good",
    color: "var(--ew-green)",
    dotBg: "#2E7D32"
  },
  [Variant_closed_good_moderate_difficult.moderate]: {
    label: "Moderate",
    color: "#F59E0B",
    dotBg: "#F59E0B"
  },
  [Variant_closed_good_moderate_difficult.difficult]: {
    label: "Difficult",
    color: "var(--ew-red)",
    dotBg: "#C0001C"
  },
  [Variant_closed_good_moderate_difficult.closed]: {
    label: "Closed",
    color: "var(--ew-gray-dark)",
    dotBg: "#888888"
  }
};
function isStale(updatedAt) {
  const updatedAtMs = Number(updatedAt) / 1e6;
  const fourteenDaysMs = 14 * 24 * 60 * 60 * 1e3;
  return Date.now() - updatedAtMs > fourteenDaysMs;
}
function daysSince(updatedAt) {
  const updatedAtMs = Number(updatedAt) / 1e6;
  return Math.floor((Date.now() - updatedAtMs) / (24 * 60 * 60 * 1e3));
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function TrailDot({ condition }) {
  const stale = condition ? isStale(condition.updatedAt) : true;
  const cfg = condition && !stale ? CONDITION_CONFIG[condition.condition] : null;
  const dotColor = (cfg == null ? void 0 : cfg.dotBg) ?? "#888888";
  const label = (cfg == null ? void 0 : cfg.label) ?? "No recent update";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", "aria-label": `Trail: ${label}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-3 h-3 rounded-full border-2 border-white shadow",
        style: { background: dotColor }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "pointer-events-none absolute bottom-full right-0 mb-1 whitespace-nowrap rounded px-2 py-1 text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity z-10",
        style: { background: "rgba(0,0,0,0.75)" },
        children: [
          "Trail: ",
          label
        ]
      }
    )
  ] });
}
function TrailCard({ condition }) {
  const [open, setOpen] = reactExports.useState(false);
  const stale = condition ? isStale(condition.updatedAt) : true;
  const cfg = condition && !stale ? CONDITION_CONFIG[condition.condition] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden",
      style: { border: "1px solid var(--ew-gray-mid)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            className: "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
            style: {
              backgroundColor: open ? "var(--ew-gray-lt)" : "#fff"
            },
            "data-ocid": "trek_detail.trail_condition.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🥾" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-semibold text-sm",
                    style: { color: "var(--ew-text)" },
                    children: "Current Trail Conditions"
                  }
                ),
                condition && !stale && cfg && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-bold px-2.5 py-0.5 rounded-full",
                    style: {
                      backgroundColor: `${cfg.dotBg}1a`,
                      color: cfg.color,
                      border: `1px solid ${cfg.dotBg}55`
                    },
                    children: cfg.label
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  "aria-hidden": "true",
                  style: {
                    color: "var(--ew-gray-dark)",
                    transform: open ? "rotate(90deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M6 12l4-4-4-4",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.22 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 pb-4 pt-3 border-t space-y-2",
                style: { borderColor: "var(--ew-gray-mid)" },
                children: !condition || stale ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: condition && stale ? `No recent update — last updated ${daysSince(condition.updatedAt)} days ago.` : "No recent trail update available." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  condition.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm leading-relaxed",
                      style: { color: "var(--ew-text-lt)" },
                      children: condition.notes
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex flex-wrap gap-4 text-xs",
                      style: { color: "var(--ew-gray-dark)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Updated:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "var(--ew-text)" }, children: formatDate(condition.updatedAt) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          "Valid until:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "var(--ew-text)" }, children: formatDate(condition.validUntil) })
                        ] })
                      ]
                    }
                  )
                ] })
              }
            )
          }
        ) })
      ]
    }
  );
}
function TrailConditionBadge({ trekSlug, variant }) {
  const { getCondition } = useTrailConditions();
  const condition = getCondition(trekSlug);
  if (variant === "dot") return /* @__PURE__ */ jsxRuntimeExports.jsx(TrailDot, { condition });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TrailCard, { condition });
}
const STORAGE_KEY = "ew_wishlist";
function readWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeWishlist(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
function WishlistHeart({
  id,
  name,
  type,
  className = "absolute top-2 right-2"
}) {
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const list = readWishlist();
    setSaved(list.some((item) => item.id === id));
  }, [id]);
  function toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    const list = readWishlist();
    if (saved) {
      const updated = list.filter((item) => item.id !== id);
      writeWishlist(updated);
      setSaved(false);
      ue.info("Removed from wishlist", { duration: 2e3 });
    } else {
      writeWishlist([...list, { id, name, type }]);
      setSaved(true);
      ue.success("Added to wishlist!", { duration: 2e3 });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.button,
    {
      type: "button",
      onClick: toggle,
      className: `${className} z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors`,
      style: {
        backgroundColor: saved ? "rgba(192,0,28,0.15)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(4px)",
        border: saved ? "1.5px solid var(--ew-red)" : "1.5px solid transparent"
      },
      whileTap: { scale: 0.85 },
      transition: { type: "spring", stiffness: 500, damping: 20 },
      "aria-label": saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`,
      "data-ocid": "wishlist.toggle",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Heart,
        {
          size: 15,
          style: { color: "var(--ew-red)" },
          className: saved ? "fill-[var(--ew-red)]" : "fill-none"
        }
      )
    }
  );
}
function difficultyClass(d) {
  const map = {
    Easy: "trek-difficulty-easy",
    "Easy-Moderate": "trek-difficulty-easy",
    Moderate: "trek-difficulty-moderate",
    "Moderate-Difficult": "trek-difficulty-moderate",
    Difficult: "trek-difficulty-difficult",
    "Difficult-Extreme": "trek-difficulty-difficult",
    Extreme: "trek-difficulty-extreme"
  };
  return map[d] ?? "trek-difficulty-moderate";
}
function stateLabel(s) {
  return s === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
}
function TrekCard({
  trek,
  variant = "default",
  index,
  showEmiBadge
}) {
  const showEmi = showEmiBadge !== void 0 ? showEmiBadge : trek.price > 8e3;
  const mi = index !== void 0 ? `.${index + 1}` : "";
  const safeRating = trek.rating ?? 4.5;
  const safeReviewCount = trek.reviewCount ?? 0;
  const stars = Math.round(safeRating);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "trek-card card-hover-spring flex flex-col h-full group cursor-pointer rounded-xl overflow-hidden bg-white relative",
      style: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderLeft: "3px solid transparent",
        willChange: "transform"
      },
      whileHover: {
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
        borderLeftColor: "var(--ew-red)"
      },
      whileTap: { scale: 0.97 },
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        mass: 0.8
      },
      "data-ocid": `trek.card${mi}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "trek-card-img relative overflow-hidden",
            style: { aspectRatio: "4/3" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: trek.image,
                  alt: trek.name,
                  loading: "lazy",
                  className: "w-full h-full object-cover",
                  whileHover: { scale: 1.08 },
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-2 left-2 ${difficultyClass(trek.difficulty)}`,
                  children: trek.difficulty
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-10 badge-orange text-[10px]", children: stateLabel(trek.state) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WishlistHeart, { id: String(trek.id), name: trek.name, type: "trek" }),
              showEmi && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute bottom-2 left-2 text-[10px] font-semibold px-1.5 py-0.5 rounded",
                  style: {
                    backgroundColor: "var(--ew-orange-lt)",
                    color: "var(--ew-orange)"
                  },
                  children: "EMI Available"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrailConditionBadge, { trekSlug: trek.slug, variant: "dot" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-1", children: [
            [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 11,
                className: i <= stars ? "fill-[var(--ew-gold)] text-[var(--ew-gold)]" : "fill-none text-[var(--ew-gold)]"
              },
              i
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[var(--ew-text)] font-semibold ml-0.5", children: safeRating }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[var(--ew-gray-dark)] ml-0.5", children: safeReviewCount === 0 ? "Be the first to review!" : `(${safeReviewCount})` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-semibold text-[15px] leading-snug line-clamp-1 mb-0.5",
              style: { color: "var(--ew-text)" },
              children: trek.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-[var(--ew-gray-dark)] mb-2", children: [
            trek.duration,
            " Days  |  ",
            stateLabel(trek.state)
          ] }),
          variant !== "compact" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[var(--ew-gray-dark)] line-clamp-2 mb-2 flex-1", children: trek.shortDesc }),
          trek.tags && trek.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mb-2", children: [
            trek.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] px-2 py-0.5 rounded-full border",
                style: {
                  backgroundColor: "var(--ew-gray-lt)",
                  color: "#555",
                  borderColor: "var(--ew-gray-mid)"
                },
                children: tag
              },
              tag
            )),
            trek.tags.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[10px] px-2 py-0.5 rounded-full border cursor-default",
                title: trek.tags.slice(4).join(" · "),
                style: {
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                  borderColor: "var(--ew-orange)"
                },
                children: [
                  "+",
                  trek.tags.length - 4
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[var(--ew-gray-dark)]", children: "Starting from" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "trek-price text-[18px] font-bold transition-colors duration-200 group-hover:text-[var(--ew-red)]",
                style: { color: "var(--ew-orange)" },
                children: [
                  "₹",
                  trek.price.toLocaleString("en-IN")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompareButton, { trekId: String(trek.id) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { y: -4, boxShadow: "0 4px 12px rgba(192,0,28,0.3)" },
              transition: { type: "spring", stiffness: 400, damping: 15 },
              className: "rounded",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/treks/$slug",
                  params: { slug: trek.slug },
                  className: "block text-center text-[13px] font-semibold border-2 border-[var(--ew-red)] text-[var(--ew-red)] rounded py-1.5 hover:bg-[var(--ew-red)] hover:text-white transition-colors",
                  "data-ocid": `trek.view_details_button${mi}`,
                  children: "View Details"
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  TrekCard as T,
  TrailConditionBadge as a
};
