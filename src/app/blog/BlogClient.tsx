"use client";

import Link from "next/link";
import BlogSearchGrid from "@/components/multiimaint/BlogSearchGrid";
import { PageWrap } from "@/components/multiimaint/PageBits";
import { useLang } from "@/contexts/LangContext";
import React from "react";

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
        {kicker}
      </div>
      <h1 className="mt-2 text-[26px] font-extrabold text-slate-900 md:text-[38px]">
        {title}
      </h1>
      {desc ? (
        <p className="mt-3 max-w-[900px] text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-2 text-[12px] font-semibold text-white ring-1 ring-white/20 backdrop-blur">
      {children}
    </span>
  );
}

export default function BlogClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  return (
    <PageWrap>
      {/* =========================
          Subtle background glows
      ========================= */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/8 blur-3xl" />
        <div className="absolute -bottom-64 right-[8%] h-[680px] w-[680px] rounded-full bg-[#F47B20]/10 blur-3xl" />
      </div>

      {/* =========================
          HERO – executive band
          (no PageHero, same luxury style)
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/28 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_18%_22%,rgba(244,123,32,.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-6 py-12 md:px-10 md:py-16">
            <div className="mx-auto max-w-[1200px]">
              {/* Minimal nav chips (luxury, not “buttons”) */}
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-extrabold tracking-wide text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"
                >
                  ← {lang === "fr" ? "Accueil" : "Home"}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-extrabold tracking-wide text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"
                >
                  ← {lang === "fr" ? "Services" : "Services"}
                </Link>
              </div>

              <div className="mt-8 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                  {lang === "fr"
                    ? "GUIDES • CONSEILS • OPTIMISATION"
                    : "GUIDES • INSIGHTS • OPTIMIZATION"}
                </div>

                <h1 className="mt-5 text-[36px] font-extrabold leading-[1.05] md:text-[58px]">
                  {lang === "fr" ? "Blog" : "Blog"}
                </h1>

                <p className="mt-4 max-w-[920px] text-[15px] text-white/85 md:text-[17px]">
                  {lang === "fr"
                    ? "Guides premium en maintenance, hygiène, optimisation des coûts et facility management à l’île Maurice — pensés pour les résidences et les entreprises."
                    : "Premium guides on maintenance, hygiene, cost optimization and facilities management in Mauritius — built for homes and businesses."}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>{lang === "fr" ? "Maintenance" : "Maintenance"}</Chip>
                  <Chip>{lang === "fr" ? "Nettoyage" : "Cleaning"}</Chip>
                  <Chip>{lang === "fr" ? "Facilities" : "Facilities"}</Chip>
                  <Chip>{lang === "fr" ? "Budget & KPI" : "Budget & KPIs"}</Chip>
                </div>

                <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT – premium container
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              kicker={lang === "fr" ? "DERNIERS ARTICLES" : "LATEST POSTS"}
              title={lang === "fr" ? "Conseils pratiques, clairs et actionnables" : "Practical, clear, actionable insights"}
              desc={
                lang === "fr"
                  ? "Recherchez par mots-clés et explorez des contenus conçus pour améliorer la fiabilité, la propreté et la performance de vos sites."
                  : "Search by keywords and explore content designed to improve reliability, cleanliness and performance across your sites."
              }
            />
            <div className="text-[12px] font-semibold text-slate-600">
              {lang === "fr" ? "Recherche + filtres" : "Search + filters"}
            </div>
          </div>

          <div className="mt-6 rounded-[26px] border border-slate-200 bg-slate-50 p-3 md:p-4">
            <BlogSearchGrid />
          </div>
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
