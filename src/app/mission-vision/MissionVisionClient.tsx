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
      <h2 className="mt-2 text-[24px] font-extrabold text-slate-900 md:text-[32px]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700 max-w-[900px]">
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

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MultiiMaint Ltd",
      url: "https://www.multiimaint.com",
      description: t.desc,
      areaServed: { "@type": "Country", name: "Mauritius" },
      knowsAbout: [
        "Maintenance in Mauritius",
        "Professional cleaning Mauritius",
        "Facility management Mauritius",
        "Gardening services Mauritius",
      ],
    };
  }, [t.desc]);

  return (
    <PageWrap>
      {/* ================= HERO ================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200 shadow-[0_35px_110px_rgba(2,6,23,.14)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/25 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="relative z-10 px-6 py-16 md:px-12 md:py-24 text-white">
            <div className="max-w-[1200px] mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {lang === "fr"
                  ? "MISSION • VISION • VALEURS"
                  : "MISSION • VISION • VALUES"}
              </div>

              <h1 className="mt-6 text-[38px] md:text-[64px] font-extrabold leading-[1.05]">
                {t.title}
              </h1>

              <p className="mt-6 max-w-[900px] text-[16px] md:text-[18px] text-white/85">
                {t.desc}
              </p>

              <div className="mt-8 h-[3px] w-32 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <article className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_25px_80px_rgba(2,6,23,.07)]">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE MISSION" : "OUR MISSION"}
            title={t.missionTitle}
          />
          <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
            {t.missionDesc}
          </p>
        </article>

        <article className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_25px_80px_rgba(2,6,23,.07)]">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE VISION" : "OUR VISION"}
            title={t.visionTitle}
          />
          <p className="mt-6 text-[15px] leading-relaxed text-slate-700">
            {t.visionDesc}
          </p>
        </article>
      </section>

      {/* ================= STRATEGIC IMPACT SECTION ================= */}
      <section className="mt-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-[0_25px_80px_rgba(2,6,23,.07)]">
        <SectionTitle
          kicker={lang === "fr" ? "IMPACT" : "IMPACT"}
          title={
            lang === "fr"
              ? "Créer des environnements sûrs et performants"
              : "Creating safe and high-performance environments"
          }
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            lang === "fr"
              ? "Réduction des interruptions opérationnelles"
              : "Reduced operational downtime",
            lang === "fr"
              ? "Amélioration de l’hygiène et de la sécurité"
              : "Improved hygiene and safety",
            lang === "fr"
              ? "Standard constant sur tous les sites"
              : "Consistent standards across sites",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-[14px] font-semibold text-slate-900"
            >
              • {item}
            </div>
          ))}
        </div>
      </section>

      {/* ================= PREMIUM CTA ================= */}
      <section className="mt-12 flex flex-col gap-5 sm:flex-row">
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-8 py-4 text-[15px] font-extrabold text-[#0B1B4A] shadow-[0_20px_60px_rgba(244,123,32,.3)] hover:brightness-110 transition"
        >
          {lang === "fr"
            ? "Découvrir nos services"
            : "Discover our services"}
        </Link>

        <a
          href="/#contact"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-[15px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition"
        >
          {lang === "fr" ? "Parler à notre équipe" : "Speak to our team"}
        </a>
      </section>

      {/* SEO Hidden Depth */}
      <p className="sr-only">
        MultiiMaint Mauritius provides professional maintenance, cleaning,
        facility management and gardening services across the island with
        structured processes and quality control.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </PageWrap>
  );
}