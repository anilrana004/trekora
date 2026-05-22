import { TREKS, type Trek } from "./treks";
import { YATRAS, type Yatra } from "./yatras";

export type PackageItemKind = "trek" | "yatra";

export type CuratedPackageItem = {
  kind: PackageItemKind;
  slug: string;
};

export type CuratedPackageCategory =
  | "sacred"
  | "adventure"
  | "luxury"
  | "offbeat"
  | "expedition";

export type CuratedPackageTier = "explorer" | "adventurer" | "summit";

export type CuratedPackage = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CuratedPackageCategory;
  badge?: string;
  tier: CuratedPackageTier;
  popular?: boolean;
  exclusive?: boolean;
  durationDays: number;
  bestSeason: string;
  items: CuratedPackageItem[];
  highlights: string[];
  inclusions: string[];
  /** Resolved at build — hero image from first valid item */
  image: string;
  states: Array<"uttarakhand" | "himachal">;
  priceFrom: number;
  priceWas: number;
  savingsPercent: number;
  rating: number;
  reviewCount: number;
};

export function getTrekBySlug(slug: string): Trek | undefined {
  return TREKS.find((t) => t.slug === slug);
}

export function getYatraBySlug(slug: string): Yatra | undefined {
  return YATRAS.find((y) => y.slug === slug);
}

export function resolvePackageItem(
  item: CuratedPackageItem,
): Trek | Yatra | undefined {
  return item.kind === "trek"
    ? getTrekBySlug(item.slug)
    : getYatraBySlug(item.slug);
}

function sumComponentPrices(items: CuratedPackageItem[]): number {
  return items.reduce((sum, item) => {
    const p = resolvePackageItem(item);
    return sum + (p?.price ?? 0);
  }, 0);
}

function packageImage(items: CuratedPackageItem[]): string {
  for (const item of items) {
    const p = resolvePackageItem(item);
    if (p?.image) return p.image;
  }
  return TREKS[0]?.image ?? "";
}

function packageStates(
  items: CuratedPackageItem[],
): Array<"uttarakhand" | "himachal"> {
  const set = new Set<"uttarakhand" | "himachal">();
  for (const item of items) {
    const p = resolvePackageItem(item);
    if (p?.state) set.add(p.state);
  }
  return [...set];
}

function buildPackage(
  def: Omit<
    CuratedPackage,
    | "image"
    | "states"
    | "priceFrom"
    | "priceWas"
    | "savingsPercent"
    | "rating"
    | "reviewCount"
  > & { discount?: number },
): CuratedPackage {
  const priceWas = sumComponentPrices(def.items);
  const discount = def.discount ?? 0.14;
  const priceFrom = Math.round((priceWas * (1 - discount)) / 500) * 500;
  const savingsPercent = priceWas
    ? Math.round(((priceWas - priceFrom) / priceWas) * 100)
    : 0;

  const ratings = def.items
    .map((i) => resolvePackageItem(i))
    .filter(Boolean)
    .map((p) => ("rating" in p! ? (p.rating ?? 4.7) : 4.7));
  const reviews = def.items
    .map((i) => resolvePackageItem(i))
    .filter(Boolean)
    .map((p) => ("reviewCount" in p! ? (p.reviewCount ?? 80) : 80));

  const rating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : 4.8;
  const reviewCount = reviews.reduce((a, b) => a + b, 0);

  const { discount: _d, ...rest } = def;
  return {
    ...rest,
    image: packageImage(def.items),
    states: packageStates(def.items),
    priceFrom,
    priceWas,
    savingsPercent,
    rating,
    reviewCount,
  };
}

