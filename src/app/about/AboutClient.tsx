// src/app/about/AboutClient.tsx
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

type FAQ = { q: string; a: string };

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

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
      <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{kicker}</div>
      <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">{title}</h2>
      {desc ? <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{desc}</p> : null}
    </div>
  );
}

export default function AboutClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.about[lang];

  const intro =
    lang === "fr"
      ? "MultiiMaint Ltd est votre partenaire premium pour la maintenance, le nettoyage professionnel et le facilities management à l’île Maurice. Notre différence : process, contrôle qualité, finitions propres et suivi clair."
      : "MultiiMaint Ltd is your premium partner for maintenance, professional cleaning and facilities management in Mauritius. Our difference: process, quality control, neat finishing and clear follow-up.";

  const pillars =
    lang === "fr"
      ? [
          { k: "Service premium", d: "Process, sécurité et finitions propres pour chaque intervention." },
          { k: "Qualité contrôlée", d: "Contrôles qualité, feedback client et amélioration continue." },
          { k: "Reporting clair", d: "Transparence : photos, KPI et compte-rendu (selon contrat)." },
        ]
      : [
          { k: "Premium service", d: "Process, safety and neat finishing for every intervention." },
          { k: "Controlled quality", d: "Quality checks, client feedback and continuous improvement." },
          { k: "Clear reporting", d: "Transparency: photos, KPIs and reporting (contract-based)." },
        ];

  const whatWeDo =
    lang === "fr"
      ? [
          { t: "Maintenance", d: "Préventive et corrective, interventions planifiées et urgences." },
          { t: "Nettoyage", d: "Hygiène, désinfection, finitions et suivi qualité." },
          { t: "Facilities Management", d: "Supervision, coordination, KPI et reporting multi-sites." },
          { t: "Jardinage", d: "Entretien espaces verts, propreté extérieure et planning." },
        ]
      : [
          { t: "Maintenance", d: "Preventive & corrective, scheduled work and urgent call-outs." },
          { t: "Cleaning", d: "Hygiene, disinfection, finishing and quality follow-up." },
          { t: "Facilities Management", d: "Supervision, coordination, KPIs and multi-site reporting." },
          { t: "Gardening", d: "Green space upkeep, exterior cleanliness and scheduling." },
        ];

  const howWeWork =
    lang === "fr"
      ? [
          { t: "Écoute & diagnostic", d: "Comprendre le besoin et les priorités." },
          { t: "Proposition claire", d: "Devis transparent, planning et options." },
          { t: "Exécution premium", d: "Interventions propres, sûres et contrôlées." },
          { t: "Suivi & amélioration", d: "Feedback, reporting et optimisation." },
        ]
      : [
          { t: "Assess & understand", d: "We understand needs and priorities." },
          { t: "Clear proposal", d: "Transparent quote, schedule and options." },
          { t: "Premium delivery", d: "Clean, safe, controlled execution." },
          { t: "Follow-up", d: "Feedback, reporting and continuous improvement." },
        ];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          { q: "Intervenez-vous pour les particuliers et entreprises ?", a: "Oui. Résidences, commerces, bureaux et sites multisites." },
          { q: "Proposez-vous des contrats mensuels ?", a: "Oui, selon le besoin : interventions planifiées, suivi et reporting." },
          { q: "Êtes-vous disponibles en cas d’urgence ?", a: "Selon disponibilité. Nous privilégions la réactivité et la sécurité." },
        ]
      : [
          { q: "Do you work with homes and businesses?", a: "Yes. Residences, retail, offices and multi-site operations." },
          { q: "Do you offer monthly contracts?", a: "Yes, depending on needs: planned visits, follow-up and reporting." },
          { q: "Do you handle urgent requests?", a: "Depending on availability. We prioritize fast response and safety." },
        ];

  const jsonLd = useMemo(() => {
    const url = "https://www.multiimaint.com/about";
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "MultiiMaint Ltd",
      url: "https://www.multiimaint.com",
      description:
        lang === "fr"
          ? "MultiiMaint Ltd à Maurice : maintenance, nettoyage professionnel, facilities management et jardinage. Service premium, contrôle qualité et reporting."
          : "MultiiMaint Ltd in Mauritius: maintenance, professional cleaning, facilities management and gardening. Premium service, quality control and reporting.",
      areaServed: { "@type": "Country", name: "Mauritius" },
      sameAs: [],
    };
  }, [lang]);

  const seoHelper =
    lang === "fr"
      ? "À propos de MultiiMaint Ltd à l’Île Maurice : partenaire premium en maintenance, nettoyage professionnel, facilities management et jardinage. Process, contrôle qualité, finitions propres et reporting clair."
      : "About MultiiMaint Ltd in Mauritius: premium partner for maintenance, professional cleaning, facilities management and gardening. Process, quality control, neat finishing and clear reporting.";

  return (
    <PageWrap>
      {/* =========================
          HERO – LUXURY BRAND BANNER
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">
          {/* Luxury base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/28 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_18%_22%,rgba(244,123,32,.33),transparent_55%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,.16),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

          <div className="relative z-10 px-6 py-12 md:px-10 md:py-16">
            <div className="mx-auto max-w-[1200px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest text-white ring-1 ring-white/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {lang === "fr" ? "À PROPOS • MAURITIUS • SERVICE PREMIUM" : "ABOUT • MAURITIUS • PREMIUM SERVICE"}
              </div>

              <h1 className="mt-5 text-[34px] font-extrabold leading-[1.05] text-white md:text-[58px]">
                {t.title}
              </h1>

              <p className="mt-4 max-w-[900px] text-[15px] leading-relaxed text-white/88 md:text-[17px]">
                {intro}
              </p>

              <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />

              {/* Premium CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/mission-vision"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-7 py-4 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_18px_55px_rgba(244,123,32,.25)] transition hover:scale-[1.02] hover:brightness-110"
                >
                  {t.cta}
                </Link>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-7 py-4 text-[14px] font-extrabold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/15"
                >
                  {lang === "fr" ? "Contactez-nous" : "Contact us"}
                </a>
              </div>

              {/* Micro trust row */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  lang === "fr" ? "Process structuré" : "Structured process",
                  lang === "fr" ? "Contrôle qualité" : "Quality control",
                  lang === "fr" ? "Finitions propres" : "Neat finishing",
                  lang === "fr" ? "Suivi & reporting" : "Follow-up & reporting",
                ].map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center rounded-full bg-black/20 px-3 py-2 text-[12px] font-semibold text-white ring-1 ring-white/15 backdrop-blur"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PILLARS (EXECUTIVE CARDS)
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,.06)] md:p-10">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE DIFFÉRENCE" : "OUR DIFFERENCE"}
            title={lang === "fr" ? "Une exécution premium, sans compromis" : "Premium execution, no compromises"}
            desc={
              lang === "fr"
                ? "Nous travaillons avec une logique corporate : méthode, qualité et visibilité. Chaque intervention vise un résultat durable et mesurable."
                : "We deliver with a corporate mindset: method, quality and visibility. Each intervention aims for a durable, measurable result."
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {pillars.map((x) => (
              <div
                key={x.k}
                className={cn(
                  "rounded-[26px] border border-slate-200 bg-slate-50 p-6",
                  "shadow-[0_12px_40px_rgba(2,6,23,.05)]",
                  "transition hover:-translate-y-[1px] hover:shadow-[0_18px_60px_rgba(2,6,23,.10)]"
                )}
              >
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{x.k}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{x.d}</p>

                <div className="mt-5 h-[2px] w-16 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          WHAT WE DO (SERVICE GRID)
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,.06)] md:p-10">
          <SectionTitle
            kicker={lang === "fr" ? "NOS SERVICES" : "OUR SERVICES"}
            title={lang === "fr" ? "Une offre complète pour vos sites" : "A complete offering for your sites"}
            desc={
              lang === "fr"
                ? "Maintenance, hygiène, supervision et propreté extérieure — avec la même exigence : qualité, sécurité et suivi."
                : "Maintenance, hygiene, supervision and exterior cleanliness — with the same standard: quality, safety and follow-up."
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {whatWeDo.map((x) => (
              <div
                key={x.t}
                className={cn(
                  "rounded-[26px] border border-slate-200 bg-slate-50 p-7",
                  "transition hover:-translate-y-[1px] hover:shadow-[0_18px_60px_rgba(2,6,23,.08)]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[18px] font-extrabold text-slate-900">{x.t}</div>
                  <span className="rounded-full bg-[#F47B20]/15 px-3 py-1 text-[11px] font-extrabold text-[#F47B20] ring-1 ring-[#F47B20]/25">
                    {lang === "fr" ? "Premium" : "Premium"}
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{x.d}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    lang === "fr" ? "Planification" : "Scheduling",
                    lang === "fr" ? "Contrôle" : "Checks",
                    lang === "fr" ? "Suivi" : "Follow-up",
                  ].map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-slate-800 ring-1 ring-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-7 py-4 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_18px_55px_rgba(244,123,32,.22)] transition hover:brightness-110"
            >
              {lang === "fr" ? "Explorer les services" : "Explore services"}
            </Link>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-[14px] font-extrabold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              {lang === "fr" ? "Nous contacter" : "Contact us"}
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          HOW WE WORK (PROCESS)
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,.06)] md:p-10">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE MÉTHODE" : "OUR METHOD"}
            title={lang === "fr" ? "Simple, propre, contrôlé" : "Simple, clean, controlled"}
            desc={
              lang === "fr"
                ? "Une méthode claire du diagnostic au suivi, pour garantir la qualité et la continuité sur vos sites."
                : "A clear method from assessment to follow-up, ensuring quality and continuity across your sites."
            }
          />

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {howWeWork.map((p, idx) => (
              <div key={p.t} className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200">
                    <span className="text-[12px] font-extrabold text-[#F47B20]">{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FAQ (LUXURY STRIP)
      ========================= */}
      <section className="mt-6">
        <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_26px_90px_rgba(2,6,23,.10)]">
          <div className="bg-gradient-to-r from-[#0B1B4A] to-[#071A3A] p-6 md:p-10">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">FAQ</div>
            <h2 className="mt-2 text-[22px] font-extrabold text-white md:text-[28px]">
              {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
            </h2>
            <p className="mt-2 max-w-[900px] text-[14px] leading-relaxed text-white/85">
              {lang === "fr"
                ? "Des réponses claires pour comprendre notre périmètre et nos modes d’intervention."
                : "Clear answers about our scope and how we deliver."}
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid gap-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-[26px] border border-slate-200 bg-slate-50 p-6 open:bg-white"
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[14px] font-extrabold text-slate-900">{f.q}</div>
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-white ring-1 ring-slate-200">
                        <span className="text-[#F47B20] text-lg font-black group-open:hidden">+</span>
                        <span className="text-[#F47B20] text-lg font-black hidden group-open:block">–</span>
                      </div>
                    </div>
                  </summary>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-7 py-4 text-[14px] font-extrabold text-[#0B1B4A] hover:brightness-110 transition"
              >
                {lang === "fr" ? "Contactez-nous" : "Contact us"}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-[14px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition"
              >
                {lang === "fr" ? "Voir les services" : "View services"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD (SEO) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* SEO helper */}
      <p className="sr-only">{seoHelper}</p>
    </PageWrap>
  );
}