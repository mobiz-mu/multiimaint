"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Lang = "fr" | "en";
type ServiceKey = "maintenance" | "cleaning" | "facility" | "gardening";

type ServiceCard = {
  key: ServiceKey;
  chip: string;
  seoTitle: string;
  seoDesc: string;
  bullets: string[]; // 5
  href: string;
  img: string;
  imgAlt: string;
};

function cn(...x: any[]) {
  return x.filter(Boolean).join(" ");
}

function LocationPin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22s7-5.2 7-12a7 7 0 10-14 0c0 6.8 7 12 7 12z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 13a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ServiceLocationLabel({ lang, k }: { lang: Lang; k: ServiceKey }) {
  const label =
    lang === "fr"
      ? k === "maintenance"
        ? "Mauritius • Services de Maintenance"
        : k === "cleaning"
          ? "Mauritius • Services de Nettoyage"
          : k === "facility"
            ? "Mauritius • Facilities Management"
            : "Mauritius • Services de Jardinage"
      : k === "maintenance"
        ? "Mauritius • Maintenance Services"
        : k === "cleaning"
          ? "Mauritius • Cleaning Services"
          : k === "facility"
            ? "Mauritius • Facilities Management"
            : "Mauritius • Gardening Services";

  return (
    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
      <LocationPin className="text-pink-500" />
      <span>{label}</span>
    </div>
  );
}

