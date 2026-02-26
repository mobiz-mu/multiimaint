// src/components/multiimaint/HomeAbout.tsx
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* ===========================
   Executive Icons
=========================== */

function IconShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2 20 6v6c0 6-4 10-8 11-4-1-8-5-8-11V6l8-4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8.5 12.2 10.8 14.5 15.8 9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconLightning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconMapPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconCapsule({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-slate-200 shadow-md">
      {children}
    </span>
  );
}

export default function HomeAbout() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  const items = useMemo(
    () =>
      lang === "fr"
        ? [
            {
              icon: <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Fiabilité & qualité contrôlée",
              d: "Process clair, sécurité et contrôle qualité avec reporting pour chaque intervention.",
            },
            {
              icon: <IconLightning className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Rapidité & communication simple",
              d: "Réponse rapide, organisation efficace et suivi WhatsApp premium.",
            },
            {
              icon: <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Couverture île Maurice",
              d: "Interventions partout à Maurice avec coordination multi-sites.",
            },
          ]
        : [
            {
              icon: <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Reliability & quality control",
              d: "Clear process, safety-first execution and structured reporting.",
            },
            {
              icon: <IconLightning className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Fast response & communication",
              d: "Quick interventions and premium WhatsApp follow-up.",
            },
            {
              icon: <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />,
              t: "Mauritius islandwide coverage",
              d: "Single-site or multi-site coordinated support.",
            },
          ],
    [lang]
  );

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* MOBILE SAFE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute -top-32 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl sm:h-[620px] sm:w-[620px]" />
        <div className="absolute -bottom-40 right-[5%] h-[300px] w-[300px] rounded-full bg-[#0B1B4A]/10 blur-3xl sm:h-[560px] sm:w-[560px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
              {lang === "fr" ? "À propos de MultiiMaint" : "About MultiiMaint"}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-600 md:text-base">
              {lang === "fr"
                ? "Partenaire premium en maintenance, nettoyage professionnel et facilities management à Maurice."
                : "Premium partner in maintenance, professional cleaning and facilities management in Mauritius."}
            </p>
          </div>
        </Reveal>

        {/* CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((it, idx) => (
            <Reveal key={idx} delay={0.05 * idx}>
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <IconCapsule>{it.icon}</IconCapsule>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{it.t}</h3>
                    <p className="mt-2 text-sm text-slate-600">{it.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#F47B20] px-6 py-3 text-sm font-extrabold text-[#0B1B4A] shadow-md transition hover:brightness-110"
            >
              {lang === "fr" ? "Découvrir MultiiMaint" : "Discover MultiiMaint"}
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


