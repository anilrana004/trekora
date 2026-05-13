import { useState } from "react";

const BOOKINGS = [
  {
    id: "EW250401",
    user: "Rahul Sharma",
    trek: "Roopkund Trek",
    date: "May 15–22",
    people: 2,
    amount: 24000,
    status: "Confirmed",
  },
  {
    id: "EW250402",
    user: "Priya Negi",
    trek: "Kedarkantha",
    date: "Dec 20–25",
    people: 1,
    amount: 8500,
    status: "Pending",
  },
  {
    id: "EW250403",
    user: "Vikram Singh",
    trek: "Hampta Pass",
    date: "Jun 12–16",
    people: 4,
    amount: 38000,
    status: "Confirmed",
  },
  {
    id: "EW250404",
    user: "Anita Rawat",
    trek: "Triund",
    date: "Apr 20–21",
    people: 3,
    amount: 10500,
    status: "Completed",
  },
  {
    id: "EW250405",
    user: "Sunita Mehta",
    trek: "Valley of Flowers",
    date: "Jul 5–10",
    people: 2,
    amount: 17000,
    status: "Cancelled",
  },
];

const STATUSES = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Confirmed: { bg: "rgba(46,125,50,0.1)", color: "var(--ew-green)" },
  Pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  Completed: { bg: "rgba(46,125,50,0.1)", color: "var(--ew-green)" },
  Cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
};

export default function AdminBookingsPage() {
  const [activeStatus, setActiveStatus] = useState("All");

  const filtered =
    activeStatus === "All"
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.status === activeStatus);
  const revenue = filtered.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6" data-ocid="admin.bookings.page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Booking Manager
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {filtered.length} bookings · Revenue: ₹
            {revenue.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          style={{ borderRadius: "8px" }}
          data-ocid="admin.bookings.export_button"
        >
          Export CSV
        </button>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Confirmed",
            count: BOOKINGS.filter((b) => b.status === "Confirmed").length,
            color: "var(--ew-green)",
          },
          {
            label: "Pending",
            count: BOOKINGS.filter((b) => b.status === "Pending").length,
            color: "var(--ew-orange)",
          },
          {
            label: "Completed",
            count: BOOKINGS.filter((b) => b.status === "Completed").length,
            color: "var(--ew-green)",
          },
          {
            label: "Cancelled",
            count: BOOKINGS.filter((b) => b.status === "Cancelled").length,
            color: "var(--ew-red)",
          },
        ].map(({ label, count, color }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-4 shadow-card"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              {count}
            </p>
            <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Status filter tabs */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div
          className="flex overflow-x-auto"
          style={{ borderBottom: "1px solid var(--ew-gray-lt)" }}
        >
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveStatus(s)}
              className="px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
              style={{
                color:
                  activeStatus === s ? "var(--ew-red)" : "var(--ew-gray-dark)",
                borderBottom:
                  activeStatus === s
                    ? "2px solid var(--ew-red)"
                    : "2px solid transparent",
                background: "transparent",
              }}
              data-ocid={`admin.bookings.filter.${s.toLowerCase()}.tab`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: "var(--ew-gray-lt)" }}>
              <tr>
                {[
                  "Booking ID",
                  "Trekker",
                  "Trek",
                  "Dates",
                  "People",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-4 py-3 text-left font-medium ${h === "Amount" || h === "People" ? "text-right" : ""} ${h === "Status" || h === "Actions" ? "text-center" : ""}`}
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm"
                    style={{ color: "var(--ew-gray-dark)" }}
                    data-ocid="admin.bookings.empty_state"
                  >
                    No bookings found for this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((b, i) => (
                  <tr
                    key={b.id}
                    className="transition-colors hover:bg-[#FFF5EE]"
                    style={{ borderBottom: "1px solid var(--ew-gray-lt)" }}
                    data-ocid={`admin.booking.row.${i + 1}`}
                  >
                    <td
                      className="px-4 py-3 font-mono text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {b.id}
                    </td>
                    <td
                      className="px-4 py-3 font-medium"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {b.user}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.trek}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.date}
                    </td>
                    <td
                      className="px-4 py-3 text-right"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.people}
                    </td>
                    <td
                      className="px-4 py-3 text-right font-semibold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      ₹{b.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={
                          STATUS_STYLE[b.status] ?? {
                            bg: "var(--ew-gray-lt)",
                            color: "var(--ew-gray-dark)",
                          }
                        }
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        type="button"
                        className="text-xs font-semibold mr-2 transition-colors"
                        style={{ color: "var(--ew-orange)" }}
                        data-ocid={`admin.booking.view_button.${i + 1}`}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="text-xs font-medium transition-colors"
                        style={{ color: "var(--ew-gray-dark)" }}
                        data-ocid={`admin.booking.download_button.${i + 1}`}
                      >
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
