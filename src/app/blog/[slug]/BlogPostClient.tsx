// src/app/blog/[slug]/BlogPostClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import type { BlogPost } from "@/lib/blogPosts";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { lang } = useLang() as { lang: "fr" | "en" };

  const title = lang === "fr" ? post.title.fr : post.title.en;
  const excerpt = lang === "fr" ? post.excerpt.fr : post.excerpt.en;
  const blocks = lang === "fr" ? post.content.fr : post.content.en;

  return (
    <article className="mx-auto max-w-[980px] px-4 py-10 md:py-12">
      {/* ✅ sticky back bar */}
      <div className="sticky top-0 z-40 -mx-4 mb-6 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[980px] items-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>

          {post.readTime && (
            <div className="ml-auto text-[12px] font-extrabold text-slate-500">{post.readTime}</div>
          )}
        </div>
      </div>

      {/* ✅ title */}
      <h1 className="text-[30px] font-extrabold tracking-tight text-slate-900 md:text-[40px]">
        {title}
      </h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
        {excerpt}
      </p>

      {/* ✅ premium hero image 16:9 */}
      <section className="mt-7 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(2,6,23,.06)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 980px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

          {/* optional top line accent */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />
        </div>

        {/* ✅ content */}
        <div className="p-6 md:p-10">
          <div className="prose prose-slate max-w-none">
            {blocks.map((b, i) => (
              <div key={i} className={cn("mb-7 last:mb-0")}>
                {b.h && (
                  <h2 className="mb-2 text-[18px] font-extrabold text-slate-900 md:text-[20px]">
                    {b.h}
                  </h2>
                )}
                <p className={cn("text-[15px] leading-relaxed text-slate-700", b.h && "mt-2")}>
                  {b.p}
                </p>
              </div>
            ))}
          </div>

          {/* ✅ bottom navigation */}
          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-6 py-3 text-[13px] font-extrabold text-white"
            >
              {lang === "fr" ? "Voir tous les articles" : "View all articles"}
            </Link>

            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {lang === "fr" ? "Nous contacter" : "Contact us"}
            </a>
          </div>
        </div>
      </section>

      {/* SEO helper */}
      <p className="sr-only">
        MultiiMaint blog article in Mauritius about maintenance, cleaning, hygiene and facilities management.
      </p>
    </article>
  );
}