"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

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

  return (
    <PageWrap>
      {/* Sticky navigation */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "À propos" : "About"}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>
        </div>
      </div>

      <PageHero kicker={t.kicker} title={t.title} desc={t.desc}>
        <CTAButtons />
      </PageHero>

      {/* Premium 16:9 Banner */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,123,32,.35),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div className="max-w-[800px] text-white">
                <div className="text-[11px] font-extrabold tracking-widest text-white/90">
                  {lang === "fr"
                    ? "MAURITIUS • PREMIUM FACILITY SERVICES"
                    : "MAURITIUS • PREMIUM FACILITY SERVICES"}
                </div>
                <h2 className="mt-2 text-[26px] font-extrabold md:text-[34px]">
                  {lang === "fr"
                    ? "Notre engagement à long terme."
                    : "Our long-term commitment."}
                </h2>
                <p className="mt-2 text-[14px] text-white/90 md:text-[15px]">
                  {lang === "fr"
                    ? "Une vision corporate, structurée et durable."
                    : "A structured, corporate and sustainable vision."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_55px_rgba(2,6,23,.06)]">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {t.missionTitle}
          </div>
          <h3 className="mt-2 text-[20px] font-extrabold text-slate-900">
            {t.missionTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
            {t.missionText}
          </p>
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_55px_rgba(2,6,23,.06)]">
          <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">
            {t.visionTitle}
          </div>
          <h3 className="mt-2 text-[20px] font-extrabold text-slate-900">
            {t.visionTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
            {t.visionText}
          </p>
        </article>
      </section>

      {/* Values */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_55px_rgba(2,6,23,.06)]">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
          {lang === "fr" ? "VALEURS" : "VALUES"}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {pillars.map((p) => (
            <div
              key={p.k}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center"
            >
              <div className="text-[15px] font-extrabold text-slate-900">
                {p.k}
              </div>
              <div className="mt-2 text-[14px] text-slate-700">
                {p.d}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
          >
            {lang === "fr" ? "Explorer nos services" : "Explore our services"}
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </a>
        </div>
      </section>

      <p className="sr-only">{t.desc}</p>
    </PageWrap>
  );
}