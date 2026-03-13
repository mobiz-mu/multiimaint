"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import type { BlogPost } from "@/lib/blogPosts";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

const CAT_LABELS = {
  Maintenance: { fr: "Maintenance", en: "Maintenance" },
  Cleaning: { fr: "Nettoyage", en: "Cleaning" },
  Facility: { fr: "Facility", en: "Facility" },
  Costs: { fr: "Coûts", en: "Costs" },
  HACCP: { fr: "HACCP", en: "HACCP" },
  Safety: { fr: "Sécurité", en: "Safety" },
} as const;

function formatDate(date?: string, lang: "fr" | "en" = "en") {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { lang } = useLang() as { lang: "fr" | "en" };

  const title = lang === "fr" ? post.title.fr : post.title.en;
  const excerpt = lang === "fr" ? post.excerpt.fr : post.excerpt.en;
  const blocks = lang === "fr" ? post.content.fr : post.content.en;

  const metaLine = useMemo(() => {
    const d = formatDate(post.date, lang);
    const rt = post.readTime ? `• ${post.readTime}` : "";
    return [d, rt].filter(Boolean).join(" ");
  }, [post.date, post.readTime, lang]);

  return (
    <article className="mx-auto w-full max-w-[1100px] px-4 py-8 md:py-10">
      {/* Back */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
        >
          ← {lang === "fr" ? "Retour au blog" : "Back to blog"}
        </Link>

        {metaLine && <div className="text-[12px] font-semibold text-slate-500">{metaLine}</div>}
      </div>

      {/* Hero */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_70px_rgba(2,6,23,.08)]">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={post.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 text-white">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-extrabold ring-1 ring-white/25 backdrop-blur"
                >
                  {lang === "fr" ? CAT_LABELS[c].fr : CAT_LABELS[c].en}
                </span>
              ))}
            </div>

            <h1 className="mt-3 text-[26px] font-extrabold tracking-tight md:text-[36px]">{title}</h1>
            <p className="mt-2 max-w-3xl text-[14px] text-white/90 md:text-[15px]">{excerpt}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <div className="prose prose-slate max-w-none">
            {blocks.map((b, i) => (
              <section key={i} className="mb-7 last:mb-0">
                {b.h && (
                  <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900 md:text-[20px]">
                    {b.h}
                  </h2>
                )}
                <p className={cn("text-[14px] leading-relaxed text-slate-700", b.h && "mt-2")}>{b.p}</p>
              </section>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
            >
              {lang === "fr" ? "Demander un devis" : "Request a quote"}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {lang === "fr" ? "Voir nos services" : "View services"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
