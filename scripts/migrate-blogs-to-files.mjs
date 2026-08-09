/**
 * One-shot: export src/frontend/src/data/blogs.ts → content/blogs JSON files.
 * Run: node --experimental-strip-types scripts/migrate-blogs-to-files.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const blogsTs = join(root, "src/frontend/src/data/blogs.ts");
const outDir = join(root, "src/frontend/src/content/blogs");
const postsDir = join(outDir, "posts");

const { BLOGS } = await import(pathToFileURL(blogsTs).href);

await mkdir(postsDir, { recursive: true });

const categories = new Set();
const tags = new Set();

for (const blog of BLOGS) {
  if (blog.category) categories.add(blog.category);
  for (const t of blog.tags ?? []) tags.add(t);

  const post = {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    author: blog.author,
    authorBio: blog.authorBio ?? "",
    authorImage: blog.authorImage ?? "",
    publishedAt: blog.publishedAt,
    scheduledAt: null,
    readTime: blog.readTime,
    category: blog.category,
    tags: blog.tags ?? [],
    heroImage: blog.heroImage,
    heroImagePublicId: "",
    images: blog.images ?? [],
    status: blog.isPublished ? "published" : "draft",
    isPublished: Boolean(blog.isPublished),
    isFeatured: false,
    youtubeUrl: "",
    relatedProductSlugs: [],
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    faqs: [],
    tableOfContents: blog.tableOfContents ?? [],
    updatedAt: new Date().toISOString(),
  };

  await writeFile(
    join(postsDir, `${blog.slug}.json`),
    `${JSON.stringify(post, null, 2)}\n`,
    "utf8",
  );
}

const categoryList = [...categories].sort().map((name, i) => ({
  id: i + 1,
  name,
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
}));

const tagList = [...tags].sort().map((name, i) => ({
  id: i + 1,
  name,
  slug: name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
}));

await writeFile(
  join(outDir, "categories.json"),
  `${JSON.stringify({ categories: categoryList }, null, 2)}\n`,
  "utf8",
);
await writeFile(
  join(outDir, "tags.json"),
  `${JSON.stringify({ tags: tagList }, null, 2)}\n`,
  "utf8",
);

process.stdout.write(
  `Migrated ${BLOGS.length} posts, ${categoryList.length} categories, ${tagList.length} tags → ${outDir}\n`,
);
