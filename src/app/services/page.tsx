"use client";

import Header from "@/components/multiimaint/Header";
import HomeServices from "@/components/multiimaint/HomeServices";
import Footer from "@/components/multiimaint/Footer";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";

export default function ServicesPage() {
  const { lang } = useLang();
  const c = copy(lang);

  return (
    <>
      <Header />

      {/* ✅ Full width main (avoid clipping your section blobs + no double max width) */}
      <main id="main" className="w-full">
        {/* ===== Premium page hero ===== */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white/85 py-10 backdrop-blur">
          {/* soft premium blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/12 blur-3xl animate-[mm_floatCenter_12s_ease-in-out_infinite]" />
            <div className="absolute -bottom-44 left-[12%] h-[560px] w-[560px] rounded-full bg-red-500/8 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
            <div className="absolute -bottom-40 right-[10%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_float3_12s_ease-in-out_infinite]" />
          </div>

          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              {/* mini breadcrumb */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-[12px] font-extrabold text-slate-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F47B20]" />
                {lang === "fr" ? "Accueil" : "Home"}
                <span className="text-slate-400">/</span>
                <span className="text-[#0B1B4A]">{c.sections.services}</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {lang === "fr" ? "Nos Services Premium" : "Our Premium Services"}
              </h1>

              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
                {lang === "fr"
                  ? "6 services essentiels pour particuliers et entreprises à l’île Maurice : maintenance, nettoyage pro, facility management, extérieur, rénovation et contrats. Un seul point de contact — exécution rapide, suivi clair, qualité constante."
                  : "6 essential services for homes & businesses in Mauritius: maintenance, professional cleaning, facility management, outdoor care, renovation works, and contracts. One point of contact — fast execution, clear reporting, consistent quality."}
              </p>

              {/* quick chips (6 services) */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  lang === "fr" ? "Maintenance" : "Maintenance",
                  lang === "fr" ? "Nettoyage Pro" : "Professional Cleaning",
                  "Facility Management",
                  lang === "fr" ? "Jardin & Extérieur" : "Outdoor & Garden",
                  lang === "fr" ? "Travaux / Rénovation" : "Works / Renovation",
                  lang === "fr" ? "Contrats & Sous-traitance" : "Contracts & Subcontracting",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-[12px] font-extrabold text-slate-800 shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0B1B4A]" />
                    {t}
                  </span>
                ))}
              </div>

              {/* small premium note */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0B1B4A]/95 px-4 py-2 text-[12px] font-extrabold text-white shadow-[0_14px_34px_rgba(2,6,23,.22)]">
                <span className="text-[#F47B20]">●</span>
                {lang === "fr"
                  ? "Devis rapide • WhatsApp • Quatre Bornes • Intervention partout à Maurice"
                  : "Fast quote • WhatsApp • Quatre Bornes • Service across Mauritius"}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Services grid (your component already shows 6 cards) ===== */}
        <HomeServices />

        {/* SEO helper */}
        <p className="sr-only">
          {lang === "fr"
            ? "Services MultiiMaint Ltd à l’île Maurice : maintenance, nettoyage professionnel, facility management, extérieur, rénovation, contrats et sous-traitance."
            : "MultiiMaint services in Mauritius: maintenance, professional cleaning, facility management, outdoor care, renovation works, contracts and subcontracting."}
        </p>
      </main>

      <Footer />
    </>
  );
}