export default function HomeServices() {
  const { lang } = useLang() as { lang: Lang };
  const c = copy(lang);

  const services = useMemo<ServiceCard[]>(() => {
    if (lang === "fr") {
      return [
        {
          key: "maintenance",
          chip: "Maintenance",
          seoTitle: "Maintenance préventive & corrective à l’Île Maurice",
          seoDesc:
            "Maintenance technique premium pour entreprises, commerces et résidences : intervention rapide, prévention des pannes, réparations et suivi professionnel.",
          bullets: [
            "Intervention rapide & diagnostic fiable",
            "Préventif & correctif (équipements & bâtiments)",
            "Procédures sécurité, qualité & conformité",
            "Suivi avec photos, KPI & compte-rendu",
            "Solutions sur mesure pour chaque site",
          ],
          href: "/services#maintenance",
          img: "/services/Maintenance.jpeg",
          imgAlt:
            "Maintenance à l’Île Maurice : technicien MultiiMaint en intervention sur équipement, service préventif et correctif.",
        },
        {
          key: "cleaning",
          chip: "Nettoyage",
          seoTitle: "Nettoyage professionnel & hygiène à Maurice (service premium)",
          seoDesc:
            "Nettoyage pro pour bureaux, commerces et résidences : hygiène, désinfection, finitions soignées, planning flexible et contrôle qualité.",
          bullets: [
            "Bureaux, commerces, résidences & sites",
            "Méthodes pro & produits adaptés",
            "Hygiène, désinfection & finitions",
            "Planning flexible (ponctuel ou contrat)",
            "Contrôle qualité & suivi client",
          ],
          href: "/services#nettoyage",
          img: "/services/Professional Cleaning.jpeg",
          imgAlt: "Nettoyage professionnel à l’Île Maurice : équipe MultiiMaint, hygiène, désinfection et entretien premium.",
        },
        {
          key: "facility",
          chip: "Facilities Management",
          seoTitle: "Facilities management : supervision de site & coordination (Maurice)",
          seoDesc:
            "Gestion et supervision multi-sites : coordination des interventions, KPI, reporting, optimisation des coûts et un seul point de contact.",
          bullets: [
            "Gestion multi-sites & contrats",
            "KPI, reporting & suivi performance",
            "Coordination prestataires & interventions",
            "Optimisation des coûts & priorités",
            "Point de contact unique (SPOC)",
          ],
          href: "/services#facility-management",
          img: "/services/Facilities Management.jpeg",
          imgAlt: "Facilities management à Maurice : supervision de site, coordination des interventions et reporting KPI.",
        },
        {
          key: "gardening",
          chip: "Jardinage (intérieur & extérieur)",
          seoTitle: "Jardinage intérieur & extérieur à Maurice : entretien & propreté",
          seoDesc:
            "Entretien d’espaces verts et extérieurs : jardinage, taille, débroussaillage, nettoyage des abords et interventions planifiées.",
          bullets: [
            "Entretien régulier des espaces verts",
            "Jardinage intérieur & extérieur",
            "Taille, nettoyage, débroussaillage",
            "Allées, abords & propreté extérieure",
            "Interventions ponctuelles ou planifiées",
          ],
          href: "/services#jardinage",
          img: "/services/Gardening.jpeg",
          imgAlt: "Jardinage à l’Île Maurice : entretien d’espaces verts, taille des plantes et propreté extérieure (MultiiMaint).",
        },
      ];
    }

    return [
      {
        key: "maintenance",
        chip: "Maintenance",
        seoTitle: "Preventive & corrective maintenance in Mauritius (premium service)",
        seoDesc:
          "Premium technical maintenance for businesses and residences: fast response, fault prevention, repairs and professional follow-up.",
        bullets: [
          "Fast response & reliable diagnostics",
          "Preventive & corrective maintenance",
          "Safety-first process & quality control",
          "Photo updates, KPIs & clear reporting",
          "Tailored solutions for each site",
        ],
        href: "/services#maintenance",
        img: "/services/Maintenance.jpeg",
        imgAlt: "Maintenance service in Mauritius: MultiiMaint technician performing preventive and corrective work on equipment.",
      },
      {
        key: "cleaning",
        chip: "Cleaning",
        seoTitle: "Professional cleaning & hygiene services in Mauritius (premium)",
        seoDesc:
          "Premium cleaning for offices, retail and residences: hygiene, disinfection, neat finishing, flexible scheduling and quality checks.",
        bullets: [
          "Offices, retail, residences & sites",
          "Professional methods & right products",
          "Hygiene, disinfection & neat finishing",
          "Flexible scheduling (one-off or contract)",
          "Quality checks & client follow-up",
        ],
        href: "/services#nettoyage",
        img: "/services/Professional Cleaning.jpeg",
        imgAlt: "Professional cleaning in Mauritius: MultiiMaint team delivering hygiene, disinfection and premium maintenance.",
      },
      {
        key: "facility",
        chip: "Facilities Management",
        seoTitle: "Facilities management: site supervision & coordination in Mauritius",
        seoDesc:
          "Multi-site supervision and coordinated interventions: KPIs, reporting, vendor management, optimization and one point of contact.",
        bullets: [
          "Multi-site operations & contracts",
          "KPIs, reporting & performance tracking",
          "Vendor coordination & interventions",
          "Cost and priority optimization",
          "Single point of contact (SPOC)",
        ],
        href: "/services#facility-management",
        img: "/services/Facilities Management.jpeg",
        imgAlt: "Facilities management in Mauritius: site supervision, coordination and KPI reporting by MultiiMaint.",
      },
      {
        key: "gardening",
        chip: "Gardening (Indoor & Outdoor)",
        seoTitle: "Indoor & outdoor gardening in Mauritius: upkeep & outdoor cleanliness",
        seoDesc:
          "Green spaces and outdoor upkeep: gardening, trimming, clearing, surroundings cleaning and scheduled or one-off visits.",
        bullets: [
          "Regular green-space upkeep",
          "Indoor & outdoor gardening support",
          "Trimming, clearing and cleanliness",
          "Paths, surroundings & exterior areas",
          "One-off or scheduled interventions",
        ],
        href: "/services#jardinage",
        img: "/services/Gardening.jpeg",
        imgAlt: "Gardening in Mauritius: MultiiMaint maintaining green areas, trimming plants and cleaning outdoor surroundings.",
      },
    ];
  }, [lang]);

  return (
    <section
      id="services"
      className="relative bg-white py-10 md:py-12"
      aria-label={lang === "fr" ? "Nos services MultiiMaint" : "MultiiMaint services"}
    >
      {/* ✅ Keep subtle luxury glow but WHITE background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-28 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
        <div className="absolute -bottom-52 left-[8%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {lang === "fr" ? "Nos Services" : "Our Services"}
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {lang === "fr"
                ? "Maintenance, nettoyage, facilities management et jardinage à l’Île Maurice — service premium, qualité contrôlée et suivi professionnel."
                : "Maintenance, cleaning, facilities management and gardening in Mauritius — premium service, controlled quality and professional follow-up."}
            </p>
          </div>
        </Reveal>

        {/* ✅ Reduce spacing (up & down) */}
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          {services.map((s, idx) => (
            <Reveal key={s.key} delay={0.06 + idx * 0.06}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-[28px]",
                  "bg-white",
                  "shadow-[0_18px_55px_rgba(2,6,23,.10)]",
                  "transition-all duration-300 will-change-transform",
                  "hover:-translate-y-[3px] hover:[transform:translateY(-3px)_rotateX(2deg)_rotateY(-2deg)]",
                  "hover:shadow-[0_30px_90px_rgba(2,6,23,.16)]",
                  // ✅ Premium dual border (orange + navy)
                  "border border-[#0B1B4A]/18"
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ✅ small orange + navy blue border accents */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[#F47B20] via-[#F47B20]/80 to-transparent opacity-90" />

                <div className="pointer-events-none absolute -inset-24 rotate-12 bg-gradient-to-r from-transparent via-[#F47B20]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex h-full flex-col">
                  {/* image header */}
                  <div className="relative overflow-hidden rounded-t-[28px]">
                    <Image
                      src={s.img}
                      alt={s.imgAlt}
                      width={1600}
                      height={900}
                      priority={idx < 2}
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className={cn(
                        "h-[215px] w-full object-cover sm:h-[245px] md:h-[255px]",
                        "transition-transform duration-700 group-hover:scale-[1.04]"
                      )}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />

                    {/* chip */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-2 text-[12px] font-extrabold text-white ring-1 ring-white/18 backdrop-blur">
                      <span className="inline-block h-2 w-2 rounded-full bg-[#F47B20]" />
                      {s.chip}
                    </div>
                  </div>

                  <div className="flex h-full flex-col p-6">
                    <h3 className="text-[18px] font-extrabold tracking-tight text-slate-900 md:text-[19px]">
                      {s.seoTitle}
                    </h3>

                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700 line-clamp-3">
                      {s.seoDesc}
                    </p>

                    <ul className="mt-4 space-y-2 text-[13px] text-slate-800">
                      {s.bullets.slice(0, 5).map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0B1B4A]" />
                          <span className="leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center justify-between gap-3">
                        <Link
                          href={s.href}
                          className={cn(
                            "inline-flex h-10 items-center justify-center rounded-2xl px-6",
                            "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                            "shadow-[0_14px_30px_rgba(244,123,32,.26)]",
                            "transition-all duration-300",
                            "hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.34)]",
                            "focus:outline-none focus:ring-2 focus:ring-slate-400"
                          )}
                          aria-label={`${lang === "fr" ? "Découvrir" : "Learn more"}: ${s.seoTitle}`}
                        >
                          {lang === "fr" ? "Découvrir" : "Learn more"}
                        </Link>

                        <ServiceLocationLabel lang={lang} k={s.key} />
                      </div>
                    </div>

                    <span className="sr-only">
                      {lang === "fr"
                        ? `Service MultiiMaint : ${s.seoTitle}. ${s.seoDesc}`
                        : `MultiiMaint service: ${s.seoTitle}. ${s.seoDesc}`}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ✅ Removed: Quality • Safety • Follow-up block */}
        <div className="h-2 md:h-3" />
      </div>
    </section>
  );
}