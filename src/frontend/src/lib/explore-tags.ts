import type { TreksSearch } from "@/lib/treks-search";
import type { YatrasSearch } from "@/lib/yatras-search";

export type ExploreTag = {
  id: string;
  label: string;
  to: string;
  search?: TreksSearch | YatrasSearch;
  /** Boost when path matches (e.g. trek slug) */
  matchPaths?: string[];
};

const trek = (
  slug: string,
  label: string,
  matchPaths?: string[],
): ExploreTag => ({
  id: `trek-${slug}`,
  label,
  to: `/treks/${slug}`,
  matchPaths: matchPaths ?? [`/treks/${slug}`],
});

const yatra = (slug: string, label: string): ExploreTag => ({
  id: `yatra-${slug}`,
  label,
  to: `/yatras/${slug}`,
  matchPaths: [`/yatras/${slug}`],
});

const treksList = (
  label: string,
  search: TreksSearch,
  id: string,
): ExploreTag => ({
  id,
  label,
  to: "/treks",
  search,
  matchPaths: ["/treks"],
});

const yatrasList = (
  label: string,
  search: YatrasSearch,
  id: string,
): ExploreTag => ({
  id,
  label,
  to: "/yatras",
  search,
  matchPaths: ["/yatras"],
});

const page = (id: string, label: string, to: string): ExploreTag => ({
  id,
  label,
  to,
  matchPaths: [to.split("?")[0] ?? to],
});

const blog = (slug: string, label: string): ExploreTag => ({
  id: `blog-${slug}`,
  label,
  to: `/blog/${slug}`,
  matchPaths: [`/blog/${slug}`, "/blog"],
});

const dest = (slug: string, label: string): ExploreTag => ({
  id: `dest-${slug}`,
  label,
  to: `/destinations/${slug}`,
  matchPaths: ["/destinations", `/destinations/${slug}`],
});

const trekGuide = (slug: string, label: string, sub: string): ExploreTag => ({
  id: `guide-${slug}-${sub}`,
  label,
  to: `/treks/${slug}/${sub}`,
  matchPaths: [`/treks/${slug}`],
});

