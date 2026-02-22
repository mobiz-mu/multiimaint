// src/app/contact/ContactClient.tsx
"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================
   Tiny inline icons (no deps)
========================= */
function IconWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M20.5 11.8A8.5 8.5 0 0 1 7 18.7L3.5 19.5l.9-3.4A8.5 8.5 0 1 1 20.5 11.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.9c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.3l.8 1.9c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3-.1.5.3.7 1 1.5 1.8 2 .3.2.6.3.8.1l.6-.6c.2-.2.4-.2.6-.1l2 .9c.2.1.3.3.3.5v.6c0 .3-.1.5-.4.6-.7.3-1.7.4-2.7 0-1.3-.5-2.5-1.4-3.6-2.6-1.2-1.1-2-2.3-2.5-3.6-.4-1-.3-2 .1-2.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M7.5 3.5h2.2c.5 0 .9.3 1 .7l.8 3.1c.1.4 0 .9-.3 1.2l-1.2 1.2c.8 1.6 2 3.2 3.6 4.8 1.6 1.6 3.2 2.8 4.8 3.6l1.2-1.2c.3-.3.8-.4 1.2-.3l3.1.8c.4.1.7.5.7 1v2.2c0 .6-.5 1.1-1.1 1.1-3.2 0-6.8-1.7-10.4-5.3C9.2 12.1 7.5 8.5 7.5 5.3c0-.6.5-1.1 1.1-1.1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 6h16v12H4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPin({ className = "" }: { className?: string }) {
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

export default function ContactClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  // ✅ Defensive read (prevents crash if copy.ts is malformed)
  const t =
    (c as any)?.pages?.contact?.[lang] ??
    (lang === "fr"
      ? {
          kicker: "Contact • Devis • Support",
          title: "Contactez MultiiMaint",
          desc: "Demandez un devis ou posez une question. Réponse rapide et interventions partout à l’Île Maurice.",
          waTitle: "WhatsApp (le plus rapide)",
          waDesc: "Envoyez votre localisation, service souhaité et créneau préféré.",
          formTitle: "Formulaire WhatsApp",
          formDesc: "Pré-remplissez le message et envoyez en 1 clic.",
        }
      : {
          kicker: "Contact • Quotes • Support",
          title: "Contact MultiiMaint",
          desc: "Request a quote or ask a question. We respond fast and can schedule interventions across Mauritius.",
          waTitle: "WhatsApp (fastest)",
          waDesc: "Message us with your location, service needed and preferred time.",
          formTitle: "WhatsApp form",
          formDesc: "Pre-fill your message and send in one click.",
        });

  const WA_PHONE = "23057160579";
  const PHONE_DISPLAY = "+230 5716 0579";
  const EMAIL = "support@multiimaint.com";

  // Quatre Bornes (approx)
  const QB_LAT = -20.2646;
  const QB_LNG = 57.4792;

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const waText = useMemo(() => {
    const header = lang === "fr" ? "Bonjour MultiiMaint 👋" : "Hello MultiiMaint 👋";
    const lines =
      lang === "fr"
        ? [
            header,
            "",
            `Nom: ${name || "-"}`,
            `Service: ${service || "-"}`,
            `Message: ${msg || "-"}`,
            "",
            "Merci.",
          ]
        : [
            header,
            "",
            `Name: ${name || "-"}`,
            `Service: ${service || "-"}`,
            `Message: ${msg || "-"}`,
            "",
            "Thank you.",
          ];
    return lines.join("\n");
  }, [lang, name, service, msg]);

  const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waText)}`;
  const mapSrc = `https://www.google.com/maps?q=${QB_LAT},${QB_LNG}&z=14&output=embed`;

  return (
    <PageWrap>
      {/* =========================
          HERO — WHITE EXECUTIVE
      ========================= */}
      <section className="relative -mt-6 md:-mt-8">
        <div
          className={cn(
            "relative overflow-hidden rounded-[30px] bg-white",
            "ring-1 ring-slate-200",
            "shadow-[0_30px_90px_rgba(2,6,23,.10)]"
          )}
        >
          {/* subtle premium background */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute -top-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
            <div className="absolute -bottom-52 right-[6%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/[0.06] blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />
          </div>

          <div className="relative z-10 px-5 py-10 sm:px-8 md:px-10 md:py-14">
            <div className="mx-auto max-w-[1200px]">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2",
                      "bg-white/70 backdrop-blur",
                      "ring-1 ring-slate-200",
                      "text-[11px] font-extrabold tracking-[0.18em] text-[#0B1B4A]"
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-[#F47B20]" aria-hidden="true" />
                    {t.kicker ?? (lang === "fr" ? "CONTACT • DEVIS • SUPPORT" : "CONTACT • QUOTES • SUPPORT")}
                  </div>

                  <h1 className="mt-4 text-balance text-[30px] font-extrabold tracking-tight text-slate-950 sm:text-[40px] md:text-[54px]">
                    {t.title}
                  </h1>

                  <p className="mt-3 max-w-[900px] text-pretty text-[14.5px] leading-relaxed text-slate-700 sm:text-[15.5px]">
                    {t.desc ??
                      (lang === "fr"
                        ? "Réponses rapides, interventions planifiées et suivi qualité premium."
                        : "Fast replies, scheduled interventions and premium quality follow-up.")}
                  </p>

                  <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#F47B20] via-[#0B1B4A]/80 to-[#F47B20]" />
                </div>

                {/* right mini CTA */}
                <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                      "bg-[#0B1B4A] text-white",
                      "text-[13px] font-extrabold",
                      "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                      "transition hover:brightness-110",
                      "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25 focus:ring-offset-2"
                    )}
                    aria-label={lang === "fr" ? "Contacter via WhatsApp" : "Contact via WhatsApp"}
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    {lang === "fr" ? "WhatsApp (rapide)" : "WhatsApp (fast)"}
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                      "bg-white text-slate-900 ring-1 ring-slate-200",
                      "text-[13px] font-extrabold",
                      "transition hover:bg-slate-50",
                      "focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    )}
                    aria-label={lang === "fr" ? "Envoyer un email" : "Send an email"}
                  >
                    <IconMail className="h-4 w-4 text-[#F47B20]" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          QUICK CONTACT STRIP
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(2,6,23,.06)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 text-[13px] font-semibold text-slate-800 ring-1 ring-slate-200">
                <IconPhone className="h-4 w-4 text-[#0B1B4A]" />
                {PHONE_DISPLAY}
              </span>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 text-[13px] font-semibold text-slate-800 ring-1 ring-slate-200 hover:bg-white"
              >
                <IconMail className="h-4 w-4 text-[#F47B20]" />
                {EMAIL}
              </a>

              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2.5 text-[13px] font-semibold text-slate-800 ring-1 ring-slate-200">
                <IconPin className="h-4 w-4 text-[#0B1B4A]" />
                {lang === "fr" ? "Quatre Bornes, MU" : "Quatre Bornes, MU"}
              </span>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                "bg-[#F47B20] text-[#0B1B4A]",
                "text-[13.5px] font-extrabold",
                "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                "transition hover:brightness-110",
                "focus:outline-none focus:ring-2 focus:ring-[#F47B20]/35 focus:ring-offset-2"
              )}
            >
              <IconWhatsApp className="h-4 w-4" />
              {lang === "fr" ? "Demander un devis" : "Request a quote"}
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN GRID
      ========================= */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        {/* LEFT — WhatsApp form */}
        <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,.06)] sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[18px] font-extrabold text-slate-950 sm:text-[20px]">
                {t.formTitle ?? (lang === "fr" ? "Écrivez-nous via WhatsApp" : "Message us via WhatsApp")}
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
                {t.formDesc ??
                  (lang === "fr"
                    ? "Renseignez les détails et envoyez votre demande en 1 clic."
                    : "Fill the details and send your request in one click.")}
              </p>
            </div>

            <span
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                "bg-[#0B1B4A]/5 text-[#0B1B4A]",
                "text-[12px] font-extrabold ring-1 ring-[#0B1B4A]/10"
              )}
            >
              <span className="h-2 w-2 rounded-full bg-[#F47B20]" aria-hidden="true" />
              {lang === "fr" ? "Réponse rapide" : "Fast reply"}
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-[12px] font-extrabold tracking-wide text-slate-700">
                  {lang === "fr" ? "Nom / Entreprise" : "Name / Company"}
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "fr" ? "Ex: ABC Ltd" : "e.g. ABC Ltd"}
                  autoComplete="name"
                  className="h-12 rounded-2xl px-4 text-[14px] ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/35 outline-none"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-[12px] font-extrabold tracking-wide text-slate-700">
                  {lang === "fr" ? "Service" : "Service"}
                </span>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder={lang === "fr" ? "Nettoyage, maintenance, etc." : "Cleaning, maintenance, etc."}
                  className="h-12 rounded-2xl px-4 text-[14px] ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/35 outline-none"
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-[12px] font-extrabold tracking-wide text-slate-700">
                {lang === "fr" ? "Message" : "Message"}
              </span>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={lang === "fr" ? "Décrivez le besoin, lieu, date/heure…" : "Describe the need, location, date/time…"}
                className="min-h-[150px] rounded-2xl px-4 py-3 text-[14px] ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/35 outline-none"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4",
                  "bg-[#0B1B4A] text-white",
                  "text-[14px] font-extrabold",
                  "shadow-[0_16px_40px_rgba(11,27,74,.18)]",
                  "transition hover:brightness-110",
                  "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25 focus:ring-offset-2"
                )}
              >
                <IconWhatsApp className="h-4 w-4" />
                {lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
              </a>

              <p className="text-[12.5px] font-semibold text-slate-600">
                {lang === "fr"
                  ? "Astuce : ajoutez votre localisation et une photo si nécessaire."
                  : "Tip: add your location and a photo if needed."}
              </p>
            </div>

            <p className="sr-only" aria-live="polite">
              {lang === "fr" ? "Message WhatsApp prêt." : "WhatsApp message ready."}
            </p>
          </div>
        </article>

        {/* RIGHT — Map + info */}
        <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,6,23,.06)]">
          <div className="p-6 sm:p-8">
            <h2 className="text-[18px] font-extrabold text-slate-950">
              {t.waTitle ?? (lang === "fr" ? "Notre zone d’intervention" : "Our service area")}
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
              {t.waDesc ??
                (lang === "fr"
                  ? "Basés à Quatre Bornes, nous couvrons toute l’île — résidences, bureaux, commerces et sites."
                  : "Based in Quatre Bornes, we cover the whole island — homes, offices, retail and sites.")}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                lang === "fr" ? "Réponse rapide" : "Fast reply",
                lang === "fr" ? "Suivi qualité" : "Quality follow-up",
                lang === "fr" ? "Interventions planifiées" : "Scheduled visits",
              ].map((x) => (
                <span
                  key={x}
                  className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-slate-200"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-[320px] w-full sm:h-[360px]">
            <iframe
              title="MultiiMaint map"
              src={mapSrc}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </article>
      </section>

      {/* SEO helper */}
      <p className="sr-only">
        MultiiMaint contact Mauritius: WhatsApp +230 5716 0579, email support@multiimaint.com, Quatre Bornes, Mauritius.
      </p>
    </PageWrap>
  );
}