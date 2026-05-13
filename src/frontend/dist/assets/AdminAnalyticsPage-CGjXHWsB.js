import { j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { a as useQueryClient, m as motion } from "./index-C6rgoof8.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-JpGNVgMw.js";
import { S as Skeleton } from "./skeleton-C7PMHdk_.js";
import { R as RefreshCw } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
import "./charts-VM0_pAiv.js";
function useBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["analytics_bookings"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllBookings();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching
  });
}
function useQueries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["analytics_queries"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllQueries();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching
  });
}
function getMonthKey(ts) {
  const d = new Date(Number(ts) / 1e6);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function monthLabel(key) {
  const [year, month] = key.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}
function getLastSixMonthKeys() {
  const keys = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    );
  }
  return keys;
}
function CssBar({
  value,
  max,
  color,
  label,
  suffix = ""
}) {
  const pct = max > 0 ? Math.round(value / max * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-xs w-24 truncate text-right",
        style: { color: "var(--ew-text-lt)" },
        title: label,
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 rounded-full overflow-hidden",
        style: { background: "var(--ew-gray-mid)", height: 8 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { width: 0 },
            animate: { width: `${pct}%` },
            transition: { duration: 0.6, ease: "easeOut" },
            style: { background: color, height: "100%", borderRadius: 9999 }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-xs font-bold w-14 text-right",
        style: { color: "var(--ew-text)" },
        children: suffix ? suffix : value.toLocaleString("en-IN")
      }
    )
  ] });
}
function AdminAnalyticsPage() {
  var _a;
  const queryClient = useQueryClient();
  const { data: bookings, isLoading: bLoading } = useBookings();
  const { data: queries, isLoading: qLoading } = useQueries();
  const pageViews = (() => {
    try {
      const raw = localStorage.getItem("ew_analytics_views");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  })();
  const topPages = Object.entries(pageViews).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const maxPageViews = ((_a = topPages[0]) == null ? void 0 : _a[1]) ?? 1;
  const monthKeys = getLastSixMonthKeys();
  const revenueByMonth = {};
  for (const k of monthKeys) revenueByMonth[k] = 0;
  for (const b of bookings ?? []) {
    const k = getMonthKey(b.createdAt);
    if (k in revenueByMonth) revenueByMonth[k] += Number(b.totalAmount);
  }
  const maxRevenue = Math.max(...Object.values(revenueByMonth), 1);
  const statusCounts = {};
  for (const b of bookings ?? []) {
    const s = b.status.toLowerCase();
    statusCounts[s] = (statusCounts[s] ?? 0) + 1;
  }
  const totalBookings = (bookings == null ? void 0 : bookings.length) ?? 0;
  const totalQueries = (queries == null ? void 0 : queries.length) ?? 0;
  const contactedCount = (queries == null ? void 0 : queries.filter((q) => q.status === "contacted" || q.status === "converted").length) ?? 0;
  const convertedCount = (queries == null ? void 0 : queries.filter((q) => q.status === "converted").length) ?? 0;
  const conversionRate = totalQueries > 0 ? Math.round(convertedCount / totalQueries * 100) : 0;
  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["analytics_bookings"] });
    queryClient.invalidateQueries({ queryKey: ["analytics_queries"] });
  }
  const isLoading = bLoading || qLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.analytics.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold",
            style: { color: "var(--ew-text)" },
            children: "Analytics Dashboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm mt-0.5",
            style: { color: "var(--ew-gray-dark)" },
            children: "Live data from your EternaWings backend"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleRefresh,
          className: "btn-primary flex items-center gap-2 text-sm",
          "data-ocid": "admin.analytics.refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      {
        label: "Total Bookings",
        value: totalBookings,
        color: "var(--ew-orange)",
        bg: "var(--ew-orange-lt)"
      },
      {
        label: "Total Queries",
        value: totalQueries,
        color: "var(--ew-red)",
        bg: "var(--ew-red-lt)"
      },
      {
        label: "Contacted",
        value: contactedCount,
        color: "var(--ew-green)",
        bg: "#e8f5e9"
      },
      {
        label: "Conversion Rate",
        value: conversionRate,
        color: "var(--ew-orange)",
        bg: "var(--ew-orange-lt)",
        suffix: "%"
      }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07 },
        className: "bg-white rounded-xl p-4 shadow-card",
        style: { borderBottom: `4px solid ${s.color}` },
        "data-ocid": `admin.analytics.stat.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: s.label }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold mt-1", style: { color: s.color }, children: [
            s.value.toLocaleString("en-IN"),
            s.suffix ?? ""
          ] })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4", style: { color: "var(--ew-text)" }, children: "📈 Revenue Trend (Last 6 Months)" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: monthKeys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CssBar,
        {
          label: monthLabel(k),
          value: revenueByMonth[k],
          max: maxRevenue,
          color: "var(--ew-orange)",
          suffix: `₹${(revenueByMonth[k] / 1e3).toFixed(0)}K`
        },
        k
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4", style: { color: "var(--ew-text)" }, children: "📊 Booking Status Distribution" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, i)) }) : totalBookings === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "No bookings yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
        ["confirmed", "var(--ew-green)", "Confirmed"],
        ["pending", "var(--ew-orange)", "Pending"],
        ["cancelled", "var(--ew-red)", "Cancelled"],
        ["completed", "#2563eb", "Completed"]
      ].map(([key, color, labelText]) => {
        const count = statusCounts[key] ?? 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CssBar,
          {
            label: labelText,
            value: count,
            max: totalBookings,
            color,
            suffix: `${count} (${Math.round(count / totalBookings * 100)}%)`
          },
          key
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4", style: { color: "var(--ew-text)" }, children: "👀 Top Trek Pages by Views" }),
      topPages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "No page view data recorded yet. Views are tracked as trekkers browse the site." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: topPages.map(([slug, count]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CssBar,
        {
          label: slug,
          value: count,
          max: maxPageViews,
          color: "var(--ew-red)"
        },
        slug
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4", style: { color: "var(--ew-text)" }, children: "🎯 Query Conversion Funnel" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
        {
          label: "Total Queries",
          value: totalQueries,
          color: "var(--ew-text)"
        },
        {
          label: "Contacted",
          value: contactedCount,
          color: "var(--ew-orange)"
        },
        {
          label: "Converted",
          value: convertedCount,
          color: "var(--ew-green)"
        }
      ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-4 text-center",
          style: { background: "var(--ew-gray-lt)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", style: { color }, children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1",
                style: { color: "var(--ew-gray-dark)" },
                children: label
              }
            )
          ]
        },
        label
      )) }),
      !isLoading && totalQueries > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-4 rounded-xl px-4 py-3 flex items-center justify-between",
          style: { background: "var(--ew-footer)", color: "#fff" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Overall Conversion Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xl font-bold",
                style: { color: "var(--ew-orange)" },
                children: [
                  conversionRate,
                  "%"
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminAnalyticsPage as default
};
