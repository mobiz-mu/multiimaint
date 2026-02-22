// src/app/services/maintenance/MaintenanceClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================
   In-view (once) + Counter
========================= */
function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function Counter({ to, suffix = "", start }: { to: number; suffix?: string; start: boolean }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 900;
    const t0 = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);

  return (
    <span className="tabular-nums">
      {v}
      {suffix}
    </span>
  );
}

/* =========================
   Types
========================= */
type FAQ = { q: string; a: string };

type TrustBadge = {
  title: string;
  desc: string;
  icon: "shield" | "clock" | "report" | "quality" | "tools" | "check";
};

/* =========================
   Icons
========================= */
function Icon({ name }: { name: TrustBadge["icon"] }) {
  const cls = "h-6 w-6";
  switch (name) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2l7 4v6c0 5-3.5 9.7-7 10-3.5-.3-7-5-7-10V6l7-4zm0 3.1L7 7.6V12c0 3.9 2.5 7.6 5 8 2.5-.4 5-4.1 5-8V7.6l-5-2.5zm-1 10.2l5.3-5.3 1.4 1.4-6.7 6.7-3.3-3.3 1.4-1.4 1.9 1.9z"
          />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm.5-13h-2v6l5.2 3.1 1-1.7-4.2-2.4z"
          />
        </svg>
      );
    case "report":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 2h10l4 4v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm9 1.5V7h3.5L16 3.5zM8 10h8v2H8v-2zm0 4h8v2H8v-2zm0 4h6v2H8v-2z"
          />
        </svg>
      );
    case "quality":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2l2.3 4.7L19.5 8l-3.8 3.7.9 5.3L12 14.9 7.4 17l.9-5.3L4.5 8l5.2-1.3L12 2zm0 4.4l-1.3 2.6-2.9.7 2.1 2-.5 2.9 2.6-1.4 2.6 1.4-.5-2.9 2.1-2-2.9-.7L12 6.4z"
          />
        </svg>
      );
    case "tools":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M14.7 6.3l3 3-7.9 7.9H6.8v-3l7.9-7.9zM16.1 4.9l1.4-1.4a1 1 0 011.4 0l1.6 1.6a1 1 0 010 1.4l-1.4 1.4-3-3z"
          />
        </svg>
      );
    case "check":
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5-9.5 9.5z"
          />
        </svg>
      );
  }
}

/* =========================
   Small UI
========================= */
function SectionTitle({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div>
      <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{kicker}</div>
      <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">{title}</h2>
      {desc ? <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{desc}</p> : null}
    </div>
  );
}