/** 140 site-wide explore tags — each label maps to a real route. */
export const SITE_EXPLORE_TAGS: ExploreTag[] = [
  // ── Flagship treks (40) ──
  trek("valley-of-flowers", "Valley of Flowers Trek"),
  trek("roopkund-trek", "Roopkund Trek"),
  trek("kedarkantha-trek", "Kedarkantha Trek"),
  trek("hampta-pass", "Hampta Pass Trek"),
  trek("triund-trek", "Triund Trek"),
  trek("har-ki-dun", "Har Ki Dun Trek"),
  trek("brahmatal-trek", "Brahmatal Trek"),
  trek("chopta-tungnath", "Chopta Tungnath Trek"),
  trek("kedarnath-trek", "Kedarnath Trek"),
  trek("kuari-pass", "Kuari Pass Trek"),
  trek("dayara-bugyal", "Dayara Bugyal Trek"),
  trek("rupin-pass", "Rupin Pass Trek"),
  trek("bali-pass", "Bali Pass Trek"),
  trek("chandratal-lake", "Chandratal Lake Trek"),
  trek("beas-kund", "Beas Kund Trek"),
  trek("bhrigu-lake", "Bhrigu Lake Trek"),
  trek("kheerganga", "Kheerganga Trek"),
  trek("sar-pass", "Sar Pass Trek"),
  trek("pin-parvati-pass", "Pin Parvati Pass Trek"),
  trek("deoriatal-chandrashila", "Deoriatal Chandrashila Trek"),
  trek("pangarchulla-peak", "Pangarchulla Peak Trek"),
  trek("kedartal", "Kedartal Trek"),
  trek("pindari-glacier", "Pindari Glacier Trek"),
  trek("kafni-glacier", "Kafni Glacier Trek"),
  trek("milam-glacier", "Milam Glacier Trek"),
  trek("nanda-devi-base-camp", "Nanda Devi Base Camp Trek"),
  trek("audens-col", "Auden's Col Trek"),
  trek("panwali-kantha", "Panwali Kantha Trek"),
  trek("friendship-peak", "Friendship Peak Trek"),
  trek("spiti-valley-trek", "Spiti Valley Trek"),
  trek("spiti-valley-circuit", "Spiti Valley Circuit"),
  trek("kinnaur-kailash-parikrama", "Kinnaur Kailash Parikrama"),
  trek("chandra-tal-baralacha", "Chandratal Baralacha Trek"),
  trek("deo-tibba-base-camp", "Deo Tibba Base Camp Trek"),
  trek("bara-bhangal", "Bara Bhangal Trek"),
  trek("shikari-mata", "Shikari Mata Trek"),
  trek("serolsar-lake", "Serolsar Lake Trek"),
  trek("thamsar-pass", "Thamsar Pass Trek"),
  trek("kalihani-pass", "Kalihani Pass Trek"),
  trek("kullu-eravikulam", "Kullu Eravikulam Trek"),
  trek("changer-lobang-pass", "Changer Lobang Pass Trek"),

  // ── Yatras (15) ──
  yatra("char-dham-yatra", "Char Dham Yatra"),
  yatra("kedarnath-yatra", "Kedarnath Yatra"),
  yatra("badrinath-yatra", "Badrinath Yatra"),
  yatra("do-dham-yatra", "Do Dham Yatra"),
  yatra("panch-kedar-yatra", "Panch Kedar Yatra"),
  yatra("panch-badri-yatra", "Panch Badri Yatra"),
  yatra("hemkund-sahib-yatra", "Hemkund Sahib Yatra"),
  yatra("adi-kailash-om-parvat", "Adi Kailash Om Parvat Yatra"),
  yatra("mani-mahesh-yatra", "Mani Mahesh Yatra"),
  yatra("kinnaur-kailash-yatra", "Kinnaur Kailash Yatra"),
  yatra("shrikhand-mahadev-yatra", "Shrikhand Mahadev Yatra"),
  yatra("churdhar-yatra", "Churdhar Yatra"),
  yatra("tungnath-yatra", "Tungnath Yatra"),
  yatra("triyuginarayan-temple", "Triyuginarayan Temple Yatra"),
  yatra("kartik-swami-temple", "Kartik Swami Temple Yatra"),

  // ── Trek list filters & hubs (20) ──
  treksList("Best Treks in Uttarakhand", { state: "uttarakhand" }, "uk-treks"),
  treksList("Himachal Pradesh Treks", { state: "himachal" }, "hp-treks"),
  treksList(
    "Uttarakhand Adventure Treks",
    { state: "uttarakhand" },
    "uk-adventure",
  ),
  treksList("Easy Treks India", { difficulty: "easy" }, "easy-treks"),
  treksList(
    "Moderate Treks India",
    { difficulty: "moderate" },
    "moderate-treks",
  ),
  treksList(
    "Difficult Himalayan Treks",
    { difficulty: "difficult" },
    "difficult-treks",
  ),
  treksList("Extreme Treks India", { difficulty: "extreme" }, "extreme-treks"),
  treksList("Summer Treks India", { season: "summer" }, "summer-treks"),
  treksList("Winter Treks India", { season: "winter" }, "winter-treks"),
  treksList("Monsoon Treks India", { season: "monsoon" }, "monsoon-treks"),
  treksList("Year-Round Treks", { season: "year-round" }, "year-round-treks"),
  treksList("Valley of Flowers Search", { q: "valley of flowers" }, "q-vof"),
  treksList("Weekend Treks from Delhi", { q: "weekend" }, "q-weekend"),
  treksList("Snow Treks India", { q: "snow" }, "q-snow"),
  treksList("High Altitude Treks", { q: "altitude" }, "q-altitude"),
  treksList("Glacier Treks India", { q: "glacier" }, "q-glacier"),
  treksList("Beginner Treks Himalaya", { difficulty: "easy" }, "beginner"),
  treksList("Family Treks India", { q: "family" }, "q-family"),
  page("hub-uk", "Uttarakhand Trek Hub", "/treks/state/uttarakhand"),
  page("hub-hp", "Himachal Trek Hub", "/treks/state/himachal"),

  // ── Yatra list (5) ──
  yatrasList(
    "Best Yatras in Uttarakhand",
    { state: "uttarakhand" },
    "uk-yatras",
  ),
  yatrasList("Himachal Pilgrimage", { state: "himachal" }, "hp-yatras"),
  yatrasList(
    "Uttarakhand Pilgrimage",
    { state: "uttarakhand" },
    "uk-pilgrimage",
  ),
  page("yatras-all", "All Himalayan Yatras", "/yatras"),
  page("char-dham-search", "Char Dham Packages", "/yatras/char-dham-yatra"),

  // ── Destinations (15) ──
  dest("rishikesh", "Rishikesh Treks & Yatra Base"),
  dest("haridwar", "Haridwar Pilgrimage Hub"),
  dest("dehradun", "Dehradun Gateway Treks"),
  dest("joshimath", "Joshimath Auli Treks"),
  dest("chopta", "Chopta Tungnath Region"),
  dest("kedarnath-dest", "Kedarnath Region"),
  dest("badrinath-dest", "Badrinath Region"),
  dest("gangotri", "Gangotri Region"),
  dest("manali", "Manali Trek Base"),
  dest("mcleod-ganj", "McLeod Ganj Triund"),
  dest("kasol", "Kasol Kheerganga"),
  dest("spiti-valley", "Spiti Valley Tours"),
  dest("shimla", "Shimla Himachal Treks"),
  dest("bir-billing", "Bir Billing Adventures"),
  page("destinations", "All Destinations", "/destinations"),

  // ── Blog guides (10) ──
  blog("valley-of-flowers-trek-guide", "Valley of Flowers Guide"),
  blog("roopkund-trek-guide-2025", "Roopkund Trek Guide"),
  blog("triund-trek-guide-dharamsala", "Triund Trek Guide"),
  blog("hampta-pass-trek-guide", "Hampta Pass Guide"),
  blog("char-dham-yatra-2025-complete-guide", "Char Dham Guide"),
  blog("kedarkantha-trek-winter-guide", "Kedarkantha Winter Guide"),
  blog("spiti-valley-travel-guide-2025", "Spiti Valley Guide"),
  blog("altitude-sickness-himalayan-treks-guide", "Altitude Sickness Guide"),
  blog("solo-trekking-himalayas-safety-guide", "Solo Trekking Safety"),
  blog(
    "best-beginner-treks-uttarakhand-himachal-2025",
    "Best Beginner Treks Guide",
  ),

  // ── Trek planning sub-pages (8) ──
  trekGuide("valley-of-flowers", "Valley of Flowers Best Time", "best-time"),
  trekGuide("roopkund-trek", "Roopkund Difficulty Guide", "difficulty-guide"),
  trekGuide("kedarkantha-trek", "Kedarkantha Packing List", "packing-list"),
  trekGuide("hampta-pass", "Hampta Pass Altitude Profile", "altitude-profile"),
  trekGuide("triund-trek", "Triund Best Season", "best-time"),
  trekGuide("har-ki-dun", "Har Ki Dun Packing List", "packing-list"),
  trekGuide("chandratal-lake", "Chandratal Best Time", "best-time"),
  trekGuide("spiti-valley-trek", "Spiti Trek Difficulty", "difficulty-guide"),

  // ── Packages, booking & site (17) ──
  page("packages", "Trek Packages from Delhi", "/packages"),
  page("upcoming", "Upcoming Trek Batches", "/upcoming-batches"),
  page("book", "Book a Trek Online", "/book"),
  page("compare", "Compare Treks", "/compare"),
  page("gallery", "Trek Photo Gallery", "/gallery"),
  page("contact", "Contact Trekora", "/contact"),
  page("about", "About Trekora", "/about"),
  page("press", "Trekora Press & Media", "/press"),
  page("corporate", "Corporate Trek Outings", "/corporate"),
  page("blog", "Trek & Yatra Blog", "/blog"),
  page("privacy", "Privacy Policy", "/privacy-policy"),
  page("terms", "Terms & Conditions", "/terms-and-conditions"),
  page("treks-all", "All Himalayan Treks", "/treks"),
  page("reviews", "Trekora Reviews", "/about"),
  page("guides", "Certified Mountain Guides", "/about"),
  page("safe-treks", "Safe Himalayan Treks", "/treks?state=uttarakhand"),
  page("small-group", "Small Group Treks", "/packages"),

  // ── Long-tail SEO (30) — mapped to best matching pages ──
  trek("valley-of-flowers", "Valley of Flowers 2026", [
    "/treks/valley-of-flowers",
  ]),
  trek("valley-of-flowers", "Valley of Flowers 2027", [
    "/treks/valley-of-flowers",
  ]),
  trek("valley-of-flowers", "Valley of Flowers from Delhi", [
    "/treks/valley-of-flowers",
  ]),
  trek("valley-of-flowers", "Valley of Flowers Package", [
    "/treks/valley-of-flowers",
  ]),
  trek("roopkund-trek", "Roopkund Package 2026", ["/treks/roopkund-trek"]),
  trek("kedarkantha-trek", "Kedarkantha Snow Trek", [
    "/treks/kedarkantha-trek",
  ]),
  trek("hampta-pass", "Hampta Pass from Manali", ["/treks/hampta-pass"]),
  trek("triund-trek", "Triund Weekend Trek", ["/treks/triund-trek"]),
  trek("chandratal-lake", "Chandratal Camping Trek", [
    "/treks/chandratal-lake",
  ]),
  trek("spiti-valley-trek", "Spiti Summer Expedition", [
    "/treks/spiti-valley-trek",
  ]),
  yatra("char-dham-yatra", "Char Dham Yatra 2026"),
  yatra("char-dham-yatra", "Char Dham from Haridwar"),
  yatra("kedarnath-yatra", "Kedarnath Helicopter Package"),
  yatra("badrinath-yatra", "Badrinath VIP Darshan"),
  yatra("hemkund-sahib-yatra", "Hemkund Sahib Trek"),
  treksList("6 Days Trek Packages", { q: "6" }, "q-6day"),
  treksList("5000m Altitude Treks", { q: "5000" }, "q-5k"),
  treksList("Himalayan Treks India", { q: "himalaya" }, "q-himalaya"),
  treksList("Trek Packages 2026", { season: "summer" }, "packages-2026"),
  treksList(
    "Adventure Tourism India",
    { state: "uttarakhand" },
    "adventure-in",
  ),
  page("plan-trek", "Plan My Custom Trek", "/contact"),
  page("whatsapp", "WhatsApp Trek Enquiry", "/contact"),
  page("delhi-treks", "Treks Near Delhi NCR", "/treks?state=uttarakhand"),
  page("dehradun-treks", "Treks from Dehradun", "/destinations/dehradun"),
  page("manali-treks", "Treks from Manali", "/destinations/manali"),
  page("rishikesh-yatra", "Yatra from Rishikesh", "/destinations/rishikesh"),
  page("vip-yatra", "VIP Darshan Yatra", "/yatras/char-dham-yatra"),
  page("senior-yatra", "Senior Friendly Yatra", "/yatras/char-dham-yatra"),
  page(
    "helicopter-yatra",
    "Helicopter Yatra Packages",
    "/yatras/kedarnath-yatra",
  ),
  page("group-pilgrimage", "Group Pilgrimage India", "/yatras"),
];

