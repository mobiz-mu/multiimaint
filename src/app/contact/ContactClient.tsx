"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function ContactClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.contact[lang];

  const WA_PHONE = "23057160579";
  const PHONE_DISPLAY = "+230 5716 0579";
  const EMAIL = "support@multiimaint.com";

  const QB_LAT = -20.2646;
  const QB_LNG = 57.4792;

  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const waText = useMemo(() => {
    const header =
      lang === "fr" ? "Bonjour MultiiMaint 👋" : "Hello MultiiMaint 👋";

    return `${header}
Name: ${name || "-"}
Service: ${service || "-"}
Message: ${msg || "-"}`;
  }, [lang, name, service, msg]);

  const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
    waText
  )}`;

  const mapSrc = `https://www.google.com/maps?q=${QB_LAT},${QB_LNG}&z=14&output=embed`;

  return (
    <PageWrap>
      {/* =========================
          HERO – LUXURY EXECUTIVE
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/28 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="relative z-10 px-6 py-14 md:px-10 md:py-20 text-white">
            <div className="mx-auto max-w-[1200px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {lang === "fr"
                  ? "CONTACT • SUPPORT • INTERVENTIONS"
                  : "CONTACT • SUPPORT • INTERVENTIONS"}
              </div>

              <h1 className="mt-6 text-[36px] font-extrabold md:text-[58px]">
                {t.title}
              </h1>

              <p className="mt-4 max-w-[880px] text-[15px] text-white/85 md:text-[17px]">
                {lang === "fr"
                  ? "Réponses rapides, interventions planifiées et suivi qualité premium."
                  : "Fast replies, scheduled interventions and premium quality follow-up."}
              </p>

              <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          QUICK CONTACT STRIP
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3 text-[14px] font-semibold text-slate-800">
              <span className="rounded-full bg-slate-50 px-5 py-3 ring-1 ring-slate-200">
                ☎ {PHONE_DISPLAY}
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="rounded-full bg-slate-50 px-5 py-3 ring-1 ring-slate-200 hover:bg-white"
              >
                ✉ {EMAIL}
              </a>
              <span className="rounded-full bg-slate-50 px-5 py-3 ring-1 ring-slate-200">
                📍 Quatre Bornes
              </span>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-7 py-4 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_18px_50px_rgba(244,123,32,.30)] hover:brightness-110 transition"
            >
              {lang === "fr" ? "WhatsApp rapide" : "WhatsApp fast"}
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN GRID
      ========================= */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        {/* LEFT – WHATSAPP FORM */}
        <article className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(2,6,23,.06)]">
          <h2 className="text-[20px] font-extrabold text-slate-900">
            {lang === "fr"
              ? "Écrivez-nous via WhatsApp"
              : "Message us via WhatsApp"}
          </h2>

          <div className="mt-6 grid gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "fr" ? "Votre nom" : "Your name"}
              className="h-12 rounded-2xl px-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/40 outline-none"
            />
            <input
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder={lang === "fr" ? "Service souhaité" : "Service needed"}
              className="h-12 rounded-2xl px-4 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/40 outline-none"
            />
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={lang === "fr" ? "Message détaillé" : "Detailed message"}
              className="min-h-[140px] rounded-2xl px-4 py-3 ring-1 ring-slate-200 focus:ring-2 focus:ring-[#F47B20]/40 outline-none"
            />
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#0B1B4A] px-6 py-4 text-[14px] font-extrabold text-white shadow-lg"
            >
              {lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
            </a>
          </div>
        </article>

        {/* RIGHT – MAP + INFO */}
        <article className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,6,23,.06)]">
          <div className="p-8">
            <h2 className="text-[18px] font-extrabold text-slate-900">
              {lang === "fr"
                ? "Notre zone d’intervention"
                : "Our service area"}
            </h2>
            <p className="mt-2 text-[14px] text-slate-700">
              {lang === "fr"
                ? "Basés à Quatre Bornes, nous couvrons toute l’île."
                : "Based in Quatre Bornes, we cover the entire island."}
            </p>
          </div>

          <div className="relative h-[340px] w-full">
            <iframe
              title="MultiiMaint map"
              src={mapSrc}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
            />
          </div>
        </article>
      </section>

      <p className="sr-only">
        MultiiMaint contact Mauritius: WhatsApp, email support@multiimaint.com, phone +230 5716 0579.
      </p>
    </PageWrap>
  );
}