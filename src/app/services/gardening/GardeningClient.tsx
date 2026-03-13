// src/app/services/gardening/GardeningClient.tsx
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
  icon: "shield" | "clock" | "report" | "quality" | "tools" | "check" | "leaf";
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
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className={cls} aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.9 3.1C14.2 3.3 8.6 6.4 6 11.2c-2 3.7-1.8 8.1-.3 9.7 1.6 1.6 6 .8 9.7-1.2 4.8-2.6 7.9-8.2 7.8-14.9 0-.9-.8-1.7-1.7-1.7h-.6zM8.4 18.1c-.2-.8-.2-1.8.1-2.8 1-3.6 4.2-6.6 8.7-8.2-2.3 1.9-4.1 4.3-5 7.1-.6 1.9-.7 3.7-.4 5.1-1.7.4-3 .2-3.4-.2z"
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

export default function GardeningClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.gardening;

  const heroImg = "/services/Gardening.jpeg";

  const headline =
    lang === "fr" ? "Jardinage premium — net, structuré, durable." : "Premium gardening — neat, structured, lasting.";

  const intro =
    lang === "fr"
      ? "MultiiMaint entretient vos espaces verts avec une approche premium : planification, taille, nettoyage des abords et contrôle qualité pour un rendu net et durable."
      : "MultiiMaint maintains your green spaces with a premium approach: scheduled upkeep, trimming, exterior cleaning and quality control for a neat, lasting finish.";

  const value =
    lang === "fr"
      ? "De l’entretien ponctuel aux contrats mensuels : nous cadrons la fréquence, la propreté des abords et la qualité de finition, avec une exécution discrète et régulière."
      : "From one-off visits to monthly contracts: we define the right frequency, keep surrounding areas clean, and ensure finishing quality with discreet, consistent execution.";

  const trustBadges: TrustBadge[] =
    lang === "fr"
      ? [
          { icon: "leaf", title: "Rendu premium", desc: "Finition nette, esthétique, régulière." },
          { icon: "clock", title: "Planning", desc: "Ponctuel, hebdo ou mensuel selon vos besoins." },
          { icon: "quality", title: "Contrôle qualité", desc: "Vérification finale du rendu." },
          { icon: "shield", title: "Approche propre", desc: "Interventions soignées & abords propres." },
        ]
      : [
          { icon: "leaf", title: "Premium finish", desc: "Neat, aesthetic, consistent results." },
          { icon: "clock", title: "Scheduling", desc: "One-off, weekly or monthly to fit your needs." },
          { icon: "quality", title: "Quality checks", desc: "Final result verification." },
          { icon: "shield", title: "Clean approach", desc: "Careful execution & clean surroundings." },
        ];

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
          { q: "Proposez-vous un entretien régulier ?", a: "Oui, interventions ponctuelles ou contrats hebdomadaires/mensuels selon vos besoins." },
          { q: "Entretenez-vous les grands espaces ?", a: "Oui, selon la configuration du site et une planification adaptée." },
          { q: "Faites-vous uniquement la taille ?", a: "Non. Taille, nettoyage des abords, entretien global et amélioration esthétique." },
          { q: "Comment obtenir un devis ?", a: "Contactez-nous via la section contact pour une proposition claire." },
        ]
      : [
          { q: "Do you offer regular maintenance?", a: "Yes, we provide one-off visits or weekly/monthly contracts." },
          { q: "Do you maintain large areas?", a: "Yes, depending on site configuration and planning." },
          { q: "Is it only trimming?", a: "No. We cover trimming, surrounding cleaning, full upkeep and aesthetic improvements." },
          { q: "How do I get a quote?", a: "Contact us via the contact section for a clear proposal." },
        ];

  const jsonLd = useMemo(() => {
    const name = "MultiiMaint Ltd";
    const url = "https://multiimaint.mu/services/gardening";
    const img = "https://multiimaint.mu/services/Gardening.jpeg";
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: lang === "fr" ? "Jardinage à l’Île Maurice" : "Gardening in Mauritius",
      serviceType: "Gardening",
      provider: { "@type": "Organization", name, url: "https://multiimaint.mu" },
      areaServed: { "@type": "Country", name: "Mauritius" },
      url,
      image: img,
      description:
        lang === "fr"
          ? "Jardinage premium à Maurice : entretien planifié, taille, nettoyage des abords et contrôle qualité — MultiiMaint Ltd."
          : "Premium gardening in Mauritius: scheduled upkeep, trimming, exterior cleaning and quality checks — MultiiMaint Ltd.",
    };
  }, [lang]);

  const seoHelper =
    lang === "fr"
      ? "Service de jardinage premium à Maurice : entretien régulier, taille, propreté des abords et rendu durable — MultiiMaint Ltd."
      : "Premium gardening service in Mauritius: regular upkeep, trimming, clean surroundings and durable finish — MultiiMaint Ltd.";

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
              alt={lang === "fr" ? "Jardinage MultiiMaint à l’Île Maurice" : "MultiiMaint gardening in Mauritius"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />

            {/* luxury overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-end">
              <div className="w-full p-5 md:p-10">
                <div className="max-w-[920px] text-white">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                    {lang === "fr" ? "GARDENING • MAURITIUS • FINITION" : "GARDENING • MAURITIUS • FINISH"}
                  </div>

                  <h1 className="mt-4 text-[32px] font-extrabold leading-[1.05] md:text-[52px]">{headline}</h1>

                  <p className="mt-4 max-w-[880px] text-[15px] leading-relaxed text-white/90 md:text-[16px]">{intro}</p>

                  <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />

                  <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-white/85">
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Taille & entretien" : "Trim & upkeep"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Nettoyage abords" : "Clean surroundings"}
                    </span>
                    <span className="rounded-full bg-black/25 px-3 py-2 ring-1 ring-white/15 backdrop-blur">
                      {lang === "fr" ? "Contrôle qualité" : "Quality check"}
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

      {/* KPI / PROOF BAND (animated counters) */}
      <section className="mt-4" ref={kpiRef}>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <SectionTitle
            kicker={lang === "fr" ? "PREUVES & KPI" : "PROOF & KPIs"}
            title={lang === "fr" ? "Un rendu régulier, contrôlé" : "Consistent, controlled finish"}
            desc={
              lang === "fr"
                ? "Nous planifions la fréquence et vérifions le rendu final pour garder vos espaces verts propres, nets et présentables."
                : "We plan the right frequency and verify the final result to keep your green spaces neat, clean and presentable."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { k: lang === "fr" ? "Visites / mois" : "Visits / month", v: 60, s: "+" },
              { k: lang === "fr" ? "Contrats" : "Contracts", v: 20, s: "+" },
              { k: lang === "fr" ? "Contrôle rendu" : "Finish checks", v: 100, s: "%" },
              { k: lang === "fr" ? "Planning" : "Scheduling", v: 7, s: "/7" },
            ].map((x) => (
              <div key={x.k} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-slate-500">{x.k}</div>
                <div className="mt-2 text-[30px] font-extrabold text-slate-900">
                  <Counter to={x.v} suffix={x.s} start={kpiInView} />
                </div>
                <div className="mt-1 text-[13px] font-semibold text-slate-600">
                  {lang === "fr" ? "Plan + exécution + contrôle" : "Plan + execution + checks"}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[12px] text-slate-500">
            {lang === "fr" ? "KPI indicatifs — adaptés selon site et saison." : "Indicative KPIs — adapted by site and season."}
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
                ? "Même qualité de rendu, avec une fréquence et une priorisation adaptées à vos espaces."
                : "Same finish quality, with frequency and prioritization adapted to your green spaces."
            }
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                tier: "Standard",
                tag: lang === "fr" ? "Ponctuel" : "One-off",
                bullets:
                  lang === "fr"
                    ? ["Taille + nettoyage abords", "Rendu net", "Contrôle final"]
                    : ["Trim + surroundings cleaning", "Neat finish", "Final check"],
                accentRing: "ring-slate-200",
                buttonCls: "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50",
              },
              {
                tier: "Priority",
                tag: lang === "fr" ? "Plus rapide" : "Faster",
                bullets:
                  lang === "fr"
                    ? ["Créneaux prioritaires", "Suivi renforcé", "Rendu premium"]
                    : ["Priority slots", "Enhanced follow-up", "Premium finish"],
                accentRing: "ring-[#F47B20]/35",
                buttonCls: "bg-[#F47B20] text-[#0B1B4A] hover:brightness-110",
                featured: true,
              },
              {
                tier: "Contract",
                tag: lang === "fr" ? "Mensuel" : "Monthly",
                bullets:
                  lang === "fr"
                    ? ["Visites planifiées", "Fréquence optimisée", "Suivi régulier"]
                    : ["Scheduled visits", "Optimized frequency", "Regular follow-up"],
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
                {lang === "fr" ? "Maurice — entretien planifié" : "Mauritius — scheduled upkeep"}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Nous intervenons sur toute l’île selon le périmètre et la fréquence. Les contrats permettent un planning stable et un rendu constant."
                  : "We operate across the island depending on scope and frequency. Contracts enable stable scheduling and consistent results."}
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
                    ? "Selon zone, météo, disponibilité et type d’intervention."
                    : "Depends on area, weather, availability and intervention type."}
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
                title={lang === "fr" ? "Un service structuré pour un rendu durable" : "A structured service for lasting results"}
                desc={value}
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(serviceBullets.length ? serviceBullets : coverage).slice(0, 6).map((x) => (
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
                {lang === "fr" ? "ZONES COUVERTES" : "COVERAGE"}
              </div>

              <div className="mt-3 space-y-2">
                {coverage.map((x) => (
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
                  {lang === "fr" ? "Besoin d’un planning mensuel ?" : "Need a monthly schedule?"}
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {lang === "fr"
                    ? "Nous définissons la fréquence, la taille et le niveau de propreté attendu pour un rendu constant."
                    : "We define frequency, trimming scope and expected cleanliness for consistent results."}
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
            title={lang === "fr" ? "Simple, propre, et contrôlé" : "Simple, clean, and controlled"}
            desc={
              lang === "fr"
                ? "Une méthode courte et efficace : évaluer, planifier, intervenir, vérifier."
                : "A short and effective method: assess, schedule, execute, verify."
            }
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
                ? "Des réponses rapides pour cadrer la fréquence, le périmètre et le rendu attendu."
                : "Quick answers to clarify frequency, scope and expected finish."}
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

      {/* SR-only crawl depth link */}
      <p className="sr-only">
        <Link href="/services">{lang === "fr" ? "Voir tous les services MultiiMaint" : "See all MultiiMaint services"}</Link>
      </p>
    </PageWrap>
  );
}

