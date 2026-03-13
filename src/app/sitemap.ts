// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE = "https://www.multiimaint.mu";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Add your important routes here
  const routes: Array<{
    url: string;
    changeFrequency?: "daily" | "weekly" | "monthly";
    priority?: number;
  }> = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/services/maintenance`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/cleaning`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/facilities-management`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/services/gardening`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/shop`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/mission-vision`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: now,
    changeFrequency: r.changeFrequency ?? "monthly",
    priority: r.priority ?? 0.5,
  }));
}
