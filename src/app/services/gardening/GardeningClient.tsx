// src/app/services/gardening/GardeningClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

type FAQ = { q: string; a: string };

export default function GardeningClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.gardening;

  const heroImg = "/services/Gardening.jpeg";

  const longDesc =
    lang === "fr"
      ? "MultiiMaint entretient vos espaces verts avec une approche premium : planification, taille, nettoyage des abords et contrôle qualité pour un rendu net et durable."
      : "MultiiMaint maintains your green spaces with a premium approach: scheduled upkeep, trimming, exterior cleaning and quality control for a neat, lasting finish.";

  const highlights =
    lang === "fr"
      ? [
          { k: "Entretien", v: "Taille & maintenance régulière" },
          { k: "Planning", v: "Ponctuel, hebdo ou mensuel" },
          { k: "Propreté", v: "Nettoyage des abords" },
          { k: "Rendu", v: "Finition nette & durable" },
        ]
      : [
          { k: "Maintenance", v: "Regular trimming & upkeep" },
          { k: "Scheduling", v: "One-off, weekly or monthly" },
          { k: "Cleanliness", v: "Exterior area cleaning" },
          { k: "Finish", v: "Neat & lasting result" },
        ];

  const process =
    lang === "fr"
      ? [
          { t: "Évaluation", d: "Analyse des espaces verts et besoins spécifiques." },
          { t: "Planification", d: "Fréquence adaptée et priorités définies." },
          { t: "Intervention", d: "Taille, nettoyage, entretien." },
          { t: "Contrôle qualité", d: "Vérification du rendu final." },
        ]
      : [
          { t: "Assessment", d: "Green space analysis and specific needs." },
          { t: "Scheduling", d: "Adapted frequency and priorities." },
          { t: "Intervention", d: "Trimming, cleaning and upkeep." },
          { t: "Quality check", d: "Final result verification." },
        ];

  const coverage =
    lang === "fr"
      ? ["Résidences", "Bureaux", "Commerces", "Sites & immeubles", "Espaces communs"]
      : ["Residences", "Offices", "Retail", "Sites & buildings", "Common areas"];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          {
            q: "Proposez-vous un entretien régulier ?",
            a: "Oui, nous proposons des interventions ponctuelles ou des contrats hebdomadaires/mensuels.",
          },
          {
            q: "Entretenez-vous les grands espaces ?",
            a: "Oui, selon la configuration et la planification adaptée.",
          },
          {
            q: "Faites-vous uniquement la taille ?",
            a: "Nous proposons taille, nettoyage, entretien global et amélioration esthétique.",
          },
          {
            q: "Comment obtenir un devis ?",
            a: "Contactez-nous ou cliquez sur Demander un Devis pour une proposition claire.",
          },
        ]
      : [
          {
            q: "Do you offer regular maintenance?",
            a: "Yes, we provide one-off visits or weekly/monthly contracts.",
          },
          {
            q: "Do you maintain large areas?",
            a: "Yes, depending on site configuration and planning.",
          },
          {
            q: "Is it only trimming?",
            a: "We offer trimming, cleaning, overall maintenance and aesthetic improvements.",
          },
          {
            q: "How do I get a quote?",
            a: "Contact us or click Request a Quote for a clear proposal.",
          },
        ];

  return (
    <PageWrap>
      {/* Sticky back bar */}
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

      <PageHero
        kicker={lang === "fr" ? "Espaces verts • Propreté • Planning" : "Green spaces • Cleanliness • Scheduling"}
        title={s.title}
        desc={s.desc}
      >
        <CTAButtons />
      </PageHero>

      {/* Premium 16:9 Hero */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={
                lang === "fr"
                  ? "Jardinage MultiiMaint à l’Île Maurice"
                  : "MultiiMaint gardening in Mauritius"
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h2 className="text-[22px] font-extrabold md:text-[28px]">
                {lang === "fr"
                  ? "Espaces verts entretenus avec précision."
                  : "Green spaces maintained with precision."}
              </h2>
              <p className="mt-2 text-[14px]">{longDesc}</p>
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

      {/* Included & Coverage */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-md md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-extrabold text-slate-900">
              {lang === "fr" ? "Inclus" : "Included"}
            </h3>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">
              {lang === "fr" ? "Zones couvertes" : "Coverage"}
            </h3>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {coverage.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-md md:p-8">
        <h2 className="text-[20px] font-extrabold text-slate-900">
          {lang === "fr" ? "Notre méthode" : "Our process"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {process.map((p) => (
            <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
              <p className="mt-2 text-[14px] text-slate-700">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-md md:p-8">
        <h2 className="text-[20px] font-extrabold text-slate-900">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <summary className="cursor-pointer font-extrabold text-slate-900">
                {f.q}
              </summary>
              <p className="mt-3 text-[14px] text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint gardening services in Mauritius: green space maintenance,
        trimming, exterior cleaning and scheduled upkeep.
      </span>
    </PageWrap>
  );
}