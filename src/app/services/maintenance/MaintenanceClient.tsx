// src/app/services/maintenance/MaintenanceClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

type FAQ = { q: string; a: string };

export default function MaintenanceClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const s = c.pages.services[lang].sections.maintenance;

  const heroImg = "/services/Maintenance.jpeg";

  const longDesc =
    lang === "fr"
      ? "MultiiMaint assure la maintenance préventive et corrective pour maisons, commerces et sites multisites à l’île Maurice. Nous intervenons rapidement, appliquons une méthode sécurité-d’abord, et fournissons un suivi clair avec contrôle qualité."
      : "MultiiMaint delivers preventive and corrective maintenance for homes, businesses and multi-site operations in Mauritius. We respond fast, follow a safety-first process, and provide clear follow-up with quality control.";

  const highlights =
    lang === "fr"
      ? [
          { k: "Réactivité", v: "Interventions rapides + planification" },
          { k: "Sécurité", v: "Process & bonnes pratiques terrain" },
          { k: "Qualité", v: "Contrôle + rapport simple" },
          { k: "Clarté", v: "Devis transparent & suivi" },
        ]
      : [
          { k: "Fast Response", v: "Rapid visits + scheduling" },
          { k: "Safety-First", v: "Process & on-site best practices" },
          { k: "Quality", v: "Checks + simple reporting" },
          { k: "Clarity", v: "Transparent quote & follow-up" },
        ];

  const process =
    lang === "fr"
      ? [
          { t: "Diagnostic", d: "Nous identifions la cause et le niveau d’urgence." },
          { t: "Devis clair", d: "Prix transparent, délai, matériel et options." },
          { t: "Intervention", d: "Exécution propre, sécurisée, et contrôlée." },
          { t: "Contrôle & rapport", d: "Vérification finale + retour client." },
        ]
      : [
          { t: "Assessment", d: "We identify the root cause and urgency." },
          { t: "Clear quote", d: "Transparent pricing, timeline, materials and options." },
          { t: "Intervention", d: "Clean, safe execution with checks." },
          { t: "Quality & report", d: "Final verification + client feedback." },
        ];

  const faqs: FAQ[] =
    lang === "fr"
      ? [
          {
            q: "Quels types de maintenance proposez-vous ?",
            a: "Préventive et corrective : petites réparations, suivi technique, interventions planifiées et urgences selon disponibilité.",
          },
          {
            q: "Intervenez-vous pour les entreprises et les résidences ?",
            a: "Oui. Nous travaillons avec maisons, bureaux, commerces, sites résidentiels et opérations multisites.",
          },
          {
            q: "Fournissez-vous un rapport après intervention ?",
            a: "Oui. Nous pouvons fournir un rapport simple (travaux effectués, recommandations, prochaines actions).",
          },
          {
            q: "Comment obtenir un devis ?",
            a: "Cliquez sur “Demander un Devis” ou contactez-nous. Nous répondrons rapidement avec une proposition claire.",
          },
        ]
      : [
          {
            q: "What maintenance services do you provide?",
            a: "Preventive and corrective maintenance: small repairs, technical follow-ups, scheduled visits and urgent call-outs depending on availability.",
          },
          {
            q: "Do you work with businesses and residences?",
            a: "Yes. Homes, offices, retail, residential sites and multi-site operations.",
          },
          {
            q: "Do you provide reporting after the job?",
            a: "Yes. We can provide a simple report (work done, recommendations, next actions).",
          },
          {
            q: "How do I get a quote?",
            a: "Click “Request a Quote” or contact us. We’ll respond quickly with a clear proposal.",
          },
        ];

  return (
    <PageWrap>
      {/* ✅ Sticky back bar (premium) */}
      {/* ✅ Clean sticky back bar (no gaps, no CTA) */}
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

      {/* Existing hero (kept for consistency) */}
      <PageHero
        kicker={lang === "fr" ? "Maintenance • Réponse Rapide • Sécurité" : "Maintenance • Fast Response • Safety"}
        title={s.title}
        desc={s.desc}
      >
        <CTAButtons />
      </PageHero>

      {/* ✅ Premium image hero block (16:9) */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={heroImg}
              alt={lang === "fr" ? "Service de maintenance MultiiMaint à l’île Maurice" : "MultiiMaint maintenance service in Mauritius"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <div className="max-w-[760px] text-white">
                <div className="text-[11px] font-extrabold tracking-widest text-white/90">
                  {lang === "fr" ? "MAURITIUS • CONTRÔLE QUALITÉ • SÉCURITÉ" : "MAURITIUS • QUALITY CONTROL • SAFETY"}
                </div>
                <div className="mt-2 text-[22px] font-extrabold leading-tight md:text-[28px]">
                  {lang === "fr" ? "Maintenance premium — rapide, sûre, et bien suivie." : "Premium maintenance — fast, safe, and well managed."}
                </div>
                <p className="mt-2 text-[13px] text-white/90 md:text-[14px]">{longDesc}</p>

                <div id="quote" className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
                  >
                    {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-[13px] font-extrabold text-white ring-1 ring-white/20 hover:bg-white/15"
                  >
                    {lang === "fr" ? "Voir tous les services" : "View all services"}
                  </Link>
                </div>
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

      {/* Included */}
      <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 text-slate-700 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "CE QUE NOUS FAISONS" : "WHAT WE DO"}
            </div>
            <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
              {lang === "fr" ? "Maintenance préventive & corrective" : "Preventive & corrective maintenance"}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed">{longDesc}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">{lang === "fr" ? "Inclus" : "Included"}</div>
            <ul className="mt-3 space-y-2 text-[14px]">
              {s.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 p-6">
            <div className="text-[14px] font-extrabold text-slate-900">
              {lang === "fr" ? "Pour qui ?" : "Who is it for?"}
            </div>
            <ul className="mt-3 space-y-2 text-[14px]">
              {(lang === "fr"
                ? [
                    "Maisons & résidences",
                    "Bureaux & commerces",
                    "Sites résidentiels / syndics",
                    "Opérations multisites",
                  ]
                : ["Homes & residences", "Offices & retail", "Residential sites / syndic", "Multi-site operations"]
              ).map((x) => (
                <li key={x}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mt-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {lang === "fr" ? "NOTRE MÉTHODE" : "OUR PROCESS"}
          </div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr" ? "Un process simple, propre, et contrôlé" : "A simple, clean, controlled process"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {process.map((p) => (
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
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {lang === "fr" ? "FAQ" : "FAQ"}
          </div>
          <h2 className="mt-2 text-[20px] font-extrabold text-slate-900 md:text-[22px]">
            {lang === "fr" ? "Questions fréquentes" : "Frequently asked questions"}
          </h2>

          <div className="mt-6 grid gap-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 open:bg-white"
              >
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
              href="#contact"
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

      {/* SEO helper */}
      <span className="sr-only">
        MultiiMaint maintenance services in Mauritius: preventive and corrective maintenance, safety-first process, quality control and reporting.
      </span>
    </PageWrap>
  );
}