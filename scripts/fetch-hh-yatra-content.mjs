/**
 * Parses yatra detail content from himalayanhikers.in markdown cache.
 * Output: src/frontend/src/data/yatra-detail-content.json
 *
 * Usage: node scripts/fetch-hh-yatra-content.mjs [--from-cache] [--slug=kedarnath-yatra]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_FILE = path.join(
  __dirname,
  "../src/frontend/src/data/yatra-detail-content.json",
);
const CACHE_DIR = path.join(__dirname, ".hh-cache");

const PROJECT_YATRAS = [
  { slug: "char-dham-yatra", name: "Char Dham Yatra" },
  { slug: "do-dham-yatra", name: "Do Dham Yatra" },
  { slug: "panch-kedar-yatra", name: "Panch Kedar Yatra" },
  { slug: "hemkund-sahib-yatra", name: "Hemkund Sahib Yatra" },
  { slug: "kedarnath-yatra", name: "Kedarnath Yatra" },
  { slug: "badrinath-yatra", name: "Badrinath Yatra" },
  { slug: "tungnath-yatra", name: "Tungnath Yatra" },
];

const HH_PATH_MAP = {
  "char-dham-yatra": "char-dham-yatra",
  "do-dham-yatra": "do-dham-yatra",
  "panch-kedar-yatra": "panch-kedar-trek",
  "hemkund-sahib-yatra": "hemkund-sahib-trek",
  "kedarnath-yatra": "kedarnath-trek",
  "badrinath-yatra": "badrinath-trek",
  "tungnath-yatra": "tungnath-trek",
};

function cleanText(s) {
  return s
    .replace(/^▼+\s*/g, "")
    .replace(/\s+/g, " ")
    .replace(/Himalayan Hikers/gi, "Trekora")
    .replace(/\bHH\b/g, "Trekora")
    .replace(/info@himalayanhikers\.in/gi, "contact@trekora.in")
    .trim();
}

function isGarbageParagraph(p) {
  return (
    p.startsWith("- Satopanth") ||
    p.startsWith("|") ||
    p.includes("▼") ||
    /^Trek Difficulty|^Trek Duration|^Highest Altitude|^Basecamp|^Pickup|^Dropoff|^Optional:/.test(
      p,
    ) ||
    /Best Treks by Region|Trek Guides & Honest Reviews|Trek Planning, Gear/.test(
      p,
    ) ||
    /View News Section|Craft Your Perfect Adventure|Subscribe Now/.test(p)
  );
}

function sectionBody(text, headingRe) {
  const m = text.match(headingRe);
  if (!m) return "";
  return cleanText(m[1].replace(/\r?\n+/g, " "));
}

function parseOverview(text) {
  const divineBlocks = [
    ...text.matchAll(
      /## Experience the Divine[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## |$)/gi,
    ),
  ];
  for (const m of divineBlocks.reverse()) {
    const paras = m[1]
      .split(/\r?\n\r?\n+/)
      .map((p) => cleanText(p.replace(/\r?\n/g, " ")))
      .filter((p) => p.length > 80 && !isGarbageParagraph(p));
    if (paras.length) return paras.slice(0, 3).join(" ");
  }

  const charDhamBlocks = [
    ...text.matchAll(
      /## Char Dham Yatra in Uttarakhand[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n##### )/gi,
    ),
  ];
  for (const m of charDhamBlocks) {
    const paras = m[1]
      .split(/\r?\n\r?\n+/)
      .map((p) => cleanText(p.replace(/\r?\n/g, " ")))
      .filter((p) => p.length > 120 && !isGarbageParagraph(p));
    if (paras.length) return paras.slice(0, 2).join(" ");
  }

  const h1Block = text.match(
    /^# [^\r\n]+\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/m,
  );
  if (h1Block) {
    const paras = h1Block[1]
      .split(/\r?\n\r?\n+/)
      .map((p) => cleanText(p.replace(/\r?\n/g, " ")))
      .filter((p) => p.length > 80 && !isGarbageParagraph(p));
    if (paras.length) return paras.slice(0, 2).join(" ");
  }

  return "";
}

