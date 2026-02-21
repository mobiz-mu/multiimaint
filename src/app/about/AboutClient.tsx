// src/app/about/AboutClient.tsx
"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

type FAQ = { q: string; a: string };

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
          {
            k: "Service premium",
            d: "Process, sécurité et finitions propres pour chaque intervention.",
          },
          {
            k: "Qualité contrôlée",
            d: "Contrôles qualité, feedback client et amélioration continue.",
          },
          {
            k: "Reporting clair",
            d: "Transparence : photos, KPI et compte-rendu (selon contrat).",
          },
        ]
      : [
          {
            k: "Premium service",
            d: "Process, safety and neat finishing for every intervention.",
          },
          {
            k: "Controlled quality",
            d: "Quality checks, client feedback and continuous improvement.",
          },
          {
            k: "Clear reporting",
            d: "Transparency: photos, KPIs and reporting (contract-based).",
          },
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

  return (
    <PageWrap>
      {/* ✅ Sticky back bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Services" : "Services"}
          </Link>
          <Link
            href="/mission-vision"
            className="ml-auto inline-flex items-center justify-center rounded-full bg-[#0B1B4A] px-5 py-2 text-[13px] font-extrabold text-white hover:opacity-95 transition"
          >
            {t.cta}
          </Link>
        </div>
      </div>

      <PageHero kicker={t.kicker} title={t.title} desc={t.desc}>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <CTAButtons />
          <Link
            href="/mission-vision"
            className="inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-6 py-3 text-[13px] font-extrabold text-white"
          >
            {t.cta}
          </Link>
        </div>
      </PageHero>

      {/* ✅ Premium 16:9 Banner (no image needed) */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,123,32,.35),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div className="max-w-[860px] text-white">
                <div className="text-[11px] font-extrabold tracking-widest text-white/90">
                  {lang === "fr" ? "MAURITIUS • PREMIUM SERVICE • QUALITY CONTROL" : "MAURITIUS • PREMIUM SERVICE • QUALITY CONTROL"}
                </div>
                <h2 className="mt-2 text-[24px] font-extrabold leading-tight md:text-[32px]">
                  {lang === "fr" ? "Une équipe fiable pour vos sites." : "A reliable team for your sites."}
                </h2>
                <p className="mt-2 text-[14px] text-white/90 md:text-[15px]">{intro}</p>
              </div>
            </div>
          </div>

          {/* Mini highlights */}
          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            {pillars.map((x) => (
              <div key={x.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{x.k}</div>
                <div className="mt-2 text-[14px] leading-relaxed text-slate-700">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
          {lang === "fr" ? "NOS SERVICES" : "OUR SERVICES"}
        </div>
        <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
          {lang === "fr" ? "Une offre complète, premium" : "A complete premium offering"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {whatWeDo.map((x) => (
            <div key={x.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-[14px] font-extrabold text-slate-900">{x.t}</div>
              <div className="mt-2 text-[14px] leading-relaxed text-slate-700">{x.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
          >
            {lang === "fr" ? "Explorer les services" : "Explore services"}
          </Link>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            {lang === "fr" ? "Nous contacter" : "Contact us"}
          </a>
        </div>
      </section>

      {/* How we work */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
          {lang === "fr" ? "NOTRE MÉTHODE" : "OUR METHOD"}
        </div>
        <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
          {lang === "fr" ? "Simple, propre, contrôlé" : "Simple, clean, controlled"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {howWeWork.map((p) => (
            <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
              <p className="mt-2 text-[14px] text-slate-700">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">FAQ</div>
        <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
          {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
        </h2>

        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white">
              <summary className="cursor-pointer list-none text-[14px] font-extrabold text-slate-900">
                <span className="mr-2 text-[#F47B20]">+</span>
                {f.q}
              </summary>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="sr-only">{t.desc}</p>
    </PageWrap>
  );
}