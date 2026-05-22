export interface Destination {
  id: string;
  name: string;
  slug: string;
  state: "Uttarakhand" | "Himachal Pradesh";
  stateBadge: string;
  description: string;
  tagline: string;
  altitude: string;
  bestSeason: string;
  trekCount: number;
  yatraCount?: number;
  image: string;
  /** Use `contain` for infographic / map artwork so labels stay readable in cards. */
  imageFit?: "cover" | "contain";
  /** CSS `object-position` when `imageFit` is `cover` (e.g. `center 40%`). */
  imagePosition?: string;
  category: string;
  nearestAirport?: string;
  nearestRailway?: string;
}

/** Shared Himachal Pradesh treks & yatra guide map (destination cards). */
const HIMACHAL_DESTINATION_GUIDE_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778840061/ul4a10njsyc7nu4an6gw.png";

export const DESTINATIONS: Destination[] = [
  // --- Uttarakhand ---
  {
    id: "rishikesh",
    name: "Rishikesh",
    slug: "rishikesh",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Yoga Capital of the World",
    description:
      "World's yoga capital on the Ganga. Gateway to Char Dham and adventure sports hub of India.",
    altitude: "356m",
    bestSeason: "Oct-Mar",
    trekCount: 3,
    yatraCount: 5,
    category: "spiritual",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778837306/j04nqewqbycr84x1wdtl.png",
    /** Illustrated trek/yatra map — show full artwork without cropping. */
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (35 km)",
    nearestRailway: "Rishikesh Railway Station",
  },
  {
    id: "haridwar",
    name: "Haridwar",
    slug: "haridwar",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Char Dham",
    description:
      "One of India's seven sacred cities. Ganga Aarti at Har Ki Pauri is an unforgettable spiritual spectacle.",
    altitude: "314m",
    bestSeason: "Oct-Mar",
    trekCount: 0,
    yatraCount: 5,
    category: "spiritual",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778837671/rqchkskw9pmssfuodne5.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (55 km)",
    nearestRailway: "Haridwar Junction",
  },
  {
    id: "dehradun",
    name: "Dehradun",
    slug: "dehradun",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Garhwal",
    description:
      "Uttarakhand's capital and garden city. Perfect base for Mussoorie, Auli and Garhwal Himalayan treks.",
    altitude: "640m",
    bestSeason: "Sep-Jun",
    trekCount: 4,
    category: "base-camp",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778828561/k2ihvlghosh6nzdhp16b.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant Airport (25 km)",
    nearestRailway: "Dehradun Railway Station",
  },
  {
    id: "joshimath",
    name: "Joshimath",
    slug: "joshimath",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Valley of Flowers",
    description:
      "Last major town before Badrinath and Auli. Winter seat of Badrinath deity, gateway to Valley of Flowers.",
    altitude: "1,890m",
    bestSeason: "May-Nov",
    trekCount: 6,
    yatraCount: 2,
    category: "base-camp",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778837978/hzmf6et5nmoskzpjcfte.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (270 km)",
    nearestRailway: "Haridwar (270 km)",
  },
  {
    id: "chopta",
    name: "Chopta",
    slug: "chopta",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Mini Switzerland of India",
    description:
      "The Mini Switzerland of India. Base for Tungnath trek surrounded by virgin oak and rhododendron forests.",
    altitude: "2,680m",
    bestSeason: "Apr-Jun, Dec-Feb",
    trekCount: 2,
    category: "alpine",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778838169/rklwgtvg3vegfosw8zqx.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (220 km)",
    nearestRailway: "Rishikesh (190 km)",
  },
  {
    id: "auli",
    name: "Auli",
    slug: "auli",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "India's Ski Capital",
    description:
      "India's premier ski resort. Best views of Nanda Devi, Trishul and Hathi Ghoda Parvat year-round.",
    altitude: "2,519m",
    bestSeason: "Jan-Mar (ski), Sep-Nov",
    trekCount: 2,
    category: "alpine",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778838378/ovjnis9zaseokiyhd5n1.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (285 km)",
    nearestRailway: "Haridwar (280 km)",
  },
  {
    id: "kedarnath-dest",
    name: "Kedarnath",
    slug: "kedarnath-dest",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Abode of Lord Shiva",
    description:
      "Ancient Shiva shrine at 3,583m. Trek 16 km from Gaurikund or take helicopter. One of 12 Jyotirlingas.",
    altitude: "3,583m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 1,
    yatraCount: 2,
    category: "spiritual",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778838378/ovjnis9zaseokiyhd5n1.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (250 km)",
    nearestRailway: "Rishikesh (215 km)",
  },
  {
    id: "badrinath-dest",
    name: "Badrinath",
    slug: "badrinath-dest",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Vishnu's Celestial Abode",
    description:
      "Sacred abode of Lord Vishnu at 3,133m. One of India's Char Dham. Mana is the last Indian village 3 km ahead.",
    altitude: "3,133m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 0,
    yatraCount: 2,
    category: "spiritual",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778838805/b07caaj2x7vjoh6nwv2m.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (315 km)",
    nearestRailway: "Haridwar (305 km)",
  },
  {
    id: "gangotri",
    name: "Gangotri",
    slug: "gangotri",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Source of the Holy Ganga",
    description:
      "Origin of the sacred Ganga river. Trek 19 km to Gaumukh glacier, the actual source of the holy river.",
    altitude: "3,048m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 1,
    yatraCount: 1,
    category: "spiritual",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778839008/a4we7s2tcz5acfsptgac.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (250 km)",
    nearestRailway: "Rishikesh (230 km)",
  },
  {
    id: "nainital",
    name: "Nainital",
    slug: "nainital",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Lake City of Kumaon",
    description:
      "The lake city of Kumaon. Naini Lake ringed by hills with boating, colonial architecture and cuisine.",
    altitude: "2,084m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778839201/ff6eblm9dsrfd5hcs8jn.png",
    imageFit: "contain",
    nearestAirport: "Pantnagar Airport (70 km)",
    nearestRailway: "Kathgodam (35 km)",
  },
  {
    id: "munsyari",
    name: "Munsyari",
    slug: "munsyari",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Little Kashmir of Kumaon",
    description:
      "Remote Little Kashmir of Kumaon. Gateway to Milam and Pindari glaciers. Panchachuli sunrise views.",
    altitude: "2,200m",
    bestSeason: "Apr-Jun, Sep-Nov",
    trekCount: 3,
    category: "alpine",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778839328/mbkbtv73w1hi7o4vvaui.png",
    imageFit: "contain",
    nearestAirport: "Pantnagar Airport (285 km)",
    nearestRailway: "Kathgodam (280 km)",
  },
  {
    id: "uttarkashi",
    name: "Uttarkashi",
    slug: "uttarkashi",
    state: "Uttarakhand",
    stateBadge: "UK",
    tagline: "Gateway to Gangotri & Har Ki Dun",
    description:
      "Town on Bhagirathi river. Gateway to Gangotri, Kedarkantha, Har Ki Dun, Dayara Bugyal and Kedartal.",
    altitude: "1,158m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 4,
    category: "base-camp",
    image:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1778832935/zprbell5jyiefshvcxye.png",
    imageFit: "contain",
    nearestAirport: "Jolly Grant, Dehradun (155 km)",
    nearestRailway: "Rishikesh (155 km)",
  },

  // --- Himachal Pradesh ---
  {
    id: "manali",
    name: "Manali",
    slug: "manali",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Adventure Capital of Himachal",
    description:
      "Kullu Valley's adventure capital at 2,050m. Base for 8 treks, paragliding, river rafting and Rohtang Pass.",
    altitude: "2,050m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 8,
    category: "adventure",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport, Kullu (50 km)",
    nearestRailway: "Joginder Nagar (165 km)",
  },
  {
    id: "mcleod-ganj",
    name: "McLeod Ganj",
    slug: "mcleod-ganj",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Little Lhasa of India",
    description:
      "Home of the Dalai Lama. Gateway to Triund, Indrahar Pass and Minkiani Pass treks in Dhauladhar.",
    altitude: "1,457m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 4,
    category: "spiritual",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Gaggal Airport, Kangra (15 km)",
    nearestRailway: "Pathankot (90 km)",
  },
  {
    id: "kasol",
    name: "Kasol",
    slug: "kasol",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Backpacker's Heaven",
    description:
      "The Mini Israel of India on Parvati River. Base for Sar Pass, Kheerganga and Pin Parvati treks.",
    altitude: "1,640m",
    bestSeason: "Mar-Jun, Oct-Nov",
    trekCount: 4,
    category: "adventure",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport, Kullu (30 km)",
    nearestRailway: "Joginder Nagar (135 km)",
  },
  {
    id: "spiti-valley",
    name: "Spiti Valley",
    slug: "spiti-valley",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Land of Lamas and Monasteries",
    description:
      "The Middle Land, a high altitude cold desert. Ancient Buddhist monasteries, fossils, and India highest villages.",
    altitude: "3,800m",
    bestSeason: "Jun-Sep",
    trekCount: 4,
    category: "high-altitude",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport, Kullu (195 km)",
    nearestRailway: "Shimla (410 km)",
  },
  {
    id: "shimla",
    name: "Shimla",
    slug: "shimla",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Queen of Hill Stations",
    description:
      "Queen of Hills. Colonial British summer capital, Christ Church, toy train and gateway to Kinnaur valley.",
    altitude: "2,205m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Shimla Airport (22 km)",
    nearestRailway: "Kalka (90 km via toy train)",
  },
  {
    id: "kaza",
    name: "Kaza",
    slug: "kaza",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Heart of Spiti Valley",
    description:
      "Main town of Spiti Valley. Base for Key Monastery, Kibber, Hikkim, world's highest post office at 4,400m.",
    altitude: "3,800m",
    bestSeason: "Jun-Sep",
    trekCount: 3,
    category: "high-altitude",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport, Kullu (235 km)",
    nearestRailway: "Shimla (450 km)",
  },
  {
    id: "sangla-chitkul",
    name: "Sangla / Chitkul",
    slug: "sangla-chitkul",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "India's Last Village",
    description:
      "India's last village near Tibet in Baspa Valley at 3,450m with Kinnaur Kailash views and apple orchards.",
    altitude: "2,680m",
    bestSeason: "May-Oct",
    trekCount: 2,
    category: "high-altitude",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Shimla Airport (200 km)",
    nearestRailway: "Kalka (285 km)",
  },
  {
    id: "dalhousie",
    name: "Dalhousie",
    slug: "dalhousie",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Scotland of India",
    description:
      "Scottish colonial hill station. Chamera Lake, Khajjiar (mini Switzerland) and Kalatop wildlife sanctuary.",
    altitude: "2,036m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 2,
    category: "hill-station",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Gaggal Airport, Kangra (105 km)",
    nearestRailway: "Pathankot (80 km)",
  },
  {
    id: "bir-billing",
    name: "Bir Billing",
    slug: "bir-billing",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Paragliding Capital of Asia",
    description:
      "World's 2nd best paragliding site. Peaceful Buddhist Tibetan colony and gateway to Dhauladhar treks.",
    altitude: "1,525m",
    bestSeason: "Oct-Nov, Mar-May",
    trekCount: 1,
    category: "adventure",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Gaggal Airport, Kangra (65 km)",
    nearestRailway: "Pathankot (130 km)",
  },
  {
    id: "parvati-valley",
    name: "Parvati Valley",
    slug: "parvati-valley",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "The Magical Parvati Valley",
    description:
      "Magical valley of Parvati river. Kheerganga hot spring, Kasol, Manikaran, Pulga, a hippie paradise.",
    altitude: "1,770m",
    bestSeason: "Mar-Jun, Oct-Nov",
    trekCount: 3,
    category: "adventure",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport, Kullu (10 km)",
    nearestRailway: "Joginder Nagar (140 km)",
  },
  {
    id: "kullu",
    name: "Kullu",
    slug: "kullu",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Valley of Gods",
    description:
      "Kullu Dussehra capital, apple orchards, River Beas rafting, Great Himalayan National Park gateway.",
    altitude: "1,200m",
    bestSeason: "May-Jun, Sep-Oct",
    trekCount: 2,
    category: "adventure",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Bhuntar Airport (10 km)",
    nearestRailway: "Joginder Nagar (130 km)",
  },
  {
    id: "kalpa",
    name: "Kalpa",
    slug: "kalpa",
    state: "Himachal Pradesh",
    stateBadge: "HP",
    tagline: "Apple Paradise of Kinnaur",
    description:
      "Stunning village with Kinnaur Kailash views. Apple and cherry orchards on every slope at 2,960m.",
    altitude: "2,960m",
    bestSeason: "Mar-Jun, Sep-Nov",
    trekCount: 1,
    yatraCount: 1,
    category: "alpine",
    image: HIMACHAL_DESTINATION_GUIDE_IMAGE,
    imageFit: "contain",
    nearestAirport: "Shimla Airport (245 km)",
    nearestRailway: "Kalka (300 km)",
  },
];