function parseSignificance(text) {
  const parts = [];
  for (const re of [
    /## Why Choose[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /## Beliefs for Char Dham Yatra\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n###### )/i,
    /## Kedarnath Temple is a Revered[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /## A special place of Lord Shiva[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /## Spiritual Significance[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /## Mythological Significance[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /## Why is .+ Significant\?\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
    /Why Choose Do Dham Yatra[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\nHow to reach|\r?\nWhat to Pack|\r?\n## )/i,
  ]) {
    const body = sectionBody(text, re);
    if (body.length > 60) parts.push(body);
  }
  return parts.filter(Boolean).join(" ") || "";
}

function parseHighlights(text) {
  const section = text.match(
    /## Trek highlights[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## |$)/i,
  );
  if (!section) return [];

  const bullets = [];
  for (const line of section[1].split(/\r?\n/)) {
    const t = cleanText(line.replace(/^[-*]\s*/, ""));
    if (t.length > 20 && !t.startsWith("#")) bullets.push(t);
  }

  const scenic = text.match(
    /### Top Scenic Attractions[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## )/i,
  );
  if (scenic) {
    for (const block of scenic[1].split(/\r?\n\r?\n+/)) {
      const title = block.match(/^([^:\n]+):/);
      if (title) bullets.push(cleanText(title[1]));
    }
  }

  return [...new Set(bullets)].slice(0, 8);
}

function extractDayBlocks(source) {
  const itinerary = {};
  const dayHeaderRe =
    /(?:### )?Day \d{1,2}:?\s*([^\r\n]+)\r?\n\r?\n([\s\S]*?)(?=\r?\n(?:### )?Day \d{1,2}:|\r?\n## |$)/gi;
  let m;
  while ((m = dayHeaderRe.exec(source)) !== null) {
    const title = cleanText(m[1]);
    const body = m[2]
      .split(/\r?\n/)
      .map((l) => l.replace(/^[-*#]\s*/, "").trim())
      .filter(Boolean)
      .join(" ");
    if (title && body.length > 30) {
      itinerary[title] = cleanText(body);
    }
  }
  return itinerary;
}

function extractBreakdownDays(text) {
  const breakdown = text.match(
    /Detailed Itinerary Breakdown[\s\S]*?▼\s*\r?\n\r?\n([\s\S]*?)(?=\r?\nBest [Tt]ime|\r?\nWhy (?:start|Choose)|\r?\nHow to reach|\r?\nWhat to Pack|\r?\nEssential Travel|\r?\nTrekora|\r?\nLarge Trekking|\r?\n## )/i,
  );
  if (!breakdown) return {};

  const itinerary = {};
  const dayRe =
    /#{3,4} Day \d{1,2}:?\s*([^\r\n]+)\r?\n([\s\S]*?)(?=\r?\n#{3,4} Day \d{1,2}:|\r?\nBest [Tt]ime|\r?\n## |$)/gi;
  let m;
  while ((m = dayRe.exec(breakdown[1])) !== null) {
    const title = cleanText(m[1]);
    const body = m[2]
      .split(/\r?\n/)
      .map((l) => l.replace(/^[-*#]\s*/, "").trim())
      .filter(Boolean)
      .join(" ");
    if (title && body.length > 30) {
      itinerary[title] = cleanText(body);
    }
  }
  return itinerary;
}

function extractShortDashDays(text) {
  const short = text.match(
    /Short Itinerary[\s\S]*?(?:▼\s*)?\r?\n\r?\n([\s\S]*?)(?=\r?\nDetailed|\r?\n## )/i,
  );
  if (!short) return {};

  const itinerary = {};
  for (const line of short[1].split(/\r?\n/)) {
    const m = line.match(/^Day (\d{1,2})[-:]\s*(.+)$/i);
    if (m) {
      const title = cleanText(`Day ${m[1]}: ${m[2]}`);
      itinerary[title] = cleanText(m[2]);
    }
  }
  return itinerary;
}

function parseItinerary(text) {
  const candidates = [];

  const detailed = text.match(
    /Detailed Day-wise Itinerary[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\nEssential Travel|\r?\n## )/i,
  );
  if (detailed) candidates.push(extractDayBlocks(detailed[1]));

  candidates.push(extractBreakdownDays(text));

  const short = text.match(
    /Short Itinerary[\s\S]*?▼\s*\r?\n\r?\n([\s\S]*?)(?=\r?\nDetailed Day-wise|\r?\nDetailed Itinerary|\r?\n## )/i,
  );
  if (short) {
    candidates.push(extractDayBlocks(short[1]));
    candidates.push(extractShortDashDays(text));
  } else {
    candidates.push(extractShortDashDays(text));
  }

  candidates.push(extractDayBlocks(text));

  const best = candidates
    .filter((c) => Object.keys(c).length > 0)
    .sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0];

  return best ?? {};
}

function parseFaqs(text) {
  const section = text.match(
    /Frequently Asked Questions[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n## Image Gallery|\r?\n## Inclusions|\r?\n### Related|\r?\nTrek Fee|\r?\nRecent Blog|$)/i,
  );
  if (!section) return [];

  const body = section[1].replace(/^▼\s*\r?\n\r?\n?/, "");
  const faqs = [];
  const faqRe =
    /(\d+)\.\s+([^?\r\n]+\?)\s*▼?\s*\r?\n\r?\n([\s\S]*?)(?=\r?\n\d+\.\s+|\r?\n## |$)/g;
  let m;
  while ((m = faqRe.exec(body)) !== null) {
    const q = cleanText(m[2]);
    const a = cleanText(m[3].replace(/\r?\n+/g, " "));
    if (q.length > 10 && a.length > 15) faqs.push({ question: q, answer: a });
  }

  if (faqs.length === 0) {
    const altRe =
      /^([^?\r\n]+\?\??)\s*\r?\n▼\s*\r?\n\r?\n([\s\S]*?)(?=\r?\n[^?\r\n]+\?\??\s*\r?\n▼|\r?\n## |$)/gm;
    while ((m = altRe.exec(body)) !== null) {
      const q = cleanText(m[1]);
      const a = cleanText(m[2].replace(/\r?\n+/g, " "));
      if (q.length > 5 && a.length > 15) faqs.push({ question: q, answer: a });
    }
  }

  return faqs.slice(0, 16);
}

function parseInclusions(text) {
  const section = text.match(
    /### Trek Inclusions[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n### Trek Exclusions|\r?\n## |$)/i,
  );
  if (!section) return [];

  const items = [];
  for (const row of section[1].split(/\r?\n/)) {
    if (!row.includes("|") || row.includes("---") || row.includes("Category"))
      continue;
    const cols = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length >= 2) items.push(cleanText(`${cols[0]}: ${cols[1]}`));
  }
  return items;
}

function parseExclusions(text) {
  const section = text.match(
    /### Trek Exclusions[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n### |$)/i,
  );
  if (!section) return [];

  const items = [];
  for (const row of section[1].split(/\r?\n/)) {
    if (!row.includes("|") || row.includes("---") || row.includes("Category"))
      continue;
    const cols = row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    if (cols.length >= 2) items.push(cleanText(`${cols[0]}: ${cols[1]}`));
  }
  return items;
}

function parseHowToReach(text) {
  const faqReach = text.match(
    /How do I reach[^\r\n]*\?\s*▼?\s*\r?\n\r?\n([\s\S]*?)(?=\r?\n\d+\.\s+|\r?\n## |$)/i,
  );
  const byRoad = faqReach ? cleanText(faqReach[1].replace(/\r?\n+/g, " ")) : "";

  const section = text.match(
    /## How to Reach[^\r\n]*\r?\n\r?\n([\s\S]*?)(?=\r?\n## |$)/i,
  );
  const extra = section
    ? section[1]
        .split(/\r?\n\r?\n+/)
        .map((p) => cleanText(p.replace(/\r?\n/g, " ")))
        .filter((p) => p.length > 40)
        .slice(0, 4)
    : [];

  if (!byRoad && extra.length === 0) return undefined;

  return {
    byAir:
      extra.find((p) => /airport|flight|jolly grant/i.test(p)) ||
      "Nearest airport: Jolly Grant, Dehradun. Trekora assists with airport transfers to Haridwar/Rishikesh.",
    byTrain:
      extra.find((p) => /rail|train|haridwar|rishikesh/i.test(p)) ||
      "Nearest railheads: Haridwar and Rishikesh, well connected from Delhi.",
    byRoad: byRoad || extra[0] || "",
    localTransport:
      extra.find((p) => /taxi|jeep|sonprayag|gaurikund|local/i.test(p)) ||
      "Shared jeeps and taxis operate from major towns to trail heads during the yatra season.",
  };
}

function parseFromText(text, slug, name) {
  const description = parseOverview(text);
  const significance = parseSignificance(text);
  const spiritualBenefits = parseHighlights(text);
  const itinerary = parseItinerary(text);
  const faqs = parseFaqs(text);
  const inclusions = parseInclusions(text);
  const exclusions = parseExclusions(text);
  const howToReach = parseHowToReach(text);

  if (!description && Object.keys(itinerary).length === 0) return null;

  return {
    slug,
    sourceUrl: `https://himalayanhikers.in/${HH_PATH_MAP[slug] ?? slug}/`,
    description: description || significance.slice(0, 500),
    significance: significance || description,
    spiritualBenefits,
    itinerary,
    faqs,
    inclusions,
    exclusions,
    howToReach,
  };
}

function ingestCacheFile(slug, name) {
  const file = path.join(CACHE_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  return parseFromText(text, slug, name);
}

function main() {
  const slugArg = process.argv.find((a) => a.startsWith("--slug="));
  const onlySlug = slugArg?.split("=")[1];
  const unique = [
    ...new Map(PROJECT_YATRAS.map((y) => [y.slug, y])).values(),
  ];
  const yatras = onlySlug ? unique.filter((y) => y.slug === onlySlug) : unique;

  let existing = {};
  if (fs.existsSync(OUT_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    } catch {
      existing = {};
    }
  }

  const out = { ...existing };
  let ok = 0;
  let fail = 0;

  for (const yatra of yatras) {
    const data = ingestCacheFile(yatra.slug, yatra.name);
    if (data && (data.description || Object.keys(data.itinerary).length > 0)) {
      out[yatra.slug] = data;
      ok++;
      console.log(
        `✓ ${yatra.slug} (${Object.keys(data.itinerary).length} days, ${data.faqs.length} faqs)`,
      );
    } else {
      fail++;
      console.log(`✗ ${yatra.slug}`);
    }
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`\nDone: ${ok} updated, ${fail} skipped → ${OUT_FILE}`);
}

main();
