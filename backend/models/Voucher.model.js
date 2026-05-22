import mongoose from "mongoose";

const usedBySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    bookingId: { type: String, required: true },
    usedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const voucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percent", "flat"],
      required: true,
    },
    discountValue: { type: Number, required: true, min: 0 },
    minBookingAmount: { type: Number, default: 0, min: 0 },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true },
    maxDiscountAmount: { type: Number, default: null, min: 0 },
    applicablePackages: { type: [String], default: [] },
    maxUses: { type: Number, default: null, min: 1 },
    usedCount: { type: Number, default: 0, min: 0 },
    usedBy: { type: [usedBySchema], default: [] },
  },
  { timestamps: true, collection: "vouchers" },
);

voucherSchema.index({ active: 1, expiresAt: 1 });
voucherSchema.index({ code: 1, active: 1 });
voucherSchema.index({ "usedBy.userId": 1 });

export const Voucher =
  mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);
