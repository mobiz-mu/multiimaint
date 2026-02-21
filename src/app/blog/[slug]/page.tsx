// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { BLOG_POSTS, getPost } from "@/lib/blogPosts";

const SITE = "https://www.multiimaint.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

// ✅ Next 16: params can be a Promise -> make it async + await
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const safeSlug = decodeURIComponent(slug);
  const post = getPost(safeSlug);
  if (!post) return {};

  const title = post.seoTitle?.fr ?? post.title.fr;
  const desc = post.seoDesc?.fr ?? post.excerpt.fr;
  const og = post.image?.startsWith("http") ? post.image : `${SITE}${post.image}`;

  return {
    title,
    description: desc,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE}/blog/${post.slug}`,
      title,
      description: desc,
      images: [{ url: og }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [og],
    },
  };
}

// ✅ Next 16: params can be a Promise -> make it async + await
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const safeSlug = decodeURIComponent(slug);
  const post = getPost(safeSlug);
  if (!post) return notFound();

  return (
    <main className="relative">
      <BlogPostClient post={post} />
    </main>
  );
}