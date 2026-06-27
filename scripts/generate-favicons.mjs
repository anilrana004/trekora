import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1782549426/wr9z3m151trbyg3gf2di.png";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../src/frontend/public");

async function writeSquareIcon(input, size, dest, { padding = 0.06 } = {}) {
  const inner = Math.max(1, Math.round(size * (1 - padding * 2)));
  const mark = await sharp(input)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toFile(dest);
}

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });
  const res = await fetch(LOGO_URL);
  if (!res.ok) throw new Error(`Failed to fetch logo: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  for (const { name, size, padding } of [
    { name: "favicon-16x16.png", size: 16, padding: 0.04 },
    { name: "favicon-32x32.png", size: 32, padding: 0.05 },
    { name: "favicon-48x48.png", size: 48, padding: 0.05 },
    { name: "apple-touch-icon.png", size: 180, padding: 0.06 },
    { name: "logo-512.png", size: 512, padding: 0.06 },
    { name: "logo.png", size: 512, padding: 0.06 },
  ]) {
    await writeSquareIcon(input, size, path.join(publicDir, name), { padding });
    console.log(`Wrote ${name}`);
  }

  await writeSquareIcon(input, 32, path.join(publicDir, "favicon.ico"), {
    padding: 0.05,
  });
  console.log("Wrote favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
