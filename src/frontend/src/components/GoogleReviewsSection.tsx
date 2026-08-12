import { motion } from "@/lib/motion";

const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    text: "Trekora made our Kedarkantha trek unforgettable! The guides were professional, safety measures top-notch, and the entire experience exceeded expectations. Highly recommend for first-timers.",
    date: "March 2026",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    rating: 5,
    text: "Booked Triund trek with Trekora. From booking to completion, every detail was taken care of. The team was responsive and the trek itself was breathtaking.",
    date: "February 2026",
  },
  {
    name: "Anita Kapoor",
    city: "Bangalore",
    rating: 4,
    text: "Valley of Flowers trek was magical. Trekora team knows these trails inside out. A bit pricey but worth every rupee for the safety and experience.",
    date: "January 2026",
  },
];

const AGGREGATE = { ratingValue: 4.8, reviewCount: 2400 };

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          style={{
            color: n <= rating ? "var(--ew-gold)" : "var(--ew-gray-mid)",
            fontSize: 14,
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export default function GoogleReviewsSection() {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Trekora",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(AGGREGATE.ratingValue),
      reviewCount: String(AGGREGATE.reviewCount),
    },
  });

  return (
    <section className="py-12 section-alt" data-ocid="google_reviews.section">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="container mx-auto px-4">
        {/* Aggregate rating header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* Google G icon */}
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span
              className="font-bold text-4xl"
              style={{ color: "var(--ew-text)" }}
            >
              {AGGREGATE.ratingValue}
            </span>
            <div className="text-left">
              <StarRow rating={Math.round(AGGREGATE.ratingValue)} />
              <p
                className="text-[12px]"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Google Reviews · {AGGREGATE.reviewCount.toLocaleString("en-IN")}
                + ratings
              </p>
            </div>
          </div>
          <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
            What our trekkers are saying on Google
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-card"
              style={{ borderLeft: "3px solid var(--ew-gray-lt)" }}
              data-ocid={`google_reviews.card.${i + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {r.name}
                  </p>
                  <p
                    className="text-[12px]"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {r.city} · {r.date}
                  </p>
                </div>
                <StarRow rating={r.rating} />
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--ew-text-lt)" }}
              >
                "{r.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
