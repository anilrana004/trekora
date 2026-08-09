import { addBlogTag, deleteBlogTag, fetchBlogTags } from "@/lib/blogs-api";
import type { BlogTag } from "@/data/blogs";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminBlogTagsPage() {
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setTags(await fetchBlogTags());
    } catch {
      toast.error("Failed to load tags");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setTags(await addBlogTag(name.trim()));
      setName("");
      toast.success("Tag added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add");
    }
  }

  async function onDelete(tag: BlogTag) {
    if (!window.confirm(`Delete tag “${tag.name}”?`)) return;
    try {
      setTags(await deleteBlogTag(tag.id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.blogs.tags">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
          Tags
        </h2>
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          Himalayan destinations, trek styles, seasons, and gear topics used
          across Trekora articles.
        </p>
      </div>

      <form
        onSubmit={(e) => void onAdd(e)}
        className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-card"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New tag (e.g. Winter Trek)"
          className="flex-1 min-w-[200px] rounded-lg border px-3 py-2.5 text-sm"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        />
        <button type="submit" className="btn-primary">
          + Add Tag
        </button>
      </form>

      <div className="rounded-2xl bg-white p-5 shadow-card">
        {loading ? (
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Loading…
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.slug}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  color: "var(--ew-text)",
                }}
              >
                {tag.name}
                <button
                  type="button"
                  className="text-xs font-bold"
                  style={{ color: "var(--ew-red)" }}
                  onClick={() => void onDelete(tag)}
                  aria-label={`Delete ${tag.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
