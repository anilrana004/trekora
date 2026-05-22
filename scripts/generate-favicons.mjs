import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778744940/wpn00ko2pztesvmf8z76.png";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../src/frontend/public");

async function main() {
  fs.mkdirSync(publicDir, { recursive: true });
  const res = await fetch(LOGO_URL);
  if (!res.ok) throw new Error(`Failed to fetch logo: ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());

  for (const { name, size } of [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
  ]) {
    await sharp(input)
      .resize(size, size, { fit: "cover", position: "centre" })
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Wrote ${name}`);
  }

  await sharp(input)
    .resize(32, 32, { fit: "cover", position: "centre" })
    .png()
    .toFile(path.join(publicDir, "favicon.ico"));

  console.log("Wrote favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
