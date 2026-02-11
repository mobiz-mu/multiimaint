"use client";

import Link from "next/link";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Item = { t: string; d: string };

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function TickIcon() {
  return (
    <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1B4A] text-white shadow-sm">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="animate-[mm_tick_2.2s_ease-in-out_infinite]"
      >
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/20" />
    </span>
  );
}

function MissionIcon() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F47B20] text-[#0B1B4A] shadow-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function VisionIcon() {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1B4A] text-white shadow-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

export default function HomeAbout() {
  const { lang } = useLang();
  const c = copy(lang);

  const items: Item[] =
    lang === "fr"
      ? [
          { t: "Fiabilité", d: "Process clair, suivi structuré, qualité constante sur chaque intervention." },
          { t: "Rapidité", d: "Interventions rapides, communication WhatsApp, planning flexible et efficace." },
          { t: "Couverture île", d: "Basés à Quatre Bornes — interventions partout à Maurice, sites uniques ou multi-sites." },
        ]
      : [
          { t: "Reliability", d: "Clear process, structured follow-up, consistent quality on every intervention." },
          { t: "Speed", d: "Fast interventions, WhatsApp communication, flexible and efficient scheduling." },
          { t: "Island coverage", d: "Based in Quatre Bornes — we operate across Mauritius for single or multi-site support." },
        ];

  // 3–5 lines, centered, SEO-rich
  const aboutP =
    lang === "fr"
      ? "MultiiMaint Ltd est votre partenaire premium basé à Quatre Bornes, spécialisé en maintenance, nettoyage professionnel et facility management à l’île Maurice. Nous intervenons sur sites résidentiels, commerciaux et industriels, avec des méthodes fiables, un suivi clair et une exécution constante. Notre objectif : sécuriser la qualité, réduire vos imprévus et optimiser vos opérations — partout sur l’île, avec une communication simple et rapide."
      : "MultiiMaint Ltd is your premium partner based in Quatre Bornes, specializing in maintenance, professional cleaning and facility management across Mauritius. We support residential, commercial and industrial sites with reliable methods, clear follow-up and consistent execution. Our goal: protect quality, reduce unexpected issues and optimize operations — islandwide, with fast, simple communication.";

  const mission =
    lang === "fr"
      ? {
          t: "Notre mission",
          d: "Fournir un service premium, fiable et rapide en maintenance, nettoyage et facility management — avec communication simple, suivi clair, contrôle qualité et résultats mesurables.",
        }
      : {
          t: "Our mission",
          d: "Deliver premium, reliable and fast maintenance, cleaning and facility management — with simple communication, clear follow-up, quality control and measurable results.",
        };

  const vision =
    lang === "fr"
      ? {
          t: "Notre vision",
          d: "Devenir la référence à Maurice pour l’entretien et la gestion d’infrastructures, en combinant transparence, KPI, amélioration continue et expérience client premium.",
        }
      : {
          t: "Our vision",
          d: "Become Mauritius’ reference for facilities care and management by combining transparency, KPIs, continuous improvement and a premium customer experience.",
        };

  const learnMoreLabel = lang === "fr" ? "En savoir plus sur MultiiMaint" : "Learn more about MultiiMaint";

  return (
    <section id="about" className="relative py-14 md:py-20">
      {/* premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl animate-[mm_floatCenter_12s_12s_ease-in-out_infinite]" />
        <div className="absolute -bottom-56 left-[10%] h-[640px] w-[640px] rounded-full bg-red-500/8 blur-3xl animate-[mm_float2_13s_13s_ease-in-out_infinite]" />
        <div className="absolute -bottom-52 right-[8%] h-[560px] w-[560px] rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_float3_12s_12s_ease-in-out_infinite]" />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {lang === "fr" ? "À propos de MultiiMaint" : "About MultiiMaint"}
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
              {aboutP}
            </p>
          </div>
        </Reveal>

        {/* 3 premium glass containers (equal height + less empty space) */}
        <div className="mt-10 grid gap-5 md:grid-cols-3 items-stretch">
          {items.map((it, idx) => (
            <Reveal key={it.t} delay={0.05 + idx * 0.04}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl",
                  "border border-white/40 bg-white/55 backdrop-blur-xl",
                  "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                  "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]",
                  "animate-[mm_cardBreath_6.5s_ease-in-out_infinite]"
                )}
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#0B1B4A] via-[#0B1B4A]/80 to-transparent opacity-95" />
                <div className="pointer-events-none absolute -inset-24 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex h-full flex-col p-6">
                  <TickIcon />
                  <h3 className="mt-4 text-[16px] font-extrabold tracking-tight text-slate-900">{it.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{it.d}</p>

                  {/* keep consistent height, remove dead space */}
                  <div className="mt-auto pt-4" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Learn more + correct left/right lines */}
        <Reveal delay={0.12}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="hidden h-[2px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#F47B20] to-transparent opacity-80 md:block animate-[mm_line_2.6s_ease-in-out_infinite]" />
            <Link
              href="/about"
              aria-label={learnMoreLabel}
              className={cn(
                "relative inline-flex items-center justify-center rounded-2xl px-7 py-3",
                "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                "shadow-[0_14px_30px_rgba(244,123,32,.26)]",
                "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.34)]",
                "focus:outline-none focus:ring-2 focus:ring-slate-400"
              )}
            >
              {lang === "fr" ? "En savoir plus" : "Learn more"}
            </Link>
            <span className="hidden h-[2px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#F47B20] to-transparent opacity-80 md:block animate-[mm_line_2.6s_ease-in-out_infinite]" />
          </div>
        </Reveal>

        {/* Mission + Vision */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 items-stretch">
          <Reveal delay={0.06}>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl",
                "border border-white/40 bg-white/55 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]",
                "animate-[mm_cardBreath_6.5s_ease-in-out_infinite]"
              )}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <MissionIcon />
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">{mission.t}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-700">{mission.d}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl",
                "border border-white/40 bg-white/55 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]",
                "animate-[mm_cardBreath_6.5s_ease-in-out_infinite]"
              )}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#0B1B4A] via-[#0B1B4A]/80 to-transparent opacity-95" />
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <VisionIcon />
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">{vision.t}</h3>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-700">{vision.d}</p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* SEO helper */}
        <p className="sr-only">
          {lang === "fr"
            ? "MultiiMaint Ltd à Quatre Bornes — maintenance, nettoyage professionnel, facility management et interventions multi-sites partout à l’île Maurice."
            : "MultiiMaint Ltd in Quatre Bornes — maintenance, professional cleaning, facility management and multi-site interventions across Mauritius."}
        </p>
      </div>
    </section>
  );
}




