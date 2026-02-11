import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/multiimaint/Header";
import Footer from "@/components/multiimaint/Footer";
import BlogPostClient from "@/components/multiimaint/BlogPostClient";
import { BLOG_POSTS, getPost } from "@/lib/blogPosts";

const SITE = "https://www.multiimaint.com";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  // ✅ default metadata in FR (safe). Page UI is bilingual via client.
  const title = post.seoTitle?.fr ?? post.title.fr;
  const desc = post.seoDesc?.fr ?? post.excerpt.fr;

  const og = post.image?.startsWith("http") ? post.image : `${SITE}${post.image}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${SITE}/blog/${post.slug}`,
    },
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return notFound();

  return (
    <>
      <Header />
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/8 blur-3xl" />
          <div className="absolute -bottom-56 right-[12%] h-[620px] w-[620px] rounded-full bg-[#F47B20]/10 blur-3xl" />
        </div>

        <BlogPostClient post={post} />
      </main>
      <Footer />
    </>
  );
}
