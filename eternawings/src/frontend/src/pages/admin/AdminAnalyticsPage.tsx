import { useActor } from "@trekora/icp";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../../backend";
import type { Booking, LeadQuery } from "../../backend.d.ts";
import { Skeleton } from "../../components/ui/skeleton";

function useBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["analytics_bookings"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllBookings();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
  });
}

function useQueries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LeadQuery[]>({
    queryKey: ["analytics_queries"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllQueries();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: !!actor && !isFetching,
  });
}

function getMonthKey(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string): string {
  const [year, month] = key.split("-");
  const d = new Date(Number(year), Number(month) - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

function getLastSixMonthKeys(): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    keys.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return keys;
}

function CssBar({
  value,
  max,
  color,
  label,
  suffix = "",
}: {
  value: number;
  max: number;
  color: string;
  label: string;
  suffix?: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs w-24 truncate text-right"
        style={{ color: "var(--ew-text-lt)" }}
        title={label}
      >
        {label}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ background: "var(--ew-gray-mid)", height: 8 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ background: color, height: "100%", borderRadius: 9999 }}
        />
      </div>
      <span
        className="text-xs font-bold w-14 text-right"
        style={{ color: "var(--ew-text)" }}
      >
        {suffix ? suffix : value.toLocaleString("en-IN")}
      </span>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const queryClient = useQueryClient();
  const { data: bookings, isLoading: bLoading } = useBookings();
  const { data: queries, isLoading: qLoading } = useQueries();

  // Page view analytics from localStorage
  const pageViews: Record<string, number> = (() => {
    try {
      const raw = localStorage.getItem("ew_analytics_views");
      return raw ? (JSON.parse(raw) as Record<string, number>) : {};
    } catch {
      return {};
    }
  })();
  const topPages = Object.entries(pageViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const maxPageViews = topPages[0]?.[1] ?? 1;

  // Revenue trend
  const monthKeys = getLastSixMonthKeys();
  const revenueByMonth: Record<string, number> = {};
  for (const k of monthKeys) revenueByMonth[k] = 0;
  for (const b of bookings ?? []) {
    const k = getMonthKey(b.createdAt);
    if (k in revenueByMonth) revenueByMonth[k] += Number(b.totalAmount);
  }
  const maxRevenue = Math.max(...Object.values(revenueByMonth), 1);

  // Booking status distribution
  const statusCounts: Record<string, number> = {};
  for (const b of bookings ?? []) {
    const s = b.status.toLowerCase();
    statusCounts[s] = (statusCounts[s] ?? 0) + 1;
  }
  const totalBookings = bookings?.length ?? 0;

  // Query conversion
  const totalQueries = queries?.length ?? 0;
  const contactedCount =
    queries?.filter((q) => q.status === "contacted" || q.status === "converted")
      .length ?? 0;
  const convertedCount =
    queries?.filter((q) => q.status === "converted").length ?? 0;
  const conversionRate =
    totalQueries > 0 ? Math.round((convertedCount / totalQueries) * 100) : 0;

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["analytics_bookings"] });
    queryClient.invalidateQueries({ queryKey: ["analytics_queries"] });
  }

  const isLoading = bLoading || qLoading;

  return (
    <div className="space-y-6" data-ocid="admin.analytics.page">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Analytics Dashboard
          </h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Live data from your EternaWings backend
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="btn-primary flex items-center gap-2 text-sm"
          data-ocid="admin.analytics.refresh_button"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Top summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Bookings",
            value: totalBookings,
            color: "var(--ew-orange)",
            bg: "var(--ew-orange-lt)",
          },
          {
            label: "Total Queries",
            value: totalQueries,
            color: "var(--ew-red)",
            bg: "var(--ew-red-lt)",
          },
          {
            label: "Contacted",
            value: contactedCount,
            color: "var(--ew-green)",
            bg: "#e8f5e9",
          },
          {
            label: "Conversion Rate",
            value: conversionRate,
            color: "var(--ew-orange)",
            bg: "var(--ew-orange-lt)",
            suffix: "%",
          },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl p-4 shadow-card"
            style={{ borderBottom: `4px solid ${s.color}` }}
            data-ocid={`admin.analytics.stat.${i + 1}`}
          >
            <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
              {s.label}
            </p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-1" />
            ) : (
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>
                {s.value.toLocaleString("en-IN")}
                {s.suffix ?? ""}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-bold mb-4" style={{ color: "var(--ew-text)" }}>
          📈 Revenue Trend (Last 6 Months)
        </h3>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {monthKeys.map((k) => (
              <CssBar
                key={k}
                label={monthLabel(k)}
                value={revenueByMonth[k]}
                max={maxRevenue}
                color="var(--ew-orange)"
                suffix={`₹${(revenueByMonth[k] / 1000).toFixed(0)}K`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Status Distribution */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-bold mb-4" style={{ color: "var(--ew-text)" }}>
          📊 Booking Status Distribution
        </h3>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : totalBookings === 0 ? (
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            No bookings yet.
          </p>
        ) : (
          <div className="space-y-3">
            {(
              [
                ["confirmed", "var(--ew-green)", "Confirmed"],
                ["pending", "var(--ew-orange)", "Pending"],
                ["cancelled", "var(--ew-red)", "Cancelled"],
                ["completed", "#2563eb", "Completed"],
              ] as const
            ).map(([key, color, labelText]) => {
              const count = statusCounts[key] ?? 0;
              return (
                <CssBar
                  key={key}
                  label={labelText}
                  value={count}
                  max={totalBookings}
                  color={color}
                  suffix={`${count} (${Math.round((count / totalBookings) * 100)}%)`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Top Trekked Pages */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-bold mb-4" style={{ color: "var(--ew-text)" }}>
          👀 Top Trek Pages by Views
        </h3>
        {topPages.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            No page view data recorded yet. Views are tracked as trekkers browse
            the site.
          </p>
        ) : (
          <div className="space-y-3">
            {topPages.map(([slug, count]) => (
              <CssBar
                key={slug}
                label={slug}
                value={count}
                max={maxPageViews}
                color="var(--ew-red)"
              />
            ))}
          </div>
        )}
      </div>

      {/* Query Conversion Panel */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-bold mb-4" style={{ color: "var(--ew-text)" }}>
          🎯 Query Conversion Funnel
        </h3>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Total Queries",
                value: totalQueries,
                color: "var(--ew-text)",
              },
              {
                label: "Contacted",
                value: contactedCount,
                color: "var(--ew-orange)",
              },
              {
                label: "Converted",
                value: convertedCount,
                color: "var(--ew-green)",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center"
                style={{ background: "var(--ew-gray-lt)" }}
              >
                <p className="text-2xl font-bold" style={{ color }}>
                  {value}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        )}
        {!isLoading && totalQueries > 0 && (
          <div
            className="mt-4 rounded-xl px-4 py-3 flex items-center justify-between"
            style={{ background: "var(--ew-footer)", color: "#fff" }}
          >
            <span className="text-sm">Overall Conversion Rate</span>
            <span
              className="text-xl font-bold"
              style={{ color: "var(--ew-orange)" }}
            >
              {conversionRate}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