// Deduplicate by id (long-tail may reuse trek ids — use unique ids)
function dedupeTags(tags: ExploreTag[]): ExploreTag[] {
  const seen = new Set<string>();
  return tags.map((tag, index) => {
    let id = tag.id;
    if (seen.has(id)) id = `${id}-${index}`;
    seen.add(id);
    return { ...tag, id };
  });
}

export const EXPLORE_TAGS: ExploreTag[] = dedupeTags(SITE_EXPLORE_TAGS);

export const EXPLORE_TAG_COUNT = EXPLORE_TAGS.length;

/** Pin contextual tags first, then fill to `limit`. */
export function orderExploreTagsForPath(
  pathname: string,
  limit = EXPLORE_TAGS.length,
): ExploreTag[] {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const matched: ExploreTag[] = [];
  const rest: ExploreTag[] = [];

  for (const tag of EXPLORE_TAGS) {
    const isMatch = tag.matchPaths?.some(
      (p) => normalized === p || normalized.startsWith(`${p}/`),
    );
    if (isMatch) matched.push(tag);
    else rest.push(tag);
  }

  const ordered = [...matched, ...rest];
  const seenHref = new Set<string>();
  const unique: ExploreTag[] = [];
  for (const tag of ordered) {
    const key = `${tag.to}:${JSON.stringify(tag.search ?? {})}`;
    if (seenHref.has(key)) continue;
    seenHref.add(key);
    unique.push(tag);
  }
  return unique.slice(0, limit);
}

export function exploreSectionTitle(pathname: string): string {
  if (pathname.startsWith("/yatras")) {
    return "Explore More — Himalayan Yatras & Pilgrimage Packages";
  }
  if (pathname.startsWith("/treks")) {
    return "Explore More — Uttarakhand & Himachal Treks & Packages";
  }
  if (pathname.startsWith("/blog")) {
    return "Explore More — Trek Guides, Yatras & Packages";
  }
  return "Explore More — Himalayan Treks, Yatras & Packages";
}
