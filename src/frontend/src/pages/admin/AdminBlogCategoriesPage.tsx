import {
  addBlogCategory,
  deleteBlogCategory,
  fetchBlogCategories,
} from "@/lib/blogs-api";
import type { BlogCategory } from "@/data/blogs";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminBlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setCategories(await fetchBlogCategories());
    } catch {
      toast.error("Failed to load categories");
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
      setCategories(await addBlogCategory(name.trim()));
      setName("");
      toast.success("Category added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add");
    }
  }

  async function onDelete(cat: BlogCategory) {
    if (!window.confirm(`Delete category “${cat.name}”?`)) return;
    try {
      setCategories(await deleteBlogCategory(cat.id));
      toast.success("Deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.blogs.categories">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
          Categories
        </h2>
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          Trekora article types — Trek Guide, Yatra, Safety, and more. Add new
          categories for the editor.
        </p>
      </div>

      <form
        onSubmit={(e) => void onAdd(e)}
        className="flex flex-wrap gap-2 rounded-2xl bg-white p-4 shadow-card"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 min-w-[200px] rounded-lg border px-3 py-2.5 text-sm"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        />
        <button type="submit" className="btn-primary">
          + Add Category
        </button>
      </form>

      <div className="rounded-2xl bg-white shadow-card overflow-hidden">
        {loading ? (
          <p className="p-5 text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Loading…
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--ew-gray-lt)" }}>
            {categories.map((cat) => (
              <li
                key={cat.slug}
                className="flex items-center justify-between px-5 py-3"
              >
                <div>
                  <p className="font-medium" style={{ color: "var(--ew-text)" }}>
                    {cat.name}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "var(--ew-gray-dark)" }}>
                    {cat.slug}
                  </p>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold"
                  style={{ color: "var(--ew-red)" }}
                  onClick={() => void onDelete(cat)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
