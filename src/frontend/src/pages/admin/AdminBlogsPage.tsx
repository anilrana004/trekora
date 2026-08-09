import { hasAdminSession } from "@/lib/admin-access";
import { deleteBlogPost, fetchAdminBlogs } from "@/lib/blogs-api";
import type { Blog } from "@/data/blogs";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

function statusLabel(blog: Blog): string {
  if (blog.status === "scheduled") return "Scheduled";
  if (blog.status === "draft" || !blog.isPublished) return "Draft";
  return "Published";
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!hasAdminSession()) {
      setLoading(false);
      toast.error("Admin session required");
      return;
    }
    setLoading(true);
    try {
      setBlogs(await fetchAdminBlogs());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function onDelete(slug: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This removes the content file.`)) {
      return;
    }
    try {
      await deleteBlogPost(slug);
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const published = blogs.filter(
    (b) => b.status === "published" || b.isPublished,
  ).length;
  const drafts = blogs.filter(
    (b) => b.status === "draft" || (!b.isPublished && b.status !== "scheduled"),
  ).length;

  return (
    <div className="space-y-6" data-ocid="admin.blogs.page">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            All Articles
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            {published} published · {drafts} drafts · {blogs.length} total
          </p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary" data-ocid="admin.blogs.add_button">
          + New Article
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Loading articles…
          </p>
        ) : blogs.length === 0 ? (
          <p className="p-6 text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            No articles yet. Create your first Himalayan trek story.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: "var(--ew-gray-lt)" }}>
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Author",
                    "Read",
                    "Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-medium"
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
                {blogs.map((blog, i) => {
                  const status = statusLabel(blog);
                  return (
                    <tr key={blog.slug} data-ocid={`admin.blog.row.${i + 1}`}>
                      <td
                        className="px-4 py-3 font-medium max-w-xs truncate"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {blog.title}
                        {blog.isFeatured ? (
                          <span
                            className="ml-2 text-[10px] uppercase font-bold"
                            style={{ color: "var(--ew-orange)" }}
                          >
                            Featured
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--ew-text-lt)" }}>
                        {blog.category || "—"}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--ew-text-lt)" }}>
                        {blog.author}
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--ew-gray-dark)" }}>
                        {blog.readTime} min
                      </td>
                      <td className="px-4 py-3" style={{ color: "var(--ew-gray-dark)" }}>
                        {blog.publishedAt}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background:
                              status === "Published"
                                ? "#e8f5e9"
                                : status === "Scheduled"
                                  ? "var(--ew-orange-lt)"
                                  : "var(--ew-gray-lt)",
                            color:
                              status === "Published"
                                ? "var(--ew-green)"
                                : status === "Scheduled"
                                  ? "var(--ew-orange)"
                                  : "var(--ew-text-lt)",
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            to="/admin/blogs/$slug/edit"
                            params={{ slug: blog.slug }}
                            className="text-xs font-semibold hover:underline"
                            style={{ color: "var(--ew-orange)" }}
                          >
                            Edit
                          </Link>
                          <a
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-semibold hover:underline"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            View
                          </a>
                          <button
                            type="button"
                            className="text-xs font-semibold hover:underline"
                            style={{ color: "var(--ew-red)" }}
                            onClick={() => void onDelete(blog.slug, blog.title)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
