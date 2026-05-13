import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
const BOOKINGS = [
  {
    id: "EW250401",
    user: "Rahul Sharma",
    trek: "Roopkund Trek",
    date: "May 15–22",
    people: 2,
    amount: 24e3,
    status: "Confirmed"
  },
  {
    id: "EW250402",
    user: "Priya Negi",
    trek: "Kedarkantha",
    date: "Dec 20–25",
    people: 1,
    amount: 8500,
    status: "Pending"
  },
  {
    id: "EW250403",
    user: "Vikram Singh",
    trek: "Hampta Pass",
    date: "Jun 12–16",
    people: 4,
    amount: 38e3,
    status: "Confirmed"
  },
  {
    id: "EW250404",
    user: "Anita Rawat",
    trek: "Triund",
    date: "Apr 20–21",
    people: 3,
    amount: 10500,
    status: "Completed"
  },
  {
    id: "EW250405",
    user: "Sunita Mehta",
    trek: "Valley of Flowers",
    date: "Jul 5–10",
    people: 2,
    amount: 17e3,
    status: "Cancelled"
  }
];
const STATUSES = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];
const STATUS_STYLE = {
  Confirmed: { bg: "rgba(46,125,50,0.1)", color: "var(--ew-green)" },
  Pending: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  Completed: { bg: "rgba(46,125,50,0.1)", color: "var(--ew-green)" },
  Cancelled: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" }
};
function AdminBookingsPage() {
  const [activeStatus, setActiveStatus] = reactExports.useState("All");
  const filtered = activeStatus === "All" ? BOOKINGS : BOOKINGS.filter((b) => b.status === activeStatus);
  const revenue = filtered.reduce((sum, b) => sum + b.amount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.bookings.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold",
            style: { color: "var(--ew-text)" },
            children: "Booking Manager"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
          filtered.length,
          " bookings · Revenue: ₹",
          revenue.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn-secondary",
          style: { borderRadius: "8px" },
          "data-ocid": "admin.bookings.export_button",
          children: "Export CSV"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      {
        label: "Confirmed",
        count: BOOKINGS.filter((b) => b.status === "Confirmed").length,
        color: "var(--ew-green)"
      },
      {
        label: "Pending",
        count: BOOKINGS.filter((b) => b.status === "Pending").length,
        color: "var(--ew-orange)"
      },
      {
        label: "Completed",
        count: BOOKINGS.filter((b) => b.status === "Completed").length,
        color: "var(--ew-green)"
      },
      {
        label: "Cancelled",
        count: BOOKINGS.filter((b) => b.status === "Cancelled").length,
        color: "var(--ew-red)"
      }
    ].map(({ label, count, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-white rounded-xl p-4 shadow-card",
        style: { borderLeft: `3px solid ${color}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-2xl font-bold",
              style: { color: "var(--ew-text)" },
              children: count
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex overflow-x-auto",
          style: { borderBottom: "1px solid var(--ew-gray-lt)" },
          children: STATUSES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveStatus(s),
              className: "px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors",
              style: {
                color: activeStatus === s ? "var(--ew-red)" : "var(--ew-gray-dark)",
                borderBottom: activeStatus === s ? "2px solid var(--ew-red)" : "2px solid transparent",
                background: "transparent"
              },
              "data-ocid": `admin.bookings.filter.${s.toLowerCase()}.tab`,
              children: s
            },
            s
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
          "Booking ID",
          "Trekker",
          "Trek",
          "Dates",
          "People",
          "Amount",
          "Status",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: `px-4 py-3 text-left font-medium ${h === "Amount" || h === "People" ? "text-right" : ""} ${h === "Status" || h === "Actions" ? "text-center" : ""}`,
            style: { color: "var(--ew-text-lt)" },
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 8,
            className: "px-4 py-10 text-center text-sm",
            style: { color: "var(--ew-gray-dark)" },
            "data-ocid": "admin.bookings.empty_state",
            children: "No bookings found for this filter."
          }
        ) }) : filtered.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "transition-colors hover:bg-[#FFF5EE]",
            style: { borderBottom: "1px solid var(--ew-gray-lt)" },
            "data-ocid": `admin.booking.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "px-4 py-3 font-mono text-xs",
                  style: { color: "var(--ew-gray-dark)" },
                  children: b.id
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "px-4 py-3 font-medium",
                  style: { color: "var(--ew-text)" },
                  children: b.user
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "px-4 py-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: b.trek
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "px-4 py-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: b.date
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "px-4 py-3 text-right",
                  style: { color: "var(--ew-text-lt)" },
                  children: b.people
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: "px-4 py-3 text-right font-semibold",
                  style: { color: "var(--ew-orange)" },
                  children: [
                    "₹",
                    b.amount.toLocaleString("en-IN")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs px-2 py-0.5 rounded-full font-medium",
                  style: STATUS_STYLE[b.status] ?? {
                    bg: "var(--ew-gray-lt)",
                    color: "var(--ew-gray-dark)"
                  },
                  children: b.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs font-semibold mr-2 transition-colors",
                    style: { color: "var(--ew-orange)" },
                    "data-ocid": `admin.booking.view_button.${i + 1}`,
                    children: "View"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs font-medium transition-colors",
                    style: { color: "var(--ew-gray-dark)" },
                    "data-ocid": `admin.booking.download_button.${i + 1}`,
                    children: "Invoice"
                  }
                )
              ] })
            ]
          },
          b.id
        )) })
      ] }) })
    ] })
  ] });
}
export {
  AdminBookingsPage as default
};
