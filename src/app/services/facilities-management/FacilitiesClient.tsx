// src/app/services/facilities-management/FacilitiesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

type FAQ = { q: string; a: string };

export default function FacilitiesClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.facility;

  const heroImg = "/services/Facilities Management.jpeg";

  const longDesc =
    lang === "fr"
      ? "MultiiMaint pilote vos sites comme un partenaire opérationnel : supervision, coordination d’interventions, planification, priorisation et reporting KPI. Un seul interlocuteur (SPOC), une visibilité claire et un niveau de service premium."
      : "MultiiMaint runs your sites like an operational partner: supervision, coordinated interventions, planning, prioritization and KPI reporting. One SPOC, clear visibility and premium delivery.";

  const highlights =
    lang === "fr"
      ? [
          { k: "SPOC", v: "Un interlocuteur unique" },
          { k: "Coordination", v: "Interventions & prestataires" },
          { k: "KPI", v: "Indicateurs + reporting clair" },
          { k: "Multi-sites", v: "Gestion centralisée" },
        ]
      : [
          { k: "SPOC", v: "Single point of contact" },
          { k: "Coordination", v: "Interventions & vendors" },
          { k: "KPIs", v: "Metrics + clear reporting" },
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

  return (
    <PageWrap>
      {/* ✅ Clean sticky back bar (no CTA, no blank space) */}
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

      {/* Keep your standard hero for consistency */}
      <PageHero
        kicker={lang === "fr" ? "Supervision • KPI • Reporting" : "Supervision • KPIs • Reporting"}
        title={s.title}
        desc={s.desc}
      >
        <CTAButtons />
      </PageHero>

      {/* ✅ Premium 16:9 Image Hero Block */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={
                lang === "fr"
                  ? "Facilities management MultiiMaint à Maurice : coordination, supervision et reporting."
                  : "MultiiMaint facilities management in Mauritius: coordination, supervision and reporting."
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="max-w-[760px] text-white">
                <div className="text-[11px] font-extrabold tracking-widest text-white/90">
                  {lang === "fr"
                    ? "MAURITIUS • MULTI-SITES • REPORTING KPI"
                    : "MAURITIUS • MULTI-SITE • KPI REPORTING"}
                </div>
                <div className="mt-2 text-[22px] font-extrabold leading-tight md:text-[28px]">
                  {lang === "fr"
                    ? "Facilities Management premium — contrôle, coordination, visibilité."
                    : "Premium facilities management — control, coordination, visibility."}
                </div>
                <p className="mt-2 text-[13px] text-white/90 md:text-[14px]">{longDesc}</p>
              </div>
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

      {/* Included + KPI */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
          {lang === "fr" ? "DÉTAILS DU SERVICE" : "SERVICE DETAILS"}
        </div>
        <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
          {lang === "fr" ? "Ce qui est inclus" : "What’s included"}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">{lang === "fr" ? "Inclus" : "Included"}</div>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">{lang === "fr" ? "Exemples de KPI" : "KPI examples"}</div>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {kpiExamples.map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
          >
            {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
          </a>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            {lang === "fr" ? "Retour aux services" : "Back to services"}
          </Link>
        </div>
      </section>

      {/* Operating Model */}
      <section className="mt-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {lang === "fr" ? "MODE OPÉRATOIRE" : "OPERATING MODEL"}
          </div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr"
              ? "Un pilotage clair, centralisé, corporate"
              : "Clear, centralized, corporate-grade operations"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {operatingModel.map((p) => (
              <div key={p.t} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">{p.t}</div>
                <p className="mt-2 text-[14px] text-slate-700">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">FAQ</div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>

          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white">
                <summary className="cursor-pointer list-none text-[14px] font-extrabold text-slate-900">
                  <span className="mr-2 text-[#F47B20]">+</span>
                  {f.q}
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
            >
              {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              {lang === "fr" ? "Retour aux services" : "Back to services"}
            </Link>
          </div>
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint facilities management in Mauritius: site supervision, coordinated interventions, KPIs and reporting with a single point of contact.
      </span>
    </PageWrap>
  );
}