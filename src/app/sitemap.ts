import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.multiimaint.com";

  const staticPages = ["/", "/services", "/shop", "/about", "/blog", "/contact"];

  const blogPages = BLOG_POSTS.map((p) => `/blog/${p.slug}`);

  const pages = [...staticPages, ...blogPages];

  return pages.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
