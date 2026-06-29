import { buildReviewsPageSEO } from "@/lib/product-seo";
import { motion } from "@/lib/motion";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import HomepageReviews from "../components/HomepageReviews";
import { SEOHead } from "../components/SEOHead";

const reviewsSeo = buildReviewsPageSEO();

export default function ReviewsPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">
      <SEOHead
        title={reviewsSeo.title}
        description={reviewsSeo.description}
        keywords={reviewsSeo.keywords}
        canonical={reviewsSeo.canonical}
      />

      <section className="py-12 md:py-16" data-ocid="reviews.hero">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "var(--ew-red)" }}
            >
              Trusted by 2,400+ Travelers
            </p>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: "var(--ew-text)" }}
            >
              Trekora Reviews
            </h1>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--ew-text-lt)" }}
            >
              Real stories from Himalayan trekkers and yatra pilgrims who booked
              with Trekora — verified ratings, Google reviews, and trekker
              feedback across Uttarakhand and Himachal Pradesh.
            </p>
          </motion.div>
        </div>
      </section>

      <GoogleReviewsSection />
      <HomepageReviews />
    </div>
  );
}
