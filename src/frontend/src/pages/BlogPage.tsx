import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { BLOGS } from "../data/blogs";

const CATEGORIES = [
  "All",
  "Trek Guide",
  "Yatra",
  "Destination",
  "Safety",
  "Gear",
];

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = BLOGS.filter((b) => {
    const matchCat = category === "All" || b.category === category;
    const matchSearch =
      search === "" || b.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div
        className="py-16 text-center border-b"
        style={{
          background: "var(--ew-gray-lt)",
          borderColor: "var(--ew-gray-mid)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--ew-red)" }}
          >
            Trek Knowledge
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-3 section-title mx-auto">
            Travel Stories &amp; Tips
          </h1>
          <p className="mt-4 text-sm" style={{ color: "var(--ew-text-lt)" }}>
            Expert guides, tips and stories from the Himalayas
          </p>
        </motion.div>

        {/* Search */}
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--ew-gray-dark)" }}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm bg-white shadow-sm focus:outline-none"
              style={{ border: "2px solid var(--ew-red)" }}
              data-ocid="blog.search_input"
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white py-4 shadow-sm sticky top-16 z-20">
        <div className="container mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={
                category === c
                  ? { background: "var(--ew-red)", color: "#fff" }
                  : {
                      background: "var(--ew-gray-lt)",
                      color: "var(--ew-text-lt)",
                    }
              }
              data-ocid={`blog.filter.${c.toLowerCase().replace(/\s+/g, "_")}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

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
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  borderLeft: "3px solid transparent",
                  borderRadius: "0.75rem",
                  willChange: "transform",
                  overflow: "hidden",
                }}
                whileHover={{
                  scale: 1.035,
                  y: -6,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
                  borderLeftColor: "var(--ew-red)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: blog.slug }}
                  className="group block bg-white rounded-xl overflow-hidden"
                  data-ocid={`blog.card.${i + 1}`}
                >
                  <div className="h-52 overflow-hidden">
                    <motion.img
                      src={blog.heroImage}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <div className="p-5">
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
                      className="text-sm line-clamp-3 mb-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {blog.excerpt}
                    </p>
                    <div
                      className="flex items-center justify-between text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      <span>{blog.author}</span>
                      <span
                        className="font-semibold"
                        style={{ color: "var(--ew-red)" }}
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
