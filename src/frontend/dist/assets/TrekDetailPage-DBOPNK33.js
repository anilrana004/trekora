import { r as reactExports, j as jsxRuntimeExports, m as useParams, L as Link } from "./router-Bky4FFc7.js";
import { m as motion, A as AnimatePresence, u as ue, a as useQueryClient, T as TREKS } from "./index-C6rgoof8.js";
import { h as ChevronDown, D as Droplets, W as Wind, y as Thermometer, R as RefreshCw, z as ChevronUp, E as SquareActivity, w as ChevronRight, G as Download, M as Mountain, v as ChevronLeft, J as Clock, r as Shield, a as MapPin, K as Star, N as CircleCheck, O as CircleX, Q as Share2, V as Plane, _ as TramFront, $ as Car, a0 as Bus, a1 as Minus, a2 as Plus, P as Phone, a3 as ArrowLeft } from "./icons-DrFRvHmE.js";
import { a as TrailConditionBadge, T as TrekCard } from "./TrekCard-Zeetnzqb.js";
import { u as useActor, c as createActor, a as useQuery } from "./backend-JpGNVgMw.js";
import { i as injectJSONLD, g as generateTrekJSONLD, a as generateBreadcrumbJSONLD, b as generateFAQJSONLD, d as downloadTrekItineraryPDF, T as TrekMap, S as ShareSection, R as ReviewSubmitForm, c as SeoTagCloud, W as WhatsAppCTA, B as BookingDrawer, Q as QueryBottomSheet } from "./seo-CZoBy7Dp.js";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as ReferenceArea, b as ReferenceLine, c as Area, D as Dot } from "./charts-VM0_pAiv.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { u as useMutation } from "./useMutation-CZf2c55A.js";
import { u as useGTM } from "./useGTM-BCLtQZuk.js";
import "./motion-CnUkbXTC.js";
import "./reviews-DqUEh3Gg.js";
const RAZORPAY_LOGO = /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    width: "60",
    height: "14",
    viewBox: "0 0 120 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-label": "Razorpay",
    role: "img",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Razorpay" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M13.5 0L0 28h8l3-7h8l1 7h8L22 0h-8.5zm-1 15l4-9 2 9h-6zM30 2v26h7V2h-7zm12 0v26h7V2h-7zm12 5c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm14-5v26h7v-8h3l5 8h8l-6-9c3-1 5-4 5-7 0-5-4-10-10-10h-12zm7 5h5c2 0 3 1 3 3s-1 3-3 3h-5V12zm18-5v26h7v-8l8-18h-8l-4 10-4-10h-9zm20 0v26h7V7h-7z",
          fill: "#528FF0"
        }
      )
    ]
  }
);
function EMICalculator({ price, trekName }) {
  const [open, setOpen] = reactExports.useState(false);
  if (price <= 8e3) return null;
  const emi3 = Math.ceil(price / 3);
  const emi6 = Math.ceil(price / 6);
  const emi12 = Math.ceil(price / 12);
  const plans = [
    { label: "3 months", emi: emi3, months: 3 },
    { label: "6 months", emi: emi6, months: 6 },
    { label: "12 months", emi: emi12, months: 12 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl overflow-hidden",
      style: { border: "1px solid var(--ew-gray-mid)" },
      "data-ocid": "trek_detail.emi_calculator",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((p) => !p),
            className: "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
            style: {
              backgroundColor: open ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)"
            },
            "data-ocid": "trek_detail.emi_calculator.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "💳" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "var(--ew-text)" },
                    children: "Pay in Easy EMIs"
                  }
                ),
                RAZORPAY_LOGO
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { rotate: open ? 180 : 0 },
                  transition: { duration: 0.2 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, style: { color: "var(--ew-orange)" } })
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
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-3 space-y-3", children: [
              plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-lg px-3 py-2",
                  style: {
                    backgroundColor: "var(--ew-orange-lt)",
                    border: "1px solid rgba(232,119,34,0.2)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold px-2 py-0.5 rounded-full",
                          style: {
                            backgroundColor: "var(--ew-orange)",
                            color: "#fff"
                          },
                          children: plan.label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs font-medium",
                          style: { color: "var(--ew-text-lt)" },
                          children: [
                            "₹",
                            plan.emi.toLocaleString("en-IN"),
                            "/month"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "/book",
                        className: "text-xs font-semibold px-3 py-1 rounded-full transition-colors",
                        style: {
                          backgroundColor: "var(--ew-orange)",
                          color: "#fff"
                        },
                        "data-ocid": `trek_detail.emi_book_button.${plan.months}`,
                        children: "Book"
                      }
                    )
                  ]
                },
                plan.months
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "btn-primary w-full justify-center text-sm py-2.5",
                  style: { borderRadius: "0.5rem" },
                  "data-ocid": "trek_detail.emi_book_button",
                  children: [
                    "Book ",
                    trekName,
                    " with EMI"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[11px] text-center",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "*EMI subject to bank charges. Final amount may vary."
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
const CACHE_TTL_MS$1 = 5 * 60 * 1e3;
function getCached(key) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > CACHE_TTL_MS$1) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}
function setCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
  }
}
function TrustSignals({ trekSlug, trekId }) {
  const { actor, isFetching } = useActor(createActor);
  const [trust, setTrust] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isFetching || !actor) return;
    const cacheKey = `ew_trust_${trekSlug}`;
    const cached = getCached(cacheKey);
    if (cached) {
      setTrust(cached);
      return;
    }
    const load = async () => {
      try {
        const [bookingsResult, batches] = await Promise.all([
          actor.getAllBookings(),
          actor.getTrekBatches(BigInt(trekId))
        ]);
        const bookings = bookingsResult.__kind__ === "ok" ? bookingsResult.ok : [];
        const trekBookings = bookings.filter(
          (b) => b.itemId === BigInt(trekId) && b.status === "confirmed"
        );
        const now = Date.now();
        const upcomingBatches = batches.filter(
          (batch) => batch.isActive && Number(batch.batchDate) > now && Number(batch.availableSlots) > 0
        );
        upcomingBatches.sort(
          (a, b) => Number(a.batchDate) - Number(b.batchDate)
        );
        const nextBatch = upcomingBatches[0] ?? null;
        const spotsLeft2 = nextBatch ? Number(nextBatch.availableSlots) : null;
        const data = {
          bookingCount: trekBookings.length,
          spotsLeft: spotsLeft2
        };
        setCache(cacheKey, data);
        setTrust(data);
      } catch {
      }
    };
    void load();
  }, [actor, isFetching, trekSlug, trekId]);
  if (!trust) return null;
  const { bookingCount, spotsLeft } = trust;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "trek_detail.trust_signals", children: [
    bookingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full",
        style: {
          backgroundColor: "#e8f5e9",
          color: "var(--ew-green)",
          border: "1px solid rgba(46,125,50,0.2)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            bookingCount.toLocaleString("en-IN"),
            " trekkers have booked this trek"
          ] })
        ]
      }
    ),
    spotsLeft !== null && spotsLeft <= 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full",
        style: {
          backgroundColor: spotsLeft <= 5 ? "var(--ew-red-lt)" : "var(--ew-orange-lt)",
          color: spotsLeft <= 5 ? "var(--ew-red)" : "var(--ew-orange)",
          border: `1px solid ${spotsLeft <= 5 ? "rgba(192,0,28,0.2)" : "rgba(232,119,34,0.2)"}`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: spotsLeft <= 5 ? `Only ${spotsLeft} spots left in the next batch!` : "Spots filling fast!" })
        ]
      }
    )
  ] });
}
const CACHE_TTL_MS = 60 * 60 * 1e3;
function getCacheKey(location) {
  return `himalayan_weather_${location.toLowerCase().replace(/\s+/g, "_")}`;
}
function loadFromCache(location) {
  try {
    const raw = localStorage.getItem(getCacheKey(location));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      localStorage.removeItem(getCacheKey(location));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function useWeather(location) {
  const [data, setData] = reactExports.useState(
    () => loadFromCache(location)
  );
  const [isLoading, setIsLoading] = reactExports.useState(!data && false);
  const [error, setError] = reactExports.useState(
    "no_api_key"
  );
  const fetchWeather = reactExports.useCallback(async () => {
    return;
  }, [location]);
  reactExports.useEffect(() => {
    const cached = loadFromCache(location);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      setError(null);
      return;
    }
    {
      setData(null);
      setIsLoading(false);
      setError("no_api_key");
      return;
    }
  }, [location, fetchWeather]);
  return { data, isLoading, error };
}
const MOCK_WEATHER = {
  current: {
    temp: 12,
    feelsLike: 8,
    humidity: 65,
    windSpeed: 15,
    condition: "Partly Cloudy",
    description: "partly cloudy",
    icon: "02d"
  },
  forecast: [
    {
      date: "1",
      dayLabel: "Mon",
      high: 14,
      low: 6,
      icon: "01d",
      condition: "Clear"
    },
    {
      date: "2",
      dayLabel: "Tue",
      high: 10,
      low: 4,
      icon: "10d",
      condition: "Rain"
    },
    {
      date: "3",
      dayLabel: "Wed",
      high: 16,
      low: 8,
      icon: "02d",
      condition: "Clouds"
    },
    {
      date: "4",
      dayLabel: "Thu",
      high: 18,
      low: 10,
      icon: "01d",
      condition: "Clear"
    },
    {
      date: "5",
      dayLabel: "Fri",
      high: 12,
      low: 5,
      icon: "11d",
      condition: "Thunderstorm"
    }
  ]
};
const CONDITION_EMOJI = {
  Clear: "☀️",
  Clouds: "⛅",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "🌩️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
  "Partly Cloudy": "⛅"
};
function WeatherIcon({
  icon,
  condition,
  size = 40
}) {
  const [imgFailed, setImgFailed] = reactExports.useState(false);
  const emoji = CONDITION_EMOJI[condition] ?? "🌤️";
  {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: size * 0.75 }, role: "img", "aria-label": condition, children: emoji });
  }
}
function Skeleton({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `animate-pulse rounded-lg ${className ?? ""}`,
      style: { background: "rgba(255,255,255,0.12)" }
    }
  );
}
function SkeletonLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-6 space-y-4",
      style: { background: "#1A2340" },
      "data-ocid": "weather_widget.loading_state",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28 mb-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-hidden", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-16 flex-shrink-0 rounded-xl" }, i)) })
      ]
    }
  );
}
function WeatherWidget({
  trekName,
  location
}) {
  const { data: liveData, isLoading, error } = useWeather(location);
  const [expanded, setExpanded] = reactExports.useState(false);
  const [lastUpdatedMin, setLastUpdatedMin] = reactExports.useState(0);
  const [showSkeleton, setShowSkeleton] = reactExports.useState(true);
  const timerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 1e3);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    timerRef.current = setInterval(() => {
      setLastUpdatedMin((m) => m + 1);
    }, 6e4);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);
  reactExports.useEffect(() => {
    if (liveData) setLastUpdatedMin(0);
  }, [liveData]);
  if (showSkeleton || isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLoader, {});
  const data = liveData && !error ? liveData : MOCK_WEATHER;
  const isMock = !liveData || !!error;
  const { current, forecast } = data;
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const statsRow = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 15, className: "text-blue-300" }),
      value: `${current.humidity}%`,
      label: "Humidity"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { size: 15, className: "text-teal-300" }),
      value: `${current.windSpeed} km/h`,
      label: "Wind"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { size: 15, className: "text-orange-300" }),
      value: `${current.feelsLike}°C`,
      label: "Feels Like"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45, ease: "easeOut" },
      className: "rounded-2xl overflow-hidden",
      style: { background: "#1A2340" },
      "data-ocid": "weather_widget",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "px-5 pt-4 pb-3",
            style: {
              backgroundColor: "var(--ew-gray-lt)",
              borderBottom: "3px solid var(--ew-red)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[10px] font-bold uppercase tracking-widest",
                    style: { color: "var(--ew-red)" },
                    children: "Base Camp Weather"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-sm truncate",
                    style: { color: "var(--ew-text)" },
                    children: trekName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-[11px] mt-0.5",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      "📍 ",
                      location
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-medium px-2 py-0.5 rounded-full",
                    style: {
                      backgroundColor: isMock ? "var(--ew-orange-lt)" : "#e8f5e9",
                      color: isMock ? "var(--ew-orange)" : "var(--ew-green)",
                      border: `1px solid ${isMock ? "var(--ew-orange)" : "var(--ew-green)"}`
                    },
                    children: isMock ? "Demo data" : lastUpdatedMin === 0 ? "Just updated" : `Updated ${lastUpdatedMin}m ago`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 11, style: { color: "var(--ew-gray-dark)" } })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-4 pb-3 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-5xl font-bold leading-none",
                style: { color: "var(--ew-red)" },
                children: [
                  current.temp,
                  "°C"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm mt-1 capitalize font-medium", children: capitalize(current.description || current.condition) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WeatherIcon,
            {
              icon: current.icon,
              condition: current.condition,
              size: 56
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:grid grid-cols-3 gap-px bg-white/5 mx-5 rounded-xl overflow-hidden mb-4", children: statsRow.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-4 py-3 flex flex-col items-center",
            style: { background: "rgba(255,255,255,0.07)" },
            children: [
              s.icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-sm mt-1", children: s.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-xs", children: s.label })
            ]
          },
          s.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "md:hidden w-full px-5 py-2.5 flex items-center justify-between transition-colors",
            style: { color: "rgba(255,255,255,0.6)" },
            "aria-expanded": expanded,
            "data-ocid": "weather_widget.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: expanded ? "Hide details" : "Humidity · Wind · Feels like" }),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 15 })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28 },
            className: "overflow-hidden md:hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-px bg-white/5 mx-5 rounded-xl overflow-hidden mb-4", children: statsRow.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "px-3 py-3 flex flex-col items-center",
                style: { background: "rgba(255,255,255,0.07)" },
                children: [
                  s.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-xs mt-1", children: s.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50 text-[10px]", children: s.label })
                ]
              },
              s.label
            )) })
          },
          "mobile-stats"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[10px] font-bold uppercase tracking-wider mb-3", children: "5-Day Forecast" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex gap-2 overflow-x-auto pb-1 scrollbar-hide",
              "data-ocid": "weather_widget.forecast",
              children: forecast.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: i * 0.06, duration: 0.3 },
                  className: "flex-shrink-0 flex flex-col items-center gap-1 rounded-xl px-3 py-3 min-w-[60px]",
                  style: { background: "rgba(255,255,255,0.07)" },
                  "data-ocid": `weather_widget.forecast.item.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 text-xs font-semibold", children: day.dayLabel }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      WeatherIcon,
                      {
                        icon: day.icon,
                        condition: day.condition,
                        size: 32
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white font-bold text-xs", children: [
                      day.high,
                      "°"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/40 text-xs", children: [
                      day.low,
                      "°"
                    ] })
                  ]
                },
                day.date
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25 text-[10px]", children: isMock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "🔑 Live weather requires",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-white/10 px-1 rounded text-[9px]", children: "VITE_OPENWEATHERMAP_KEY" })
        ] }) : "Powered by OpenWeatherMap · Updates every 30 min" }) })
      ]
    }
  );
}
const AMS_COLORS = {
  low: "#2E7D32",
  medium: "#E87722",
  high: "#C0001C"
};
const AMS_LABELS = {
  low: "Low AMS Risk",
  medium: "Moderate AMS Risk",
  high: "High AMS Risk"
};
function CustomTooltip({ active, payload, label, data }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const dayNum = Number(String(label ?? "").replace("Day ", ""));
  const point = data.find((d) => d.day === dayNum);
  if (!point) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        background: "#1A1A2E",
        color: "white",
        borderRadius: 10,
        padding: "10px 14px",
        minWidth: 160,
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            style: {
              fontWeight: 700,
              fontSize: 14,
              color: "#E87722",
              margin: "0 0 4px"
            },
            children: [
              "Day ",
              point.day
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontWeight: 600, margin: "0 0 2px" }, children: point.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "rgba(255,255,255,0.75)", margin: 0 }, children: [
          point.altitude.toLocaleString(),
          "m altitude"
        ] }),
        point.amsRisk && point.amsRisk !== "low" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            style: {
              marginTop: 4,
              fontWeight: 600,
              color: AMS_COLORS[point.amsRisk]
            },
            children: [
              point.amsRisk === "high" ? "⚠️" : "⚡",
              " ",
              AMS_LABELS[point.amsRisk]
            ]
          }
        )
      ]
    }
  );
}
function AltitudeChart({
  altitudeProfile,
  trekName
}) {
  if (!altitudeProfile || altitudeProfile.length < 2) return null;
  const maxAlt = Math.max(...altitudeProfile.map((p) => p.altitude));
  const minAlt = Math.min(...altitudeProfile.map((p) => p.altitude));
  const yMax = maxAlt + 300;
  const yMin = Math.max(0, minAlt - 200);
  const hasAmsZone = maxAlt >= 4e3;
  const acclimDays = altitudeProfile.filter(
    (p, i) => i > 0 && altitudeProfile[i - 1].altitude >= p.altitude - 50
  ).map((p) => `Day ${p.day}`);
  const chartData = altitudeProfile.map((p) => ({
    ...p,
    name: `Day ${p.day}`
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    trekName && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-xs font-semibold mb-3 tracking-wide",
        style: { color: "#888", textTransform: "uppercase" },
        children: [
          "Altitude Profile — ",
          trekName
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AreaChart,
      {
        data: chartData,
        margin: { top: 10, right: 16, left: 0, bottom: 0 },
        role: "img",
        "aria-label": trekName ? `Altitude profile chart for ${trekName}` : "Altitude profile chart",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ewAltGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#E87722", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#E87722", stopOpacity: 0.05 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(0,0,0,0.06)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: { fontSize: 11, fill: "#C0001C", fontWeight: 600 },
              tickLine: false,
              axisLine: { stroke: "#e5e7eb" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              domain: [yMin, yMax],
              tick: { fontSize: 10, fill: "#999" },
              tickLine: false,
              axisLine: false,
              tickFormatter: (v) => `${(v / 1e3).toFixed(1)}k`,
              width: 36
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, { data: altitudeProfile }) }),
          hasAmsZone && /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceArea, { y1: 4e3, y2: yMax, fill: "rgba(192,0,28,0.08)" }),
          hasAmsZone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              y: 4e3,
              stroke: "#C0001C",
              strokeDasharray: "4 4",
              label: {
                value: "AMS Risk Zone ↑",
                fill: "#C0001C",
                fontSize: 10,
                position: "insideTopRight"
              }
            }
          ),
          acclimDays.map((dayKey) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              x: dayKey,
              stroke: "#2E7D32",
              strokeDasharray: "3 3",
              strokeOpacity: 0.55
            },
            `accl-${dayKey}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "altitude",
              stroke: "#E87722",
              strokeWidth: 3,
              fill: "url(#ewAltGrad)",
              dot: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Dot,
                {
                  cx: props.cx,
                  cy: props.cy,
                  r: 4,
                  fill: "#E87722",
                  stroke: "white",
                  strokeWidth: 1.5
                },
                `dot-${props.index}`
              ),
              activeDot: {
                r: 6,
                fill: "#E87722",
                stroke: "white",
                strokeWidth: 2
              }
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
      ["low", "medium", "high"].map((risk) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3 h-3 rounded-full flex-shrink-0",
            style: { backgroundColor: AMS_COLORS[risk] }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", style: { color: "#666" }, children: AMS_LABELS[risk] })
      ] }, risk)),
      hasAmsZone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-3 h-3 rounded flex-shrink-0",
            style: { backgroundColor: "#C0001C", opacity: 0.3 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium", style: { color: "#666" }, children: "4000m+ AMS Zone" })
      ] })
    ] })
  ] });
}
const FITNESS_LEVELS = ["Sedentary", "Active", "Fit"];
const EXPERIENCE_LEVELS = [
  "Beginner",
  "Some experience",
  "Experienced"
];
const MEDICAL_CONDITIONS = [
  "Heart condition",
  "High blood pressure",
  "Asthma",
  "Diabetes",
  "None"
];
const TRAINING_WEEKS = [
  {
    week: 1,
    plan: "Walk 5 km daily at a comfortable pace, building base endurance."
  },
  {
    week: 2,
    plan: "Jog 5 km daily + stair climbing for 20 minutes (2–3 floors)."
  },
  { week: 3, plan: "10 km walks with a 5 kg backpack to simulate trek load." },
  {
    week: 4,
    plan: "Interval training: jog 1 min, sprint 30 sec, repeat 10×. Practice hike 15 km on a weekend."
  }
];
function calculateScore(age, fitness, experience, conditions, difficulty, altitude) {
  let score = 100;
  if (age > 60) score -= 20;
  else if (age > 50) score -= 10;
  else if (age < 18) score -= 10;
  if (fitness === "Sedentary") score -= 30;
  else if (fitness === "Active") score -= 10;
  if (experience === "Beginner" && difficulty !== "Easy") score -= 20;
  if (conditions.includes("Heart condition")) score -= 30;
  if (conditions.includes("High blood pressure")) score -= 15;
  if (conditions.includes("Asthma")) score -= 10;
  if (altitude > 5e3) score -= 20;
  else if (altitude > 4e3) score -= 10;
  return Math.max(0, score);
}
function FitnessCalculator({
  trekDifficulty,
  trekAltitude
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [age, setAge] = reactExports.useState(30);
  const [fitness, setFitness] = reactExports.useState("Active");
  const [experience, setExperience] = reactExports.useState("Some experience");
  const [conditions, setConditions] = reactExports.useState(["None"]);
  const [result, setResult] = reactExports.useState(null);
  function toggleCondition(c) {
    setConditions((prev) => {
      if (c === "None") return ["None"];
      const withoutNone = prev.filter((x) => x !== "None");
      if (withoutNone.includes(c))
        return withoutNone.filter((x) => x !== c).length === 0 ? ["None"] : withoutNone.filter((x) => x !== c);
      return [...withoutNone, c];
    });
  }
  function handleCalculate() {
    const score = calculateScore(
      age,
      fitness,
      experience,
      conditions,
      trekDifficulty,
      trekAltitude
    );
    setResult(score);
  }
  function getBadge(score) {
    if (score >= 70)
      return {
        emoji: "✅",
        text: "You're Fit for This Trek!",
        bg: "#E8F5E9",
        border: "#2E7D32",
        textColor: "#2E7D32"
      };
    if (score >= 40)
      return {
        emoji: "⚠️",
        text: "Moderate Fitness Required — Follow Training Plan",
        bg: "var(--ew-orange-lt)",
        border: "var(--ew-orange)",
        textColor: "var(--ew-orange)"
      };
    return {
      emoji: "❌",
      text: "This trek may not be suitable — Consider easier alternatives",
      bg: "var(--ew-red-lt)",
      border: "var(--ew-red)",
      textColor: "var(--ew-red)"
    };
  }
  const badge = result !== null ? getBadge(result) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden",
      style: { border: "1px solid var(--ew-gray-mid)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((o) => !o),
            className: "w-full flex items-center justify-between px-5 py-4 text-left transition-colors",
            style: {
              backgroundColor: open ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)"
            },
            "data-ocid": "fitness.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquareActivity, { size: 18, style: { color: "var(--ew-orange)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-bold text-sm",
                    style: { color: "var(--ew-text)" },
                    children: "Are You Ready for This Trek?"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] font-medium px-2 py-0.5 rounded-full",
                    style: {
                      backgroundColor: "var(--ew-orange)",
                      color: "#fff"
                    },
                    children: "Fitness Calculator"
                  }
                )
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 18, style: { color: "var(--ew-gray-dark)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, style: { color: "var(--ew-gray-dark)" } })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.28 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-5 bg-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "fitness-age",
                    className: "text-xs font-semibold block mb-2",
                    style: { color: "var(--ew-text)" },
                    children: [
                      "1. Your Age:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-orange)" }, children: age })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "fitness-age",
                    type: "range",
                    min: 15,
                    max: 70,
                    value: age,
                    onChange: (e) => setAge(Number(e.target.value)),
                    className: "w-full accent-[var(--ew-orange)]",
                    "data-ocid": "fitness.age.input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-[10px] mt-1",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "15" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "70" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "2. Current Fitness Level"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: FITNESS_LEVELS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFitness(f),
                    className: "text-xs font-semibold px-3 py-1.5 rounded-full transition-all",
                    style: {
                      backgroundColor: fitness === f ? "var(--ew-orange)" : "var(--ew-gray-lt)",
                      color: fitness === f ? "#fff" : "var(--ew-text)",
                      border: `1px solid ${fitness === f ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`
                    },
                    "data-ocid": `fitness.fitness_level.${f.toLowerCase().replace(/ /g, "_")}`,
                    children: f
                  },
                  f
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "3. Trekking Experience"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: EXPERIENCE_LEVELS.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExperience(ex),
                    className: "text-xs font-semibold px-3 py-1.5 rounded-full transition-all",
                    style: {
                      backgroundColor: experience === ex ? "var(--ew-red)" : "var(--ew-gray-lt)",
                      color: experience === ex ? "#fff" : "var(--ew-text)",
                      border: `1px solid ${experience === ex ? "var(--ew-red)" : "var(--ew-gray-mid)"}`
                    },
                    "data-ocid": `fitness.experience.${ex.toLowerCase().replace(/ /g, "_")}`,
                    children: ex
                  },
                  ex
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs font-semibold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "4. Medical Conditions (select all that apply)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: MEDICAL_CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => toggleCondition(c),
                    className: "text-xs font-semibold px-3 py-1.5 rounded-full transition-all",
                    style: {
                      backgroundColor: conditions.includes(c) ? c === "None" ? "var(--ew-green)" : "var(--ew-red-lt)" : "var(--ew-gray-lt)",
                      color: conditions.includes(c) ? c === "None" ? "#fff" : "var(--ew-red)" : "var(--ew-text)",
                      border: `1px solid ${conditions.includes(c) ? c === "None" ? "var(--ew-green)" : "var(--ew-red)" : "var(--ew-gray-mid)"}`
                    },
                    "data-ocid": `fitness.medical.${c.toLowerCase().replace(/ /g, "_")}`,
                    children: c
                  },
                  c
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCalculate,
                  className: "btn-primary w-full justify-center text-sm",
                  "data-ocid": "fitness.calculate_button",
                  children: "Calculate My Fitness Score"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: result !== null && badge && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 0.95 },
                  transition: { type: "spring", stiffness: 320, damping: 24 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-4 text-center",
                        style: {
                          backgroundColor: badge.bg,
                          border: `2px solid ${badge.border}`
                        },
                        "data-ocid": "fitness.result",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-1", children: badge.emoji }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-bold text-sm",
                              style: { color: badge.textColor },
                              children: badge.text
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-[11px] mt-1 font-medium",
                              style: { color: badge.textColor, opacity: 0.75 },
                              children: [
                                "Fitness score: ",
                                result,
                                "/100"
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h4",
                        {
                          className: "font-bold text-sm mb-3",
                          style: { color: "var(--ew-text)" },
                          children: "🏋️ Your 4-Week Training Plan"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: TRAINING_WEEKS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex gap-3 items-start rounded-xl p-3",
                          style: {
                            backgroundColor: "var(--ew-gray-lt)",
                            border: "1px solid var(--ew-gray-mid)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0",
                                style: {
                                  backgroundColor: "var(--ew-orange)",
                                  color: "#fff"
                                },
                                children: [
                                  "W",
                                  w.week
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: w.plan
                              }
                            )
                          ]
                        },
                        w.week
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => ue.success("Download starting...", {
                            duration: 2e3
                          }),
                          className: "mt-3 flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-colors w-full justify-center",
                          style: {
                            backgroundColor: "var(--ew-orange-lt)",
                            color: "var(--ew-orange)",
                            border: "1px solid var(--ew-orange)"
                          },
                          "data-ocid": "fitness.download_button",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                            "Download Training Plan PDF"
                          ]
                        }
                      )
                    ] })
                  ]
                }
              ) })
            ] })
          }
        ) })
      ]
    }
  );
}
const Variant_pending_approved_rejected = {
  approved: "approved"
};
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const YEARS = Array.from({ length: 6 }, (_, i) => 2020 + i);
function useApprovedPhotos(trekSlug) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["ugcPhotos", trekSlug],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getUgcPhotosByTrek(trekSlug);
      return all.filter(
        (p) => p.status === Variant_pending_approved_rejected.approved
      );
    },
    enabled: !!actor && !isFetching
  });
}
function useSubmitPhoto() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not ready");
      const result = await actor.submitUgcPhoto(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["ugcPhotos", vars.trekSlug] });
      ue.success("Photo submitted! It will appear after admin review.");
    },
    onError: (e) => ue.error(e.message ?? "Upload failed.")
  });
}
function TrekkerPhotoWall({ trekSlug }) {
  const { data: photos, isLoading } = useApprovedPhotos(trekSlug);
  const submitMutation = useSubmitPhoto();
  const [name, setName] = reactExports.useState("");
  const [month, setMonth] = reactExports.useState(MONTHS[0]);
  const [year, setYear] = reactExports.useState(String((/* @__PURE__ */ new Date()).getFullYear()));
  const [preview, setPreview] = reactExports.useState(null);
  const [fileData, setFileData] = reactExports.useState(null);
  const [lightboxIdx, setLightboxIdx] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  function handleFile(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      ue.error("Only JPEG and PNG files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      ue.error("File must be under 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const result = (_a2 = ev.target) == null ? void 0 : _a2.result;
      setPreview(result);
      setFileData(result);
    };
    reader.readAsDataURL(file);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!fileData) {
      ue.error("Please select a photo.");
      return;
    }
    await submitMutation.mutateAsync({
      trekSlug,
      trekkerName: name.trim(),
      trekDate: `${month} ${year}`,
      photoData: fileData
    });
    setName("");
    setPreview(null);
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const inputCls = "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ew-red)]/30 border-[var(--ew-gray-mid)] text-[var(--ew-text)]";
  const labelCls = "block text-xs font-semibold mb-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          className: "text-lg font-bold flex items-center gap-2",
          style: { color: "var(--ew-text)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📸" }),
            " Trekker Photos"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-0.5 w-16 mt-1 rounded",
          style: { background: "var(--ew-red)" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-5",
        style: {
          border: "1px solid var(--ew-gray-mid)",
          background: "var(--ew-gray-lt)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-semibold text-sm mb-4",
              style: { color: "var(--ew-text)" },
              children: "Share Your Memory"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-3",
              "data-ocid": "ugc.upload_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "ugc-name",
                        className: labelCls,
                        style: { color: "var(--ew-text)" },
                        children: "Your Name"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "ugc-name",
                        type: "text",
                        value: name,
                        onChange: (e) => setName(e.target.value),
                        placeholder: "e.g. Priya Sharma",
                        required: true,
                        className: inputCls,
                        "data-ocid": "ugc.name.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: labelCls, style: { color: "var(--ew-text)" }, children: "Trek Date" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          value: month,
                          onChange: (e) => setMonth(e.target.value),
                          className: inputCls,
                          "aria-label": "Month",
                          "data-ocid": "ugc.month.select",
                          children: MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          value: year,
                          onChange: (e) => setYear(e.target.value),
                          className: inputCls,
                          "aria-label": "Year",
                          "data-ocid": "ugc.year.select",
                          children: YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(y), children: y }, y))
                        }
                      )
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "ugc-file",
                      className: labelCls,
                      style: { color: "var(--ew-text)" },
                      children: "Upload Photo (JPEG / PNG, max 5 MB)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "ugc-file",
                      ref: fileInputRef,
                      type: "file",
                      accept: "image/jpeg,image/png",
                      onChange: handleFile,
                      className: "block w-full text-sm text-[var(--ew-text-lt)] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-[var(--ew-red)] hover:file:bg-[var(--ew-red-lt)] cursor-pointer",
                      "data-ocid": "ugc.photo.upload_button"
                    }
                  )
                ] }),
                preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: preview,
                      alt: "Preview",
                      className: "h-32 w-auto rounded-xl object-cover",
                      style: { border: "2px solid var(--ew-orange)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setPreview(null);
                        setFileData(null);
                      },
                      className: "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-xs font-bold flex items-center justify-center",
                      style: {
                        border: "1px solid var(--ew-gray-mid)",
                        color: "var(--ew-red)"
                      },
                      "aria-label": "Remove photo",
                      children: "✕"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    disabled: submitMutation.isPending,
                    className: "btn-primary text-sm disabled:opacity-60",
                    "data-ocid": "ugc.submit_button",
                    children: submitMutation.isPending ? "Uploading…" : "Share Your Memory"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "aspect-square rounded-xl animate-pulse",
        style: { background: "var(--ew-gray-mid)" }
      },
      i
    )) }),
    !isLoading && (!photos || photos.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-8 text-center",
        style: { border: "1px dashed var(--ew-gray-mid)" },
        "data-ocid": "ugc.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "📷" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: "Be the first to share a photo from this trek!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-gray-dark)" }, children: "Upload your trekking memories above." })
        ]
      }
    ),
    !isLoading && photos && photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3", children: photos.map((photo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setLightboxIdx(idx),
        className: "group relative break-inside-avoid rounded-xl overflow-hidden block w-full",
        "data-ocid": `ugc.photo.item.${idx + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photo.photoData,
              alt: `${photo.trekkerName} on ${photo.trekDate}`,
              loading: "lazy",
              className: "w-full object-cover transition-transform duration-300 group-hover:scale-105"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 px-2 py-2 bg-gradient-to-t from-black/70 to-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold truncate", children: photo.trekkerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                style: { color: "rgba(255,255,255,0.7)" },
                className: "text-[10px]",
                children: photo.trekDate
              }
            )
          ] })
        ]
      },
      photo.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxIdx !== null && photos && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[300] flex items-center justify-center bg-black/92",
        onClick: () => setLightboxIdx(null),
        "data-ocid": "ugc.lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl",
              style: { background: "rgba(255,255,255,0.15)" },
              onClick: () => setLightboxIdx(null),
              "aria-label": "Close",
              "data-ocid": "ugc.lightbox.close_button",
              children: "✕"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl",
              style: { background: "rgba(255,255,255,0.15)" },
              onClick: (e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (i) => ((i ?? 0) - 1 + photos.length) % photos.length
                );
              },
              "aria-label": "Previous",
              children: "‹"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { scale: 0.92, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              exit: { scale: 0.92, opacity: 0 },
              className: "max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden relative",
              onClick: (e) => e.stopPropagation(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: photos[lightboxIdx].photoData,
                    alt: photos[lightboxIdx].trekkerName,
                    className: "max-w-[90vw] max-h-[85vh] object-contain"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 px-4 py-3",
                    style: { background: "rgba(0,0,0,0.6)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold", children: photos[lightboxIdx].trekkerName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          style: { color: "rgba(255,255,255,0.7)" },
                          className: "text-sm",
                          children: photos[lightboxIdx].trekDate
                        }
                      )
                    ]
                  }
                )
              ]
            },
            lightboxIdx
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl",
              style: { background: "rgba(255,255,255,0.15)" },
              onClick: (e) => {
                e.stopPropagation();
                setLightboxIdx((i) => ((i ?? 0) + 1) % photos.length);
              },
              "aria-label": "Next",
              children: "›"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm", children: [
            lightboxIdx + 1,
            " / ",
            photos.length
          ] })
        ]
      }
    ) })
  ] });
}
const TABS = [
  "Overview",
  "Itinerary",
  "Inclusions & Exclusions",
  "Map & Route",
  "How to Reach",
  "Gear List",
  "Photos",
  "Reviews",
  "FAQs"
];
function DifficultyBadge({ level }) {
  const classMap = {
    Easy: "trek-difficulty-easy",
    "Easy-Moderate": "trek-difficulty-easy",
    Moderate: "trek-difficulty-moderate",
    "Moderate-Difficult": "trek-difficulty-moderate",
    Difficult: "trek-difficulty-difficult",
    "Difficult-Extreme": "trek-difficulty-difficult",
    Extreme: "trek-difficulty-extreme"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classMap[level] ?? "trek-difficulty-moderate", children: level });
}
function StarRow({ rating, size = 14 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size,
      style: { color: "var(--ew-gold)" },
      className: s <= Math.round(rating) ? "fill-[var(--ew-gold)]" : "fill-none"
    },
    s
  )) });
}
function buildItinerary(duration, startPoint, maxAlt) {
  const base = Math.round(maxAlt * 0.3);
  const templates = [
    {
      title: "Arrival & Acclimatization",
      desc: `Arrive at ${startPoint} and check into your accommodation. The afternoon is free for rest and acclimatization to the mountain air. Your trek leader conducts a comprehensive briefing covering safety protocols, gear check, route overview, and altitude guidelines. The evening includes a hearty dinner and an introduction to your fellow trekkers. Overnight stay at the base camp guesthouse.`,
      altitude: base,
      stay: startPoint,
      meals: [true, false, true]
    },
    {
      title: "Trek Begins — Into the Forest",
      desc: "After an energizing breakfast, the trek begins through lush oak and rhododendron forests. The trail gradually gains altitude, offering your first glimpses of the majestic Himalayan peaks ahead. Trek for 5–6 hours through scenic terrain. Camp is set up at a beautiful meadow with unobstructed mountain views. Hot dinner and a warm campfire under a canopy of stars.",
      altitude: Math.round(maxAlt * 0.45),
      stay: "Forest Campsite",
      meals: [true, true, true]
    },
    {
      title: "High Altitude Meadows",
      desc: "Today's trail takes you above the treeline into vast alpine meadows carpeted with wildflowers. The views of snow-capped peaks become increasingly dramatic. Cross small glacial streams and navigate rocky switchbacks. The campsite at this altitude offers a breathtaking 360° panorama of the surrounding mountains. Walk slowly, breathe deeply — altitude awareness is critical from this point.",
      altitude: Math.round(maxAlt * 0.6),
      stay: "Meadow Campsite",
      meals: [true, true, true]
    },
    {
      title: "Summit Push / Highest Point",
      desc: "The most challenging and most rewarding day. An alpine start at 4 AM gives you time to reach the highest point before afternoon clouds roll in. The trail crosses snow and ancient rock. At the summit or lake, take in the breathtaking panoramic views that stretch across multiple Himalayan ranges. Descend carefully to camp. This is the day you will remember for the rest of your life.",
      altitude: maxAlt,
      stay: "High Camp",
      meals: [true, true, true]
    },
    {
      title: "Descent Begins",
      desc: "After the highs of yesterday, begin a steady descent through varied terrain. The landscape transforms as altitude drops — from barren rock to green meadows to fragrant pine forests. Legs may be tired but spirits are high. Camp at a lower altitude, breathing easier and enjoying lush surroundings. A well-earned rest after the most demanding days of the trek.",
      altitude: Math.round(maxAlt * 0.55),
      stay: "Descent Campsite",
      meals: [true, true, true]
    },
    {
      title: "Return to Base",
      desc: `The final day of trekking brings you back to ${startPoint}. Reminisce the journey as the familiar trail descends through well-trodden territory. On arrival, enjoy a hot meal, a warm shower, and the deep satisfaction of completing a Himalayan trek. Trek completion certificates are awarded to all participants at a small celebration ceremony.`,
      altitude: base,
      stay: startPoint,
      meals: [true, false, true]
    }
  ];
  return Array.from(
    { length: duration },
    (_, i) => templates[Math.min(i, templates.length - 1)]
  );
}
const GEAR_CATEGORIES = [
  {
    label: "Clothing",
    icon: "👕",
    items: [
      "Thermal base layer (top & bottom)",
      "Fleece mid-layer jacket",
      "Waterproof outer shell",
      "Trekking pants ×2",
      "Warm gloves",
      "Woolen balaclava / beanie",
      "Trekking socks ×4–5",
      "Gaiters (snow treks)"
    ]
  },
  {
    label: "Footwear",
    icon: "👟",
    items: [
      "Waterproof trekking boots (ankle support)",
      "Camp sandals / slippers",
      "Crampons (provided if needed)",
      "Gaiters"
    ]
  },
  {
    label: "Equipment",
    icon: "🎒",
    items: [
      "40–50L trekking backpack",
      "Rain cover for backpack",
      "Trekking poles",
      "Headlamp + extra batteries",
      "Water bottles (2L minimum)",
      "Sleeping bag (−10°C rated)",
      "UV400 sunglasses",
      "Sun hat / cap"
    ]
  },
  {
    label: "Personal & Documents",
    icon: "📋",
    items: [
      "Government photo ID (Aadhaar / Passport)",
      "Medical certificate (high altitude)",
      "Personal first-aid kit",
      "Sunscreen SPF 50+",
      "Lip balm",
      "Insect repellent",
      "Personal medications",
      "Energy bars / dry snacks"
    ]
  }
];
const FAQS = [
  {
    q: "What fitness level is required?",
    a: "Basic fitness is enough — you should be able to walk 8–12 km/day. Regular walking or jogging 3–4 weeks prior is strongly recommended."
  },
  {
    q: "Is altitude sickness a concern?",
    a: "Our guides are trained to identify AMS symptoms. Emergency oxygen is always carried. Proper acclimatization days are built into every itinerary."
  },
  {
    q: "What should I bring for gear?",
    a: "Layered warm clothing, waterproof trekking boots, rainwear, sunscreen, sunglasses, and a 40–50 L backpack. We send a complete gear list after booking."
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before. 50% refund 15–29 days before. No refund within 7 days of the trek start date."
  },
  {
    q: "Are solo travellers welcome?",
    a: "Absolutely. Solo bookings are common. You will be placed in a group with other trekkers of similar experience levels."
  },
  {
    q: "Is gear rental available?",
    a: "Yes — trekking poles, sleeping bags, crampons, backpacks, and rain jackets are available for rent from ₹100–₹200/day."
  },
  {
    q: "What food is provided on trek?",
    a: "All meals on the trail are included — breakfast, packed lunch, and a hot dinner at camp. Special dietary requirements can be accommodated with advance notice."
  },
  {
    q: "How do I get to the base camp?",
    a: "Transport from a major city to the base camp is not included but can be arranged at an additional cost. We share detailed travel instructions after booking."
  },
  {
    q: "What happens if weather turns bad?",
    a: "Treks may be re-routed or delayed on safety grounds. Our guides take weather calls from certified met services. No charges apply for force-majeure delays."
  },
  {
    q: "Is there mobile connectivity on trek?",
    a: "Connectivity is limited above a certain altitude. BSNL typically has the best coverage on most Himalayan routes. Inform your family beforehand."
  },
  {
    q: "What is the maximum group size?",
    a: "We keep groups to a maximum of 12 trekkers per guide to ensure a personalised, safe, and eco-responsible experience."
  },
  {
    q: "Can I book for a private/custom group?",
    a: "Yes — private corporate and school group bookings are available year-round. Contact us via the Inquiry form for custom pricing."
  }
];
const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "New Delhi",
    date: "Jan 2025",
    rating: 5,
    batch: "Winter Batch",
    text: "An absolutely magical experience! The Trekora guides were knowledgeable and ensured our safety throughout. The views were beyond any photograph. I would recommend this to every adventure-seeker.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80"
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    date: "Oct 2024",
    rating: 5,
    batch: "Autumn Batch",
    text: "Life-changing is the only word. The team handled every logistical detail perfectly — from campsite setup to the surprisingly excellent food at altitude. Highly recommend Trekora!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80"
  },
  {
    name: "Ananya Krishnan",
    city: "Bengaluru",
    date: "Sep 2024",
    rating: 4,
    batch: "Summer Batch",
    text: "My first Himalayan trek and I could not have chosen a better company. The guides were incredibly supportive. Challenging altitude, but every tough step was worth the breathtaking views.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80"
  }
];
function TrekDetailPage() {
  const { slug } = useParams({ from: "/layout/treks/$slug" });
  const trek = TREKS.find((t) => t.slug === slug);
  const [activeTab, setActiveTab] = reactExports.useState("Overview");
  const [heroIndex, setHeroIndex] = reactExports.useState(0);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(null);
  const [groupSize, setGroupSize] = reactExports.useState(2);
  const [addOns, setAddOns] = reactExports.useState({
    gear: false,
    insurance: false,
    transport: false,
    photographer: false
  });
  const [viewerCount] = reactExports.useState(() => Math.floor(Math.random() * 15) + 8);
  const [socialProofIdx, setSocialProofIdx] = reactExports.useState(0);
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [cancellationOpen, setCancellationOpen] = reactExports.useState(false);
  const [openDay, setOpenDay] = reactExports.useState(0);
  const [reviewRating, setReviewRating] = reactExports.useState(0);
  const [hoverRating, setHoverRating] = reactExports.useState(0);
  const [bookingDrawerOpen, setBookingDrawerOpen] = reactExports.useState(false);
  const [querySheetOpen, setQuerySheetOpen] = reactExports.useState(false);
  const [_copied, setCopied] = reactExports.useState(false);
  const { push: gtmPush } = useGTM();
  reactExports.useEffect(() => {
    const t = setInterval(() => setSocialProofIdx((i) => (i + 1) % 3), 1e4);
    return () => clearInterval(t);
  }, []);
  reactExports.useCallback(() => {
    navigator.clipboard.writeText(window.location.href).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, []);
  reactExports.useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        String(window.scrollY)
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  reactExports.useEffect(() => {
    if (!trek) return;
    const cleanupTrek = injectJSONLD(generateTrekJSONLD(trek), "jsonld-trek");
    const cleanupBreadcrumb = injectJSONLD(
      generateBreadcrumbJSONLD([
        { name: "Home", url: "/" },
        { name: "Treks", url: "/treks" },
        {
          name: trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh",
          url: trek.state === "uttarakhand" ? "/destinations/uttarakhand" : "/destinations/himachal-pradesh"
        },
        { name: trek.name, url: `/treks/${trek.slug}` }
      ]),
      "jsonld-breadcrumb"
    );
    const cleanupFaq = injectJSONLD(
      generateFAQJSONLD(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
      "jsonld-faq"
    );
    return () => {
      cleanupTrek();
      cleanupBreadcrumb();
      cleanupFaq();
    };
  }, [trek == null ? void 0 : trek.slug]);
  reactExports.useEffect(() => {
    if (!trek) return;
    gtmPush({
      event: "view_item",
      item_name: trek.name,
      item_price: trek.price,
      item_category: trek.state
    });
  }, [trek == null ? void 0 : trek.slug]);
  const trekSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: (trek == null ? void 0 : trek.name) ?? "",
    description: (trek == null ? void 0 : trek.description) ?? "",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Trekora",
      url: "https://www.trekora.com"
    },
    touristType: "Adventure Trekking",
    offers: {
      "@type": "Offer",
      price: (trek == null ? void 0 : trek.price) ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (trek == null ? void 0 : trek.rating) ?? 4.5,
      reviewCount: (trek == null ? void 0 : trek.reviewCount) ?? 0,
      bestRating: 5
    }
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trekora.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Treks",
        item: "https://www.trekora.com/treks"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: (trek == null ? void 0 : trek.name) ?? "",
        item: `https://www.trekora.com/treks/${slug}`
      }
    ]
  };
  if (!trek) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Mountain,
        {
          size: 64,
          className: "mx-auto mb-4",
          style: { color: "var(--ew-red)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Trek Not Found"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-sm", style: { color: "var(--ew-gray-dark)" }, children: "The trek you're looking for doesn't exist or may have moved." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Browse All Treks" })
    ] }) });
  }
  const related = TREKS.filter(
    (t) => t.slug !== slug && t.state === trek.state
  ).slice(0, 4);
  const itinerary = buildItinerary(
    trek.duration,
    trek.startPoint,
    trek.altitude
  );
  const baseTotal = trek.price * groupSize;
  const grandTotal = baseTotal + (addOns.gear ? 800 * groupSize : 0) + (addOns.insurance ? 350 * groupSize : 0) + (addOns.transport ? 1200 : 0) + (addOns.photographer ? 2500 : 0);
  const activeBestMonths = ALL_MONTHS.filter(
    (m) => trek.bestSeason.toLowerCase().includes(m.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { backgroundColor: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SEOHead,
          {
            title: `${trek.name} Trek 2025 | ${trek.duration} Days | From ₹${trek.price.toLocaleString("en-IN")} | Trekora — Himalayan Treks & Yatras`,
            description: `Book ${trek.name} trek in ${trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}. ${trek.duration} days, max altitude ${trek.altitude.toLocaleString()}m, difficulty: ${trek.difficulty}. Starting from ₹${trek.price.toLocaleString("en-IN")}/person. NCISM-certified guides, full support.`,
            keywords: `${trek.name}, ${trek.state} trek, ${trek.difficulty} trek, Himalayan trekking, ${trek.name} 2025, book ${trek.name.toLowerCase()}, Trekora`,
            canonical: `https://www.trekora.com/treks/${trek.slug}`,
            ogImage: trek.image,
            schema: [trekSchema, breadcrumbSchema]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              backgroundColor: "var(--ew-gray-lt)",
              borderBottom: "1px solid var(--ew-gray-mid)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "container mx-auto px-4 py-2 flex items-center gap-1.5 text-xs flex-wrap",
                style: { color: "var(--ew-gray-dark)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/",
                      className: "hover:underline",
                      style: { color: "var(--ew-gray-dark)" },
                      children: "Home"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/treks",
                      className: "hover:underline",
                      style: { color: "var(--ew-gray-dark)" },
                      children: "Treks"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "capitalize hover:underline cursor-default",
                      style: { color: "var(--ew-gray-dark)" },
                      children: trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "var(--ew-red)" }, children: trek.name })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "trek-hero-parallax relative bg-black overflow-hidden",
            style: {
              height: "56vw",
              maxHeight: 520,
              minHeight: "clamp(280px, 60vw, 480px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "sync", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: trek.images[heroIndex] ?? trek.image,
                  alt: `${trek.name} — view ${heroIndex + 1}`,
                  className: "absolute inset-0 w-full h-full object-cover",
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  transition: { duration: 0.5 }
                },
                heroIndex
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" }),
              trek.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setHeroIndex(
                      (i) => (i - 1 + trek.images.length) % trek.images.length
                    ),
                    className: "absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 transition flex items-center justify-center",
                    "aria-label": "Previous image",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 22, className: "text-white" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setHeroIndex((i) => (i + 1) % trek.images.length),
                    className: "absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 transition flex items-center justify-center",
                    "aria-label": "Next image",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 22, className: "text-white" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-5 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex flex-wrap items-end justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyBadge, { level: trek.difficulty }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-orange text-[10px] capitalize", children: trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-bold text-white text-shadow", children: trek.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mt-1",
                      style: { color: "rgba(255,255,255,0.8)" },
                      children: trek.shortDesc
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-2 rounded-xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: trek.rating, size: 16 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-white text-lg", children: trek.rating }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-sm",
                      style: { color: "rgba(255,255,255,0.75)" },
                      children: [
                        "(",
                        trek.reviewCount,
                        " reviews)"
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          }
        ),
        trek.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-black flex gap-1 px-2 py-1 overflow-x-auto", children: trek.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setHeroIndex(i),
            className: "flex-shrink-0 rounded overflow-hidden transition-all",
            style: {
              outline: i === heroIndex ? "2px solid var(--ew-orange)" : "2px solid transparent",
              outlineOffset: 1
            },
            "aria-label": `View image ${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.replace("w=1200", "w=120"),
                alt: `${trek.name} thumbnail ${i + 1}`,
                className: "w-16 h-10 object-cover"
              }
            )
          },
          img
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "var(--ew-footer)", color: "#fff" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-8 gap-y-2 justify-start text-sm", children: [
          {
            label: "Duration",
            value: `${trek.duration} Days`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 })
          },
          {
            label: "Max Altitude",
            value: `${trek.altitude.toLocaleString()}m`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 14 })
          },
          {
            label: "Difficulty",
            value: trek.difficulty,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 14 })
          },
          {
            label: "Distance",
            value: `${trek.distance} km`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 })
          },
          {
            label: "Best Season",
            value: trek.bestSeason,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14 })
          },
          {
            label: "Start Point",
            value: trek.startPoint,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 })
          }
        ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-orange)" }, children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[11px]",
                style: { color: "rgba(255,255,255,0.55)" },
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[13px]", children: value })
          ] })
        ] }, label)) }) }) }),
        trek.tags && trek.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-3",
            style: {
              backgroundColor: "var(--ew-gray-lt)",
              borderBottom: "1px solid var(--ew-gray-mid)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-semibold mr-1",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "Tags:"
                }
              ),
              trek.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[12px] px-3 py-1 rounded-full border cursor-pointer transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]",
                  style: {
                    backgroundColor: "#fff",
                    color: "#555",
                    borderColor: "var(--ew-gray-mid)"
                  },
                  "data-ocid": `trek_detail.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                  children: tag
                },
                tag
              ))
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white sticky z-30 shadow-sm",
            style: { top: 64, borderBottom: "2px solid var(--ew-gray-mid)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-x-auto gap-0 scrollbar-hide -mx-4 px-4", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab),
                className: "whitespace-nowrap px-4 py-3.5 text-sm font-medium border-b-2 transition-colors flex-shrink-0",
                style: activeTab === tab ? {
                  borderBottomColor: "var(--ew-red)",
                  color: "var(--ew-red)"
                } : {
                  borderBottomColor: "transparent",
                  color: "var(--ew-gray-dark)"
                },
                "data-ocid": `trek_detail.tab.${tab.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
                children: tab
              },
              tab
            )) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-6 min-w-0", children: [
              activeTab === "Overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Overview" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
                      {
                        label: "Distance",
                        value: `${trek.distance} km`,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18 })
                      },
                      {
                        label: "Duration",
                        value: `${trek.duration} Days`,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18 })
                      },
                      {
                        label: "Max Altitude",
                        value: `${trek.altitude.toLocaleString()}m`,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 18 })
                      },
                      {
                        label: "Trek Type",
                        value: trek.trekType,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18 })
                      }
                    ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-3 text-center",
                        style: {
                          backgroundColor: "var(--ew-gray-lt)",
                          border: "1px solid var(--ew-gray-mid)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              style: { color: "var(--ew-red)" },
                              className: "flex justify-center mb-1",
                              children: icon
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-[11px] font-medium",
                              style: { color: "var(--ew-gray-dark)" },
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm font-bold",
                              style: { color: "var(--ew-text)" },
                              children: value
                            }
                          )
                        ]
                      },
                      label
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm leading-relaxed mb-6",
                        style: { color: "var(--ew-text-lt)" },
                        children: trek.description
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-base mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Key Highlights"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6", children: [
                      "Stunning panoramic views of snow-capped Himalayan peaks",
                      "Expert NCISM-certified guides with deep local knowledge",
                      "Well-planned acclimatization schedule for altitude safety",
                      "Small group sizes (max 12) for a personalized experience",
                      "Eco-friendly camping with Leave No Trace practices"
                    ].map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 text-sm",
                        style: { color: "var(--ew-text-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheck,
                            {
                              size: 16,
                              className: "flex-shrink-0 mt-0.5",
                              style: { color: "var(--ew-red)" }
                            }
                          ),
                          point
                        ]
                      },
                      point
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrailConditionBadge, { trekSlug: trek.slug, variant: "card" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      WeatherWidget,
                      {
                        trekName: trek.name,
                        location: trek.startPoint
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-base mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Best Season to Visit"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 sm:grid-cols-12 gap-1 mb-2", children: ALL_MONTHS.map((m) => {
                      const active = activeBestMonths.includes(m);
                      return /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-center rounded py-1.5 text-[11px] font-semibold transition-colors",
                          style: active ? {
                            backgroundColor: "var(--ew-green)",
                            color: "#fff"
                          } : {
                            backgroundColor: "var(--ew-gray-lt)",
                            color: "var(--ew-gray-dark)",
                            border: "1px solid var(--ew-gray-mid)"
                          },
                          children: m
                        },
                        m
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-[11px]",
                        style: { color: "var(--ew-gray-dark)" },
                        children: [
                          "Best season:",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-semibold",
                              style: { color: "var(--ew-text)" },
                              children: trek.bestSeason
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                "overview"
              ),
              activeTab === "Itinerary" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "Day-by-Day Itinerary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: itinerary.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl overflow-hidden",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setOpenDay(openDay === i ? null : i),
                              className: "w-full flex items-center gap-4 p-4 text-left transition-colors",
                              style: {
                                backgroundColor: openDay === i ? "var(--ew-red-lt)" : "var(--ew-gray-lt)"
                              },
                              "data-ocid": `trek_detail.itinerary.day.${i + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "div",
                                  {
                                    className: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0",
                                    style: {
                                      backgroundColor: "var(--ew-red)",
                                      color: "#fff"
                                    },
                                    children: [
                                      "D",
                                      i + 1
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "p",
                                    {
                                      className: "font-bold text-sm truncate",
                                      style: { color: "var(--ew-text)" },
                                      children: [
                                        "Day ",
                                        i + 1,
                                        ": ",
                                        day.title
                                      ]
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "p",
                                    {
                                      className: "text-[12px]",
                                      style: { color: "var(--ew-gray-dark)" },
                                      children: [
                                        day.stay,
                                        " · ~",
                                        day.altitude.toLocaleString(),
                                        "m"
                                      ]
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronRight,
                                  {
                                    size: 18,
                                    style: {
                                      color: "var(--ew-gray-dark)",
                                      transform: openDay === i ? "rotate(90deg)" : "none",
                                      transition: "transform 0.2s"
                                    }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openDay === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.25 },
                              className: "overflow-hidden",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "p-4 border-t",
                                  style: { borderColor: "var(--ew-gray-mid)" },
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "p",
                                      {
                                        className: "text-sm leading-relaxed mb-3",
                                        style: { color: "var(--ew-text-lt)" },
                                        children: day.desc
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "font-medium",
                                          style: { color: "var(--ew-text)" },
                                          children: "Meals:"
                                        }
                                      ),
                                      ["Breakfast", "Lunch", "Dinner"].map(
                                        (meal, mi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                          "span",
                                          {
                                            className: "px-2 py-0.5 rounded-full font-medium",
                                            style: day.meals[mi] ? {
                                              backgroundColor: "var(--ew-orange-lt)",
                                              color: "var(--ew-orange)"
                                            } : {
                                              backgroundColor: "var(--ew-gray-lt)",
                                              color: "var(--ew-gray-dark)"
                                            },
                                            children: meal
                                          },
                                          meal
                                        )
                                      )
                                    ] })
                                  ]
                                }
                              )
                            }
                          ) })
                        ]
                      },
                      `day-${i + 1}`
                    )) })
                  ]
                },
                "itinerary"
              ),
              activeTab === "Itinerary" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      FitnessCalculator,
                      {
                        trekDifficulty: trek.difficulty,
                        trekAltitude: trek.altitude,
                        trekDuration: trek.duration
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => downloadTrekItineraryPDF(trek),
                        className: "flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-colors",
                        style: {
                          backgroundColor: "var(--ew-orange)",
                          color: "#fff"
                        },
                        "data-ocid": "trek_detail.itinerary.download_pdf_button",
                        children: "📥 Download Full Itinerary PDF"
                      }
                    ) })
                  ]
                },
                "fitness"
              ),
              activeTab === "Inclusions & Exclusions" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.3 },
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-2xl overflow-hidden shadow-card",
                          style: { border: "1px solid #a5d6a7" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "px-5 py-3 font-bold text-sm flex items-center gap-2",
                                style: { backgroundColor: "#2E7D32", color: "#fff" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15 }),
                                  "What's INCLUDED"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", style: { backgroundColor: "#E8F5E9" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
                              "Accommodation (tent/guesthouse as per itinerary)",
                              "All meals during the trek (breakfast, lunch, dinner, evening snacks)",
                              "Certified NCISM mountain trek leader",
                              "Trek support staff (cook + helper for groups 5+)",
                              "Forest department permits and national park entry fees",
                              "Quality camping equipment (high-altitude tents, sleeping mats, dining tent)",
                              "First-aid medical kit with AMS (Altitude Mountain Sickness) treatment",
                              "Portable oxygen cylinder (1 per group)",
                              "Trekora branded trek backpack cover (complimentary)",
                              "Safety equipment (rope, harness for technical sections)",
                              "Welcome and farewell meals",
                              "Daily morning tea/coffee at campsite"
                            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                className: "flex items-start gap-2 text-sm",
                                style: { color: "var(--ew-text-lt)" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    CircleCheck,
                                    {
                                      size: 14,
                                      className: "flex-shrink-0 mt-0.5",
                                      style: { color: "#2E7D32" }
                                    }
                                  ),
                                  item
                                ]
                              },
                              item
                            )) }) })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-2xl overflow-hidden shadow-card",
                          style: { border: "1px solid #ef9a9a" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "px-5 py-3 font-bold text-sm flex items-center gap-2",
                                style: {
                                  backgroundColor: "var(--ew-red)",
                                  color: "#fff"
                                },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 15 }),
                                  "What's NOT INCLUDED"
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", style: { backgroundColor: "#FFEBEE" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: [
                              "Transport to and from the trek base camp",
                              "Personal trekking gear (poles, boots, gaiters, rain gear)",
                              "Travel insurance (strongly recommended — we can arrange for ₹350)",
                              "Personal medication (antacids, paracetamol, personal prescriptions)",
                              "Tips and gratuity for guides and porters (voluntary, recommended)",
                              "Any meals before and after the trek",
                              "Helicopter evacuation charges (unless travel insurance covers it)",
                              "Porter charges for personal luggage (available at extra cost)",
                              "Alcoholic beverages",
                              "Any item of personal nature",
                              "GST 5% on total invoice amount",
                              "Monument/temple entry fees (if applicable)"
                            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "li",
                              {
                                className: "flex items-start gap-2 text-sm",
                                style: { color: "var(--ew-text-lt)" },
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    CircleX,
                                    {
                                      size: 14,
                                      className: "flex-shrink-0 mt-0.5",
                                      style: { color: "var(--ew-red)" }
                                    }
                                  ),
                                  item
                                ]
                              },
                              item
                            )) }) })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "bg-white rounded-2xl shadow-card overflow-hidden",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setCancellationOpen((o) => !o),
                              className: "w-full flex items-center justify-between px-5 py-4 text-left",
                              style: {
                                backgroundColor: cancellationOpen ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)"
                              },
                              "data-ocid": "trek_detail.cancellation_policy_toggle",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "font-bold text-sm",
                                    style: { color: "var(--ew-text)" },
                                    children: "📋 Cancellation Policy"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronRight,
                                  {
                                    size: 18,
                                    style: {
                                      color: "var(--ew-gray-dark)",
                                      transform: cancellationOpen ? "rotate(90deg)" : "none",
                                      transition: "transform 0.2s",
                                      flexShrink: 0
                                    }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: cancellationOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.25 },
                              className: "overflow-hidden",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "tr",
                                  {
                                    style: {
                                      borderBottom: "2px solid var(--ew-gray-mid)"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "th",
                                        {
                                          className: "text-left py-2 font-bold",
                                          style: { color: "var(--ew-text)" },
                                          children: "When you cancel"
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "th",
                                        {
                                          className: "text-right py-2 font-bold",
                                          style: { color: "var(--ew-text)" },
                                          children: "Refund amount"
                                        }
                                      )
                                    ]
                                  }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                                  {
                                    when: "30+ days before trek start",
                                    refund: "Full refund (100%)",
                                    color: "#2E7D32"
                                  },
                                  {
                                    when: "15–29 days before trek start",
                                    refund: "50% refund",
                                    color: "var(--ew-orange)"
                                  },
                                  {
                                    when: "7–14 days before trek start",
                                    refund: "25% refund",
                                    color: "var(--ew-orange)"
                                  },
                                  {
                                    when: "Less than 7 days before start",
                                    refund: "No refund",
                                    color: "var(--ew-red)"
                                  },
                                  {
                                    when: "Cancelled by Trekora (weather/force majeure)",
                                    refund: "Full refund or free reschedule",
                                    color: "#2E7D32"
                                  }
                                ].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "tr",
                                  {
                                    style: {
                                      borderBottom: i < 4 ? "1px solid var(--ew-gray-mid)" : "none",
                                      backgroundColor: i % 2 === 0 ? "var(--ew-gray-lt)" : "white"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "td",
                                        {
                                          className: "py-2 pr-4",
                                          style: { color: "var(--ew-text-lt)" },
                                          children: row.when
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "td",
                                        {
                                          className: "py-2 text-right font-semibold",
                                          style: { color: row.color },
                                          children: row.refund
                                        }
                                      )
                                    ]
                                  },
                                  row.when
                                )) })
                              ] }) })
                            }
                          ) })
                        ]
                      }
                    )
                  ]
                },
                "inclusions"
              ),
              activeTab === "Photos" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Photos & Videos" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8", children: trek.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setLightboxIndex(i),
                        className: "relative overflow-hidden rounded-xl group aspect-video",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: img.replace("w=1200", "w=400"),
                              alt: `${trek.name} view ${i + 1}`,
                              loading: "lazy",
                              className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Share2,
                            {
                              size: 22,
                              className: "text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            }
                          ) })
                        ]
                      },
                      img
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrekkerPhotoWall, { trekSlug: trek.slug }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-base mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Trek Videos"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      {
                        id: "Rz5g2-_Gu1c",
                        title: `${trek.name} — Full Trek Experience`
                      },
                      {
                        id: "ypnRIHdlGE8",
                        title: `${trek.name} — Highlights & Tips`
                      }
                    ].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `https://www.youtube.com/watch?v=${v.id}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "group relative block rounded-xl overflow-hidden",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: trek.image,
                              alt: v.title,
                              className: "w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/45 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-14 h-14 rounded-full flex items-center justify-center shadow-xl",
                              style: { backgroundColor: "var(--ew-red)" },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" })
                            }
                          ) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-3 left-3 right-3 text-white text-xs font-medium text-shadow", children: v.title })
                        ]
                      },
                      v.id
                    )) })
                  ]
                },
                "photos"
              ),
              activeTab === "Map & Route" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Trek Map & Altitude Profile" }),
                    trek.coordinates ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TrekMap,
                        {
                          trekName: trek.name,
                          coordinates: trek.coordinates,
                          distance: `${trek.distance} km`,
                          elevationGain: `~${(trek.altitude - Math.round(trek.altitude * 0.3)).toLocaleString()}m`,
                          highestPoint: `${trek.altitude.toLocaleString()}m`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "mt-6 rounded-xl p-4",
                          style: {
                            backgroundColor: "var(--ew-gray-lt)",
                            border: "1px solid var(--ew-gray-mid)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h3",
                              {
                                className: "font-bold text-sm mb-4",
                                style: { color: "var(--ew-text)" },
                                children: "Altitude Profile"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              AltitudeChart,
                              {
                                altitudeProfile: trek.coordinates.altitudeProfile,
                                trekName: trek.name
                              }
                            )
                          ]
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl overflow-hidden flex flex-col items-center justify-center py-16 text-center",
                        style: {
                          backgroundColor: "var(--ew-gray-lt)",
                          border: "1px solid var(--ew-gray-mid)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            MapPin,
                            {
                              size: 48,
                              className: "mb-3",
                              style: { color: "var(--ew-orange)" }
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-bold text-base mb-1",
                              style: { color: "var(--ew-text)" },
                              children: "Map Coming Soon"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "text-sm mb-5",
                              style: { color: "var(--ew-gray-dark)" },
                              children: [
                                "Trail coordinates for ",
                                trek.name,
                                " are being mapped."
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "a",
                            {
                              href: `https://maps.google.com/maps?q=${encodeURIComponent(`${trek.name} trek route India`)}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "btn-primary text-sm",
                              children: "Open in Google Maps"
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                "map"
              ),
              activeTab === "How to Reach" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.3 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "How to Reach" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "w-5 h-5 text-red-600" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "By Air" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: trek.state === "uttarakhand" ? "Jolly Grant Airport, Dehradun (DED) is the nearest airport, approximately 250-300 km from most trek base camps. Delhi IGI Airport is also accessible via Haridwar/Rishikesh." : "Bhuntar Airport, Kullu (KUU) is the nearest airport for Himachal treks. Chandigarh Airport (IXC) and Delhi Airport (DEL) are alternative options via road." })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TramFront, { className: "w-5 h-5 text-blue-600" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "By Train" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: trek.state === "uttarakhand" ? "Haridwar Railway Station (HW) and Rishikesh Railway Station (RKSH) are the main railheads. Dehradun Station (DDN) is also well-connected from Delhi and major cities." : "Chandigarh Railway Station (CDG) and Kalka Station (KLK) are the main railheads. The Shimla-Kalka Toy Train offers a scenic mountain journey to Shimla." })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-5 h-5 text-green-600" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "By Road" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: trek.state === "uttarakhand" ? `${trek.startPoint} is well-connected by road. Buses and shared taxis operate from Haridwar, Rishikesh, and Dehradun. GMOU buses run daily routes to most base camps.` : `${trek.startPoint} is accessible via NH-3 (Manali Road) and NH-5 (Hindustan-Tibet Road). HRTC buses and private taxis connect from Shimla, Manali, and Chandigarh.` })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-xl", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { className: "w-5 h-5 text-orange-600" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-1", children: "By Bus / Shared Taxi" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-sm", children: trek.state === "uttarakhand" ? "GMOU and Uttarakhand Roadways buses operate from ISBT Kashmere Gate (Delhi) and Haridwar to most destinations. Shared jeeps and taxis from Uttarkashi, Chamoli, Rudraprayag cover last-mile connectivity." : "HRTC (HP Tourism buses) and private operators connect Chandigarh, Delhi, and Manali to Himachal trek bases. Shared taxis from Rampur, Kaza, Recong Peo for high-altitude routes." })
                        ] })
                      ] })
                    ] })
                  ]
                },
                "how-to-reach"
              ),
              activeTab === "Gear List" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-4", children: "Complete Gear List" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6", children: GEAR_CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "h3",
                        {
                          className: "font-bold text-sm mb-3 flex items-center gap-2",
                          style: { color: "var(--ew-text)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.icon }),
                            cat.label
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: cat.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-center gap-2 text-sm",
                          style: { color: "var(--ew-text-lt)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "w-4 h-4 rounded flex-shrink-0",
                                style: {
                                  border: "1.5px solid var(--ew-gray-mid)"
                                }
                              }
                            ),
                            item
                          ]
                        },
                        item
                      )) })
                    ] }, cat.label)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-4",
                        style: {
                          backgroundColor: "var(--ew-orange-lt)",
                          border: "1px solid var(--ew-orange)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-bold text-sm mb-3",
                              style: { color: "var(--ew-text)" },
                              children: "🏕️ Rent Equipment from ₹200/day"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3", children: [
                            { item: "Trekking Poles", price: "₹150/day" },
                            { item: "Sleeping Bag", price: "₹200/day" },
                            { item: "Crampons", price: "₹100/day" },
                            { item: "Gaiters", price: "₹80/day" },
                            { item: "Backpack 50L", price: "₹200/day" },
                            { item: "Rain Jacket", price: "₹120/day" }
                          ].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "bg-white rounded-lg p-2 text-center",
                              style: { border: "1px solid var(--ew-gray-mid)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-[11px] font-medium",
                                    style: { color: "var(--ew-text)" },
                                    children: g.item
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "text-[12px] font-bold",
                                    style: { color: "var(--ew-orange)" },
                                    children: g.price
                                  }
                                )
                              ]
                            },
                            g.item
                          )) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "btn-primary text-sm",
                              "data-ocid": "trek_detail.rent_equipment_button",
                              children: "Rent Equipment — Book Now"
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                "gear"
              ),
              activeTab === "Reviews" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card space-y-6",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShareSection, { title: trek.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Reviews & Ratings" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewSubmitForm, { trekSlug: slug, trekName: trek.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col sm:flex-row gap-6 items-start rounded-xl p-5",
                        style: { backgroundColor: "var(--ew-gray-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "text-5xl font-bold",
                                style: { color: "var(--ew-text)" },
                                children: trek.rating
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center my-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: trek.rating, size: 18 }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "text-xs",
                                style: { color: "var(--ew-gray-dark)" },
                                children: [
                                  trek.reviewCount,
                                  " reviews"
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-1.5", children: [5, 4, 3, 2, 1].map((star) => {
                            const pct = star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 6 : 1;
                            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "div",
                              {
                                className: "flex items-center gap-3 text-sm",
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "text-xs w-3",
                                      style: { color: "var(--ew-gray-dark)" },
                                      children: star
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Star,
                                    {
                                      size: 11,
                                      style: { color: "var(--ew-gold)" },
                                      className: "fill-[var(--ew-gold)]"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "div",
                                    {
                                      className: "flex-1 rounded-full h-2",
                                      style: { backgroundColor: "var(--ew-gray-mid)" },
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "div",
                                        {
                                          className: "h-2 rounded-full",
                                          style: {
                                            width: `${pct}%`,
                                            backgroundColor: "var(--ew-orange)"
                                          }
                                        }
                                      )
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "text-[11px] w-8",
                                      style: { color: "var(--ew-gray-dark)" },
                                      children: [
                                        pct,
                                        "%"
                                      ]
                                    }
                                  )
                                ]
                              },
                              star
                            );
                          }) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: REVIEWS.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "rounded-xl p-4",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": `trek_detail.review.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: r.avatar,
                              alt: r.name,
                              className: "w-10 h-10 rounded-full object-cover flex-shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2 mb-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "font-semibold text-sm",
                                    style: { color: "var(--ew-text)" },
                                    children: r.name
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    className: "text-xs",
                                    style: { color: "var(--ew-gray-dark)" },
                                    children: [
                                      r.city,
                                      " · ",
                                      r.date
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: r.rating, size: 13 }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "text-[11px] px-2 py-0.5 rounded-full font-medium",
                                    style: {
                                      backgroundColor: "var(--ew-red-lt)",
                                      color: "var(--ew-red)"
                                    },
                                    children: r.batch
                                  }
                                )
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: r.text
                              }
                            )
                          ] })
                        ] })
                      },
                      r.name
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "border-t pt-5",
                        style: { borderColor: "var(--ew-gray-mid)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h3",
                            {
                              className: "font-bold text-base mb-4",
                              style: { color: "var(--ew-text)" },
                              children: "Write a Review"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "form",
                            {
                              className: "space-y-3",
                              onSubmit: (e) => e.preventDefault(),
                              "data-ocid": "trek_detail.review_form",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      type: "text",
                                      placeholder: "Your Name",
                                      required: true,
                                      className: "rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                                      style: {
                                        border: "1px solid var(--ew-gray-mid)",
                                        color: "var(--ew-text)"
                                      },
                                      "data-ocid": "trek_detail.review.name.input"
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "input",
                                    {
                                      type: "email",
                                      placeholder: "Email Address",
                                      required: true,
                                      className: "rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                                      style: {
                                        border: "1px solid var(--ew-gray-mid)",
                                        color: "var(--ew-text)"
                                      },
                                      "data-ocid": "trek_detail.review.email.input"
                                    }
                                  )
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "span",
                                    {
                                      className: "text-sm font-medium",
                                      style: { color: "var(--ew-text)" },
                                      children: "Rating:"
                                    }
                                  ),
                                  [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      onMouseEnter: () => setHoverRating(s),
                                      onMouseLeave: () => setHoverRating(0),
                                      onClick: () => setReviewRating(s),
                                      "aria-label": `Rate ${s} stars`,
                                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Star,
                                        {
                                          size: 22,
                                          style: { color: "var(--ew-gold)" },
                                          className: s <= (hoverRating || reviewRating) ? "fill-[var(--ew-gold)]" : "fill-none"
                                        }
                                      )
                                    },
                                    s
                                  ))
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "textarea",
                                  {
                                    placeholder: "Share your trek experience...",
                                    rows: 4,
                                    required: true,
                                    className: "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-none",
                                    style: {
                                      border: "1px solid var(--ew-gray-mid)",
                                      color: "var(--ew-text)"
                                    },
                                    "data-ocid": "trek_detail.review.textarea"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "submit",
                                    className: "btn-secondary text-sm",
                                    "data-ocid": "trek_detail.review.submit_button",
                                    children: "Submit Review"
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ]
                },
                "reviews"
              ),
              activeTab === "FAQs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  className: "bg-white rounded-2xl p-6 shadow-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Frequently Asked Questions" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl overflow-hidden",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": `trek_detail.faq.${i + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => setOpenFaq(openFaq === i ? null : i),
                              className: "w-full flex items-center justify-between p-4 text-left",
                              style: {
                                backgroundColor: openFaq === i ? "var(--ew-red-lt)" : "#fff"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "font-semibold text-sm pr-4",
                                    style: {
                                      color: openFaq === i ? "var(--ew-red)" : "var(--ew-text)"
                                    },
                                    children: faq.q
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  ChevronRight,
                                  {
                                    size: 18,
                                    style: {
                                      color: "var(--ew-gray-dark)",
                                      transform: openFaq === i ? "rotate(90deg)" : "none",
                                      transition: "transform 0.2s",
                                      flexShrink: 0
                                    }
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openFaq === i && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              initial: { height: 0, opacity: 0 },
                              animate: { height: "auto", opacity: 1 },
                              exit: { height: 0, opacity: 0 },
                              transition: { duration: 0.22 },
                              className: "overflow-hidden",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "px-4 pb-4 text-sm leading-relaxed border-t",
                                  style: {
                                    color: "var(--ew-text-lt)",
                                    borderColor: "var(--ew-gray-mid)"
                                  },
                                  children: faq.a
                                }
                              )
                            }
                          ) })
                        ]
                      },
                      faq.q
                    )) })
                  ]
                },
                "faqs"
              )
            ] }, activeTab),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white rounded-2xl shadow-elevated overflow-hidden",
                style: { border: "1px solid var(--ew-gray-mid)" },
                "data-ocid": "trek_detail.booking_sidebar",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-4",
                      style: { backgroundColor: "var(--ew-red)", color: "#fff" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-medium",
                            style: { color: "rgba(255,255,255,0.75)" },
                            children: "Starting from"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "text-3xl font-bold",
                              style: { color: "var(--ew-orange)" },
                              children: [
                                "₹",
                                trek.price.toLocaleString("en-IN")
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-sm mb-0.5",
                              style: { color: "rgba(255,255,255,0.75)" },
                              children: "/ person"
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
                      {
                        label: "Duration",
                        value: `${trek.duration}D`,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 })
                      },
                      {
                        label: "Difficulty",
                        value: trek.difficulty.split("-")[0],
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 14 })
                      },
                      {
                        label: "Altitude",
                        value: `${Math.round(trek.altitude / 100) * 100}m`,
                        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 14 })
                      }
                    ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-lg py-2",
                        style: { backgroundColor: "var(--ew-gray-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "flex justify-center mb-0.5",
                              style: { color: "var(--ew-red)" },
                              children: icon
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-[10px]",
                              style: { color: "var(--ew-gray-dark)" },
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-xs font-bold",
                              style: { color: "var(--ew-text)" },
                              children: value
                            }
                          )
                        ]
                      },
                      label
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "trek-date",
                          className: "text-xs font-semibold block mb-1",
                          style: { color: "var(--ew-text)" },
                          children: "Select Batch Date"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-lg px-3 py-2.5 mb-2 text-[12px]",
                          style: {
                            backgroundColor: "var(--ew-orange-lt)",
                            border: "1px solid var(--ew-orange)",
                            color: "var(--ew-orange)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-0.5", children: "📅 Flexible Batch Dates" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--ew-text-lt)" }, children: "Select your preferred date in the booking form. Our team confirms availability within 2 hours." })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "group-size-display",
                          className: "text-xs font-semibold block mb-1",
                          style: { color: "var(--ew-text)" },
                          children: "Group Size"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setGroupSize((n) => Math.max(1, n - 1)),
                            className: "w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors",
                            style: {
                              backgroundColor: "var(--ew-red)",
                              color: "#fff"
                            },
                            "aria-label": "Decrease group size",
                            "data-ocid": "trek_detail.group_size.decrement",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 16 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            id: "group-size-display",
                            className: "text-xl font-bold w-8 text-center",
                            style: { color: "var(--ew-text)" },
                            children: groupSize
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setGroupSize((n) => Math.min(12, n + 1)),
                            className: "w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors",
                            style: {
                              backgroundColor: "var(--ew-red)",
                              color: "#fff"
                            },
                            "aria-label": "Increase group size",
                            "data-ocid": "trek_detail.group_size.increment",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs",
                            style: { color: "var(--ew-gray-dark)" },
                            children: "persons (max 12)"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs font-semibold mb-2",
                          style: { color: "var(--ew-text)" },
                          children: "Add-ons"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
                        {
                          key: "gear",
                          label: "🎒 Gear Rental Pack",
                          price: 800,
                          per: "person"
                        },
                        {
                          key: "insurance",
                          label: "🛡️ Travel Insurance",
                          price: 350,
                          per: "person"
                        },
                        {
                          key: "transport",
                          label: "🚌 Base Camp Transport",
                          price: 1200,
                          per: "group"
                        },
                        {
                          key: "photographer",
                          label: "📸 Photographer",
                          price: 2500,
                          per: "group"
                        }
                      ].map(({ key, label, price, per }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition-colors",
                          style: {
                            backgroundColor: addOns[key] ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
                            border: `1px solid ${addOns[key] ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "checkbox",
                                checked: addOns[key],
                                onChange: (e) => setAddOns((prev) => ({
                                  ...prev,
                                  [key]: e.target.checked
                                })),
                                className: "w-3.5 h-3.5",
                                "data-ocid": `trek_detail.addon.${key}`
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "flex-1 text-xs font-medium",
                                style: { color: "var(--ew-text)" },
                                children: label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-[11px] font-bold",
                                style: { color: "var(--ew-orange)" },
                                children: [
                                  "+₹",
                                  price.toLocaleString("en-IN"),
                                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                    "span",
                                    {
                                      className: "font-normal text-[10px]",
                                      style: { color: "var(--ew-gray-dark)" },
                                      children: [
                                        "/",
                                        per
                                      ]
                                    }
                                  )
                                ]
                              }
                            )
                          ]
                        },
                        key
                      )) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-3 space-y-1.5 text-sm",
                        style: { backgroundColor: "var(--ew-gray-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                              "Base (₹",
                              trek.price.toLocaleString(),
                              " × ",
                              groupSize,
                              ")"
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                              "₹",
                              baseTotal.toLocaleString("en-IN")
                            ] })
                          ] }),
                          addOns.gear && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                              "Gear Rental × ",
                              groupSize
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                              "₹",
                              (800 * groupSize).toLocaleString("en-IN")
                            ] })
                          ] }),
                          addOns.insurance && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                              "Insurance × ",
                              groupSize
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                              "₹",
                              (350 * groupSize).toLocaleString("en-IN")
                            ] })
                          ] }),
                          addOns.transport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: "Base Transport (group)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text)" }, children: "₹1,200" })
                          ] }),
                          addOns.photographer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: "Photographer (group)" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text)" }, children: "₹2,500" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex justify-between font-bold pt-1.5 border-t",
                              style: { borderColor: "var(--ew-gray-mid)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text)" }, children: "Total" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "text-base",
                                    style: { color: "var(--ew-orange)" },
                                    children: [
                                      "₹",
                                      grandTotal.toLocaleString("en-IN")
                                    ]
                                  }
                                )
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/book",
                          className: "flex items-center justify-center w-full font-bold text-lg rounded-xl transition-colors",
                          style: {
                            backgroundColor: "var(--ew-red)",
                            color: "#fff",
                            height: 56
                          },
                          "data-ocid": "trek_detail.book_button",
                          onClick: () => gtmPush({
                            event: "add_to_cart",
                            item_name: trek.name,
                            item_price: trek.price
                          }),
                          children: "Book Now"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => downloadTrekItineraryPDF(trek),
                          className: "flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border-2 transition-colors",
                          style: {
                            borderColor: "var(--ew-orange)",
                            color: "var(--ew-orange)",
                            height: 44
                          },
                          "data-ocid": "trek_detail.download_pdf_button",
                          children: "📥 Download Full Itinerary PDF"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "flex items-center justify-center w-full font-semibold text-sm rounded-xl border transition-colors",
                          style: {
                            borderColor: "var(--ew-gray-mid)",
                            color: "var(--ew-gray-dark)",
                            height: 40
                          },
                          "data-ocid": "trek_detail.query_button",
                          onClick: () => setQuerySheetOpen(true),
                          children: "Send Query"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "a",
                          {
                            href: "tel:+919810012345",
                            className: "flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors",
                            style: {
                              borderColor: "var(--ew-red)",
                              color: "var(--ew-red)",
                              height: 40
                            },
                            "data-ocid": "trek_detail.call_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                              " Call Expert"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "a",
                          {
                            href: `https://wa.me/919810012345?text=${encodeURIComponent(`Hi! I want to book the ${trek.name} trek. Please share details.`)}`,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors",
                            style: {
                              borderColor: "#25D366",
                              color: "#25D366",
                              height: 40
                            },
                            "data-ocid": "trek_detail.whatsapp_button",
                            children: "💬 WhatsApp"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1 text-center", children: [
                      { icon: "🔒", text: "Secure Payment" },
                      { icon: "✅", text: "Free Cancel 30d" },
                      { icon: "⭐", text: "4.8 Rated" }
                    ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-lg py-2 px-1",
                        style: {
                          backgroundColor: "var(--ew-gray-lt)",
                          border: "1px solid var(--ew-gray-mid)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base", children: badge.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-[10px] leading-tight mt-0.5",
                              style: { color: "var(--ew-text-lt)" },
                              children: badge.text
                            }
                          )
                        ]
                      },
                      badge.text
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "text-center text-xs py-1.5 rounded-lg",
                        style: {
                          backgroundColor: "var(--ew-red-lt)",
                          color: "var(--ew-red)"
                        },
                        children: [
                          `👁️ ${viewerCount} people viewed this in the last 24 hrs`,
                          "🔥 12 bookings made this week!",
                          "⏰ Next batch filling fast — only 4 spots left"
                        ][socialProofIdx]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(EMICalculator, { price: trek.price, trekName: trek.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustSignals, { trekSlug: trek.slug, trekId: trek.id })
                  ] })
                ]
              }
            ) }) })
          ] }),
          related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "mt-14",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "You Might Also Like" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: related.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek: t, index: i }, t.id)) })
              ]
            }
          )
        ] }),
        trek && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SeoTagCloud,
          {
            name: trek.name,
            slug: trek.slug,
            state: trek.state,
            difficulty: trek.difficulty,
            duration: trek.duration,
            type: "trek",
            relatedSlugs: related.map((r) => r.slug),
            relatedNames: related.map((r) => r.name)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 shadow-elevated",
            style: {
              backgroundColor: "#fff",
              borderTop: "1px solid var(--ew-gray-mid)",
              height: 72,
              paddingBottom: "env(safe-area-inset-bottom)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", style: { color: "var(--ew-gray-dark)" }, children: "Starting from" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "font-bold text-lg leading-none",
                    style: { color: "var(--ew-orange)" },
                    children: [
                      "₹",
                      trek.price.toLocaleString("en-IN")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-primary text-sm",
                  style: { borderRadius: "0.75rem", height: 44, padding: "0 1.25rem" },
                  "data-ocid": "trek_detail.mobile_book_button",
                  onClick: () => setBookingDrawerOpen(true),
                  children: "Book Now"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/treks",
                  className: "flex items-center justify-center w-10 h-10 rounded-lg",
                  style: {
                    border: "1px solid var(--ew-gray-mid)",
                    color: "var(--ew-text)"
                  },
                  "aria-label": "Back to treks",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppCTA, { trekName: trek.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingDrawer,
          {
            isOpen: bookingDrawerOpen,
            onClose: () => setBookingDrawerOpen(false),
            trekName: trek.name,
            trekSlug: trek.slug,
            price: trek.price,
            duration: `${trek.duration} Days`,
            difficulty: trek.difficulty,
            image: trek.image
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          QueryBottomSheet,
          {
            isOpen: querySheetOpen,
            onClose: () => setQuerySheetOpen(false),
            trekName: trek.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-[200] flex items-center justify-center bg-black/90",
            onClick: () => setLightboxIndex(null),
            "data-ocid": "trek_detail.lightbox",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center",
                  style: { backgroundColor: "rgba(255,255,255,0.15)" },
                  onClick: () => setLightboxIndex(null),
                  "aria-label": "Close lightbox",
                  "data-ocid": "trek_detail.lightbox.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 22, className: "text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center",
                  style: { backgroundColor: "rgba(255,255,255,0.15)" },
                  onClick: (e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (i) => ((i ?? 0) - 1 + trek.images.length) % trek.images.length
                    );
                  },
                  "aria-label": "Previous image",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 22, className: "text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: trek.images[lightboxIndex],
                  alt: `${trek.name} — full view ${lightboxIndex + 1}`,
                  className: "max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl",
                  initial: { scale: 0.92, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  exit: { scale: 0.92, opacity: 0 },
                  onClick: (e) => e.stopPropagation()
                },
                lightboxIndex
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center",
                  style: { backgroundColor: "rgba(255,255,255,0.15)" },
                  onClick: (e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => ((i ?? 0) + 1) % trek.images.length);
                  },
                  "aria-label": "Next image",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 22, className: "text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "absolute bottom-4 text-white text-sm", children: [
                lightboxIndex + 1,
                " / ",
                trek.images.length
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  TrekDetailPage as default
};
