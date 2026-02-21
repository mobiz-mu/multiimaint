"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS } from "@/lib/blogPosts";

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

function formatDate(date?: string, lang: "fr" | "en" = "en") {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogSearchGrid() {
  const { lang } = useLang() as { lang: "fr" | "en" };

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

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* Search + filters */}
      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(2,6,23,.06)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-[420px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === "fr" ? "Rechercher un article..." : "Search articles..."}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-[13px] text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
            />
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActive("all")}
              className={cn(
                "h-9 rounded-full px-4 text-[13px] font-extrabold transition",
                active === "all"
                  ? "bg-[#0B1B4A] text-white shadow-sm"
                  : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
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
                    : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
                )}
              >
                {lang === "fr" ? CAT_LABELS[c].fr : CAT_LABELS[c].en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      {featured && (
        <Reveal>
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "À LA UNE" : "FEATURED"}
              </div>
              <div className="text-[12px] font-semibold text-slate-500">
                {lang === "fr" ? "Derniers posts" : "Latest posts"}
              </div>
            </div>

            <article className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
              {/* ✅ FIX: ENCODED SLUG + accessible */}
              <Link
                href={`/blog/${encodeURIComponent(featured.slug)}`}
                aria-label={lang === "fr" ? `Lire: ${featured.title.fr}` : `Read: ${featured.title.en}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">{lang === "fr" ? featured.title.fr : featured.title.en}</span>
              </Link>

              <div className="grid md:grid-cols-[420px_1fr]">
                {/* Image LEFT */}
                <div className="relative aspect-[16/9] md:aspect-auto md:h-full bg-slate-100">
                  <Image
                    src={featured.image}
                    alt={lang === "fr" ? featured.title.fr : featured.title.en}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                </div>

                {/* Text RIGHT */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2">
                    {featured.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-[#F47B20]/10 px-3 py-1 text-[11px] font-extrabold text-[#F47B20]"
                      >
                        {lang === "fr" ? CAT_LABELS[c].fr : CAT_LABELS[c].en}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 text-[22px] font-extrabold tracking-tight text-slate-900 md:text-[26px]">
                    {lang === "fr" ? featured.title.fr : featured.title.en}
                  </h2>

                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {lang === "fr" ? featured.excerpt.fr : featured.excerpt.en}
                  </p>

                  <div className="mt-3 text-[12px] font-semibold text-slate-500">
                    {formatDate(featured.date, lang)} {featured.readTime ? `• ${featured.readTime}` : ""}
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0B1B4A] group-hover:text-[#F47B20] transition">
                    {lang === "fr" ? "Lire l’article" : "Read article"} →
                  </div>
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      )}

      {/* List (image left, text right) */}
      <div className="mt-8 grid gap-5">
        {rest.map((p, idx) => {
          const title = lang === "fr" ? p.title.fr : p.title.en;
          const excerpt = lang === "fr" ? p.excerpt.fr : p.excerpt.en;

          return (
            <Reveal key={p.slug} delay={0.02 + idx * 0.02}>
              <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(2,6,23,.06)] transition hover:-translate-y-[2px] hover:shadow-[0_24px_75px_rgba(2,6,23,.10)]">
                <Link
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  aria-label={lang === "fr" ? `Lire: ${title}` : `Read: ${title}`}
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">{title}</span>
                </Link>

                <div className="grid md:grid-cols-[280px_1fr]">
                  {/* Image LEFT */}
                  <div className="relative aspect-[16/9] md:aspect-auto md:h-full bg-slate-100">
                    <Image
                      src={p.image}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 280px"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Text RIGHT */}
                  <div className="p-5 md:p-6">
                    <div className="flex flex-wrap gap-2">
                      {p.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-700"
                        >
                          {lang === "fr" ? CAT_LABELS[c].fr : CAT_LABELS[c].en}
                        </span>
                      ))}
                    </div>

                    <h3 className="mt-3 text-[16px] font-extrabold tracking-tight text-slate-900 md:text-[17px]">
                      {title}
                    </h3>

                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{excerpt}</p>

                    <div className="mt-3 text-[12px] font-semibold text-slate-500">
                      {formatDate(p.date, lang)} {p.readTime ? `• ${p.readTime}` : ""}
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0B1B4A] group-hover:text-[#F47B20] transition">
                      {lang === "fr" ? "Lire l’article" : "Read article"} →
                    </div>
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