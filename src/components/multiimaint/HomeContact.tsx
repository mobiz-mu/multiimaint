// src/components/multiimaint/HomeContact.tsx
"use client";

import React, { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";

const WA_NUMBER = "23057160579";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

// ✅ Email
const EMAIL_TO = "info@multiimaint.com";

// ✅ Your exact Google Maps location (opens Maps app)
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/g5Sk5pDKdDUYPV337";

// Quatre Bornes (approx) for embed
const QB_LAT = -20.2646;
const QB_LNG = 57.4792;
const GOOGLE_MAPS_EMBED = `https://www.google.com/maps?q=${QB_LAT},${QB_LNG}&z=15&output=embed`;

function waLink(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

type Lang = "fr" | "en";
type ServiceKey = "maintenance" | "cleaning" | "facility" | "gardening" | "other";

/* =========================
   Real SVG icons
========================= */
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
      <path
        d="M10 21v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 7h.01M12 7h.01M15 7h.01M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M7 17.2 6 22l4.9-1A9.6 9.6 0 1 0 7 17.2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M9.8 10.2c.2-.5.3-.5.6-.5h.5c.1 0 .3.1.4.3l.6 1.4c.1.2.1.3 0 .5l-.3.5c-.1.2-.2.4 0 .6.2.2.7.8 1.5 1.3.8.5 1.4.7 1.7.8.2.1.4 0 .6-.2l.5-.6c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.3.3.5 0 .8-.4 1.6-1.1 2-.5.3-1.2.5-2.5.2-1.5-.4-3.1-1.4-4.3-2.6-1.2-1.2-2.1-2.7-2.5-4.1-.3-1.2-.1-1.8.2-2.3Z"
        fill="currentColor"
        opacity=".92"
      />
    </svg>
  );
}
function IconSend({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeContact() {
  const { lang } = useLang() as { lang: Lang };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [service, setService] = useState<ServiceKey>("maintenance");
  const [message, setMessage] = useState("");

  const t = useMemo(() => {
    const fr = lang === "fr";
    return {
      badge: fr ? "CONTACT PREMIUM" : "PREMIUM CONTACT",
      title: fr ? "Contact" : "Contact",
      intro: fr
        ? "Basés à Quatre Bornes, nous intervenons partout à l’Île Maurice. Réponse rapide via WhatsApp."
        : "Based in Quatre Bornes, we serve all of Mauritius. Fast reply via WhatsApp.",
      leftTitle: "MultiiMaint Ltd",
      leftSub: fr
        ? "Maintenance, nettoyage & facility management — standards corporate."
        : "Maintenance, cleaning & facility management — corporate standards.",
      maps: "Maps",
      phoneLabel: fr ? "Téléphone / WhatsApp" : "Phone / WhatsApp",
      emailLabel: "Email",
      addressLabel: fr ? "Adresse" : "Address",
      addressValue: fr ? "Quatre Bornes, Île Maurice" : "Quatre Bornes, Mauritius",
      mapHint: fr ? "📍 Interventions partout à Maurice." : "📍 Service across Mauritius.",

      rightTitle: fr ? "Demande rapide" : "Quick request",
      rightSub: fr ? "Remplissez le minimum — message prêt à envoyer." : "Fill the minimum — message ready to send.",
      fast: fr ? "Réponse rapide" : "Fast reply",

      fName: fr ? "Nom / Entreprise *" : "Name / Company *",
      fAddress: fr ? "Adresse (Ville / Quartier) *" : "Address (City / Area) *",
      fPhone: fr ? "Numéro de contact *" : "Contact number *",
      fEmail: fr ? "Adresse email *" : "Email address *",
      fService: fr ? "Service" : "Service",
      fMsg: fr ? "Message (optionnel)" : "Message (optional)",

      phName: fr ? "Ex: ABC Ltd / Votre nom" : "E.g., ABC Ltd / Your name",
      phAddress: fr ? "Ex: Quatre Bornes / Port Louis..." : "E.g., Quatre Bornes / Port Louis...",
      phPhone: fr ? "Ex: +230 5XXX XXXX" : "E.g., +230 5XXX XXXX",
      phEmail: fr ? "Ex: you@email.com" : "E.g., you@email.com",
      phMsg: fr ? "Ex: Besoin intervention aujourd’hui / devis..." : "E.g., Need intervention today / quote...",

      waBtn: "WhatsApp",
      emailBtn: fr ? "Email (prérempli)" : "Email (prefilled)",
      requiredNote: fr ? "Champs obligatoires : nom, adresse, contact, email." : "Required: name, address, contact, email.",

      seo: fr
        ? "Contact MultiiMaint Ltd à Quatre Bornes, Île Maurice : Maintenance et réparation, nettoyage professionnel, facility management, jardinage. Devis rapide via WhatsApp."
        : "Contact MultiiMaint Ltd in Quatre Bornes, Mauritius: maintenance & repair, professional cleaning, facility management, gardening. Fast quotes via WhatsApp.",
    };
  }, [lang]);

  const serviceOptions = useMemo(() => {
    const fr = lang === "fr";
    return fr
      ? [
          { v: "maintenance" as const, t: "Maintenance et Réparations" }, // ✅ renamed
          { v: "cleaning" as const, t: "Nettoyage professionnel" },
          { v: "facility" as const, t: "Facility Management" },
          { v: "gardening" as const, t: "Jardinage (intérieur & extérieur)" },
          { v: "other" as const, t: "Autres" },
        ]
      : [
          { v: "maintenance" as const, t: "Maintenance & Repairs" },
          { v: "cleaning" as const, t: "Professional Cleaning" },
          { v: "facility" as const, t: "Facility Management" },
          { v: "gardening" as const, t: "Gardening (Indoor & Outdoor)" },
          { v: "other" as const, t: "Other" },
        ];
  }, [lang]);

  const serviceLabel = useMemo(() => serviceOptions.find((x) => x.v === service)?.t ?? serviceOptions[0].t, [service, serviceOptions]);

  const prefixTitle = useMemo(
    () => (lang === "fr" ? "Demande — MultiiMaint (Site Web)" : "Request — MultiiMaint (Website)"),
    [lang]
  );

  const isEmailValid = useMemo(() => {
    const v = email.trim();
    if (!v) return false;
    // simple safe pattern (no over-blocking)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }, [email]);

  const isPhoneValid = useMemo(() => {
    const v = phone.trim();
    if (!v) return false;
    // allow +, spaces, digits
    return v.replace(/[^\d]/g, "").length >= 7;
  }, [phone]);

  const isFormValid = useMemo(() => {
    return name.trim().length >= 2 && address.trim().length >= 3 && isPhoneValid && isEmailValid;
  }, [name, address, isPhoneValid, isEmailValid]);

  const waBody = useMemo(() => {
    const fr = lang === "fr";
    const lines = [
      `👋 ${fr ? "Bonjour MultiiMaint" : "Hello MultiiMaint"}`,
      "",
      `🧾 ${fr ? "Demande" : "Request"}: ${serviceLabel}`,
      `👤 ${fr ? "Nom" : "Name"}: ${name.trim() || "-"}`,
      `📍 ${fr ? "Adresse" : "Address"}: ${address.trim() || "-"}`,
      `📞 ${fr ? "Contact" : "Contact"}: ${phone.trim() || "-"}`,
      `✉️ Email: ${email.trim() || "-"}`,
      message.trim() ? "" : null,
      message.trim() ? `💬 ${fr ? "Message" : "Message"}: ${message.trim()}` : null,
      "",
      `— ${prefixTitle}`,
    ].filter(Boolean) as string[];
    return lines.join("\n");
  }, [lang, serviceLabel, name, address, phone, email, message, prefixTitle]);

  const emailHref = useMemo(() => {
    const subject = prefixTitle;
    const body = waBody;
    return `mailto:${EMAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [prefixTitle, waBody]);

  function sendToWhatsApp() {
    if (!isFormValid) return;
    window.open(waLink(waBody), "_blank", "noopener,noreferrer");
  }

  function openEmailPrefilled() {
    if (!isFormValid) return;
    window.location.href = emailHref;
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="grid gap-2">
      <span className="text-[12px] font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );

  const inputBase = cn(
    "h-11 w-full rounded-2xl px-4 text-[13px] text-slate-900",
    "border border-slate-200 bg-white",
    "shadow-[0_10px_24px_rgba(2,6,23,.04)]",
    "outline-none transition",
    "focus:border-[#0B1B4A]/25 focus:ring-2 focus:ring-[#0B1B4A]/18"
  );

  const textareaBase = cn(
    "w-full rounded-2xl p-4 text-[13px] text-slate-900 resize-none overflow-hidden",
    "border border-slate-200 bg-white",
    "shadow-[0_10px_24px_rgba(2,6,23,.04)]",
    "outline-none transition",
    "focus:border-[#0B1B4A]/25 focus:ring-2 focus:ring-[#0B1B4A]/18"
  );

  return (
    <section id="contact" className={cn("relative bg-white", "pt-6 pb-10 md:pt-8 md:pb-12")} aria-labelledby="contact-title">
      {/* Clean premium background (no extra blank space) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute -top-56 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl animate-[mm_floatCenter_12s_ease-in-out_infinite]" />
        <div className="absolute -bottom-64 left-[10%] h-[680px] w-[680px] rounded-full bg-[#0B1B4A]/7 blur-3xl animate-[mm_float2_14s_ease-in-out_infinite]" />
        <div className="absolute -bottom-64 right-[8%] h-[640px] w-[640px] rounded-full bg-[#F47B20]/8 blur-3xl animate-[mm_float3_13s_ease-in-out_infinite]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F47B20]/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0B1B4A]/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 ring-1 ring-slate-200 shadow-[0_12px_26px_rgba(2,6,23,.06)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
              <span className="text-[12px] font-extrabold tracking-[0.18em] text-[#0B1B4A]">{t.badge}</span>
            </div>

            <h2 id="contact-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {t.intro}
            </p>
          </div>
        </Reveal>

        {/* ✅ Equal cards (same width/height) + mobile-first */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2 items-stretch">
          {/* LEFT CARD */}
          <Reveal>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-[28px] bg-white",
                "border border-slate-200/80",
                "shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_28px_85px_rgba(2,6,23,.12)]"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,123,32,.10),transparent_58%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(11,27,74,.06),transparent_58%)]" />
              </div>

              <div className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0B1B4A] text-white shadow-[0_14px_30px_rgba(11,27,74,.16)]">
                        <IconBuilding className="h-5 w-5" />
                      </span>
                      <h3 className="truncate text-[16px] font-extrabold tracking-tight text-slate-900">{t.leftTitle}</h3>
                    </div>

                    <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{t.leftSub}</p>
                  </div>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "shrink-0 inline-flex items-center gap-2 rounded-2xl px-4 py-2",
                      "bg-white text-[#0B1B4A]",
                      "border border-slate-200",
                      "text-[12px] font-extrabold",
                      "shadow-[0_10px_24px_rgba(2,6,23,.06)]",
                      "transition hover:-translate-y-[1px] hover:shadow-[0_14px_34px_rgba(2,6,23,.10)]",
                      "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/20"
                    )}
                    aria-label={lang === "fr" ? "Ouvrir sur Google Maps" : "Open on Google Maps"}
                  >
                    <IconPin className="h-4 w-4 text-[#F47B20]" />
                    {t.maps}
                  </a>
                </div>

                <dl className="mt-4 grid gap-3 text-[13px] text-slate-700">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-slate-500">
                      <IconPhone className="h-4 w-4 text-[#0B1B4A]" />
                      {t.phoneLabel}
                    </dt>
                    <dd className="font-extrabold text-[#0B1B4A]">
                      <a
                        href={waLink(lang === "fr" ? "Bonjour MultiiMaint 👋 Je souhaite un devis svp." : "Hello MultiiMaint 👋 I need a quote please.")}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        +230 5716 0579
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-slate-500">
                      <IconMail className="h-4 w-4 text-[#0B1B4A]" />
                      {t.emailLabel}
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
                      {t.addressLabel}
                    </dt>
                    <dd className="font-semibold text-slate-800">{t.addressValue}</dd>
                  </div>
                </dl>

                {/* ✅ Map slightly longer (no internal scrollbars) */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(2,6,23,.06)]">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={lang === "fr" ? "Voir MultiiMaint sur Google Maps" : "View MultiiMaint on Google Maps"}
                    className="relative block"
                  >
                    <div className="relative h-[330px] w-full sm:h-[380px]">
                      <iframe
                        title="MultiiMaint Ltd — Quatre Bornes map"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={GOOGLE_MAPS_EMBED}
                        className="absolute inset-0 h-full w-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                      <div className="pointer-events-none absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-slate-200 shadow-[0_12px_28px_rgba(2,6,23,.10)] backdrop-blur">
                        <IconPin className="h-4 w-4 text-[#F47B20]" />
                        {lang === "fr" ? "Ouvrir la localisation" : "Open location"}
                      </div>
                    </div>
                  </a>

                  <div className="px-4 py-3 text-[12px] text-slate-600">{t.mapHint}</div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* RIGHT CARD */}
          <Reveal delay={0.06}>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-[28px] bg-white",
                "border border-slate-200/80",
                "shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_28px_85px_rgba(2,6,23,.12)]"
              )}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#0B1B4A] to-[#F47B20]" />
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(11,27,74,.09),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(244,123,32,.10),transparent_60%)]" />
              </div>

              <div className="flex h-full flex-col p-6 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#F47B20] text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.18)]">
                        <IconSend className="h-5 w-5" />
                      </span>
                      <h3 className="truncate text-[16px] font-extrabold tracking-tight text-slate-900">{t.rightTitle}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{t.rightSub}</p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-[12px] font-semibold text-slate-600">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    {t.fast}
                  </div>
                </div>

                <div className="mt-4 grid gap-4">
                  {/* ✅ 2-column on desktop, 1-column mobile */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t.fName}>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.phName}
                        autoComplete="name"
                        className={inputBase}
                        required
                      />
                    </Field>

                    <Field label={t.fPhone}>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phPhone}
                        autoComplete="tel"
                        inputMode="tel"
                        className={inputBase}
                        required
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t.fEmail}>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.phEmail}
                        autoComplete="email"
                        inputMode="email"
                        className={inputBase}
                        required
                      />
                    </Field>

                    <Field label={t.fService}>
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
                  </div>

                  <Field label={t.fAddress}>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={t.phAddress}
                      autoComplete="street-address"
                      className={inputBase}
                      required
                    />
                  </Field>

                  {/* ✅ Short, no scrollbars: auto-grow textarea + max length */}
                  <Field label={t.fMsg}>
                    <AutoGrowTextarea value={message} onChange={setMessage} placeholder={t.phMsg} className={textareaBase} maxLength={420} />
                  </Field>
                </div>

                <div className="mt-auto pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={sendToWhatsApp}
                      disabled={!isFormValid}
                      aria-label={lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl",
                        "bg-[#F47B20] text-[#0B1B4A]",
                        "text-[13px] font-extrabold",
                        "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                        "transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.30)]",
                        "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/20",
                        "disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_14px_30px_rgba(244,123,32,.22)]"
                      )}
                    >
                      <IconWhatsApp className="h-4 w-4" />
                      {t.waBtn}
                    </button>

                    <button
                      type="button"
                      onClick={openEmailPrefilled}
                      disabled={!isFormValid}
                      aria-label={lang === "fr" ? "Envoyer un email prérempli" : "Send a prefilled email"}
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl",
                        "bg-[#0B1B4A] text-white",
                        "text-[13px] font-extrabold",
                        "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                        "transition hover:-translate-y-[1px] hover:brightness-110",
                        "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25",
                        "disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100"
                      )}
                    >
                      <IconMail className="h-4 w-4" />
                      {t.emailBtn}
                    </button>
                  </div>

                  <div className="mt-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-[12px] text-slate-600 shadow-[0_10px_26px_rgba(2,6,23,.05)] backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <IconMail className="h-4 w-4 text-[#F47B20]" />
                        {EMAIL_TO}
                      </span>
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <IconPhone className="h-4 w-4 text-[#F47B20]" />
                        +230 5716 0579
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">{t.requiredNote}</div>
                  </div>

                  {/* ✅ SEO (short, clean) */}
                  <p className="sr-only">{t.seo}</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Extra SEO (short) */}
        <p className="sr-only">
          {lang === "fr"
            ? "MultiiMaint Ltd Maurice — Maintenance et réparation, nettoyage professionnel, facility management, jardinage. Contact WhatsApp rapide."
            : "MultiiMaint Ltd Mauritius — Maintenance & repair, professional cleaning, facility management, gardening. Fast WhatsApp contact."}
        </p>
      </div>
    </section>
  );
}

/* =========================
   Auto-grow textarea (no scrollbars)
========================= */
function AutoGrowTextarea({
  value,
  onChange,
  placeholder,
  className,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  maxLength?: number;
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      rows={3}
      className={cn(className)}
      onChange={(e) => onChange(e.target.value)}
      onInput={(e) => {
        const el = e.currentTarget;
        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, 220) + "px";
      }}
    />
  );
}
