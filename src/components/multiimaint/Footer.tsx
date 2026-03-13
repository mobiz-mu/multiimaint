"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================
   Icons
========================= */
function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="m13 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
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
        d="M22 16.9v3a2 2 0 0 1-2.2 2c-9.7-.7-17.5-8.5-18.2-18.2A2 2 0 0 1 3.6 1.5h3a2 2 0 0 1 2 1.7l.6 3a2 2 0 0 1-.6 1.8l-1.2 1.2a16 16 0 0 0 6.8 6.8l1.2-1.2a2 2 0 0 1 1.8-.6l3 .6a2 2 0 0 1 1.7 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** ✅ Real WhatsApp icon (solid + instantly recognizable) */
function IconWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.52 3.48A11.78 11.78 0 0 0 12.02 0C5.4 0 .02 5.38.02 12c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.6A11.9 11.9 0 0 0 12.02 24C18.64 24 24 18.62 24 12c0-3.2-1.25-6.21-3.48-8.52ZM12.02 21.8c-1.91 0-3.79-.52-5.43-1.49l-.39-.23-3.68.95.98-3.58-.25-.37A9.75 9.75 0 0 1 2.22 12c0-5.41 4.4-9.8 9.8-9.8 2.62 0 5.08 1.02 6.93 2.87A9.74 9.74 0 0 1 21.82 12c0 5.4-4.39 9.8-9.8 9.8Zm5.69-7.32c-.31-.16-1.84-.9-2.12-1-.29-.1-.5-.16-.71.16-.21.31-.81 1-.99 1.2-.18.21-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.84-1.72-2.15-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.7-.97-2.33-.26-.62-.52-.54-.71-.55h-.6c-.21 0-.54.08-.83.39-.29.31-1.09 1.07-1.09 2.61 0 1.54 1.12 3.03 1.28 3.24.16.21 2.2 3.35 5.32 4.7.74.32 1.32.51 1.77.65.74.24 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.29-.21-.6-.36Z"
      />
    </svg>
  );
}

