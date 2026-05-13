import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const BATCHES = [
  {
    id: 1,
    trek: "Roopkund Trek",
    dates: "May 15–22, 2025",
    duration: "8D/7N",
    slots: 4,
    price: 12e3,
    difficulty: "Moderate-Difficult",
    state: "Uttarakhand",
    month: 5
  },
  {
    id: 2,
    trek: "Valley of Flowers",
    dates: "Jul 5–10, 2025",
    duration: "6D/5N",
    slots: 8,
    price: 8500,
    difficulty: "Easy-Moderate",
    state: "Uttarakhand",
    month: 7
  },
  {
    id: 3,
    trek: "Kedarkantha Trek",
    dates: "Dec 20–25, 2025",
    duration: "6D/5N",
    slots: 0,
    price: 8500,
    difficulty: "Easy-Moderate",
    state: "Uttarakhand",
    month: 12
  },
  {
    id: 4,
    trek: "Hampta Pass",
    dates: "Jun 12–16, 2025",
    duration: "5D/4N",
    slots: 6,
    price: 9500,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 6
  },
  {
    id: 5,
    trek: "Triund Trek",
    dates: "Apr 20–21, 2025",
    duration: "2D/1N",
    slots: 12,
    price: 3500,
    difficulty: "Easy",
    state: "Himachal Pradesh",
    month: 4
  },
  {
    id: 6,
    trek: "Chandratal Lake",
    dates: "Sep 5–8, 2025",
    duration: "4D/3N",
    slots: 2,
    price: 8e3,
    difficulty: "Easy-Moderate",
    state: "Himachal Pradesh",
    month: 9
  },
  {
    id: 7,
    trek: "Brahmatal Trek",
    dates: "Jan 10–15, 2026",
    duration: "6D/5N",
    slots: 10,
    price: 9500,
    difficulty: "Moderate",
    state: "Uttarakhand",
    month: 1
  },
  {
    id: 8,
    trek: "Rupin Pass",
    dates: "Jun 1–8, 2025",
    duration: "8D/7N",
    slots: 5,
    price: 14e3,
    difficulty: "Difficult",
    state: "Uttarakhand",
    month: 6
  },
  {
    id: 9,
    trek: "Sar Pass",
    dates: "May 20–24, 2025",
    duration: "5D/4N",
    slots: 0,
    price: 8500,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 5
  },
  {
    id: 10,
    trek: "Har Ki Dun",
    dates: "Oct 5–11, 2025",
    duration: "7D/6N",
    slots: 7,
    price: 10500,
    difficulty: "Moderate",
    state: "Uttarakhand",
    month: 10
  },
  {
    id: 11,
    trek: "Kedarnath Trek",
    dates: "May 1–4, 2025",
    duration: "4D/3N",
    slots: 15,
    price: 6500,
    difficulty: "Easy",
    state: "Uttarakhand",
    month: 5
  },
  {
    id: 12,
    trek: "Spiti Valley Circuit",
    dates: "Aug 1–12, 2025",
    duration: "12D/11N",
    slots: 3,
    price: 2e4,
    difficulty: "Moderate",
    state: "Himachal Pradesh",
    month: 8
  }
];
const TABS = [
  { key: "this-month", label: "This Month" },
  { key: "next-3-months", label: "Next 3 Months" },
  { key: "summer-2025", label: "Summer 2025" },
  { key: "all", label: "All" }
];
const DIFFICULTY_STYLES = {
  Easy: { bg: "#e8f5e9", color: "var(--ew-green)" },
  "Easy-Moderate": { bg: "#f1f8e9", color: "#558b2f" },
  Moderate: { bg: "var(--ew-orange-lt)", color: "var(--ew-orange)" },
  "Moderate-Difficult": { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Difficult: { bg: "var(--ew-red-lt)", color: "var(--ew-red)" },
  Extreme: { bg: "#f3e5f5", color: "#7b1fa2" }
};
const NOW_MONTH = (/* @__PURE__ */ new Date()).getMonth() + 1;
function filterBatches(tab) {
  if (tab === "all") return BATCHES;
  if (tab === "this-month") return BATCHES.filter((b) => b.month === NOW_MONTH);
  if (tab === "next-3-months")
    return BATCHES.filter(
      (b) => b.month >= NOW_MONTH && b.month <= NOW_MONTH + 3
    );
  if (tab === "summer-2025")
    return BATCHES.filter((b) => b.month >= 4 && b.month <= 6);
  return BATCHES;
}
function UpcomingBatchesPage() {
  const [tab, setTab] = reactExports.useState("all");
  const batches = filterBatches(tab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-16 text-center bg-white",
            style: { borderBottom: "3px solid var(--ew-red)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-bold uppercase tracking-widest",
                      style: { color: "var(--ew-red)" },
                      children: "Plan Ahead"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title mt-2 mx-auto block", children: "Upcoming Trek Batches" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm", style: { color: "var(--ew-text-lt)" }, children: "Secure your spot — batches fill up fast!" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white py-4 shadow-sm sticky top-16 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 flex gap-3 flex-wrap justify-center", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(t.key),
            className: "px-5 py-1.5 rounded-full text-sm font-semibold transition-all",
            style: tab === t.key ? { background: "var(--ew-red)", color: "#fff" } : {
              background: "var(--ew-gray-lt)",
              color: "var(--ew-text-lt)"
            },
            "data-ocid": `batches.filter.${t.key}`,
            children: t.label
          },
          t.key
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
          batches.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-20 bg-white rounded-2xl shadow-card",
              "data-ocid": "batches.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🗓️" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: "No batches in this period" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: 'Try "All" to see all upcoming treks' })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-2xl shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full bg-white text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                style: { background: "var(--ew-red)" },
                className: "text-white",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-left font-semibold", children: "Trek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-left font-semibold", children: "Dates" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-left font-semibold hidden md:table-cell", children: "Duration" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-left font-semibold hidden md:table-cell", children: "Difficulty" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-right font-semibold", children: "Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-center font-semibold", children: "Slots" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-4 text-center font-semibold", children: "Action" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: batches.map((batch, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.tr,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: i * 0.04 },
                className: `border-b transition-colors hover:bg-[var(--ew-gray-lt)] ${batch.slots === 0 ? "opacity-60" : ""}`,
                style: { borderColor: "var(--ew-gray-mid)" },
                "data-ocid": `batch.row.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-6 py-4 font-bold",
                      style: { color: "var(--ew-text)" },
                      children: batch.trek
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-4 py-4",
                      style: { color: "var(--ew-text-lt)" },
                      children: batch.dates
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "td",
                    {
                      className: "px-4 py-4 hidden md:table-cell",
                      style: { color: "var(--ew-gray-dark)" },
                      children: batch.duration
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 hidden md:table-cell", children: (() => {
                    const s = DIFFICULTY_STYLES[batch.difficulty] ?? {
                      bg: "var(--ew-gray-lt)",
                      color: "var(--ew-gray-dark)"
                    };
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-bold px-2.5 py-0.5 rounded-full",
                        style: { background: s.bg, color: s.color },
                        children: batch.difficulty
                      }
                    );
                  })() }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "td",
                    {
                      className: "px-4 py-4 text-right font-bold",
                      style: { color: "var(--ew-orange)" },
                      children: [
                        "₹",
                        batch.price.toLocaleString("en-IN")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-center", children: batch.slots === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-xs font-bold px-2.5 py-0.5 rounded-full line-through",
                      style: {
                        background: "var(--ew-gray-lt)",
                        color: "var(--ew-gray-dark)"
                      },
                      children: "FULL"
                    }
                  ) : batch.slots <= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-bold px-2.5 py-0.5 rounded-full",
                      style: {
                        background: "var(--ew-red-lt)",
                        color: "var(--ew-red)"
                      },
                      children: [
                        "Only ",
                        batch.slots,
                        " spots!"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-xs font-bold px-2.5 py-0.5 rounded-full",
                      style: {
                        background: "#e8f5e9",
                        color: "var(--ew-green)"
                      },
                      children: [
                        batch.slots,
                        " available"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-center", children: batch.slots > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/book",
                      className: "btn-primary text-xs py-2 px-4",
                      "data-ocid": `batch.book_button.${i + 1}`,
                      children: "Book Now"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs font-medium px-4 py-2 rounded-full cursor-not-allowed",
                      style: {
                        border: "1px solid var(--ew-gray-mid)",
                        color: "var(--ew-gray-dark)"
                      },
                      disabled: true,
                      children: "Full"
                    }
                  ) })
                ]
              },
              batch.id
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%27d%20like%20to%20book%20a%20trek%20batch",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90",
              style: { background: "#25D366" },
              "data-ocid": "batches.whatsapp_button",
              children: "💬 Can't find your dates? WhatsApp us for a custom batch"
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  UpcomingBatchesPage as default
};
