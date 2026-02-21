"use client";

import Link from "next/link";
import BlogSearchGrid from "@/components/multiimaint/BlogSearchGrid";
import { PageWrap, PageHero } from "@/components/multiimaint/PageBits";
import { useLang } from "@/contexts/LangContext";

export default function BlogClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  return (
    <PageWrap>
      {/* ✅ Subtle background glows (behind all) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/8 blur-3xl" />
        <div className="absolute -bottom-56 right-[10%] h-[620px] w-[620px] rounded-full bg-[#F47B20]/10 blur-3xl" />
      </div>

      {/* ✅ Sticky back bar (under Header) */}
      <div className="sticky top-[72px] z-40 -mx-4 border-b border-slate-200 bg-white/92 px-4 py-3 backdrop-blur-md md:top-[84px]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition"
          >
            ← {lang === "fr" ? "Services" : "Services"}
          </Link>
        </div>
      </div>

      {/* ✅ Premium hero */}
      <PageHero
        kicker={lang === "fr" ? "Guides • Conseils • Optimisation" : "Guides • Insights • Optimization"}
        title="Blog"
        desc={
          lang === "fr"
            ? "Guides premium en maintenance, hygiène, optimisation des coûts et facility management à l’île Maurice."
            : "Premium guides on maintenance, hygiene, cost optimization and facilities management in Mauritius."
        }
      />

      {/* ✅ Section wrapper (premium) */}
      <section className="mt-7">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "DERNIERS ARTICLES" : "LATEST POSTS"}
            </div>
            <div className="text-[12px] font-semibold text-slate-600">
              {lang === "fr" ? "Recherche + filtres" : "Search + filters"}
            </div>
          </div>

          {/* ✅ Blog list (featured + image-left cards) */}
          <BlogSearchGrid />
        </div>
      </section>

      <p className="sr-only">
        {lang === "fr"
          ? "Blog MultiiMaint : maintenance, nettoyage, hygiène, facility management et optimisation des coûts à l’Île Maurice."
          : "MultiiMaint blog: maintenance, cleaning, hygiene, facilities management and cost optimization in Mauritius."}
      </p>
    </PageWrap>
  );
}