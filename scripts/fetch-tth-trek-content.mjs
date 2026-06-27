/**
 * Fetches trek detail content from trekthehimalayas.com for treks in our catalog.
 * Output: src/frontend/src/data/trek-detail-content.json
 *
 * Usage: node scripts/fetch-tth-trek-content.mjs [--slug=roopkund-trek]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src/frontend/src/data/trek-detail-content.json");

const PROJECT_TREKS = [
  { slug: "roopkund-trek", name: "Roopkund Trek" },
  { slug: "valley-of-flowers", name: "Valley of Flowers" },
  { slug: "kedarnath-trek", name: "Kedarnath Trek" },
  { slug: "chopta-tungnath", name: "Chopta Tungnath Chandrashila Trek" },
  { slug: "har-ki-dun", name: "Har Ki Dun" },
  { slug: "brahmatal-trek", name: "Brahmatal Trek" },
  { slug: "kedarkantha-trek", name: "Kedarkantha Trek" },
  { slug: "dayara-bugyal", name: "Dayara Bugyal" },
  { slug: "panwali-kantha", name: "Panwali Kantha" },
  { slug: "rupin-pass", name: "Rupin Pass" },
  { slug: "bali-pass", name: "Bali Pass" },
  { slug: "audens-col", name: "Auden's Col" },
  { slug: "nanda-devi-base-camp", name: "Nanda Devi Base Camp" },
  { slug: "pindari-glacier", name: "Pindari Glacier" },
  { slug: "kafni-glacier", name: "Kafni Glacier" },
  { slug: "milam-glacier", name: "Milam Glacier" },
  { slug: "kuari-pass", name: "Kuari Pass (Curzon Trail)" },
  { slug: "deoriatal-chandrashila", name: "Deoriatal Chandrashila" },
  { slug: "pangarchulla-peak", name: "Pangarchulla Peak" },
  { slug: "kedartal", name: "Kedartal" },
  { slug: "triund-trek", name: "Triund Trek" },
  { slug: "hampta-pass", name: "Hampta Pass" },
  { slug: "chandratal-lake", name: "Chandratal Lake" },
  { slug: "bhrigu-lake", name: "Bhrigu Lake" },
  { slug: "beas-kund", name: "Beas Kund" },
  { slug: "pin-parvati-pass", name: "Pin Parvati Pass" },
  { slug: "kheerganga", name: "Kheerganga" },
  { slug: "sar-pass", name: "Sar Pass" },
  { slug: "friendship-peak", name: "Friendship Peak" },
  { slug: "deo-tibba-base-camp", name: "Deo Tibba Base Camp" },
  { slug: "bara-bhangal", name: "Bara Bhangal" },
  { slug: "chandra-tal-baralacha", name: "Chandra Tal to Baralacha Pass" },
  { slug: "spiti-valley-circuit", name: "Spiti Valley Circuit" },
  { slug: "kinnaur-kailash-parikrama", name: "Kinnaur Kailash Parikrama" },
  { slug: "shikari-mata", name: "Shikari Mata" },
  { slug: "serolsar-lake", name: "Serolsar Lake" },
  { slug: "thamsar-pass", name: "Thamsar Pass" },
  { slug: "kalihani-pass", name: "Kalihani Pass" },
  { slug: "kullu-eravikulam", name: "Kullu Eravikulam" },
  { slug: "changer-lobang-pass", name: "Changer Lobang Pass" },
  { slug: "spiti-valley-trek", name: "Spiti Valley Trek" },
];

/** Trekora slug → known TTH URL path (without domain). */
const TTH_SLUG_MAP = {
  "valley-of-flowers": "valley-of-flowers-trek",
  "chopta-tungnath": "chopta-chandrashila-trek",
  "har-ki-dun": "har-ki-dun-trek",
  "deoriatal-chandrashila": "deoriatal-chandrashila-trek",
  "kuari-pass": "kuari-pass-trek",
  "hampta-pass": "hampta-pass-trek",
  "bhrigu-lake": "bhrigu-lake-trek",
  "beas-kund": "beas-kund-trek",
  "pin-parvati-pass": "pin-parvati-pass-trek",
  "kheerganga": "kheerganga-trek",
  "sar-pass": "sar-pass-trek",
  "friendship-peak": "friendship-peak-trek",
  "deo-tibba-base-camp": "deo-tibba-base-camp-trek",
  "bara-bhangal": "bara-bhangal-trek",
  "chandra-tal-baralacha": "chandratal-baralacha-trek",
  "kinnaur-kailash-parikrama": "kinnaur-kailash-parikrama-trek",
  "pindari-glacier": "pindari-glacier-trek",
  "kafni-glacier": "kafni-glacier-trek",
  "milam-glacier": "milam-glacier-trek",
  "nanda-devi-base-camp": "nanda-devi-base-camp-trek",
  "pangarchulla-peak": "pangarchulla-peak-trek",
  "kedartal": "kedartal-trek",
  "bali-pass": "bali-pass-trek",
  "rupin-pass": "rupin-pass-trek",
  "dayara-bugyal": "dayara-bugyal-trek",
  "panwali-kantha": "panwali-kantha-trek",
  "audens-col": "audens-col-trek",
  "brahmatal-trek": "brahmatal-trek",
  "kedarkantha-trek": "kedarkantha-trek",
  "triund-trek": "triund-trek",
  "chandratal-lake": "chandratal-lake-trek",
  "thamsar-pass": "thamsar-pass-trek",
  "kalihani-pass": "kalihani-pass-trek",
  "shikari-mata": "shikari-mata-trek",
  "serolsar-lake": "serolsar-lake-trek",
  "spiti-valley-circuit": "spiti-valley-circuit-trek",
  "changer-lobang-pass": "changer-lobang-pass-trek",
};