const PACKAGE_DEFS: Parameters<typeof buildPackage>[0][] = [
  {
    id: "char-dham-beyond",
    slug: "char-dham-beyond",
    name: "Char Dham Beyond",
    tagline: "The world's only yatra that takes you INSIDE the Himalayas",
    description:
      "Sacred Circuit + Hidden Valley Trek — Kedarnath yatra with Vasuki Tal glacier, Badrinath with Satopanth Tal, Gangotri with Gaumukh, and Yamunotri high-country lakes in one world-exclusive circuit.",
    category: "sacred",
    badge: "WORLD EXCLUSIVE",
    tier: "adventurer",
    exclusive: true,
    durationDays: 18,
    bestSeason: "May–Jun, Sep–Oct",
    items: [
      { kind: "yatra", slug: "char-dham-yatra" },
      { kind: "trek", slug: "kedarnath-trek" },
      { kind: "trek", slug: "kedartal" },
      { kind: "yatra", slug: "badrinath-yatra" },
    ],
    highlights: [
      "Kedarnath Yatra + Vasuki Tal glacier lake trek",
      "Badrinath + secret Satopanth Tal expedition",
      "Gangotri temple + Gaumukh glacier walk",
      "Yamunotri + Saptarishi Kund hidden lake",
      "Night camping inside Kedarnath Valley",
      "Private helicopter option available",
    ],
    inclusions: [
      "Luxury tent camps",
      "Vegetarian gourmet meals",
      "Expert guide & porter",
      "Oxygen cylinders",
      "Satellite phone",
    ],
    discount: 0.15,
  },
  {
    id: "panch-kedar-ultimate",
    slug: "panch-kedar-ultimate",
    name: "Panch Kedar Ultimate",
    tagline: "5 sacred peaks. 1 legendary mystery lake. Zero parallels on Earth.",
    description:
      "All 5 Shiva Shrines + Roopkund Trek — complete Panch Kedar with Roopkund Mystery Lake, Bedni Bugyal, and Chopta Chandrashila at dawn.",
    category: "sacred",
    badge: "BESTSELLER",
    tier: "summit",
    popular: true,
    exclusive: true,
    durationDays: 21,
    bestSeason: "May–Jun, Sep–Oct",
    items: [
      { kind: "yatra", slug: "panch-kedar-yatra" },
      { kind: "trek", slug: "roopkund-trek" },
      { kind: "trek", slug: "chopta-tungnath" },
    ],
    highlights: [
      "Kedarnath, Tungnath, Rudranath, Madhyamaheshwar, Kalpeshwar",
      "Roopkund Mystery Lake (3,800-year-old skeletons)",
      "Bedni Bugyal — Asia's most beautiful meadow",
      "Chopta Chandrashila summit at dawn",
      "Traditional Garhwali village homestays",
      "Cross 8 Himalayan passes",
    ],
    inclusions: [
      "Premium camping gear",
      "All meals & snacks",
      "Expert mountaineer guide",
      "Medical kit & stretcher",
      "Transfer from Haridwar",
    ],
    discount: 0.17,
  },
  {
    id: "valley-of-gods",
    slug: "valley-of-gods",
    name: "Valley of Gods",
    tagline: "A UNESCO World Heritage trek no other operator offers end-to-end",
    description:
      "Valley of Flowers + Hemkund + Nanda Devi Sanctuary — monsoon bloom, Hemkund Sahib pilgrimage, and biosphere inner zone in one UNESCO-grade route.",
    category: "adventure",
    badge: "UNESCO ROUTE",
    tier: "adventurer",
    durationDays: 14,
    bestSeason: "Jul–Aug",
    items: [
      { kind: "trek", slug: "valley-of-flowers" },
      { kind: "yatra", slug: "hemkund-sahib-yatra" },
      { kind: "trek", slug: "nanda-devi-base-camp" },
    ],
    highlights: [
      "Valley of Flowers UNESCO World Heritage Site",
      "Hemkund Sahib Sikh pilgrimage (4,632m)",
      "Nanda Devi Biosphere Reserve inner zone",
      "500+ Himalayan wildflower species",
      "Ghangaria basecamp luxury glamping",
      "Evening ranger-guided flora walks",
    ],
    inclusions: [
      "Glamping tents with mattresses",
      "Botanist guide",
      "All permits & fees",
      "Photography workshop",
      "Transfer from Rishikesh",
    ],
    discount: 0.14,
  },
  {
    id: "gangotri-to-gaumukh-trans",
    slug: "gangotri-to-gaumukh-trans",
    name: "Source of the Ganges Traverse",
    tagline:
      "Follow a sacred river from its glacier birth through a secret forbidden valley",
    description:
      "Gangotri → Gaumukh → Tapovan → Nelong Valley — glacier source of the Ganga, Tapovan meadows, and military-permitted restricted valley access.",
    category: "offbeat",
    badge: "RESTRICTED ZONE",
    tier: "summit",
    exclusive: true,
    durationDays: 16,
    bestSeason: "May–Jun, Sep–Oct",
    items: [
      { kind: "trek", slug: "kedartal" },
      { kind: "yatra", slug: "char-dham-yatra" },
      { kind: "trek", slug: "spiti-valley-circuit" },
    ],
    highlights: [
      "Gaumukh Glacier — origin of river Ganga",
      "Tapovan meadow with Shivling peak views",
      "Nelong Valley — 'Little Tibet' (Indo-Tibet border)",
      "Bhairon Ghati ancient temple",
      "Kedartal glacier lake (4,750m)",
      "Military-permitted restricted valley access",
    ],
    inclusions: [
      "Inner line permits",
      "Liaison officer",
      "High-altitude camping",
      "Satellite communication",
      "Emergency evacuation plan",
    ],
    discount: 0.15,
  },
  {
    id: "luxury-himalayan-odyssey",
    slug: "luxury-himalayan-odyssey",
    name: "Himalayan Luxury Odyssey",
    tagline: "Five-star comforts at 4,000m. Yoga at sunrise. Stars at midnight.",
    description:
      "Rishikesh + Auli + Chopta + Deoriatal — ski slopes, perfect Chaukhamba reflections, and private heated glamping at Deoriatal.",
    category: "luxury",
    badge: "ULTRA LUXURY",
    tier: "explorer",
    exclusive: true,
    durationDays: 10,
    bestSeason: "Year-round",
    items: [
      { kind: "trek", slug: "deoriatal-chandrashila" },
      { kind: "trek", slug: "chopta-tungnath" },
      { kind: "trek", slug: "kuari-pass" },
    ],
    highlights: [
      "Auli ski slopes & cable car (India's best)",
      "Deoriatal lake — perfect Chaukhamba reflection",
      "Chopta 'Mini Switzerland' meadow walks",
      "Rishikesh yoga & Ganga Aarti experience",
      "Private heated glamping domes at Deoriatal",
      "Chef-curated gourmet Himalayan cuisine",
    ],
    inclusions: [
      "Luxury heated domes",
      "Personal butler",
      "Private chef",
      "Yoga & meditation sessions",
      "Helicopter transfers optional",
    ],
    discount: 0.12,
  },
  {
    id: "kumaon-mystery-circuit",
    slug: "kumaon-mystery-circuit",
    name: "Kumaon Mystery Circuit",
    tagline:
      "Three glaciers. One hidden Kailash. A route no tourist has ever completed.",
    description:
      "Pindari Glacier + Milam Glacier + Adi Kailash — full traverse connecting Pindari, Milam, Adi Kailash, Om Parvat, and Kafni glacier systems.",
    category: "expedition",
    badge: "FIRST IN INDIA",
    tier: "summit",
    exclusive: true,
    durationDays: 28,
    bestSeason: "May–Jun, Sep–Oct",
    items: [
      { kind: "trek", slug: "pindari-glacier" },
      { kind: "trek", slug: "milam-glacier" },
      { kind: "yatra", slug: "adi-kailash-om-parvat" },
      { kind: "trek", slug: "kafni-glacier" },
    ],
    highlights: [
      "Pindari Glacier (3,660m) — classic Kumaon trek",
      "Milam Glacier — once-restricted Indo-Tibet border trek",
      "Adi Kailash & Om Parvat (natural 'OM' snowfield)",
      "Kafni Glacier side expedition",
      "Munsiyari — 'Little Kashmir' base town",
      "Full traverse connecting all three glacier systems",
    ],
    inclusions: [
      "Expedition-grade gear",
      "High-altitude cook",
      "Helicopter standby",
      "Wilderness first aid team",
      "Documentary filming option",
    ],
    discount: 0.15,
  },
  {
    id: "do-dham-plus-trek",
    slug: "do-dham-plus-trek",
    name: "Do Dham + Hidden Himalaya",
    tagline:
      "India's most sacred circuit with a glacier lake finale the world doesn't know yet",
    description:
      "Kedarnath + Badrinath + Satopanth Lake — sacred Do Dham with Mana village, Vyas Cave, and triangle-of-gods glacier lake finale.",
    category: "sacred",
    tier: "adventurer",
    durationDays: 12,
    bestSeason: "May–Jun, Sep–Oct",
    items: [
      { kind: "yatra", slug: "do-dham-yatra" },
      { kind: "trek", slug: "kedarnath-trek" },
      { kind: "trek", slug: "kuari-pass" },
    ],
    highlights: [
      "Kedarnath temple & valley trek",
      "Badrinath temple & Mana village (last Indian village)",
      "Satopanth Lake — triangle of Vishnu, Brahma, Mahesh",
      "Vyas Cave & Ganesh Cave at Mana",
      "Neelkanth peak panorama",
      "Sunrise at Kedarnath with zero tourists",
    ],
    inclusions: [
      "GMVN lodge + camp combo",
      "Puja arrangement",
      "Experienced yatra guide",
      "All meals",
      "Transfer from Haridwar",
    ],
    discount: 0.13,
  },
  {
    id: "winter-spiti-ladakh-crossing",
    slug: "winter-spiti-ladakh-crossing",
    name: "Winter Trans-Himalayan Crossing",
    tagline:
      "The world's most dangerous beautiful drive — in snow. Nothing compares.",
    description:
      "Spiti Valley + Kinnaur + Lahaul in Winter — snow-locked Spiti, frozen Chandratal, Pin Valley snow leopards, and Rohtang winter storm conditions.",
    category: "expedition",
    badge: "WINTER ONLY",
    tier: "summit",
    exclusive: true,
    durationDays: 15,
    bestSeason: "Jan–Feb",
    items: [
      { kind: "trek", slug: "spiti-valley-trek" },
      { kind: "trek", slug: "chandratal-lake" },
      { kind: "trek", slug: "pin-parvati-pass" },
    ],
    highlights: [
      "Spiti Valley completely snow-locked",
      "Key Monastery frozen in time at 4,166m",
      "Chandratal Lake frozen solid (surreal lunar landscape)",
      "Pin Valley National Park snow leopard territory",
      "Kinnaur Kailash winter circumambulation",
      "Rohtang Pass in full winter storm conditions",
    ],
    inclusions: [
      "4WD convoy vehicles",
      "Winter camping gear",
      "Survival training session",
      "Snow leopard tracker guide",
      "Satellite weather updates",
    ],
    discount: 0.14,
  },
];

export const CURATED_PACKAGES: CuratedPackage[] = PACKAGE_DEFS.map(buildPackage);

export const PACKAGE_CATEGORIES: {
  id: CuratedPackageCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All Packages" },
  { id: "sacred", label: "Sacred" },
  { id: "adventure", label: "Adventure" },
  { id: "luxury", label: "Luxury" },
  { id: "offbeat", label: "Offbeat" },
  { id: "expedition", label: "Expedition" },
];

export function getCuratedPackageBySlug(
  slug: string,
): CuratedPackage | undefined {
  return CURATED_PACKAGES.find((p) => p.slug === slug);
}

/** Deep-link the full curated package on `/book`. */
export function packageBookParams(pkg: CuratedPackage): { package: string } {
  return { package: pkg.slug };
}

export function packageItemLabel(item: CuratedPackageItem): string {
  const p = resolvePackageItem(item);
  return p?.name ?? item.slug;
}

export function packageItemPath(item: CuratedPackageItem): string {
  return item.kind === "trek" ? `/treks/${item.slug}` : `/yatras/${item.slug}`;
}
