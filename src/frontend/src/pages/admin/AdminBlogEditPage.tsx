import AdminBlogEditor from "@/components/admin/AdminBlogEditor";
import type { Blog } from "@/data/blogs";
import { hasAdminSession } from "@/lib/admin-access";
import { fetchBlogBySlugAdmin } from "@/lib/blogs-api";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminBlogEditPage() {
  const { slug } = useParams({ from: "/admin/blogs/$slug/edit" });
  const [post, setPost] = useState<Blog | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasAdminSession()) {
      setError("Admin session required");
      return;
    }
    void fetchBlogBySlugAdmin(slug)
      .then(setPost)
      .catch((err) => {
        const msg = err instanceof Error ? err.message : "Failed to load";
        setError(msg);
        toast.error(msg);
      });
  }, [slug]);

  if (error) {
    return (
      <div className="space-y-3">
        <p style={{ color: "var(--ew-red)" }}>{error}</p>
        <Link to="/admin/blogs" className="text-sm font-semibold underline">
          Back to list
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
        Loading article…
      </p>
    );
  }

  return <AdminBlogEditor mode="edit" initial={post} />;
}
