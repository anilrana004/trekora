import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { u as ue } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const PROMOS = [
  {
    id: 1,
    code: "TREK10",
    discount: "10%",
    type: "percentage",
    uses: 45,
    maxUses: 100,
    expiry: "2025-06-30",
    active: true
  },
  {
    id: 2,
    code: "SUMMER500",
    discount: "₹500",
    type: "flat",
    uses: 23,
    maxUses: 50,
    expiry: "2025-07-31",
    active: true
  },
  {
    id: 3,
    code: "FIRST20",
    discount: "20%",
    type: "percentage",
    uses: 89,
    maxUses: 100,
    expiry: "2025-05-31",
    active: false
  }
];
function AdminPromosPage() {
  const [promos, setPromos] = reactExports.useState(PROMOS);
  function togglePromo(id) {
    setPromos(
      (prev) => prev.map((p) => p.id === id ? { ...p, active: !p.active } : p)
    );
    ue.success("Promo status updated");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.promos.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold",
            style: { color: "var(--ew-text)" },
            children: "Promo Codes"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
          promos.filter((p) => p.active).length,
          " active · ",
          promos.length,
          " ",
          "total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn-primary",
          "data-ocid": "admin.promos.add_button",
          children: "+ Create Promo"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Code",
        "Discount",
        "Type",
        "Usage",
        "Expiry",
        "Status",
        "Actions"
      ].map((h, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-left font-medium ${ci === 3 || ci === 5 || ci === 6 ? "text-center" : ""}`,
          style: { color: "var(--ew-text-lt)" },
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "tbody",
        {
          className: "divide-y",
          style: { borderColor: "var(--ew-gray-lt)" },
          children: promos.map((promo, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
              "data-ocid": `admin.promo.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3 font-mono font-bold",
                    style: { color: "var(--ew-text)" },
                    children: promo.code
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: "px-4 py-3 font-semibold",
                    style: { color: "var(--ew-orange)" },
                    children: [
                      promo.discount,
                      " off"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-0.5 rounded-full font-medium",
                    style: promo.type === "percentage" ? {
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)"
                    } : { background: "#e8f5e9", color: "var(--ew-green)" },
                    children: promo.type === "percentage" ? "%" : "₹"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                    promo.uses,
                    "/",
                    promo.maxUses
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-full h-1.5 mt-1",
                      style: { background: "var(--ew-gray-mid)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-1.5 rounded-full transition-all",
                          style: {
                            width: `${promo.uses / promo.maxUses * 100}%`,
                            background: "var(--ew-orange)"
                          }
                        }
                      )
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-gray-dark)" },
                    children: promo.expiry
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => togglePromo(promo.id),
                    className: "text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer transition-colors",
                    style: promo.active ? {
                      background: "rgba(46,125,50,0.1)",
                      color: "var(--ew-green)"
                    } : {
                      background: "var(--ew-gray-lt)",
                      color: "var(--ew-gray-dark)"
                    },
                    "data-ocid": `admin.promo.toggle_button.${i + 1}`,
                    children: promo.active ? "Active" : "Inactive"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => togglePromo(promo.id),
                    className: "text-xs font-semibold px-3 py-1 rounded-lg border transition-colors",
                    style: {
                      borderColor: promo.active ? "var(--ew-red)" : "var(--ew-green)",
                      color: promo.active ? "var(--ew-red)" : "var(--ew-green)"
                    },
                    "data-ocid": `admin.promo.action_button.${i + 1}`,
                    children: promo.active ? "Deactivate" : "Activate"
                  }
                ) })
              ]
            },
            promo.id
          ))
        }
      )
    ] }) })
  ] });
}
export {
  AdminPromosPage as default
};
