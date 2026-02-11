"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import type { BlogPost } from "@/lib/blogPosts";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { lang } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // ✅ prevents mismatch (server renders nothing for this block)

  const t = lang === "fr" ? post.title.fr : post.title.en;
  const ex = lang === "fr" ? post.excerpt.fr : post.excerpt.en;
  const blocks = lang === "fr" ? post.content.fr : post.content.en;

  const crumbs = useMemo(
    () => ({
      blog: lang === "fr" ? "Blog" : "Blog",
      back: lang === "fr" ? "Retour au blog" : "Back to blog",
    }),
    [lang]
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0B1B4A] hover:text-[#F47B20] transition-colors"
        >
          ← {crumbs.back}
        </Link>

        {post.readTime && (
          <div className="text-[12px] font-extrabold text-slate-500">{post.readTime}</div>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{t}</h1>
      <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{ex}</p>

      <div className="mt-7 overflow-hidden rounded-3xl border border-white/40 bg-white/55 backdrop-blur-xl shadow-[0_18px_60px_rgba(2,6,23,.10)]">
        <div className="relative h-[240px] md:h-[320px]">
          <Image src={post.image} alt={t} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        </div>

        <div className="p-6 md:p-8">
          {blocks.map((b, i) => (
            <div key={i} className="mb-6 last:mb-0">
              {b.h && <h2 className="text-[16px] font-extrabold text-slate-900">{b.h}</h2>}
              <p className={cn("text-[14px] leading-relaxed text-slate-700", b.h && "mt-2")}>
                {b.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
