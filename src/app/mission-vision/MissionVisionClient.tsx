"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

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
      <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
          {desc}
        </p>
      )}
    </div>
  );
}

export default function MissionVisionClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.missionVision[lang];

  const pillars =
    lang === "fr"
      ? [
          { k: "Sécurité", d: "Process et interventions maîtrisées." },
          { k: "Qualité", d: "Contrôle et amélioration continue." },
          { k: "Transparence", d: "Reporting clair et structuré." },
          { k: "Réactivité", d: "Réponse rapide et priorisation." },
        ]
      : [
          { k: "Safety", d: "Controlled processes and interventions." },
          { k: "Quality", d: "Quality checks and continuous improvement." },
          { k: "Transparency", d: "Clear and structured reporting." },
          { k: "Responsiveness", d: "Fast response and prioritization." },
        ];

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MultiiMaint Ltd",
      url: "https://www.multiimaint.com",
      description: t.desc,
      areaServed: { "@type": "Country", name: "Mauritius" },
    };
  }, [t.desc]);

  return (
    <PageWrap>
      {/* =========================
          HERO – EXECUTIVE BANNER
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">

          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/28 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_20%_25%,rgba(244,123,32,.35),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="relative z-10 px-6 py-14 md:px-10 md:py-20">
            <div className="mx-auto max-w-[1200px] text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {lang === "fr"
                  ? "MISSION • VISION • VALEURS"
                  : "MISSION • VISION • VALUES"}
              </div>

              <h1 className="mt-6 text-[36px] font-extrabold leading-[1.05] md:text-[60px]">
                {t.title}
              </h1>

              <p className="mt-4 max-w-[880px] text-[15px] text-white/85 md:text-[17px]">
                {t.desc}
              </p>

              <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MISSION & VISION
      ========================= */}
      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="rounded-[30px] border border-slate-200 bg-white p-10 shadow-[0_20px_60px_rgba(2,6,23,.06)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(2,6,23,.12)]">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE MISSION" : "OUR MISSION"}
            title={t.missionTitle}
          />
          <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
            {t.missionText}
          </p>
        </article>

        <article className="rounded-[30px] border border-slate-200 bg-white p-10 shadow-[0_20px_60px_rgba(2,6,23,.06)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(2,6,23,.12)]">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE VISION" : "OUR VISION"}
            title={t.visionTitle}
          />
          <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
            {t.visionText}
          </p>
        </article>
      </section>

      {/* =========================
          VALUES
      ========================= */}
      <section className="mt-6 rounded-[30px] border border-slate-200 bg-white p-10 shadow-[0_20px_60px_rgba(2,6,23,.06)]">
        <SectionTitle
          kicker={lang === "fr" ? "VALEURS" : "VALUES"}
          title={
            lang === "fr"
              ? "Les fondations de notre engagement"
              : "The foundation of our commitment"
          }
        />

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.k}
              className="rounded-[26px] border border-slate-200 bg-slate-50 p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-[15px] font-extrabold text-slate-900">
                {p.k}
              </div>
              <div className="mt-3 text-[14px] text-slate-700">
                {p.d}
              </div>
              <div className="mt-5 h-[2px] w-12 mx-auto bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
            </div>
          ))}
        </div>

        {/* Premium CTA Row */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-8 py-4 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_18px_55px_rgba(244,123,32,.25)] transition hover:brightness-110"
          >
            {lang === "fr"
              ? "Explorer nos services"
              : "Explore our services"}
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-[14px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </a>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="sr-only">{t.desc}</p>
    </PageWrap>
  );
}