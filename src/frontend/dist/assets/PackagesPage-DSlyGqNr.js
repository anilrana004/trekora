import { j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion } from "./index-C6rgoof8.js";
import { af as Check } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const PACKAGES = [
  {
    name: "Explorer",
    tagline: "Solo & Small Group",
    icon: "🎒",
    price: "From ₹5,999",
    popular: false,
    features: [
      "Standard tent accommodation",
      "Basic meals (dal-chawal, maggi)",
      "Certified guide (1:8 ratio)",
      "Forest permits included",
      "First-aid kit",
      "Emergency support"
    ],
    notIncluded: ["Porter", "Premium meals", "Photography", "Drone footage"]
  },
  {
    name: "Adventurer",
    tagline: "Most Popular Choice",
    icon: "⛰️",
    price: "From ₹9,999",
    popular: true,
    features: [
      "Premium camping tents",
      "All meals (4 course on trek)",
      "Expert guide + porter",
      "Forest permits included",
      "First-aid + oxygen cylinder",
      "Trek photography included",
      "Trekking poles provided",
      "Certificate of completion"
    ],
    notIncluded: ["Drone photography", "Private group"]
  },
  {
    name: "Summit",
    tagline: "Premium Experience",
    icon: "👑",
    price: "From ₹18,999",
    popular: false,
    features: [
      "Luxury tents + sleeping bags",
      "Gourmet meals + chef",
      "Dedicated guide + cook + porter",
      "Forest permits included",
      "Medical kit + oxygen",
      "Professional photography",
      "Drone footage + video",
      "Certificate + memento",
      "Private group (max 8)",
      "Pre-trek fitness consultation"
    ],
    notIncluded: []
  }
];
const SEASONAL = [
  {
    season: "☀️ Summer (Apr–Jun)",
    desc: "Ideal for high passes and alpine meadows. Clear skies, blooming rhododendrons.",
    treks: [
      "Roopkund Trek",
      "Hampta Pass",
      "Pin Parvati Pass",
      "Valley of Flowers"
    ],
    color: "var(--ew-orange-lt)",
    accent: "var(--ew-orange)"
  },
  {
    season: "🌧️ Monsoon (Jul–Sep)",
    desc: "Valley of Flowers peaks, lush green forests, waterfall-lined trails.",
    treks: ["Valley of Flowers", "Kheerganga", "Har Ki Dun", "Kedarnath"],
    color: "#e3f2fd",
    accent: "#1565c0"
  },
  {
    season: "❄️ Winter (Nov–Feb)",
    desc: "Snow-laden trails, silent ridges, stunning winter sunrises.",
    treks: [
      "Brahmatal Trek",
      "Kedarkantha",
      "Triund Snow Trek",
      "Chopta Tungnath"
    ],
    color: "#e8eaf6",
    accent: "#3949ab"
  }
];
function PackagesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "py-16 text-center",
            style: {
              background: "var(--ew-white)",
              borderBottom: "3px solid var(--ew-red)"
            },
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
                      children: "Choose Your Adventure"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title mt-2 mx-auto block", children: "Curated Trek Packages" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "mt-4 text-sm max-w-xl mx-auto",
                      style: { color: "var(--ew-text-lt)" },
                      children: "From budget-friendly to ultra-premium — EternaWings has a perfect package for every trekker."
                    }
                  )
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", style: { background: "var(--ew-orange)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center text-white text-sm font-bold flex items-center justify-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔥 Summer Special: Book any Adventurer or Summit package before May 31 and get 15% off!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/book",
              className: "btn-white text-xs py-1.5 px-4",
              "data-ocid": "packages.summer_deal_button",
              children: "Claim Offer"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start", children: PACKAGES.map((pkg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.15 },
            className: `relative bg-white rounded-2xl shadow-card ${pkg.popular ? "shadow-elevated" : ""} p-6`,
            style: pkg.popular ? {
              outline: "2px solid var(--ew-orange)",
              outlineOffset: "0px"
            } : {},
            "data-ocid": `package.card.${i + 1}`,
            children: [
              pkg.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3.5 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-bold px-4 py-1 rounded-full text-white",
                  style: { background: "var(--ew-orange)" },
                  children: "⭐ Most Popular"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: pkg.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "text-2xl font-bold mt-2",
                    style: { color: "var(--ew-text)" },
                    children: pkg.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: pkg.tagline }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-2xl mt-3",
                    style: { color: "var(--ew-orange)" },
                    children: pkg.price
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: "per person" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 mb-6", children: [
                pkg.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-sm",
                    style: { color: "var(--ew-text-lt)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Check,
                        {
                          size: 16,
                          style: { color: "var(--ew-green)" },
                          className: "shrink-0 mt-0.5"
                        }
                      ),
                      f
                    ]
                  },
                  f
                )),
                pkg.notIncluded.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-sm line-through",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 shrink-0 text-center", children: "✕" }),
                      f
                    ]
                  },
                  f
                ))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/book",
                  className: pkg.popular ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center",
                  "data-ocid": `package.book_button.${i + 1}`,
                  children: [
                    "Choose ",
                    pkg.name
                  ]
                }
              )
            ]
          },
          pkg.name
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4",
            style: {
              background: "var(--ew-orange-lt)",
              border: "1px solid var(--ew-orange)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-lg",
                    style: { color: "var(--ew-text)" },
                    children: "👥 Group Discount"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: [
                  "Bring 5 or more trekkers and get",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "var(--ew-orange)" }, children: "20% off" }),
                  " on all packages. Perfect for friends, family, or colleagues!"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  className: "btn-primary shrink-0",
                  "data-ocid": "packages.group_discount_button",
                  children: "Get Group Quote"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold uppercase tracking-widest",
                style: { color: "var(--ew-red)" },
                children: "By Season"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mt-2 mx-auto block", children: "Seasonal Trek Picks" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: SEASONAL.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "rounded-2xl p-6 shadow-card",
              style: {
                background: s.color,
                border: `1px solid ${s.accent}22`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-lg mb-2",
                    style: { color: s.accent },
                    children: s.season
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mb-4",
                    style: { color: "var(--ew-text-lt)" },
                    children: s.desc
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: s.treks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2 text-sm font-medium",
                    style: { color: "var(--ew-text)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: s.accent }, children: "→" }),
                      " ",
                      t
                    ]
                  },
                  t
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/treks",
                    className: "btn-secondary mt-5 w-full justify-center text-sm",
                    style: { borderColor: s.accent, color: s.accent },
                    "data-ocid": `packages.season_link.${i + 1}`,
                    children: "Explore Season →"
                  }
                )
              ]
            },
            s.season
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-8 text-center shadow-card",
            style: { background: "var(--ew-footer)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-2xl mb-2", children: "Need a Custom Package?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-6 opacity-70 text-white", children: "We create fully customized packages for corporate groups, school trips, or special occasions." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/corporate",
                    className: "btn-primary",
                    "data-ocid": "packages.corporate_button",
                    children: "Corporate Treks"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/contact",
                    className: "btn-white",
                    "data-ocid": "packages.contact_button",
                    children: "Get Custom Quote"
                  }
                )
              ] })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  PackagesPage as default
};
