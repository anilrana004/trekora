/**
 * Updates treks.ts description + shortDesc from trek-detail-content.json
 * Usage: node scripts/apply-trek-descriptions.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentPath = path.join(
  __dirname,
  "../src/frontend/src/data/trek-detail-content.json",
);
const treksPath = path.join(__dirname, "../src/frontend/src/data/treks.ts");

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
let treksSource = fs.readFileSync(treksPath, "utf8");
let updated = 0;

for (const [slug, detail] of Object.entries(content)) {
  if (!detail.overview) continue;

  const slugPattern = new RegExp(
    `(slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?shortDesc:\\s*")([^"]*)(")[\\s\\S]*?(description:\\s*")([^"]*)(")`,
  );
  const match = treksSource.match(slugPattern);
  if (!match) {
    console.log(`skip (no match): ${slug}`);
    continue;
  }

  const shortDesc =
    detail.shortDesc ||
    (detail.overview.length > 120
      ? `${detail.overview.slice(0, 117).trim()}…`
      : detail.overview);

  const escapedShort = shortDesc.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const escapedOverview = detail.overview
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

  treksSource = treksSource.replace(
    slugPattern,
    `$1${escapedShort}$3$4${escapedOverview}$6`,
  );
  updated++;
  console.log(`✓ ${slug}`);
}

fs.writeFileSync(treksPath, treksSource);
console.log(`\nUpdated ${updated} trek descriptions in treks.ts`);
