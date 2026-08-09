import BlogHtmlEditor from "@/components/admin/BlogHtmlEditor";
import MediaUpload from "@/components/admin/MediaUpload";
import type { Blog, BlogCategory, BlogFaq, BlogStatus, BlogTag } from "@/data/blogs";
import {
  createBlogPost,
  fetchBlogCategories,
  fetchBlogTags,
  updateBlogPost,
} from "@/lib/blogs-api";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DEFAULT_AUTHOR = "Trekora Team";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function emptyForm(): Partial<Blog> {
  return {
    title: "",
    slug: "",
    author: DEFAULT_AUTHOR,
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
    isFeatured: false,
    isPublished: false,
    heroImage: "",
    heroImagePublicId: "",
    youtubeUrl: "",
    relatedProductSlugs: [],
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    faqs: [],
    publishedAt: new Date().toISOString().slice(0, 10),
    scheduledAt: "",
  };
}

type Props = {
  mode: "create" | "edit";
  initial?: Blog | null;
};

export default function AdminBlogEditor({ mode, initial }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Blog>>(
    () => (initial ? { ...emptyForm(), ...initial } : emptyForm()),
  );
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [allTags, setAllTags] = useState<BlogTag[]>([]);
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  const [relatedSlugsText, setRelatedSlugsText] = useState(() =>
    (initial?.relatedProductSlugs ?? []).join(", "),
  );

  useEffect(() => {
    if (initial) {
      setForm({ ...emptyForm(), ...initial });
      setSlugTouched(true);
      setRelatedSlugsText((initial.relatedProductSlugs ?? []).join(", "));
    }
  }, [initial]);

  useEffect(() => {
    void Promise.all([fetchBlogCategories(), fetchBlogTags()])
      .then(([cats, tags]) => {
        setCategories(cats);
        setAllTags(tags);
      })
      .catch(() => toast.error("Failed to load categories/tags"));
  }, []);

  const seoTitleLen = (form.seoTitle ?? "").length;
  const seoDescLen = (form.seoDescription ?? "").length;

  function setField<K extends keyof Blog>(key: K, value: Blog[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleTag(name: string) {
    const current = form.tags ?? [];
    setField(
      "tags",
      current.includes(name)
        ? current.filter((t) => t !== name)
        : [...current, name],
    );
  }

  function updateFaq(index: number, patch: Partial<BlogFaq>) {
    const faqs = [...(form.faqs ?? [])];
    faqs[index] = { ...faqs[index], ...patch };
    setField("faqs", faqs);
  }

  async function onSave(publishIntent?: BlogStatus) {
    const status = publishIntent ?? (form.status as BlogStatus) ?? "draft";
    const payload: Partial<Blog> = {
      ...form,
      status,
      isPublished: status === "published",
      slug: form.slug || slugify(form.title ?? ""),
      relatedProductSlugs: relatedSlugsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    if (!payload.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!payload.slug) {
      toast.error("Slug is required");
      return;
    }

    setSaving(true);
    try {
      if (mode === "edit" && initial?.slug) {
        const post = await updateBlogPost(initial.slug, payload);
        toast.success("Article saved");
        if (post.slug !== initial.slug) {
          void navigate({
            to: "/admin/blogs/$slug/edit",
            params: { slug: post.slug },
          });
        }
      } else {
        const post = await createBlogPost(payload);
        toast.success("Article created");
        void navigate({
          to: "/admin/blogs/$slug/edit",
          params: { slug: post.slug },
        });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6" data-ocid="admin.blogs.editor">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link
            to="/admin/blogs"
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--ew-orange)" }}
          >
            ← Back to list
          </Link>
          <h2
            className="mt-2 text-2xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            {mode === "create" ? "Create Article" : "Edit Article"}
          </h2>
          <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            Write content, insert images between paragraphs, and configure SEO
            before publishing.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={saving}
            onClick={() => void onSave("draft")}
            className="rounded-lg border px-4 py-2 text-sm font-semibold"
            style={{ borderColor: "var(--ew-gray-mid)", color: "var(--ew-text)" }}
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void onSave("scheduled")}
            className="rounded-lg border px-4 py-2 text-sm font-semibold"
            style={{ borderColor: "var(--ew-orange)", color: "var(--ew-orange)" }}
          >
            Schedule
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void onSave("published")}
            className="btn-primary"
          >
            Publish Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-card space-y-4">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              Article Details
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ew-text-lt)]">
                Title
              </span>
              <input
                value={form.title ?? ""}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    title,
                    slug: slugTouched ? prev.slug : slugify(title),
                  }));
                }}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ew-text-lt)]">
                Slug
              </span>
              <input
                value={form.slug ?? ""}
                onChange={(e) => {
                  setSlugTouched(true);
                  setField("slug", slugify(e.target.value));
                }}
                className="w-full rounded-lg border px-3 py-2.5 text-sm font-mono"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ew-text-lt)]">
                Author
              </span>
              <input
                value={form.author ?? DEFAULT_AUTHOR}
                onChange={(e) => setField("author", e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--ew-text-lt)]">
                Excerpt
              </span>
              <textarea
                value={form.excerpt ?? ""}
                onChange={(e) => setField("excerpt", e.target.value)}
                rows={3}
                placeholder="Short summary shown on blog cards and search results"
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
                Article Body
              </h3>
              <div className="flex rounded-lg border overflow-hidden text-xs font-semibold"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              >
                {(["write", "preview"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setEditorMode(m)}
                    className="px-3 py-1.5 capitalize"
                    style={{
                      background:
                        editorMode === m ? "var(--ew-red)" : "transparent",
                      color: editorMode === m ? "#fff" : "var(--ew-text)",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <BlogHtmlEditor
              value={form.content ?? ""}
              onChange={(html) => setField("content", html)}
              mode={editorMode}
            />
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
                FAQ Blocks
              </h3>
              <button
                type="button"
                className="text-sm font-semibold"
                style={{ color: "var(--ew-orange)" }}
                onClick={() =>
                  setField("faqs", [
                    ...(form.faqs ?? []),
                    { question: "", answer: "" },
                  ])
                }
              >
                + Add FAQ
              </button>
            </div>
            {(form.faqs ?? []).length === 0 ? (
              <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                Optional FAQs shown at the end of the article.
              </p>
            ) : (
              <div className="space-y-3">
                {(form.faqs ?? []).map((faq, i) => (
                  <div
                    key={`faq-${i}`}
                    className="rounded-xl border p-3 space-y-2"
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                  >
                    <input
                      value={faq.question}
                      onChange={(e) =>
                        updateFaq(i, { question: e.target.value })
                      }
                      placeholder="Question"
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    />
                    <textarea
                      value={faq.answer}
                      onChange={(e) => updateFaq(i, { answer: e.target.value })}
                      placeholder="Answer"
                      rows={2}
                      className="w-full rounded-lg border px-3 py-2 text-sm"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    />
                    <button
                      type="button"
                      className="text-xs font-semibold"
                      style={{ color: "var(--ew-red)" }}
                      onClick={() =>
                        setField(
                          "faqs",
                          (form.faqs ?? []).filter((_, idx) => idx !== i),
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              Publishing
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Status
              </span>
              <select
                value={form.status ?? "draft"}
                onChange={(e) =>
                  setField("status", e.target.value as BlogStatus)
                }
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </label>
            {form.status === "scheduled" ? (
              <label className="block space-y-1">
                <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                  Schedule date
                </span>
                <input
                  type="datetime-local"
                  value={(form.scheduledAt ?? "").slice(0, 16)}
                  onChange={(e) => setField("scheduledAt", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2.5 text-sm"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                />
              </label>
            ) : null}
            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--ew-text)" }}>
              <input
                type="checkbox"
                checked={Boolean(form.isFeatured)}
                onChange={(e) => setField("isFeatured", e.target.checked)}
              />
              Featured article
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Publish date
              </span>
              <input
                type="date"
                value={(form.publishedAt ?? "").slice(0, 10)}
                onChange={(e) => setField("publishedAt", e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              Category &amp; Tags
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Category
              </span>
              <select
                value={form.category ?? ""}
                onChange={(e) => setField("category", e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              >
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--ew-text-lt)] mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                {allTags.map((tag) => {
                  const active = (form.tags ?? []).includes(tag.name);
                  return (
                    <button
                      key={tag.slug}
                      type="button"
                      onClick={() => toggleTag(tag.name)}
                      className="rounded-full px-2.5 py-1 text-xs font-medium border"
                      style={{
                        borderColor: active
                          ? "var(--ew-orange)"
                          : "var(--ew-gray-mid)",
                        background: active
                          ? "var(--ew-orange-lt)"
                          : "transparent",
                        color: active ? "var(--ew-orange)" : "var(--ew-text-lt)",
                      }}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              Featured Image
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Cloudinary ID or URL
              </span>
              <input
                value={form.heroImagePublicId || form.heroImage || ""}
                onChange={(e) => {
                  const v = e.target.value.trim();
                  if (/^https?:\/\//i.test(v)) {
                    setField("heroImage", v);
                  } else {
                    setField("heroImagePublicId", v);
                    if (v && !form.heroImage) {
                      setField(
                        "heroImage",
                        `https://res.cloudinary.com/ddbcauxef/image/upload/${v}`,
                      );
                    }
                  }
                }}
                placeholder="trekora/blogs/my-post"
                className="w-full rounded-lg border px-3 py-2.5 text-sm font-mono"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <MediaUpload
              label="Upload featured image"
              folder="blogs"
              acceptVideo={false}
              onUploaded={(urls) => {
                if (urls[0]) setField("heroImage", urls[0]);
              }}
            />
            {form.heroImage ? (
              <img
                src={form.heroImage}
                alt=""
                className="mt-2 h-28 w-full rounded-lg object-cover"
              />
            ) : null}
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              Links &amp; Media
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                YouTube URL
              </span>
              <input
                value={form.youtubeUrl ?? ""}
                onChange={(e) => setField("youtubeUrl", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Related product slugs
              </span>
              <input
                value={relatedSlugsText}
                onChange={(e) => setRelatedSlugsText(e.target.value)}
                placeholder="roopkund-trek, kedarkantha-trek"
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-card space-y-3">
            <h3 className="font-bold" style={{ color: "var(--ew-text)" }}>
              SEO
            </h3>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                SEO Title · {seoTitleLen}/60
              </span>
              <input
                value={form.seoTitle ?? ""}
                maxLength={60}
                onChange={(e) => setField("seoTitle", e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                SEO Description · {seoDescLen}/160
              </span>
              <textarea
                value={form.seoDescription ?? ""}
                maxLength={160}
                rows={3}
                onChange={(e) => setField("seoDescription", e.target.value)}
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase text-[var(--ew-text-lt)]">
                Canonical URL
              </span>
              <input
                value={form.canonicalUrl ?? ""}
                onChange={(e) => setField("canonicalUrl", e.target.value)}
                placeholder="https://trekora.com/blog/..."
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--ew-gray-mid)" }}
              />
            </label>
          </section>
        </aside>
      </div>
    </div>
  );
}