function tthSlugCandidates(slug) {
  if (TTH_SLUG_MAP[slug]) return [TTH_SLUG_MAP[slug]];
  const out = [slug];
  if (!slug.endsWith("-trek")) out.push(`${slug}-trek`);
  if (slug.endsWith("-trek")) out.push(slug.replace(/-trek$/, ""));
  return [...new Set(out)];
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ftToM(ft) {
  return Math.round(ft * 0.3048);
}

function parseAltitudeFt(text) {
  const range = text.match(/(\d{1,2}),?(\d{3})\s*to\s*(\d{1,2}),?(\d{3})\s*ft/i);
  if (range) {
    const high = Number(`${range[3]}${range[4]}`);
    return ftToM(high);
  }
  const single = text.match(/(\d{1,2}),?(\d{3})\s*ft/i);
  if (single) return ftToM(Number(`${single[1]}${single[2]}`));
  const alt = text.match(/Altitude[:\s]+(\d{1,2}),?(\d{3})\s*ft/i);
  if (alt) return ftToM(Number(`${alt[1]}${alt[2]}`));
  return 0;
}

function parseStay(bullets) {
  for (const b of bullets) {
    const m = b.match(/(?:Stay in|Accommodation in)\s+(.+)/i);
    if (m) return m[1].replace(/\.$/, "").trim();
  }
  return "Campsite";
}

function parseMeals(bullets, title) {
  const joined = bullets.join(" ").toLowerCase();
  const isDrive = /drive|kathgodam|manali|delhi|road/i.test(title + joined);
  if (isDrive && !/trek/i.test(title)) return [true, false, true];
  return [true, true, true];
}

function cleanText(s) {
  return s
    .replace(/\s+/g, " ")
    .replace(/Trek The Himalayas/gi, "Trekora")
    .replace(/\bTTH\b/g, "Trekora")
    .replace(/info@trekthehimalayas\.com/gi, "contact@trekora.in")
    .trim();
}

function parseOverview(text, trekName) {
  const why = text.match(
    /## Why is .+ Must-Do Trek\?\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\n### )/i,
  );
  if (why) return cleanText(why[1].replace(/\r?\n+/g, " "));

  const about = text.match(
    /## About (?:the )?.+ Trek\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
  );
  if (about) return cleanText(about[1].replace(/\r?\n+/g, " "));

  const overview = text.match(
    /## .+ Trek Overview\r?\n\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## )/i,
  );
  if (overview) {
    const block = overview[1];
    const paras = block
      .split(/\r?\n\r?\n+/)
      .filter((p) => !p.includes(":") || p.length > 120)
      .map((p) => cleanText(p.replace(/\r?\n/g, " ")))
      .filter(Boolean);
    if (paras.length) return paras.join(" ");
  }
  return "";
}

function parseHighlights(text, trekName) {
  const faqHighlights = text.match(
    /### What are the highlights of the .+ Trek\?\r?\n\r?\n([\s\S]*?)(?=\r?\n### )/i,
  );
  if (faqHighlights) {
    return faqHighlights[1]
      .split(/[,.\n]/)
      .map((s) => cleanText(s))
      .filter((s) => s.length > 12)
      .slice(0, 8);
  }

  const bullets = [];
  const why = text.match(/## Why is .+ Must-Do Trek\?\n\n([\s\S]*?)(?=\n## )/i);
  if (why) {
    const sentences = why[1].split(/(?<=[.!?])\s+/).filter((s) => s.length > 40);
    bullets.push(...sentences.slice(0, 4).map(cleanText));
  }
  return bullets.length ? bullets : [];
}

function parseItinerary(text) {
  const section = text.match(
    /## [^\n]+ Itinerary\r?\n\r?\n([\s\S]*?)(?=\r?\n## )/i,
  );
  if (!section) return [];

  const block = section[1].split(/\r?\n#### /)[0];
  const days = [];
  const dayRe =
    /Day (\d+)\r?\n\r?\n### (.+?)\r?\n\r?\n([\s\S]*?)(?=\r?\nDay \d+\r?\n\r?\n### |\r?\n#### |\r?\n## |$)/g;
  let m;
  while ((m = dayRe.exec(block)) !== null) {
    const bullets = m[3]
      .split(/\r?\n/)
      .map((l) => l.replace(/^-\s*/, "").trim())
      .filter(Boolean);
    const title = cleanText(m[2]);
    const altitude = parseAltitudeFt(bullets.join(" "));
    days.push({
      title,
      desc: cleanText(bullets.join(" ")),
      altitude: altitude || 0,
      stay: parseStay(bullets),
      meals: parseMeals(bullets, title),
    });
  }
  return days;
}

function parseFaqs(text, trekName) {
  const section = text.match(
    /## .+ Frequently Asked Questions[\s\S]*?\r?\n\r?\n([\s\S]*?)(?=\r?\n## |\r?\nPhotos|\r?\n### TTH )/i,
  );
  if (!section) return [];

  const faqs = [];
  const faqRe = /### (.+?)\r?\n\r?\n([\s\S]*?)(?=\r?\n### |\r?\n## |$)/g;
  let m;
  while ((m = faqRe.exec(section[1])) !== null) {
    const q = cleanText(m[1]);
    let a = cleanText(m[2].replace(/\n+/g, " "));
    if (q.length < 8 || a.length < 20) continue;
    if (/TTH Trek Ambassador|Loyal Customer Policy|Government Employees/i.test(q))
      continue;
    faqs.push({ q, a });
  }
  return faqs.slice(0, 14);
}

function parseListItems(text, startMarker, endMarker) {
  const section = text.match(
    new RegExp(`${startMarker}([\\s\\S]*?)(?=${endMarker}|$)`, "i"),
  );
  if (!section) return [];
  return section[1]
    .split("\n")
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "").trim())
    .filter((l) => l.length > 8 && !/^#{1,3}\s/.test(l))
    .map(cleanText)
    .slice(0, 20);
}

function parseInclusions(text) {
  const section = text.match(
    /## .+ Trek Cost Terms[\s\S]*?Inclusion\n\n([\s\S]*?)(?=\nExclusion\n|\n## )/i,
  );
  if (!section) return [];
  return section[1]
    .split("\n")
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "").trim())
    .filter((l) => l.length > 10 && !/^#{1,3}\s/.test(l))
    .map(cleanText);
}

function parseExclusions(text) {
  const section = text.match(
    /Exclusion\n\n([\s\S]*?)(?=\n## .+ Trek Essentials|\n## |\n### Cancellation)/i,
  );
  if (!section) return [];
  return section[1]
    .split("\n")
    .map((l) => l.replace(/^\d+\.\s*/, "").replace(/^-\s*/, "").trim())
    .filter((l) => l.length > 10 && !/^#{1,3}\s/.test(l))
    .map(cleanText);
}

function parseHowToReach(text) {
  const section = text.match(
    /## How to reach[\s\S]*?\n\n([\s\S]*?)(?=\n## .+ Trek Cost|\n## .+ Trek Essentials)/i,
  );
  if (!section) return [];
  return section[1]
    .split(/\n{2,}/)
    .map((p) => cleanText(p.replace(/\n/g, " ")))
    .filter((p) => p.length > 30 && !/^#{1,4}\s/.test(p))
    .slice(0, 8);
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res.ok) return { ok: false, status: res.status, text: "" };
  const html = await res.text();
  const text = htmlToText(html);
  return { ok: true, status: res.status, text, url };
}

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h2>/gi, "\n\n")
    .replace(/<\/h3>/gi, "\n\n")
    .replace(/<\/h4>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n");
}

async function resolveTthPage(slug) {
  for (const tthSlug of tthSlugCandidates(slug)) {
    const url = `https://trekthehimalayas.com/${tthSlug}`;
    const result = await fetchPage(url);
    if (result.ok && result.text.includes("Trek Itinerary")) {
      return { ...result, tthSlug };
    }
    await sleep(2000);
  }
  return null;
}

function parseTrekFromText(text, slug, name) {
  const overview = parseOverview(text, name);
  const highlights = parseHighlights(text, name);
  const itinerary = parseItinerary(text);
  const faqs = parseFaqs(text, name);
  const inclusions = parseInclusions(text);
  const exclusions = parseExclusions(text);
  const howToReach = parseHowToReach(text);
  const shortDesc =
    overview.length > 160 ? `${overview.slice(0, 157).trim()}…` : overview;

  return {
    slug,
    overview,
    shortDesc,
    highlights,
    itinerary,
    faqs,
    inclusions,
    exclusions,
    howToReach,
  };
}

async function ingestMarkdownFile(filePath, slug, name) {
  const text = fs.readFileSync(filePath, "utf8");
  if (!text.match(/Itinerary/i)) return null;
  const data = parseTrekFromText(text, slug, name);
  if (!data.itinerary.length) return null;
  return { ...data, sourceUrl: `https://trekthehimalayas.com/${slug}` };
}

async function scrapeTrek({ slug, name }) {
  const cacheDir = path.join(__dirname, ".tth-cache");
  const cacheFile = path.join(cacheDir, `${slug}.md`);
  if (fs.existsSync(cacheFile)) {
    const data = await ingestMarkdownFile(cacheFile, slug, name);
    if (data) {
      console.log(`  ✓ cache ${slug}`);
      return data;
    }
  }

  const page = await resolveTthPage(slug);
  if (!page) return null;
  console.log(`  ✓ fetched ${page.url}`);
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(cacheFile, page.text);
  const data = parseTrekFromText(page.text, slug, name);
  return { ...data, sourceUrl: page.url };
}

async function main() {
  const slugArg = process.argv.find((a) => a.startsWith("--slug="));
  const fromCache = process.argv.includes("--from-cache");
  const onlySlug = slugArg?.split("=")[1];
  const treks = onlySlug
    ? PROJECT_TREKS.filter((t) => t.slug === onlySlug)
    : PROJECT_TREKS;

  let existing = {};
  if (fs.existsSync(OUT_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    } catch {
      existing = {};
    }
  }

  const out = { ...existing };
  let fetched = 0;
  let failed = 0;

  if (fromCache) {
    const cacheDir = path.join(__dirname, ".tth-cache");
    for (const trek of treks) {
      const cacheFile = path.join(cacheDir, `${trek.slug}.md`);
      if (!fs.existsSync(cacheFile)) {
        failed++;
        continue;
      }
      const data = await ingestMarkdownFile(cacheFile, trek.slug, trek.name);
      if (data) {
        out[trek.slug] = data;
        fetched++;
        console.log(`✓ ${trek.slug}`);
      } else failed++;
    }
  } else {
    for (const trek of treks) {
      try {
        const data = await scrapeTrek(trek);
        if (data?.itinerary?.length) {
          out[trek.slug] = data;
          fetched++;
        } else failed++;
      } catch (err) {
        console.error(`  ✗ ${trek.slug}: ${err.message}`);
        failed++;
      }
      await sleep(4500);
    }
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(out, null, 2)}\n`);
  console.log(`\nDone: ${fetched} updated, ${failed} skipped/failed → ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
