export interface TableOfContentsItem {
  id: string;
  heading: string;
  level: number;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export type BlogStatus = "draft" | "published" | "scheduled";

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  /** HTML or legacy markdown body */
  content: string;
  author: string;
  authorBio: string;
  authorImage: string;
  publishedAt: string;
  scheduledAt?: string | null;
  readTime: number;
  category: string;
  tags: string[];
  heroImage: string;
  heroImagePublicId?: string;
  images: string[];
  status?: BlogStatus;
  isPublished: boolean;
  isFeatured?: boolean;
  youtubeUrl?: string;
  relatedProductSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  faqs?: BlogFaq[];
  tableOfContents?: TableOfContentsItem[];
  updatedAt?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

const postModules = import.meta.glob("../content/blogs/posts/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Blog>;

const categoriesMod = import.meta.glob("../content/blogs/categories.json", {
  eager: true,
  import: "default",
}) as Record<string, { categories?: BlogCategory[] }>;

const tagsMod = import.meta.glob("../content/blogs/tags.json", {
  eager: true,
  import: "default",
}) as Record<string, { tags?: BlogTag[] }>;

function normalizeLoaded(post: Blog): Blog {
  const status: BlogStatus =
    post.status ?? (post.isPublished ? "published" : "draft");
  return {
    ...post,
    status,
    isPublished: status === "published" || post.isPublished === true,
    isFeatured: Boolean(post.isFeatured),
    faqs: post.faqs ?? [],
    relatedProductSlugs: post.relatedProductSlugs ?? [],
    youtubeUrl: post.youtubeUrl ?? "",
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    canonicalUrl: post.canonicalUrl ?? "",
    heroImagePublicId: post.heroImagePublicId ?? "",
    images: post.images ?? [],
    tags: post.tags ?? [],
  };
}

/** All posts from file store (includes drafts — filter for public pages). */
export const BLOGS: Blog[] = Object.values(postModules)
  .map(normalizeLoaded)
  .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

export const BLOG_CATEGORIES: BlogCategory[] =
  Object.values(categoriesMod)[0]?.categories ?? [];

export const BLOG_TAGS: BlogTag[] = Object.values(tagsMod)[0]?.tags ?? [];

export function getPublishedBlogs(): Blog[] {
  const now = Date.now();
  return BLOGS.filter((b) => {
    if (b.status === "published" || b.isPublished) return true;
    if (b.status === "scheduled" && b.scheduledAt) {
      const when = Date.parse(b.scheduledAt);
      return Number.isFinite(when) && when <= now;
    }
    return false;
  });
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return BLOGS.find((b) => b.slug === slug);
}
