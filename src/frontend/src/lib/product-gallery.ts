/** Photo entry for trek/yatra detail Photos tab (static + Cloudinary uploads). */
export type ProductGalleryPhoto = {
  src: string;
  trekName?: string;
  productLabel?: string;
  fromReview?: boolean;
  source?: "product" | "review" | "cloudinary" | "static";
};
