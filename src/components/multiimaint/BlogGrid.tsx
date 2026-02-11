"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS } from "@/lib/blogPosts";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function BlogGrid() {
  const { lang } = useLang();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {BLOG_POSTS.map((p, idx) => {
        const title = lang === "fr" ? p.title.fr : p.title.en;
        const excerpt = lang === "fr" ? p.excerpt.fr : p.excerpt.en;

        return (
          <Reveal key={p.slug} delay={0.03 + idx * 0.02}>
            <article
              className={cn(
                "group relative h-full overflow-hidden rounded-3xl",
                "border border-white/40 bg-white/55 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]"
              )}
            >
              {/* ✅ Whole-card click target */}
              <Link
                href={`/blog/${p.slug}`}
                aria-label={title}
                className="absolute inset-0 z-10 rounded-3xl"
              >
                <span className="sr-only">{title}</span>
              </Link>

              {/* top line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />

              {/* image */}
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src={p.image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.05]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                {/* ✅ Hover overlay label */}
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-4">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                      "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur",
                      "opacity-0 translate-y-1 transition-all duration-300",
                      "group-hover:opacity-100 group-hover:translate-y-0"
                    )}
                  >
                    <span className="text-[12px] font-extrabold">
                      {lang === "fr" ? "Lire l’article" : "Read article"}
                    </span>
                    <span className="text-[12px] font-extrabold">→</span>
                  </div>
                </div>
              </div>

              {/* content */}
              <div className="relative z-20 flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900">
                    {title}
                  </h3>

                  {(p.readTime || p.date) && (
                    <div className="shrink-0 text-[11px] font-extrabold text-slate-500">
                      {p.readTime ?? ""}
                    </div>
                  )}
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-700 line-clamp-3">
                  {excerpt}
                </p>

                {/* ✅ SEO + accessibility link (kept even though whole card is clickable) */}
                <div className="mt-auto pt-4 flex justify-end">
                  <Link
                    href={`/blog/${p.slug}`}
                    className={cn(
                      "relative z-30 inline-flex items-center gap-2",
                      "text-[13px] font-extrabold",
                      "text-[#0B1B4A] hover:text-[#F47B20] transition-colors",
                      "group/link"
                    )}
                    aria-label={lang === "fr" ? "Lire la suite" : "Read more"}
                  >
                    <span>{lang === "fr" ? "Lire la suite" : "Read more"}</span>
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
