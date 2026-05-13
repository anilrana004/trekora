import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { B as BLOGS, m as motion } from "./index-C6rgoof8.js";
import { m as Search } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const CATEGORIES = [
  "All",
  "Trek Guide",
  "Yatra",
  "Destination",
  "Safety",
  "Gear"
];
function BlogPage() {
  const [category, setCategory] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const filtered = BLOGS.filter((b) => {
    const matchCat = category === "All" || b.category === category;
    const matchSearch = search === "" || b.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "py-16 text-center border-b",
            style: {
              background: "var(--ew-gray-lt)",
              borderColor: "var(--ew-gray-mid)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-bold uppercase tracking-widest",
                        style: { color: "var(--ew-red)" },
                        children: "Trek Knowledge"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mt-2 mb-3 section-title mx-auto", children: "Travel Stories & Tips" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm", style: { color: "var(--ew-text-lt)" }, children: "Expert guides, tips and stories from the Himalayas" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Search,
                  {
                    size: 16,
                    className: "absolute left-3 top-1/2 -translate-y-1/2",
                    style: { color: "var(--ew-gray-dark)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search articles...",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    className: "w-full pl-9 pr-4 py-2.5 rounded-full text-sm bg-white shadow-sm focus:outline-none",
                    style: { border: "2px solid var(--ew-red)" },
                    "data-ocid": "blog.search_input"
                  }
                )
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white py-4 shadow-sm sticky top-16 z-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 flex flex-wrap gap-2 justify-center", children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setCategory(c),
            className: "px-4 py-1.5 rounded-full text-sm font-semibold transition-all",
            style: category === c ? { background: "var(--ew-red)", color: "#fff" } : {
              background: "var(--ew-gray-lt)",
              color: "var(--ew-text-lt)"
            },
            "data-ocid": `blog.filter.${c.toLowerCase().replace(/\s+/g, "_")}`,
            children: c
          },
          c
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-12", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", "data-ocid": "blog.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "📭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", style: { color: "var(--ew-text)" }, children: "No articles found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Try a different category or search term" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8", children: filtered.map((blog, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.07 },
            style: {
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderLeft: "3px solid transparent",
              borderRadius: "0.75rem",
              willChange: "transform",
              overflow: "hidden"
            },
            whileHover: {
              scale: 1.035,
              y: -6,
              boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
              borderLeftColor: "var(--ew-red)"
            },
            whileTap: { scale: 0.97 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/blog/$slug",
                params: { slug: blog.slug },
                className: "group block bg-white rounded-xl overflow-hidden",
                "data-ocid": `blog.card.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.img,
                    {
                      src: blog.heroImage,
                      alt: blog.title,
                      loading: "lazy",
                      className: "w-full h-full object-cover",
                      whileHover: { scale: 1.08 },
                      transition: { duration: 0.4, ease: "easeOut" }
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full",
                          style: {
                            background: "var(--ew-red-lt)",
                            color: "var(--ew-red)"
                          },
                          children: blog.category
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "text-xs",
                          style: { color: "var(--ew-gray-dark)" },
                          children: [
                            blog.readTime,
                            " min read"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "font-bold text-lg mb-2 line-clamp-2 transition-colors group-hover:text-[color:var(--ew-red)]",
                        style: { color: "var(--ew-text)" },
                        children: blog.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm line-clamp-3 mb-3",
                        style: { color: "var(--ew-text-lt)" },
                        children: blog.excerpt
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center justify-between text-xs",
                        style: { color: "var(--ew-gray-dark)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.author }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "font-semibold",
                              style: { color: "var(--ew-red)" },
                              children: "Read More →"
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ]
              }
            )
          },
          blog.id
        )) }) })
      ]
    }
  );
}
export {
  BlogPage as default
};
