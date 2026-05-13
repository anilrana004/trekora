import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { g as useConstant, M as MotionConfigContext, h as useIsomorphicLayoutEffect, m as motion, A as AnimatePresence } from "./index-C6rgoof8.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-JpGNVgMw.js";
import { S as Skeleton } from "./skeleton-C7PMHdk_.js";
import { B as BookOpen, M as Mountain, b as MessageSquare, ab as Calendar, au as TrendingUp, av as ChartNoAxesColumn } from "./icons-DrFRvHmE.js";
import { _ as motionValue, z as cancelFrame, x as frame, $ as collectMotionValues, a0 as transform, a1 as attachFollow, a as isMotionValue } from "./motion-CnUkbXTC.js";
import "./charts-VM0_pAiv.js";
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useFollowValue(source, options = {}) {
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  const getFromSource = () => isMotionValue(source) ? source.get() : source;
  if (isStatic) {
    return useTransform(getFromSource);
  }
  const value = useMotionValue(getFromSource());
  reactExports.useInsertionEffect(() => {
    return attachFollow(value, source, options);
  }, [value, JSON.stringify(options)]);
  return value;
}
function useSpring(source, options = {}) {
  return useFollowValue(source, { type: "spring", ...options });
}
function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
    retry: 1
  });
}
function useRecentBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getAllBookings();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok.slice().sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).slice(0, 5);
    },
    enabled: !!actor && !isFetching,
    retry: 1
  });
}
function AnimatedNumber({ value }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(
    spring,
    (v) => Math.round(v).toLocaleString("en-IN")
  );
  const ref = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      spring.set(value);
    } else spring.set(value);
  }, [value, spring]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { children: display });
}
const STATUS_COLORS = {
  confirmed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  Confirmed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  Pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  completed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  Completed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" }
};
function AdminPage() {
  const { data: stats, isLoading, isError } = useStats();
  const {
    data: recentBookings,
    isLoading: bookingsLoading,
    isError: bookingsError
  } = useRecentBookings();
  const statCards = [
    {
      label: "Total Bookings",
      value: stats ? Number(stats.totalBookings) : null,
      icon: BookOpen,
      iconColor: "var(--ew-orange)",
      iconBg: "var(--ew-orange-lt)",
      borderColor: "var(--ew-orange)"
    },
    {
      label: "Active Treks",
      value: stats ? Number(stats.totalTreks) : null,
      icon: Mountain,
      iconColor: "var(--ew-green)",
      iconBg: "#e8f5e9",
      borderColor: "var(--ew-green)"
    },
    {
      label: "Pending Queries",
      value: stats ? Number(stats.totalQueries) : null,
      icon: MessageSquare,
      iconColor: "var(--ew-red)",
      iconBg: "var(--ew-red-lt)",
      borderColor: "var(--ew-red)"
    },
    {
      label: "Upcoming Batches",
      value: stats ? Number(stats.totalUsers) : null,
      icon: Calendar,
      iconColor: "var(--ew-orange)",
      iconBg: "var(--ew-orange-lt)",
      borderColor: "var(--ew-orange)"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold", style: { color: "var(--ew-text)" }, children: "Trekora Admin Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: "var(--ew-gray-dark)" }, children: "Welcome back, Admin · Where Every Peak Tells a Story" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.08 },
        className: "bg-white rounded-xl p-5 shadow-card border-b-4",
        style: { borderBottomColor: stat.borderColor },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-10 h-10 rounded-xl flex items-center justify-center",
                style: { background: stat.iconBg },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { size: 18, style: { color: stat.iconColor } })
              }
            )
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: "h-8 w-24",
              "data-ocid": `admin.stat.loading_state.${i + 1}`
            }
          ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-2xl font-bold",
              style: { color: "var(--ew-gray-mid)" },
              "data-ocid": `admin.stat.error_state.${i + 1}`,
              children: "—"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-2xl font-bold",
              style: { color: "var(--ew-text)" },
              "data-ocid": `admin.stat.value.${i + 1}`,
              children: stat.value !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { value: stat.value }) : "—"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs mt-1",
              style: { color: "var(--ew-gray-dark)" },
              children: "Live from backend"
            }
          )
        ]
      },
      stat.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !isLoading && !isError && stats && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4",
        style: { background: "var(--ew-footer)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs uppercase tracking-widest mb-1",
                style: { color: "rgba(255,255,255,0.45)" },
                children: "Platform Overview"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-white", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedNumber, { value: Number(stats.totalTreks) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-lg font-normal ml-2",
                  style: { color: "rgba(255,255,255,0.6)" },
                  children: "Active Treks"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1",
                style: { color: "rgba(255,255,255,0.4)" },
                children: "Total published treks in Trekora catalog"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendingUp,
            {
              size: 40,
              style: { color: "var(--ew-orange)", opacity: 0.85 }
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.a,
      {
        href: "/admin/analytics",
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.35 },
        className: "bg-white rounded-xl p-5 shadow-card flex items-center gap-4 hover:shadow-elevated transition-shadow cursor-pointer",
        style: { borderLeft: "4px solid var(--ew-red)" },
        "data-ocid": "admin.analytics_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-xl flex items-center justify-center",
              style: { background: "var(--ew-red-lt)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 22, style: { color: "var(--ew-red)" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", style: { color: "var(--ew-text)" }, children: "Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-0.5",
                style: { color: "var(--ew-gray-dark)" },
                children: "Revenue, bookings & query funnel"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-5 py-4 border-b",
          style: { borderColor: "var(--ew-gray-lt)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", style: { color: "var(--ew-text)" }, children: "Recent Bookings" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Ref", "Trekker", "Trek", "Date", "Amount", "Status"].map(
          (h, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `px-4 py-3 text-left font-medium ${ci === 3 ? "hidden sm:table-cell" : ""} ${ci === 4 ? "text-right" : ""} ${ci === 5 ? "text-center" : ""}`,
              style: { color: "var(--ew-gray-dark)" },
              children: h
            },
            h
          )
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tbody",
          {
            className: "divide-y",
            style: { borderColor: "var(--ew-gray-lt)" },
            children: [
              bookingsLoading && ["sk1", "sk2", "sk3"].map((sk, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "tr",
                {
                  "data-ocid": `admin.booking.loading_state.${i + 1}`,
                  children: ["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, c))
                },
                sk
              )),
              bookingsError && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 6,
                  className: "px-4 py-6 text-center text-sm",
                  style: { color: "var(--ew-gray-dark)" },
                  "data-ocid": "admin.booking.error_state",
                  children: "Failed to load bookings."
                }
              ) }),
              !bookingsLoading && !bookingsError && (!recentBookings || recentBookings.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  colSpan: 6,
                  className: "px-4 py-6 text-center text-sm",
                  style: { color: "var(--ew-gray-dark)" },
                  "data-ocid": "admin.booking.empty_state",
                  children: "No bookings yet."
                }
              ) }),
              !bookingsLoading && (recentBookings == null ? void 0 : recentBookings.map((b, i) => {
                const sc = STATUS_COLORS[b.status] ?? {
                  bg: "var(--ew-gray-lt)",
                  color: "var(--ew-gray-dark)"
                };
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "transition-colors",
                    style: { background: "transparent" },
                    onMouseEnter: (e) => {
                      e.currentTarget.style.background = "var(--ew-gray-lt)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.background = "transparent";
                    },
                    "data-ocid": `admin.booking.row.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-3 font-mono text-xs",
                          style: { color: "var(--ew-gray-dark)" },
                          children: b.bookingRef
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-3 font-medium",
                          style: { color: "var(--ew-text)" },
                          children: b.travelerName
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-3",
                          style: { color: "var(--ew-text-lt)" },
                          children: b.itemName
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "px-4 py-3 hidden sm:table-cell",
                          style: { color: "var(--ew-gray-dark)" },
                          children: new Date(
                            Number(b.createdAt) / 1e6
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "td",
                        {
                          className: "px-4 py-3 text-right font-semibold",
                          style: { color: "var(--ew-orange)" },
                          children: [
                            "₹",
                            Number(b.totalAmount).toLocaleString("en-IN")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                          style: { background: sc.bg, color: sc.color },
                          children: b.status
                        }
                      ) })
                    ]
                  },
                  String(b.id)
                );
              }))
            ]
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  AdminPage as default
};
