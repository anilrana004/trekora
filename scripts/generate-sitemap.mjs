/**
 * Generates public/sitemap.xml from src/lib/sitemap.ts trek/yatra/blog data.
 * Run: node scripts/generate-sitemap.mjs
 * Wired into `pnpm build` via frontend package.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  resolveSitemapSiteOrigin,
  TREKORA_PUBLIC_SITE_ORIGIN,
} from "./lib/public-site-origin.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.join(__dirname, "../src/frontend");
const viteEntry = path.join(frontendRoot, "node_modules/vite/dist/node/index.js");
const { createServer } = await import(pathToFileURL(viteEntry).href);

const envOrigin = process.env.VITE_SITE_ORIGIN;
const siteOrigin = resolveSitemapSiteOrigin(envOrigin);

if (envOrigin?.includes("api.trekora.in")) {
  console.warn(
    `[sitemap] VITE_SITE_ORIGIN=${envOrigin} — sitemap/robots forced to ${TREKORA_PUBLIC_SITE_ORIGIN}`,
  );
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toSitemapXml(entries) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = entries
    .map((entry) => {
      const loc = `${siteOrigin}${entry.url === "/" ? "/" : entry.url}`;
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function loadSitemapEntries() {
  const server = await createServer({
    root: frontendRoot,
    logLevel: "error",
    configFile: path.join(frontendRoot, "vite.config.js"),
  });

  try {
    const mod = await server.ssrLoadModule("/src/lib/sitemap.ts");
    if (typeof mod.generateSitemapData !== "function") {
      throw new Error("generateSitemapData() not exported from sitemap.ts");
    }
    return mod.generateSitemapData();
  } finally {
    await server.close();
  }
}

async function main() {
  const entries = await loadSitemapEntries();
  const xml = toSitemapXml(entries);
  const publicDir = path.join(frontendRoot, "public");
  fs.mkdirSync(publicDir, { recursive: true });
  const outPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  const robotsPath = path.join(publicDir, "robots.txt");
  const robots = `# Trekora — https://www.trekora.in
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /admin
Disallow: /book
Disallow: /dashboard
Disallow: /trekkers

Sitemap: ${siteOrigin}/sitemap.xml
`;
  fs.writeFileSync(robotsPath, robots, "utf8");

  console.log(
    `[sitemap] Wrote ${entries.length} URLs to ${outPath} (${siteOrigin})`,
  );
}

main().catch((err) => {
  console.error("[sitemap] Generation failed:", err);
  process.exit(1);
});
