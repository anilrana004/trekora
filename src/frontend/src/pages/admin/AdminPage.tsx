import { useQuery } from "@tanstack/react-query";
import { useActor } from "@trekora/icp";
import {
  BarChart2,
  BookOpen,
  Calendar,
  MessageSquare,
  Mountain,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion, useSpring, useTransform } from "@/lib/motion";
import { useEffect, useRef } from "react";
import { createActor } from "../../backend";
import type { Booking } from "../../backend.d.ts";
import { Skeleton } from "../../components/ui/skeleton";
import { icpTimestampNsToMs } from "../../lib/icpTimestamp";

interface BackendStats {
  totalTreks: bigint;
  totalQueries: bigint;
  totalBookings: bigint;
  totalUsers: bigint;
}

function useStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<BackendStats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getStats();
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

function useRecentBookings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Booking[]>({
    queryKey: ["allBookings"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getAllBookings();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok
        .slice()
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, 5);
    },
    enabled: !!actor && !isFetching,
    retry: 1,
  });
}

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v: number) =>
    Math.round(v).toLocaleString("en-IN"),
  );
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      spring.set(value);
    } else spring.set(value);
  }, [value, spring]);
  return <motion.span>{display}</motion.span>;
}

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  Confirmed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  Pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  completed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  Completed: { bg: "#e8f5e9", color: "var(--ew-green)" },
  cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
};

export default function AdminPage() {
  const { data: stats, isLoading, isError } = useStats();
  const {
    data: recentBookings,
    isLoading: bookingsLoading,
    isError: bookingsError,
  } = useRecentBookings();

  const statCards = [
    {
      label: "Total Bookings",
      value: stats ? Number(stats.totalBookings) : null,
      icon: BookOpen,
      iconColor: "var(--ew-orange)",
      iconBg: "var(--ew-orange-lt)",
      borderColor: "var(--ew-orange)",
    },
    {
      label: "Active Treks",
      value: stats ? Number(stats.totalTreks) : null,
      icon: Mountain,
      iconColor: "var(--ew-green)",
      iconBg: "#e8f5e9",
      borderColor: "var(--ew-green)",
    },
    {
      label: "Pending Queries",
      value: stats ? Number(stats.totalQueries) : null,
      icon: MessageSquare,
      iconColor: "var(--ew-red)",
      iconBg: "var(--ew-red-lt)",
      borderColor: "var(--ew-red)",
    },
    {
      label: "Upcoming Batches",
      value: stats ? Number(stats.totalUsers) : null,
      icon: Calendar,
      iconColor: "var(--ew-orange)",
      iconBg: "var(--ew-orange-lt)",
      borderColor: "var(--ew-orange)",
    },
  ];

  return (
    <div className="space-y-6" data-ocid="admin.dashboard.page">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
          Trekora Admin Dashboard
        </h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--ew-gray-dark)" }}>
          Welcome back, Admin · Where Every Peak Tells a Story
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl p-5 shadow-card border-b-4"
            style={{ borderBottomColor: stat.borderColor }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                {stat.label}
              </p>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: stat.iconBg }}
              >
                <stat.icon size={18} style={{ color: stat.iconColor }} />
              </div>
            </div>
            {isLoading ? (
              <Skeleton
                className="h-8 w-24"
                data-ocid={`admin.stat.loading_state.${i + 1}`}
              />
            ) : isError ? (
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--ew-gray-mid)" }}
                data-ocid={`admin.stat.error_state.${i + 1}`}
              >
                —
              </p>
            ) : (
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--ew-text)" }}
                data-ocid={`admin.stat.value.${i + 1}`}
              >
                {stat.value !== null ? (
                  <AnimatedNumber value={stat.value} />
                ) : (
                  "—"
                )}
              </p>
            )}
            <p
              className="text-xs mt-1"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Live from backend
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue highlight banner */}
      <AnimatePresence>
        {!isLoading && !isError && stats && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4"
            style={{ background: "var(--ew-footer)" }}
          >
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Platform Overview
              </p>
              <p className="text-3xl font-bold text-white">
                <AnimatedNumber value={Number(stats.totalTreks)} />
                <span
                  className="text-lg font-normal ml-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Active Treks
                </span>
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Total published treks in Trekora catalog
              </p>
            </div>
            <TrendingUp
              size={40}
              style={{ color: "var(--ew-orange)", opacity: 0.85 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analytics nav card */}
      <motion.a
        href="/admin/analytics"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-xl p-5 shadow-card flex items-center gap-4 hover:shadow-elevated transition-shadow cursor-pointer"
        style={{ borderLeft: "4px solid var(--ew-red)" }}
        data-ocid="admin.analytics_link"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--ew-red-lt)" }}
        >
          <BarChart2 size={22} style={{ color: "var(--ew-red)" }} />
        </div>
        <div>
          <p className="font-bold" style={{ color: "var(--ew-text)" }}>
            Analytics
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Revenue, bookings & query funnel
          </p>
        </div>
      </motion.a>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "var(--ew-gray-lt)" }}
        >
          <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
            Recent Bookings
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ew-gray-lt)" }}>
              <tr>
                {["Ref", "Trekker", "Trek", "Date", "Amount", "Status"].map(
                  (h, ci) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-left font-medium ${ci === 3 ? "hidden sm:table-cell" : ""} ${ci === 4 ? "text-right" : ""} ${ci === 5 ? "text-center" : ""}`}
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: "var(--ew-gray-lt)" }}
            >
              {bookingsLoading &&
                ["sk1", "sk2", "sk3"].map((sk, i) => (
                  <tr
                    key={sk}
                    data-ocid={`admin.booking.loading_state.${i + 1}`}
                  >
                    {["c1", "c2", "c3", "c4", "c5", "c6"].map((c) => (
                      <td key={c} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              {bookingsError && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-sm"
                    style={{ color: "var(--ew-gray-dark)" }}
                    data-ocid="admin.booking.error_state"
                  >
                    Failed to load bookings.
                  </td>
                </tr>
              )}
              {!bookingsLoading &&
                !bookingsError &&
                (!recentBookings || recentBookings.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm"
                      style={{ color: "var(--ew-gray-dark)" }}
                      data-ocid="admin.booking.empty_state"
                    >
                      No bookings yet.
                    </td>
                  </tr>
                )}
              {!bookingsLoading &&
                recentBookings?.map((b, i) => {
                  const sc = STATUS_COLORS[b.status] ?? {
                    bg: "var(--ew-gray-lt)",
                    color: "var(--ew-gray-dark)",
                  };
                  return (
                    <tr
                      key={String(b.id)}
                      className="transition-colors"
                      style={{ background: "transparent" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "var(--ew-gray-lt)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                      data-ocid={`admin.booking.row.${i + 1}`}
                    >
                      <td
                        className="px-4 py-3 font-mono text-xs"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {b.bookingRef}
                      </td>
                      <td
                        className="px-4 py-3 font-medium"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {b.travelerName}
                      </td>
                      <td
                        className="px-4 py-3"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {b.itemName}
                      </td>
                      <td
                        className="px-4 py-3 hidden sm:table-cell"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {new Date(
                          icpTimestampNsToMs(b.createdAt),
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td
                        className="px-4 py-3 text-right font-semibold"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        ₹{Number(b.totalAmount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: sc.bg, color: sc.color }}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
