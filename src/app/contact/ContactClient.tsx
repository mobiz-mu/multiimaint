// src/app/contact/ContactClient.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

type Lang = "fr" | "en";
type ServiceKey = "maintenance" | "cleaning" | "facility" | "gardening" | "other";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================
   Icons (no deps)
========================= */
function IconWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M7 17.2 6 22l4.9-1A9.6 9.6 0 1 0 7 17.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 10.2c.2-.5.3-.5.6-.5h.5c.1 0 .3.1.4.3l.6 1.4c.1.2.1.3 0 .5l-.3.5c-.1.2-.2.4 0 .6.2.2.7.8 1.5 1.3.8.5 1.4.7 1.7.8.2.1.4 0 .6-.2l.5-.6c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.3.3.5 0 .8-.4 1.6-1.1 2-.5.3-1.2.5-2.5.2-1.5-.4-3.1-1.4-4.3-2.6-1.2-1.2-2.1-2.7-2.5-4.1-.3-1.2-.1-1.8.2-2.3Z"
        fill="currentColor"
        opacity=".92"
      />
    </svg>
  );
}

function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M22 16.9v3a2 2 0 0 1-2.2 2c-9.7-.7-17.5-8.5-18.2-18.2A2 2 0 0 1 3.6 1.5h3a2 2 0 0 1 2 1.7l.6 3a2 2 0 0 1-.6 1.8l-1.2 1.2a16 16 0 0 0 6.8 6.8l1.2-1.2a2 2 0 0 1 1.8-.6l3 .6a2 2 0 0 1 1.7 2Z"
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
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m22 8-10 7L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconBuilding({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 21v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M9 7h.01M12 7h.01M15 7h.01M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================
   Helpers
========================= */
const WA_NUMBER = "23057160579";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const EMAIL_TO = "info@multiimaint.mu";
const PHONE_DISPLAY = "+230 5716 0579";

// Quatre Bornes (approx) embed (stable)
const QB_LAT = -20.2646;
const QB_LNG = 57.4792;
const MAP_EMBED = `https://www.google.com/maps?q=${QB_LAT},${QB_LNG}&z=15&output=embed`;

// ✅ Your requested open location (exact)
const GOOGLE_MAPS_OPEN_URL = "https://maps.app.goo.gl/g5Sk5pDKdDUYPV337";

function waLink(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

export default function ContactClient() {
  const { lang } = useLang() as { lang: Lang };
  const c = copy(lang);

  // short SEO-friendly page copy (not too long)
  const t =
    (c as any)?.pages?.contact?.[lang] ??
    (lang === "fr"
      ? {
          kicker: "Contact • Devis • Support",
          title: "Contactez MultiiMaint",
          desc: "Basés à Quatre Bornes, interventions partout à Maurice. Demandez un devis — réponse rapide via WhatsApp ou email.",
          leftTitle: "Coordonnées",
          rightTitle: "Demande rapide (WhatsApp)",
          note: "Envoyé depuis le site Multiimaint.",
        }
      : {
          kicker: "Contact • Quotes • Support",
          title: "Contact MultiiMaint",
          desc: "Based in Quatre Bornes, service across Mauritius. Request a quote — fast reply via WhatsApp or email.",
          leftTitle: "Contact details",
          rightTitle: "Quick request (WhatsApp)",
          note: "Sent from the Multiimaint website.",
        });

  const serviceOptions = useMemo(() => {
    return lang === "fr"
      ? [
          { v: "maintenance" as const, t: "Maintenance et Reparation" },
          { v: "cleaning" as const, t: "Nettoyage professionnel" },
          { v: "facility" as const, t: "Facilities Management" },
          { v: "gardening" as const, t: "Jardinage (intérieur & extérieur)" },
          { v: "other" as const, t: "Autres" },
        ]
      : [
          { v: "maintenance" as const, t: "Maintenance & Repair" },
          { v: "cleaning" as const, t: "Professional Cleaning" },
          { v: "facility" as const, t: "Facilities Management" },
          { v: "gardening" as const, t: "Gardening (Indoor & Outdoor)" },
          { v: "other" as const, t: "Other" },
        ];
  }, [lang]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceKey>("maintenance");
  const [message, setMessage] = useState("");

  const serviceLabel = useMemo(
    () => serviceOptions.find((x) => x.v === service)?.t ?? (lang === "fr" ? "Maintenance et Reparation" : "Maintenance & Repair"),
    [service, serviceOptions, lang]
  );

  const isValid = useMemo(() => {
    const em = email.trim();
    const hasEmail = em.length > 5 && em.includes("@");
    return !!name.trim() && !!address.trim() && !!phone.trim() && hasEmail;
  }, [name, address, phone, email]);

  const prefixTitle = lang === "fr" ? "Demande de devis / intervention — MultiiMaint" : "Quote / intervention request — MultiiMaint";

  const waBody = useMemo(() => {
    const greet =
      lang === "fr"
        ? "Bonjour MultiiMaint 👋\n\nJe souhaite un devis / une intervention.\n\n"
        : "Hello MultiiMaint 👋\n\nI would like a quote / an intervention.\n\n";

    const lines = [
      `${lang === "fr" ? "Nom" : "Name"}: ${name.trim() || "-"}`,
      `${lang === "fr" ? "Adresse" : "Address"}: ${address.trim() || "-"}`,
      `${lang === "fr" ? "Téléphone" : "Phone"}: ${phone.trim() || "-"}`,
      `${lang === "fr" ? "Email" : "Email"}: ${email.trim() || "-"}`,
      `${lang === "fr" ? "Service" : "Service"}: ${serviceLabel}`,
      "",
      `${lang === "fr" ? "Message" : "Message"}: ${message.trim() || "-"}`,
      "",
      t.note,
    ];

    return greet + lines.join("\n");
  }, [lang, name, address, phone, email, serviceLabel, message, t.note]);

  const waHref = waLink(prefixTitle + "\n—\n" + waBody);

  const emailHref = useMemo(() => {
    const body = [
      prefixTitle,
      "—",
      `${lang === "fr" ? "Nom" : "Name"}: ${name.trim() || "-"}`,
      `${lang === "fr" ? "Adresse" : "Address"}: ${address.trim() || "-"}`,
      `${lang === "fr" ? "Téléphone" : "Phone"}: ${phone.trim() || "-"}`,
      `Email: ${email.trim() || "-"}`,
      `${lang === "fr" ? "Service" : "Service"}: ${serviceLabel}`,
      "",
      `${lang === "fr" ? "Message" : "Message"}:`,
      message.trim() || "-",
      "",
      t.note,
    ].join("\n");

    return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(prefixTitle)}&body=${encodeURIComponent(body)}`;
  }, [prefixTitle, lang, name, address, phone, email, serviceLabel, message, t.note]);

  const inputBase = cn(
    "h-12 w-full rounded-2xl px-4 text-[14px] text-slate-900",
    "border border-slate-200 bg-white",
    "shadow-[0_10px_24px_rgba(2,6,23,.04)]",
    "outline-none transition",
    "focus:border-[#0B1B4A]/25 focus:ring-2 focus:ring-[#0B1B4A]/18"
  );

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <label className="grid gap-2">
      <span className="text-[12px] font-extrabold tracking-wide text-slate-700">
        {label} {required ? <span className="text-[#F47B20]">*</span> : null}
      </span>
      {children}
    </label>
  );

  return (
    <PageWrap>
      {/* HERO */}
      <section className="relative -mt-6 md:-mt-8">
        <div className="relative overflow-hidden rounded-[30px] bg-white ring-1 ring-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.10)]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-white" />
            <div className="absolute -top-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
            <div className="absolute -bottom-52 right-[6%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/[0.06] blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />
          </div>

          <div className="relative z-10 px-5 py-10 sm:px-8 md:px-10 md:py-14">
            <div className="mx-auto max-w-6xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-slate-200 shadow-[0_12px_26px_rgba(2,6,23,.06)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                <span className="text-[11px] font-extrabold tracking-[0.18em] text-[#0B1B4A]">
                  {(t.kicker ?? "").toUpperCase()}
                </span>
              </div>

              <h1 className="mt-4 text-balance text-[30px] font-extrabold tracking-tight text-slate-950 sm:text-[40px] md:text-[52px]">
                {t.title}
              </h1>
              <p className="mt-3 max-w-3xl text-pretty text-[14.5px] leading-relaxed text-slate-700 sm:text-[15.5px]">
                {t.desc}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6",
                    "bg-[#0B1B4A] text-white",
                    "text-[13.5px] font-extrabold",
                    "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                    "transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25 focus:ring-offset-2"
                  )}
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {lang === "fr" ? "WhatsApp (rapide)" : "WhatsApp (fast)"}
                </a>

                <a
                  href={emailHref}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-6",
                    "bg-white text-slate-900 ring-1 ring-slate-200",
                    "text-[13.5px] font-extrabold",
                    "transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                  )}
                >
                  <IconMail className="h-4 w-4 text-[#F47B20]" />
                  {lang === "fr" ? "Email (prérempli)" : "Email (prefilled)"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN GRID (equal cards) */}
      <section className="mt-6 grid gap-6 lg:grid-cols-2 items-stretch">
        {/* LEFT — details + map */}
        <article
          className={cn(
            "group relative h-full overflow-hidden rounded-[28px] bg-white",
            "border border-slate-200/80",
            "shadow-[0_18px_60px_rgba(2,6,23,.08)]"
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />

          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0B1B4A] text-white shadow-[0_14px_30px_rgba(11,27,74,.16)]">
                    <IconBuilding className="h-5 w-5" />
                  </span>
                  <h2 className="truncate text-[16px] font-extrabold tracking-tight text-slate-900">
                    {lang === "fr" ? t.leftTitle : t.leftTitle}
                  </h2>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-700">
                  {lang === "fr"
                    ? "Assistance premium pour maintenance, nettoyage et gestion de sites — réponse rapide, suivi professionnel."
                    : "Premium support for maintenance, cleaning and site management — fast reply, professional follow-up."}
                </p>
              </div>

              <a
                href={GOOGLE_MAPS_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 rounded-2xl px-4 py-2",
                  "bg-white text-[#0B1B4A] border border-slate-200",
                  "text-[12px] font-extrabold shadow-[0_10px_24px_rgba(2,6,23,.06)]",
                  "transition hover:-translate-y-[1px] hover:shadow-[0_14px_34px_rgba(2,6,23,.10)]"
                )}
                aria-label={lang === "fr" ? "Ouvrir sur Google Maps" : "Open on Google Maps"}
              >
                <IconPin className="h-4 w-4 text-[#F47B20]" />
                Maps
              </a>
            </div>

            <dl className="mt-6 grid gap-3 text-[13px] text-slate-700">
              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-slate-500">
                  <IconPhone className="h-4 w-4 text-[#0B1B4A]" />
                  {lang === "fr" ? "Téléphone / WhatsApp" : "Phone / WhatsApp"}
                </dt>
                <dd className="font-extrabold text-[#0B1B4A]">
                  <a href={waLink(lang === "fr" ? "Bonjour MultiiMaint 👋" : "Hello MultiiMaint 👋")} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {PHONE_DISPLAY}
                  </a>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-slate-500">
                  <IconMail className="h-4 w-4 text-[#0B1B4A]" />
                  Email
                </dt>
                <dd className="font-extrabold text-[#0B1B4A]">
                  <a href={`mailto:${EMAIL_TO}`} className="hover:underline">
                    {EMAIL_TO}
                  </a>
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4">
                <dt className="flex items-center gap-2 text-slate-500">
                  <IconPin className="h-4 w-4 text-[#0B1B4A]" />
                  {lang === "fr" ? "Adresse" : "Address"}
                </dt>
                <dd className="font-semibold text-slate-800">{lang === "fr" ? "Quatre Bornes, Île Maurice" : "Quatre Bornes, Mauritius"}</dd>
              </div>
            </dl>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(2,6,23,.06)]">
              <a href={GOOGLE_MAPS_OPEN_URL} target="_blank" rel="noopener noreferrer" className="relative block">
                <div className="relative h-[340px] w-full sm:h-[420px]">
                  <iframe
                    title="MultiiMaint Ltd map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={MAP_EMBED}
                    className="absolute inset-0 h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-slate-200 shadow-[0_12px_28px_rgba(2,6,23,.10)] backdrop-blur">
                    <IconPin className="h-4 w-4 text-[#F47B20]" />
                    {lang === "fr" ? "Ouvrir sur Google Maps" : "Open in Google Maps"}
                  </div>
                </div>
              </a>

              <div className="px-4 py-3 text-[12px] text-slate-600">
                {lang === "fr" ? "📍 Quatre Bornes — interventions partout à Maurice." : "📍 Quatre Bornes — service across Mauritius."}
              </div>
            </div>

            <p className="sr-only">
              {lang === "fr"
                ? "Contact MultiiMaint à Quatre Bornes. Maintenance et réparation, nettoyage professionnel, facilities management, jardinage à Maurice."
                : "Contact MultiiMaint in Quatre Bornes. Maintenance and repair, professional cleaning, facilities management, gardening in Mauritius."}
            </p>
          </div>
        </article>

        {/* RIGHT — quick request (mandatory fields) */}
        <article
          className={cn(
            "group relative h-full overflow-hidden rounded-[28px] bg-white",
            "border border-slate-200/80",
            "shadow-[0_18px_60px_rgba(2,6,23,.08)]"
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#0B1B4A] to-[#F47B20]" />

          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="truncate text-[16px] font-extrabold tracking-tight text-slate-900">
                  {lang === "fr" ? t.rightTitle : t.rightTitle}
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed text-slate-700">
                  {lang === "fr"
                    ? "Champs obligatoires (*). Message pré-rempli + envoi WhatsApp en 1 clic."
                    : "Required fields (*). Prefilled message + 1-click WhatsApp send."}
                </p>
              </div>

              <span className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-[12px] font-semibold text-slate-600">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                {lang === "fr" ? "Réponse rapide" : "Fast reply"}
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={lang === "fr" ? "Nom" : "Name"} required>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "fr" ? "Votre nom / entreprise" : "Your name / company"}
                    autoComplete="name"
                    className={inputBase}
                  />
                </Field>

                <Field label={lang === "fr" ? "Téléphone" : "Contact number"} required>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={lang === "fr" ? "Ex: +230 5xxx xxxx" : "e.g. +230 5xxx xxxx"}
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputBase}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={lang === "fr" ? "Adresse" : "Address"} required>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={lang === "fr" ? "Ville / quartier" : "City / area"}
                    autoComplete="street-address"
                    className={inputBase}
                  />
                </Field>

                <Field label={lang === "fr" ? "Email" : "Email address"} required>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "fr" ? "vous@exemple.com" : "you@example.com"}
                    autoComplete="email"
                    inputMode="email"
                    className={inputBase}
                  />
                </Field>
              </div>

              <Field label={lang === "fr" ? "Service" : "Service"}>
                <div className="relative">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value as ServiceKey)}
                    className={cn(inputBase, "appearance-none pr-10")}
                    aria-label={lang === "fr" ? "Choisir un service" : "Select a service"}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt.v} value={opt.v}>
                        {opt.t}
                      </option>
                    ))}
                  </select>

                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Field>

              <Field label={lang === "fr" ? "Message" : "Message"}>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    lang === "fr"
                      ? "Ex: Besoin intervention, type de site, urgence, créneau…"
                      : "e.g. Need intervention, site type, urgency, preferred time…"
                  }
                  className={cn(
                    "min-h-[160px] w-full rounded-2xl p-4 text-[14px] text-slate-900",
                    "border border-slate-200 bg-white shadow-[0_10px_24px_rgba(2,6,23,.04)]",
                    "outline-none transition focus:border-[#0B1B4A]/25 focus:ring-2 focus:ring-[#0B1B4A]/18"
                  )}
                />
              </Field>

              {!isValid && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] font-semibold text-amber-900">
                  {lang === "fr"
                    ? "Veuillez remplir les champs obligatoires (*) avant d’envoyer."
                    : "Please fill all required fields (*) before sending."}
                </div>
              )}
            </div>

            <div className="mt-auto pt-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={isValid ? waHref : undefined}
                  onClick={(e) => {
                    if (!isValid) e.preventDefault();
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!isValid}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl",
                    "bg-[#F47B20] text-[#0B1B4A]",
                    "text-[13.5px] font-extrabold",
                    "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                    "transition hover:brightness-110",
                    !isValid && "opacity-60 cursor-not-allowed hover:brightness-100"
                  )}
                >
                  <IconWhatsApp className="h-4 w-4" />
                  {lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
                </a>

                <a
                  href={emailHref}
                  className={cn(
                    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl",
                    "bg-[#0B1B4A] text-white",
                    "text-[13.5px] font-extrabold",
                    "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                    "transition hover:brightness-110"
                  )}
                >
                  <IconMail className="h-4 w-4" />
                  {lang === "fr" ? "Email (prérempli)" : "Email (prefilled)"}
                </a>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-[12px] text-slate-600 shadow-[0_10px_26px_rgba(2,6,23,.05)] backdrop-blur">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <IconMail className="h-4 w-4 text-[#F47B20]" />
                    {EMAIL_TO}
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <IconPhone className="h-4 w-4 text-[#F47B20]" />
                    {PHONE_DISPLAY}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-center text-[12px] text-slate-600">
                {lang === "fr" ? "📍 Quatre Bornes • Devis / Intervention" : "📍 Quatre Bornes • Quote / Intervention"}
              </p>
            </div>
          </div>
        </article>
      </section>
    </PageWrap>
  );
}
