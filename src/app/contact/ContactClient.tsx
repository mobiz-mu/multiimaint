// src/app/contact/ContactClient.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function ContactClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.contact[lang];

  // ✅ Contact info
  const WA_PHONE = "23057160579";
  const PHONE_DISPLAY = "+230 5716 0579";
  const EMAIL = "support@multiimaint.com";

  // Quatre Bornes (approx) — same as your JSON-LD
  const QB_LAT = -20.2646;
  const QB_LNG = 57.4792;

  // Form
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const waText = useMemo(() => {
    const header =
      lang === "fr"
        ? "Bonjour MultiiMaint 👋"
        : "Hello MultiiMaint 👋";

    const sLabel = lang === "fr" ? "Service" : "Service";
    const nLabel = lang === "fr" ? "Nom" : "Name";
    const mLabel = lang === "fr" ? "Message" : "Message";

    return `${header}\n${nLabel}: ${name || "-"}\n${sLabel}: ${
      service || "-"
    }\n${mLabel}: ${msg || "-"}`;
  }, [lang, name, service, msg]);

  const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waText)}`;

  // ✅ Google Maps embed (fast + no API key)
  const mapSrc = useMemo(() => {
    // center + pin
    const q = `${QB_LAT},${QB_LNG}`;
    return `https://www.google.com/maps?q=${encodeURIComponent(
      q
    )}&z=14&output=embed`;
  }, []);

  // Newsletter (UI-only)
  const [newsEmail, setNewsEmail] = useState("");
  const newsHint =
    lang === "fr"
      ? "Promis : 1–2 messages/mois. Conseils + promos saisonnières."
      : "Promise: 1–2 emails/month. Tips + seasonal offers.";

  return (
    <PageWrap>
      {/* ✅ Premium hero */}
      <PageHero
        kicker={t.kicker}
        title={t.title}
        desc={
          lang === "fr"
            ? "Contactez MultiiMaint — réponses rapides, interventions planifiées et suivi qualité."
            : "Contact MultiiMaint — fast replies, scheduled interventions and quality follow-up."
        }
      />

      {/* ✅ Subtle glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/7 blur-3xl" />
        <div className="absolute -bottom-56 right-[10%] h-[620px] w-[620px] rounded-full bg-[#F47B20]/10 blur-3xl" />
      </div>

      {/* ✅ Quick contact bar */}
      <section className="mt-7">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                {lang === "fr" ? "CONTACT DIRECT" : "DIRECT CONTACT"}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-slate-700">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                  ☎ {PHONE_DISPLAY}
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200 hover:bg-white"
                >
                  ✉ {EMAIL}
                </a>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 ring-1 ring-slate-200">
                  📍 {lang === "fr" ? "Quatre Bornes" : "Quatre Bornes"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-2xl px-6 py-3",
                  "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(244,123,32,.22)]",
                  "transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.30)]"
                )}
              >
                {lang === "fr" ? "WhatsApp (rapide)" : "WhatsApp (fast)"}
              </a>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                {lang === "fr" ? "Voir services" : "View services"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Main grid */}
      <section className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        {/* Left: WhatsApp + form */}
        <div className="grid gap-6">
          {/* WhatsApp card */}
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "WHATSAPP" : "WHATSAPP"}
            </div>

            <h2 className="mt-2 text-[18px] font-extrabold tracking-tight text-slate-900">
              {lang === "fr" ? "Écrivez-nous (le plus rapide)" : "Message us (fastest)"}
            </h2>

            <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
              {lang === "fr"
                ? "Indiquez votre localisation, le service souhaité et votre créneau. Nous répondons rapidement."
                : "Share your location, service needed and preferred time. We reply quickly."}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === "fr" ? "Votre nom" : "Your name"}
                className="h-11 rounded-2xl bg-white px-4 text-[14px] font-semibold text-slate-900 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#F47B20]/45"
              />
              <input
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder={lang === "fr" ? "Service (maintenance, nettoyage…)" : "Service (maintenance, cleaning…)"}
                className="h-11 rounded-2xl bg-white px-4 text-[14px] font-semibold text-slate-900 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#F47B20]/45"
              />
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={lang === "fr" ? "Message (adresse, détails, urgence…)" : "Message (address, details, urgency…)"}
                className="sm:col-span-2 min-h-[130px] rounded-2xl bg-white px-4 py-3 text-[14px] font-semibold text-slate-900 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#F47B20]/45"
              />

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="sm:col-span-2 inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-6 py-3 text-[13px] font-extrabold text-white shadow-[0_16px_50px_rgba(11,27,74,.20)]"
              >
                {lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
              </a>
            </div>

            <div className="mt-4 text-[12px] text-slate-600">
              {lang === "fr"
                ? "Astuce : ajoutez une photo/vidéo sur WhatsApp pour accélérer l’évaluation."
                : "Tip: attach a photo/video in WhatsApp to speed up evaluation."}
            </div>
          </article>

          {/* Newsletter */}
          <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "NEWSLETTER" : "NEWSLETTER"}
            </div>

            <h2 className="mt-2 text-[18px] font-extrabold tracking-tight text-slate-900">
              {lang === "fr" ? "Recevez nos conseils premium" : "Get premium tips"}
            </h2>

            <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
              {lang === "fr"
                ? "Maintenance préventive, hygiène, optimisation des coûts — des idées concrètes pour vos sites."
                : "Preventive maintenance, hygiene, cost optimization — practical ideas for your sites."}
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder={lang === "fr" ? "Votre email" : "Your email"}
                inputMode="email"
                className="h-11 flex-1 rounded-2xl bg-white px-4 text-[14px] font-semibold text-slate-900 ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-[#0B1B4A]/25"
              />
              {/* UI-only CTA (you can wire it later) */}
              <button
                type="button"
                className="h-11 rounded-2xl bg-[#F47B20] px-6 text-[13px] font-extrabold text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.18)] hover:brightness-[1.02]"
              >
                {lang === "fr" ? "S’inscrire" : "Subscribe"}
              </button>
            </div>

            <div className="mt-3 text-[12px] text-slate-600">{newsHint}</div>
          </article>
        </div>

        {/* Right: Map + info */}
        <div className="grid gap-6">
          {/* Map */}
          <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(2,6,23,.06)]">
            <div className="p-6 md:p-8">
              <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">
                {lang === "fr" ? "NOTRE ZONE" : "OUR AREA"}
              </div>
              <h2 className="mt-2 text-[18px] font-extrabold tracking-tight text-slate-900">
                {lang === "fr" ? "Maurice — interventions planifiées" : "Mauritius — scheduled interventions"}
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">
                {lang === "fr"
                  ? "Basés à Quatre Bornes, nous intervenons sur toute l’île selon disponibilité et urgence."
                  : "Based in Quatre Bornes, we cover the whole island depending on availability and urgency."}
              </p>
            </div>

            <div className="relative h-[320px] w-full">
              <iframe
                title="MultiiMaint map"
                src={mapSrc}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-3">
                <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-[12px] font-extrabold tracking-widest text-slate-700">
                    {lang === "fr" ? "SUPPORT" : "SUPPORT"}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-slate-800">
                    <a className="hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                  <div className="mt-1 text-[13px] text-slate-600">
                    {lang === "fr"
                      ? "Email pour documents, contrats, demandes corporate."
                      : "Email for documents, contracts, corporate requests."}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-[12px] font-extrabold tracking-widest text-slate-700">
                    {lang === "fr" ? "TÉLÉPHONE" : "PHONE"}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-slate-800">
                    <a className="hover:underline" href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}>
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="mt-1 text-[13px] text-slate-600">
                    {lang === "fr"
                      ? "Pour planification et urgences (selon disponibilité)."
                      : "For scheduling and urgent cases (subject to availability)."}
                  </div>
                </div>

                <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <div className="text-[12px] font-extrabold tracking-widest text-slate-700">
                    {lang === "fr" ? "HORAIRES" : "HOURS"}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-slate-800">
                    {lang === "fr" ? "Lun–Sam" : "Mon–Sat"} • 08:00–18:00
                  </div>
                  <div className="mt-1 text-[13px] text-slate-600">
                    {lang === "fr" ? "Créneaux flexibles selon contrats." : "Flexible slots depending on contracts."}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <p className="sr-only">
        MultiiMaint contact Mauritius: WhatsApp, email support@multiimaint.com, phone +230 5716 0579, Quatre Bornes.
      </p>
    </PageWrap>
  );
}