export const UTTARAKHAND_DESTINATIONS = DESTINATIONS.filter(
  (d) => d.state === "Uttarakhand",
);
export const HIMACHAL_DESTINATIONS = DESTINATIONS.filter(
  (d) => d.state === "Himachal Pradesh",
);

export const DESTINATION_STATE_SLUGS = {
  Uttarakhand: "uttarakhand",
  "Himachal Pradesh": "himachal-pradesh",
} as const satisfies Record<Destination["state"], string>;

/** Legacy URL segment: `/destinations/states/dehradun` */
export const DESTINATION_LEGACY_STATE_SLUG = "states";

/** Legacy district URLs (`/destinations/districts/dehradun`) redirect to treks. */
export const DESTINATION_DISTRICTS_PATH_SLUG = "districts";

export function getDestinationStateSlug(state: Destination["state"]): string {
  return DESTINATION_STATE_SLUGS[state];
}

export function isDestinationDetailPathStateSlug(stateSlug: string): boolean {
  return (
    stateSlug === DESTINATION_LEGACY_STATE_SLUG ||
    stateSlug === DESTINATION_DISTRICTS_PATH_SLUG ||
    Object.values(DESTINATION_STATE_SLUGS).includes(
      stateSlug as (typeof DESTINATION_STATE_SLUGS)[Destination["state"]],
    )
  );
}

export function getDestinationsForStateSlug(
  stateSlug: string,
): Destination[] | null {
  const match = Object.entries(DESTINATION_STATE_SLUGS).find(
    ([, slug]) => slug === stateSlug,
  );
  if (!match) return null;
  return DESTINATIONS.filter((d) => d.state === match[0]);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}
