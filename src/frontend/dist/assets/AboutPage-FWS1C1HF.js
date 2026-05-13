import { j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const TEAM = [
  {
    name: "Rahul Sharma",
    role: "CEO & Lead Guide",
    years: 15,
    bio: "Summited 50+ Himalayan peaks. Former GMVN guide. IMF certified mountaineer.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
  },
  {
    name: "Priya Negi",
    role: "Operations Head",
    years: 12,
    bio: "Logistics expert ensuring every trek runs smoothly. Kedarnath specialist.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  },
  {
    name: "Vikram Singh",
    role: "Senior Trek Leader",
    years: 10,
    bio: "Roopkund veteran with 20+ crossings. First aid certified & AMS specialist.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80"
  },
  {
    name: "Anjali Rawat",
    role: "Customer Experience",
    years: 8,
    bio: "Ensures every trekker gets personalized attention before, during and after the trek.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
  },
  {
    name: "Deepak Bisht",
    role: "High Altitude Guide",
    years: 14,
    bio: "Pin Parvati & Auden's Col expert. Trained in wilderness medicine and rescue.",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80"
  },
  {
    name: "Sunita Devi",
    role: "Camp Manager",
    years: 9,
    bio: "Legendary for hot meals at 4000m. Manages all campsite operations with precision.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80"
  }
];
const TIMELINE = [
  {
    year: "2009",
    title: "Founded in Rishikesh",
    desc: "EternaWings started with a single Kedarnath trek with 6 friends, driven by a passion for the mountains."
  },
  {
    year: "2012",
    title: "First 100 Trekkers",
    desc: "Word spread through the mountains. We crossed 100 happy trekkers and expanded our Uttarakhand routes."
  },
  {
    year: "2016",
    title: "500 Treks Completed",
    desc: "Himachal Pradesh treks added. Certified all guides under IMF and wilderness first-aid programs."
  },
  {
    year: "2020",
    title: "Online Booking Launch",
    desc: "Launched our digital platform, making it easier than ever to book Himalayan adventures from anywhere."
  },
  {
    year: "2024",
    title: "10,000+ Trekkers",
    desc: "A major milestone — 10,000 trekkers have explored the Himalayas with EternaWings safely and joyfully."
  },
  {
    year: "2025",
    title: "EternaWings Relaunch",
    desc: "Rebranded as EternaWings — Where Every Peak Tells a Story. New routes, new experiences, same trusted team."
  }
];
const CERTS = [
  {
    icon: "🏆",
    name: "NCISM Certified",
    desc: "National Council of Instruction & Scientific Management"
  },
  {
    icon: "🏔️",
    name: "IMF Approved",
    desc: "Indian Mountaineering Foundation authorised operator"
  },
  {
    icon: "🩺",
    name: "Wilderness First Aid",
    desc: "IMA wilderness & high-altitude emergency certified"
  },
  {
    icon: "🌿",
    name: "Eco-Tourism",
    desc: "Ministry of Tourism eco-responsible travel certified"
  }
];
const VALUES = [
  {
    icon: "🛡️",
    color: "var(--ew-red)",
    bg: "var(--ew-red-lt)",
    title: "Safety First",
    desc: "Every route is risk-assessed. Our guides carry oxygen, defibrillators, and satellite phones."
  },
  {
    icon: "🌱",
    color: "var(--ew-green)",
    bg: "#e8f5e9",
    title: "Eco-Responsible",
    desc: "Zero plastic policy on all treks. We partner with local communities and offset our carbon footprint."
  },
  {
    icon: "🤝",
    color: "var(--ew-orange)",
    bg: "var(--ew-orange-lt)",
    title: "Community Uplift",
    desc: "30% of our guides are from local Himalayan villages. We support mountain schools and sanitation."
  }
];
const MEDIA = [
  "Times of India",
  "NDTV",
  "Outlook Traveller",
  "Hindustan Times",
  "India Today"
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-96", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
          alt: "EternaWings team in the mountains",
          className: "w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0",
          style: { background: "rgba(26,26,46,0.75)" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center text-center text-white p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest opacity-70", children: "Our Story" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-bold mt-2 mb-3 text-shadow", children: "About EternaWings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg max-w-2xl opacity-80", children: "Founded in 2009 with a single Kedarnath trek, we now lead 150+ expeditions per year across the Himalayas." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-3xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-bold uppercase tracking-widest",
              style: { color: "var(--ew-red)" },
              children: "Our Mission"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: "text-3xl font-bold mt-2 mb-4",
              style: { color: "var(--ew-text)" },
              children: '"We believe every peak has a story worth telling"'
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-1 mx-auto mb-6 rounded-full",
              style: { background: "var(--ew-red)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "leading-relaxed mb-4",
              style: { color: "var(--ew-text-lt)" },
              children: "EternaWings was born from a simple belief: every person deserves to experience the raw, soul-stirring beauty of the Himalayas. What started as a weekend trek with 6 friends in 2009 has grown into India's most trusted mountain adventure company."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "leading-relaxed",
              style: { color: "var(--ew-text-lt)" },
              children: "We are a team of certified guides, passionate trekkers, and hospitality professionals united by one goal — to create unforgettable, safe, and transformative mountain experiences. We practise responsible tourism, leaving no trace and supporting local Himalayan communities."
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto block", children: "Our Journey" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-6 top-0 bottom-0 w-0.5",
            style: { background: "var(--ew-red)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: TIMELINE.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: "flex gap-6 pl-16 relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10",
                  style: {
                    background: "var(--ew-red)",
                    border: "3px solid white"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-lg font-bold",
                    style: { color: "var(--ew-orange)" },
                    children: item.year
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-base mt-0.5",
                    style: { color: "var(--ew-text)" },
                    children: item.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mt-1",
                    style: { color: "var(--ew-text-lt)" },
                    children: item.desc
                  }
                )
              ] })
            ]
          },
          item.year
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold uppercase tracking-widest",
            style: { color: "var(--ew-red)" },
            children: "The People"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mt-2 mx-auto block", children: "Meet Our Team" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: TEAM.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-2xl overflow-hidden shadow-card text-center hover:shadow-elevated transition-all",
          style: { border: "1px solid var(--ew-gray-mid)" },
          "data-ocid": `team.card.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6 pb-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: member.image,
                alt: member.name,
                className: "w-24 h-24 rounded-full object-cover",
                style: { border: "3px solid var(--ew-red)" }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h3",
                {
                  className: "font-bold text-lg",
                  style: { color: "var(--ew-text)" },
                  children: member.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold mt-0.5",
                  style: { color: "var(--ew-red)" },
                  children: member.role
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 mb-3",
                  style: {
                    background: "var(--ew-orange-lt)",
                    color: "var(--ew-orange)"
                  },
                  children: [
                    member.years,
                    " yrs experience"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: member.bio })
            ] })
          ]
        },
        member.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto block", children: "Our Values" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-2xl p-6 shadow-card text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4",
                style: { background: v.bg },
                children: v.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-bold text-lg mb-2",
                style: { color: "var(--ew-text)" },
                children: v.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: v.desc })
          ]
        },
        v.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto block", children: "Certifications & Recognition" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto", children: CERTS.map((cert, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          className: "text-center p-5 rounded-2xl transition-all hover:-translate-y-1",
          style: {
            background: "var(--ew-gray-lt)",
            border: "1px solid var(--ew-gray-mid)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: cert.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold text-sm mt-2",
                style: { color: "var(--ew-text)" },
                children: cert.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs mt-1",
                style: { color: "var(--ew-gray-dark)" },
                children: cert.desc
              }
            )
          ]
        },
        cert.name
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-bold text-lg mb-6",
            style: { color: "var(--ew-text)" },
            children: "As Featured In"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8 items-center", children: MEDIA.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "font-bold text-lg",
            style: {
              color: "var(--ew-gray-dark)",
              filter: "grayscale(1)"
            },
            children: m
          },
          m
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 text-white text-center",
        style: { background: "var(--ew-footer)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-4", children: "Ready to Start Your Himalayan Journey?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 opacity-75", children: "Join 10,000+ trekkers who have discovered the Himalayas with EternaWings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/treks",
                className: "btn-primary",
                "data-ocid": "about.explore_button",
                children: "Explore Treks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                className: "btn-white",
                "data-ocid": "about.contact_button",
                children: "Talk to Us"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AboutPage as default
};
