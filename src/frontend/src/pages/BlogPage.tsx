import { SITE_ORIGIN } from "@/lib/site-config";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "@/lib/motion";
import { useState } from "react";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";
import { BLOGS } from "../data/blogs";
import { resolveBlogCardImage } from "../lib/blog-product-images";

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filtered = BLOGS.filter((b) => {
    const matchSearch =
      search === "" || b.title.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title="Trek Knowledge — Travel Stories & Tips from the Himalayas | Trekora"
        description="Expert Himalayan trek guides, yatra tips, destination stories, safety advice, and gear recommendations from Trekora."
        keywords="Himalayan trek blog, trekking tips India, Trekora travel stories, trek guides Uttarakhand"
        canonical={`${SITE_ORIGIN}/blog`}
      />

      {/* Hero — matches gallery / packages listing */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--ew-red)" }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z"
            fill="white"
          />
          <path
            d="M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z"
            fill="white"
            opacity="0.5"
          />
        </svg>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Trek Knowledge
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              Travel Stories &amp; Tips
            </h1>
            <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto mb-6">
              Expert guides, tips and stories from the Himalayas
            </p>

            {/* Search */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70"
                  aria-hidden
                />
                <input
                  type="search"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm bg-white/95 text-[var(--ew-text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-white/80"
                  style={{ border: "2px solid rgba(255,255,255,0.5)" }}
                  data-ocid="blog.search_input"
                />
              </div>
            </div>

            <span
              className="inline-block mt-6 px-7 py-2.5 rounded-full text-sm font-semibold text-white shadow-md"
              style={{
                backgroundColor: "var(--ew-red)",
                border: "2px solid rgba(255,255,255,0.35)",
              }}
            >
              All Articles
            </span>
          </motion.div>
        </div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-blog" />

      {/* Grid */}
      <div className="container mx-auto px-4 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="blog.empty_state">
            <p className="text-4xl mb-3">📭</p>
            <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
              No articles found
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Try a different category or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-xl overflow-hidden shadow-card flex flex-col"
                style={{
                  borderLeft: "3px solid transparent",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                  borderLeftColor: "var(--ew-red)",
                }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: blog.slug }}
                  className="group block flex-1"
                  data-ocid={`blog.card.${i + 1}`}
                >
                  <div className="h-52 overflow-hidden">
                    <OptimizedImage
                      src={resolveBlogCardImage(blog)}
                      alt={blog.title}
                      variant="blog-card"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full"
                        style={{
                          background: "var(--ew-red-lt)",
                          color: "var(--ew-red)",
                        }}
                      >
                        {blog.category}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {blog.readTime} min read
                      </span>
                    </div>
                    <h3
                      className="font-bold text-lg mb-2 line-clamp-2 transition-colors group-hover:text-[color:var(--ew-red)]"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {blog.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {blog.excerpt}
                    </p>
                    <p
                      className="text-xs mt-3"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {blog.author}
                    </p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
