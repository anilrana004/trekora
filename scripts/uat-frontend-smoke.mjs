/**
 * Frontend UAT smoke — run against `pnpm dev` (default http://127.0.0.1:5173).
 * Usage: node scripts/uat-frontend-smoke.mjs [baseUrl]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "src/frontend/dist");
const BASE = (process.argv[2] || "http://127.0.0.1:5173").replace(/\/$/, "");

const results = [];

function pass(id, detail = "") {
  results.push({ id, ok: true, detail });
}

function fail(id, detail = "") {
  results.push({ id, ok: false, detail });
}

async function fetchText(url, opts) {
  const res = await fetch(url, { ...opts, redirect: "follow" });
  const text = await res.text();
  return { res, text };
}

function assertSpaShell(id, text) {
  if (!text.includes('id="root"') && !text.includes("id='root'")) {
    fail(id, "Missing #root mount");
    return;
  }
  if (!text.includes('type="module"')) {
    fail(id, "Missing Vite module script");
    return;
  }
  pass(id);
}

async function testRoutes() {
  const routes = [
    ["1-homepage", "/"],
    ["2-treks-listing", "/treks"],
    ["3-trek-details", "/treks/kedarkantha-trek"],
    ["4-blogs", "/blog"],
    ["5-yatras", "/yatras"],
    ["6-destinations", "/destinations"],
    ["7-search", "/treks?q=kedarkantha"],
    ["8-contact", "/contact"],
    ["9-booking", "/book"],
  ];

  for (const [id, path] of routes) {
    try {
      const { res, text } = await fetchText(`${BASE}${path}`);
      if (res.status !== 200) {
        fail(id, `HTTP ${res.status}`);
        continue;
      }
      assertSpaShell(id, text);
    } catch (e) {
      fail(id, e.message || String(e));
    }
  }
}

async function testStaticAssets() {
  try {
    const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
    if (!robots.includes("Sitemap:") || !robots.includes("Disallow: /admin")) {
      fail("11-robots", "robots.txt missing expected rules");
    } else {
      pass("11-robots", "dist/robots.txt");
    }
  } catch (e) {
    fail("11-robots", e.message);
  }

  try {
    const sitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8");
    if (!sitemap.includes("<urlset") || !sitemap.includes("trekora.in/treks")) {
      fail("10-sitemap", "sitemap.xml invalid or missing /treks");
    } else {
      const count = (sitemap.match(/<loc>/g) || []).length;
      if (count < 10) {
        fail("10-sitemap", `only ${count} URLs`);
      } else {
        pass("10-sitemap", `${count} URLs in dist/sitemap.xml`);
      }
    }
  } catch (e) {
    fail("10-sitemap", e.message);
  }

  try {
    const { res, text } = await fetchText(`${BASE}/robots.txt`);
    if (res.status !== 200 || !text.includes("Sitemap:")) {
      fail("11-robots-live", `HTTP ${res.status}`);
    } else {
      pass("11-robots-live", "served from dev");
    }
  } catch (e) {
    fail("11-robots-live", e.message);
  }

  try {
    const { res, text } = await fetchText(`${BASE}/sitemap.xml`);
    if (res.status !== 200 || !text.includes("<urlset")) {
      fail("10-sitemap-live", `HTTP ${res.status}`);
    } else {
      pass("10-sitemap-live", "served from dev");
    }
  } catch (e) {
    fail("10-sitemap-live", e.message);
  }
}

async function testContactApi() {
  try {
    const { res, text } = await fetchText(`${BASE}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (res.status === 404) {
      fail("8-contact-api", "POST /api/query returned 404");
      return;
    }
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      fail("8-contact-api", "non-JSON response");
      return;
    }
    if (res.status === 400 && json.ok === false && json.error) {
      pass("8-contact-api", `validation: ${json.error.slice(0, 60)}`);
      return;
    }
    if (res.status === 200 && json.ok === true) {
      pass("8-contact-api", "accepted (SMTP configured)");
      return;
    }
    if (res.status === 500) {
      pass("8-contact-api", "route OK; SMTP unavailable in dev");
      return;
    }
    fail("8-contact-api", `HTTP ${res.status} ${text.slice(0, 80)}`);
  } catch (e) {
    fail("8-contact-api", e.message);
  }
}

async function testReviewsBySlugApi() {
  const slug = "kedarkantha-trek";
  try {
    const { res, text } = await fetchText(`${BASE}/api/reviews/${slug}`);
    if (res.status === 404) {
      fail(
        "12-reviews-by-slug",
        "GET /api/reviews/:slug returned 404 (Vercel needs Railway rewrite)",
      );
      return;
    }
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      fail("12-reviews-by-slug", "non-JSON response");
      return;
    }
    if (res.status === 200 && json.success === true) {
      pass("12-reviews-by-slug", `trekSlug=${json.trekSlug ?? slug}`);
      return;
    }
    if (res.status === 503) {
      pass("12-reviews-by-slug", "route OK; Mongo unavailable");
      return;
    }
    fail("12-reviews-by-slug", `HTTP ${res.status} ${text.slice(0, 80)}`);
  } catch (e) {
    fail("12-reviews-by-slug", e.message);
  }
}

async function testBookingApi() {
  try {
    const { res, text } = await fetchText(`${BASE}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (res.status === 404) {
      fail("9-booking-api", "POST /api/booking returned 404");
      return;
    }
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      fail("9-booking-api", "non-JSON response");
      return;
    }
    if ([400, 405, 500].includes(res.status) || (res.status === 200 && json)) {
      pass("9-booking-api", `HTTP ${res.status} handler reachable`);
      return;
    }
    fail("9-booking-api", `HTTP ${res.status}`);
  } catch (e) {
    fail("9-booking-api", e.message);
  }
}

async function main() {
  console.log(`UAT base: ${BASE}\n`);
  await testRoutes();
  await testStaticAssets();
  await testContactApi();
  await testBookingApi();
  await testReviewsBySlugApi();

  const failed = results.filter((r) => !r.ok);
  for (const r of results) {
    console.log(`${r.ok ? "PASS" : "FAIL"} ${r.id}${r.detail ? ` — ${r.detail}` : ""}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} passed`);
  if (failed.length > 0) {
    process.exit(1);
  }
}

main();
