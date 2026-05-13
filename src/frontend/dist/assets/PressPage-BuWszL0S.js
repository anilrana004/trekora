import { j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { m as motion } from "./index-C6rgoof8.js";
import { at as ArrowUpRight } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const PRESS_MENTIONS = [
  {
    name: "Times of India",
    logo: "TOI",
    headline: "EternaWings Redefines Himalayan Trekking Experience",
    url: "https://timesofindia.com",
    date: "March 2025",
    featured: true
  },
  {
    name: "NDTV",
    logo: "NDTV",
    headline: "Top 5 Trekking Companies Making India's Mountains Accessible",
    url: "https://ndtv.com",
    date: "February 2025",
    featured: true
  },
  {
    name: "Outlook Traveller",
    logo: "OT",
    headline: "Hidden Gems: Uttarakhand Treks You Haven't Heard Of",
    url: "https://outlooktraveller.com",
    date: "January 2025",
    featured: true
  },
  {
    name: "National Geographic",
    logo: "NG",
    headline: "Responsible Trekking: The Future of Himalayan Tourism",
    url: "https://nationalgeographic.com",
    date: "December 2024",
    featured: false
  },
  {
    name: "Adventure Nation",
    logo: "AN",
    headline: "EternaWings Named Top Trek Operator 2024",
    url: "https://adventurenation.com",
    date: "November 2024",
    featured: false
  },
  {
    name: "Thrillophilia",
    logo: "T",
    headline: "Best Trekking Companies in India 2024",
    url: "https://thrillophilia.com",
    date: "October 2024",
    featured: false
  },
  {
    name: "MakeMyTrip",
    logo: "MMT",
    headline: "Partner Spotlight: EternaWings Adventure Treks",
    url: "https://makemytrip.com",
    date: "September 2024",
    featured: false
  }
];
function PressPage() {
  const featured = PRESS_MENTIONS.filter((m) => m.featured);
  const rest = PRESS_MENTIONS.filter((m) => !m.featured);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 text-center",
        style: { background: "var(--ew-red)" },
        "data-ocid": "press.hero",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm uppercase tracking-widest mb-2", children: "Media & Press" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white font-bold text-4xl md:text-5xl mb-3", children: "EternaWings in the Press" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base max-w-xl mx-auto", children: "Our journey covered by India's leading media — celebrating Himalayan adventures that inspire millions." })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 bg-white", "data-ocid": "press.featured", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          className: "section-title mb-8",
          style: { display: "block", paddingBottom: 12 },
          children: "Featured Coverage"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: featured.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.a,
        {
          href: m.url,
          target: "_blank",
          rel: "noopener noreferrer",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "group block rounded-xl p-6 transition-shadow hover:shadow-elevated",
          style: {
            background: "var(--ew-orange-lt)",
            border: "1px solid var(--ew-gray-mid)",
            textDecoration: "none"
          },
          "data-ocid": `press.featured.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "inline-flex items-center justify-center w-14 h-14 rounded-xl font-black text-lg mb-4",
                style: {
                  background: "var(--ew-orange)",
                  color: "#fff",
                  letterSpacing: "-0.05em"
                },
                children: m.logo
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold text-sm mb-1",
                style: { color: "var(--ew-orange)" },
                children: m.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-semibold text-base leading-snug mb-3",
                style: { color: "var(--ew-text)" },
                children: m.headline
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[12px]",
                  style: { color: "var(--ew-gray-dark)" },
                  children: m.date
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1 text-[13px] font-semibold transition-colors group-hover:underline",
                  style: { color: "var(--ew-red)" },
                  children: [
                    "Read Article ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 13 })
                  ]
                }
              )
            ] })
          ]
        },
        m.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "press.all_mentions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-8", children: "More Coverage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: rest.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.a,
        {
          href: m.url,
          target: "_blank",
          rel: "noopener noreferrer",
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          className: "group bg-white rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-card",
          style: {
            border: "1px solid var(--ew-gray-mid)",
            textDecoration: "none"
          },
          "data-ocid": `press.mention.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "inline-flex items-center justify-center w-11 h-11 rounded-lg font-black text-sm self-start",
                style: {
                  background: "var(--ew-gray-lt)",
                  color: "var(--ew-text)"
                },
                children: m.logo
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-[13px] mb-0.5",
                  style: { color: "var(--ew-text)" },
                  children: m.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[12px] leading-snug line-clamp-2",
                  style: { color: "var(--ew-text-lt)" },
                  children: m.headline
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px]",
                  style: { color: "var(--ew-gray-dark)" },
                  children: m.date
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-0.5 text-[12px] font-semibold group-hover:underline",
                  style: { color: "var(--ew-red)" },
                  children: [
                    "Read ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 12 })
                  ]
                }
              )
            ] })
          ]
        },
        m.name
      )) })
    ] }) })
  ] });
}
export {
  PressPage as default
};
