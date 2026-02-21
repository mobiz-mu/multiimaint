"use client";

import Link from "next/link";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Item = { t: string; d: string };

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* ===========================
   Premium SVG Icons (real)
   - navy/orange stroke
   - clean, corporate, scalable
=========================== */
function IconShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2 20 6v6c0 6-4 10-8 11-4-1-8-5-8-11V6l8-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.2 10.8 14.5 15.8 9.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLightning({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMapPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTarget({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 17a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 12 20.5 3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.9 3.8h3.6v3.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconEye({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/* =========================================
   Premium Icon Frame
   - 3D depth
   - orange/navy border
========================================= */
function IconFrame({
  tone = "navy",
  children,
}: {
  tone?: "navy" | "orange";
  children: React.ReactNode;
}) {
  const ring =
    tone === "orange"
      ? "ring-1 ring-[#F47B20]/30"
      : "ring-1 ring-[#0B1B4A]/22";

  const topLine =
    tone === "orange"
      ? "from-[#F47B20] via-[#ff9a4a] to-[#ffb36b]"
      : "from-[#0B1B4A] via-[#0B1B4A]/70 to-transparent";

  return (
    <span
      className={cn(
        "relative inline-flex h-12 w-12 items-center justify-center rounded-2xl",
        "bg-white",
        ring,
        "shadow-[0_14px_34px_rgba(2,6,23,.10)]",
        "transform-gpu transition-transform duration-300",
        "group-hover:-translate-y-[1px] group-hover:rotate-[0.4deg]"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-2xl",
          "bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.14),transparent_60%)]"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-2 top-2 h-[2px] rounded-full bg-gradient-to-r",
          topLine,
          "opacity-80"
        )}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export default function HomeAbout() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  const items: Array<Item & { icon: "reliability" | "speed" | "coverage" }> = useMemo(
    () =>
      lang === "fr"
        ? [
            {
              icon: "reliability",
              t: "Fiabilité & qualité contrôlée",
              d: "Process clair, sécurité, contrôle qualité et reporting (photos / KPI) pour chaque intervention — résidentiel, commercial ou industriel.",
            },
            {
              icon: "speed",
              t: "Rapidité & communication simple",
              d: "Réponse rapide, organisation efficace et suivi WhatsApp : un service premium qui respecte les délais et réduit les imprévus.",
            },
            {
              icon: "coverage",
              t: "Couverture île Maurice (multi-sites)",
              d: "Basés à Quatre Bornes — interventions partout à Maurice : sites uniques ou multi-sites, coordination et point de contact unique.",
            },
          ]
        : [
            {
              icon: "reliability",
              t: "Reliability & controlled quality",
              d: "Clear process, safety-first execution, quality control and reporting (photos / KPIs) for every job — residential, commercial or industrial.",
            },
            {
              icon: "speed",
              t: "Fast response & simple communication",
              d: "Quick interventions, efficient planning and WhatsApp follow-up: a premium service that meets deadlines and reduces surprises.",
            },
            {
              icon: "coverage",
              t: "Mauritius islandwide coverage (multi-site)",
              d: "Based in Quatre Bornes — we operate across Mauritius for single or multi-site support, coordination and a single point of contact.",
            },
          ],
    [lang]
  );

  // SEO-rich intro
  const aboutP =
    lang === "fr"
      ? "MultiiMaint Ltd est un partenaire corporate premium basé à Quatre Bornes, spécialisé en maintenance, nettoyage professionnel, facilities management et jardinage (intérieur & extérieur) à l’île Maurice. Nous accompagnons résidences, bureaux, commerces et sites industriels avec une exécution fiable, un contrôle qualité constant et un suivi clair. Notre engagement : des interventions rapides, une sécurité maîtrisée et des résultats mesurables."
      : "MultiiMaint Ltd is a premium corporate partner based in Quatre Bornes, specializing in maintenance, professional cleaning, facilities management and gardening (indoor & outdoor) across Mauritius. We support residences, offices, retail and industrial sites with reliable execution, consistent quality control and clear follow-up. Our commitment: fast interventions, controlled safety and measurable results.";

  const mission =
    lang === "fr"
      ? {
          t: "Notre mission",
          d: "Livrer un service premium, fiable et rapide en maintenance et facilities care — avec communication simple, contrôle qualité, suivi structuré et reporting (KPI) pour chaque site.",
        }
      : {
          t: "Our mission",
          d: "Deliver premium, reliable and fast facilities care — with simple communication, quality control, structured follow-up and KPI reporting for every site.",
        };

  const vision =
    lang === "fr"
      ? {
          t: "Notre vision",
          d: "Devenir la référence à Maurice pour l’entretien et la gestion d’infrastructures, grâce à la transparence, l’amélioration continue et une expérience client corporate de haut niveau.",
        }
      : {
          t: "Our vision",
          d: "Become Mauritius’ reference for facilities care and management through transparency, continuous improvement and a high-end corporate customer experience.",
        };

  const learnMoreLabel = lang === "fr" ? "En savoir plus sur MultiiMaint" : "Learn more about MultiiMaint";

  return (
    <section
      id="about"
      className="relative bg-white py-14 md:py-20"
      aria-label={lang === "fr" ? "À propos de MultiiMaint" : "About MultiiMaint"}
    >
      {/* ✅ White background + subtle luxury depth (no dark / no glass) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[10%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/7 blur-3xl" />
        <div className="absolute -bottom-40 left-[8%] h-[520px] w-[520px] rounded-full bg-[#ff9a4a]/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {lang === "fr" ? "À propos de MultiiMaint" : "About MultiiMaint"}
            </h2>
            <p className="mx-auto mt-4 max-w-4xl text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
              {aboutP}
            </p>
          </div>
        </Reveal>

        {/* ✅ 3 premium cards (white, 3D, orange+navy borders) */}
        <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
          {items.map((it, idx) => {
            const icon =
              it.icon === "reliability" ? (
                <IconShieldCheck className="h-6 w-6 text-[#0B1B4A]" />
              ) : it.icon === "speed" ? (
                <IconLightning className="h-6 w-6 text-[#0B1B4A]" />
              ) : (
                <IconMapPin className="h-6 w-6 text-[#0B1B4A]" />
              );

            // alternate tone for premium feel
            const tone = idx % 2 === 0 ? "orange" : "navy";

            return (
              <Reveal key={it.t} delay={0.05 + idx * 0.05}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-[28px] bg-white",
                    // dual border: navy + orange glow edge
                    "border border-[#0B1B4A]/10",
                    "shadow-[0_22px_70px_rgba(2,6,23,.08)]",
                    "transform-gpu transition-all duration-300",
                    "hover:-translate-y-[2px] hover:shadow-[0_30px_90px_rgba(2,6,23,.12)]"
                  )}
                >
                  {/* premium 3D background inside */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,27,74,.06),transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(244,123,32,.10),transparent_55%)]" />
                    <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#0B1B4A] to-[#F47B20]" />
                    <div className="absolute inset-0 ring-1 ring-[#F47B20]/15 rounded-[28px]" />
                  </div>

                  <div className="relative flex h-full flex-col p-7">
                    <div className="flex items-center gap-3">
                      <IconFrame tone={tone as any}>{icon}</IconFrame>

                      {/* small premium tag */}
                      <span className="inline-flex items-center rounded-full bg-[#0B1B4A]/5 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#0B1B4A] ring-1 ring-[#0B1B4A]/10">
                        {lang === "fr" ? "SERVICE PREMIUM" : "PREMIUM SERVICE"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[16px] font-extrabold tracking-tight text-slate-900">
                      {it.t}
                    </h3>

                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
                      {it.d}
                    </p>

                    {/* subtle animated underline for luxury */}
                    <div className="mt-5 h-[2px] w-16 rounded-full bg-gradient-to-r from-[#F47B20] via-[#0B1B4A] to-[#F47B20] opacity-70 transition-all duration-300 group-hover:w-24" />

                    <div className="mt-auto pt-5" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={0.12}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="hidden h-[2px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#F47B20] to-transparent opacity-80 md:block" />
            <Link
              href="/about"
              aria-label={learnMoreLabel}
              className={cn(
                "relative inline-flex items-center justify-center rounded-2xl px-7 py-3",
                "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.30)]",
                "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25"
              )}
            >
              {lang === "fr" ? "En savoir plus" : "Learn more"}
            </Link>
            <span className="hidden h-[2px] w-14 rounded-full bg-gradient-to-r from-transparent via-[#F47B20] to-transparent opacity-80 md:block" />
          </div>
        </Reveal>

        {/* Mission & Vision (premium + 3D) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
          <Reveal delay={0.06}>
            <article
              className={cn(
                "group relative h-full overflow-hidden rounded-[28px] bg-white",
                "border border-[#F47B20]/20",
                "shadow-[0_22px_70px_rgba(2,6,23,.08)]",
                "transform-gpu transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_30px_90px_rgba(2,6,23,.12)]"
              )}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.12),transparent_60%)]" />
                <div className="absolute inset-0 ring-1 ring-[#0B1B4A]/10 rounded-[28px]" />
              </div>

              <div className="relative p-7">
                <div className="flex items-center gap-3">
                  <IconFrame tone="orange">
                    <IconTarget className="h-6 w-6 text-[#0B1B4A]" />
                  </IconFrame>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">{mission.t}</h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{mission.d}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article
              className={cn(
                "group relative h-full overflow-hidden rounded-[28px] bg-white",
                "border border-[#0B1B4A]/16",
                "shadow-[0_22px_70px_rgba(2,6,23,.08)]",
                "transform-gpu transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_30px_90px_rgba(2,6,23,.12)]"
              )}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#0B1B4A]/70 to-[#F47B20]/80" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,27,74,.10),transparent_60%)]" />
                <div className="absolute inset-0 ring-1 ring-[#F47B20]/12 rounded-[28px]" />
              </div>

              <div className="relative p-7">
                <div className="flex items-center gap-3">
                  <IconFrame tone="navy">
                    <IconEye className="h-6 w-6 text-[#0B1B4A]" />
                  </IconFrame>
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">{vision.t}</h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-slate-700">{vision.d}</p>
              </div>
            </article>
          </Reveal>
        </div>

        {/* SEO helper */}
        <p className="sr-only">
          {lang === "fr"
            ? "MultiiMaint Ltd, Quatre Bornes, Île Maurice : maintenance, nettoyage professionnel, facilities management et jardinage. Service premium, sécurité, contrôle qualité, KPI et suivi."
            : "MultiiMaint Ltd, Quatre Bornes, Mauritius: maintenance, professional cleaning, facilities management and gardening. Premium service, safety, quality control, KPIs and follow-up."}
        </p>
      </div>
    </section>
  );
}




