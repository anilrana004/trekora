/**
 * Seed Trekora voucher + gift card samples into MongoDB Atlas.
 * Usage: pnpm seed  (from repo root)
 */
import { config } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
config({ path: join(root, "src", ".env") });

const { connectDB } = await import(
  pathToFileURL(join(root, "backend", "db", "connect.js")).href
);
const { Voucher } = await import(
  pathToFileURL(join(root, "backend", "models", "Voucher.model.js")).href
);
const { GiftCard } = await import(
  pathToFileURL(join(root, "backend", "models", "GiftCard.model.js")).href
);

const SAMPLES = {
  voucher: {
    code: "TREK2026",
    discountType: "percent",
    discountValue: 20,
    minBookingAmount: 3000,
    maxDiscountAmount: 2000,
    applicablePackages: [],
    expiresAt: new Date("2026-12-31T23:59:59.000Z"),
    maxUses: 100,
    usedCount: 0,
    usedBy: [],
    active: true,
  },
  charDhamFeatured: {
    code: "CHARDHAM2025",
    discountType: "flat",
    discountValue: 10000,
    minBookingAmount: 25000,
    maxDiscountAmount: null,
    applicablePackages: ["yatra:char-dham-yatra"],
    expiresAt: new Date("2026-12-31T23:59:59.000Z"),
    maxUses: 500,
    usedCount: 0,
    usedBy: [],
    active: true,
  },
  giftCard: {
    code: "GIFT-XK92-TREK",
    balance: 2000,
    currency: "INR",
    expiresAt: new Date("2027-01-01T00:00:00.000Z"),
    active: true,
    transactions: [],
  },
};

async function upsert(model, query, doc) {
  const existing = await model.findOne(query);
  if (existing) {
    await model.updateOne(query, { $set: doc });
    return "updated";
  }
  await model.create(doc);
  return "created";
}

try {
  await connectDB();
  const v = await upsert(Voucher, { code: SAMPLES.voucher.code }, SAMPLES.voucher);
  const cd = await upsert(
    Voucher,
    { code: SAMPLES.charDhamFeatured.code },
    SAMPLES.charDhamFeatured,
  );
  const g = await upsert(GiftCard, { code: SAMPLES.giftCard.code }, SAMPLES.giftCard);
  process.stdout.write(`[seed] voucher TREK2026: ${v}\n`);
  process.stdout.write(`[seed] voucher CHARDHAM2025: ${cd}\n`);
  process.stdout.write(`[seed] gift card GIFT-XK92-TREK: ${g}\n`);
  process.stdout.write("[seed] done — collections: vouchers, giftcards (db from MONGODB_URI)\n");
  process.exit(0);
} catch (err) {
  process.stderr.write(
    `[seed] failed: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
}
