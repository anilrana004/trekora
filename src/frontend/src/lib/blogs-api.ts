import { getAdminSecret, hasAdminSession } from "@/lib/admin-access";
import type { Blog, BlogCategory, BlogTag } from "@/data/blogs";

export interface BlogMediaItem {
  url: string;
  publicId: string;
  kind: string;
  postSlug: string;
  postTitle: string;
}

function adminHeaders(): HeadersInit {
  if (!hasAdminSession()) return {};
  const secret = getAdminSecret();
  if (!secret) return {};
  return { "x-admin-secret": secret };
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { message?: string; success?: boolean };
  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string" ? data.message : `Request failed (${res.status})`,
    );
  }
  return data;
}

export async function fetchAdminBlogs(): Promise<Blog[]> {
  const res = await fetch("/api/blogs?all=1", {
    headers: { ...adminHeaders() },
  });
  const data = await parseJson<{ success: boolean; posts: Blog[] }>(res);
  return data.posts ?? [];
}

export async function fetchBlogBySlugAdmin(slug: string): Promise<Blog> {
  const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
    headers: { ...adminHeaders() },
  });
  const data = await parseJson<{ success: boolean; post: Blog }>(res);
  return data.post;
}

export async function createBlogPost(
  payload: Partial<Blog>,
): Promise<Blog> {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...adminHeaders(),
    },
    body: JSON.stringify(payload),
  });
  const data = await parseJson<{ success: boolean; post: Blog }>(res);
  return data.post;
}

export async function updateBlogPost(
  slug: string,
  payload: Partial<Blog>,
): Promise<Blog> {
  const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...adminHeaders(),
    },
    body: JSON.stringify(payload),
  });
  const data = await parseJson<{ success: boolean; post: Blog }>(res);
  return data.post;
}

export async function deleteBlogPost(slug: string): Promise<void> {
  const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
    method: "DELETE",
    headers: { ...adminHeaders() },
  });
  await parseJson(res);
}

export async function fetchBlogCategories(): Promise<BlogCategory[]> {
  const res = await fetch("/api/blogs/meta/categories");
  const data = await parseJson<{ success: boolean; categories: BlogCategory[] }>(
    res,
  );
  return data.categories ?? [];
}

export async function addBlogCategory(name: string): Promise<BlogCategory[]> {
  const res = await fetch("/api/blogs/meta/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...adminHeaders(),
    },
    body: JSON.stringify({ name }),
  });
  const data = await parseJson<{ success: boolean; categories: BlogCategory[] }>(
    res,
  );
  return data.categories ?? [];
}

export async function deleteBlogCategory(
  idOrSlug: string | number,
): Promise<BlogCategory[]> {
  const res = await fetch(
    `/api/blogs/meta/categories/${encodeURIComponent(String(idOrSlug))}`,
    {
      method: "DELETE",
      headers: { ...adminHeaders() },
    },
  );
  const data = await parseJson<{ success: boolean; categories: BlogCategory[] }>(
    res,
  );
  return data.categories ?? [];
}

export async function fetchBlogTags(): Promise<BlogTag[]> {
  const res = await fetch("/api/blogs/meta/tags");
  const data = await parseJson<{ success: boolean; tags: BlogTag[] }>(res);
  return data.tags ?? [];
}

export async function addBlogTag(name: string): Promise<BlogTag[]> {
  const res = await fetch("/api/blogs/meta/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...adminHeaders(),
    },
    body: JSON.stringify({ name }),
  });
  const data = await parseJson<{ success: boolean; tags: BlogTag[] }>(res);
  return data.tags ?? [];
}

export async function deleteBlogTag(
  idOrSlug: string | number,
): Promise<BlogTag[]> {
  const res = await fetch(
    `/api/blogs/meta/tags/${encodeURIComponent(String(idOrSlug))}`,
    {
      method: "DELETE",
      headers: { ...adminHeaders() },
    },
  );
  const data = await parseJson<{ success: boolean; tags: BlogTag[] }>(res);
  return data.tags ?? [];
}

export async function fetchBlogMediaLibrary(): Promise<BlogMediaItem[]> {
  const res = await fetch("/api/blogs/meta/media", {
    headers: { ...adminHeaders() },
  });
  const data = await parseJson<{ success: boolean; media: BlogMediaItem[] }>(
    res,
  );
  return data.media ?? [];
}
