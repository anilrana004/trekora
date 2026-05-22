import { buildWhatsAppUrl } from "@/lib/site-contact";
import { Link, useParams } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  Clock,
  Copy,
  Facebook,
  Twitter,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import OptimizedImage from "../components/media/OptimizedImage";
import { BLOGS } from "../data/blogs";
import { resolveBlogCardImage } from "../lib/blog-product-images";

export default function BlogDetailPage() {
  const { slug } = useParams({ from: "/layout/blog/$slug" });
  const rawBlog = BLOGS.find((b) => b.slug === slug);
  const blog = rawBlog
    ? { ...rawBlog, heroImage: resolveBlogCardImage(rawBlog) }
    : undefined;
  // Related: same tags first, then most recent
  const related = BLOGS.filter((b) => b.slug !== slug)
    .map((b) => ({
      ...b,
      score: b.tags.filter((t) => blog?.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    return (
      <div
        className="pt-20 min-h-screen flex items-center justify-center"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--ew-text)" }}
          >
            Article not found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white transition-colors"
          >
            Browse Blog <ChevronRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppUrl(
    `${blog.title} — ${typeof window !== "undefined" ? window.location.href : ""}`,
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div className="relative h-80 md:h-[420px] overflow-hidden">
        <OptimizedImage
          src={blog.heroImage}
          alt={blog.title}
          fill
          priority
          variant="hero"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "var(--ew-red-lt)", color: "var(--ew-red)" }}
          >
            {blog.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3 max-w-3xl text-shadow">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs mb-6"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <Link
            to="/"
            className="hover:text-[color:var(--ew-red)] transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            to="/blog"
            className="hover:text-[color:var(--ew-red)] transition-colors"
          >
            Blog
          </Link>
          <ChevronRight size={12} />
          <span className="line-clamp-1" style={{ color: "var(--ew-text)" }}>
            {blog.title}
          </span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 text-sm mb-6"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {blog.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {blog.readTime} min read
            </span>
          </div>

          {/* Article body */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <p
              className="text-lg font-medium mb-6 pb-6"
              style={{
                color: "var(--ew-text-lt)",
                borderBottom: "1px solid var(--ew-gray-mid)",
              }}
            >
              {blog.excerpt}
            </p>
            <div
              className="leading-relaxed whitespace-pre-line"
              style={{ color: "var(--ew-text-lt)" }}
            >
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Social share */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--ew-text)" }}
            >
              Share:
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-full border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              data-ocid="blog.share.whatsapp"
            >
              WhatsApp
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-full border-2 border-[#1D9BF0] text-[#1D9BF0] hover:bg-[#1D9BF0] hover:text-white transition-colors"
              data-ocid="blog.share.twitter"
            >
              <Twitter size={14} aria-hidden /> Twitter
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-full border-2 border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors"
              data-ocid="blog.share.facebook"
            >
              <Facebook size={14} aria-hidden /> Facebook
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white transition-colors"
              data-ocid="blog.share.copy_link"
            >
              <Copy size={14} aria-hidden />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>

          {/* Author bio */}
          <div
            className="mt-8 rounded-2xl p-6 flex items-start gap-4"
            style={{
              background: "var(--ew-white)",
              border: "2px solid var(--ew-red)",
              borderLeft: "5px solid var(--ew-red)",
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shrink-0"
              style={{ background: "var(--ew-red)" }}
            >
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold" style={{ color: "var(--ew-text)" }}>
                {blog.author}
              </p>
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: "var(--ew-red)" }}
              >
                Trekora Trek Expert
              </p>
              <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                {blog.authorBio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Reads */}
        {related.length > 0 && (
          <div className="mt-12" data-ocid="blog.related_reads">
            <h2 className="section-title mb-6">Related Reads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((b, i) => (
                <Link
                  key={b.id}
                  to="/blog/$slug"
                  params={{ slug: b.slug }}
                  className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all"
                  data-ocid={`blog.related.${i + 1}`}
                >
                  <div className="relative h-36 overflow-hidden">
                    <OptimizedImage
                      src={resolveBlogCardImage(b)}
                      alt={b.title}
                      fill
                      variant="blog-card"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                      style={{
                        background: "var(--ew-red-lt)",
                        color: "var(--ew-red)",
                      }}
                    >
                      {b.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <p
                      className="font-bold text-sm line-clamp-2 mb-1 transition-colors group-hover:text-[color:var(--ew-red)]"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {b.title}
                    </p>
                    <p
                      className="text-xs line-clamp-2"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.excerpt.slice(0, 80)}…
                    </p>
                    <span className="inline-flex items-center justify-center gap-1 mt-2 text-[11px] font-semibold py-1.5 px-3 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] group-hover:bg-[var(--ew-red)] group-hover:text-white transition-colors">
                      Read More <ChevronRight size={12} aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
