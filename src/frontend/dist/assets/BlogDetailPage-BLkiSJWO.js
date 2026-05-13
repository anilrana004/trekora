import { m as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { B as BLOGS, m as motion } from "./index-C6rgoof8.js";
import { w as ChevronRight, l as User, ab as Calendar, J as Clock, f as Twitter, e as Facebook, ac as Copy } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
function BlogDetailPage() {
  const { slug } = useParams({ from: "/layout/blog/$slug" });
  const blog = BLOGS.find((b) => b.slug === slug);
  const related = BLOGS.filter((b) => b.slug !== slug).map((b) => ({
    ...b,
    score: b.tags.filter((t) => blog == null ? void 0 : blog.tags.includes(t)).length
  })).sort((a, b) => b.score - a.score).slice(0, 3);
  const [copied, setCopied] = reactExports.useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  if (!blog) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pt-20 min-h-screen flex items-center justify-center",
        style: { background: "var(--ew-gray-lt)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-2xl font-bold mb-4",
              style: { color: "var(--ew-text)" },
              children: "Article not found"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "btn-primary", children: "Browse Blog" })
        ] })
      }
    );
  }
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${blog.title} — ${window.location.href}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-80 md:h-[420px] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: blog.heroImage,
              alt: blog.title,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-0 right-0 container mx-auto px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                style: { background: "var(--ew-red-lt)", color: "var(--ew-red)" },
                children: blog.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold text-white mt-3 max-w-3xl text-shadow", children: blog.title })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "nav",
            {
              className: "flex items-center gap-2 text-xs mb-6",
              style: { color: "var(--ew-gray-dark)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    className: "hover:text-[color:var(--ew-red)] transition-colors",
                    children: "Home"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/blog",
                    className: "hover:text-[color:var(--ew-red)] transition-colors",
                    children: "Blog"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", style: { color: "var(--ew-text)" }, children: blog.title })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-wrap items-center gap-4 text-sm mb-6",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }),
                        blog.author
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
                        blog.publishedAt
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
                        blog.readTime,
                        " min read"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-8 shadow-card", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-lg font-medium mb-6 pb-6",
                      style: {
                        color: "var(--ew-text-lt)",
                        borderBottom: "1px solid var(--ew-gray-mid)"
                      },
                      children: blog.excerpt
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "leading-relaxed whitespace-pre-line",
                      style: { color: "var(--ew-text-lt)" },
                      children: blog.content
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: blog.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-3 py-1 rounded-full font-medium",
                    style: {
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)"
                    },
                    children: tag
                  },
                  tag
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-sm font-semibold",
                      style: { color: "var(--ew-text)" },
                      children: "Share:"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: whatsappUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90",
                      style: { background: "#25D366" },
                      "data-ocid": "blog.share.whatsapp",
                      children: "💬 WhatsApp"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: twitterUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90",
                      style: { background: "#1D9BF0" },
                      "data-ocid": "blog.share.twitter",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { size: 14 }),
                        " Twitter"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: facebookUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-90",
                      style: { background: "#1877F2" },
                      "data-ocid": "blog.share.facebook",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { size: 14 }),
                        " Facebook"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: copyLink,
                      className: "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                      style: {
                        background: "var(--ew-gray-lt)",
                        color: "var(--ew-text-lt)"
                      },
                      "data-ocid": "blog.share.copy_link",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 }),
                        copied ? "Copied!" : "Copy Link"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mt-8 rounded-2xl p-6 flex items-start gap-4",
                    style: {
                      background: "var(--ew-white)",
                      border: "2px solid var(--ew-red)",
                      borderLeft: "5px solid var(--ew-red)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shrink-0",
                          style: { background: "var(--ew-red)" },
                          children: blog.author.charAt(0)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", style: { color: "var(--ew-text)" }, children: blog.author }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-semibold mb-1",
                            style: { color: "var(--ew-red)" },
                            children: "EternaWings Trek Expert"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: blog.authorBio })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", "data-ocid": "blog.related_reads", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "Related Reads" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-5", children: related.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog/$slug",
                params: { slug: b.slug },
                className: "group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all",
                "data-ocid": `blog.related.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-36 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: b.heroImage,
                        alt: b.title,
                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded",
                        style: {
                          background: "var(--ew-red-lt)",
                          color: "var(--ew-red)"
                        },
                        children: b.category
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-bold text-sm line-clamp-2 mb-1 transition-colors group-hover:text-[color:var(--ew-red)]",
                        style: { color: "var(--ew-text)" },
                        children: b.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs line-clamp-2",
                        style: { color: "var(--ew-text-lt)" },
                        children: [
                          b.excerpt.slice(0, 80),
                          "…"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "inline-block mt-2 text-xs font-semibold",
                        style: { color: "var(--ew-red)" },
                        children: "Read More →"
                      }
                    )
                  ] })
                ]
              },
              b.id
            )) })
          ] })
        ] })
      ]
    }
  );
}
export {
  BlogDetailPage as default
};
