// src/components/multiimaint/HomeAbout.tsx
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Item = { t: string; d: string };

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* ===========================
   Executive SVG Icons (real)
=========================== */
function IconShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2 20 6v6c0 6-4 10-8 11-4-1-8-5-8-11V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.2 10.8 14.5 15.8 9.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLightning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMapPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconTarget({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 17a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 12 20.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.9 3.8h3.6v3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEye({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconSpark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2l1.4 6.2L19 10l-5.6 1.8L12 18l-1.4-6.2L5 10l5.6-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 13l.7 3 2.3.9-2.3.9-.7 3-.7-3-2.3-.9 2.3-.9.7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================
   Executive Icon Capsule
   - subtle glass + ring + top highlight
========================================= */
function IconCapsule({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl",
        "bg-white/80 backdrop-blur",
        "ring-1 ring-[#0B1B4A]/12",
        "shadow-[0_16px_34px_rgba(2,6,23,.10)]"
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.16),transparent_60%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-2 h-[2px] rounded-full bg-gradient-to-r from-[#F47B20] via-[#ffb36b] to-transparent opacity-80"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export default function HomeAbout() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  const items: Array<Item & { icon: "reliability" | "speed" | "coverage" }> = useMemo(
    () =>
      lang === "fr"
        ? [
            {
              icon: "reliability",
              t: "Fiabilité & qualité contrôlée",
              d: "Process clair, sécurité, contrôle qualité et reporting (photos / KPI) pour chaque intervention — résidentiel, commercial ou industriel.",
            },
            {
              icon: "speed",
              t: "Rapidité & communication simple",
              d: "Réponse rapide, organisation efficace et suivi WhatsApp : un service premium qui respecte les délais et réduit les imprévus.",
            },
            {
              icon: "coverage",
              t: "Couverture île Maurice (multi-sites)",
              d: "Basés à Quatre Bornes — interventions partout à Maurice : sites uniques ou multi-sites, coordination et point de contact unique.",
            },
          ]
        : [
            {
              icon: "reliability",
              t: "Reliability & controlled quality",
              d: "Clear process, safety-first execution, quality control and reporting (photos / KPIs) for every job — residential, commercial or industrial.",
            },
            {
              icon: "speed",
              t: "Fast response & simple communication",
              d: "Quick interventions, efficient planning and WhatsApp follow-up: a premium service that meets deadlines and reduces surprises.",
            },
            {
              icon: "coverage",
              t: "Mauritius islandwide coverage (multi-site)",
              d: "Based in Quatre Bornes — we operate across Mauritius for single or multi-site support, coordination and a single point of contact.",
            },
          ],
    [lang]
  );

  const aboutP =
    lang === "fr"
      ? "MultiiMaint Ltd est un partenaire corporate premium basé à Quatre Bornes, spécialisé en maintenance, nettoyage professionnel, facilities management et jardinage (intérieur & extérieur) à l’île Maurice. Nous accompagnons résidences, bureaux, commerces et sites industriels avec une exécution fiable, un contrôle qualité constant et un suivi clair. Notre engagement : interventions rapides, sécurité maîtrisée et résultats mesurables."
      : "MultiiMaint Ltd is a premium corporate partner based in Quatre Bornes, specializing in maintenance, professional cleaning, facilities management and gardening (indoor & outdoor) across Mauritius. We support residences, offices, retail and industrial sites with reliable execution, consistent quality control and clear follow-up. Our commitment: fast interventions, controlled safety and measurable results.";

  const mission =
    lang === "fr"
      ? {
          t: "Notre mission",
          d: "Livrer un service premium, fiable et rapide en maintenance & facilities care — avec communication simple, contrôle qualité, suivi structuré et reporting (KPI) pour chaque site.",
        }
      : {
          t: "Our mission",
          d: "Deliver premium, reliable and fast facilities care — with simple communication, quality control, structured follow-up and KPI reporting for every site.",
        };

  const vision =
    lang === "fr"
      ? {
          t: "Notre vision",
          d: "Devenir la référence à Maurice pour l’entretien et la gestion d’infrastructures, grâce à la transparence, l’amélioration continue et une expérience client corporate de haut niveau.",
        }
      : {
          t: "Our vision",
          d: "Become Mauritius’ reference for facilities care and management through transparency, continuous improvement and a high-end corporate customer experience.",
        };

  // SEO helper (light)
  const jsonLd = useMemo(() => {
    const name = "MultiiMaint Ltd";
    const descFr =
      "MultiiMaint Ltd (Quatre Bornes, Île Maurice) : maintenance, nettoyage professionnel, facilities management et jardinage. Service premium, contrôle qualité, KPI, suivi et interventions rapides.";
    const descEn =
      "MultiiMaint Ltd (Quatre Bornes, Mauritius): maintenance, professional cleaning, facilities management and gardening. Premium service, quality control, KPIs, follow-up and fast interventions.";

    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name,
      description: lang === "fr" ? descFr : descEn,
      areaServed: "MU",
    };
  }, [lang]);

  const learnMoreLabel = lang === "fr" ? "En savoir plus sur MultiiMaint" : "Learn more about MultiiMaint";

  const Tag = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-[#0B1B4A] ring-1 ring-black/5">
      {children}
    </span>
  );

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative w-full bg-white"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Executive luxury background (white, premium depth, no clutter) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute -top-44 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
        <div className="absolute -bottom-52 right-[8%] h-[560px] w-[560px] rounded-full bg-[#0B1B4A]/[0.06] blur-3xl" />
        <div className="absolute -bottom-48 left-[6%] h-[520px] w-[520px] rounded-full bg-[#ffb36b]/[0.10] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F47B20]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0B1B4A]/10 to-transparent" />
      </div>

      {/* Padding: tight enough to avoid blank space, still breathable */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-12 md:py-16">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Tag>MULTIIMAINT</Tag>
              <Tag>{lang === "fr" ? "ÎLE MAURICE" : "MAURITIUS"}</Tag>
              <Tag>{lang === "fr" ? "SERVICE PREMIUM" : "PREMIUM SERVICE"}</Tag>
            </div>

            <h2
              id="about-title"
              className="mt-3 text-balance text-[30px] font-extrabold tracking-tight text-slate-950 sm:text-[36px]"
            >
              {lang === "fr" ? "À propos de MultiiMaint" : "About MultiiMaint"}
            </h2>

            <p className="mx-auto mt-3 max-w-5xl text-pretty text-[14.5px] leading-relaxed text-slate-700 sm:text-[15.5px]">
              {aboutP}
            </p>

            <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#F47B20] via-[#0B1B4A]/80 to-[#F47B20]" />
          </div>
        </Reveal>

        {/* 3 executive cards */}
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          {items.map((it, idx) => {
            const icon =
              it.icon === "reliability" ? (
                <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />
              ) : it.icon === "speed" ? (
                <IconLightning className="h-6 w-6 text-[#0B1B4A]" />
              ) : (
                <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />
              );

            const micro =
              it.icon === "reliability"
                ? lang === "fr"
                  ? "Qualité • Sécurité • KPI"
                  : "Quality • Safety • KPIs"
                : it.icon === "speed"
                  ? lang === "fr"
                    ? "Rapide • Organisé • Suivi"
                    : "Fast • Organized • Follow-up"
                  : lang === "fr"
                    ? "Multi-sites • SPOC • Coordination"
                    : "Multi-site • SPOC • Coordination";

            return (
              <Reveal key={it.t} delay={0.06 + idx * 0.05}>
                <article
                  className={cn(
                    "group relative overflow-hidden rounded-[28px] bg-white",
                    "ring-1 ring-slate-200",
                    "shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                    "transition-all duration-300",
                    "hover:-translate-y-[2px] hover:shadow-[0_28px_90px_rgba(2,6,23,.12)]"
                  )}
                >
                  {/* premium top stroke */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ffb36b] to-[#0B1B4A]/70"
                    aria-hidden="true"
                  />

                  {/* soft internal glow */}
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.10),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,27,74,.06),transparent_55%)]" />
                  </div>

                  <div className="relative flex h-full flex-col p-7">
                    <div className="flex items-start gap-3">
                      <IconCapsule>{icon}</IconCapsule>

                      <div className="min-w-0">
                        <p className="text-[11px] font-extrabold tracking-[0.16em] text-slate-500">
                          {micro}
                        </p>
                        <h3 className="mt-1 text-[16px] font-extrabold tracking-tight text-slate-950">
                          {it.t}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">
                      {it.d}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#0B1B4A]/5 px-3 py-1 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-[#0B1B4A]/10">
                        <IconSpark className="h-4 w-4 text-[#F47B20]" />
                        {lang === "fr" ? "Standards corporate" : "Corporate standards"}
                      </span>

                      <span
                        className={cn(
                          "inline-flex items-center gap-2 text-[12px] font-extrabold text-[#0B1B4A]",
                          "opacity-70 transition group-hover:opacity-100"
                        )}
                        aria-hidden="true"
                      >
                        {lang === "fr" ? "Détails" : "Details"}
                        <IconArrowRight className="h-4 w-4 text-[#F47B20]" />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Mission / Vision — executive split */}
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-2">
          <Reveal delay={0.08}>
            <article
              className={cn(
                "relative overflow-hidden rounded-[28px] bg-white",
                "ring-1 ring-[#F47B20]/25",
                "shadow-[0_18px_60px_rgba(2,6,23,.08)]"
              )}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ffb36b] to-[#F47B20]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.12),transparent_60%)]" />
              </div>

              <div className="relative p-7">
                <div className="flex items-center gap-3">
                  <IconCapsule>
                    <IconTarget className="h-6 w-6 text-[#0B1B4A]" />
                  </IconCapsule>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-950">{mission.t}</h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{mission.d}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article
              className={cn(
                "relative overflow-hidden rounded-[28px] bg-white",
                "ring-1 ring-[#0B1B4A]/16",
                "shadow-[0_18px_60px_rgba(2,6,23,.08)]"
              )}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#0B1B4A]/70 to-[#F47B20]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,27,74,.10),transparent_60%)]" />
              </div>

              <div className="relative p-7">
                <div className="flex items-center gap-3">
                  <IconCapsule>
                    <IconEye className="h-6 w-6 text-[#0B1B4A]" />
                  </IconCapsule>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-950">{vision.t}</h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{vision.d}</p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* CTA row */}
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/about"
              aria-label={learnMoreLabel}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-3 sm:w-auto",
                "bg-[#F47B20] text-[#0B1B4A] text-[13.5px] font-extrabold",
                "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                "transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.30)]",
                "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25 focus:ring-offset-2"
              )}
            >
              {lang === "fr" ? "Découvrir MultiiMaint" : "Discover MultiiMaint"}
              <IconArrowRight className="h-4 w-4" />
            </Link>

            <div className="w-full max-w-xl text-center text-[12.5px] font-semibold text-slate-600 sm:w-auto sm:text-left">
              {lang === "fr"
                ? "Exécution premium • Suivi WhatsApp • Contrôle qualité • KPI & reporting"
                : "Premium execution • WhatsApp follow-up • Quality control • KPIs & reporting"}
            </div>
          </div>
        </Reveal>

        {/* SEO helper (screen reader only) */}
        <p className="sr-only">
          {lang === "fr"
            ? "MultiiMaint Ltd à Quatre Bornes, Île Maurice : maintenance, nettoyage professionnel, facilities management et jardinage. Service premium, interventions rapides, contrôle qualité, KPI, reporting et coordination multi-sites."
            : "MultiiMaint Ltd in Quatre Bornes, Mauritius: maintenance, professional cleaning, facilities management and gardening. Premium service, fast interventions, quality control, KPIs, reporting and multi-site coordination."}
        </p>
      </div>
    </section>
  );
}




