"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS, type BlogPost } from "@/lib/blogPosts";

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

type Cat = keyof typeof CAT_LABELS;

export default function BlogSearchGrid() {
  const { lang } = useLang();

  const [q, setQ] = useState("");
  const [active, setActive] = useState<Cat | "all">("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return BLOG_POSTS.filter((p) => {
      const title = (lang === "fr" ? p.title.fr : p.title.en).toLowerCase();
      const excerpt = (lang === "fr" ? p.excerpt.fr : p.excerpt.en).toLowerCase();

      const matchesText = !query || title.includes(query) || excerpt.includes(query);
      const matchesCat = active === "all" || p.categories.includes(active);

      return matchesText && matchesCat;
    });
  }, [q, active, lang]);

  const pills = useMemo(() => {
    const allCats: Cat[] = ["Maintenance", "Cleaning", "Facility", "Costs", "HACCP", "Safety"];
    return allCats;
  }, []);

  return (
    <div>
      {/* Search + pills */}
      <div className="mt-8 rounded-3xl border border-white/40 bg-white/55 p-4 backdrop-blur-xl shadow-[0_18px_60px_rgba(2,6,23,.08)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-[420px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === "fr" ? "Rechercher un article..." : "Search articles..."}
              className="h-11 w-full rounded-2xl border border-white/55 bg-white/70 px-4 pr-10 text-[13px] text-slate-900 outline-none backdrop-blur focus:ring-2 focus:ring-slate-300"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              ⌕
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={cn(
                "h-9 rounded-full px-4 text-[13px] font-extrabold transition",
                active === "all"
                  ? "bg-[#0B1B4A] text-white shadow-sm"
                  : "bg-white/70 text-slate-800 ring-1 ring-slate-200 hover:bg-white"
              )}
            >
              {lang === "fr" ? "Tout" : "All"}
            </button>

            {pills.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "h-9 rounded-full px-4 text-[13px] font-extrabold transition",
                  active === c
                    ? "bg-[#F47B20] text-[#0B1B4A] shadow-sm"
                    : "bg-white/70 text-slate-800 ring-1 ring-slate-200 hover:bg-white"
                )}
              >
                {lang === "fr" ? CAT_LABELS[c].fr : CAT_LABELS[c].en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {filtered.map((p, idx) => {
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
                {/* Whole card clickable */}
                <Link href={`/blog/${p.slug}`} aria-label={title} className="absolute inset-0 z-10 rounded-3xl">
                  <span className="sr-only">{title}</span>
                </Link>

                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />

                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  {/* Hover overlay label */}
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

                <div className="relative z-20 flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900">{title}</h3>
                    {p.readTime && <div className="shrink-0 text-[11px] font-extrabold text-slate-500">{p.readTime}</div>}
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-slate-700 line-clamp-3">{excerpt}</p>

                  {/* Keep a real link for SEO/keyboard users */}
                  <div className="mt-auto pt-4 flex justify-end">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="relative z-30 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0B1B4A] hover:text-[#F47B20] transition-colors"
                      aria-label={lang === "fr" ? "Lire la suite" : "Read more"}
                    >
                      <span>{lang === "fr" ? "Lire la suite" : "Read more"}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-[13px] font-semibold text-slate-600">
          {lang === "fr" ? "Aucun résultat. Essayez un autre mot-clé." : "No results. Try another keyword."}
        </div>
      )}
    </div>
  );
}
