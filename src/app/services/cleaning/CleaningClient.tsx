// src/app/services/cleaning/CleaningClient.tsx
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

export default function CleaningClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.cleaning;

  const heroImg = "/services/Professional Cleaning.jpeg";

  const headline =
    lang === "fr" ? "Nettoyage premium, hygiène & contrôle qualité." : "Premium cleaning, hygiene & quality control.";

  const intro =
    lang === "fr"
      ? "MultiiMaint propose un nettoyage professionnel premium pour bureaux, commerces, résidences et sites à l’île Maurice. Hygiène, désinfection, finitions soignées et contrôle qualité — avec une exécution fiable et un suivi clair."
      : "MultiiMaint provides premium professional cleaning for offices, retail, residences and sites in Mauritius. Hygiene, disinfection, neat finishing and quality control — with reliable execution and clear follow-up.";

  const value =
    lang === "fr"
      ? "Que ce soit une intervention ponctuelle ou un contrat récurrent, nous structurons la prestation avec une méthode précise, des checklists, et une validation finale. Résultat : propreté visible, constance, et sérénité."
      : "Whether it’s a one-off intervention or a recurring contract, we structure the service with a clear method, checklists, and final validation. Result: visible cleanliness, consistency, and peace of mind.";

  const trustBadges: TrustBadge[] =
    lang === "fr"
      ? [
          { icon: "clock", title: "Planning flexible", desc: "Ponctuel, hebdo, mensuel — selon votre site." },
          { icon: "shield", title: "Hygiène & sécurité", desc: "Procédures adaptées aux zones sensibles." },
          { icon: "quality", title: "Contrôle qualité", desc: "Checklist + vérifications finales." },
          { icon: "report", title: "Suivi clair", desc: "Retour simple + ajustements si nécessaire." },
        ]
      : [
          { icon: "clock", title: "Flexible scheduling", desc: "One-off, weekly, monthly — depending on your site." },
          { icon: "shield", title: "Hygiene & safety", desc: "Protocols adapted to sensitive areas." },
          { icon: "quality", title: "Quality checks", desc: "Checklist + final verification." },
          { icon: "report", title: "Clear follow-up", desc: "Simple feedback + adjustments if needed." },
        ];

  const coverage =
    lang === "fr"
      ? ["Bureaux", "Commerces", "Résidences", "Sites & immeubles", "Espaces communs"]
      : ["Offices", "Retail", "Residences", "Sites & buildings", "Common areas"];

  const process =
    lang === "fr"
      ? [
          { t: "Évaluation", d: "Surface, zones sensibles, fréquence et contraintes." },
          { t: "Plan & produits", d: "Méthode adaptée, produits et équipements." },
          { t: "Exécution", d: "Équipe encadrée, propreté et discrétion." },
          { t: "Contrôle", d: "Checklist + validation + suivi." },
        ]
      : [
          { t: "Assessment", d: "Area, sensitive zones, frequency and constraints." },
          { t: "Plan & supplies", d: "Adapted method, products and equipment." },
          { t: "Execution", d: "Managed team, clean and discreet." },
          { t: "Quality check", d: "Checklist + validation + follow-up." },
        ];

  const deliverables =
    lang === "fr"
      ? [
          { t: "Plan de nettoyage", d: "Fréquence, zones, priorités, contraintes horaires." },
          { t: "Propreté visible", d: "Finitions soignées, rangement, zones critiques traitées." },
          { t: "Désinfection", d: "Protocoles ciblés sur zones sensibles (si requis)." },
          { t: "Contrôle & suivi", d: "Checklist + ajustements pour tenir le standard." },
        ]
      : [
          { t: "Cleaning plan", d: "Frequency, areas, priorities, time constraints." },
          { t: "Visible cleanliness", d: "Neat finishing, tidying, critical zones covered." },
          { t: "Disinfection", d: "Targeted protocols for sensitive areas (if required)." },
          { t: "Checks & follow-up", d: "Checklist + adjustments to maintain standards." },
        ];

  const serviceBullets: string[] = Array.isArray(s?.bullets) ? (s.bullets as string[]) : [];

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
            a: "Checklist, contrôle qualité et suivi client après intervention pour garantir la constance.",
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
            a: "We use a checklist, quality checks and client follow-up to keep standards consistent.",
          },
          {
            q: "Can you clean outside business hours?",
            a: "Yes, depending on scheduling and team availability.",
          },
        ];

  const jsonLd = useMemo(() => {
    const name = "MultiiMaint Ltd";
    const url = "https://multiimaint.mu/services/cleaning";
    const img = "https://multiimaint.mu/services/Professional%20Cleaning.jpeg";
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "fr" ? "Nettoyage professionnel à l’Île Maurice" : "Professional cleaning in Mauritius",
      serviceType: "Cleaning",
      provider: { "@type": "Organization", name, url: "https://multiimaint.mu" },
      areaServed: { "@type": "Country", name: "Mauritius" },
      url,
      image: img,
      description:
        lang === "fr"
          ? "Nettoyage professionnel premium à Maurice : hygiène, désinfection, finitions soignées, checklist et contrôle qualité, avec suivi clair."
          : "Premium professional cleaning in Mauritius: hygiene, disinfection, neat finishing, checklist and quality checks, with clear follow-up.",
    };
  }, [lang]);

  const seoHelper =
    lang === "fr"
      ? "Nettoyage professionnel premium à Maurice : hygiène, désinfection, finitions soignées, checklist, contrôle qualité et suivi — MultiiMaint Ltd."
      : "Premium professional cleaning in Mauritius: hygiene, disinfection, neat finishing, checklist, quality checks and follow-up — MultiiMaint Ltd.";

  const kpi = useInViewOnce<HTMLDivElement>();

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
                  ? "Nettoyage professionnel MultiiMaint à l’Île Maurice : hygiène, désinfection, contrôle qualité."
                  : "MultiiMaint professional cleaning in Mauritius: hygiene, disinfection, quality control."
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
                    {lang === "fr" ? "CLEANING • MAURITIUS • QUALITÉ" : "CLEANING • MAURITIUS • QUALITY"}
                  </div>

                  <h1 className="mt-4 text-[32px] font-extrabold leading-[1.05] md:text-[52px]">{headline}</h1>

                  <p className="mt-4 max-w-[860px] text-[15px] leading-relaxed text-white/90 md:text-[16px]">{intro}</p>

                  <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />

                  {/* subtle trust chips (no big hero buttons) */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-white/85">
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Finitions soignées" : "Neat finishing"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Checklist & contrôle" : "Checklist & checks"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Ponctuel ou contrat" : "One-off or contract"}
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
        </div>
      </section>

      {/* KPI / PROOF BAND */}
      <section className="mt-4" ref={kpi.ref}>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "PREUVES & KPI" : "PROOF & KPIs"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr" ? "Pensé pour des standards constants" : "Designed for consistent standards"}
              </h2>
              <p className="mt-2 max-w-[900px] text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Une méthode simple : planifier, exécuter proprement, vérifier, puis ajuster. Résultat : hygiène visible et constance sur la durée."
                  : "A simple method: plan, execute cleanly, verify, then adjust. Result: visible hygiene and consistency over time."}
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
              { k: lang === "fr" ? "Sites / semaine" : "Sites / week", v: 60, s: "+" },
              { k: lang === "fr" ? "Checklists" : "Checklists", v: 100, s: "%" },
              { k: lang === "fr" ? "Zones sensibles" : "Sensitive areas", v: 15, s: "+" },
              { k: lang === "fr" ? "Réactivité" : "Response", v: 24, s: "h" },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-slate-500">{x.k}</div>
                <div className="mt-2 text-[30px] font-extrabold text-slate-900">
                  <Counter to={x.v} suffix={x.s} start={kpi.inView} />
                </div>
                <div className="mt-1 text-[13px] font-semibold text-slate-600">
                  {lang === "fr" ? "Méthode + contrôle" : "Method + checks"}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] text-slate-500">
            {lang === "fr" ? "KPI indicatifs — ajustés selon site et contrat." : "Indicative KPIs — adjusted per site and contract."}
          </p>
        </div>
      </section>

      {/* SERVICE LEVELS */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "NIVEAUX DE SERVICE" : "SERVICE LEVELS"}
            title={lang === "fr" ? "Du ponctuel au contrat récurrent" : "From one-off to recurring contracts"}
            desc={
              lang === "fr"
                ? "Même standard premium, avec davantage de régularité, de contrôles et de suivi selon votre organisation."
                : "Same premium standard, with more regularity, controls and follow-up depending on your operations."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                tier: "Standard",
                tag: lang === "fr" ? "Ponctuel" : "One-off",
                bullets:
                  lang === "fr"
                    ? ["Intervention ciblée", "Produits adaptés", "Contrôle qualité"]
                    : ["Targeted service", "Adapted supplies", "Quality checks"],
                accentRing: "ring-slate-200",
                buttonCls: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
              },
              {
                tier: "Priority",
                tag: lang === "fr" ? "Plus rapide" : "Faster",
                bullets:
                  lang === "fr"
                    ? ["Créneaux prioritaires", "Zones sensibles incluses", "Suivi renforcé"]
                    : ["Priority slots", "Sensitive areas included", "Enhanced follow-up"],
                accentRing: "ring-[#F47B20]/35",
                buttonCls: "bg-[#F47B20] text-[#0B1B4A] hover:brightness-110",
                featured: true,
              },
              {
                tier: "Contract",
                tag: lang === "fr" ? "Récurrent" : "Recurring",
                bullets:
                  lang === "fr"
                    ? ["Planning hebdo/mensuel", "Checklist & KPI", "Standard constant"]
                    : ["Weekly/monthly schedule", "Checklist & KPIs", "Consistent standard"],
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
                {lang === "fr" ? "COUVERTURE & PLANIFICATION" : "COVERAGE & SCHEDULING"}
              </div>
              <h2 className="mt-2 text-[22px] font-extrabold text-slate-900 md:text-[28px]">
                {lang === "fr" ? "Maurice — propreté régulière & fiable" : "Mauritius — reliable recurring cleanliness"}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Nous intervenons à travers l’île selon le périmètre et la fréquence. Pour les contrats, nous stabilisons le standard avec checklists et contrôle."
                  : "We operate across the island based on scope and frequency. For contracts, we stabilize standards with checklists and checks."}
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {(lang === "fr" ? ["Nord • Ouest • Centre • Est • Sud", "Ponctuel • Hebdo • Mensuel"] : ["North • West • Central • East • South", "One-off • Weekly • Monthly"]).map(
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
                    ? "Selon zone, disponibilité et type de prestation."
                    : "Depends on area, availability and service type."}
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
                title={lang === "fr" ? "Un service structuré pour un résultat constant" : "A structured service for consistent results"}
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
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{lang === "fr" ? "INCLUS" : "INCLUDED"}</div>

              <div className="mt-3 space-y-2">
                {(serviceBullets.length ? serviceBullets : coverage).slice(0, 6).map((x) => (
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
                  {lang === "fr" ? "Besoin d’un contrat ?" : "Need a contract?"}
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {lang === "fr"
                    ? "Nous stabilisons le standard avec un planning, des checklists et un suivi."
                    : "We stabilize standards with scheduling, checklists and follow-up."}
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

      {/* PROCESS */}
      <section className="mt-4">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "NOTRE MÉTHODE" : "OUR PROCESS"}
            title={lang === "fr" ? "Simple, propre et contrôlé" : "Simple, clean and controlled"}
            desc={lang === "fr" ? "Une exécution premium, validée sur place, avec suivi." : "Premium execution, validated on-site, with follow-up."}
          />

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {process.map((p) => (
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
                ? "Une prestation orientée standard : plan, exécution, contrôles et suivi."
                : "A standards-first service: plan, execution, checks and follow-up."
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
                ? "Des réponses rapides pour planifier vos prestations et garantir un standard constant."
                : "Quick answers to plan services and keep standards consistent."}
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

