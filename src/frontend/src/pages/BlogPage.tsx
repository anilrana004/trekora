import { SITE_ORIGIN } from "@/lib/site-config";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Search } from "lucide-react";
import { motion } from "@/lib/motion";
import { useMemo, useState } from "react";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";
import { getPublishedBlogs, type Blog } from "../data/blogs";
import { resolveBlogCardImage } from "../lib/blog-product-images";

function formatBlogDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.45 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-card"
      style={{ borderColor: "var(--ew-gray-mid)" }}
      whileHover={{
        y: -4,
        boxShadow: "0 14px 36px rgba(26,26,46,0.1)",
      }}
    >
      <Link
        to="/blog/$slug"
        params={{ slug: blog.slug }}
        className="flex h-full flex-col"
        data-ocid={`blog.card.${index + 1}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <OptimizedImage
            src={resolveBlogCardImage(blog)}
            alt={blog.title}
            variant="blog-card"
            width={640}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span
            className="absolute left-3 top-3 text-[10px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded"
            style={{
              background: "rgba(255,255,255,0.96)",
              color: "var(--ew-red)",
            }}
          >
            {blog.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div
            className="mb-2.5 flex items-center gap-2 text-[11px] font-medium"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            <span className="inline-flex items-center gap-1">
              <Clock size={11} aria-hidden />
              {blog.readTime} min
            </span>
            <span aria-hidden>·</span>
            <time dateTime={blog.publishedAt}>
              {formatBlogDate(blog.publishedAt)}
            </time>
          </div>
          <h3
            className="mb-2 text-[1.05rem] font-bold leading-snug line-clamp-2 transition-colors group-hover:text-[color:var(--ew-red)]"
            style={{ color: "var(--ew-text)" }}
          >
            {blog.title}
          </h3>
          <p
            className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3"
            style={{ color: "var(--ew-text-lt)" }}
          >
            {blog.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            <span
              className="text-xs font-medium truncate"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              {blog.author}
            </span>
            <span
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wide"
              style={{ color: "var(--ew-orange)" }}
            >
              Read
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const published = useMemo(() => getPublishedBlogs(), []);
  const categories = useMemo(() => {
    const set = new Set(published.map((b) => b.category).filter(Boolean));
    return ["All", ...[...set].sort()];
  }, [published]);

  const featured = published.find((b) => b.isFeatured) ?? published[0];

  const filtered = published.filter((b) => {
    const matchSearch =
      search === "" ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = category === "All" || b.category === category;
    const notFeaturedInAll =
      category !== "All" || search !== "" || b.slug !== featured?.slug;
    return matchSearch && matchCat && notFeaturedInAll;
  });

  return (
    <div
      className="blog-index pt-16 min-h-screen"
      style={{ background: "var(--ew-white)" }}
    >
      <SEOHead
        title="Trek Knowledge — Travel Stories & Tips from the Himalayas | Trekora"
        description="Expert Himalayan trek guides, yatra tips, destination stories, safety advice, and gear recommendations from Trekora."
        keywords="Himalayan trek blog, trekking tips India, Trekora travel stories, trek guides Uttarakhand"
        canonical={`${SITE_ORIGIN}/blog`}
      />

      {/* Editorial masthead */}
      <header
        className="border-b"
        style={{
          background: "var(--ew-gray-lt)",
          borderColor: "var(--ew-gray-mid)",
        }}
      >
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "var(--ew-red)" }}
            >
              Trek Knowledge
            </p>
            <h1
              className="section-title mx-auto mb-4 text-3xl md:text-5xl"
              style={{ color: "var(--ew-text)" }}
            >
              Himalayan Stories &amp; Guides
            </h1>
            <p
              className="mx-auto mb-8 max-w-xl text-sm md:text-base leading-relaxed"
              style={{ color: "var(--ew-text-lt)" }}
            >
              Field-tested trek guides, yatra tips, safety notes, and mountain
              stories from the Trekora team — written for people who actually go.
            </p>
            <div className="relative mx-auto max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--ew-gray-dark)" }}
                aria-hidden
              />
              <input
                type="search"
                placeholder="Search guides, destinations, tips…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                  // @ts-expect-error CSS custom property for focus ring
                  "--tw-ring-color": "rgba(192,0,28,0.25)",
                }}
                data-ocid="blog.search_input"
              />
            </div>
          </motion.div>
        </div>
      </header>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-blog" />

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Featured story */}
        {featured && category === "All" && search === "" ? (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="blog-featured group mb-12 grid grid-cols-1 overflow-hidden rounded-2xl border bg-white shadow-card transition-shadow hover:shadow-elevated md:grid-cols-5"
            style={{ borderColor: "var(--ew-gray-mid)" }}
            data-ocid="blog.featured"
          >
            <div className="relative min-h-[240px] overflow-hidden md:col-span-3 md:min-h-[360px]">
              <OptimizedImage
                src={resolveBlogCardImage(featured)}
                alt={featured.title}
                fill
                priority
                variant="hero"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:col-span-2 md:p-9 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded"
                  style={{
                    background: "var(--ew-red)",
                    color: "#fff",
                  }}
                >
                  Featured
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wide"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {featured.category}
                </span>
              </div>
              <h2
                className="mb-3 text-2xl font-bold leading-tight transition-colors md:text-[1.75rem] group-hover:text-[color:var(--ew-red)]"
                style={{ color: "var(--ew-text)" }}
              >
                {featured.title}
              </h2>
              <p
                className="mb-5 text-sm leading-relaxed line-clamp-4 md:text-[0.95rem]"
                style={{ color: "var(--ew-text-lt)" }}
              >
                {featured.excerpt}
              </p>
              <div
                className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                <span className="font-medium" style={{ color: "var(--ew-text)" }}>
                  {featured.author}
                </span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} aria-hidden />
                  {featured.readTime} min read
                </span>
                <span aria-hidden>·</span>
                <time dateTime={featured.publishedAt}>
                  {formatBlogDate(featured.publishedAt)}
                </time>
              </div>
              <span
                className="inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-opacity group-hover:opacity-90"
                style={{ background: "var(--ew-orange)" }}
              >
                Read the guide
                <ArrowRight size={16} aria-hidden />
              </span>
            </div>
          </Link>
        ) : null}

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              className="text-lg font-bold md:text-xl"
              style={{ color: "var(--ew-text)" }}
            >
              {category === "All" ? "All guides" : category}
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: "var(--ew-gray-dark)" }}>
              {filtered.length} article{filtered.length === 1 ? "" : "s"}
              {search ? ` matching “${search}”` : ""}
            </p>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors"
                  style={{
                    borderColor: active ? "var(--ew-red)" : "var(--ew-gray-mid)",
                    background: active ? "var(--ew-red)" : "#fff",
                    color: active ? "#fff" : "var(--ew-text)",
                  }}
                  data-ocid={`blog.category.${cat.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="rounded-2xl border bg-[var(--ew-gray-lt)] py-20 text-center"
            style={{ borderColor: "var(--ew-gray-mid)" }}
            data-ocid="blog.empty_state"
          >
            <p className="font-semibold" style={{ color: "var(--ew-text)" }}>
              No articles found
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Try a different category or search term
            </p>
            <button
              type="button"
              className="mt-4 text-sm font-bold underline underline-offset-4"
              style={{ color: "var(--ew-red)" }}
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filtered.map((blog, i) => (
              <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <aside
          className="mt-14 overflow-hidden rounded-2xl px-6 py-10 text-center md:px-10 md:py-12"
          style={{ background: "var(--ew-footer)" }}
          data-ocid="blog.index_cta"
        >
          <p
            className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Ready for the trail?
          </p>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Turn guides into bookings
          </h2>
          <p
            className="mx-auto mb-6 max-w-lg text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.72)" }}
          >
            Browse fixed departure batches, curated treks, and Himalayan yatras —
            planned with the same care as these articles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/treks"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white"
              style={{ background: "var(--ew-orange)" }}
            >
              Explore treks
              <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              to="/yatras"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-bold text-white"
              style={{ borderColor: "rgba(255,255,255,0.28)" }}
            >
              View yatras
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
