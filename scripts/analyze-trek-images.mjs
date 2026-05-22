import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const treksPath = path.join(ROOT, "src/frontend/src/data/treks.ts");
const treks = fs.readFileSync(treksPath, "utf8");

const blocks = treks.split(/\n  \},\n  \{/);
let cloud = 0;
let unsplash = 0;
let mixed = 0;
const bySlug = [];

for (const block of blocks) {
  const sm = block.match(/slug: "([^"]+)"/);
  if (!sm) continue;
  const slug = sm[1];
  const hasC = block.includes("res.cloudinary.com");
  const hasU = block.includes("unsplash");
  if (hasC && !hasU) cloud++;
  else if (hasU && !hasC) unsplash++;
  else if (hasC && hasU) mixed++;
  bySlug.push({ slug, hasC, hasU });
}

console.log(JSON.stringify({ total: bySlug.length, cloud, unsplash, mixed, unsplashSlugs: bySlug.filter((x) => x.hasU && !x.hasC).map((x) => x.slug) }, null, 2));
