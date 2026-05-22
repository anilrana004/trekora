import mongoose from "mongoose";
import crypto from "crypto";

const transactionSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true },
    amountUsed: { type: Number, required: true, min: 0 },
    balanceBefore: { type: Number, required: true, min: 0 },
    balanceAfter: { type: Number, required: true, min: 0 },
    usedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const giftCardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    balance: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "INR", uppercase: true, trim: true },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true },
    transactions: { type: [transactionSchema], default: [] },
  },
  { timestamps: true, collection: "giftcards" },
);

function randomGiftSegment() {
  return crypto.randomBytes(2).toString("hex").toUpperCase();
}

giftCardSchema.pre("save", async function ensureCode(next) {
  if (this.code) return next();
  const GiftCard = this.constructor;
  let attempts = 0;
  while (attempts < 12) {
    const candidate = `GIFT-${randomGiftSegment()}-TREK`;
    const exists = await GiftCard.exists({ code: candidate });
    if (!exists) {
      this.code = candidate;
      return next();
    }
    attempts += 1;
  }
  next(new Error("Could not generate unique gift card code"));
});

giftCardSchema.index({ active: 1, expiresAt: 1 });

export const GiftCard =
  mongoose.models.GiftCard || mongoose.model("GiftCard", giftCardSchema);
