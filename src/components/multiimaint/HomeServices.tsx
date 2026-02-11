"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type ServiceCard = {
  title: string;
  points: string[]; // exactly 5
  href: string;
  img: string;
};

function cn(...x: any[]) {
  return x.filter(Boolean).join(" ");
}

export default function HomeServices() {
  const { lang } = useLang();
  const c = copy(lang);

  const services = useMemo<ServiceCard[]>(
    () => [
      {
        title: lang === "fr" ? "Maintenance" : "Maintenance",
        img: "/service-maintenance.jpg",
        href: "/services/maintenance",
        points:
          lang === "fr"
            ? [
                "Intervention rapide & fiable",
                "Préventif & correctif",
                "Équipe qualifiée & assurée",
                "Suivi et compte-rendu",
                "Disponible pour entreprises",
              ]
            : [
                "Fast, reliable response",
                "Preventive & corrective",
                "Qualified, insured team",
                "Follow-up & reporting",
                "For homes & businesses",
              ],
      },
      {
        title: lang === "fr" ? "Nettoyage Pro" : "Professional Cleaning",
        img: "/service-cleaning.jpg",
        href: "/services/cleaning",
        points:
          lang === "fr"
            ? [
                "Bureaux, commerces, résidences",
                "Produits & méthodes pro",
                "Désinfection & hygiène",
                "Planning flexible",
                "Contrôle qualité",
              ]
            : [
                "Offices, retail, residences",
                "Pro products & methods",
                "Disinfection & hygiene",
                "Flexible scheduling",
                "Quality checks",
              ],
      },
      {
        title: lang === "fr" ? "Facility Management" : "Facility Management",
        img: "/service-facility.jpg",
        href: "/services/facility",
        points:
          lang === "fr"
            ? [
                "Multi-sites & contrats",
                "KPI & reporting",
                "Gestion fournisseurs",
                "Optimisation des coûts",
                "Un seul point de contact",
              ]
            : [
                "Multi-site & contracts",
                "KPIs & reporting",
                "Vendor management",
                "Cost optimization",
                "Single point of contact",
              ],
      },
      {
        title: lang === "fr" ? "Jardin & Extérieur" : "Outdoor & Garden",
        img: "/service-outdoor.jpg",
        href: "/services/outdoor",
        points:
          lang === "fr"
            ? [
                "Entretien régulier",
                "Nettoyage haute pression",
                "Débroussaillage",
                "Allées & abords",
                "Intervention ponctuelle",
              ]
            : [
                "Routine maintenance",
                "Pressure washing",
                "Brush clearing",
                "Paths & surroundings",
                "One-off interventions",
              ],
      },
      {
        title: lang === "fr" ? "Travaux / Rénovation" : "Works / Renovation",
        img: "/service-renovation.jpg",
        href: "/services/renovation",
        points:
          lang === "fr"
            ? [
                "Peinture & finitions",
                "Petites réparations",
                "Pose & remplacement",
                "Coordination chantier",
                "Devis clair & rapide",
              ]
            : [
                "Painting & finishing",
                "Minor repairs",
                "Install & replace",
                "Work coordination",
                "Clear, fast quote",
              ],
      },
      {
        title: lang === "fr" ? "Contrats & Sous-traitance" : "Contracts & Subcontracting",
        img: "/service-contracts.jpg",
        href: "/services/contracts",
        points:
          lang === "fr"
            ? [
                "Équipes dédiées",
                "SLA & délais respectés",
                "Suivi performance",
                "Couverture multi-sites",
                "Support réactif",
              ]
            : [
                "Dedicated teams",
                "SLAs & on-time delivery",
                "Performance tracking",
                "Multi-site coverage",
                "Responsive support",
              ],
      },
    ],
    [lang]
  );

  return (
    <section id="services" className="relative py-14 md:py-16">
      {/* ===== Premium animated gradient between cards ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/22 blur-3xl animate-[mm_float_10s_ease-in-out_infinite]" />
        <div className="absolute -bottom-48 left-1/4 h-[560px] w-[560px] rounded-full bg-red-500/16 blur-3xl animate-[mm_float2_12s_ease-in-out_infinite]" />
        <div className="absolute -bottom-44 right-1/5 h-[520px] w-[520px] rounded-full bg-[#ff9a4a]/18 blur-3xl animate-[mm_float2_11s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {lang === "fr" ? "Nos Services" : "Our Services"}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {lang === "fr"
                ? "Des services premium de maintenance, nettoyage et facility management — avec suivi, qualité et rapidité."
                : "Premium maintenance, cleaning and facility management — with speed, quality and clear reporting."}
            </p>
          </div>
        </Reveal>

        {/* ===== 2 rows of 3, glass cards, scroll reveal ===== */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Reveal key={s.href} delay={0.03 + idx * 0.03}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-3xl",
                  // ✅ glass background but readable
                  "border border-white/35 bg-white/35 backdrop-blur-2xl",
                  "shadow-[0_18px_60px_rgba(2,6,23,.12)]",
                  "transition-all duration-300",
                  "hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.16)]",
                  "animate-[mm_cardBreath_6.5s_ease-in-out_infinite]"
                )}
                style={{ aspectRatio: "12 / 16" }}
              >
                {/* ✅ top line now dark navy */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#0B1B4A]/85" />

                {/* subtle moving highlight */}
                <div className="pointer-events-none absolute -inset-24 rotate-12 bg-gradient-to-r from-transparent via-[#F47B20]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex h-full flex-col p-6">
                  {/* ✅ bigger round image (double size feel) */}
                  <div className="mb-3 flex items-center justify-center">
                    <div className="rounded-full bg-gradient-to-br from-[#0B1B4A]/55 via-white/20 to-[#F47B20]/55 p-[3px] shadow-sm">
                      <div className="relative h-40 w-40 overflow-hidden rounded-full bg-white/55">
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          sizes="160px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ✅ title */}
                  <h3 className="text-center text-[16px] font-extrabold tracking-tight text-slate-900">
                    {s.title}
                  </h3>

                  {/* ✅ points: tighter + no “blank” look, consistent sizing */}
                  <ul className="mt-4 space-y-2 text-[13px] text-slate-800">
                    {s.points.slice(0, 5).map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1B4A]" />
                        <span className="leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* ✅ CTA: smaller width (fits text), still pinned to bottom */}
                  <div className="mt-auto pt-5 flex justify-center">
                    <Link
                      href={s.href}
                      className={cn(
                        "inline-flex h-9 items-center justify-center rounded-2xl px-5",
                        "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                        "shadow-[0_12px_24px_rgba(244,123,32,.26)]",
                        "transition-all duration-300",
                        "hover:-translate-y-[1px] hover:shadow-[0_16px_34px_rgba(244,123,32,.34)]",
                        "focus:outline-none focus:ring-2 focus:ring-slate-400"
                      )}
                      aria-label={`${lang === "fr" ? "Voir" : "View"} ${s.title}`}
                    >
                      {lang === "fr" ? "Découvrir" : "Learn more"}
                    </Link>
                  </div>

                  {/* micro SEO note (screen readers) */}
                  <span className="sr-only">
                    {lang === "fr" ? "Service premium à l’île Maurice." : "Premium service in Mauritius."}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
