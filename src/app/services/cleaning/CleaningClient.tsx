// src/app/services/cleaning/CleaningClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

type FAQ = { q: string; a: string };

export default function CleaningClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.cleaning;

  const heroImg = "/services/Professional Cleaning.jpeg";

  const longDesc =
    lang === "fr"
      ? "MultiiMaint propose un nettoyage professionnel premium pour bureaux, commerces, résidences et sites. Hygiène, désinfection, finitions soignées, et contrôle qualité — avec un suivi clair et une approche fiable."
      : "MultiiMaint provides premium professional cleaning for offices, retail, residences and sites. Hygiene, disinfection, neat finishing and quality control — with clear follow-up and reliable service.";

  const highlights =
    lang === "fr"
      ? [
          { k: "Hygiène", v: "Standards élevés & finitions" },
          { k: "Désinfection", v: "Procédures ciblées & efficaces" },
          { k: "Qualité", v: "Contrôle + checklist" },
          { k: "Flexibilité", v: "Ponctuel ou contrat" },
        ]
      : [
          { k: "Hygiene", v: "High standards & finishing" },
          { k: "Disinfection", v: "Targeted effective protocols" },
          { k: "Quality", v: "Checks + checklist" },
          { k: "Flexibility", v: "One-off or contract" },
        ];

  const process =
    lang === "fr"
      ? [
          { t: "Évaluation", d: "Surface, zones sensibles, fréquence et contraintes." },
          { t: "Plan & produits", d: "Méthode adaptée, produits et équipements." },
          { t: "Exécution", d: "Équipe encadrée, propreté et discrétion." },
          { t: "Contrôle", d: "Checklist + ajustements + suivi." },
        ]
      : [
          { t: "Assessment", d: "Area, sensitive zones, frequency and constraints." },
          { t: "Plan & supplies", d: "Adapted method, products and equipment." },
          { t: "Execution", d: "Managed team, clean and discreet." },
          { t: "Quality check", d: "Checklist + adjustments + follow-up." },
        ];

  const coverage =
    lang === "fr"
      ? ["Bureaux", "Commerces", "Résidences", "Sites & immeubles", "Espaces communs"]
      : ["Offices", "Retail", "Residences", "Sites & buildings", "Common areas"];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          {
            q: "Faites-vous des interventions ponctuelles ?",
            a: "Oui. Nous proposons des prestations ponctuelles ou des contrats (hebdo/mensuel) selon vos besoins.",
          },
          {
            q: "Proposez-vous la désinfection ?",
            a: "Oui. Nous pouvons intégrer des procédures de désinfection adaptées aux zones sensibles.",
          },
          {
            q: "Comment assurez-vous la qualité ?",
            a: "Nous appliquons une checklist, un contrôle qualité et un suivi client après intervention.",
          },
          {
            q: "Pouvez-vous nettoyer en dehors des heures d’ouverture ?",
            a: "Oui, selon la planification et la disponibilité de l’équipe.",
          },
        ]
      : [
          {
            q: "Do you provide one-off cleaning?",
            a: "Yes. We offer one-off services or recurring contracts (weekly/monthly) depending on your needs.",
          },
          {
            q: "Do you offer disinfection?",
            a: "Yes. We can include disinfection procedures for sensitive areas.",
          },
          {
            q: "How do you ensure quality?",
            a: "We use a checklist, quality checks and client follow-up after the service.",
          },
          {
            q: "Can you clean outside business hours?",
            a: "Yes, depending on scheduling and team availability.",
          },
        ];

  return (
    <PageWrap>
      {/* ✅ Clean sticky back bar (no CTA, no blank space) */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Services" : "Services"}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>
        </div>
      </div>

      {/* Keep your standard hero for consistency */}
      <PageHero
        kicker={lang === "fr" ? "Hygiène • Désinfection • Qualité" : "Hygiene • Disinfection • Quality"}
        title={s.title}
        desc={s.desc}
      >
        <CTAButtons />
      </PageHero>

      {/* ✅ Premium 16:9 Image Hero Block */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={
                lang === "fr"
                  ? "Nettoyage professionnel MultiiMaint à l’Île Maurice : hygiène, désinfection et finitions."
                  : "MultiiMaint professional cleaning in Mauritius: hygiene, disinfection and neat finishing."
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="max-w-[760px] text-white">
                <div className="text-[11px] font-extrabold tracking-widest text-white/90">
                  {lang === "fr" ? "MAURITIUS • HYGIÈNE • CONTRÔLE QUALITÉ" : "MAURITIUS • HYGIENE • QUALITY CONTROL"}
                </div>
                <div className="mt-2 text-[22px] font-extrabold leading-tight md:text-[28px]">
                  {lang === "fr"
                    ? "Nettoyage premium — finitions soignées et suivi."
                    : "Premium cleaning — neat finishing and follow-up."}
                </div>
                <p className="mt-2 text-[13px] text-white/90 md:text-[14px]">{longDesc}</p>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid gap-4 p-6 md:grid-cols-4 md:p-8">
            {highlights.map((h) => (
              <div key={h.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{h.k}</div>
                <div className="mt-1 text-[14px] font-semibold text-slate-900">{h.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included + Coverage */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
          {lang === "fr" ? "DÉTAILS DU SERVICE" : "SERVICE DETAILS"}
        </div>
        <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
          {lang === "fr" ? "Ce qui est inclus" : "What’s included"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">{lang === "fr" ? "Inclus" : "Included"}</div>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">{lang === "fr" ? "Zones couvertes" : "Coverage"}</div>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {coverage.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
          >
            {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
          </a>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            {lang === "fr" ? "Retour aux services" : "Back to services"}
          </Link>
        </div>
      </section>

      {/* Process */}
      <section className="mt-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {lang === "fr" ? "NOTRE MÉTHODE" : "OUR PROCESS"}
          </div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr" ? "Un nettoyage propre, contrôlé, et fiable" : "Clean, controlled, reliable cleaning"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {process.map((p) => (
              <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
                <p className="mt-2 text-[14px] text-slate-700">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">FAQ</div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>

          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white">
                <summary className="cursor-pointer list-none text-[14px] font-extrabold text-slate-900">
                  <span className="mr-2 text-[#F47B20]">+</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
            >
              {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {lang === "fr" ? "Retour aux services" : "Back to services"}
            </Link>
          </div>
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint cleaning services in Mauritius: professional cleaning, hygiene, disinfection, quality control and reporting.
      </span>
    </PageWrap>
  );
}