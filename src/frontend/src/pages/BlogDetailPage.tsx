import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Share2,
} from "lucide-react";
import { motion } from "@/lib/motion";
import { useMemo, useState } from "react";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";
import { getPublishedBlogs } from "../data/blogs";
import { prepareBlogArticle } from "../lib/blog-content";
import {
  resolveBlogCardImage,
  resolveRelatedProducts,
} from "../lib/blog-product-images";
import { getBlogDetailSEO } from "../lib/route-seo";
import BlogArticleToc from "../components/BlogArticleToc";

function youtubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
  return null;
}

function formatBlogDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetailPage() {
  const { slug } = useParams({ from: "/layout/blog/$slug" });
  const [copied, setCopied] = useState(false);
  const published = useMemo(() => getPublishedBlogs(), []);
  const rawBlog = published.find((b) => b.slug === slug);
  const blog = rawBlog
    ? { ...rawBlog, heroImage: resolveBlogCardImage(rawBlog) }
    : undefined;

  const related = published
    .filter((b) => b.slug !== slug)
    .map((b) => ({
      ...b,
      score: b.tags.filter((t) => blog?.tags.includes(t)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, 3);

  const relatedProducts = blog ? resolveRelatedProducts(blog) : [];
  const primaryProduct = relatedProducts[0];
  const prepared = useMemo(
    () =>
      blog?.content
        ? prepareBlogArticle(blog.content)
        : { bodyHtml: "", faqs: [], toc: [] },
    [blog?.content],
  );
  const bodyHtml = prepared.bodyHtml;
  const articleFaqs = useMemo(() => {
    const fromCms = blog?.faqs ?? [];
    const fromHtml = prepared.faqs;
    const seen = new Set<string>();
    return [...fromCms, ...fromHtml].filter((f) => {
      const key = f.question.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return Boolean(f.answer?.trim());
    });
  }, [blog?.faqs, prepared.faqs]);
  const tocItems = useMemo(() => {
    const items = prepared.toc;
    if (articleFaqs.length > 0) return items;
    return items.filter((t) => t.id !== "faq");
  }, [prepared.toc, articleFaqs.length]);
  const embed = blog?.youtubeUrl ? youtubeEmbedUrl(blog.youtubeUrl) : null;

  async function onShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share && blog) {
        await navigator.share({ title: blog.title, text: blog.excerpt, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled share */
    }
  }

  if (!blog) {
    return (
      <div
        className="flex min-h-screen items-center justify-center pt-20"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <div className="text-center">
          <h1
            className="mb-4 text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Article not found
          </h1>
          <Link
            to="/blog"
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: "var(--ew-red)" }}
          >
            Browse Blog
          </Link>
        </div>
      </div>
    );
  }

  const blogSeo = getBlogDetailSEO(blog);

  return (
    <div
      className="blog-article-page min-h-screen pt-16"
      style={{ background: "var(--ew-white)" }}
    >
      <SEOHead
        title={blogSeo.title}
        description={blogSeo.description}
        keywords={blogSeo.keywords}
        canonical={blogSeo.canonical}
        ogImage={blogSeo.ogImage}
        ogType={blogSeo.ogType}
        schema={blogSeo.schema}
      />
      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-blog" />

      {/* Editorial header — title first, then image (production magazine pattern) */}
      <header
        className="border-b"
        style={{
          background: "var(--ew-gray-lt)",
          borderColor: "var(--ew-gray-mid)",
        }}
      >
        <div className="container mx-auto max-w-5xl px-4 pb-8 pt-8 md:pb-10 md:pt-10">
          <nav
            className="mb-6 flex items-center gap-1.5 text-[11px] font-medium"
            style={{ color: "var(--ew-gray-dark)" }}
            aria-label="Breadcrumb"
          >
            <Link to="/" className="transition-colors hover:text-[color:var(--ew-red)]">
              Home
            </Link>
            <ChevronRight size={12} aria-hidden />
            <Link
              to="/blog"
              className="transition-colors hover:text-[color:var(--ew-red)]"
            >
              Blog
            </Link>
            <ChevronRight size={12} aria-hidden />
            <span className="line-clamp-1" style={{ color: "var(--ew-text)" }}>
              {blog.category}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-3xl"
          >
            <span
              className="mb-4 inline-block text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: "var(--ew-red)" }}
            >
              {blog.category}
            </span>
            <h1
              className="mb-4 text-3xl font-bold leading-[1.15] md:text-4xl lg:text-[2.65rem]"
              style={{ color: "var(--ew-text)" }}
            >
              {blog.title}
            </h1>
            <p
              className="mb-6 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--ew-text-lt)" }}
            >
              {blog.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "var(--ew-red)" }}
                    aria-hidden
                  >
                    {blog.author.charAt(0)}
                  </span>
                  <span className="font-semibold" style={{ color: "var(--ew-text)" }}>
                    {blog.author}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden />
                  <time dateTime={blog.publishedAt}>
                    {formatBlogDate(blog.publishedAt)}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden />
                  {blog.readTime} min read
                </span>
              </div>
              <button
                type="button"
                onClick={() => void onShare()}
                className="inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-xs font-semibold transition-colors"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                }}
                data-ocid="blog.share_button"
              >
                <Share2 size={14} aria-hidden />
                {copied ? "Link copied" : "Share"}
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Featured image */}
      <div
        className="relative mx-auto max-w-5xl overflow-hidden md:px-4"
        data-travel-image-section
      >
        <div className="relative aspect-[16/9] overflow-hidden md:mt-8 md:rounded-2xl">
          <OptimizedImage
            src={blog.heroImage}
            alt={blog.title}
            fill
            priority
            variant="hero"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
          >
            {embed ? (
              <div className="mb-8 aspect-video overflow-hidden rounded-xl border"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              >
                <iframe
                  src={embed}
                  title="Article video"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}

            <BlogArticleToc items={tocItems} variant="mobile" />

            <article className="blog-article-shell">
              <div
                className="blog-article-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            </article>

            {blog.tags.length > 0 ? (
              <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--ew-gray-mid)" }}>
                <p
                  className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "var(--ew-gray-mid)",
                        color: "var(--ew-text)",
                        background: "var(--ew-gray-lt)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Author */}
            <aside
              className="mt-10 flex gap-4 rounded-2xl border p-5 md:p-6"
              style={{
                borderColor: "var(--ew-gray-mid)",
                background: "var(--ew-gray-lt)",
              }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ background: "var(--ew-red)" }}
              >
                {blog.author.charAt(0)}
              </div>
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "var(--ew-red)" }}
                >
                  Written by
                </p>
                <p className="mt-1 font-bold" style={{ color: "var(--ew-text)" }}>
                  {blog.author}
                </p>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--ew-text-lt)" }}>
                  {blog.authorBio ||
                    "Trekora trek expert — sharing Himalayan trails, yatra wisdom, and field-tested advice from the mountains."}
                </p>
              </div>
            </aside>

            {articleFaqs.length > 0 ? (
              <section
                id="faq"
                className="mt-10 scroll-mt-24"
                data-ocid="blog.faq"
              >
                <h2
                  className="section-title mb-5 text-2xl"
                  style={{ color: "var(--ew-text)" }}
                >
                  Frequently Asked Questions
                </h2>
                <div
                  className="divide-y overflow-hidden rounded-2xl border bg-white"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  {articleFaqs.map((faq) => (
                    <details key={faq.question} className="group px-5 py-4">
                      <summary
                        className="cursor-pointer list-none font-semibold text-sm md:text-[0.95rem] [&::-webkit-details-marker]:hidden"
                        style={{ color: "var(--ew-text)" }}
                      >
                        <span className="flex items-start justify-between gap-3">
                          {faq.question}
                          <span
                            className="mt-0.5 shrink-0 text-lg leading-none transition-transform group-open:rotate-45"
                            style={{ color: "var(--ew-orange)" }}
                            aria-hidden
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <p
                        className="mt-3 text-sm leading-relaxed"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </motion.div>

          {/* Desktop rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto pb-4">
              {tocItems.length > 0 ? (
                <BlogArticleToc items={tocItems} variant="sidebar" />
              ) : null}

              {primaryProduct ? (
                <div
                  className="overflow-hidden rounded-2xl border bg-white shadow-card"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid="blog.sidebar_product"
                >
                  <div className="relative h-36">
                    <OptimizedImage
                      src={primaryProduct.image}
                      alt={primaryProduct.name}
                      fill
                      variant="blog-card"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.12em]"
                      style={{ color: "var(--ew-red)" }}
                    >
                      Related {primaryProduct.kind}
                    </p>
                    <p
                      className="mt-1 font-bold leading-snug"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {primaryProduct.name}
                    </p>
                    <Link
                      to={
                        primaryProduct.kind === "trek"
                          ? "/treks/$slug"
                          : "/yatras/$slug"
                      }
                      params={{ slug: primaryProduct.slug }}
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-white"
                      style={{ background: "var(--ew-orange)" }}
                    >
                      View details
                      <ArrowRight size={15} aria-hidden />
                    </Link>
                  </div>
                </div>
              ) : null}

              <div
                className="rounded-2xl border p-4"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  background: "var(--ew-gray-lt)",
                }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Keep exploring
                </p>
                <Link
                  to="/blog"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--ew-red)" }}
                >
                  All trek guides
                  <ArrowRight size={14} aria-hidden />
                </Link>
                <Link
                  to="/treks"
                  className="mt-2 flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: "var(--ew-text)" }}
                >
                  Browse treks
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 ? (
          <section className="mt-12" data-ocid="blog.related_products">
            <h2 className="section-title mb-5">Related Treks &amp; Yatras</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <Link
                  key={`${p.kind}-${p.slug}`}
                  to={p.kind === "trek" ? "/treks/$slug" : "/yatras/$slug"}
                  params={{ slug: p.slug }}
                  className="group flex gap-3 rounded-xl border bg-white p-3 transition-shadow hover:shadow-elevated"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={p.image}
                      alt={p.name}
                      fill
                      variant="blog-card"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--ew-red)" }}
                    >
                      {p.kind}
                    </p>
                    <p
                      className="font-bold text-sm line-clamp-2 group-hover:text-[color:var(--ew-red)]"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {p.name}
                    </p>
                    <p
                      className="mt-1 text-xs font-semibold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      View details →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-14 border-t pt-12" style={{ borderColor: "var(--ew-gray-mid)" }} data-ocid="blog.related_reads">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="section-title mb-0 text-2xl">Related Reads</h2>
              <Link
                to="/blog"
                className="hidden text-sm font-semibold sm:inline-flex sm:items-center sm:gap-1"
                style={{ color: "var(--ew-orange)" }}
              >
                View all
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((b, i) => (
                <Link
                  key={b.slug}
                  to="/blog/$slug"
                  params={{ slug: b.slug }}
                  className="group overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-elevated"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid={`blog.related.${i + 1}`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <OptimizedImage
                      src={resolveBlogCardImage(b)}
                      alt={b.title}
                      fill
                      variant="blog-card"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="mb-1.5 text-[10px] font-bold uppercase tracking-wide"
                      style={{ color: "var(--ew-red)" }}
                    >
                      {b.category}
                    </p>
                    <p
                      className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-[color:var(--ew-red)]"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {b.title}
                    </p>
                    <p
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      Read guide
                      <ArrowRight size={12} aria-hidden />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
