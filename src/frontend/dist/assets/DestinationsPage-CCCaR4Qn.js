import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion, A as AnimatePresence } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const DESTINATIONS = [
  // --- Uttarakhand ---
  {
    id: "rishikesh",
    name: "Rishikesh",
    slug: "rishikesh",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Yoga Capital of the World",
    description: "World's yoga capital on the Ganga. Gateway to Char Dham and adventure sports hub of India.",
    altitude: "356m",
    bestSeason: "Oct-Mar",
    trekCount: 3,
    yatraCount: 5,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (35 km)",
    nearestRailway: "Rishikesh Railway Station"
  },
  {
    id: "haridwar",
    name: "Haridwar",
    slug: "haridwar",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Char Dham",
    description: "One of India's seven sacred cities. Ganga Aarti at Har Ki Pauri is an unforgettable spiritual spectacle.",
    altitude: "314m",
    bestSeason: "Oct-Mar",
    trekCount: 0,
    yatraCount: 5,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (55 km)",
    nearestRailway: "Haridwar Junction"
  },
  {
    id: "dehradun",
    name: "Dehradun",
    slug: "dehradun",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Garhwal",
    description: "Uttarakhand's capital and garden city. Perfect base for Mussoorie, Auli and Garhwal Himalayan treks.",
    altitude: "640m",
    bestSeason: "Sep-Jun",
    trekCount: 4,
    category: "base-camp",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant Airport (25 km)",
    nearestRailway: "Dehradun Railway Station"
  },
  {
    id: "joshimath",
    name: "Joshimath",
    slug: "joshimath",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Valley of Flowers",
    description: "Last major town before Badrinath and Auli. Winter seat of Badrinath deity, gateway to Valley of Flowers.",
    altitude: "1,890m",
    bestSeason: "May-Nov",
    trekCount: 6,
    yatraCount: 2,
    category: "base-camp",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (270 km)",
    nearestRailway: "Haridwar (270 km)"
  },
  {
    id: "chopta",
    name: "Chopta",
    slug: "chopta",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Mini Switzerland of India",
    description: "The Mini Switzerland of India. Base for Tungnath trek surrounded by virgin oak and rhododendron forests.",
    altitude: "2,680m",
    bestSeason: "Apr-Jun, Dec-Feb",
    trekCount: 2,
    category: "alpine",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (220 km)",
    nearestRailway: "Rishikesh (190 km)"
  },
  {
    id: "auli",
    name: "Auli",
    slug: "auli",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "India's Ski Capital",
    description: "India's premier ski resort. Best views of Nanda Devi, Trishul and Hathi Ghoda Parvat year-round.",
    altitude: "2,519m",
    bestSeason: "Jan-Mar (ski), Sep-Nov",
    trekCount: 2,
    category: "alpine",
    image: "https://images.unsplash.com/photo-1518407613690-d9fc990e795f?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (285 km)",
    nearestRailway: "Haridwar (280 km)"
  },
  {
    id: "kedarnath-dest",
    name: "Kedarnath",
    slug: "kedarnath-dest",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Abode of Lord Shiva",
    description: "Ancient Shiva shrine at 3,583m. Trek 16 km from Gaurikund or take helicopter. One of 12 Jyotirlingas.",
    altitude: "3,583m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 1,
    yatraCount: 2,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1621922688758-6b41a8c7d48c?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (250 km)",
    nearestRailway: "Rishikesh (215 km)"
  },
  {
    id: "badrinath-dest",
    name: "Badrinath",
    slug: "badrinath-dest",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Vishnu's Celestial Abode",
    description: "Sacred abode of Lord Vishnu at 3,133m. One of India's Char Dham. Mana is the last Indian village 3 km ahead.",
    altitude: "3,133m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 0,
    yatraCount: 2,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1609920861880-e83a0e7d1c5e?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (315 km)",
    nearestRailway: "Haridwar (305 km)"
  },
  {
    id: "gangotri",
    name: "Gangotri",
    slug: "gangotri",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Source of the Holy Ganga",
    description: "Origin of the sacred Ganga river. Trek 19 km to Gaumukh glacier, the actual source of the holy river.",
    altitude: "3,048m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 1,
    yatraCount: 1,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1585025083368-1bd0ce0ea7e3?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (250 km)",
    nearestRailway: "Rishikesh (230 km)"
  },
  {
    id: "nainital",
    name: "Nainital",
    slug: "nainital",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Lake City of Kumaon",
    description: "The lake city of Kumaon. Naini Lake ringed by hills with boating, colonial architecture and cuisine.",
    altitude: "2,084m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image: "https://images.unsplash.com/photo-1609920748085-af24e3e6d3b8?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Pantnagar Airport (70 km)",
    nearestRailway: "Kathgodam (35 km)"
  },
  {
    id: "munsyari",
    name: "Munsyari",
    slug: "munsyari",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Little Kashmir of Kumaon",
    description: "Remote Little Kashmir of Kumaon. Gateway to Milam and Pindari glaciers. Panchachuli sunrise views.",
    altitude: "2,200m",
    bestSeason: "Apr-Jun, Sep-Nov",
    trekCount: 3,
    category: "alpine",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Pantnagar Airport (285 km)",
    nearestRailway: "Kathgodam (280 km)"
  },
  {
    id: "uttarkashi",
    name: "Uttarkashi",
    slug: "uttarkashi",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Gangotri & Har Ki Dun",
    description: "Town on Bhagirathi river. Gateway to Gangotri, Dodital, Dayara Bugyal, Har Ki Dun and Kedartal.",
    altitude: "1,158m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 5,
    category: "base-camp",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Jolly Grant, Dehradun (155 km)",
    nearestRailway: "Rishikesh (155 km)"
  },
  // --- Himachal Pradesh ---
  {
    id: "manali",
    name: "Manali",
    slug: "manali",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Adventure Capital of Himachal",
    description: "Kullu Valley's adventure capital at 2,050m. Base for 8 treks, paragliding, river rafting and Rohtang Pass.",
    altitude: "2,050m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 8,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport, Kullu (50 km)",
    nearestRailway: "Joginder Nagar (165 km)"
  },
  {
    id: "mcleod-ganj",
    name: "McLeod Ganj",
    slug: "mcleod-ganj",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Little Lhasa of India",
    description: "Home of the Dalai Lama. Gateway to Triund, Indrahar Pass and Minkiani Pass treks in Dhauladhar.",
    altitude: "1,457m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 4,
    category: "spiritual",
    image: "https://images.unsplash.com/photo-1591474600793-7e3dc0ea70e9?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Gaggal Airport, Kangra (15 km)",
    nearestRailway: "Pathankot (90 km)"
  },
  {
    id: "kasol",
    name: "Kasol",
    slug: "kasol",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Backpacker's Heaven",
    description: "The Mini Israel of India on Parvati River. Base for Sar Pass, Kheerganga and Pin Parvati treks.",
    altitude: "1,640m",
    bestSeason: "Mar-Jun, Oct-Nov",
    trekCount: 4,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport, Kullu (30 km)",
    nearestRailway: "Joginder Nagar (135 km)"
  },
  {
    id: "spiti-valley",
    name: "Spiti Valley",
    slug: "spiti-valley",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Land of Lamas and Monasteries",
    description: "The Middle Land, a high altitude cold desert. Ancient Buddhist monasteries, fossils, and India highest villages.",
    altitude: "3,800m",
    bestSeason: "Jun-Sep",
    trekCount: 4,
    category: "high-altitude",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport, Kullu (195 km)",
    nearestRailway: "Shimla (410 km)"
  },
  {
    id: "shimla",
    name: "Shimla",
    slug: "shimla",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Queen of Hill Stations",
    description: "Queen of Hills. Colonial British summer capital, Christ Church, toy train and gateway to Kinnaur valley.",
    altitude: "2,205m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Shimla Airport (22 km)",
    nearestRailway: "Kalka (90 km via toy train)"
  },
  {
    id: "kaza",
    name: "Kaza",
    slug: "kaza",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Heart of Spiti Valley",
    description: "Main town of Spiti Valley. Base for Key Monastery, Kibber, Hikkim, world's highest post office at 4,400m.",
    altitude: "3,800m",
    bestSeason: "Jun-Sep",
    trekCount: 3,
    category: "high-altitude",
    image: "https://images.unsplash.com/photo-1601823984263-b87b59798b70?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport, Kullu (235 km)",
    nearestRailway: "Shimla (450 km)"
  },
  {
    id: "sangla-chitkul",
    name: "Sangla / Chitkul",
    slug: "sangla-chitkul",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "India's Last Village",
    description: "India's last village near Tibet in Baspa Valley at 3,450m with Kinnaur Kailash views and apple orchards.",
    altitude: "2,680m",
    bestSeason: "May-Oct",
    trekCount: 2,
    category: "high-altitude",
    image: "https://images.unsplash.com/photo-1566956773887-c19d2e35aeab?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Shimla Airport (200 km)",
    nearestRailway: "Kalka (285 km)"
  },
  {
    id: "dalhousie",
    name: "Dalhousie",
    slug: "dalhousie",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Scotland of India",
    description: "Scottish colonial hill station. Chamera Lake, Khajjiar (mini Switzerland) and Kalatop wildlife sanctuary.",
    altitude: "2,036m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Gaggal Airport, Kangra (105 km)",
    nearestRailway: "Pathankot (80 km)"
  },
  {
    id: "bir-billing",
    name: "Bir Billing",
    slug: "bir-billing",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Paragliding Capital of Asia",
    description: "World's 2nd best paragliding site. Peaceful Buddhist Tibetan colony and gateway to Dhauladhar treks.",
    altitude: "1,525m",
    bestSeason: "Oct-Nov, Mar-May",
    trekCount: 1,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d5?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Gaggal Airport, Kangra (65 km)",
    nearestRailway: "Pathankot (130 km)"
  },
  {
    id: "parvati-valley",
    name: "Parvati Valley",
    slug: "parvati-valley",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "The Magical Parvati Valley",
    description: "Magical valley of Parvati river. Kheerganga hot spring, Kasol, Manikaran, Pulga, a hippie paradise.",
    altitude: "1,770m",
    bestSeason: "Mar-Jun, Oct-Nov",
    trekCount: 3,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport, Kullu (10 km)",
    nearestRailway: "Joginder Nagar (140 km)"
  },
  {
    id: "kullu",
    name: "Kullu",
    slug: "kullu",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Valley of Gods",
    description: "Kullu Dussehra capital, apple orchards, River Beas rafting, Great Himalayan National Park gateway.",
    altitude: "1,200m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 2,
    category: "adventure",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Bhuntar Airport (10 km)",
    nearestRailway: "Joginder Nagar (130 km)"
  },
  {
    id: "kalpa",
    name: "Kalpa",
    slug: "kalpa",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Apple Paradise of Kinnaur",
    description: "Stunning village with Kinnaur Kailash views. Apple and cherry orchards on every slope at 2,960m.",
    altitude: "2,960m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 1,
    yatraCount: 1,
    category: "alpine",
    image: "https://images.unsplash.com/photo-1544736779-8b4e6a70a6f2?auto=format&fit=crop&w=800&q=80",
    nearestAirport: "Shimla Airport (245 km)",
    nearestRailway: "Kalka (300 km)"
  }
];
DESTINATIONS.filter(
  (d) => d.state === "Uttarakhand"
);
DESTINATIONS.filter(
  (d) => d.state === "Himachal Pradesh"
);
const FILTERS = [
  { key: "All", label: "All Destinations" },
  { key: "Uttarakhand", label: "Uttarakhand" },
  { key: "Himachal Pradesh", label: "Himachal Pradesh" }
];
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};
function DestinationCard({
  dest,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      variants: itemVariants,
      whileHover: {
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)"
      },
      transition: { type: "spring", stiffness: 400, damping: 20 },
      style: { transformOrigin: "center center" },
      className: "group bg-white rounded-xl overflow-hidden relative",
      "data-ocid": `destination.card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute left-0 top-0 bottom-0 w-0.5 z-10 pointer-events-none",
            initial: { scaleY: 0 },
            whileHover: { scaleY: 1 },
            transition: { duration: 0.2 },
            style: {
              background: "var(--ew-red)",
              transformOrigin: "top"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[200px] overflow-hidden relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.img,
            {
              src: dest.image,
              alt: `${dest.name} - ${dest.tagline}`,
              loading: "lazy",
              className: "w-full h-full object-cover",
              whileHover: { scale: 1.08 },
              transition: { duration: 0.4, ease: "easeOut" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full",
              style: { background: "var(--ew-red)", color: "#fff" },
              children: dest.stateBadge
            }
          ),
          dest.trekCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "absolute bottom-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full",
              style: { background: "var(--ew-orange)", color: "#fff" },
              children: [
                dest.trekCount,
                " Trek",
                dest.trekCount !== 1 ? "s" : ""
              ]
            }
          ),
          dest.yatraCount && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "absolute bottom-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full",
              style: { background: "rgba(192,0,28,0.85)", color: "#fff" },
              children: [
                dest.yatraCount,
                " Yatra",
                dest.yatraCount !== 1 ? "s" : ""
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-bold text-[16px] leading-tight truncate",
                style: { color: "var(--ew-text)" },
                children: dest.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap",
                style: {
                  background: "var(--ew-red-lt)",
                  color: "var(--ew-red)"
                },
                children: dest.state
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[12px] leading-relaxed line-clamp-2",
              style: { color: "var(--ew-text-lt)" },
              children: dest.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] px-2 py-0.5 rounded-full font-medium",
                style: {
                  background: "var(--ew-gray-lt)",
                  color: "var(--ew-gray-dark)"
                },
                children: [
                  "▲ ",
                  dest.altitude
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] px-2 py-0.5 rounded-full font-medium",
                style: {
                  background: "var(--ew-gray-lt)",
                  color: "var(--ew-gray-dark)"
                },
                children: [
                  "🕐 ",
                  dest.bestSeason
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              whileHover: { y: -2 },
              transition: { type: "spring", stiffness: 500, damping: 25 },
              className: "mt-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/treks",
                  className: "flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90",
                  style: { background: "var(--ew-orange)" },
                  "data-ocid": `destination.explore_button.${index + 1}`,
                  children: [
                    "Explore Treks",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "w-3.5 h-3.5",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            fillRule: "evenodd",
                            d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
                            clipRule: "evenodd"
                          }
                        )
                      }
                    )
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function DestinationsPage() {
  const [activeFilter, setActiveFilter] = reactExports.useState("All");
  const [formState, setFormState] = reactExports.useState({
    name: "",
    email: "",
    destination: "",
    dates: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const filteredDestinations = reactExports.useMemo(() => {
    if (activeFilter === "All") return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.state === activeFilter);
  }, [activeFilter]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      id: "main-content",
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative py-20 overflow-hidden",
            style: {
              background: "linear-gradient(135deg, var(--ew-red) 0%, #7a0010 60%, #3a0008 100%)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10",
                  style: { background: "var(--ew-orange)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10",
                  style: { background: "var(--ew-orange)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center relative z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 24 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3", children: "Uttarakhand & Himachal Pradesh" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight", children: "Explore Himalayan Destinations" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl mx-auto text-sm text-white/75 leading-relaxed", children: "From spiritual river towns to wind-swept cold deserts — discover 24 of the most extraordinary places in the Himalayas." })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.2 },
                    className: "mt-8 flex flex-wrap justify-center gap-6",
                    children: [
                      { label: "Destinations", value: "24" },
                      { label: "Active Treks", value: "40+" },
                      { label: "Sacred Yatras", value: "11" },
                      { label: "States", value: "2" }
                    ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold text-white", children: stat.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/60 uppercase tracking-wider", children: stat.label })
                    ] }, stat.label))
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "bg-white shadow-sm sticky top-16 z-20",
            style: { borderBottom: "1px solid var(--ew-gray-mid)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 justify-center py-3 flex-wrap", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setActiveFilter(f.key),
                className: "relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus-visible:outline-none",
                style: activeFilter === f.key ? {
                  background: "var(--ew-red)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(192,0,28,0.3)"
                } : {
                  background: "transparent",
                  color: "var(--ew-text-lt)"
                },
                "data-ocid": `destinations.filter.${f.key.toLowerCase().replace(" ", "-")}`,
                children: [
                  f.label,
                  activeFilter === f.key && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.span,
                    {
                      layoutId: "tab-pill",
                      className: "absolute inset-0 rounded-full -z-10",
                      style: { background: "var(--ew-red)" },
                      transition: { type: "spring", stiffness: 500, damping: 35 }
                    }
                  )
                ]
              },
              f.key
            )) }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pt-8 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "var(--ew-text)" }, children: [
            filteredDestinations.length,
            " destination",
            filteredDestinations.length !== 1 ? "s" : ""
          ] }),
          activeFilter !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " ",
            "in",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "var(--ew-red)" }, children: activeFilter })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 pb-16 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            animate: "show",
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
            children: filteredDestinations.map((dest, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { dest, index: i }, dest.id))
          },
          activeFilter
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs font-bold uppercase tracking-widest",
                    style: { color: "var(--ew-red)" },
                    children: "Start Planning"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mt-2 block mx-auto", children: "Plan Your Destination Trip" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm", style: { color: "var(--ew-text-lt)" }, children: "Tell us where you want to go — EternaWings will craft the perfect Himalayan itinerary." })
              ]
            }
          ),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "rounded-2xl p-8 text-center",
              style: {
                background: "var(--ew-red-lt)",
                border: "1px solid var(--ew-red)"
              },
              "data-ocid": "destinations.form.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🏔" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-xl mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "Request Received!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mb-5",
                    style: { color: "var(--ew-text-lt)" },
                    children: "Our trek experts will reach out with a personalised plan within 24 hours."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%20want%20to%20plan%20a%20Himalayan%20destination%20trip",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90",
                    style: { background: "#25D366" },
                    "data-ocid": "destinations.whatsapp_button",
                    children: "💬 Continue on WhatsApp"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "rounded-2xl p-6 shadow-card space-y-4",
              style: { background: "var(--ew-gray-lt)" },
              "data-ocid": "destinations.plan_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "dest-name",
                        className: "block text-sm font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Your Name *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "dest-name",
                        type: "text",
                        required: true,
                        value: formState.name,
                        onChange: (e) => setFormState((s) => ({ ...s, name: e.target.value })),
                        placeholder: "Full name",
                        className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": "destinations.name.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "dest-email",
                        className: "block text-sm font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Email Address *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "dest-email",
                        type: "email",
                        required: true,
                        value: formState.email,
                        onChange: (e) => setFormState((s) => ({ ...s, email: e.target.value })),
                        placeholder: "your@email.com",
                        className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": "destinations.email.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "dest-destination",
                        className: "block text-sm font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Preferred Destination"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "dest-destination",
                        value: formState.destination,
                        onChange: (e) => setFormState((s) => ({
                          ...s,
                          destination: e.target.value
                        })),
                        className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": "destinations.destination.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select destination" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Uttarakhand", children: DESTINATIONS.filter(
                            (d) => d.state === "Uttarakhand"
                          ).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.name, children: d.name }, d.id)) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("optgroup", { label: "Himachal Pradesh", children: DESTINATIONS.filter(
                            (d) => d.state === "Himachal Pradesh"
                          ).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d.name, children: d.name }, d.id)) })
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "dest-dates",
                        className: "block text-sm font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Travel Dates"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "dest-dates",
                        type: "date",
                        value: formState.dates,
                        onChange: (e) => setFormState((s) => ({ ...s, dates: e.target.value })),
                        className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                        style: { border: "1px solid var(--ew-gray-mid)" },
                        "data-ocid": "destinations.dates.input"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      className: "btn-primary flex-1 justify-center",
                      "data-ocid": "destinations.plan.submit_button",
                      children: "Plan My Trip"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%20want%20to%20plan%20a%20Himalayan%20destination%20trip",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex-1 font-bold py-2.5 rounded-full text-center flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90",
                      style: { background: "#25D366" },
                      "data-ocid": "destinations.whatsapp_button",
                      children: "💬 WhatsApp Us"
                    }
                  )
                ] })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  DestinationsPage as default
};