/* =========================
   Footer
========================= */
export default function Footer() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  // WhatsApp
  const WA_PHONE = "23057160579";
  const WA_QUOTE_TEXT =
    lang === "fr"
      ? "Bonjour MultiiMaint 👋 Je souhaite un devis."
      : "Hello MultiiMaint 👋 I would like a quote.";
  const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_QUOTE_TEXT)}`;

  const [phone, setPhone] = useState("");

  // ✅ SAME ROUTES AS HEADER
  const pages = useMemo(
    () => ({
      home: "/",
      services: "/services",
      maintenance: "/services/maintenance",
      cleaning: "/services/cleaning",
      facilities: "/services/facilities-management",
      gardening: "/services/gardening",
      shop: "/shop",
      about: "/about",
      missionVision: "/mission-vision",
      blog: "/blog",
      contact: "/contact",
    }),
    []
  );

  const quickLinks = useMemo(
    () => [
      { label: c.nav.home, href: pages.home },
      { label: c.nav.services, href: pages.services },
      { label: c.nav.shop, href: pages.shop },
      { label: c.nav.about, href: pages.about },
      { label: c.nav.blog, href: pages.blog },
      { label: c.nav.contact, href: pages.contact },
    ],
    [c.nav, pages]
  );

  // ✅ Services direct links (no anchors)
  const services = useMemo(
    () => [
      { t: lang === "fr" ? "Maintenance" : "Maintenance", href: pages.maintenance },
      { t: lang === "fr" ? "Nettoyage" : "Professional Cleaning", href: pages.cleaning },
      { t: lang === "fr" ? "Facilities Management" : "Facilities Management", href: pages.facilities },
      { t: lang === "fr" ? "Jardinage (intérieur & extérieur)" : "Gardening (Indoor & Outdoor)", href: pages.gardening },
    ],
    [lang, pages]
  );

  const policies = useMemo(
    () => [
      { label: lang === "fr" ? "Politique de Confidentialité" : "Privacy Policy", href: "/policies/privacy" },
      { label: lang === "fr" ? "Conditions Générales" : "Terms & Conditions", href: "/policies/terms" },
      { label: lang === "fr" ? "Politique de Remboursement" : "Refund Policy", href: "/policies/refund" },
      { label: lang === "fr" ? "Cookies" : "Cookie Policy", href: "/policies/cookies" },
    ],
    [lang]
  );

  const socials = useMemo(
  () => [
    {
      src: "/socialmedia/facebook.png",
      alt: "Facebook MultiiMaint",
      href: "https://www.facebook.com/MultiiMaint/",
    },
    {
      src: "/socialmedia/instagram.png",
      alt: "Instagram MultiiMaint",
      href: "https://www.instagram.com/multiimaint?utm_source=qr&igsh=a2VoZG1nNmk0cHN6",
    },
    {
      src: "/socialmedia/tiktok.png",
      alt: "TikTok MultiiMaint",
      href: "https://www.tiktok.com/@multiimaint?_r=1&_t=ZS-94ESGmlB1lK",
    },
    {
      src: "/socialmedia/linkedin.png",
      alt: "LinkedIn MultiiMaint",
      href: "https://www.linkedin.com/company/multiimaint/",
    },
    {
      src: "/socialmedia/youtube.png",
      alt: "YouTube MultiiMaint",
      href: "https://youtube.com/@multiimaint?si=jA9QufDEexUg79am",
    },
  ],
  []
);

  function sanitizePhone(v: string) {
    return v.replace(/[^\d]/g, "").slice(0, 16);
  }

  function submitCallback() {
    const num = sanitizePhone(phone);
    if (!num) return;

    const msg =
      lang === "fr"
        ? `Bonjour MultiiMaint 👋 Merci de me rappeler.\nMon numéro: ${num}`
        : `Hello MultiiMaint 👋 Please call me back.\nMy number: ${num}`;

    const link = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(link, "_blank", "noreferrer");
    setPhone("");
  }

  
  return (
  <footer
     className="relative w-full overflow-hidden bg-[#0B1B4A] text-white"
     aria-label={lang === "fr" ? "Pied de page MultiiMaint" : "MultiiMaint footer"}
  >
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-28 left-1/2 h-[440px] w-[90vw] max-w-[980px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
      <div className="absolute -bottom-44 right-0 h-[420px] w-[70vw] max-w-[560px] rounded-full bg-[#F47B20]/18 blur-[95px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.10),transparent_58%)]" />
    </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 md:py-14">
        {/* Top strip: brand + quote */}
        <div className="mb-10 grid gap-5 rounded-[28px] border border-white/12 bg-white/8 p-5 shadow-[0_22px_80px_rgba(0,0,0,.25)] backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center md:p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Image src="/multiimaint-logo.png" alt="MultiiMaint" width={44} height={44} className="h-9 w-9" />
            </div>
            <div>
              <div className="text-[14px] font-extrabold tracking-wide text-white">
                MultiiMaint Ltd
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white/70">
                {lang === "fr"
                  ? "Maintenance • Nettoyage • Facilities • Jardinage — Île Maurice"
                  : "Maintenance • Cleaning • Facilities • Gardening — Mauritius"}
              </div>
            </div>
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3",
              "bg-[#F47B20] text-[#0B1B4A] text-[14px] font-extrabold",
              "shadow-[0_16px_40px_rgba(244,123,32,.32)]",
              "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_22px_55px_rgba(244,123,32,.42)]"
            )}
            aria-label={lang === "fr" ? "Demander un devis sur WhatsApp" : "Request a quote on WhatsApp"}
          >
            <IconWhatsApp className="h-5 w-5" />
            {lang === "fr" ? "Demander un devis" : "Request a quote"}
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          {/* Quick Links */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "LIENS RAPIDES" : "QUICK LINKS"}
            </div>

            <ul className="grid gap-2">
              {quickLinks.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 hover:text-white transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35 group-hover:bg-[#F47B20] transition" />
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 text-[12px] leading-relaxed text-white/60">
              {lang === "fr"
                ? "Service premium, sécurité, suivi et reporting — pour entreprises et particuliers."
                : "Premium service, safety, follow-up and reporting — for businesses and homes."}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "NOS SERVICES" : "OUR SERVICES"}
            </div>

            <ul className="grid gap-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 hover:text-white transition"
                    aria-label={`${lang === "fr" ? "Service" : "Service"}: ${s.t}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35 group-hover:bg-[#F47B20] transition" />
                    <span>{s.t}</span>
                    <IconArrow className="ml-1 h-4 w-4 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-[2px]" />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={pages.services}
              className="mt-4 inline-flex items-center gap-2 text-[13px] font-extrabold text-white/85 hover:text-white transition"
            >
              {lang === "fr" ? "Voir tous les services" : "View all services"} <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Policies */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "POLITIQUES" : "POLICIES"}
            </div>

            <ul className="grid gap-2">
              {policies.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="group inline-flex items-center gap-2 text-[14px] font-semibold text-white/80 hover:text-white transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35 group-hover:bg-[#F47B20] transition" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 text-[12px] text-white/60">
              {lang === "fr"
                ? "Besoin d’aide ? Contact rapide via WhatsApp."
                : "Need help? Fast support via WhatsApp."}
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3",
                "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur",
                "text-[14px] font-extrabold",
                "transition hover:bg-white/14"
              )}
            >
              <IconWhatsApp className="h-5 w-5 text-[#F47B20]" />
              {lang === "fr" ? "WhatsApp support" : "WhatsApp support"}
            </a>
          </div>

          {/* Callback + Social */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "DEMANDER UN RAPPEL" : "REQUEST A CALLBACK"}
            </div>

            <div
              className={cn(
                "rounded-2xl border border-white/15 bg-white/10 p-4",
                "shadow-[0_18px_55px_rgba(0,0,0,.28)]",
                "backdrop-blur-xl"
              )}
            >
              <div className="text-[13px] font-semibold text-white/80">
                {lang === "fr"
                  ? "Entrez votre numéro et nous vous rappelons."
                  : "Enter your number and we will call you back."}
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/55">
                    <IconPhone className="h-4 w-4" />
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                    placeholder={lang === "fr" ? "Votre numéro" : "Your number"}
                    inputMode="tel"
                    className={cn(
                      "h-11 w-full rounded-xl bg-white/10 pl-10 pr-3",
                      "text-[14px] font-bold text-white placeholder:text-white/45",
                      "ring-1 ring-white/15 outline-none",
                      "focus:ring-2 focus:ring-[#F47B20]/55"
                    )}
                  />
                </div>

                <button
                  type="button"
                  onClick={submitCallback}
                  className={cn(
                    "h-11 shrink-0 rounded-xl px-5 text-[13px] font-extrabold text-[#0B1B4A]",
                    "bg-[#F47B20] shadow-[0_14px_30px_rgba(244,123,32,.28)]",
                    "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.38)]",
                    "focus:outline-none focus:ring-2 focus:ring-white/40"
                  )}
                >
                  {lang === "fr" ? "Envoyer" : "Send"}
                </button>
              </div>

              <div className="mt-5">
                <div className="text-[12px] font-extrabold tracking-widest text-white/70">
                  {lang === "fr" ? "SUIVEZ-NOUS" : "FOLLOW US"}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.alt}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.alt}
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-full",
                        "bg-white/10 ring-1 ring-white/18 backdrop-blur",
                        "transition-all duration-300",
                        "hover:bg-white/16 hover:-translate-y-[2px]"
                      )}
                    >
                      <Image src={s.src} alt={s.alt} width={22} height={22} className="h-5 w-5 object-contain" />
                    </a>
                  ))}
                </div>

                <p className="mt-3 text-[12px] text-white/60">
                  {lang === "fr"
                    ? "Conseils maintenance, hygiène & facility management à Maurice."
                    : "Maintenance, hygiene & facilities tips in Mauritius."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/12 pt-6">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="text-[13px] font-semibold text-white/75">
              © {new Date().getFullYear()} MultiiMaint Ltd. {c.footer.rights}
            </div>

            <div className="text-[13px] font-semibold text-white/75">
              {c.footer.built}{" "}
              <a
                href="https://mobiz.mu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-extrabold text-white hover:text-white/90"
              >
                <span>Mobiz.mu</span>
                <span className="inline-flex h-5 w-5 items-center justify-center" aria-hidden="true">
                  ❤️
                </span>
              </a>
            </div>

            <div className="text-[12px] text-white/55">
              {lang === "fr"
                ? "Services premium à Maurice : maintenance, nettoyage, facilities management et jardinage."
                : "Premium services in Mauritius: maintenance, cleaning, facilities management and gardening."}
            </div>
          </div>
        </div>

        <p className="sr-only">
          {lang === "fr"
            ? "Pied de page MultiiMaint : liens rapides, services, politiques, demande de rappel, réseaux sociaux."
            : "MultiiMaint footer: quick links, services, policies, callback request, social media."}
        </p>
      </div>
    </footer>
  );
}
