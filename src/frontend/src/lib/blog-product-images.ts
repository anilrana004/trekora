import type { Blog } from "../data/blogs";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

export type BlogLinkedProduct = {
  kind: "trek" | "yatra";
  slug: string;
};

/**
 * Maps each blog slug to the trek or yatra it is about.
 * Card and hero images are resolved from that product's `image` field.
 */
export const BLOG_LINKED_PRODUCT: Record<string, BlogLinkedProduct> = {
  "roopkund-trek-guide-2026": { kind: "trek", slug: "roopkund-trek" },
  "valley-of-flowers-trek-guide": { kind: "trek", slug: "valley-of-flowers" },
  "triund-trek-guide-dharamsala": { kind: "trek", slug: "triund-trek" },
  "hampta-pass-trek-guide": { kind: "trek", slug: "hampta-pass" },
  "char-dham-yatra-2026-complete-guide": {
    kind: "yatra",
    slug: "char-dham-yatra",
  },
  "kedarkantha-trek-winter-guide": { kind: "trek", slug: "kedarkantha-trek" },
  "spiti-valley-travel-guide-2026": { kind: "trek", slug: "spiti-valley-trek" },
  "altitude-sickness-himalayan-treks-guide": {
    kind: "trek",
    slug: "roopkund-trek",
  },
  "solo-trekking-himalayas-safety-guide": { kind: "trek", slug: "triund-trek" },
  "best-beginner-treks-uttarakhand-himachal-2026": {
    kind: "trek",
    slug: "kedarkantha-trek",
  },
};

export function getLinkedProductForBlog(
  slug: string,
): BlogLinkedProduct | null {
  return BLOG_LINKED_PRODUCT[slug] ?? null;
}

export function getProductHeroImage(
  link: BlogLinkedProduct,
): string | undefined {
  if (link.kind === "trek") {
    return TREKS.find((t) => t.slug === link.slug)?.image;
  }
  return YATRAS.find((y) => y.slug === link.slug)?.image;
}

/** Card/hero image: always use the linked trek or yatra image when mapped. */
export function resolveBlogCardImage(
  blog: Pick<Blog, "slug" | "heroImage">,
): string {
  const link = getLinkedProductForBlog(blog.slug);
  if (link) {
    const productImage = getProductHeroImage(link);
    if (productImage) return productImage;
  }
  return blog.heroImage;
}

export function resolveBlogWithProductImages<T extends Blog>(blog: T): T {
  const cardImage = resolveBlogCardImage(blog);
  if (cardImage === blog.heroImage) return blog;
  return { ...blog, heroImage: cardImage };
}

/** Published blogs with card images synced to trek/yatra assets. */
export function getBlogsForDisplay(blogs: Blog[]): Blog[] {
  return blogs
    .filter((b) => b.isPublished || b.status === "published")
    .map((b) => resolveBlogWithProductImages(b));
}

export type RelatedProductCard = {
  kind: "trek" | "yatra";
  slug: string;
  name: string;
  image: string;
};

/** Resolve related trek/yatra cards from post slugs (+ legacy map fallback). */
export function resolveRelatedProducts(blog: Blog): RelatedProductCard[] {
  const linked = getLinkedProductForBlog(blog.slug);
  const slugs = [
    ...(blog.relatedProductSlugs ?? []),
    ...(linked ? [linked.slug] : []),
  ];
  const seen = new Set<string>();
  const out: RelatedProductCard[] = [];

  for (const slug of slugs) {
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    const trek = TREKS.find((t) => t.slug === slug);
    if (trek) {
      out.push({
        kind: "trek",
        slug: trek.slug,
        name: trek.name,
        image: trek.image,
      });
      continue;
    }
    const yatra = YATRAS.find((y) => y.slug === slug);
    if (yatra) {
      out.push({
        kind: "yatra",
        slug: yatra.slug,
        name: yatra.name,
        image: yatra.image,
      });
    }
  }
  return out;
}
