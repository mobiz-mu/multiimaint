import type { Metadata } from "next";
import BlogClient from "./BlogClient";

const SITE = "https://www.multiimaint.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Premium guides on maintenance, hygiene, cost optimization and facilities management in Mauritius by MultiiMaint Ltd.",
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: "Blog — MultiiMaint Ltd",
    description:
      "Premium guides on maintenance, hygiene, cost optimization and facilities management in Mauritius.",
    url: `${SITE}/blog`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — MultiiMaint Ltd",
    description:
      "Premium guides on maintenance, hygiene and facilities management in Mauritius.",
    images: ["/og.png"],
  },
};

export default function BlogPage() {
  return <BlogClient />;
}