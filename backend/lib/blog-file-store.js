/**
 * File-based blog content store.
 * Posts live at src/frontend/src/content/blogs/posts/{slug}.json
 */
import { mkdir, readdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  normalizeSlug,
  sanitizeText,
} from "./http-security.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const BLOGS_ROOT = join(
  REPO_ROOT,
  "src/frontend/src/content/blogs",
);
const POSTS_DIR = join(BLOGS_ROOT, "posts");
const CATEGORIES_FILE = join(BLOGS_ROOT, "categories.json");
const TAGS_FILE = join(BLOGS_ROOT, "tags.json");

const STATUSES = new Set(["draft", "published", "scheduled"]);

function slugifyLabel(name) {
  return String(name ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function ensureDirs() {
  await mkdir(POSTS_DIR, { recursive: true });
}

async function readJson(path, fallback) {
  try {
    const raw = await readFile(path, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err && err.code === "ENOENT") return fallback;
    throw err;
  }
}

async function writeJsonAtomic(path, data) {
  await ensureDirs();
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rename(tmp, path);
}

function estimateReadTime(htmlOrMd) {
  const text = String(htmlOrMd ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function normalizeFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .slice(0, 20)
    .map((f) => ({
      question: sanitizeText(f?.question, 300),
      answer: sanitizeText(f?.answer, 4000),
    }))
    .filter((f) => f.question && f.answer);
}

function normalizeToc(toc) {
  if (!Array.isArray(toc)) return [];
  return toc
    .slice(0, 40)
    .map((item) => ({
      id: sanitizeText(item?.id, 80),
      heading: sanitizeText(item?.heading, 200),
      level: Number(item?.level) === 3 ? 3 : 2,
    }))
    .filter((item) => item.id && item.heading);
}

function normalizeStringList(list, max = 24, maxLen = 80) {
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const raw of list) {
    const t = sanitizeText(raw, maxLen);
    if (!t || out.includes(t)) continue;
    out.push(t);
    if (out.length >= max) break;
  }
  return out;
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(String(value ?? "").trim());
}

/**
 * @param {Record<string, unknown>} input
 * @param {{ existing?: Record<string, unknown>, nextId?: number }} opts
 */
export function normalizeBlogPost(input, opts = {}) {
  const existing = opts.existing ?? {};
  const title = sanitizeText(input.title ?? existing.title, 200);
  let slug = normalizeSlug(input.slug ?? existing.slug);
  if (!slug && title) slug = normalizeSlug(slugifyLabel(title));

  const statusRaw = String(input.status ?? existing.status ?? "draft")
    .trim()
    .toLowerCase();
  let status = STATUSES.has(statusRaw) ? statusRaw : "draft";
  // Legacy clients may send isPublished without status.
  if (
    input.status == null &&
    input.isPublished === true &&
    status === "draft"
  ) {
    status = "published";
  }

  const content = String(input.content ?? existing.content ?? "").slice(
    0,
    200_000,
  );
  const readTime =
    Number(input.readTime) > 0
      ? Math.min(Math.floor(Number(input.readTime)), 120)
      : estimateReadTime(content);

  const publishedAt = sanitizeText(
    input.publishedAt ?? existing.publishedAt ?? new Date().toISOString().slice(0, 10),
    40,
  );
  const scheduledAt =
    status === "scheduled"
      ? sanitizeText(input.scheduledAt ?? existing.scheduledAt, 40)
      : null;

  const heroImage = sanitizeText(
    input.heroImage ?? existing.heroImage ?? "",
    500,
  );
  const heroImagePublicId = sanitizeText(
    input.heroImagePublicId ?? existing.heroImagePublicId ?? "",
    300,
  );

  const id =
    Number(input.id) > 0
      ? Math.floor(Number(input.id))
      : Number(existing.id) > 0
        ? Math.floor(Number(existing.id))
        : opts.nextId ?? Date.now();

  return {
    id,
    title,
    slug,
    excerpt: sanitizeText(input.excerpt ?? existing.excerpt ?? "", 500),
    content,
    author: sanitizeText(
      input.author ?? existing.author ?? "Trekora Team",
      120,
    ),
    authorBio: sanitizeText(
      input.authorBio ?? existing.authorBio ?? "",
      800,
    ),
    authorImage: sanitizeText(
      input.authorImage ?? existing.authorImage ?? "",
      500,
    ),
    publishedAt,
    scheduledAt,
    readTime,
    category: sanitizeText(input.category ?? existing.category ?? "", 80),
    tags: normalizeStringList(input.tags ?? existing.tags, 24, 60),
    heroImage,
    heroImagePublicId,
    images: normalizeStringList(input.images ?? existing.images, 30, 500).filter(
      (u) => isHttpUrl(u) || u.includes("cloudinary"),
    ),
    status,
    isPublished: status === "published",
    isFeatured: Boolean(input.isFeatured ?? existing.isFeatured),
    youtubeUrl: sanitizeText(
      input.youtubeUrl ?? existing.youtubeUrl ?? "",
      300,
    ),
    relatedProductSlugs: normalizeStringList(
      input.relatedProductSlugs ?? existing.relatedProductSlugs,
      12,
      80,
    )
      .map((s) => normalizeSlug(s) || slugifyLabel(s))
      .filter(Boolean),
    seoTitle: sanitizeText(input.seoTitle ?? existing.seoTitle ?? "", 70),
    seoDescription: sanitizeText(
      input.seoDescription ?? existing.seoDescription ?? "",
      180,
    ),
    canonicalUrl: sanitizeText(
      input.canonicalUrl ?? existing.canonicalUrl ?? "",
      300,
    ),
    faqs: normalizeFaqs(input.faqs ?? existing.faqs),
    tableOfContents: normalizeToc(
      input.tableOfContents ?? existing.tableOfContents,
    ),
    updatedAt: new Date().toISOString(),
  };
}

function postPath(slug) {
  return join(POSTS_DIR, `${slug}.json`);
}

export async function listBlogPosts({ includeDrafts = false } = {}) {
  await ensureDirs();
  let files = [];
  try {
    files = await readdir(POSTS_DIR);
  } catch {
    return [];
  }

  const posts = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    try {
      const post = JSON.parse(await readFile(join(POSTS_DIR, file), "utf8"));
      if (!includeDrafts) {
        const published =
          post.isPublished === true || post.status === "published";
        if (!published) continue;
        if (post.status === "scheduled" && post.scheduledAt) {
          const when = Date.parse(post.scheduledAt);
          if (Number.isFinite(when) && when > Date.now()) continue;
        }
      }
      posts.push(post);
    } catch {
      /* skip corrupt */
    }
  }

  return posts.sort((a, b) =>
    String(b.publishedAt).localeCompare(String(a.publishedAt)),
  );
}

export async function getBlogPostBySlug(slug, { includeDrafts = false } = {}) {
  const s = normalizeSlug(slug);
  if (!s) return null;
  try {
    const post = JSON.parse(await readFile(postPath(s), "utf8"));
    if (!includeDrafts) {
      const published =
        post.isPublished === true || post.status === "published";
      if (!published) return null;
    }
    return post;
  } catch (err) {
    if (err && err.code === "ENOENT") return null;
    throw err;
  }
}

export async function nextBlogId() {
  const posts = await listBlogPosts({ includeDrafts: true });
  const max = posts.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  return max + 1;
}

export async function saveBlogPost(input, { existingSlug } = {}) {
  const existing = existingSlug
    ? await getBlogPostBySlug(existingSlug, { includeDrafts: true })
    : null;

  const post = normalizeBlogPost(input, {
    existing: existing ?? undefined,
    nextId: existing ? undefined : await nextBlogId(),
  });

  if (!post.title || !post.slug) {
    return { ok: false, message: "Title and slug are required" };
  }

  if (!existing || existing.slug !== post.slug) {
    const collision = await getBlogPostBySlug(post.slug, {
      includeDrafts: true,
    });
    if (collision && (!existing || collision.slug !== existing.slug)) {
      return { ok: false, message: "A post with this slug already exists" };
    }
  }

  await writeJsonAtomic(postPath(post.slug), post);

  if (existing && existing.slug !== post.slug) {
    try {
      await unlink(postPath(existing.slug));
    } catch {
      /* ignore */
    }
  }

  return { ok: true, post };
}

export async function deleteBlogPost(slug) {
  const s = normalizeSlug(slug);
  if (!s) return { ok: false, message: "Invalid slug" };
  const existing = await getBlogPostBySlug(s, { includeDrafts: true });
  if (!existing) return { ok: false, message: "Post not found" };
  await unlink(postPath(s));
  return { ok: true, post: existing };
}

export async function listCategories() {
  const data = await readJson(CATEGORIES_FILE, { categories: [] });
  return Array.isArray(data.categories) ? data.categories : [];
}

export async function saveCategories(categories) {
  const list = (Array.isArray(categories) ? categories : [])
    .map((c, i) => {
      const name = sanitizeText(c?.name, 80);
      if (!name) return null;
      const slug = normalizeSlug(c?.slug) || slugifyLabel(name);
      return {
        id: Number(c?.id) > 0 ? Math.floor(Number(c.id)) : i + 1,
        name,
        slug,
      };
    })
    .filter(Boolean);
  await writeJsonAtomic(CATEGORIES_FILE, { categories: list });
  return list;
}

export async function addCategory(name) {
  const categories = await listCategories();
  const cleaned = sanitizeText(name, 80);
  if (!cleaned) return { ok: false, message: "Name is required" };
  const slug = slugifyLabel(cleaned);
  if (categories.some((c) => c.slug === slug || c.name === cleaned)) {
    return { ok: false, message: "Category already exists" };
  }
  const maxId = categories.reduce((m, c) => Math.max(m, Number(c.id) || 0), 0);
  categories.push({ id: maxId + 1, name: cleaned, slug });
  await saveCategories(categories);
  return { ok: true, categories };
}

export async function deleteCategory(slugOrId) {
  const categories = await listCategories();
  const key = String(slugOrId ?? "").trim();
  const next = categories.filter(
    (c) => String(c.id) !== key && c.slug !== key && c.name !== key,
  );
  if (next.length === categories.length) {
    return { ok: false, message: "Category not found" };
  }
  await saveCategories(next);
  return { ok: true, categories: next };
}

export async function listTags() {
  const data = await readJson(TAGS_FILE, { tags: [] });
  return Array.isArray(data.tags) ? data.tags : [];
}

export async function saveTags(tags) {
  const list = (Array.isArray(tags) ? tags : [])
    .map((t, i) => {
      const name = sanitizeText(t?.name, 60);
      if (!name) return null;
      const slug = normalizeSlug(t?.slug) || slugifyLabel(name);
      return {
        id: Number(t?.id) > 0 ? Math.floor(Number(t.id)) : i + 1,
        name,
        slug,
      };
    })
    .filter(Boolean);
  await writeJsonAtomic(TAGS_FILE, { tags: list });
  return list;
}

export async function addTag(name) {
  const tags = await listTags();
  const cleaned = sanitizeText(name, 60);
  if (!cleaned) return { ok: false, message: "Name is required" };
  const slug = slugifyLabel(cleaned);
  if (tags.some((t) => t.slug === slug || t.name === cleaned)) {
    return { ok: false, message: "Tag already exists" };
  }
  const maxId = tags.reduce((m, t) => Math.max(m, Number(t.id) || 0), 0);
  tags.push({ id: maxId + 1, name: cleaned, slug });
  await saveTags(tags);
  return { ok: true, tags };
}

export async function deleteTag(slugOrId) {
  const tags = await listTags();
  const key = String(slugOrId ?? "").trim();
  const next = tags.filter(
    (t) => String(t.id) !== key && t.slug !== key && t.name !== key,
  );
  if (next.length === tags.length) {
    return { ok: false, message: "Tag not found" };
  }
  await saveTags(next);
  return { ok: true, tags: next };
}

/** Featured images / Cloudinary IDs collected from posts. */
export async function listMediaLibrary() {
  const posts = await listBlogPosts({ includeDrafts: true });
  const seen = new Set();
  const media = [];
  for (const post of posts) {
    const candidates = [
      {
        url: post.heroImage,
        publicId: post.heroImagePublicId,
        kind: "featured",
      },
      ...(post.images ?? []).map((url) => ({
        url,
        publicId: "",
        kind: "inline",
      })),
    ];
    for (const item of candidates) {
      const url = String(item.url ?? "").trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      media.push({
        url,
        publicId: String(item.publicId ?? "").trim(),
        kind: item.kind,
        postSlug: post.slug,
        postTitle: post.title,
      });
    }
  }
  return media;
}

export function getBlogsContentRoot() {
  return BLOGS_ROOT;
}
