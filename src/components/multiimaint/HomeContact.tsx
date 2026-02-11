"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

const WA_NUMBER = "23057160579";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

// Quatre Bornes (approx center)
const QB_LAT = -20.2646;
const QB_LNG = 57.4792;

function waLink(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function HomeContact() {
  const { lang } = useLang();
  const c = copy(lang);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const header = useMemo(() => {
    return {
      h: lang === "fr" ? "Contact" : "Contact",
      p:
        lang === "fr"
          ? "Basés à Quatre Bornes, nous intervenons partout à l’île Maurice. Demandez un devis ou une intervention — réponse rapide via WhatsApp."
          : "Based in Quatre Bornes, we work across Mauritius. Request a quote or an intervention — fast reply via WhatsApp.",
    };
  }, [lang]);

  const company = useMemo(
    () => ({
      name: "MultiiMaint Ltd",
      phoneLabel: lang === "fr" ? "Téléphone / WhatsApp" : "Phone / WhatsApp",
      phone: "+230 5716 0579",
      emailLabel: "Email",
      email: "support@multiimaint.com",
      addressLabel: lang === "fr" ? "Adresse" : "Address",
      address: lang === "fr" ? "Quatre Bornes, Île Maurice" : "Quatre Bornes, Mauritius",
    }),
    [lang]
  );

  function sendToWhatsApp() {
    const prefix =
      lang === "fr"
        ? `Bonjour MultiiMaint 👋\n\nJe souhaite un devis / une intervention.\n\n`
        : `Hello MultiiMaint 👋\n\nI would like a quote / an intervention.\n\n`;

    const body =
      `${lang === "fr" ? "Nom" : "Name"}: ${name.trim() || "-"}\n` +
      `${lang === "fr" ? "Adresse" : "Address"}: ${address.trim() || "-"}\n\n` +
      `${lang === "fr" ? "Message" : "Message"}: ${message.trim() || "-"}`;

    window.open(waLink(prefix + body), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="relative py-16 md:py-20">
      {/* premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/14 blur-3xl animate-[mm_floatCenter_11s_ease-in-out_infinite]" />
        <div className="absolute -bottom-56 left-[10%] h-[640px] w-[640px] rounded-full bg-red-500/10 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
        <div className="absolute -bottom-56 right-[10%] h-[600px] w-[600px] rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_float3_12s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* header centered */}
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {header.h}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {header.p}
            </p>
          </div>
        </Reveal>

        {/* equal containers */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* left: company + map */}
          <Reveal>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl",
                "border border-white/40 bg-white/50 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]"
              )}
            >
              {/* navy top line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#0B1B4A] via-[#0B1B4A]/80 to-transparent opacity-95" />
              <div className="flex h-full flex-col p-7">
                <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">
                  {company.name}
                </h3>

                <dl className="mt-5 grid gap-3 text-[13px] text-slate-700">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{company.phoneLabel}</dt>
                    <dd className="font-extrabold text-[#0B1B4A]">
                      <a
                        href={waLink(
                          lang === "fr"
                            ? "Bonjour MultiiMaint 👋 Mo bizin ene quotation svp."
                            : "Hello MultiiMaint 👋 I need a quotation please."
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {company.phone}
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{company.emailLabel}</dt>
                    <dd className="font-extrabold text-[#0B1B4A]">
                      <a href={`mailto:${company.email}`} className="hover:underline">
                        {company.email}
                      </a>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-slate-500">{company.addressLabel}</dt>
                    <dd className="font-semibold text-slate-800">{company.address}</dd>
                  </div>
                </dl>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/40 bg-white/40">
                  <div className="relative h-[240px] w-full">
                    <iframe
                      title="Quatre Bornes map"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${QB_LAT},${QB_LNG}&z=14&output=embed`}
                      className="absolute inset-0 h-full w-full"
                    />

                    {/* bouncing pin */}
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%]">
                      <div className="relative">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/75 backdrop-blur ring-1 ring-white/60 shadow-[0_10px_25px_rgba(2,6,23,.20)] animate-[mm_pin_1.4s_ease-in-out_infinite]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                              d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
                              stroke="#F47B20"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                              stroke="#0B1B4A"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <div className="mx-auto mt-2 h-2.5 w-8 rounded-full bg-black/15 blur-[1px] animate-[mm_shadow_1.4s_ease-in-out_infinite]" />
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-[12px] text-slate-600">
                    {lang === "fr" ? "📍 Quatre Bornes — service partout à Maurice." : "📍 Quatre Bornes — service across Mauritius."}
                  </div>
                </div>

                <div className="mt-auto h-1" />
              </div>
            </article>
          </Reveal>

          {/* right: form -> WhatsApp ONLY one button SEND */}
          <Reveal delay={0.06}>
            <article
              className={cn(
                "relative h-full overflow-hidden rounded-3xl",
                "border border-white/40 bg-white/50 backdrop-blur-xl",
                "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]"
              )}
            >
              {/* orange top line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />

              <div className="flex h-full flex-col p-7">
                <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">
                  {lang === "fr" ? "Demande rapide (WhatsApp)" : "Quick request (WhatsApp)"}
                </h3>

                <p className="mt-2 text-[13px] leading-relaxed text-slate-700">
                  {lang === "fr"
                    ? "Remplissez 3 champs — WhatsApp s’ouvre avec votre message prêt à envoyer."
                    : "Fill 3 fields — WhatsApp opens with your message ready to send."}
                </p>

                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-[12px] font-semibold text-slate-600">{lang === "fr" ? "Nom" : "Name"}</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === "fr" ? "Votre nom / entreprise" : "Your name / company"}
                      autoComplete="name"
                      className="h-11 rounded-2xl border border-white/50 bg-white/70 px-4 text-[13px] text-slate-900 outline-none backdrop-blur focus:ring-2 focus:ring-slate-300"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[12px] font-semibold text-slate-600">{lang === "fr" ? "Adresse" : "Address"}</span>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={lang === "fr" ? "Ville / quartier" : "City / area"}
                      autoComplete="street-address"
                      className="h-11 rounded-2xl border border-white/50 bg-white/70 px-4 text-[13px] text-slate-900 outline-none backdrop-blur focus:ring-2 focus:ring-slate-300"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-[12px] font-semibold text-slate-600">{lang === "fr" ? "Message" : "Message"}</span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={lang === "fr" ? "Ex: Nettoyage bureaux, 2x/semaine. Besoin devis." : "Ex: Office cleaning, 2x/week. Need a quote."}
                      className="min-h-[160px] rounded-2xl border border-white/50 bg-white/70 p-4 text-[13px] text-slate-900 outline-none backdrop-blur focus:ring-2 focus:ring-slate-300"
                    />
                  </label>
                </div>

                <div className="mt-auto pt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={sendToWhatsApp}
                    aria-label={lang === "fr" ? "Envoyer sur WhatsApp" : "Send on WhatsApp"}
                    className={cn(
                      "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-8",
                      "bg-[#F47B20] text-[#0B1B4A] text-[13px] font-extrabold",
                      "shadow-[0_14px_30px_rgba(244,123,32,.30)]",
                      "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.40)]",
                      "focus:outline-none focus:ring-2 focus:ring-slate-400",
                      "animate-[mm_buzz_1.8s_ease-in-out_infinite]"
                    )}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M7 17.2 6 22l4.9-1a9.5 9.5 0 1 0-3.9-3.8Z"
                        stroke="#0B1B4A"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.8 10.2c.2-.5.3-.5.6-.5h.5c.1 0 .3.1.4.3l.6 1.4c.1.2.1.3 0 .5l-.3.5c-.1.2-.2.4 0 .6.2.2.7.8 1.5 1.3.8.5 1.4.7 1.7.8.2.1.4 0 .6-.2l.5-.6c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.3.3.5 0 .8-.4 1.6-1.1 2-.5.3-1.2.5-2.5.2-1.5-.4-3.1-1.4-4.3-2.6-1.2-1.2-2.1-2.7-2.5-4.1-.3-1.2-.1-1.8.2-2.3Z"
                        fill="#0B1B4A"
                        opacity=".9"
                      />
                    </svg>
                    {lang === "fr" ? "Envoyer" : "Send"}
                  </button>
                </div>

                <p className="mt-3 text-center text-[12px] text-slate-600">
                  {lang === "fr"
                    ? "✅ Conseil + devis rapide • 📍 Quatre Bornes • 🧰 Maintenance & Nettoyage"
                    : "✅ Fast advice + quote • 📍 Quatre Bornes • 🧰 Maintenance & Cleaning"}
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <p className="sr-only">
          {lang === "fr"
            ? "Contact MultiiMaint Ltd à Quatre Bornes, Île Maurice. Maintenance, nettoyage professionnel et facility management partout à Maurice."
            : "Contact MultiiMaint Ltd in Quatre Bornes, Mauritius. Maintenance, professional cleaning and facility management across Mauritius."}
        </p>
      </div>
    </section>
  );
}


