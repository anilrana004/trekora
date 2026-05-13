import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { B as BLOGS } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const blogsWithStatus = BLOGS.map((b, i) => ({
  ...b,
  status: i % 4 === 0 ? "Draft" : "Published"
}));
function AdminBlogsPage() {
  const [blogs, setBlogs] = reactExports.useState(blogsWithStatus);
  function toggleStatus(id) {
    setBlogs(
      (prev) => prev.map(
        (b) => b.id === id ? { ...b, status: b.status === "Published" ? "Draft" : "Published" } : b
      )
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "admin.blogs.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold",
            style: { color: "var(--ew-text)" },
            children: "Blog Manager"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
          blogs.filter((b) => b.status === "Published").length,
          " published ·",
          " ",
          blogs.filter((b) => b.status === "Draft").length,
          " drafts"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "btn-primary",
          "data-ocid": "admin.blogs.add_button",
          children: "+ New Blog Post"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: [
        "Title",
        "Category",
        "Author",
        "Read Time",
        "Published",
        "Status",
        "Actions"
      ].map((h, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: `px-4 py-3 text-left font-medium ${ci === 3 || ci === 5 ? "text-center" : ""}`,
          style: { color: "var(--ew-text-lt)" },
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "tbody",
        {
          className: "divide-y",
          style: { borderColor: "var(--ew-gray-lt)" },
          children: blogs.map((blog, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "transition-colors",
              style: { background: "transparent" },
              onMouseEnter: (e) => {
                e.currentTarget.style.background = "var(--ew-gray-lt)";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.background = "transparent";
              },
              "data-ocid": `admin.blog.row.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3 font-medium max-w-xs truncate",
                    style: { color: "var(--ew-text)" },
                    children: blog.title
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-text-lt)" },
                    children: blog.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-text-lt)" },
                    children: blog.author
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: "px-4 py-3 text-center",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      blog.readTime,
                      " min"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3",
                    style: { color: "var(--ew-gray-dark)" },
                    children: blog.publishedAt
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer",
                    style: {
                      background: blog.status === "Published" ? "#e8f5e9" : "var(--ew-orange-lt)",
                      color: blog.status === "Published" ? "var(--ew-green)" : "var(--ew-orange)",
                      border: "none"
                    },
                    onClick: () => toggleStatus(blog.id),
                    "data-ocid": `admin.blog.status.${i + 1}.toggle`,
                    children: blog.status
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs font-semibold hover:underline",
                      style: { color: "var(--ew-orange)" },
                      "data-ocid": `admin.blog.edit_button.${i + 1}`,
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-xs font-semibold hover:underline",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": `admin.blog.delete_button.${i + 1}`,
                      children: "Delete"
                    }
                  )
                ] }) })
              ]
            },
            blog.id
          ))
        }
      )
    ] }) })
  ] });
}
export {
  AdminBlogsPage as default
};
