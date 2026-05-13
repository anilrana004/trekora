import { useState } from "react";

type QueryStatus = "New" | "Contacted" | "Closed";

const INITIAL_QUERIES = [
  {
    id: "Q001",
    name: "Arjun Gupta",
    email: "arjun@gmail.com",
    phone: "9876543210",
    trek: "Roopkund Trek",
    date: "Apr 28, 2025",
    status: "New" as QueryStatus,
    message:
      "I'm interested in the Roopkund trek for a group of 4. Can you share the detailed itinerary?",
  },
  {
    id: "Q002",
    name: "Meena Kapoor",
    email: "meena@hotmail.com",
    phone: "9812345678",
    trek: "Char Dham Yatra",
    date: "Apr 27, 2025",
    status: "Contacted" as QueryStatus,
    message: "Looking for Char Dham packages for June 2025 for family of 6.",
  },
  {
    id: "Q003",
    name: "Sanjay Verma",
    email: "sanjay.v@corp.com",
    phone: "9988776655",
    trek: "Corporate Trek",
    date: "Apr 26, 2025",
    status: "New" as QueryStatus,
    message: "Want to organize a corporate trek for 50 employees in July.",
  },
  {
    id: "Q004",
    name: "Ritu Sharma",
    email: "ritu@yahoo.com",
    phone: "9654321098",
    trek: "Hampta Pass",
    date: "Apr 25, 2025",
    status: "Closed" as QueryStatus,
    message: "What is the fitness requirement for Hampta Pass?",
  },
];

const STATUS_CONFIG: Record<
  QueryStatus,
  { bg: string; color: string; label: string }
> = {
  New: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)", label: "New" },
  Contacted: { bg: "#e8f5e9", color: "var(--ew-green)", label: "Contacted" },
  Closed: {
    bg: "var(--ew-gray-lt)",
    color: "var(--ew-gray-dark)",
    label: "Closed",
  },
};

export default function AdminQueriesPage() {
  const [queries, setQueries] = useState(INITIAL_QUERIES);

  function markContacted(id: string) {
    setQueries((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "Contacted" as QueryStatus } : q,
      ),
    );
  }

  const newCount = queries.filter((q) => q.status === "New").length;

  return (
    <div className="space-y-6" data-ocid="admin.queries.page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Query Manager
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {newCount > 0 ? (
              <span style={{ color: "var(--ew-red)", fontWeight: 600 }}>
                {newCount} new
              </span>
            ) : (
              "All caught up"
            )}{" "}
            · {queries.length} total queries
          </p>
        </div>
      </div>

      {/* Query cards */}
      <div className="space-y-4">
        {queries.map((q, i) => {
          const sc = STATUS_CONFIG[q.status];
          return (
            <div
              key={q.id}
              className="bg-white rounded-xl p-5 shadow-card border-l-4"
              style={{
                borderLeftColor:
                  q.status === "New"
                    ? "var(--ew-orange)"
                    : q.status === "Contacted"
                      ? "var(--ew-green)"
                      : "var(--ew-gray-mid)",
              }}
              data-ocid={`admin.query.row.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p
                      className="font-bold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {q.name}
                    </p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: sc.bg, color: sc.color }}
                    >
                      {sc.label}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "var(--ew-red-lt)",
                        color: "var(--ew-red)",
                      }}
                    >
                      {q.trek}
                    </span>
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {q.message}
                  </p>
                  <div
                    className="flex items-center gap-4 text-xs"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    <span>{q.email}</span>
                    <span>{q.phone}</span>
                    <span>{q.date}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0 flex-wrap">
                  {q.status === "New" && (
                    <button
                      type="button"
                      onClick={() => markContacted(q.id)}
                      className="text-xs px-3 py-1.5 rounded-full border-2 font-semibold transition-colors"
                      style={{
                        borderColor: "var(--ew-green)",
                        color: "var(--ew-green)",
                      }}
                      data-ocid={`admin.query.mark_contacted.${i + 1}.button`}
                    >
                      ✓ Mark Contacted
                    </button>
                  )}
                  <a
                    href={`tel:${q.phone}`}
                    className="text-xs text-white px-3 py-1.5 rounded-full font-semibold"
                    style={{ background: "var(--ew-orange)" }}
                    data-ocid={`admin.query.call_button.${i + 1}`}
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${q.email}`}
                    className="text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors"
                    style={{
                      borderColor: "var(--ew-gray-mid)",
                      color: "var(--ew-text-lt)",
                    }}
                    data-ocid={`admin.query.email_button.${i + 1}`}
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
