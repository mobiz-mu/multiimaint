// src/app/robots.ts
import type { MetadataRoute } from "next";

const SITE = "https://www.multiimaint.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/(admin)/",
          "/private/",
          "/draft/",
          "/tmp/",
        ],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}