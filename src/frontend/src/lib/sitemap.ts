import { BLOGS } from "../data/blogs";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

export interface SitemapEntry {
  url: string;
  priority: number;
  changefreq:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export function generateSitemapData(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
    { url: "/", priority: 1.0, changefreq: "daily" },
    { url: "/treks", priority: 0.8, changefreq: "weekly" },
    { url: "/yatras", priority: 0.8, changefreq: "weekly" },
    { url: "/destinations", priority: 0.7, changefreq: "monthly" },
    { url: "/blog", priority: 0.7, changefreq: "weekly" },
    { url: "/about", priority: 0.5, changefreq: "monthly" },
    { url: "/contact", priority: 0.5, changefreq: "monthly" },
    { url: "/gallery", priority: 0.5, changefreq: "weekly" },
  ];

  const trekPages: SitemapEntry[] = TREKS.filter((t) => t.isActive).map(
    (t) => ({
      url: `/treks/${t.slug}`,
      priority: 0.9,
      changefreq: "weekly",
    }),
  );

  const yatraPages: SitemapEntry[] = YATRAS.filter((y) => y.isActive).map(
    (y) => ({
      url: `/yatras/${y.slug}`,
      priority: 0.9,
      changefreq: "weekly",
    }),
  );

  const blogPages: SitemapEntry[] = BLOGS.filter((b) => b.isPublished).map(
    (b) => ({
      url: `/blog/${b.slug}`,
      priority: 0.8,
      changefreq: "weekly",
    }),
  );

  return [...staticPages, ...trekPages, ...yatraPages, ...blogPages];
}
