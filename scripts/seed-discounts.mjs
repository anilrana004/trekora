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
    code: "CHARDHAM2026",
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
  /** 15% off every trek & yatra — 7-day landing flash (keep in sync with booking-promos.ts). */
  landingFlash: {
    code: "TREKORA15",
    discountType: "percent",
    discountValue: 15,
    minBookingAmount: 0,
    maxDiscountAmount: null,
    applicablePackages: ["trek:*", "yatra:*"],
    expiresAt: new Date("2026-08-25T18:30:00.000Z"),
    maxUses: 8000,
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

async function upsert(model, query, doc, preserveKeys = []) {
  const existing = await model.findOne(query);
  if (existing) {
    const next = { ...doc };
    for (const key of preserveKeys) {
      delete next[key];
    }
    await model.updateOne(query, { $set: next });
    return "updated";
  }
  await model.create(doc);
  return "created";
}

function assertOk(label, condition, detail = "") {
  if (condition) {
    process.stdout.write(`[seed] check ${label}: ok\n`);
    return;
  }
  throw new Error(`check ${label} failed${detail ? ` — ${detail}` : ""}`);
}

try {
  await connectDB();
  const v = await upsert(Voucher, { code: SAMPLES.voucher.code }, SAMPLES.voucher);
  const cd = await upsert(
    Voucher,
    { code: SAMPLES.charDhamFeatured.code },
    SAMPLES.charDhamFeatured,
  );
  const flash = await upsert(
    Voucher,
    { code: SAMPLES.landingFlash.code },
    SAMPLES.landingFlash,
    ["usedCount", "usedBy"],
  );
  const g = await upsert(
    GiftCard,
    { code: SAMPLES.giftCard.code },
    SAMPLES.giftCard,
    ["balance", "transactions"],
  );
  const giftDoc = await GiftCard.findOne({ code: SAMPLES.giftCard.code });
  if (giftDoc && (!giftDoc.active || giftDoc.balance <= 0)) {
    giftDoc.balance = SAMPLES.giftCard.balance;
    giftDoc.active = true;
    giftDoc.expiresAt = SAMPLES.giftCard.expiresAt;
    await giftDoc.save();
    process.stdout.write("[seed] gift card GIFT-XK92-TREK: restored balance\n");
  }
  process.stdout.write(`[seed] voucher TREK2026: ${v}\n`);
  process.stdout.write(`[seed] voucher CHARDHAM2026: ${cd}\n`);
  process.stdout.write(`[seed] voucher TREKORA15: ${flash}\n`);
  process.stdout.write(`[seed] gift card GIFT-XK92-TREK: ${g}\n`);

  const { validateVoucherLogic } = await import(
    pathToFileURL(join(root, "backend", "controllers", "voucher.controller.js"))
      .href
  );
  const { validateGiftCardLogic } = await import(
    pathToFileURL(
      join(root, "backend", "controllers", "giftcard.controller.js"),
    ).href
  );

  const trekRes = await validateVoucherLogic({
    code: "TREKORA15",
    bookingAmount: 10_000,
    packageId: "trek:roopkund-trek",
    userId: "",
  });
  assertOk(
    "TREKORA15 trek 15%",
    trekRes.success && trekRes.discountAmount === 1500,
    trekRes.message,
  );

  const yatraRes = await validateVoucherLogic({
    code: "TREKORA15",
    bookingAmount: 20_000,
    packageId: "yatra:char-dham-yatra",
    userId: "",
  });
  assertOk(
    "TREKORA15 yatra 15%",
    yatraRes.success && yatraRes.discountAmount === 3000,
    yatraRes.message,
  );

  const packageRes = await validateVoucherLogic({
    code: "TREKORA15",
    bookingAmount: 20_000,
    packageId: "package:himalayan-circuit",
    userId: "",
  });
  assertOk(
    "TREKORA15 skips curated packages",
    !packageRes.success,
    packageRes.message,
  );

  const giftRes = await validateGiftCardLogic({
    code: "GIFT-XK92-TREK",
    bookingAmount: 10_000,
  });
  assertOk(
    "gift card GIFT-XK92-TREK",
    giftRes.success && giftRes.kind === "giftcard" && giftRes.discountAmount > 0,
    giftRes.message,
  );

  process.stdout.write("[seed] done — collections: vouchers, giftcards (db from MONGODB_URI)\n");
  process.exit(0);
} catch (err) {
  process.stderr.write(
    `[seed] failed: ${err instanceof Error ? err.message : String(err)}\n`,
  );
  process.exit(1);
}
