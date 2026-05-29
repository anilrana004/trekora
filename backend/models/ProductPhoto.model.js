import mongoose from "mongoose";

const productPhotoSchema = new mongoose.Schema(
  {
    trekSlug: { type: String, required: true, trim: true, lowercase: true, index: true },
    trekName: { type: String, required: true, trim: true },
    type: { type: String, enum: ["trek", "yatra"], required: true, index: true },
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    cloudinaryFolder: { type: String, default: "" },
    uploadedBy: { type: String, default: "Trekora trekker", trim: true },
    /** gallery-page = navbar /gallery upload; product-page = trek/yatra Photos tab */
    uploadSource: {
      type: String,
      enum: ["gallery-page", "product-page"],
      default: "product-page",
      index: true,
    },
    tags: { type: [String], default: [] },
    approved: { type: Boolean, default: true, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { collection: "product_photos", timestamps: false },
);

productPhotoSchema.index({ trekSlug: 1, type: 1, approved: 1, createdAt: -1 });
productPhotoSchema.index({ tags: 1 });

export const ProductPhoto =
  mongoose.models.ProductPhoto ||
  mongoose.model("ProductPhoto", productPhotoSchema);
