import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    trekSlug: { type: String, required: true, trim: true, lowercase: true },
    trekName: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["trek", "yatra"],
      required: true,
    },
    userName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true, trim: true },
    photoUrls: { type: [String], default: [] },
    photos: {
      type: [
        {
          url: { type: String, required: true },
          publicId: { type: String, default: "" },
          cloudinaryFolder: { type: String, default: "" },
          width: { type: Number },
          height: { type: Number },
        },
      ],
      default: [],
    },
    tags: { type: [String], default: [] },
    approved: { type: Boolean, default: false, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  {
    collection: "reviews",
    timestamps: false,
  },
);

reviewSchema.index({ trekSlug: 1, approved: 1, createdAt: -1 });
reviewSchema.index({ trekSlug: 1, type: 1, approved: 1, createdAt: -1 });
reviewSchema.index({ type: 1, approved: 1, createdAt: -1 });
reviewSchema.index({ rating: 1, approved: 1 });
reviewSchema.index({ tags: 1 });
reviewSchema.index({ approved: 1, createdAt: -1 });

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
