import { useRef } from "react";
import { REVIEWS } from "../data/reviews";
import type { Review } from "../data/reviews";

// ─── Single review card ───────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex-none min-w-[280px] max-w-[280px] bg-white rounded-2xl p-5 mx-3 shadow-card border"
      style={{ borderColor: "var(--ew-gray-mid)" }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              color:
                n <= review.rating ? "var(--ew-gold)" : "var(--ew-gray-mid)",
              fontSize: 14,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review text — line-clamp 4 */}
      <p
        className="text-[13px] italic leading-relaxed mb-3"
        style={{
          color: "var(--ew-text-lt)",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        &ldquo;{review.review}&rdquo;
      </p>

      {/* Author */}
      <p
        className="font-semibold text-[13px]"
        style={{ color: "var(--ew-text)" }}
      >
        {review.author}
        <span style={{ color: "var(--ew-gray-dark)", fontWeight: 400 }}>
          {" "}
          · {review.city}
        </span>
      </p>

      {/* Trek badge */}
      {review.trekBadge && (
        <span
          className="mt-2 inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: "var(--ew-orange-lt)",
            color: "var(--ew-red)",
          }}
        >
          {review.trek}
        </span>
      )}
    </div>
  );
}

// ─── Row with infinite scroll ─────────────────────────────────────────────────

function ReviewRow({
  reviews,
  reverse = false,
}: { reviews: Review[]; reverse?: boolean }) {
  // Duplicate for seamless loop
  const doubled = [...reviews, ...reviews];

  return (
    <div
      className="overflow-hidden"
      // Pause on hover via CSS class added to wrapper
      style={{ cursor: "default" }}
      onMouseEnter={(e) => {
        const track = e.currentTarget.querySelector(".review-scroll-track");
        if (track instanceof HTMLElement)
          track.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const track = e.currentTarget.querySelector(".review-scroll-track");
        if (track instanceof HTMLElement)
          track.style.animationPlayState = "running";
      }}
    >
      <div
        className="review-scroll-track flex"
        style={{
          animation: `reviewScroll 40s linear infinite${
            reverse ? " reverse" : ""
          }`,
          willChange: "transform",
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`row-${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function HomepageReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Split 24 reviews into two rows of 12
  const row1 = REVIEWS.slice(0, 12);
  const row2 = REVIEWS.slice(12, 24);

  return (
    <section
      ref={sectionRef}
      className="py-14 overflow-hidden"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="homepage_reviews.section"
    >
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">What Trekkers Say</h2>
            <p className="text-sm mt-2" style={{ color: "var(--ew-text-lt)" }}>
              10,000+ adventures · 4.8 ⭐ average · Verified real experiences
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="text-sm font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              4.8/5
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} style={{ color: "var(--ew-gold)", fontSize: 14 }}>
                  ★
                </span>
              ))}
            </div>
            <span
              className="text-[12px] hidden sm:inline"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Google Reviews · 2,400+ ratings
            </span>
          </div>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4" data-ocid="homepage_reviews.row1">
        <ReviewRow reviews={row1} reverse={false} />
      </div>

      {/* Row 2 — scrolls right (hidden on mobile to avoid clutter) */}
      <div className="hidden md:block" data-ocid="homepage_reviews.row2">
        <ReviewRow reviews={row2} reverse={true} />
      </div>
    </section>
  );
}
