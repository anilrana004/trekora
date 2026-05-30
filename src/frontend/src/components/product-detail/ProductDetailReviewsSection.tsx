import { Star } from "lucide-react";
import { useMemo } from "react";
import ReviewSubmitForm from "../ReviewSubmitForm";
import ShareSection from "../ShareSection";
import OptimizedImage from "../media/OptimizedImage";
import ReviewListSkeleton from "../reviews/ReviewListSkeleton";
import { useProductReviews } from "@/hooks/useProductReviews";
import {
  formatReviewDate,
  type ProductKind,
  type TrekoraReview,
} from "@/lib/reviews-api";
import StarRow from "./StarRow";

export default function ProductDetailReviewsSection({
  productName,
  productSlug,
  productType,
  fallbackRating,
  fallbackReviewCount,
  ocidPrefix,
  onContentChanged,
}: {
  productName: string;
  productSlug: string;
  productType: ProductKind;
  fallbackRating: number;
  fallbackReviewCount: number;
  ocidPrefix: string;
  onContentChanged?: () => void;
}) {
  const normalizedSlug = productSlug.trim().toLowerCase();

  const {
    reviews,
    count,
    avgRating,
    distribution,
    loading,
    loadingMore,
    error,
    hasMore,
    refetch,
    loadMore,
    prependReview,
  } = useProductReviews(normalizedSlug);

  const handleReviewSubmitted = (review?: TrekoraReview) => {
    if (review) prependReview(review);
    refetch({ silent: true });
    onContentChanged?.();
  };

  const displayRating = count > 0 ? avgRating : fallbackRating;
  const displayCount = count > 0 ? count : fallbackReviewCount;

  const distributionPct = useMemo(() => {
    const total = count || 1;
    return ([5, 4, 3, 2, 1] as const).map((star) => ({
      star,
      pct: Math.round(((distribution[star] ?? 0) / total) * 100),
    }));
  }, [count, distribution]);

  return (
    <div className="space-y-6">
      <ShareSection title={productName} />
      <h2 className="section-title">Reviews & Ratings</h2>

      <ReviewSubmitForm
        key={`review-form-${productType}-${normalizedSlug}`}
        trekSlug={normalizedSlug}
        trekName={productName}
        productType={productType}
        onSubmitted={handleReviewSubmitted}
      />

      <div
        className="flex flex-col items-start gap-6 rounded-xl p-5 sm:flex-row"
        style={{ backgroundColor: "var(--ew-gray-lt)" }}
      >
        <div className="text-center">
          <div
            className="text-5xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            {displayRating}
          </div>
          <div className="my-1 flex justify-center">
            <StarRow rating={displayRating} size={18} />
          </div>
          <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
            {displayCount} review{displayCount !== 1 ? "s" : ""}
            {count > 0 ? " · verified trekkers" : ""}
          </p>
        </div>
        <div className="w-full flex-1 space-y-1.5">
          {distributionPct.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span
                className="w-3 text-xs"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {star}
              </span>
              <Star
                size={11}
                style={{ color: "var(--ew-gold)" }}
                className="fill-[var(--ew-gold)]"
              />
              <div
                className="h-2 flex-1 rounded-full"
                style={{ backgroundColor: "var(--ew-gray-mid)" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "var(--ew-orange)",
                  }}
                />
              </div>
              <span
                className="w-8 text-[11px]"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {error ? (
        <p
          className="text-sm rounded-lg px-3 py-2"
          style={{ color: "#C0001C", background: "#FFF5F5" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {loading ? <ReviewListSkeleton /> : null}

      {!loading && !error && count === 0 ? (
        <div
          className="text-center py-10 rounded-2xl"
          style={{ background: "var(--ew-gray-lt)" }}
          data-ocid={`${ocidPrefix}.reviews.empty`}
        >
          <div className="text-5xl mb-3">🏔️</div>
          <h3
            className="font-bold text-base mb-1"
            style={{ color: "var(--ew-text)" }}
          >
            Be the first to review {productName}!
          </h3>
          <p
            className="text-sm max-w-xs mx-auto"
            style={{ color: "var(--ew-text-lt)" }}
          >
            Share your experience — optional photos upload with your review and
            also appear on the Photos tab.
          </p>
        </div>
      ) : null}

      {!loading && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className="rounded-xl p-4"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
              data-ocid={`${ocidPrefix}.review.${i + 1}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                  style={{
                    background: "var(--ew-red-lt)",
                    color: "var(--ew-red)",
                  }}
                >
                  {r.userName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {r.userName}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {formatReviewDate(r.createdAt)}
                      </p>
                    </div>
                    <StarRow rating={r.rating} size={13} />
                  </div>
                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {r.reviewText}
                  </p>
                  {r.photoUrls.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {r.photoUrls.map((src, pi) => (
                        <OptimizedImage
                          key={`${r.id}-photo-${pi}`}
                          src={src}
                          alt={`${r.userName} photo ${pi + 1}`}
                          variant="gallery-thumb"
                          width={160}
                          height={120}
                          className="w-full aspect-[4/3] rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          {hasMore ? (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="text-sm font-semibold px-5 py-2 rounded-full transition-opacity disabled:opacity-60"
                style={{
                  border: "1px solid var(--ew-red)",
                  color: "var(--ew-red)",
                }}
                data-ocid={`${ocidPrefix}.reviews.load_more`}
              >
                {loadingMore ? "Loading…" : "Load more reviews"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
