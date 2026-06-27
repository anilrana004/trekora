import { SEOHead } from "@/components/SEOHead";
import { NOT_FOUND_SEO } from "@/lib/route-seo";
import { Link } from "@tanstack/react-router";
import { Home, MapPin, Mountain } from "lucide-react";
import { motion } from "@/lib/motion";
import ListingCardMedia from "../components/media/ListingCardMedia";
import { TREKS } from "../data/treks";

const featuredTreks = TREKS.filter((t) => t.isFeatured).slice(0, 4);
const displayTreks =
  featuredTreks.length >= 4 ? featuredTreks : TREKS.slice(0, 4);

function MountainSVG() {
  return (
    <svg
      viewBox="0 0 800 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xl mx-auto opacity-20"
      aria-hidden="true"
    >
      <polygon points="400,20 560,220 240,220" fill="#c0001c" />
      <polygon points="260,80 380,220 140,220" fill="#e87722" />
      <polygon points="560,100 680,220 440,220" fill="#c0001c" opacity="0.6" />
      <polygon points="660,120 780,220 540,220" fill="#e87722" opacity="0.4" />
      <polygon points="100,140 220,220 0,220" fill="#c0001c" opacity="0.3" />
    </svg>
  );
}

export default function NotFoundPage() {
  return (
    <main id="main-content">
      <SEOHead
        title={NOT_FOUND_SEO.title}
        description={NOT_FOUND_SEO.description}
        canonical={NOT_FOUND_SEO.canonical}
        noindex={NOT_FOUND_SEO.noindex}
      />
      {/* Hero 404 section */}
      <section
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <MountainSVG />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4"
        >
          <span
            className="block font-bold leading-none select-none"
            style={{ fontSize: "7rem", color: "var(--ew-red)" }}
          >
            404
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ color: "var(--ew-text)" }}
          >
            Trek Not Found
          </h1>
          <p
            className="mt-3 text-lg max-w-md mx-auto"
            style={{ color: "var(--ew-text-lt)" }}
          >
            The page you're looking for has wandered off the trail.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              to="/treks"
              className="btn-primary flex items-center gap-2"
              data-ocid="not-found.explore_treks_button"
            >
              <Mountain size={18} />
              Explore All Treks
            </Link>
            <Link
              to="/"
              className="btn-secondary flex items-center gap-2"
              data-ocid="not-found.home_button"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Popular Treks */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <h2 className="section-title mb-8">Popular Treks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayTreks.map((trek, idx) => (
            <motion.div
              key={trek.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to="/treks/$slug"
                params={{ slug: trek.slug }}
                className="trek-card block group"
                data-ocid={`not-found.suggested.item.${idx + 1}`}
              >
                <ListingCardMedia
                  src={trek.image}
                  alt={trek.name}
                  variant="trek-card"
                  className="group-hover:[&_.listing-card-media__img]:scale-[1.04]"
                />
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin size={12} style={{ color: "var(--ew-red)" }} />
                    <span
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {trek.startPoint}
                    </span>
                  </div>
                  <h3
                    className="font-semibold text-sm leading-snug"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {trek.name}
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {trek.duration} days · {trek.difficulty}
                  </p>
                  <p className="trek-price text-sm mt-2">
                    ₹{trek.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
