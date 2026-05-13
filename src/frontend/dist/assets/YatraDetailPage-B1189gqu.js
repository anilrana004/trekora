import { r as reactExports, j as jsxRuntimeExports, m as useParams, L as Link } from "./router-Bky4FFc7.js";
import { i as injectJSONLD, e as generateYatraJSONLD, a as generateBreadcrumbJSONLD, b as generateFAQJSONLD, T as TrekMap, S as ShareSection, R as ReviewSubmitForm, f as downloadYatraItineraryPDF, c as SeoTagCloud, W as WhatsAppCTA, B as BookingDrawer, Q as QueryBottomSheet } from "./seo-CZoBy7Dp.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { m as motion, A as AnimatePresence, Y as YATRAS } from "./index-C6rgoof8.js";
import { N as CircleCheck, O as CircleX, z as ChevronUp, h as ChevronDown, M as Mountain, w as ChevronRight, J as Clock, a as MapPin, K as Star, V as Plane, _ as TramFront, a5 as Truck, F as FileText, p as TriangleAlert, a6 as HeartHandshake, P as Phone } from "./icons-DrFRvHmE.js";
import "./reviews-DqUEh3Gg.js";
import "./charts-VM0_pAiv.js";
import "./motion-CnUkbXTC.js";
const INCLUSIONS = [
  "Comfortable accommodation (temple guesthouses, dharamshalas, hotels as per route)",
  "All vegetarian meals during yatra — pure sattvic food (no onion/garlic)",
  "Experienced spiritual guide with Vedic and Puranic knowledge",
  "Darshan arrangement — VIP queue-free darshan wherever available",
  "Transport between all shrines in private AC vehicle",
  "Prasad at each shrine (arranged and offered by guide)",
  "Pujari services for personal abhishek/havan (premium packages)",
  "Medical support — first-aid kit and portable oxygen cylinder",
  "Welcome and farewell ceremonies with spiritual blessings",
  "EternaWings yatra kit — bag, photo ID card, lanyard, guidebook",
  "All permits and entry fees for temples and national parks",
  "Helicopter booking assistance (for applicable yatras)"
];
const EXCLUSIONS = [
  "Personal travel insurance (strongly recommended — available for ₹350)",
  "Air/train tickets to the yatra starting point",
  "Personal puja items (flowers, dhoop, offerings, prasad)",
  "Tips for guides and drivers (voluntary, ₹200–300 per day recommended)",
  "Helicopter charges (available as a separate add-on)",
  "Personal medication and prescription drugs",
  "Meals before and after the yatra period",
  "Porter charges for personal luggage (available at extra cost)",
  "GST 5% on total invoice amount",
  "Any items of personal nature",
  "Shopping at markets and bazaars along the route",
  "Donations to temples (voluntary and at pilgrim's discretion)"
];
const CANCELLATION = [
  {
    range: "30+ days before departure",
    refund: "Full refund",
    color: "var(--ew-green)"
  },
  {
    range: "15–29 days before departure",
    refund: "50% refund",
    color: "var(--ew-orange)"
  },
  {
    range: "7–14 days before departure",
    refund: "25% refund",
    color: "var(--ew-orange)"
  },
  {
    range: "Less than 7 days",
    refund: "No refund",
    color: "var(--ew-red)"
  },
  {
    range: "Cancelled by EternaWings (weather / force majeure)",
    refund: "Full refund or free reschedule",
    color: "var(--ew-green)"
  }
];
function YatraInclusions() {
  const [cancelOpen, setCancelOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Inclusions & Exclusions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden border",
              style: { borderColor: "#A5D6A7" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "px-5 py-3.5 flex items-center gap-2",
                    style: { backgroundColor: "#E8F5E9" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 18, style: { color: "var(--ew-green)" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-bold text-sm uppercase tracking-wide",
                          style: { color: "var(--ew-green)" },
                          children: "What's INCLUDED"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2.5", children: INCLUSIONS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: -8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: INCLUSIONS.indexOf(item) * 0.04 },
                    className: "flex items-start gap-2.5 text-sm",
                    style: { color: "var(--ew-text-lt)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheck,
                        {
                          size: 14,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--ew-green)" }
                        }
                      ),
                      item
                    ]
                  },
                  item
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl overflow-hidden border",
              style: { borderColor: "#FFCDD2" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "px-5 py-3.5 flex items-center gap-2",
                    style: { backgroundColor: "#FFEBEE" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 18, style: { color: "var(--ew-red)" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          className: "font-bold text-sm uppercase tracking-wide",
                          style: { color: "var(--ew-red)" },
                          children: "What's NOT INCLUDED"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-2.5", children: EXCLUSIONS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, x: 8 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: EXCLUSIONS.indexOf(item) * 0.04 },
                    className: "flex items-start gap-2.5 text-sm",
                    style: { color: "var(--ew-text-lt)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleX,
                        {
                          size: 14,
                          className: "mt-0.5 shrink-0",
                          style: { color: "var(--ew-red)" }
                        }
                      ),
                      item
                    ]
                  },
                  item
                )) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border overflow-hidden",
            style: { borderColor: "var(--ew-gray-mid)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50",
                  onClick: () => setCancelOpen((o) => !o),
                  "data-ocid": "yatra_inclusions.cancellation_toggle",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-bold text-sm",
                        style: { color: "var(--ew-text)" },
                        children: "Cancellation Policy"
                      }
                    ),
                    cancelOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16, style: { color: "var(--ew-gray-dark)" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, style: { color: "var(--ew-gray-dark)" } })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: cancelOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0, opacity: 0 },
                  animate: { height: "auto", opacity: 1 },
                  exit: { height: 0, opacity: 0 },
                  transition: { duration: 0.25 },
                  className: "overflow-hidden",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 space-y-2", children: CANCELLATION.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start justify-between gap-4 text-sm rounded-lg px-4 py-3",
                      style: { backgroundColor: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: row.range }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-semibold shrink-0",
                            style: { color: row.color },
                            children: row.refund
                          }
                        )
                      ]
                    },
                    row.range
                  )) })
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function StarRow({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size: 13,
      style: { color: "var(--ew-gold)" },
      className: s <= Math.round(rating) ? "fill-[var(--ew-gold)]" : "fill-none"
    },
    s
  )) });
}
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "inclusions", label: "Inclusions" },
  { key: "map-route", label: "Map & Route" },
  { key: "significance", label: "Significance" },
  { key: "how-to-reach", label: "How to Reach" },
  { key: "photos", label: "Photos" },
  { key: "reviews", label: "Reviews" },
  { key: "faqs", label: "FAQs" }
];
const REVIEWS = [
  {
    name: "Suresh Patel",
    city: "Ahmedabad",
    rating: 5,
    when: "Sep 2024",
    text: "An absolutely divine experience. Trekora team was incredibly supportive throughout. Every detail was taken care of — from VIP darshan arrangements to sattvic meals. I felt truly blessed completing this sacred journey."
  },
  {
    name: "Anita Sharma",
    city: "Pune",
    rating: 5,
    when: "Jun 2024",
    text: "The guides were knowledgeable about every temple's significance. The Tungnath sunrise was something I will never forget. Well-organized from start to finish. Booking again for Panch Badri next year!"
  },
  {
    name: "Ramesh Kumar",
    city: "Chennai",
    rating: 4,
    when: "Aug 2024",
    text: "The yatra was deeply spiritual and beautifully organized. The spiritual guide's knowledge of Puranic stories brought every shrine to life. The langar experience was an experience in itself."
  },
  {
    name: "Priya Nair",
    city: "Hyderabad",
    rating: 5,
    when: "Oct 2024",
    text: "First time doing a high-altitude yatra and I was nervous. The Trekora team made it seamless. The puja arrangements, VIP darshan, and the warm group atmosphere made this truly transformative."
  }
];
const DEFAULT_ITINERARY = [
  {
    day: 1,
    title: "Arrival & Acclimatization",
    altitude: "Base town",
    distance: "",
    description: "Arrive at the base town. Rest, acclimatization, briefing by guide, and distribution of Trekora yatra kit.",
    stay: "Hotel / guesthouse",
    meals: "Dinner"
  },
  {
    day: 2,
    title: "Commence Trek to Trail Head",
    altitude: "Varies",
    distance: "Variable",
    description: "Early morning start. Drive or walk to the main trail head. Begin the pilgrimage with prayers at the base temple.",
    stay: "Dharamshala / camp",
    meals: "Breakfast, Dinner"
  },
  {
    day: 3,
    title: "Main Shrine Darshan",
    altitude: "Varies",
    distance: "Variable",
    description: "Reach the main shrine after gradual ascent. Ritual bath in sacred water. VIP darshan and aarti at the temple.",
    stay: "Temple trust accommodation",
    meals: "Breakfast, Dinner"
  },
  {
    day: 4,
    title: "Return Journey",
    altitude: "Base town",
    distance: "Variable",
    description: "Morning prayers and final darshan. Descend to base town. Debrief and departure preparations.",
    stay: "Hotel / guesthouse",
    meals: "Breakfast"
  }
];
const TRUST_ITEMS = [
  "100% Secure Payment",
  "Free Cancellation up to 30 days",
  "VIP Darshan Included",
  "Expert Spiritual Guide"
];
function YatraDetailPage() {
  var _a, _b, _c, _d;
  const { slug } = useParams({ from: "/layout/yatras/$slug" });
  const yatra = YATRAS.find((y) => y.slug === slug);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [heroImg, setHeroImg] = reactExports.useState(0);
  const [openDay, setOpenDay] = reactExports.useState(0);
  const [openFaq, setOpenFaq] = reactExports.useState(null);
  const [lightboxIdx, setLightboxIdx] = reactExports.useState(null);
  const [groupSize, setGroupSize] = reactExports.useState(2);
  const [heliAdd, setHeliAdd] = reactExports.useState(false);
  const [reviewForm, setReviewForm] = reactExports.useState({
    name: "",
    rating: 5,
    title: "",
    text: "",
    when: ""
  });
  const [reviewSubmitted, setReviewSubmitted] = reactExports.useState(false);
  const [bookingDrawerOpen, setBookingDrawerOpen] = reactExports.useState(false);
  const [querySheetOpen, setQuerySheetOpen] = reactExports.useState(false);
  const tabBarRef = reactExports.useRef(null);
  const [viewerCount] = reactExports.useState(() => Math.floor(Math.random() * 15) + 8);
  const [socialProofIdx, setSocialProofIdx] = reactExports.useState(0);
  const [addOnsYatra, setAddOnsYatra] = reactExports.useState({
    gear: false,
    insurance: false,
    transport: false,
    photographer: false
  });
  const allImages = ((_a = yatra == null ? void 0 : yatra.images) == null ? void 0 : _a.length) ? yatra.images : [(yatra == null ? void 0 : yatra.image) ?? "", (yatra == null ? void 0 : yatra.image) ?? "", (yatra == null ? void 0 : yatra.image) ?? ""];
  reactExports.useEffect(() => {
    if (allImages.length < 2) return;
    const t = setInterval(
      () => setHeroImg((i) => (i + 1) % allImages.length),
      4e3
    );
    return () => clearInterval(t);
  }, [allImages.length]);
  reactExports.useEffect(() => {
    const t = setInterval(() => setSocialProofIdx((i) => (i + 1) % 3), 1e4);
    return () => clearInterval(t);
  }, []);
  reactExports.useEffect(() => {
    setActiveTab("overview");
    setHeroImg(0);
    setOpenDay(0);
    setOpenFaq(null);
    setLightboxIdx(null);
    setGroupSize(2);
    setHeliAdd(false);
  }, [slug]);
  reactExports.useEffect(() => {
    if (!yatra) return;
    const faqList = (yatra.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer
    }));
    const cleanupYatra = injectJSONLD(
      generateYatraJSONLD(yatra),
      "jsonld-yatra"
    );
    const cleanupBreadcrumb = injectJSONLD(
      generateBreadcrumbJSONLD([
        { name: "Home", url: "/" },
        { name: "Yatras", url: "/yatras" },
        {
          name: yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh",
          url: yatra.state === "uttarakhand" ? "/destinations/uttarakhand" : "/destinations/himachal-pradesh"
        },
        { name: yatra.name, url: `/yatras/${yatra.slug}` }
      ]),
      "jsonld-breadcrumb"
    );
    const cleanupFaq = faqList.length > 0 ? injectJSONLD(generateFAQJSONLD(faqList), "jsonld-faq") : () => {
    };
    return () => {
      cleanupYatra();
      cleanupBreadcrumb();
      cleanupFaq();
    };
  }, [slug]);
  const yatraSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: (yatra == null ? void 0 : yatra.name) ?? "",
    description: (yatra == null ? void 0 : yatra.description) ?? "",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Trekora",
      url: "https://www.trekora.com"
    },
    offers: {
      "@type": "Offer",
      price: (yatra == null ? void 0 : yatra.price) ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock"
    }
  };
  const yBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trekora.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yatras",
        item: "https://www.trekora.com/yatras"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: (yatra == null ? void 0 : yatra.name) ?? "",
        item: `https://www.trekora.com/yatras/${slug}`
      }
    ]
  };
  if (!yatra) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-20 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Mountain,
        {
          size: 48,
          style: { color: "var(--ew-red)" },
          className: "mx-auto mb-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-2xl font-bold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Yatra not found"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm mb-5", style: { color: "var(--ew-text-lt)" }, children: [
        "The yatra “",
        slug,
        "” does not exist in our catalog."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/yatras", className: "btn-primary", children: "Browse All Yatras" })
    ] }) });
  }
  const highlights = ((_b = yatra.spiritualBenefits) == null ? void 0 : _b.length) ? yatra.spiritualBenefits : [
    "Sacred pilgrimage revered for thousands of years",
    "Expert spiritual guide with Vedic and Puranic knowledge",
    "Comfortable accommodation at key halting points",
    "VIP darshan arrangements at all major shrines",
    "All rituals and pooja guidance provided throughout"
  ];
  const itinerary = yatra.itinerary ?? DEFAULT_ITINERARY;
  const faqs = yatra.faqs ?? [];
  const howToReach = typeof yatra.howToReach === "object" ? yatra.howToReach : null;
  const totalPrice = yatra.price * groupSize + (heliAdd ? 4500 : 0);
  const relatedYatras = YATRAS.filter(
    (y) => y.slug !== yatra.slug && y.state === yatra.state
  ).slice(0, 3);
  const photoGrid = Array.from(
    { length: 12 },
    (_, i) => allImages[i % allImages.length]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHead,
      {
        title: `${yatra.name} 2025 | ${yatra.duration} Days | From ₹${yatra.price.toLocaleString("en-IN")} | Trekora`,
        description: `Book ${yatra.name} package. ${yatra.duration} days, spiritual pilgrimage to the Himalayas. All-inclusive: accommodation, meals, darshan arrangements, certified spiritual guide.`,
        keywords: `${yatra.name}, pilgrimage India, Himalayan yatra, ${yatra.name} 2025, book ${yatra.name.toLowerCase()}, Trekora yatra`,
        canonical: `https://www.trekora.com/yatras/${yatra.slug}`,
        ogImage: allImages[0],
        schema: [yatraSchema, yBreadcrumbSchema]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-b",
        style: {
          backgroundColor: "var(--ew-gray-lt)",
          borderColor: "var(--ew-gray-mid)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-2.5 flex items-center gap-1.5 text-sm flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "hover:underline",
              style: { color: "var(--ew-gray-dark)" },
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, style: { color: "var(--ew-gray-dark)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/yatras",
              className: "hover:underline",
              style: { color: "var(--ew-gray-dark)" },
              children: "Yatras"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, style: { color: "var(--ew-gray-dark)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", style: { color: "var(--ew-gray-dark)" }, children: yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 13, style: { color: "var(--ew-gray-dark)" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "var(--ew-red)" }, children: yatra.name })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden bg-black",
        style: { minHeight: "clamp(280px, 60vw, 480px)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: allImages[heroImg],
              alt: `${yatra.name} — view ${heroImg + 1}`,
              className: "absolute inset-0 w-full h-full object-cover",
              initial: { opacity: 0, scale: 1.04 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.5 }
            },
            heroImg
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Previous image",
              onClick: () => setHeroImg((i) => (i - 1 + allImages.length) % allImages.length),
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors",
              "data-ocid": "yatra_detail.hero_prev",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18, className: "rotate-180" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Next image",
              onClick: () => setHeroImg((i) => (i + 1) % allImages.length),
              className: "absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors",
              "data-ocid": "yatra_detail.hero_next",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-0 right-0 container mx-auto px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white drop-shadow mb-1", children: yatra.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap text-sm text-white/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                " ",
                yatra.duration,
                " Days"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
                " Starts: ",
                yatra.startPoint
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 14 }),
                " ",
                yatra.distance,
                " km"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5", children: allImages.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `Go to image ${i + 1}`,
              onClick: () => setHeroImg(i),
              className: "rounded-full transition-all",
              style: {
                width: heroImg === i ? 20 : 8,
                height: 8,
                backgroundColor: heroImg === i ? "var(--ew-red)" : "rgba(255,255,255,0.6)"
              },
              "data-ocid": `yatra_detail.hero_dot.${i + 1}`
            },
            img || String(i)
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { backgroundColor: "var(--ew-red)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-6 gap-0 divide-x divide-white/20", children: [
      { label: "Duration", value: `${yatra.duration} Days` },
      { label: "Distance", value: `${yatra.distance} km` },
      { label: "Start Point", value: yatra.startPoint },
      { label: "Best Season", value: yatra.bestTime },
      {
        label: "Difficulty",
        value: yatra.distance > 200 ? "Moderate" : yatra.distance > 50 ? "Easy-Mod" : "Easy"
      },
      {
        label: yatra.helicopterAvailable ? "Helicopter" : "Type",
        value: yatra.helicopterAvailable ? "Available" : "Guided Yatra"
      }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3.5 px-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-xs mb-0.5", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white font-bold text-xs md:text-sm leading-tight", children: s.value })
    ] }, s.label)) }) }) }),
    yatra.tags && yatra.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "py-3",
        style: {
          backgroundColor: "var(--ew-gray-lt)",
          borderBottom: "1px solid var(--ew-gray-mid)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[11px] font-semibold mr-1",
              style: { color: "var(--ew-gray-dark)" },
              children: "Tags:"
            }
          ),
          yatra.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[12px] px-3 py-1 rounded-full border cursor-pointer transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]",
              style: {
                backgroundColor: "#fff",
                color: "#555",
                borderColor: "var(--ew-gray-mid)"
              },
              "data-ocid": `yatra_detail.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
              children: tag
            },
            tag
          ))
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: tabBarRef,
              className: "flex overflow-x-auto mb-7 border-b scrollbar-hide -mx-4 px-4",
              style: { borderColor: "var(--ew-gray-mid)" },
              children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(t.key),
                  className: "shrink-0 px-4 py-3 text-sm font-semibold -mb-px border-b-2 transition-colors whitespace-nowrap",
                  style: activeTab === t.key ? { color: "var(--ew-red)", borderColor: "var(--ew-red)" } : {
                    color: "var(--ew-gray-dark)",
                    borderColor: "transparent"
                  },
                  "data-ocid": `yatra_detail.tab.${t.key}`,
                  children: t.label
                },
                t.key
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-4", children: "About this Yatra" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base leading-relaxed",
                        style: { color: "var(--ew-text-lt)" },
                        children: yatra.description
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-5",
                      style: { backgroundColor: "#FFF8E1" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🛕" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "h3",
                            {
                              className: "font-bold text-base",
                              style: { color: "#B45309" },
                              children: "Spiritual Significance"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "p",
                          {
                            className: "text-sm leading-relaxed",
                            style: { color: "#92400E" },
                            children: [
                              (_c = yatra.significance) == null ? void 0 : _c.substring(0, 400),
                              (((_d = yatra.significance) == null ? void 0 : _d.length) ?? 0) > 400 ? "…" : ""
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
                    { label: "Duration", value: `${yatra.duration} Days` },
                    { label: "Distance", value: `${yatra.distance} km` },
                    { label: "Start Point", value: yatra.startPoint },
                    { label: "Best Time", value: yatra.bestTime }
                  ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-lg p-3 text-center",
                      style: { backgroundColor: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "text-xs mb-0.5",
                            style: { color: "var(--ew-gray-dark)" },
                            children: s.label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "font-bold text-sm",
                            style: { color: "var(--ew-text)" },
                            children: s.value
                          }
                        )
                      ]
                    },
                    s.label
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-5",
                      style: { backgroundColor: "var(--ew-red-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-bold text-base mb-3",
                            style: { color: "var(--ew-red)" },
                            children: "Key Highlights"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: highlights.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "li",
                          {
                            className: "flex items-start gap-2.5 text-sm",
                            style: { color: "var(--ew-text)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                CircleCheck,
                                {
                                  size: 16,
                                  className: "mt-0.5 shrink-0",
                                  style: { color: "var(--ew-red)" }
                                }
                              ),
                              h
                            ]
                          },
                          h
                        )) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-base mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Best Time to Visit"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "rounded-xl border overflow-hidden",
                        style: { borderColor: "var(--ew-gray-mid)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { backgroundColor: "var(--ew-red)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: ["Period", "Season", "Condition", "Rec"].map(
                            (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "th",
                              {
                                className: "py-2.5 px-3 text-left text-white font-semibold text-xs",
                                children: h
                              },
                              h
                            )
                          ) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [
                            [
                              "May–June",
                              "Pre-monsoon",
                              "Clear skies, moderate crowd",
                              "Ideal ✓"
                            ],
                            [
                              "July–Aug",
                              "Monsoon",
                              "Heavy rain, landslide risk",
                              "Caution ⚠"
                            ],
                            [
                              "Sep–Oct",
                              "Post-monsoon",
                              "Crisp weather, fewer crowds",
                              "Excellent ✓"
                            ],
                            [
                              "Nov–Apr",
                              "Winter",
                              "Most shrines closed",
                              "Avoid ✗"
                            ]
                          ].map(([period, season, condition, rec], ri) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "tr",
                            {
                              style: {
                                backgroundColor: ri % 2 === 0 ? "var(--ew-gray-lt)" : "white"
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "td",
                                  {
                                    className: "py-2.5 px-3 font-medium",
                                    style: { color: "var(--ew-text)" },
                                    children: period
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "td",
                                  {
                                    className: "py-2.5 px-3",
                                    style: { color: "var(--ew-text-lt)" },
                                    children: season
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "td",
                                  {
                                    className: "py-2.5 px-3",
                                    style: { color: "var(--ew-text-lt)" },
                                    children: condition
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "td",
                                  {
                                    className: "py-2.5 px-3 font-semibold",
                                    style: {
                                      color: rec.includes("✓") ? "var(--ew-green)" : rec.includes("⚠") ? "var(--ew-orange)" : "var(--ew-red)"
                                    },
                                    children: rec
                                  }
                                )
                              ]
                            },
                            period
                          )) })
                        ] })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl border-l-4 p-5",
                      style: {
                        borderColor: "var(--ew-orange)",
                        backgroundColor: "var(--ew-orange-lt)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-bold text-sm mb-1.5",
                            style: { color: "var(--ew-text)" },
                            children: "Fitness Requirements"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm",
                            style: { color: "var(--ew-text-lt)" },
                            children: yatra.distance > 200 ? "Moderate fitness required. Daily 30-minute walks for 4 weeks before departure recommended. High-altitude sections need good cardiovascular health." : yatra.distance > 50 ? "Easy-moderate fitness. Comfortable walking for 5–10 km per day. Senior pilgrims with helicopter option face minimal physical challenge." : "Easy — suitable for most ages. Short trails of 3–10 km. Helicopter options available. No prior trekking experience required."
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            activeTab === "itinerary" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Day-by-Day Itinerary" }),
                  itinerary.map((day, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border rounded-xl overflow-hidden",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors",
                            onClick: () => setOpenDay(openDay === idx ? null : idx),
                            "data-ocid": `yatra_detail.itinerary.day.${day.day}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  id: "yatra-group-size",
                                  className: "flex items-center gap-3",
                                  children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "span",
                                      {
                                        className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                                        style: { backgroundColor: "var(--ew-red)" },
                                        children: day.day
                                      }
                                    ),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "font-semibold text-sm",
                                          style: { color: "var(--ew-text)" },
                                          children: day.title
                                        }
                                      ),
                                      day.altitude && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "span",
                                        {
                                          className: "ml-3 text-xs",
                                          style: { color: "var(--ew-gray-dark)" },
                                          children: day.altitude
                                        }
                                      )
                                    ] })
                                  ]
                                }
                              ),
                              openDay === idx ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronUp,
                                {
                                  size: 16,
                                  style: { color: "var(--ew-gray-dark)" }
                                }
                              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronDown,
                                {
                                  size: 16,
                                  style: { color: "var(--ew-gray-dark)" }
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openDay === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { height: 0, opacity: 0 },
                            animate: { height: "auto", opacity: 1 },
                            exit: { height: 0, opacity: 0 },
                            transition: { duration: 0.25 },
                            className: "overflow-hidden",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-5 pt-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-sm leading-relaxed mb-3",
                                  style: { color: "var(--ew-text-lt)" },
                                  children: day.description
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "div",
                                {
                                  className: "flex gap-4 text-xs flex-wrap",
                                  style: { color: "var(--ew-gray-dark)" },
                                  children: [
                                    day.distance && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                      "Distance: ",
                                      day.distance
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                      "Stay: ",
                                      day.stay
                                    ] }),
                                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                                      "Meals: ",
                                      day.meals
                                    ] })
                                  ]
                                }
                              )
                            ] })
                          }
                        ) })
                      ]
                    },
                    day.day
                  ))
                ]
              }
            ),
            activeTab === "inclusions" && /* @__PURE__ */ jsxRuntimeExports.jsx(YatraInclusions, {}),
            activeTab === "map-route" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3 },
                className: "bg-white rounded-2xl p-6 shadow-card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-6", children: "Map & Route" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrekMap, { yatra })
                ]
              },
              "map-route"
            ),
            activeTab === "significance" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-7",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-4", children: "Spiritual & Mythological Significance" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-base leading-relaxed",
                        style: { color: "var(--ew-text-lt)" },
                        children: yatra.significance
                      }
                    )
                  ] }),
                  yatra.spiritualBenefits && yatra.spiritualBenefits.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-4",
                        style: { color: "var(--ew-text)" },
                        children: "Why Undertake This Yatra — 5 Spiritual Benefits"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: yatra.spiritualBenefits.map((benefit, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-start gap-3 rounded-xl p-4",
                        style: { backgroundColor: "var(--ew-gray-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0",
                              style: { backgroundColor: "var(--ew-red)" },
                              children: i + 1
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-sm",
                              style: { color: "var(--ew-text-lt)" },
                              children: benefit
                            }
                          )
                        ]
                      },
                      benefit.slice(0, 40)
                    )) })
                  ] }),
                  yatra.deities && yatra.deities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Deities Worshipped"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: yatra.deities.map((deity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2.5 text-sm rounded-lg px-4 py-3 border",
                        style: {
                          borderColor: "var(--ew-gray-mid)",
                          color: "var(--ew-text-lt)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🛕" }),
                          deity
                        ]
                      },
                      deity
                    )) })
                  ] }),
                  yatra.rituals && yatra.rituals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Religious Rituals Performed"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: yatra.rituals.map((ritual) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex items-start gap-2 text-sm",
                        style: { color: "var(--ew-text-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheck,
                            {
                              size: 14,
                              className: "mt-0.5 shrink-0",
                              style: { color: "var(--ew-orange)" }
                            }
                          ),
                          ritual
                        ]
                      },
                      ritual
                    )) })
                  ] }),
                  (yatra.auspiciousDates2025 ?? yatra.auspicious_dates_2025) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Auspicious Dates 2025"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "rounded-xl border overflow-hidden",
                        style: { borderColor: "var(--ew-gray-mid)" },
                        children: (yatra.auspiciousDates2025 ?? yatra.auspicious_dates_2025 ?? []).map((date, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-3 px-4 py-3 text-sm border-b last:border-b-0",
                            style: {
                              borderColor: "var(--ew-gray-mid)",
                              backgroundColor: i % 2 === 0 ? "var(--ew-gray-lt)" : "white"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Star,
                                {
                                  size: 13,
                                  className: "mt-0.5 shrink-0 fill-[var(--ew-gold)]",
                                  style: { color: "var(--ew-gold)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: date })
                            ]
                          },
                          date || String(i)
                        ))
                      }
                    )
                  ] }),
                  (yatra.pujaItems ?? yatra.puja_items) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-3",
                        style: { color: "var(--ew-text)" },
                        children: "Required Items for Puja"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: (yatra.pujaItems ?? yatra.puja_items ?? []).map(
                      (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-2 text-sm px-3 py-2 rounded-lg",
                          style: {
                            backgroundColor: "var(--ew-orange-lt)",
                            color: "var(--ew-text-lt)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🌸" }),
                            item
                          ]
                        },
                        item
                      )
                    ) })
                  ] })
                ]
              }
            ),
            activeTab === "how-to-reach" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "How to Reach" }),
                  howToReach ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl border p-5",
                          style: { borderColor: "var(--ew-gray-mid)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Plane,
                                {
                                  size: 18,
                                  style: { color: "var(--ew-red)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "h3",
                                {
                                  className: "font-bold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: "By Air"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: howToReach.byAir
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl border p-5",
                          style: { borderColor: "var(--ew-gray-mid)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                TramFront,
                                {
                                  size: 18,
                                  style: { color: "var(--ew-red)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "h3",
                                {
                                  className: "font-bold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: "By Train"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: howToReach.byTrain
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl border p-5",
                          style: { borderColor: "var(--ew-gray-mid)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Truck,
                                {
                                  size: 18,
                                  style: { color: "var(--ew-red)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "h3",
                                {
                                  className: "font-bold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: "By Road"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: howToReach.byRoad
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl border p-5",
                          style: { borderColor: "var(--ew-gray-mid)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                MapPin,
                                {
                                  size: 18,
                                  style: { color: "var(--ew-red)" }
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "h3",
                                {
                                  className: "font-bold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: "Local Transport"
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: howToReach.localTransport
                              }
                            )
                          ]
                        }
                      )
                    ] }),
                    yatra.helicopterAvailable && howToReach.helicopter && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-5 border-l-4",
                        style: {
                          backgroundColor: "var(--ew-orange-lt)",
                          borderColor: "var(--ew-orange)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🚁" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h3",
                              {
                                className: "font-bold text-sm",
                                style: { color: "var(--ew-text)" },
                                children: "Helicopter Options"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm leading-relaxed",
                              style: { color: "var(--ew-text-lt)" },
                              children: howToReach.helicopter
                            }
                          )
                        ]
                      }
                    ),
                    yatra.registrationRequired && yatra.registrationInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl border p-5",
                        style: { borderColor: "var(--ew-gray-mid)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              FileText,
                              {
                                size: 18,
                                style: { color: "var(--ew-red)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h3",
                              {
                                className: "font-bold text-sm",
                                style: { color: "var(--ew-text)" },
                                children: "Registration & Permits"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "text-sm leading-relaxed mb-3",
                              style: { color: "var(--ew-text-lt)" },
                              children: yatra.registrationInfo
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "a",
                            {
                              href: "https://badrinath-kedarnath.gov.in",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "btn-secondary inline-flex text-sm",
                              "data-ocid": "yatra_detail.registration_link",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 14 }),
                                " Devasthanam Board Portal"
                              ]
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl border-l-4 p-5",
                        style: {
                          borderColor: "var(--ew-orange)",
                          backgroundColor: "var(--ew-orange-lt)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              TriangleAlert,
                              {
                                size: 16,
                                style: { color: "var(--ew-orange)" }
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h3",
                              {
                                className: "font-bold text-sm",
                                style: { color: "var(--ew-text)" },
                                children: "Medical Requirements"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "ul",
                            {
                              className: "space-y-1.5 text-sm",
                              style: { color: "var(--ew-text-lt)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Age limit: Pilgrims below 2 years and above 75 years not permitted for shrines above 3,000m" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Mandatory medical certificate from MBBS doctor for pilgrims aged 60+" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Persons with heart disease, high BP, asthma, or diabetes must carry prescriptions" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "AMS (Altitude Mountain Sickness) risk above 3,000m — acclimatization days mandatory" })
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm",
                      style: { color: "var(--ew-text-lt)" },
                      children: typeof yatra.howToReach === "string" ? yatra.howToReach : "Please contact us for detailed travel information."
                    }
                  )
                ]
              }
            ),
            activeTab === "photos" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Photo Gallery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 sm:columns-2 md:columns-3 gap-3", children: photoGrid.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "w-full block mb-3 rounded-xl overflow-hidden group",
                      onClick: () => setLightboxIdx(idx),
                      "data-ocid": `yatra_detail.photo.${idx + 1}`,
                      "aria-label": `View photo ${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: img,
                          alt: `${yatra.name} — ${idx + 1}`,
                          className: "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                          style: {
                            aspectRatio: idx % 3 === 0 ? "4/3" : idx % 3 === 1 ? "1/1" : "16/9"
                          }
                        }
                      )
                    },
                    img
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-base mb-4",
                        style: { color: "var(--ew-text)" },
                        children: "Trek Diaries — Video Gallery"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "rounded-xl overflow-hidden aspect-video flex items-center justify-center",
                        style: { backgroundColor: "#111" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-white p-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: "▶️" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-70", children: [
                            "Video ",
                            n,
                            " — ",
                            yatra.name
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-50 mt-1", children: "Add YouTube embed ID" })
                        ] })
                      },
                      `yt-${n}`
                    )) })
                  ] })
                ]
              }
            ),
            activeTab === "reviews" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShareSection, { title: yatra.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-4", children: "Reviews and Ratings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewSubmitForm, { trekSlug: slug, trekName: yatra.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-5 p-5 rounded-xl",
                      style: { backgroundColor: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-4xl font-bold",
                              style: { color: "var(--ew-red)" },
                              children: "4.7"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: 4.7 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "text-xs mt-0.5",
                              style: { color: "var(--ew-gray-dark)" },
                              children: "84 reviews"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-1", children: ["Excellent", "Good", "Average", "Poor"].map(
                          (label, li) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex items-center gap-2 text-xs",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "w-16",
                                    style: { color: "var(--ew-gray-dark)" },
                                    children: label
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "flex-1 rounded-full h-2",
                                    style: { backgroundColor: "var(--ew-gray-mid)" },
                                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                      "div",
                                      {
                                        className: "h-2 rounded-full",
                                        style: {
                                          width: ["72%", "18%", "7%", "3%"][li],
                                          backgroundColor: "var(--ew-orange)"
                                        }
                                      }
                                    )
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "w-8 text-right",
                                    style: { color: "var(--ew-gray-dark)" },
                                    children: ["72%", "18%", "7%", "3%"][li]
                                  }
                                )
                              ]
                            },
                            label
                          )
                        ) })
                      ]
                    }
                  ),
                  REVIEWS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border rounded-xl p-5",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0",
                              style: { backgroundColor: "var(--ew-red)" },
                              children: r.name.charAt(0)
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-semibold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: r.name
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs",
                                  style: { color: "var(--ew-gray-dark)" },
                                  children: r.city
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "text-xs px-2 py-0.5 rounded-full",
                                  style: {
                                    backgroundColor: "var(--ew-red-lt)",
                                    color: "var(--ew-red)"
                                  },
                                  children: r.when
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: r.rating })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm leading-relaxed",
                            style: { color: "var(--ew-text-lt)" },
                            children: r.text
                          }
                        )
                      ]
                    },
                    r.name
                  )),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl border p-5",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h3",
                          {
                            className: "font-bold text-base mb-4",
                            style: { color: "var(--ew-text)" },
                            children: "Share Your Experience"
                          }
                        ),
                        reviewSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "text-center py-6 rounded-xl",
                            style: { backgroundColor: "var(--ew-gray-lt)" },
                            "data-ocid": "yatra_detail.review.success_state",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-2", children: "🙏" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "font-semibold text-sm",
                                  style: { color: "var(--ew-text)" },
                                  children: "Thank you for your review!"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "p",
                                {
                                  className: "text-xs mt-1",
                                  style: { color: "var(--ew-gray-dark)" },
                                  children: "Your review will appear after admin approval."
                                }
                              )
                            ]
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "form",
                          {
                            onSubmit: (e) => {
                              e.preventDefault();
                              setReviewSubmitted(true);
                            },
                            className: "space-y-3",
                            "data-ocid": "yatra_detail.review_form",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    type: "text",
                                    required: true,
                                    placeholder: "Your name",
                                    value: reviewForm.name,
                                    onChange: (e) => setReviewForm((f) => ({
                                      ...f,
                                      name: e.target.value
                                    })),
                                    className: "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none",
                                    style: { borderColor: "var(--ew-gray-mid)" },
                                    "data-ocid": "yatra_detail.review.name_input"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "input",
                                  {
                                    type: "text",
                                    placeholder: "When did you travel?",
                                    value: reviewForm.when,
                                    onChange: (e) => setReviewForm((f) => ({
                                      ...f,
                                      when: e.target.value
                                    })),
                                    className: "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none",
                                    style: { borderColor: "var(--ew-gray-mid)" },
                                    "data-ocid": "yatra_detail.review.when_input"
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "input",
                                {
                                  type: "text",
                                  placeholder: "Review title",
                                  value: reviewForm.title,
                                  onChange: (e) => setReviewForm((f) => ({
                                    ...f,
                                    title: e.target.value
                                  })),
                                  className: "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none",
                                  style: { borderColor: "var(--ew-gray-mid)" },
                                  "data-ocid": "yatra_detail.review.title_input"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "textarea",
                                {
                                  required: true,
                                  rows: 3,
                                  placeholder: "Share your experience...",
                                  value: reviewForm.text,
                                  onChange: (e) => setReviewForm((f) => ({
                                    ...f,
                                    text: e.target.value
                                  })),
                                  className: "w-full border rounded-lg px-3 py-2 text-sm focus:outline-none resize-none",
                                  style: { borderColor: "var(--ew-gray-mid)" },
                                  "data-ocid": "yatra_detail.review.text_textarea"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "submit",
                                  className: "btn-primary",
                                  "data-ocid": "yatra_detail.review.submit_button",
                                  children: "Submit Review"
                                }
                              )
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            ),
            activeTab === "faqs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-5", children: "Frequently Asked Questions" }),
                  faqs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm",
                      style: { color: "var(--ew-text-lt)" },
                      children: "Contact us for any questions about this yatra."
                    }
                  ),
                  faqs.map((faq, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "border rounded-xl overflow-hidden",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors",
                            onClick: () => setOpenFaq(openFaq === idx ? null : idx),
                            "data-ocid": `yatra_detail.faq.${idx + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: "font-semibold text-sm pr-4",
                                  style: { color: "var(--ew-text)" },
                                  children: faq.question
                                }
                              ),
                              openFaq === idx ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronUp,
                                {
                                  size: 16,
                                  className: "shrink-0",
                                  style: { color: "var(--ew-red)" }
                                }
                              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                                ChevronDown,
                                {
                                  size: 16,
                                  className: "shrink-0",
                                  style: { color: "var(--ew-gray-dark)" }
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: openFaq === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          motion.div,
                          {
                            initial: { height: 0, opacity: 0 },
                            animate: { height: "auto", opacity: 1 },
                            exit: { height: 0, opacity: 0 },
                            transition: { duration: 0.22 },
                            className: "overflow-hidden",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "px-5 pb-4 text-sm leading-relaxed",
                                style: { color: "var(--ew-text-lt)" },
                                children: faq.answer
                              }
                            )
                          }
                        ) })
                      ]
                    },
                    faq.question
                  ))
                ]
              }
            )
          ] }, activeTab),
          " "
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-24 rounded-2xl shadow-elevated overflow-hidden border",
            style: { borderColor: "var(--ew-gray-mid)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-5 py-4 border-b",
                  style: {
                    backgroundColor: "var(--ew-gray-lt)",
                    borderColor: "var(--ew-gray-mid)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mb-0.5",
                        style: { color: "var(--ew-gray-dark)" },
                        children: "Package starting from"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "text-3xl font-bold",
                        style: { color: "var(--ew-orange)" },
                        children: [
                          "₹",
                          yatra.price.toLocaleString("en-IN")
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: "per person (twin sharing)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-3 gap-2 text-xs text-center pb-3 border-b",
                    style: { borderColor: "var(--ew-gray-mid)" },
                    children: [
                      { label: "Duration", value: `${yatra.duration}D` },
                      { label: "Dist", value: `${yatra.distance}km` },
                      { label: "From", value: yatra.startPoint.split(" ")[0] }
                    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "font-bold text-sm",
                          style: { color: "var(--ew-text)" },
                          children: s.value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "var(--ew-gray-dark)" }, children: s.label })
                    ] }, s.label))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "yatra-group-size",
                      className: "text-xs font-medium block mb-1.5",
                      style: { color: "var(--ew-text)" },
                      children: "Group Size"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setGroupSize((g) => Math.max(1, g - 1)),
                        className: "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors hover:opacity-80",
                        style: {
                          borderColor: "var(--ew-red)",
                          color: "var(--ew-red)"
                        },
                        "data-ocid": "yatra_detail.group_minus",
                        "aria-label": "Decrease group size",
                        children: "−"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-bold text-sm w-6 text-center",
                        style: { color: "var(--ew-text)" },
                        children: groupSize
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setGroupSize((g) => Math.min(20, g + 1)),
                        className: "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors hover:opacity-80",
                        style: {
                          borderColor: "var(--ew-red)",
                          color: "var(--ew-red)"
                        },
                        "data-ocid": "yatra_detail.group_plus",
                        "aria-label": "Increase group size",
                        children: "+"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs",
                        style: { color: "var(--ew-gray-dark)" },
                        children: "persons"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-semibold mb-2",
                      style: { color: "var(--ew-text)" },
                      children: "Add-ons"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
                    {
                      key: "gear",
                      label: "🎒 Gear Rental Pack",
                      price: 800,
                      per: "person"
                    },
                    {
                      key: "insurance",
                      label: "🛡️ Travel Insurance",
                      price: 350,
                      per: "person"
                    },
                    {
                      key: "transport",
                      label: "🚌 Base Camp Transport",
                      price: 1200,
                      per: "group"
                    },
                    {
                      key: "photographer",
                      label: "📸 Photographer",
                      price: 2500,
                      per: "group"
                    }
                  ].map(({ key, label, price, per }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      className: "flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition-colors",
                      style: {
                        backgroundColor: addOnsYatra[key] ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
                        border: `1px solid ${addOnsYatra[key] ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: addOnsYatra[key],
                            onChange: (e) => setAddOnsYatra((prev) => ({
                              ...prev,
                              [key]: e.target.checked
                            })),
                            className: "w-3.5 h-3.5",
                            "data-ocid": `yatra_detail.addon.${key}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "flex-1 text-xs font-medium",
                            style: { color: "var(--ew-text)" },
                            children: label
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "text-[11px] font-bold",
                            style: { color: "var(--ew-orange)" },
                            children: [
                              "+₹",
                              price.toLocaleString("en-IN"),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                "span",
                                {
                                  className: "font-normal text-[10px]",
                                  style: { color: "var(--ew-gray-dark)" },
                                  children: [
                                    "/",
                                    per
                                  ]
                                }
                              )
                            ]
                          }
                        )
                      ]
                    },
                    key
                  )) })
                ] }),
                yatra.helicopterAvailable && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-2.5 cursor-pointer",
                    "data-ocid": "yatra_detail.helicopter_checkbox",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: heliAdd,
                          onChange: (e) => setHeliAdd(e.target.checked),
                          className: "w-4 h-4"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-sm",
                          style: { color: "var(--ew-text-lt)" },
                          children: "Add Helicopter (+₹4,500/person)"
                        }
                      )
                    ]
                  }
                ),
                yatra.registrationRequired && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-xs rounded-lg px-3 py-2",
                    style: {
                      backgroundColor: "var(--ew-orange-lt)",
                      color: "#92400E"
                    },
                    children: "⚠️ Registration required. Trekora assists with permits."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between py-2.5 px-3 rounded-lg",
                    style: { backgroundColor: "var(--ew-gray-lt)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", style: { color: "var(--ew-text)" }, children: [
                        "Total (",
                        groupSize,
                        " ",
                        groupSize === 1 ? "person" : "persons",
                        ")"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "font-bold text-lg",
                          style: { color: "var(--ew-orange)" },
                          children: [
                            "₹",
                            totalPrice.toLocaleString("en-IN")
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/book",
                    className: "flex items-center justify-center w-full font-bold text-lg rounded-xl transition-colors",
                    style: {
                      backgroundColor: "var(--ew-red)",
                      color: "#fff",
                      height: 56
                    },
                    "data-ocid": "yatra_detail.book_button",
                    children: "Book Yatra Now"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => downloadYatraItineraryPDF(yatra),
                    className: "flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border-2 transition-colors",
                    style: {
                      borderColor: "var(--ew-orange)",
                      color: "var(--ew-orange)",
                      height: 44
                    },
                    "data-ocid": "yatra_detail.download_pdf_button",
                    children: "📥 Download Full Itinerary PDF"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border transition-colors",
                    style: {
                      borderColor: "var(--ew-gray-mid)",
                      color: "var(--ew-gray-dark)",
                      height: 40
                    },
                    "data-ocid": "yatra_detail.inquiry_button",
                    onClick: () => setQuerySheetOpen(true),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(HeartHandshake, { size: 15 }),
                      " Send Inquiry"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: "tel:+919810012345",
                      className: "flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors",
                      style: {
                        borderColor: "var(--ew-red)",
                        color: "var(--ew-red)",
                        height: 40
                      },
                      "data-ocid": "yatra_detail.call_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14 }),
                        " Call Expert"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `https://wa.me/919810012345?text=${encodeURIComponent(`Hi! I want to book the ${yatra.name}. Please share details.`)}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors",
                      style: {
                        borderColor: "#25D366",
                        color: "#25D366",
                        height: 40
                      },
                      "data-ocid": "yatra_detail.whatsapp_button",
                      children: "💬 WhatsApp"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1 text-center", children: [
                  { icon: "🔒", text: "Secure Payment" },
                  { icon: "✅", text: "Free Cancel 30d" },
                  { icon: "⭐", text: "4.8 Rated" }
                ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg py-2 px-1",
                    style: {
                      backgroundColor: "var(--ew-gray-lt)",
                      border: "1px solid var(--ew-gray-mid)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base", children: badge.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "text-[10px] leading-tight mt-0.5",
                          style: { color: "var(--ew-text-lt)" },
                          children: badge.text
                        }
                      )
                    ]
                  },
                  badge.text
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-center text-xs py-1.5 rounded-lg",
                    style: {
                      backgroundColor: "var(--ew-red-lt)",
                      color: "var(--ew-red)"
                    },
                    children: [
                      `👁️ ${viewerCount} people viewed this in the last 24 hrs`,
                      "🔥 8 bookings made this week!",
                      "⏰ Next batch filling fast — only 6 spots left"
                    ][socialProofIdx]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "pt-2 border-t space-y-1.5",
                    style: { borderColor: "var(--ew-gray-mid)" },
                    children: TRUST_ITEMS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 text-xs",
                        style: { color: "var(--ew-text-lt)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleCheck,
                            {
                              size: 12,
                              style: { color: "var(--ew-green)" }
                            }
                          ),
                          t
                        ]
                      },
                      t
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "rounded-lg p-3 text-xs",
                    style: { backgroundColor: "var(--ew-orange-lt)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "font-semibold",
                          style: { color: "var(--ew-orange)" },
                          children: [
                            "Best Time:",
                            " "
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: yatra.bestTime })
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      ] }),
      relatedYatras.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "Related Yatras" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: relatedYatras.map((y, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/yatras/$slug",
            params: { slug: y.slug },
            className: "card group block",
            "data-ocid": `yatra_detail.related.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 overflow-hidden trek-card-img", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: y.image,
                  alt: y.name,
                  className: "w-full h-full object-cover"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-sm mb-1",
                    style: { color: "var(--ew-text)" },
                    children: y.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-gray-dark)" }, children: [
                    y.duration,
                    " Days"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-bold",
                      style: { color: "var(--ew-orange)" },
                      children: [
                        "₹",
                        y.price.toLocaleString("en-IN")
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          y.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SeoTagCloud,
      {
        name: yatra.name,
        slug: yatra.slug,
        state: yatra.state,
        type: "yatra",
        relatedSlugs: relatedYatras.map((y) => y.slug),
        relatedNames: relatedYatras.map((y) => y.name)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppCTA, { trekName: yatra.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingDrawer,
      {
        isOpen: bookingDrawerOpen,
        onClose: () => setBookingDrawerOpen(false),
        trekName: yatra.name,
        trekSlug: yatra.slug,
        price: yatra.price,
        duration: `${yatra.duration} Days`,
        difficulty: yatra.distance > 200 ? "Moderate" : "Easy",
        image: yatra.image
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QueryBottomSheet,
      {
        isOpen: querySheetOpen,
        onClose: () => setQuerySheetOpen(false),
        trekName: yatra.name
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: lightboxIdx !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4",
        onClick: () => setLightboxIdx(null),
        "data-ocid": "yatra_detail.lightbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Close lightbox",
              className: "absolute top-4 right-4 text-white text-2xl hover:opacity-70",
              onClick: () => setLightboxIdx(null),
              "data-ocid": "yatra_detail.lightbox.close_button",
              children: "×"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Previous photo",
              className: "absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70",
              onClick: (e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (i) => ((i ?? 0) - 1 + photoGrid.length) % photoGrid.length
                );
              },
              "data-ocid": "yatra_detail.lightbox.prev",
              children: "‹"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: photoGrid[lightboxIdx],
              alt: `${yatra.name} — ${lightboxIdx + 1}`,
              className: "max-h-[80vh] max-w-full rounded-xl object-contain",
              onClick: (e) => e.stopPropagation(),
              onKeyDown: (e) => e.stopPropagation()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Next photo",
              className: "absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70",
              onClick: (e) => {
                e.stopPropagation();
                setLightboxIdx((i) => ((i ?? 0) + 1) % photoGrid.length);
              },
              "data-ocid": "yatra_detail.lightbox.next",
              children: "›"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 text-white text-sm opacity-70", children: [
            lightboxIdx + 1,
            " / ",
            photoGrid.length
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-between px-4 py-3 lg:hidden",
        style: { backgroundColor: "white", borderColor: "var(--ew-gray-mid)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: "Starting from" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-xl font-bold",
                style: { color: "var(--ew-orange)" },
                children: [
                  "₹",
                  yatra.price.toLocaleString("en-IN")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "btn-primary",
              "data-ocid": "yatra_detail.mobile_book_button",
              onClick: () => setBookingDrawerOpen(true),
              children: "Book Yatra"
            }
          )
        ]
      }
    )
  ] }, yatra.slug);
}
export {
  YatraDetailPage as default
};
