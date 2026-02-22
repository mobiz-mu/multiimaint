// src/app/services/facilities-management/FacilitiesClient.tsx
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
   In-view once + Counter
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
  icon: "shield" | "clock" | "report" | "quality" | "tools" | "check" | "chart";
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
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 19h16v2H2V3h2v16zm4-2H6V9h2v8zm5 0h-2V5h2v12zm5 0h-2v-6h2v6z"
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
   UI helper
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

export default function FacilitiesClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.facility;

  const heroImg = "/services/Facilities Management.jpeg";

  const headline =
    lang === "fr"
      ? "Facilities Management premium — pilotage, coordination, KPI."
      : "Premium facilities management — control, coordination, KPIs.";

  const intro =
    lang === "fr"
      ? "MultiiMaint pilote vos sites comme un partenaire opérationnel : supervision, coordination d’interventions, planification, priorisation et reporting KPI. Un seul interlocuteur (SPOC), une visibilité claire et un niveau de service premium."
      : "MultiiMaint runs your sites like an operational partner: supervision, coordinated interventions, planning, prioritization and KPI reporting. One SPOC, clear visibility and premium delivery.";

  const value =
    lang === "fr"
      ? "Nous structurons l’exploitation : demandes centralisées, urgences triées, interventions planifiées, prestataires coordonnés, et reporting utile. Objectif : continuité, maîtrise des coûts et qualité perçue."
      : "We structure operations: centralized requests, triaged urgencies, scheduled interventions, coordinated vendors, and useful reporting. Goal: continuity, cost control and perceived quality.";

  const trustBadges: TrustBadge[] =
    lang === "fr"
      ? [
          { icon: "tools", title: "SPOC", desc: "Un interlocuteur unique pour centraliser et suivre." },
          { icon: "clock", title: "Priorisation", desc: "Urgences, planning et backlog gérés en continu." },
          { icon: "shield", title: "Corporate-grade", desc: "Process, conformité site, exécution contrôlée." },
          { icon: "report", title: "Reporting KPI", desc: "Visibilité claire + tendances + actions." },
        ]
      : [
          { icon: "tools", title: "SPOC", desc: "Single point of contact to centralize and track." },
          { icon: "clock", title: "Prioritization", desc: "Urgencies, scheduling and backlog handled continuously." },
          { icon: "shield", title: "Corporate-grade", desc: "Process, site compliance, controlled execution." },
          { icon: "report", title: "KPI reporting", desc: "Clear visibility + trends + actions." },
        ];

  const highlights =
    lang === "fr"
      ? [
          { k: "SPOC", v: "Un interlocuteur unique" },
          { k: "Coordination", v: "Interventions & prestataires" },
          { k: "KPI", v: "Indicateurs + reporting" },
          { k: "Multi-sites", v: "Gestion centralisée" },
        ]
      : [
          { k: "SPOC", v: "Single point of contact" },
          { k: "Coordination", v: "Interventions & vendors" },
          { k: "KPIs", v: "Metrics + reporting" },
          { k: "Multi-site", v: "Centralized management" },
        ];

  const operatingModel =
    lang === "fr"
      ? [
          { t: "Onboarding", d: "Inventaire, priorités, règles du site et planning." },
          { t: "Planification", d: "Fréquences, SLAs et calendrier d’interventions." },
          { t: "Coordination", d: "Gestion des tâches, urgences et prestataires." },
          { t: "Reporting", d: "KPI, incidents, actions et optimisation." },
        ]
      : [
          { t: "Onboarding", d: "Site inventory, priorities, rules and planning." },
          { t: "Scheduling", d: "Frequencies, SLAs and intervention calendar." },
          { t: "Coordination", d: "Task handling, urgencies and vendors." },
          { t: "Reporting", d: "KPIs, incidents, actions and optimization." },
        ];

  const kpiExamples =
    lang === "fr"
      ? ["Temps de réponse", "Taux de résolution", "Incidents récurrents", "Qualité perçue", "Priorités & backlog"]
      : ["Response time", "Resolution rate", "Recurring incidents", "Perceived quality", "Priorities & backlog"];

  const deliverables =
    lang === "fr"
      ? [
          { t: "Registre des demandes", d: "Demandes centralisées + statut + priorités." },
          { t: "Planning & SLAs", d: "Calendrier d’interventions + niveaux de service." },
          { t: "Coordination prestataires", d: "Suivi, validation, escalades si nécessaire." },
          { t: "KPI & recommandations", d: "Tendances, actions, optimisation continue." },
        ]
      : [
          { t: "Requests log", d: "Centralized requests + status + priorities." },
          { t: "Schedule & SLAs", d: "Intervention calendar + service levels." },
          { t: "Vendor coordination", d: "Tracking, validation, escalations if needed." },
          { t: "KPIs & recommendations", d: "Trends, actions, continuous optimization." },
        ];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          {
            q: "Qu’est-ce qu’un SPOC ?",
            a: "Un Single Point Of Contact : un interlocuteur unique pour centraliser les demandes, suivre les actions et coordonner les interventions.",
          },
          {
            q: "Gérez-vous plusieurs sites ?",
            a: "Oui. Nous pouvons piloter des opérations multi-sites avec une organisation centralisée et un reporting unifié.",
          },
          {
            q: "Fournissez-vous des KPI ?",
            a: "Oui. Selon votre besoin : temps de réponse, résolution, incidents, tendances et actions recommandées.",
          },
          {
            q: "Est-ce adapté aux entreprises ?",
            a: "Oui. Notre approche est corporate-grade : suivi, process, priorisation et reporting.",
          },
        ]
      : [
          {
            q: "What is a SPOC?",
            a: "A Single Point Of Contact: one person to centralize requests, track actions and coordinate interventions.",
          },
          {
            q: "Do you manage multiple sites?",
            a: "Yes. We can run multi-site operations with centralized organization and unified reporting.",
          },
          {
            q: "Do you provide KPIs?",
            a: "Yes. Depending on your needs: response time, resolution, incidents, trends and recommended actions.",
          },
          {
            q: "Is it suitable for corporate clients?",
            a: "Yes. Our delivery is corporate-grade: tracking, process, prioritization and reporting.",
          },
        ];

  const jsonLd = useMemo(() => {
    const name = "MultiiMaint Ltd";
    const url = "https://www.multiimaint.com/services/facilities-management";
    const img = "https://www.multiimaint.com/services/Facilities%20Management.jpeg";
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "fr" ? "Facilities Management à l’Île Maurice" : "Facilities management in Mauritius",
      serviceType: "Facilities Management",
      provider: { "@type": "Organization", name, url: "https://www.multiimaint.com" },
      areaServed: { "@type": "Country", name: "Mauritius" },
      url,
      image: img,
      description:
        lang === "fr"
          ? "Facilities management premium à Maurice : supervision, coordination, priorisation et reporting KPI avec SPOC — MultiiMaint Ltd."
          : "Premium facilities management in Mauritius: supervision, coordination, prioritization and KPI reporting with a SPOC — MultiiMaint Ltd.",
    };
  }, [lang]);

  const seoHelper =
    lang === "fr"
      ? "Facilities management premium à Maurice : SPOC, coordination, planification, SLAs et reporting KPI — MultiiMaint Ltd."
      : "Premium facilities management in Mauritius: SPOC, coordination, scheduling, SLAs and KPI reporting — MultiiMaint Ltd.";

  const { ref: kpiRef, inView: kpiInView } = useInViewOnce<HTMLDivElement>();

  const serviceBullets: string[] = Array.isArray(s?.bullets) ? (s.bullets as string[]) : [];

  return (
    <PageWrap>
      {/* HERO (flush under header) */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_90px_rgba(2,6,23,.10)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={
                lang === "fr"
                  ? "Facilities management MultiiMaint à Maurice : supervision, coordination et reporting KPI."
                  : "MultiiMaint facilities management in Mauritius: supervision, coordination and KPI reporting."
              }
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
                    {lang === "fr" ? "FACILITIES • MAURITIUS • KPI" : "FACILITIES • MAURITIUS • KPIs"}
                  </div>

                  <h1 className="mt-4 text-[32px] font-extrabold leading-[1.05] md:text-[52px]">{headline}</h1>

                  <p className="mt-4 max-w-[880px] text-[15px] leading-relaxed text-white/90 md:text-[16px]">{intro}</p>

                  <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />

                  {/* subtle chips */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-white/85">
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "SPOC" : "SPOC"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Multi-sites" : "Multi-site"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Reporting KPI" : "KPI reporting"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges row */}
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

          {/* Highlights */}
          <div className="grid gap-4 border-t border-slate-200 bg-white p-4 md:grid-cols-4 md:p-6">
            {highlights.map((h) => (
              <div key={h.k} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{h.k}</div>
                <div className="mt-1 text-[14px] font-semibold text-slate-900">{h.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPI / PROOF BAND */}
      <section className="mt-4" ref={kpiRef}>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "PREUVES & KPI" : "PROOF & KPIs"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr"
                  ? "Visibilité opérationnelle, décisions plus rapides"
                  : "Operational visibility, faster decisions"}
              </h2>
              <p className="mt-2 max-w-[920px] text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Nous transformons les demandes terrain en actions pilotées : priorités claires, exécution coordonnée, et reporting utile pour gérer la performance."
                  : "We turn on-site requests into controlled actions: clear priorities, coordinated execution, and useful reporting to manage performance."}
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-5 py-3 text-[13px] font-extrabold text-white hover:brightness-110 transition"
            >
              {lang === "fr" ? "Contacter l’équipe" : "Contact the team"}
            </a>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { k: lang === "fr" ? "Sites gérés" : "Sites managed", v: 25, s: "+" },
              { k: lang === "fr" ? "Taux de suivi" : "Tracking rate", v: 100, s: "%" },
              { k: lang === "fr" ? "SLAs" : "SLAs", v: 3, s: "+" },
              { k: lang === "fr" ? "Réactivité" : "Response", v: 24, s: "h" },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-slate-500">{x.k}</div>
                <div className="mt-2 text-[30px] font-extrabold text-slate-900">
                  <Counter to={x.v} suffix={x.s} start={kpiInView} />
                </div>
                <div className="mt-1 text-[13px] font-semibold text-slate-600">
                  {lang === "fr" ? "Pilotage + reporting" : "Control + reporting"}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] text-slate-500">
            {lang === "fr" ? "KPI indicatifs — adaptés selon contrat et périmètre." : "Indicative KPIs — adapted per contract and scope."}
          </p>
        </div>
      </section>

      {/* SERVICE LEVELS */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "NIVEAUX DE SERVICE" : "SERVICE LEVELS"}
            title={lang === "fr" ? "Standard / Priority / Contract" : "Standard / Priority / Contract"}
            desc={
              lang === "fr"
                ? "Un même modèle opératoire, avec un niveau de réactivité et de reporting ajusté à vos opérations."
                : "One operating model, with responsiveness and reporting adjusted to your operations."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                tier: "Standard",
                tag: lang === "fr" ? "SPOC + suivi" : "SPOC + tracking",
                bullets:
                  lang === "fr"
                    ? ["Centralisation des demandes", "Planning de base", "Reporting simple"]
                    : ["Request centralization", "Basic scheduling", "Simple reporting"],
                accentRing: "ring-slate-200",
                buttonCls: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
              },
              {
                tier: "Priority",
                tag: lang === "fr" ? "Plus rapide" : "Faster",
                bullets:
                  lang === "fr"
                    ? ["Priorisation renforcée", "SLAs prioritaires", "Reporting KPI"]
                    : ["Enhanced prioritization", "Priority SLAs", "KPI reporting"],
                accentRing: "ring-[#F47B20]/35",
                buttonCls: "bg-[#F47B20] text-[#0B1B4A] hover:brightness-110",
                featured: true,
              },
              {
                tier: "Contract",
                tag: lang === "fr" ? "Mensuel" : "Monthly",
                bullets:
                  lang === "fr"
                    ? ["Pilotage multisite", "KPI + optimisation", "Gouvernance & rituels"]
                    : ["Multi-site oversight", "KPIs + optimization", "Governance cadence"],
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

      {/* COVERAGE / RESPONSE STRIP */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "COUVERTURE & RÉPONSE" : "COVERAGE & RESPONSE"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr" ? "Maurice — opérations multi-sites" : "Mauritius — multi-site operations"}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Pilotage à l’échelle de l’île, selon le périmètre et la criticité. Pour les contrats, nous mettons en place des rituels, SLAs et KPI."
                  : "Island-wide operations depending on scope and criticality. For contracts, we set cadence, SLAs and KPIs."}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(lang === "fr" ? ["Nord • Ouest • Centre • Est • Sud", "SPOC • SLAs • KPI"] : ["North • West • Central • East • South", "SPOC • SLAs • KPIs"]).map(
                  (t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-900"
                    >
                      • {t}
                    </div>
                  )
                )}
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
                    ? "Selon zone, disponibilité, périmètre et criticité."
                    : "Depends on area, availability, scope and criticality."}
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
                title={lang === "fr" ? "Une exploitation structurée, visible, maîtrisée" : "Structured, visible, controlled operations"}
                desc={value}
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {kpiExamples.slice(0, 4).map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] font-semibold text-slate-900"
                  >
                    • {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6">
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">
                {lang === "fr" ? "CE QUI EST INCLUS" : "WHAT’S INCLUDED"}
              </div>

              <div className="mt-3 space-y-2">
                {(serviceBullets.length ? serviceBullets : kpiExamples).slice(0, 6).map((x) => (
                  <div key={x} className="flex items-start gap-2 text-[14px] text-slate-700">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#F47B20]" />
                    <span className="font-semibold text-slate-900">{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-[13px] font-extrabold text-slate-900">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 text-[#0B1B4A]">
                    <Icon name="chart" />
                  </span>
                  {lang === "fr" ? "Besoin d’un reporting mensuel ?" : "Need monthly reporting?"}
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {lang === "fr"
                    ? "Nous mettons en place des KPI utiles, un suivi des incidents et un plan d’actions."
                    : "We set useful KPIs, incident tracking and an action plan."}
                </p>

                <a
                  href="#contact"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#0B1B4A] px-4 py-3 text-[13px] font-extrabold text-white hover:brightness-110 transition"
                >
                  {lang === "fr" ? "Parlons de vos sites" : "Discuss your sites"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATING MODEL */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "MODE OPÉRATOIRE" : "OPERATING MODEL"}
            title={lang === "fr" ? "Un modèle clair, simple, corporate-grade" : "A clear, simple, corporate-grade model"}
            desc={
              lang === "fr"
                ? "Onboarding, planification, coordination et reporting : tout est structuré pour réduire les frictions et améliorer la performance."
                : "Onboarding, scheduling, coordination and reporting: structured to reduce friction and improve performance."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {operatingModel.map((p) => (
              <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{p.d}</p>
              </div>
            ))}
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
                ? "Une exploitation pilotée : visibilité, coordination et décisions plus rapides."
                : "Controlled operations: visibility, coordination and faster decisions."
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
            <p className="mt-2 max-w-[860px] text-[14px] leading-relaxed text-white/85">
              {lang === "fr"
                ? "Des réponses rapides pour cadrer le pilotage, les KPI et l’organisation multi-sites."
                : "Quick answers to clarify operations control, KPIs and multi-site organization."}
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

      {/* Optional: keep a subtle internal link for crawl depth */}
      <p className="sr-only">
        <Link href="/services">{lang === "fr" ? "Voir tous les services MultiiMaint" : "See all MultiiMaint services"}</Link>
      </p>
    </PageWrap>
  );
}