export default function MaintenanceClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  // (kept for future if you want to pull titles from your copy file)
  // const s = c.pages.services[lang].sections.maintenance;

  const heroImg = "/services/Maintenance.jpeg";

  const headline =
    lang === "fr" ? "Maintenance premium, rapide & contrôlée." : "Premium maintenance, fast & controlled.";

  const intro =
    lang === "fr"
      ? "MultiiMaint assure une maintenance premium — préventive et corrective — pour villas, bureaux, commerces, résidences et opérations multisites à l’île Maurice. Notre approche est sécurité-d’abord, avec une exécution propre, un contrôle qualité et un suivi clair."
      : "MultiiMaint delivers premium preventive & corrective maintenance for villas, offices, retail, residences and multi-site operations in Mauritius. Our approach is safety-first, with clean execution, quality checks and clear follow-up.";

  const value =
    lang === "fr"
      ? "Que ce soit une panne urgente, une réparation ciblée ou un plan de maintenance pour éviter les interruptions, nous priorisons la fiabilité, la transparence et la continuité d’exploitation. Vous recevez une intervention structurée et des recommandations professionnelles."
      : "Whether it’s an urgent breakdown, a targeted repair or a maintenance plan to prevent downtime, we prioritize reliability, transparency and operational continuity. You receive a structured intervention and professional recommendations.";

  const trustBadges: TrustBadge[] =
    lang === "fr"
      ? [
          { icon: "clock", title: "Réponse rapide", desc: "Visites planifiées & urgences selon disponibilité." },
          { icon: "shield", title: "Sécurité d’abord", desc: "Bonnes pratiques terrain & exécution contrôlée." },
          { icon: "quality", title: "Contrôle qualité", desc: "Vérifications finales pour un résultat durable." },
          { icon: "report", title: "Reporting clair", desc: "Compte rendu simple + recommandations." },
        ]
      : [
          { icon: "clock", title: "Fast response", desc: "Scheduled visits & urgent call-outs based on availability." },
          { icon: "shield", title: "Safety-first", desc: "On-site best practices & controlled execution." },
          { icon: "quality", title: "Quality checks", desc: "Final verification for durable results." },
          { icon: "report", title: "Clear reporting", desc: "Simple report + recommendations." },
        ];

  const coverage =
    lang === "fr"
      ? [
          "Petites réparations & dépannage",
          "Maintenance préventive planifiée",
          "Remise en état (finition propre)",
          "Suivi technique & coordination",
          "Recommandations & plan d’actions",
        ]
      : [
          "Small repairs & troubleshooting",
          "Scheduled preventive maintenance",
          "Clean fixes & reinstatement",
          "Technical follow-up & coordination",
          "Recommendations & action plan",
        ];

  const sectors =
    lang === "fr"
      ? ["Maisons & villas", "Bureaux", "Commerces", "Résidences / syndics", "Opérations multisites"]
      : ["Homes & villas", "Offices", "Retail", "Residences / syndic", "Multi-site operations"];

  const deliverables =
    lang === "fr"
      ? [
          { t: "Devis structuré", d: "Périmètre, délais, options et transparence des coûts." },
          { t: "Exécution propre", d: "Intervention planifiée, sécurité et finitions nettes." },
          { t: "Contrôles", d: "Vérifications sur site pour fiabiliser le résultat." },
          { t: "Suivi", d: "Retour client + recommandations pour éviter les retours." },
        ]
      : [
          { t: "Structured quote", d: "Scope, timelines, options and transparent costs." },
          { t: "Clean execution", d: "Planned intervention, safety and clean finishing." },
          { t: "Checks", d: "On-site verification to ensure durable results." },
          { t: "Follow-up", d: "Client feedback + recommendations to prevent recurrence." },
        ];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          {
            q: "Quels types de maintenance proposez-vous ?",
            a: "Préventive et corrective : petites réparations, suivi technique, visites planifiées et urgences selon disponibilité.",
          },
          {
            q: "Travaillez-vous avec des entreprises et des résidences ?",
            a: "Oui. Villas, bureaux, commerces, résidences et opérations multisites.",
          },
          {
            q: "Fournissez-vous un rapport après intervention ?",
            a: "Oui. Nous pouvons fournir un compte rendu simple (travaux effectués, recommandations, prochaines actions).",
          },
          {
            q: "Comment obtenir un devis rapidement ?",
            a: "Rendez-vous à la page Contact et décrivez votre besoin. Nous répondons rapidement avec une proposition claire.",
          },
        ]
      : [
          {
            q: "What maintenance services do you provide?",
            a: "Preventive and corrective maintenance: small repairs, technical follow-ups, scheduled visits and urgent call-outs based on availability.",
          },
          {
            q: "Do you work with businesses and residences?",
            a: "Yes. Villas, offices, retail, residences and multi-site operations.",
          },
          {
            q: "Do you provide reporting after the job?",
            a: "Yes. We can provide a simple report (work done, recommendations, next actions).",
          },
          {
            q: "How do I get a quote quickly?",
            a: "Go to the Contact page and describe your need. We’ll respond quickly with a clear proposal.",
          },
        ];

  const jsonLd = useMemo(() => {
    const name = "MultiiMaint Ltd";
    const url = "https://www.multiimaint.com/services/maintenance";
    const img = "https://www.multiimaint.com/services/Maintenance.jpeg";
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "fr" ? "Maintenance à l’Île Maurice" : "Maintenance in Mauritius",
      serviceType: "Maintenance",
      provider: { "@type": "Organization", name, url: "https://www.multiimaint.com" },
      areaServed: { "@type": "Country", name: "Mauritius" },
      url,
      image: img,
      description:
        lang === "fr"
          ? "Maintenance préventive et corrective premium à Maurice : réponse rapide, sécurité, contrôle qualité et reporting."
          : "Premium preventive and corrective maintenance in Mauritius: fast response, safety-first execution, quality checks and clear reporting.",
    };
  }, [lang]);

  const seoHelper =
    lang === "fr"
      ? "Maintenance premium à Maurice : interventions planifiées, dépannage, contrôle qualité, sécurité d’abord et reporting clair — MultiiMaint Ltd."
      : "Premium maintenance in Mauritius: scheduled visits, troubleshooting, quality checks, safety-first execution and clear reporting — MultiiMaint Ltd.";

  // KPI band (animated once)
  const kpi = useInViewOnce<HTMLDivElement>();

  return (
    <PageWrap>
      {/* HERO (flush under header) */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_90px_rgba(2,6,23,.10)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={lang === "fr" ? "Maintenance MultiiMaint à l’île Maurice" : "MultiiMaint maintenance service in Mauritius"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            {/* luxury overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-5 md:p-10">
                <div className="max-w-[920px] text-white">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                    {lang === "fr" ? "MAINTENANCE • MAURITIUS • QUALITÉ" : "MAINTENANCE • MAURITIUS • QUALITY"}
                  </div>

                  <h1 className="mt-4 text-[32px] font-extrabold leading-[1.05] md:text-[52px]">{headline}</h1>

                  <p className="mt-4 max-w-[860px] text-[15px] leading-relaxed text-white/90 md:text-[16px]">{intro}</p>

                  <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />

                  {/* subtle trust chips (no buttons) */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-white/85">
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Process contrôlé" : "Controlled process"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Finitions propres" : "Clean finishing"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Suivi & recommandations" : "Follow-up & recommendations"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges row (premium cards) */}
          <div className="grid gap-3 p-4 md:grid-cols-4 md:gap-4 md:p-6">
            {trustBadges.map((b) => (
              <div
                key={b.title}
                className={cn(
                  "group flex gap-3 rounded-3xl border border-slate-200 bg-white p-4",
                  "shadow-[0_12px_40px_rgba(2,6,23,.05)]",
                  "hover:-translate-y-[1px] hover:shadow-[0_18px_60px_rgba(2,6,23,.08)] transition"
                )}
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-50 text-[#0B1B4A] ring-1 ring-slate-200 group-hover:bg-white transition">
                  <Icon name={b.icon} />
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-slate-900">{b.title}</div>
                  <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI / PROOF BAND (numbers + animated counters on view) */}
      <section className="mt-4" ref={kpi.ref}>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "PREUVES & KPI" : "PROOF & KPIs"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr" ? "Pensé pour la continuité d’exploitation" : "Designed for operational continuity"}
              </h2>
              <p className="mt-2 max-w-[900px] text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Nous structurons les interventions et réduisons les interruptions grâce à un process contrôlé, des vérifications et un suivi."
                  : "We structure interventions and reduce downtime through a controlled process, checks and follow-up."}
              </p>
            </div>

            {/* no top buttons requested — keep CTA subtle via contact anchor only */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-5 py-3 text-[13px] font-extrabold text-white hover:brightness-110 transition"
            >
              {lang === "fr" ? "Contacter l’équipe" : "Contact the team"}
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { k: lang === "fr" ? "Interventions / mois" : "Interventions / month", v: 120, s: "+" },
              { k: lang === "fr" ? "Sites suivis" : "Sites managed", v: 25, s: "+" },
              { k: lang === "fr" ? "Contrôles qualité" : "Quality checks", v: 100, s: "%" },
              { k: lang === "fr" ? "Délai de réponse" : "Response time", v: 24, s: "h" },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-slate-500">{x.k}</div>
                <div className="mt-2 text-[30px] font-extrabold text-slate-900">
                  <Counter to={x.v} suffix={x.s} start={kpi.inView} />
                </div>
                <div className="mt-1 text-[13px] font-semibold text-slate-600">
                  {lang === "fr" ? "Process + suivi + contrôle" : "Process + follow-up + checks"}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] text-slate-500">
            {lang === "fr" ? "KPI indicatifs — ajustés selon contrat et périmètre." : "Indicative KPIs — adjusted per contract and scope."}
          </p>
        </div>
      </section>

      {/* SERVICE LEVELS (Standard / Priority / Contract) */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "NIVEAUX DE SERVICE" : "SERVICE LEVELS"}
            title={lang === "fr" ? "Un niveau adapté à chaque site" : "A level that fits each site"}
            desc={
              lang === "fr"
                ? "De la maintenance ponctuelle aux contrats multisites : même méthode, plus de réactivité, plus de reporting, plus de pilotage."
                : "From one-off maintenance to multi-site contracts: same method, more responsiveness, more reporting, more control."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                tier: "Standard",
                tag: lang === "fr" ? "Ponctuel" : "One-off",
                bullets:
                  lang === "fr"
                    ? ["Diagnostic + intervention", "Devis clair", "Contrôle qualité"]
                    : ["Assessment + intervention", "Clear quote", "Quality checks"],
                accentRing: "ring-slate-200",
                buttonCls: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
              },
              {
                tier: "Priority",
                tag: lang === "fr" ? "Plus rapide" : "Faster",
                bullets:
                  lang === "fr"
                    ? ["Créneaux prioritaires", "Suivi renforcé", "Recommandations pro"]
                    : ["Priority slots", "Enhanced follow-up", "Pro recommendations"],
                accentRing: "ring-[#F47B20]/35",
                buttonCls: "bg-[#F47B20] text-[#0B1B4A] hover:brightness-110",
                featured: true,
              },
              {
                tier: "Contract",
                tag: lang === "fr" ? "Mensuel" : "Monthly",
                bullets:
                  lang === "fr"
                    ? ["Visites planifiées", "KPI + reporting", "Pilotage multisite"]
                    : ["Scheduled visits", "KPI + reporting", "Multi-site oversight"],
                accentRing: "ring-[#0B1B4A]/20",
                buttonCls: "bg-[#0B1B4A] text-white hover:brightness-110",
              },
            ].map((p) => (
              <div
                key={p.tier}
                className={cn(
                  "rounded-[26px] border border-slate-200 bg-white p-6",
                  "shadow-[0_12px_40px_rgba(2,6,23,.06)]",
                  "transition hover:-translate-y-[1px] hover:shadow-[0_18px_60px_rgba(2,6,23,.10)]"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-extrabold tracking-widest text-slate-500">{p.tag}</div>
                    <div className="mt-1 text-[20px] font-extrabold text-slate-900">{p.tier}</div>
                  </div>
                  {p.featured ? (
                    <span className="rounded-full bg-[#F47B20]/15 px-3 py-1 text-[11px] font-extrabold text-[#F47B20] ring-1 ring-[#F47B20]/30">
                      {lang === "fr" ? "Recommandé" : "Recommended"}
                    </span>
                  ) : null}
                </div>

                <div className={cn("mt-4 rounded-2xl p-4 ring-1 bg-slate-50", p.accentRing)}>
                  <ul className="space-y-2 text-[14px] text-slate-700">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F47B20]" />
                        <span className="font-semibold text-slate-900">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className={cn(
                    "mt-4 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-[13px] font-extrabold transition",
                    p.buttonCls
                  )}
                >
                  {lang === "fr" ? "Contacter" : "Contact"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE / RESPONSE STRIP (map/response time strip) */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "COUVERTURE & RÉPONSE" : "COVERAGE & RESPONSE"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr" ? "Maurice — planification & urgences" : "Mauritius — scheduling & urgent call-outs"}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Nous intervenons à travers l’île selon périmètre et disponibilité. Pour les sites multisites, nous proposons un planning et un suivi KPI."
                  : "We operate across the island depending on scope and availability. For multi-site operations, we provide planning and KPI follow-up."}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  lang === "fr" ? "Nord • Ouest • Centre • Est • Sud" : "North • West • Central • East • South",
                  lang === "fr" ? "Interventions planifiées + urgences" : "Scheduled visits + urgent call-outs",
                ].map((t) => (
                  <div key={t} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-900">
                    • {t}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(2,6,23,.06)]">
              <div className="text-[12px] font-extrabold tracking-widest text-slate-500">
                {lang === "fr" ? "SLA INDICATIF" : "INDICATIVE SLA"}
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between gap-3 text-[14px] text-slate-700">
                  <span className="font-semibold text-slate-900">{lang === "fr" ? "Réponse" : "Response"}</span>
                  <span className="font-extrabold text-[#0B1B4A]">≤ 24h</span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#0B1B4A] to-[#F47B20]" />
                </div>

                <div className="mt-3 text-[12px] text-slate-500">
                  {lang === "fr"
                    ? "Selon zone, disponibilité et type d’intervention."
                    : "Depends on area, availability and intervention type."}
                </div>

                <a
                  href="#contact"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[#F47B20] px-5 py-3 text-[13px] font-extrabold text-[#0B1B4A] hover:brightness-110 transition"
                >
                  {lang === "fr" ? "Contacter" : "Contact"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="scope" className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <SectionTitle
                kicker={lang === "fr" ? "APERÇU" : "OVERVIEW"}
                title={lang === "fr" ? "Un service structuré pour éviter les interruptions" : "A structured service to prevent downtime"}
                desc={value}
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {coverage.map((x) => (
                  <div key={x} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] font-semibold text-slate-900">
                    • {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6">
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{lang === "fr" ? "POUR QUI ?" : "WHO IT’S FOR"}</div>

              <div className="mt-3 space-y-2">
                {sectors.map((x) => (
                  <div key={x} className="flex items-start gap-2 text-[14px] text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F47B20]" />
                    <span className="font-semibold text-slate-900">{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-[13px] font-extrabold text-slate-900">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-[#0B1B4A]">
                    <Icon name="tools" />
                  </span>
                  {lang === "fr" ? "Besoin d’un plan mensuel ?" : "Need a monthly plan?"}
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {lang === "fr"
                    ? "Nous planifions les visites, suivons les priorités et réduisons les interruptions sur vos sites."
                    : "We schedule visits, track priorities and reduce interruptions across your sites."}
                </p>

                <a
                  href="#contact"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#0B1B4A] px-4 py-3 text-[13px] font-extrabold text-white hover:brightness-110 transition"
                >
                  {lang === "fr" ? "Parlons de votre site" : "Discuss your site"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "RÉSULTATS" : "DELIVERABLES"}
            title={lang === "fr" ? "Ce que vous obtenez, clairement" : "What you get, clearly"}
            desc={
              lang === "fr"
                ? "Un service orienté continuité : planning, exécution, contrôle et suivi — avec transparence du début à la fin."
                : "A continuity-first service: scheduling, execution, checks and follow-up — with transparency end-to-end."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {deliverables.map((p) => (
              <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white ring-1 ring-slate-200 text-[#F47B20]">
                    <Icon name="check" />
                  </span>
                  <div className="text-[13px] font-extrabold text-slate-900">{p.t}</div>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-4">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_90px_rgba(2,6,23,.08)]">
          <div className="bg-gradient-to-r from-[#0B1B4A] to-[#071A3A] p-6 md:p-8">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">FAQ</div>
            <h2 className="mt-2 text-[22px] font-extrabold text-white md:text-[28px]">
              {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
            </h2>
            <p className="mt-2 max-w-[820px] text-[14px] leading-relaxed text-white/85">
              {lang === "fr"
                ? "Des réponses rapides et claires pour planifier votre maintenance et garantir la continuité de vos opérations."
                : "Fast, clear answers to help you plan maintenance and keep operations running smoothly."}
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-4">
              {faqs.map((f) => (
                <details key={f.q} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white">
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

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A] hover:brightness-110 transition"
              >
                {lang === "fr" ? "Contacter" : "Contact"}
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50 transition"
              >
                {lang === "fr" ? "Retour aux services" : "Back to services"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO helper */}
      <p className="sr-only">{seoHelper}</p>

      {/* NOTE: keep your existing #contact section on the Contact page or below */}
    </PageWrap>
  );
}