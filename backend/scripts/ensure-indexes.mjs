/**
 * Ensures MongoDB indexes for Trekora API collections.
 * Run: node backend/scripts/ensure-indexes.mjs
 */
import { config as loadEnv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../db/connect.js";
import { Review } from "../models/Review.model.js";
import { ProductPhoto } from "../models/ProductPhoto.model.js";
import { GiftCard } from "../models/GiftCard.model.js";
import { Voucher } from "../models/Voucher.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__dirname, "../../src/.env") });

async function main() {
  await connectDB();
  const models = [Review, ProductPhoto, GiftCard, Voucher];
  for (const Model of models) {
    await Model.syncIndexes();
    process.stdout.write(`[indexes] synced ${Model.modelName}\n`);
  }
  process.stdout.write("[indexes] done\n");
  process.exit(0);
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
