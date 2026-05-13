import { useState } from "react";
import { BLOGS } from "../../data/blogs";

type BlogStatus = "Published" | "Draft";
type BlogWithStatus = (typeof BLOGS)[number] & { status: BlogStatus };

const blogsWithStatus: BlogWithStatus[] = BLOGS.map((b, i) => ({
  ...b,
  status: i % 4 === 0 ? "Draft" : "Published",
}));

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(blogsWithStatus);

  function toggleStatus(id: number) {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Published" ? "Draft" : "Published" }
          : b,
      ),
    );
  }

  return (
    <div className="space-y-6" data-ocid="admin.blogs.page">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Blog Manager
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {blogs.filter((b) => b.status === "Published").length} published ·{" "}
            {blogs.filter((b) => b.status === "Draft").length} drafts
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          data-ocid="admin.blogs.add_button"
        >
          + New Blog Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead style={{ background: "var(--ew-gray-lt)" }}>
            <tr>
              {[
                "Title",
                "Category",
                "Author",
                "Read Time",
                "Published",
                "Status",
                "Actions",
              ].map((h, ci) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-left font-medium ${ci === 3 || ci === 5 ? "text-center" : ""}`}
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ borderColor: "var(--ew-gray-lt)" }}
          >
            {blogs.map((blog, i) => (
              <tr
                key={blog.id}
                className="transition-colors"
                style={{ background: "transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--ew-gray-lt)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "transparent";
                }}
                data-ocid={`admin.blog.row.${i + 1}`}
              >
                <td
                  className="px-4 py-3 font-medium max-w-xs truncate"
                  style={{ color: "var(--ew-text)" }}
                >
                  {blog.title}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {blog.category}
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {blog.author}
                </td>
                <td
                  className="px-4 py-3 text-center"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {blog.readTime} min
                </td>
                <td
                  className="px-4 py-3"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {blog.publishedAt}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    className="text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer"
                    style={{
                      background:
                        blog.status === "Published"
                          ? "#e8f5e9"
                          : "var(--ew-orange-lt)",
                      color:
                        blog.status === "Published"
                          ? "var(--ew-green)"
                          : "var(--ew-orange)",
                      border: "none",
                    }}
                    onClick={() => toggleStatus(blog.id)}
                    data-ocid={`admin.blog.status.${i + 1}.toggle`}
                  >
                    {blog.status}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: "var(--ew-orange)" }}
                      data-ocid={`admin.blog.edit_button.${i + 1}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: "var(--ew-red)" }}
                      data-ocid={`admin.blog.delete_button.${i + 1}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
