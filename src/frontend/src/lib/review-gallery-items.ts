import type {
  GalleryApiItem,
  ProductKind,
  TrekoraReview,
} from "@/lib/reviews-api";

/** Map a saved review's photos into gallery grid items (Reviews + Photos tabs). */
export function reviewToGalleryItems(
  review: TrekoraReview,
  productType: ProductKind,
): GalleryApiItem[] {
  const urls = review.photoUrls?.length > 0 ? review.photoUrls : [];

  const label = productType === "yatra" ? "Yatra" : "Trek";

  return urls.map((src, i) => ({
    id: `review-${review.id}-${i}`,
    src,
    title: review.trekName,
    subtitle: label,
    category: productType === "yatra" ? "Yatras" : "Treks",
    credit: `Photo by ${review.userName}`,
    trekSlug: review.trekSlug,
    trekName: review.trekName,
    type: productType,
    source: "review" as const,
    reviewId: review.id,
    createdAt: review.createdAt,
  }));
}
