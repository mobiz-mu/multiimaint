// src/components/multiimaint/HomeAbout.tsx
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";

function IconShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 2 20 6v6c0 6-4 10-8 11-4-1-8-5-8-11V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8.5 12.2 10.8 14.5 15.8 9.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLightning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconMapPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCapsule({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/95 shadow-[0_10px_30px_rgba(2,6,23,0.08)] ring-1 ring-slate-200/80">
      {children}
    </span>
  );
}

export default function HomeAbout() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  const copy = useMemo(
    () =>
      lang === "fr"
        ? {
            eyebrow: "À propos",
            title: "MultiiMaint, votre partenaire premium en maintenance et facility management",
            intro:
              "Nous accompagnons les entreprises, commerces, immeubles et sites professionnels à l’île Maurice avec un service structuré, réactif et haut de gamme en maintenance, nettoyage professionnel et gestion technique.",
            cta: "Découvrir MultiiMaint",
            items: [
              {
                icon: <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Fiabilité, conformité et qualité maîtrisée",
                d: "Chaque intervention suit un processus clair, avec exécution soignée, standards élevés et suivi de qualité adapté aux environnements professionnels.",
              },
              {
                icon: <IconLightning className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Réactivité et communication fluide",
                d: "Notre équipe privilégie la rapidité d’intervention, la coordination efficace et une communication simple pour assurer une continuité de service.",
              },
              {
                icon: <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Couverture sur toute l’île Maurice",
                d: "Nous intervenons sur site unique ou multi-sites avec une organisation centralisée et une approche professionnelle adaptée à votre activité.",
              },
            ],
          }
        : {
            eyebrow: "About Us",
            title: "MultiiMaint, your premium partner in maintenance and facility management",
            intro:
              "We support businesses, commercial spaces, buildings and professional sites across Mauritius with structured, responsive and high-end maintenance, professional cleaning and technical facility services.",
            cta: "Discover MultiiMaint",
            items: [
              {
                icon: <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Reliability, compliance and quality control",
                d: "Every intervention follows a clear process with careful execution, high standards and structured quality follow-up for professional environments.",
              },
              {
                icon: <IconLightning className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Fast response and smooth communication",
                d: "Our team prioritizes responsive support, efficient coordination and clear communication to help keep your operations running smoothly.",
              },
              {
                icon: <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />,
                t: "Islandwide coverage across Mauritius",
                d: "We support both single-site and multi-site operations with centralized coordination and a professional service approach tailored to your business.",
              },
            ],
          },
    [lang]
  );

  return (
    <section id="about" className="relative w-full overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,123,32,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(11,27,74,0.10),transparent_28%),linear-gradient(to_bottom,#ffffff,#fffdfb)]" />
        <div className="absolute -top-24 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl sm:h-[520px] sm:w-[520px]" />
        <div className="absolute -bottom-28 right-[4%] h-[260px] w-[260px] rounded-full bg-[#0B1B4A]/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-[#F47B20]/20 bg-[#F47B20]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F47B20] sm:text-xs">
              {copy.eyebrow}
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {copy.title}
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {copy.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {copy.items.map((it, idx) => (
            <Reveal key={idx} delay={0.06 * idx}>
              <div className="group h-full rounded-[28px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-7">
                <div className="flex items-start gap-4">
                  <IconCapsule>{it.icon}</IconCapsule>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 sm:text-[1.15rem]">
                      {it.t}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-[15px]">
                      {it.d}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 flex justify-center sm:mt-12">
            <Link
              href="/about"
              aria-label={copy.cta}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#F47B20] px-6 py-3.5 text-sm font-extrabold text-[#0B1B4A] shadow-[0_14px_34px_rgba(244,123,32,0.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[#F47B20]/40 focus:ring-offset-2 sm:px-7"
            >
              {copy.cta}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
