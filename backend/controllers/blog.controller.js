import { isAdminRequest } from "../lib/admin-auth.js";
import {
  addCategory,
  addTag,
  deleteBlogPost,
  deleteCategory,
  deleteTag,
  getBlogPostBySlug,
  listBlogPosts,
  listCategories,
  listMediaLibrary,
  listTags,
  saveBlogPost,
} from "../lib/blog-file-store.js";
import { parseJsonBody } from "../lib/parse-body.js";

function adminUnauthorized(res) {
  res.status(401).json({ success: false, message: "Unauthorized" });
}

/**
 * Unified handler for Express + Vite/Vercel API adapters.
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function blogApiHandler(req, res) {
  try {
    const method = String(req.method ?? "GET").toUpperCase();
    const url = new URL(req.url ?? "/", "http://localhost");
    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    // Express mounts at /api/blogs — strip that; Vite may pass full path.
    const path = pathname
      .replace(/^\/api\/v1\/blogs/, "")
      .replace(/^\/api\/blogs/, "")
      .replace(/^\//, "");

    const segments = path ? path.split("/").filter(Boolean) : [];
    const admin = isAdminRequest(req);

    // GET /api/blogs — public published list; admin can request ?all=1
    if (method === "GET" && segments.length === 0) {
      const includeDrafts = admin && url.searchParams.get("all") === "1";
      const posts = await listBlogPosts({ includeDrafts });
      return res.status(200).json({ success: true, posts });
    }

    // GET /api/blogs/meta/categories
    if (method === "GET" && segments[0] === "meta" && segments[1] === "categories") {
      const categories = await listCategories();
      return res.status(200).json({ success: true, categories });
    }

    // GET /api/blogs/meta/tags
    if (method === "GET" && segments[0] === "meta" && segments[1] === "tags") {
      const tags = await listTags();
      return res.status(200).json({ success: true, tags });
    }

    // GET /api/blogs/meta/media
    if (method === "GET" && segments[0] === "meta" && segments[1] === "media") {
      if (!admin) return adminUnauthorized(res);
      const media = await listMediaLibrary();
      return res.status(200).json({ success: true, media });
    }

    // POST /api/blogs/meta/categories
    if (method === "POST" && segments[0] === "meta" && segments[1] === "categories") {
      if (!admin) return adminUnauthorized(res);
      const body = await parseJsonBody(req);
      const result = await addCategory(body?.name);
      return res
        .status(result.ok ? 201 : 400)
        .json(
          result.ok
            ? { success: true, categories: result.categories }
            : { success: false, message: result.message },
        );
    }

    // DELETE /api/blogs/meta/categories/:id
    if (
      method === "DELETE" &&
      segments[0] === "meta" &&
      segments[1] === "categories" &&
      segments[2]
    ) {
      if (!admin) return adminUnauthorized(res);
      const result = await deleteCategory(decodeURIComponent(segments[2]));
      return res
        .status(result.ok ? 200 : 404)
        .json(
          result.ok
            ? { success: true, categories: result.categories }
            : { success: false, message: result.message },
        );
    }

    // POST /api/blogs/meta/tags
    if (method === "POST" && segments[0] === "meta" && segments[1] === "tags") {
      if (!admin) return adminUnauthorized(res);
      const body = await parseJsonBody(req);
      const result = await addTag(body?.name);
      return res
        .status(result.ok ? 201 : 400)
        .json(
          result.ok
            ? { success: true, tags: result.tags }
            : { success: false, message: result.message },
        );
    }

    // DELETE /api/blogs/meta/tags/:id
    if (
      method === "DELETE" &&
      segments[0] === "meta" &&
      segments[1] === "tags" &&
      segments[2]
    ) {
      if (!admin) return adminUnauthorized(res);
      const result = await deleteTag(decodeURIComponent(segments[2]));
      return res
        .status(result.ok ? 200 : 404)
        .json(
          result.ok
            ? { success: true, tags: result.tags }
            : { success: false, message: result.message },
        );
    }

    // GET /api/blogs/:slug
    if (method === "GET" && segments.length === 1) {
      const post = await getBlogPostBySlug(decodeURIComponent(segments[0]), {
        includeDrafts: admin,
      });
      if (!post) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      return res.status(200).json({ success: true, post });
    }

    // POST /api/blogs — create
    if (method === "POST" && segments.length === 0) {
      if (!admin) return adminUnauthorized(res);
      const body = await parseJsonBody(req);
      const result = await saveBlogPost(body ?? {});
      return res
        .status(result.ok ? 201 : 400)
        .json(
          result.ok
            ? { success: true, post: result.post }
            : { success: false, message: result.message },
        );
    }

    // PUT /api/blogs/:slug — update
    if (method === "PUT" && segments.length === 1) {
      if (!admin) return adminUnauthorized(res);
      const slug = decodeURIComponent(segments[0]);
      const existing = await getBlogPostBySlug(slug, { includeDrafts: true });
      if (!existing) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      const body = await parseJsonBody(req);
      const result = await saveBlogPost(
        { ...existing, ...(body ?? {}), id: existing.id },
        { existingSlug: slug },
      );
      return res
        .status(result.ok ? 200 : 400)
        .json(
          result.ok
            ? { success: true, post: result.post }
            : { success: false, message: result.message },
        );
    }

    // DELETE /api/blogs/:slug
    if (method === "DELETE" && segments.length === 1) {
      if (!admin) return adminUnauthorized(res);
      const result = await deleteBlogPost(decodeURIComponent(segments[0]));
      return res
        .status(result.ok ? 200 : 404)
        .json(
          result.ok
            ? { success: true }
            : { success: false, message: result.message },
        );
    }

    return res.status(404).json({ success: false, message: "Not found" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Blog API error";
    return res.status(500).json({ success: false, message });
  }
}

/** Express-compatible named exports (optional). */
export async function listBlogsLogic(includeDrafts) {
  const posts = await listBlogPosts({ includeDrafts });
  return { success: true, posts };
}
