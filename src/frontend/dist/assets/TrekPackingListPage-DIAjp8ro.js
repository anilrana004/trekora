import { m as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { B as BreadcrumbNav } from "./BreadcrumbNav-CHc2lt2y.js";
import { T as TREKS, m as motion } from "./index-C6rgoof8.js";
import { as as Package, N as CircleCheck } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const GEAR_CATEGORIES = [
  {
    icon: "🧥",
    title: "Clothing",
    items: [
      "Moisture-wicking base layer (2 sets)",
      "Fleece mid-layer jacket",
      "Waterproof/windproof outer shell jacket",
      "Insulated down jacket (for camps)",
      "Trekking trousers (2 pairs)",
      "Thermal leggings",
      "Warm woollen socks (4 pairs)",
      "Liner socks (4 pairs)",
      "Sun hat / cap with brim",
      "Warm beanie / balaclava",
      "Neck gaiter / buff",
      "Lightweight gloves + heavy-insulated gloves"
    ]
  },
  {
    icon: "👟",
    title: "Footwear",
    items: [
      "High-ankle trekking boots (broken in)",
      "Camp sandals / flipflops",
      "Waterproof gaiters (for snow sections)",
      "Microspike crampons (if snow expected)",
      "Extra insoles for arch support",
      "Polypropylene sock liners"
    ]
  },
  {
    icon: "🎒",
    title: "Equipment",
    items: [
      "Backpack 45-55L (with rain cover)",
      "Trekking poles (pair)",
      "Sleeping bag (-10°C rated)",
      "Sleeping bag liner",
      "Headlamp + extra batteries",
      "Sunglasses (UV400, wraparound)",
      "Dry bags / waterproof stuff sacks",
      "Trekking map / trail notes",
      "Water bottles (1.5L minimum)",
      "Water purification tablets"
    ]
  },
  {
    icon: "🧴",
    title: "Personal Care",
    items: [
      "Sunscreen SPF 50+ (high altitude strength)",
      "Lip balm with SPF",
      "Hand sanitiser",
      "Toilet paper + disposal bags",
      "Personal medication & first-aid kit",
      "Diamox (altitude tablets — consult doctor)",
      "ORS sachets (oral rehydration)",
      "Energy bars / dry fruits / trail mix"
    ]
  },
  {
    icon: "📋",
    title: "Documents",
    items: [
      "Government-issued photo ID (Aadhaar / Passport)",
      "Trek permit (provided by EternaWings)",
      "Emergency contact details (written copy)",
      "Travel insurance policy document",
      "Medical fitness certificate",
      "Booking confirmation voucher"
    ]
  }
];
const PACKING_FAQS = [
  {
    q: "How heavy should my backpack be?",
    a: "Aim for 8–12 kg maximum. Porters can carry additional weight. A heavy pack causes fatigue and increases fall risk on steep terrain."
  },
  {
    q: "Can I rent equipment at the base camp?",
    a: "Yes — EternaWings offers rentals for trekking poles, sleeping bags, and crampons from ₹200/day. Book in advance as stock is limited."
  },
  {
    q: "Are trekking boots mandatory?",
    a: "Absolutely. Running shoes or sneakers are not allowed above 3,000m. High-ankle boots with Vibram soles provide essential ankle support on rocky trails."
  },
  {
    q: "What clothing should I avoid?",
    a: "Avoid cotton — it absorbs moisture and loses insulating properties when wet. Stick to merino wool, polyester, or nylon fabrics throughout."
  },
  {
    q: "Is a sleeping bag really needed if tents are provided?",
    a: "Yes. Tent temperatures drop to -5°C to -15°C at high altitude. A rated sleeping bag is critical — do not rely on tent blankets alone."
  },
  {
    q: "Should I bring a camera?",
    a: "A smartphone camera is sufficient. If bringing a DSLR, ensure it's protected in a padded case. Cold temperatures drain batteries quickly — carry spares."
  },
  {
    q: "How many changes of clothes do I need?",
    a: "2 trek outfits are sufficient as you can air-dry at campsites. Prioritise layers over bulk — one down jacket replaces three sweaters."
  },
  {
    q: "What medicines should I carry?",
    a: "Anti-altitude medication (Diamox — consult a doctor), ibuprofen, antihistamines, antacids, Imodium, ORS, and any personal prescriptions."
  }
];
function TrekPackingListPage() {
  const { slug } = useParams({ from: "/layout/treks/$slug/packing-list" });
  const trek = TREKS.find((t) => t.slug === slug);
  reactExports.useEffect(() => {
    const name = (trek == null ? void 0 : trek.name) ?? slug;
    document.title = `Packing List for ${name} | EternaWings`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        `Complete packing list and gear guide for the ${name}. Everything you need to pack for a safe and comfortable trek.`
      );
  }, [slug, trek]);
  if (!trek) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold mb-4",
          style: { color: "var(--ew-text)" },
          children: "Trek not found"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Browse All Treks" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 md:h-64 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trek.image,
              alt: trek.name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/75 to-black/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-5 left-0 right-0 container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl md:text-3xl font-bold text-white text-shadow", children: [
            "Packing List — ",
            trek.name
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BreadcrumbNav,
            {
              items: [
                { label: "Treks", href: "/treks" },
                { label: trek.name, href: `/treks/${trek.slug}` },
                { label: "Packing List" }
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              className: "bg-white rounded-2xl p-6 shadow-card mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Package,
                    {
                      size: 22,
                      style: { color: "var(--ew-red)" },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h2",
                    {
                      className: "text-xl font-bold",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "What to Pack for ",
                        trek.name
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "var(--ew-text-lt)" }, children: [
                  "This packing list is tailored for the ",
                  trek.name,
                  " at",
                  " ",
                  trek.altitude.toLocaleString(),
                  "m altitude. Difficulty:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: trek.difficulty }),
                  ". Duration:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                    trek.duration,
                    " days"
                  ] }),
                  ". Best season:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: trek.bestSeason }),
                  ". Every item listed is either essential or strongly recommended by our certified mountain guides."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: GEAR_CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: i * 0.08 },
              className: "bg-white rounded-2xl p-5 shadow-card",
              "data-ocid": `packing.category.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: cat.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base",
                      style: { color: "var(--ew-text)" },
                      children: cat.title
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: cat.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleCheck,
                    {
                      size: 15,
                      className: "shrink-0 mt-0.5",
                      style: { color: "var(--ew-red)" },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: item })
                ] }, item)) })
              ]
            },
            cat.title
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "Packing FAQs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: PACKING_FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.06 },
                className: "bg-white rounded-xl p-5 shadow-card",
                "data-ocid": `packing.faq.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "font-semibold text-sm mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Q: ",
                        faq.q
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: faq.a })
                ]
              },
              faq.q
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/treks/$slug",
                params: { slug: trek.slug },
                className: "btn-primary",
                "data-ocid": "packing.view_trek_button",
                children: [
                  "Book ",
                  trek.name
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/treks/$slug/difficulty-guide",
                params: { slug: trek.slug },
                className: "btn-secondary",
                "data-ocid": "packing.difficulty_guide_link",
                children: "Difficulty Guide →"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  TrekPackingListPage as default
};
