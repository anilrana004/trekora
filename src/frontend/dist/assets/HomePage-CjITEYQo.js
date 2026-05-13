import { j as jsxRuntimeExports, r as reactExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion, T as TREKS, Y as YATRAS, B as BLOGS } from "./index-C6rgoof8.js";
import { R as REVIEWS$1 } from "./reviews-DqUEh3Gg.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { u as useGTM } from "./useGTM-BCLtQZuk.js";
import { T as TrekCard } from "./TrekCard-Zeetnzqb.js";
import { T as TrekRecommenderQuiz } from "./TrekRecommenderQuiz-Bmk9Pfnn.js";
import { q as Play, A as ArrowRight, r as Shield, U as Users, Z as Zap, s as Leaf, t as RotateCcw, u as CreditCard, v as ChevronLeft, w as ChevronRight } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
import "./backend-JpGNVgMw.js";
const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    text: "EternaWings made our Kedarkantha trek unforgettable! The guides were professional, safety measures top-notch, and the entire experience exceeded expectations. Highly recommend for first-timers.",
    date: "March 2025"
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    rating: 5,
    text: "Booked Triund trek with EternaWings. From booking to completion, every detail was taken care of. The team was responsive and the trek itself was breathtaking.",
    date: "February 2025"
  },
  {
    name: "Anita Kapoor",
    city: "Bangalore",
    rating: 4,
    text: "Valley of Flowers trek was magical. EternaWings team knows these trails inside out. A bit pricey but worth every rupee for the safety and experience.",
    date: "January 2025"
  }
];
const AGGREGATE = { ratingValue: 4.8, reviewCount: 2400 };
function StarRow({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      style: {
        color: n <= rating ? "var(--ew-gold)" : "var(--ew-gray-mid)",
        fontSize: 14
      },
      children: "★"
    },
    n
  )) });
}
function GoogleReviewsSection() {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "EternaWings",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(AGGREGATE.ratingValue),
      reviewCount: String(AGGREGATE.reviewCount)
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-12 section-alt", "data-ocid": "google_reviews.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: { __html: jsonLd }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-bold text-4xl",
                  style: { color: "var(--ew-text)" },
                  children: AGGREGATE.ratingValue
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: Math.round(AGGREGATE.ratingValue) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-[12px]",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      "Google Reviews · ",
                      AGGREGATE.reviewCount.toLocaleString("en-IN"),
                      "+ ratings"
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: "What our trekkers are saying on Google" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: REVIEWS.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-xl p-5 shadow-card",
          style: { borderLeft: "3px solid var(--ew-gray-lt)" },
          "data-ocid": `google_reviews.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-sm",
                    style: { color: "var(--ew-text)" },
                    children: r.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-[12px]",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      r.city,
                      " · ",
                      r.date
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { rating: r.rating })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-[13px] leading-relaxed",
                style: { color: "var(--ew-text-lt)" },
                children: [
                  '"',
                  r.text,
                  '"'
                ]
              }
            )
          ]
        },
        r.name
      )) })
    ] })
  ] });
}
function ReviewCard({ review }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-none min-w-[280px] max-w-[280px] bg-white rounded-2xl p-5 mx-3 shadow-card border",
      style: { borderColor: "var(--ew-gray-mid)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-2", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: {
              color: n <= review.rating ? "var(--ew-gold)" : "var(--ew-gray-mid)",
              fontSize: 14
            },
            children: "★"
          },
          n
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-[13px] italic leading-relaxed mb-3",
            style: {
              color: "var(--ew-text-lt)",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            },
            children: [
              "“",
              review.review,
              "”"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "font-semibold text-[13px]",
            style: { color: "var(--ew-text)" },
            children: [
              review.author,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-gray-dark)", fontWeight: 400 }, children: [
                " ",
                "· ",
                review.city
              ] })
            ]
          }
        ),
        review.trekBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "mt-2 inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full",
            style: {
              backgroundColor: "var(--ew-orange-lt)",
              color: "var(--ew-red)"
            },
            children: review.trek
          }
        )
      ]
    }
  );
}
function ReviewRow({
  reviews,
  reverse = false
}) {
  const doubled = [...reviews, ...reviews];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "overflow-hidden",
      style: { cursor: "default" },
      onMouseEnter: (e) => {
        const track = e.currentTarget.querySelector(".review-scroll-track");
        if (track instanceof HTMLElement)
          track.style.animationPlayState = "paused";
      },
      onMouseLeave: (e) => {
        const track = e.currentTarget.querySelector(".review-scroll-track");
        if (track instanceof HTMLElement)
          track.style.animationPlayState = "running";
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "review-scroll-track flex",
          style: {
            animation: `reviewScroll 40s linear infinite${reverse ? " reverse" : ""}`,
            willChange: "transform"
          },
          children: doubled.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewCard, { review: r }, `row-${r.id}-${i}`))
        }
      )
    }
  );
}
function HomepageReviews() {
  const sectionRef = reactExports.useRef(null);
  const row1 = REVIEWS$1.slice(0, 12);
  const row2 = REVIEWS$1.slice(12, 24);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: sectionRef,
      className: "py-14 overflow-hidden",
      style: { background: "var(--ew-gray-lt)" },
      "data-ocid": "homepage_reviews.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "What Trekkers Say" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", style: { color: "var(--ew-text-lt)" }, children: "10,000+ adventures · 4.8 ⭐ average · Verified real experiences" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-sm font-bold",
                style: { color: "var(--ew-text)" },
                children: "4.8/5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-gold)", fontSize: 14 }, children: "★" }, n)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[12px] hidden sm:inline",
                style: { color: "var(--ew-gray-dark)" },
                children: "Google Reviews · 2,400+ ratings"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", "data-ocid": "homepage_reviews.row1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewRow, { reviews: row1, reverse: false }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", "data-ocid": "homepage_reviews.row2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewRow, { reviews: row2, reverse: true }) })
      ]
    }
  );
}
const POSTS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    likes: "3.2K",
    caption: "Valley of Flowers in full bloom 🌸"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    likes: "2.1K",
    caption: "Above the clouds at Kedarkantha ❄️"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    likes: "4.5K",
    caption: "Summit vibes — Kedarkantha 3,810m 🏔️"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    likes: "1.8K",
    caption: "Starry nights at Brahmatal ⛺"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&q=80",
    likes: "2.9K",
    caption: "Hampta Pass — two worlds in one 🌄"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
    likes: "3.7K",
    caption: "Mountain town magic 🏘️"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
    likes: "2.3K",
    caption: "Trek trails through deodar forests 🌲"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80",
    likes: "5.1K",
    caption: "First light on Chandratal 🌅"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1587182531610-3d2c7a7d3ece?w=400&q=80",
    likes: "1.6K",
    caption: "Campfire stories under the Milky Way 🌌"
  }
];
function InstaTile({
  post,
  index
}) {
  const [hovered, setHovered] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { delay: index * 0.06 },
      className: "relative overflow-hidden rounded cursor-pointer",
      style: { aspectRatio: "1 / 1" },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      "data-ocid": `instagram.post.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.src,
            alt: post.caption,
            loading: "lazy",
            className: "w-full h-full object-cover transition-transform duration-500",
            style: { transform: hovered ? "scale(1.1)" : "scale(1)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200",
            style: {
              background: "rgba(192,0,28,0.78)",
              opacity: hovered ? 1 : 0
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xl mb-1", children: "❤️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-bold text-sm", children: post.likes }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/80 text-[11px] mt-1 px-2 text-center leading-tight", children: post.caption })
            ]
          }
        )
      ]
    }
  );
}
function InstagramSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-white", "data-ocid": "instagram2.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-7",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading", style: { color: "var(--ew-text)" }, children: "Follow @trekora — Live from the Mountains" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Real moments from real trekkers" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5 max-w-2xl mx-auto mb-5", children: POSTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InstaTile, { post: p, index: i }, p.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: "4.2K followers" }),
        " ",
        "•",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: "850 posts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "https://instagram.com/trekora",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "btn-primary flex items-center gap-2 text-sm",
          "data-ocid": "instagram2.follow_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })
              }
            ),
            "🌿 Follow on Instagram"
          ]
        }
      )
    ] })
  ] }) });
}
const MESSAGES = [
  "Rahul from Mumbai just booked Kedarkantha ✓",
  "Priya from Delhi booked Valley of Flowers ✓",
  "Arjun from Bangalore booked Triund ✓",
  "Sneha from Pune booked Roopkund ✓",
  "Vikram from Chennai booked Hampta Pass ✓",
  "Ananya from Hyderabad booked Char Dham ✓",
  "Rohit from Kolkata booked Brahmatal ✓",
  "Kavita from Ahmedabad booked Kedarnath ✓",
  "Suresh from Jaipur booked Spiti Valley ✓",
  "Meera from Surat booked Sar Pass ✓",
  "Amit from Lucknow booked Pin Parvati Pass ✓",
  "Deepa from Bhopal booked Valley of Flowers ✓",
  "Nikhil from Chandigarh booked Chopta Tungnath ✓",
  "Sunita from Nagpur booked Kedarkantha ✓",
  "Ravi from Indore booked Rupin Pass ✓",
  "Pooja from Coimbatore booked Triund ✓",
  "Sanjay from Patna booked Hampta Pass ✓",
  "Lakshmi from Kochi booked Valley of Flowers ✓",
  "Manish from Vadodara booked Har Ki Dun ✓",
  "Geeta from Visakhapatnam booked Kedarnath ✓"
];
const TICKER_ITEMS = [...MESSAGES, ...MESSAGES];
function SocialProofTicker() {
  const ref = reactExports.useRef(null);
  const { push } = useGTM();
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          push({ event: "social_proof_seen" });
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [push]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: "w-full overflow-hidden py-2",
      style: {
        background: "var(--ew-gray-lt)",
        borderTop: "1px solid var(--ew-gray-mid)",
        borderBottom: "1px solid var(--ew-gray-mid)"
      },
      "data-ocid": "social_proof.ticker",
      "aria-label": "Recent bookings",
      "aria-live": "off",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticker-track", children: TICKER_ITEMS.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex items-center gap-1.5 whitespace-nowrap px-5 text-[13px]",
          style: { color: "var(--ew-text-lt)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex w-5 h-5 rounded-full items-center justify-center text-[10px] font-bold",
                style: { background: "var(--ew-green)", color: "#fff" },
                "aria-hidden": "true",
                children: "✓"
              }
            ),
            msg,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { color: "var(--ew-gray-dark)", margin: "0 10px" },
                "aria-hidden": "true",
                children: "•"
              }
            )
          ]
        },
        i
      )) })
    }
  );
}
const BATCH_DATA = [
  {
    trek: "Roopkund Trek",
    slug: "roopkund-trek",
    date: "Jun 14, 2026",
    duration: "8 Days",
    difficulty: "Moderate-Difficult",
    slots: 3,
    price: 12e3,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Valley of Flowers",
    slug: "valley-of-flowers",
    date: "Jun 28, 2026",
    duration: "6 Days",
    difficulty: "Easy-Moderate",
    slots: 5,
    price: 8500,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Triund Trek",
    slug: "triund-trek",
    date: "Jun 21, 2026",
    duration: "2 Days",
    difficulty: "Easy",
    slots: 12,
    price: 3500,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Rupin Pass",
    slug: "rupin-pass",
    date: "Jun 7, 2026",
    duration: "6 Days",
    difficulty: "Difficult",
    slots: 4,
    price: 11500,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Pangarchulla Peak",
    slug: "pangarchulla-peak",
    date: "May 24, 2026",
    duration: "5 Days",
    difficulty: "Difficult",
    slots: 5,
    price: 10500,
    full: false,
    tab: ["This Month"]
  },
  {
    trek: "Har Ki Dun",
    slug: "har-ki-dun",
    date: "May 30, 2026",
    duration: "6 Days",
    difficulty: "Easy-Moderate",
    slots: 2,
    price: 9500,
    full: false,
    tab: ["This Month"]
  },
  {
    trek: "Hampta Pass",
    slug: "hampta-pass",
    date: "Jul 12, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 6,
    price: 9500,
    full: false,
    tab: ["Next Month", "Summer 2025"]
  },
  {
    trek: "Kheerganga",
    slug: "kheerganga",
    date: "Jun 28, 2026",
    duration: "2 Days",
    difficulty: "Easy",
    slots: 15,
    price: 3e3,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Chandratal Lake",
    slug: "chandratal-lake",
    date: "Jul 19, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 4,
    price: 1e4,
    full: false,
    tab: ["Next Month", "Summer 2025"]
  },
  {
    trek: "Bhrigu Lake",
    slug: "bhrigu-lake",
    date: "Jun 14, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 8500,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Sar Pass",
    slug: "sar-pass",
    date: "Jun 21, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 6,
    price: 9e3,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Beas Kund",
    slug: "beas-kund",
    date: "Jun 28, 2026",
    duration: "4 Days",
    difficulty: "Easy",
    slots: 10,
    price: 7500,
    full: false,
    tab: ["This Month", "Summer 2025"]
  },
  {
    trek: "Pin Parvati Pass",
    slug: "pin-parvati-pass",
    date: "Sep 6, 2026",
    duration: "10 Days",
    difficulty: "Difficult",
    slots: 3,
    price: 16500,
    full: false,
    tab: ["Next Month"]
  },
  {
    trek: "Deo Tibba Base Camp",
    slug: "deo-tibba-base-camp",
    date: "Sep 12, 2026",
    duration: "8 Days",
    difficulty: "Difficult",
    slots: 4,
    price: 14e3,
    full: false,
    tab: ["Next Month"]
  },
  {
    trek: "Char Dham Yatra",
    slug: "char-dham-yatra",
    date: "Sep 6, 2026",
    duration: "12 Days",
    difficulty: "Easy-Moderate",
    slots: 6,
    price: 28e3,
    full: false,
    tab: ["Next Month"]
  },
  {
    trek: "Kedarnath Yatra",
    slug: "kedarnath-yatra",
    date: "Sep 13, 2026",
    duration: "4 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 9500,
    full: false,
    tab: ["Next Month"]
  },
  {
    trek: "Chopta Tungnath",
    slug: "chopta-tungnath-chandrashila",
    date: "Oct 11, 2026",
    duration: "3 Days",
    difficulty: "Easy-Moderate",
    slots: 8,
    price: 7e3,
    full: false,
    tab: ["Winter 2025/26"]
  },
  {
    trek: "Deoriatal-Chandrashila",
    slug: "deoriatal-chandrashila",
    date: "Oct 4, 2026",
    duration: "4 Days",
    difficulty: "Easy-Moderate",
    slots: 9,
    price: 7e3,
    full: false,
    tab: ["Winter 2025/26"]
  },
  {
    trek: "Kedarkantha Trek",
    slug: "kedarkantha-trek",
    date: "Dec 5, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 8,
    price: 8500,
    full: false,
    tab: ["Winter 2025/26"]
  },
  {
    trek: "Brahmatal Trek",
    slug: "brahmatal-trek",
    date: "Dec 20, 2026",
    duration: "5 Days",
    difficulty: "Moderate",
    slots: 10,
    price: 9e3,
    full: false,
    tab: ["Winter 2025/26"]
  }
];
const TABS = [
  "All",
  "This Month",
  "Next Month",
  "Summer 2025",
  "Winter 2025/26"
];
function SlotsCell({ slots }) {
  if (slots <= 3)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-bold", style: { color: "#C0001C" }, children: [
      "Only ",
      slots,
      " seat",
      slots === 1 ? "" : "s",
      " left!"
    ] });
  if (slots <= 5)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold", style: { color: "#E87722" }, children: [
      slots,
      " seats — filling fast"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-semibold", style: { color: "#16a34a" }, children: [
    slots,
    " seats available"
  ] });
}
function UpcomingBatchesSection() {
  const [activeTab, setActiveTab] = reactExports.useState("All");
  const [showAll, setShowAll] = reactExports.useState(false);
  const filtered = activeTab === "All" ? BATCH_DATA : BATCH_DATA.filter((b) => b.tab.includes(activeTab));
  const visible = showAll ? filtered : filtered.slice(0, 10);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-12",
      style: { background: "var(--ew-gray-lt)" },
      "data-ocid": "batches2.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Upcoming Batch Dates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Book your spot — seats fill up weeks in advance" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-0 overflow-x-auto scrollbar-hide border-b mb-5",
            style: { borderColor: "var(--ew-gray-mid)" },
            children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setActiveTab(tab);
                  setShowAll(false);
                },
                className: `px-4 py-2.5 text-[13px] font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "tab-active" : ""}`,
                style: activeTab !== tab ? { color: "var(--ew-gray-dark)" } : {},
                "data-ocid": `batches2.tab.${tab.toLowerCase().replace(/[\s/]+/g, "_")}`,
                children: tab
              },
              tab
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto rounded-xl overflow-hidden shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "tr",
            {
              style: {
                background: "#1A1A2E",
                color: "#fff"
              },
              children: [
                "Trek / Yatra",
                "Next Batch",
                "Duration",
                "Difficulty",
                "Slots",
                "Price",
                ""
              ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "py-3 px-4 text-left text-[12px] font-semibold uppercase tracking-wide",
                  children: h
                },
                h
              ))
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visible.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "transition-colors",
              style: {
                background: i % 2 === 0 ? "#fff" : "#F5F5F5",
                borderBottom: "1px solid var(--ew-gray-mid)"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "#FFF0E0";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#F5F5F5";
              },
              "data-ocid": `batches2.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "py-3 px-4 font-semibold",
                    style: { color: "var(--ew-text)" },
                    children: b.trek
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "py-3 px-4",
                    style: { color: "var(--ew-text-lt)" },
                    children: b.date
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "py-3 px-4",
                    style: { color: "var(--ew-text-lt)" },
                    children: b.duration
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                    style: {
                      background: b.difficulty.includes("Easy") ? "#dcfce7" : b.difficulty === "Moderate" ? "#fef3c7" : "#fee2e2",
                      color: b.difficulty.includes("Easy") ? "#16a34a" : b.difficulty === "Moderate" ? "#92400e" : "#991b1b"
                    },
                    children: b.difficulty
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SlotsCell, { slots: b.slots }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: "py-3 px-4 font-bold text-[15px]",
                    style: { color: "var(--ew-orange)" },
                    children: [
                      "₹",
                      b.price.toLocaleString("en-IN")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/book",
                    className: "text-[12px] font-semibold px-4 py-2 rounded-lg whitespace-nowrap text-white transition-opacity hover:opacity-90",
                    style: { background: "#E87722" },
                    "data-ocid": `batches2.book_button.${i + 1}`,
                    children: "Book Now"
                  }
                ) })
              ]
            },
            `${b.trek}-${b.date}`
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden space-y-3", children: visible.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-white rounded-xl p-4 shadow-card",
            "data-ocid": `batches2.mobile_card.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-[14px]",
                    style: { color: "var(--ew-text)" },
                    children: b.trek
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[11px] font-bold",
                    style: { color: "var(--ew-orange)" },
                    children: [
                      "₹",
                      b.price.toLocaleString("en-IN")
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-wrap gap-x-4 gap-y-1 text-[12px] mb-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📅 ",
                      b.date
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "⏱ ",
                      b.duration
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "🏔 ",
                      b.difficulty
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SlotsCell, { slots: b.slots }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/book",
                    className: "text-[12px] font-semibold px-4 py-1.5 rounded-lg text-white",
                    style: { background: "#E87722" },
                    "data-ocid": `batches2.mobile_book_button.${i + 1}`,
                    children: "Book Now"
                  }
                )
              ] })
            ]
          },
          `${b.trek}-${b.date}`
        )) }),
        filtered.length > 10 && !showAll && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowAll(true),
            className: "btn-secondary",
            style: { borderColor: "var(--ew-red)", color: "var(--ew-red)" },
            "data-ocid": "batches2.show_more_button",
            children: [
              "Show All ",
              filtered.length,
              " Batches ↓"
            ]
          }
        ) })
      ] })
    }
  );
}
const YOUTUBE_VIDEOS = [
  {
    id: "mxXE-mW7bKo",
    title: "Roopkund Trek — The Skeleton Lake",
    channel: "Trekora Official",
    views: "1.2M views",
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&q=80"
  },
  {
    id: "2Gj4Dsp3hOM",
    title: "Valley of Flowers — UNESCO Paradise",
    channel: "Uttarakhand Tourism",
    views: "980K views",
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80"
  },
  {
    id: "LfYFrYdPkF0",
    title: "Kedarnath Yatra 2024",
    channel: "Dev Bhoomi Stories",
    views: "2.1M views",
    thumb: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=640&q=80"
  }
];
const REELS = [
  {
    id: 1,
    thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    title: "5 Days at 5000m Roopkund",
    duration: "0:58"
  },
  {
    id: 2,
    thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
    title: "Valley of Flowers Time-lapse",
    duration: "1:12"
  },
  {
    id: 3,
    thumb: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80",
    title: "Kedarnath Trek Guide",
    duration: "2:30"
  },
  {
    id: 4,
    thumb: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=300&q=80",
    title: "Hampta Pass Day 3",
    duration: "1:45"
  },
  {
    id: 5,
    thumb: "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=300&q=80",
    title: "Triund Sunrise",
    duration: "0:45"
  },
  {
    id: 6,
    thumb: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=300&q=80",
    title: "Chandratal Lake Drone",
    duration: "1:20"
  }
];
function YouTubeSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-14",
      style: { background: "#F5F5F5" },
      "data-ocid": "youtube.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "mb-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Experience the Himalayas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Real trek footage from our guides and trekkers" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10", children: YOUTUBE_VIDEOS.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: "rounded-xl overflow-hidden shadow-card",
            "data-ocid": `youtube.embed.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", style: { aspectRatio: "16/9" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "iframe",
                {
                  width: "100%",
                  height: "100%",
                  src: `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`,
                  title: v.title,
                  loading: "lazy",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: true,
                  style: {
                    border: 0,
                    display: "block",
                    width: "100%",
                    height: "100%"
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-[14px] line-clamp-1 mb-0.5",
                    style: { color: "var(--ew-text)" },
                    children: v.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-[12px]",
                    style: { color: "var(--ew-text-lt)" },
                    children: [
                      v.channel,
                      " · ",
                      v.views
                    ]
                  }
                )
              ] })
            ]
          },
          v.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-[17px] mb-4",
              style: { color: "var(--ew-text)" },
              children: "Reels & Shorts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto scrollbar-hide pb-2", children: REELS.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { delay: i * 0.07 },
              className: "flex-none relative rounded-xl overflow-hidden group cursor-pointer",
              style: { width: 110, aspectRatio: "9/16" },
              "data-ocid": `youtube.reel.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: r.thumb,
                    alt: r.title,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform",
                    style: { background: "rgba(255,255,255,0.9)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Play,
                      {
                        size: 14,
                        className: "ml-0.5",
                        style: { color: "#C0001C" },
                        fill: "#C0001C"
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded",
                    style: { background: "rgba(0,0,0,0.6)", color: "#fff" },
                    children: r.duration
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "absolute bottom-2 left-0 right-0 text-center text-white text-[9px] font-bold px-1 leading-tight", children: r.title })
              ]
            },
            r.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://www.youtube.com/@trekora",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn-primary flex items-center gap-2",
            style: { background: "#C0001C", borderColor: "#C0001C" },
            "data-ocid": "youtube.subscribe_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" })
                }
              ),
              "Subscribe to Trekora"
            ]
          }
        ) })
      ] })
    }
  );
}
const HERO_SETS = [
  {
    left: {
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
      title: "Roopkund Trek",
      subtitle: "The Skeleton Lake Awaits",
      cta: "Explore Now",
      ctaLink: "/treks/roopkund-trek"
    },
    right: [
      {
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&q=80",
        title: "Char Dham Yatra 2025",
        subtitle: "Sacred Journey · Limited Spots",
        cta: "Book Yatra",
        ctaLink: "/yatras/char-dham-yatra"
      },
      {
        image: "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=700&q=80",
        title: "Triund Weekend Trek",
        subtitle: "2 Days from ₹3,500",
        cta: "View Package",
        ctaLink: "/treks/triund-trek"
      },
      {
        image: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=700&q=80",
        title: "Hampta Pass",
        subtitle: "Two Worlds in 5 Days",
        cta: "Book Now",
        ctaLink: "/treks/hampta-pass"
      }
    ]
  },
  {
    left: {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
      title: "Valley of Flowers",
      subtitle: "A Bloom Like No Other",
      cta: "Explore",
      ctaLink: "/treks/valley-of-flowers"
    },
    right: [
      {
        image: "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=700&q=80",
        title: "Kedarnath Dham",
        subtitle: "Divine Journey · Book Early",
        cta: "Book Now",
        ctaLink: "/yatras/char-dham-yatra"
      },
      {
        image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=700&q=80",
        title: "Spiti Valley",
        subtitle: "The Last Horizon",
        cta: "Explore",
        ctaLink: "/treks/spiti-valley-trek"
      },
      {
        image: "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=700&q=80",
        title: "Mani Mahesh Yatra",
        subtitle: "Sacred Circuit · 9 Days",
        cta: "View Details",
        ctaLink: "/yatras/mani-mahesh-yatra"
      }
    ]
  },
  {
    left: {
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
      title: "Brahmatal Winter Trek",
      subtitle: "Frozen Wonderland Awaits",
      cta: "Book Winter Trek",
      ctaLink: "/treks/brahmatal-trek"
    },
    right: [
      {
        image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=700&q=80",
        title: "Chandratal Lake",
        subtitle: "The Moon Lake · 5 Days",
        cta: "View Package",
        ctaLink: "/treks/chandratal-lake-trek"
      },
      {
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80",
        title: "Pin Parvati Pass",
        subtitle: "India's Most Challenging Crossing",
        cta: "Explore",
        ctaLink: "/treks/pin-parvati-pass"
      },
      {
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=80",
        title: "Kinnaur Kailash Yatra",
        subtitle: "Parikrama of the Gods",
        cta: "Book Yatra",
        ctaLink: "/yatras/kinnaur-kailash-yatra"
      }
    ]
  }
];
const UK_DESTINATIONS = [
  {
    name: "Roopkund",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    price: "₹12,000",
    slug: "roopkund-trek"
  },
  {
    name: "Valley of Flowers",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    price: "₹8,500",
    slug: "valley-of-flowers"
  },
  {
    name: "Kedarnath",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80",
    price: "₹9,999",
    slug: "kedarnath-trek"
  },
  {
    name: "Brahmatal",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    price: "₹7,500",
    slug: "brahmatal-trek"
  },
  {
    name: "Rupin Pass",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80",
    price: "₹11,000",
    slug: "rupin-pass-trek"
  },
  {
    name: "Har Ki Dun",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    price: "₹8,000",
    slug: "har-ki-dun-trek"
  }
];
const HP_DESTINATIONS = [
  {
    name: "Triund",
    image: "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=400&q=80",
    price: "₹3,500",
    slug: "triund-trek"
  },
  {
    name: "Hampta Pass",
    image: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=400&q=80",
    price: "₹9,500",
    slug: "hampta-pass"
  },
  {
    name: "Chandratal Lake",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&q=80",
    price: "₹10,000",
    slug: "chandratal-lake-trek"
  },
  {
    name: "Sar Pass",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    price: "₹8,000",
    slug: "sar-pass-trek"
  },
  {
    name: "Pin Parvati Pass",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    price: "₹18,000",
    slug: "pin-parvati-pass"
  },
  {
    name: "Spiti Valley",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80",
    price: "₹14,000",
    slug: "spiti-valley-trek"
  }
];
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    trek: "Kedarkantha Trek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    review: "Absolutely magical winter experience! The guides were extremely knowledgeable and safety-conscious. Waking up to a snow-covered tent was surreal. Trekora made every moment count."
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    trek: "Roopkund Trek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    review: "The Roopkund trek was the most challenging yet rewarding experience of my life. The team handled everything perfectly — from food to tents to safety. The skeleton lake view was worth every step!"
  },
  {
    name: "Ananya Krishnan",
    city: "Bangalore",
    trek: "Valley of Flowers",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    review: "Heaven on earth! 500 species of flowers in full bloom. I had zero trekking experience and the guides were incredibly patient. Already planning Hampta Pass next season."
  },
  {
    name: "Amit Patel",
    city: "Ahmedabad",
    trek: "Hampta Pass",
    rating: 5,
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80",
    review: "Two completely different landscapes in one trek is mind-blowing. Lush Kullu valley to barren Spiti — the contrast is unreal. Excellent guide, excellent food, excellent memories!"
  },
  {
    name: "Sneha Reddy",
    city: "Hyderabad",
    trek: "Triund Trek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    review: "Perfect first trek! The Dhauladhar range at sunset is something I will never forget. Small group made it very comfortable. Will definitely book a longer trek with Trekora."
  },
  {
    name: "Vikram Singh",
    city: "Jaipur",
    trek: "Char Dham Yatra",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    review: "Spiritual journey of a lifetime. The team arranged everything perfectly — from permits to darshan at each dham. Highly recommended for anyone seeking divine blessings."
  },
  {
    name: "Meera Nair",
    city: "Kochi",
    trek: "Brahmatal Trek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    review: "Brahmatal in winter is surreal. Frozen lake, snow-capped peaks, cozy camps. The team's professionalism gave me full confidence throughout. Will definitely come back!"
  },
  {
    name: "Arun Kapoor",
    city: "Pune",
    trek: "Kedarnath Trek",
    rating: 5,
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&q=80",
    review: "Trekora transformed my Kedarnath trip into an adventure. The trail guidance, local knowledge, and hospitality were second to none. Spiritual and thrilling at once."
  }
];
const BATCHES = [
  {
    trek: "Roopkund Trek",
    dates: "15–23 May 2025",
    duration: "8D/7N",
    slots: 4,
    price: 12e3,
    full: false
  },
  {
    trek: "Valley of Flowers",
    dates: "1–7 Aug 2025",
    duration: "6D/5N",
    slots: 0,
    price: 8500,
    full: true
  },
  {
    trek: "Triund Trek",
    dates: "20–22 Apr 2025",
    duration: "2D/1N",
    slots: 8,
    price: 3500,
    full: false
  },
  {
    trek: "Hampta Pass",
    dates: "10–15 Jun 2025",
    duration: "5D/4N",
    slots: 3,
    price: 9500,
    full: false
  },
  {
    trek: "Kedarkantha Trek",
    dates: "5–11 Jan 2026",
    duration: "6D/5N",
    slots: 6,
    price: 7500,
    full: false
  },
  {
    trek: "Brahmatal Trek",
    dates: "8–14 Feb 2026",
    duration: "6D/5N",
    slots: 0,
    price: 7500,
    full: true
  }
];
const WHY_CHOOSE = [
  {
    icon: Shield,
    title: "NCISM-Certified Guides",
    desc: "Every guide is NCISM & IMF certified with 5+ years of high-altitude experience."
  },
  {
    icon: Users,
    title: "Small Groups (Max 12)",
    desc: "Intimate batches for a personalized, safe, and memorable trekking experience."
  },
  {
    icon: Zap,
    title: "24/7 Emergency Support",
    desc: "Round-the-clock coordination team and emergency evacuation network on standby."
  },
  {
    icon: Leaf,
    title: "Eco-Responsible Trekking",
    desc: "Leave No Trace certified operations. We protect the mountains we explore."
  },
  {
    icon: RotateCcw,
    title: "Flexible Cancellation",
    desc: "Full refund 30 days prior. 50% refund up to 15 days. Plans change — we get it."
  },
  {
    icon: CreditCard,
    title: "EMI & Easy Payments",
    desc: "Pay 30% advance to book. Balance in easy EMIs via Razorpay, UPI, Net Banking."
  }
];
const SEASON_TREKS = {
  Summer: [
    "valley-of-flowers",
    "roopkund-trek",
    "har-ki-dun",
    "kedarkantha-trek"
  ],
  Monsoon: ["valley-of-flowers", "kheerganga", "hampta-pass", "beas-kund"],
  Autumn: [
    "roopkund-trek",
    "pangarchulla-peak",
    "chandratal-lake",
    "kedarnath-trek"
  ],
  Winter: [
    "kedarkantha-trek",
    "triund-trek",
    "brahmatal-trek",
    "deoriatal-chandrashila"
  ]
};
const SEASON_META = {
  Summer: {
    emoji: "☀️",
    months: "Apr–Jun",
    desc: "Crisp alpine air, wildflowers blooming across meadows, snow still on high passes. Ideal for most Himalayan treks — Valley of Flowers (UNESCO meadows), Roopkund (skeleton lake visible), Kedarkantha summit, Har Ki Dun valley.",
    temp: "10–22°C in valleys, –5 to 5°C at camps above 4,000m",
    conditions: "Clear skies, snow bridges on passes, wildflower meadows"
  },
  Monsoon: {
    emoji: "🌧️",
    months: "Jul–Aug",
    desc: "Dramatic cloud formations, roaring waterfalls, rhododendrons and Brahma Kamal in peak bloom. Valley of Flowers is exclusively a monsoon trek — UNESCO meadows burst with 300+ wildflower species. Lower crowds, mystical mist.",
    temp: "15–25°C at valley altitudes",
    conditions: "Lush greenery, leeches in lower sections, mist-covered peaks"
  },
  Autumn: {
    emoji: "🍂",
    months: "Sep–Oct",
    desc: "Crystal clear skies, fresh mountain air post-monsoon, views extending 300km. Best season for summit treks — Kedarkantha (3,800m), Pangarchulla, Brahmatal lake. Char Dham yatra season ends October. Peak season for photography.",
    temp: "5–18°C, nights cold at altitude",
    conditions: "Crystal clear visibility, stable weather, best for photography"
  },
  Winter: {
    emoji: "❄️",
    months: "Nov–Mar",
    desc: "Snow-covered trails, frozen lakes, ethereal silence. Kedarkantha is India's best winter trek (snow guaranteed). Triund, Kheerganga accessible with warm gear. Most Himalayan temples closed — but the snow landscapes are breathtaking.",
    temp: "–5 to 10°C in lower sections, –15 to –20°C at high camps",
    conditions: "Heavy snowfall, frozen lakes, very cold nights"
  }
};
function AnimatedCounter({
  end,
  suffix,
  started
}) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!started) return;
    const duration = 2e3;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "counter-number", children: [
    count.toLocaleString(),
    suffix
  ] });
}
function HeroBannerGrid() {
  const [setIdx, setSetIdx] = reactExports.useState(0);
  const [visible, setVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSetIdx((prev) => (prev + 1) % HERO_SETS.length);
        setVisible(true);
      }, 400);
    }, 4e3);
    return () => clearInterval(timer);
  }, []);
  const set = HERO_SETS[setIdx];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "w-full",
      "data-ocid": "hero.section",
      style: { background: "#111", position: "relative" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "container mx-auto px-4 py-4",
          style: {
            opacity: visible ? 1 : 0,
            transition: "opacity 0.4s ease",
            /* Fixed height prevents any layout shift that could trigger scroll restoration */
            minHeight: 520
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid gap-2",
                style: {
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "auto",
                  /* Prevent height change on content swap */
                  height: "100%"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative rounded-lg overflow-hidden",
                      style: { minHeight: 280, height: "clamp(280px, 50vw, 420px)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: set.left.image,
                            alt: set.left.title,
                            className: "w-full h-full object-cover absolute inset-0",
                            style: { minHeight: 420 }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-xs uppercase tracking-widest mb-1", children: "Trekora Featured" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-2xl md:text-3xl mb-1 text-shadow", children: set.left.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm mb-4 text-shadow", children: set.left.subtitle }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Link,
                            {
                              to: "/treks",
                              className: "btn-primary text-sm",
                              "data-ocid": "hero.left_cta",
                              children: set.left.cta
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex flex-col gap-2",
                      style: { height: "clamp(280px, 50vw, 420px)" },
                      children: set.right.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "relative rounded-lg overflow-hidden flex-1",
                          style: { minHeight: 128 },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "img",
                              {
                                src: b.image,
                                alt: b.title,
                                className: "w-full h-full object-cover absolute inset-0"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-center px-4", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-base leading-tight text-shadow", children: b.title }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-xs mb-2 text-shadow", children: b.subtitle }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Link,
                                {
                                  to: "/treks",
                                  className: "btn-primary text-xs py-1 px-3",
                                  style: { width: "fit-content" },
                                  "data-ocid": `hero.right_cta.${i + 1}`,
                                  children: b.cta
                                }
                              )
                            ] })
                          ]
                        },
                        b.title
                      ))
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-3", children: HERO_SETS.map((heroSet, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSetIdx(i),
                "aria-label": `Banner set ${i + 1}`,
                className: "rounded-full transition-all",
                style: {
                  width: i === setIdx ? 24 : 8,
                  height: 8,
                  background: i === setIdx ? "var(--ew-orange)" : "var(--ew-gray-mid)"
                }
              },
              heroSet.left.title
            )) })
          ]
        }
      )
    }
  );
}
const TRUST_ITEMS = [
  "Certified Mountain Guides",
  "Pioneers of Himalayan Trekking",
  "Trusted for 15 Years",
  "Safe Travel for Every Age",
  "Fully Customizable Packages",
  "India's Favourite Trek Partner",
  "40+ Unique Trek Experiences",
  "10,000+ Happy Trekkers"
];
function TrustMarquee() {
  const items = TRUST_ITEMS.map((t, i) => ({ text: t, key: `a${i}` })).concat(
    TRUST_ITEMS.map((t, i) => ({ text: t, key: `b${i}` }))
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "marquee-container py-3",
      style: { background: "var(--ew-gray-lt)" },
      "data-ocid": "trust.section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex items-center gap-2 whitespace-nowrap px-5 text-[13px]",
          style: { color: "var(--ew-text-lt)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
                    fill: "var(--ew-red)",
                    stroke: "none"
                  }
                )
              }
            ),
            item.text,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-gray-dark)", margin: "0 8px" }, children: "•" })
          ]
        },
        item.key
      )) })
    }
  );
}
const STATS = [
  { end: 1e3, suffix: "+", label: "International Packages" },
  { end: 300, suffix: "+", label: "Domestic Treks" },
  { end: 3e3, suffix: "+", label: "Trusted Hotels" },
  { end: 15, suffix: "+", label: "Years Experience" }
];
function StatsSection() {
  const ref = reactExports.useRef(null);
  const [started, setStarted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "bg-white", "data-ocid": "stats.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4", children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "py-8 px-4 text-center border-b-4",
      style: { borderBottomColor: "var(--ew-red)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AnimatedCounter,
          {
            end: s.end,
            suffix: s.suffix,
            started
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-[13px] mt-1",
            style: { color: "var(--ew-text-lt)" },
            children: s.label
          }
        )
      ]
    },
    s.label
  )) }) }) });
}
function TrekCarousel({ treks, id }) {
  const scrollRef = reactExports.useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth"
      });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => scroll("left"),
        "aria-label": "Scroll left",
        "data-ocid": `${id}.carousel_prev`,
        className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 w-9 h-9 rounded-full flex items-center justify-center shadow-elevated transition-all hover:scale-110",
        style: { background: "var(--ew-orange)", color: "#fff" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1",
        style: { scrollSnapType: "x mandatory" },
        children: treks.map((trek, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-none w-[85vw] sm:w-64 md:w-56",
            style: { scrollSnapAlign: "start" },
            "data-ocid": `${id}.card.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek, index: i })
          },
          trek.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => scroll("right"),
        "aria-label": "Scroll right",
        "data-ocid": `${id}.carousel_next`,
        className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 w-9 h-9 rounded-full flex items-center justify-center shadow-elevated transition-all hover:scale-110",
        style: { background: "var(--ew-orange)", color: "#fff" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
      }
    )
  ] });
}
function DestGrid({
  items,
  prefix
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: items.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/treks/$slug",
      params: { slug: d.slug },
      className: "group relative rounded-lg overflow-hidden",
      style: { aspectRatio: "4/3" },
      "data-ocid": `${prefix}.dest.${i + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: d.image,
            alt: d.name,
            className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-xs leading-tight", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "font-bold text-[11px]",
              style: { color: "var(--ew-orange)" },
              children: [
                "from ",
                d.price
              ]
            }
          )
        ] })
      ]
    },
    d.slug
  )) });
}
const YATRA_ICONS = ["🕉️", "⛰️", "🙏", "🏔️", "🌿", "✨"];
function YatraCard({ yatra, idx }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/yatras/$slug",
      params: { slug: yatra.slug },
      className: "flex-none w-52 bg-white rounded-lg overflow-hidden shadow-card flex flex-col",
      "data-ocid": `yatras.card.${idx + 1}`,
      style: { scrollSnapAlign: "start", textDecoration: "none" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-28", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: yatra.image,
              alt: yatra.name,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl mb-1", children: YATRA_ICONS[idx % YATRA_ICONS.length] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-[14px] leading-snug mb-1",
              style: { color: "var(--ew-red)" },
              children: yatra.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "text-[11px] mb-1",
              style: { color: "var(--ew-gray-dark)" },
              children: [
                yatra.duration,
                " Days · ",
                yatra.startPoint
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "p",
            {
              className: "font-bold text-[14px] mt-auto",
              style: { color: "var(--ew-orange)" },
              children: [
                "from ₹",
                yatra.price.toLocaleString("en-IN")
              ]
            }
          )
        ] })
      ]
    }
  );
}
function SectionTitle({
  children,
  center = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h2",
    {
      className: "section-title",
      style: center ? { display: "block", textAlign: "center", paddingBottom: 12 } : {},
      children
    }
  );
}
const FILTER_TABS = [
  { label: "All", value: "All" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Easy", value: "Easy" },
  { label: "Moderate", value: "Moderate" },
  { label: "Difficult", value: "Difficult" },
  { label: "Budget <Rs.8K", value: "Budget" },
  { label: "Premium >Rs.15K", value: "Premium" }
];
function RecommendedSection() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const scrollRef = reactExports.useRef(null);
  const filtered = TREKS.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Uttarakhand") return t.state === "uttarakhand";
    if (activeFilter === "Himachal Pradesh") return t.state === "himachal";
    if (activeFilter === "Easy") return t.difficulty.startsWith("Easy");
    if (activeFilter === "Moderate") return t.difficulty.includes("Moderate");
    if (activeFilter === "Difficult")
      return t.difficulty.includes("Difficult") || t.difficulty === "Extreme";
    if (activeFilter === "Budget") return t.price < 8e3;
    if (activeFilter === "Premium") return t.price > 15e3;
    return true;
  }).slice(0, 16);
  const scroll = (dir) => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth"
      });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-white", "data-ocid": "recommended.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "flex items-end justify-between mb-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Recommended Treks & Packages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Handpicked experiences for every kind of trekker" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/treks",
              className: "text-sm font-semibold flex items-center gap-1 whitespace-nowrap",
              style: { color: "var(--ew-red)" },
              "data-ocid": "recommended.view_all_link",
              children: [
                "View All 40+ Packages ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-hide pb-3 mb-4", children: FILTER_TABS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setActiveFilter(f.value),
        className: "flex-none text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap border",
        style: activeFilter === f.value ? {
          background: "#C0001C",
          color: "#fff",
          borderColor: "#C0001C"
        } : { background: "#fff", color: "#555", borderColor: "#ddd" },
        "data-ocid": `recommended.filter.${f.value.toLowerCase().replace(/[\s<>/.]+/g, "_")}`,
        children: f.label
      },
      f.value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => scroll("left"),
          "aria-label": "Scroll left",
          className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border",
          style: { borderColor: "var(--ew-gray-mid)" },
          "data-ocid": "recommended.carousel_prev",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16, style: { color: "var(--ew-red)" } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: scrollRef,
          className: "flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1",
          style: { scrollSnapType: "x mandatory" },
          children: filtered.map((trek, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-none w-[85vw] sm:w-64 md:w-56",
              style: { scrollSnapAlign: "start" },
              "data-ocid": `recommended.card.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCard, { trek, index: i })
            },
            trek.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => scroll("right"),
          "aria-label": "Scroll right",
          className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border",
          style: { borderColor: "var(--ew-gray-mid)" },
          "data-ocid": "recommended.carousel_next",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, style: { color: "var(--ew-red)" } })
        }
      )
    ] })
  ] }) });
}
function HomePage() {
  const [season, setSeason] = reactExports.useState("Summer");
  const seasonMeta = SEASON_META[season];
  const [batchTab, setBatchTab] = reactExports.useState("This Month");
  const yatrasScrollRef = reactExports.useRef(null);
  const [newsEmail, setNewsEmail] = reactExports.useState("");
  const [newsSubmitted, setNewsSubmitted] = reactExports.useState(false);
  const seasonTreks = SEASON_TREKS[season].map((slug) => TREKS.find((t) => t.slug === slug)).filter(Boolean);
  TREKS.filter((t) => t.isFeatured).slice(0, 12);
  const batchTabs = ["This Month", "Next 3 Months", "Summer 2025", "All"];
  const visibleBatches = BATCHES.slice(0, 6);
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHead,
      {
        title: "Trekora — Himalayan Treks & Yatras | Book Expert-Led Treks in India",
        description: "Trekora offers 40+ guided Himalayan treks and sacred yatras in Uttarakhand and Himachal Pradesh. Certified guides, all-inclusive packages, Razorpay booking. Roopkund, Kedarnath, Valley of Flowers and more.",
        keywords: "Himalayan treks, trekking in India, Uttarakhand trek, Himachal trek, Char Dham yatra, book trek online, Trekora, Roopkund trek, Valley of Flowers",
        canonical: "https://www.trekora.com",
        schema: [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Trekora",
            url: "https://www.trekora.com",
            logo: "https://www.trekora.com/logo.png",
            description: "India's premier Himalayan trekking and yatra company. 40+ treks, 11 yatras across Uttarakhand and Himachal Pradesh.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-1800-000-0000",
              contactType: "customer service",
              availableLanguage: ["English", "Hindi"]
            },
            sameAs: [
              "https://www.instagram.com/trekora",
              "https://www.facebook.com/trekora",
              "https://www.youtube.com/c/trekora"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Trekora",
            url: "https://www.trekora.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.trekora.com/treks?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroBannerGrid, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SocialProofTicker, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-5 shadow-card", "data-ocid": "search.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[130px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s-dest",
              className: "block text-[11px] font-semibold uppercase tracking-wide mb-1",
              style: { color: "var(--ew-text-lt)" },
              children: "Trek Destination"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "s-dest",
              className: "w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none",
              style: { borderColor: "var(--ew-gray-mid)" },
              "data-ocid": "search.destination.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All Destinations ▼" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Uttarakhand" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Himachal Pradesh" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s-type",
              className: "block text-[11px] font-semibold uppercase tracking-wide mb-1",
              style: { color: "var(--ew-text-lt)" },
              children: "Trek Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "s-type",
              className: "w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none",
              style: { borderColor: "var(--ew-gray-mid)" },
              "data-ocid": "search.type.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Trek Type ▼" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Snow Trek" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Alpine Trek" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Yatra" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Weekend Trek" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s-diff",
              className: "block text-[11px] font-semibold uppercase tracking-wide mb-1",
              style: { color: "var(--ew-text-lt)" },
              children: "Difficulty"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "s-diff",
              className: "w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none",
              style: { borderColor: "var(--ew-gray-mid)" },
              "data-ocid": "search.difficulty.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Difficulty ▼" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Easy" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Moderate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Difficult" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Extreme" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[120px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s-month",
              className: "block text-[11px] font-semibold uppercase tracking-wide mb-1",
              style: { color: "var(--ew-text-lt)" },
              children: "Month of Travel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "s-month",
              className: "w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none",
              style: { borderColor: "var(--ew-gray-mid)" },
              "data-ocid": "search.month.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Month ▼" }),
                [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec"
                ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: m }, m))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[110px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s-people",
              className: "block text-[11px] font-semibold uppercase tracking-wide mb-1",
              style: { color: "var(--ew-text-lt)" },
              children: "No. of People"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "s-people",
              className: "w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none",
              style: { borderColor: "var(--ew-gray-mid)" },
              "data-ocid": "search.people.select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "1 Person" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "2 People" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "3–5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "6–10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "10+" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/treks",
            className: "btn-primary flex items-center gap-1.5 whitespace-nowrap",
            "data-ocid": "search.submit_button",
            children: "🔍 Search Treks"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[12px]",
            style: { color: "var(--ew-gray-dark)" },
            children: "Popular Searches:"
          }
        ),
        [
          "Kedarnath",
          "Roopkund",
          "Triund",
          "Hampta Pass",
          "Char Dham",
          "Valley of Flowers",
          "Spiti"
        ].map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/treks",
            className: "text-[12px] px-3 py-1 rounded-full transition-colors hover:text-white",
            style: {
              background: "var(--ew-gray-lt)",
              color: "var(--ew-text-lt)"
            },
            "data-ocid": `search.tag.${tag.toLowerCase().replace(/\s+/g, "_")}`,
            children: tag
          },
          tag
        ))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustMarquee, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RecommendedSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "uttarakhand.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:w-[55%]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Trending Uttarakhand Treks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-sm leading-relaxed mt-4 space-y-3",
                style: { color: "var(--ew-text-lt)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Uttarakhand, known as the "Land of Gods" (Devbhumi), is home to some of the most spectacular trekking trails in the world. Nestled in the western Himalayas, this state offers trekkers an unparalleled combination of dramatic high-altitude landscapes, ancient temples, sacred rivers, and vibrant local culture.' }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "From the mystical Roopkund Skeleton Lake at 5,029m to the UNESCO-listed Valley of Flowers blooming with 500+ alpine species, Uttarakhand's trails cater to every level — weekend escapes like Chopta Tungnath to epic multi-week expeditions like Milam Glacier or Nanda Devi Base Camp." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Garhwal and Kumaon regions each have distinct characters — Garhwal boasts iconic pilgrimage treks and high passes, while Kumaon's trails wind through oak forests, terraced farms, and hidden valleys unspoiled by mass tourism. Har Ki Dun, called the Valley of the Gods, is one of the few places on earth where Hindu mythology and breathtaking natural beauty converge." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/treks",
                  className: "btn-primary",
                  "data-ocid": "uttarakhand.view_all_button",
                  children: "View All Packages"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/destinations",
                  className: "btn-secondary",
                  "data-ocid": "uttarakhand.destinations_button",
                  children: "Explore Destinations"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:w-[45%] w-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DestGrid, { items: UK_DESTINATIONS, prefix: "uttarakhand" })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-white", "data-ocid": "himachal.section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-10 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:w-[45%] w-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(DestGrid, { items: HP_DESTINATIONS, prefix: "himachal" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:w-[55%]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Trending Himachal Pradesh Treks" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-sm leading-relaxed mt-4 space-y-3",
                style: { color: "var(--ew-text-lt)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Himachal Pradesh is the crown jewel of India's trekking universe — a land of contrasts where lush green Kullu Valley meets the stark moonscapes of Spiti, where pine forests give way to ancient Buddhist monasteries perched at impossible heights, and where every mountain pass opens onto a landscape you've never imagined before." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Triund Trail from McLeod Ganj offers trekkers a perfect weekend escape with panoramic Dhauladhar views, while Hampta Pass delivers one of India's most dramatic landscape transitions — from green Manali meadows to the barren, mythical Spiti desert in just five days. For those seeking extremes, Pin Parvati Pass at 5,319m is considered one of Asia's most challenging high-altitude crossings." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: `Himachal's Spiti Valley — sometimes called "Little Tibet" — is a world apart. At 4,000m average altitude, ancient gompas, yak herders, and fossil-embedded cliffs create an otherworldly backdrop for treks that are equal parts adventure and cultural immersion.` })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/treks",
                  className: "btn-primary",
                  "data-ocid": "himachal.view_all_button",
                  children: "View All Packages"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/destinations",
                  className: "btn-secondary",
                  "data-ocid": "himachal.destinations_button",
                  children: "Explore Destinations"
                }
              )
            ] })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "seasons.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-heading", style: { color: "var(--ew-text)" }, children: "When Should I Trek?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2", style: { color: "var(--ew-text-lt)" }, children: "Every season in the Himalayas has its own magic" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex overflow-x-auto scrollbar-hide border-b mb-6",
          style: { borderColor: "var(--ew-gray-mid)" },
          children: ["Summer", "Monsoon", "Autumn", "Winter"].map(
            (s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSeason(s),
                className: `flex-none px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${season === s ? "tab-active" : ""}`,
                style: season !== s ? { color: "var(--ew-gray-dark)" } : {},
                "data-ocid": `seasons.tab.${s.toLowerCase()}`,
                children: [
                  SEASON_META[s].emoji,
                  " ",
                  s
                ]
              },
              s
            )
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-5 mb-6 flex flex-col sm:flex-row gap-4 items-start",
          style: { background: "var(--ew-orange-lt)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl flex-shrink-0", children: seasonMeta.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2",
                  style: { background: "var(--ew-orange)", color: "#fff" },
                  children: seasonMeta.months
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm leading-relaxed mb-2",
                  style: { color: "var(--ew-text)" },
                  children: seasonMeta.desc
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-wrap gap-x-5 gap-y-1 text-[12px]",
                  style: { color: "var(--ew-text-lt)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "🌡️ ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Temp:" }),
                      " ",
                      seasonMeta.temp
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "⛅ ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Conditions:" }),
                      " ",
                      seasonMeta.conditions
                    ] })
                  ]
                }
              )
            ] })
          ]
        }
      ),
      seasonTreks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrekCarousel, { treks: seasonTreks, id: "seasons" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-center text-sm",
          style: { color: "var(--ew-gray-dark)" },
          children: "Coming soon — batches being added."
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-14 relative overflow-hidden",
        style: { background: "var(--ew-red)" },
        "data-ocid": "yatras.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "absolute right-0 top-0 opacity-10 pointer-events-none",
              width: "300",
              height: "300",
              viewBox: "0 0 200 200",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "90",
                    fill: "none",
                    stroke: "white",
                    strokeWidth: "2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "70",
                    fill: "none",
                    stroke: "white",
                    strokeWidth: "1.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "50",
                    fill: "none",
                    stroke: "white",
                    strokeWidth: "1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M60 140 L100 60 L140 140 Z", fill: "white", opacity: "0.4" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                className: "text-center mb-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-3xl md:text-4xl mb-1", children: "Sacred Himalayan Yatras" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-base", children: "Journey Beyond the Ordinary" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: yatrasScrollRef,
                className: "flex gap-4 overflow-x-auto overflow-hidden scrollbar-hide pb-3 px-1",
                style: { scrollSnapType: "x mandatory" },
                children: YATRAS.slice(0, 6).map((y, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(YatraCard, { yatra: y, idx: i }, y.id))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/yatras",
                className: "btn-white",
                "data-ocid": "yatras.explore_all_button",
                children: [
                  "Explore All Yatras ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                ]
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 bg-white", "data-ocid": "offers.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-lg overflow-hidden flex items-center p-6 min-h-[140px]",
            style: { background: "var(--ew-orange)" },
            "data-ocid": "offers.bogo_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
                  alt: "Trek offer",
                  className: "absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1 block", children: "Limited Offer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-xl mb-1", children: "Buy 1 Get 1 Trek Packages" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm mb-3", children: "Book any trek and bring a friend free — limited seats available" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-white text-sm py-2 px-5",
                    "data-ocid": "offers.bogo_button",
                    children: "Claim Offer"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative rounded-lg overflow-hidden flex items-center p-6 min-h-[140px]",
            style: { background: "var(--ew-red)" },
            "data-ocid": "offers.chardham_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80",
                  alt: "Char Dham",
                  className: "absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1 block", children: "2025 Season Open" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-xl mb-1", children: "Char Dham Yatra 2025" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-sm mb-3", children: "Sacred journey packages from ₹18,999 — seats filling fast" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-white text-sm py-2 px-5",
                    "data-ocid": "offers.chardham_button",
                    children: "Book Now"
                  }
                )
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        {
          label: "Early Bird 15% Off",
          desc: "Book summer treks before March 31 and save 15%",
          icon: "🐦"
        },
        {
          label: "Group Discount 20% Off",
          desc: "Bring 5 or more friends and everyone saves 20%",
          icon: "👥"
        },
        {
          label: "Student Special ₹1,000 Off",
          desc: "Show your college ID and get ₹1,000 off any trek",
          icon: "🎓"
        }
      ].map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-lg p-4 flex items-start gap-3",
          style: { background: "var(--ew-orange-lt)" },
          "data-ocid": `offers.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: o.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-sm",
                  style: { color: "var(--ew-orange)" },
                  children: o.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[12px] mt-0.5",
                  style: { color: "var(--ew-text-lt)" },
                  children: o.desc
                }
              )
            ] })
          ]
        },
        o.label
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "why_choose.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Why Choose Trekora" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: WHY_CHOOSE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-lg p-5 border-2 transition-all group cursor-default",
          style: { borderColor: "transparent" },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = "var(--ew-orange)";
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "transparent";
          },
          "data-ocid": `why_choose.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110",
                style: { background: "var(--ew-red-lt)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 20, style: { color: "var(--ew-red)" } })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-bold text-[15px] mb-1",
                style: { color: "var(--ew-text)" },
                children: item.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-[13px] leading-relaxed",
                style: { color: "var(--ew-text-lt)" },
                children: item.desc
              }
            )
          ]
        },
        item.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-white", "data-ocid": "testimonials.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "mb-8",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "What Our Trekkers Say" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto overflow-hidden scrollbar-hide pb-3", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex-none w-72 bg-white rounded-lg p-5 shadow-card border",
          style: { borderColor: "var(--ew-gray-mid)" },
          "data-ocid": `testimonial.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-2", children: [1, 2, 3, 4, 5].filter((n) => n <= t.rating).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                style: { color: "var(--ew-gold)", fontSize: 13 },
                children: "★"
              },
              n
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[11px] font-semibold px-2 py-0.5 rounded mb-2 inline-block",
                style: {
                  background: "var(--ew-red-lt)",
                  color: "var(--ew-red)"
                },
                children: t.trek
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-[13px] leading-relaxed mb-4",
                style: { color: "var(--ew-text-lt)" },
                children: [
                  '"',
                  t.review,
                  '"'
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: t.image,
                  alt: t.name,
                  className: "w-9 h-9 rounded-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-[13px]",
                    style: { color: "var(--ew-text)" },
                    children: t.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[11px]",
                    style: { color: "var(--ew-gray-dark)" },
                    children: t.city
                  }
                )
              ] })
            ] })
          ]
        },
        t.name
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-gold)", fontSize: 15 }, children: "★" }, n)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-sm font-bold",
            style: { color: "var(--ew-text)" },
            children: "4.8/5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "Google Reviews · 2,400+ ratings" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleReviewsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HomepageReviews, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "batches.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "flex items-end justify-between mb-6",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Upcoming Trek Batches" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex gap-0 border-b mb-5",
          style: { borderColor: "var(--ew-gray-mid)" },
          children: batchTabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setBatchTab(tab),
              className: `px-5 py-2.5 text-[13px] font-medium transition-colors ${batchTab === tab ? "tab-active" : ""}`,
              style: batchTab !== tab ? { color: "var(--ew-gray-dark)" } : {},
              "data-ocid": `batches.tab.${tab.toLowerCase().replace(/\s+/g, "_")}`,
              children: tab
            },
            tab
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            style: {
              borderBottom: "2px solid var(--ew-gray-mid)",
              background: "var(--ew-gray-lt)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide",
                  style: { color: "var(--ew-text-lt)" },
                  children: "Trek"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide",
                  style: { color: "var(--ew-text-lt)" },
                  children: "Dates"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide",
                  style: { color: "var(--ew-text-lt)" },
                  children: "Duration"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide",
                  style: { color: "var(--ew-text-lt)" },
                  children: "Slots"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide",
                  style: { color: "var(--ew-text-lt)" },
                  children: "Price"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-3" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visibleBatches.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            style: { borderBottom: "1px solid var(--ew-gray-mid)" },
            "data-ocid": `batches.row.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "py-3 px-3 font-semibold",
                  style: { color: "var(--ew-text)" },
                  children: b.trek
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "py-3 px-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: b.dates
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "td",
                {
                  className: "py-3 px-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: b.duration
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: b.full ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-bold line-through",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "FULL"
                }
              ) : b.slots <= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-red text-[10px]", children: [
                "Only ",
                b.slots,
                " left!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-green text-[10px]", children: [
                b.slots,
                " Available"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "td",
                {
                  className: "py-3 px-3 font-bold",
                  style: { color: "var(--ew-orange)" },
                  children: [
                    "₹",
                    b.price.toLocaleString("en-IN")
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-3", children: !b.full && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/book",
                  className: "btn-primary text-[12px] py-1.5 px-4",
                  "data-ocid": `batches.book_button.${i + 1}`,
                  children: "Book Now"
                }
              ) })
            ]
          },
          b.trek
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/treks",
          className: "text-sm font-semibold flex items-center gap-1 justify-end",
          style: { color: "var(--ew-red)" },
          "data-ocid": "batches.view_all_link",
          children: [
            "View All Batches ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UpcomingBatchesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YouTubeSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 section-alt", "data-ocid": "blog.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "flex items-end justify-between mb-7",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "Travel Stories & Tips" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5 overflow-x-auto scrollbar-hide pb-3", children: BLOGS.slice(0, 4).map((blog, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog/$slug",
          params: { slug: blog.slug },
          className: "flex-none w-64 bg-white rounded-lg overflow-hidden shadow-card group block",
          "data-ocid": `blog.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: blog.heroImage,
                alt: blog.title,
                loading: "lazy",
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[11px] font-semibold px-2 py-0.5 rounded mb-2 inline-block",
                  style: {
                    background: "var(--ew-red-lt)",
                    color: "var(--ew-red)"
                  },
                  children: blog.category
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[11px] mb-1",
                  style: { color: "var(--ew-gray-dark)" },
                  children: blog.publishedAt
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-[14px] leading-snug mb-2 line-clamp-2",
                  style: { color: "var(--ew-text)" },
                  children: blog.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-[12px] line-clamp-2 mb-3",
                  style: { color: "var(--ew-text-lt)" },
                  children: blog.excerpt
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-[12px] font-semibold flex items-center gap-1",
                  style: { color: "var(--ew-red)" },
                  children: [
                    "Read More ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 12 })
                  ]
                }
              )
            ] })
          ]
        },
        blog.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/blog",
          className: "btn-primary",
          "data-ocid": "blog.view_all_button",
          children: [
            "View All Blogs ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ]
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14",
        style: { background: "var(--ew-orange)" },
        "data-ocid": "newsletter.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-2xl md:text-3xl mb-1", children: "Get Your Free Trek Planning Guide (PDF)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-sm mb-5", children: "Enter your email and receive it instantly" }),
              newsSubmitted ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 bg-white/20 rounded-lg py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold", children: "✅ Check your inbox! Guide sent." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleNewsletterSubmit,
                  className: "flex flex-col sm:flex-row gap-2 max-w-sm mx-auto",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "email",
                        required: true,
                        placeholder: "Enter your email address",
                        value: newsEmail,
                        onChange: (e) => setNewsEmail(e.target.value),
                        className: "flex-1 px-4 py-3 rounded-full text-[var(--ew-text)] text-sm focus:outline-none border-0",
                        style: { background: "#fff" },
                        "data-ocid": "newsletter.email.input"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        className: "btn-white whitespace-nowrap text-sm",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "newsletter.submit_button",
                        children: "Get Free Guide"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[12px] mt-3", children: "Join 50,000+ trekkers already subscribed" })
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 bg-white", "data-ocid": "partners.section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-center text-[13px] mb-5 font-semibold uppercase tracking-wider",
          style: { color: "var(--ew-gray-dark)" },
          children: "As Featured In"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-6 md:gap-10", children: [
        { name: "Times of India", url: "/press" },
        { name: "NDTV", url: "/press" },
        { name: "Outlook Traveller", url: "/press" },
        { name: "National Geographic", url: "/press" },
        { name: "Adventure Nation", url: "/press" },
        { name: "Thrillophilia", url: "/press" },
        { name: "MakeMyTrip", url: "/press" }
      ].map(({ name, url }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: url,
          className: "px-4 py-2 rounded border text-sm font-bold opacity-40 hover:opacity-80 transition-opacity",
          style: {
            borderColor: "var(--ew-gray-mid)",
            color: "var(--ew-gray-dark)",
            textDecoration: "none"
          },
          "data-ocid": `partners.logo.${name.toLowerCase().replace(/\s+/g, "_")}`,
          children: name
        },
        name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/press",
          className: "text-[12px] font-semibold",
          style: { color: "var(--ew-red)" },
          "data-ocid": "partners.view_press_link",
          children: "View all press coverage →"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrekRecommenderQuiz, {})
  ] });
}
export {
  HomePage as default
};
