"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function Footer() {
  const { lang } = useLang();
  const c = copy(lang);

  // ✅ same as Header
  const WA_PHONE = "23057160579";
  const [phone, setPhone] = useState("");

  const pages = useMemo(
    () => ({
      home: "/",
      services: "/services",
      shop: "/shop",
      about: "/about",
      blog: "/blog",
      contact: "/contact",
    }),
    []
  );

  // Quick links (same menu items)
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

  // Your services list (same as your home services)
  const services = useMemo(() => c.services.map((s) => s.t), [c.services]);

  // Policies (create pages later; for now anchors)
  const policies = useMemo(
    () => [
      { label: lang === "fr" ? "Politique de Confidentialite" : "Privacy Policy", href: "/policies/privacy" },
      { label: lang === "fr" ? "Conditions Generales" : "Terms & Conditions", href: "/policies/terms" },
      { label: lang === "fr" ? "Politique de Remboursement" : "Refund Policy", href: "/policies/refund" },
      { label: lang === "fr" ? "Cookies" : "Cookie Policy", href: "/policies/cookies" },
    ],
    [lang]
  );

  const socials = useMemo(
    () => [
      { src: "/socialmedia/facebook.png", alt: "Facebook", href: "#" },
      { src: "/socialmedia/instagram.png", alt: "Instagram", href: "#" },
      { src: "/socialmedia/tiktok.png", alt: "TikTok", href: "#" },
      { src: "/socialmedia/linkedin.png", alt: "LinkedIn", href: "#" },
    ],
    []
  );

  function sanitizePhone(v: string) {
    // keep digits only
    return v.replace(/[^\d]/g, "").slice(0, 16);
  }

  function submitCallback() {
    const num = sanitizePhone(phone);
    if (!num) return;

    const msg =
      lang === "fr"
        ? `Bonjour MultiiMaint, merci de me rappeler. Mon numero: ${num}`
        : `Hello MultiiMaint, please call me back. My number: ${num}`;

    const link = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(link, "_blank", "noreferrer");
    setPhone("");
  }

  return (
    <footer className="relative overflow-hidden bg-[#0B1B4A] text-white">
      {/* Premium background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[920px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
        <div className="absolute -bottom-40 right-[-80px] h-[380px] w-[520px] rounded-full bg-[#F47B20]/18 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.08),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* 1) Quick Links */}
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
          </div>

          {/* 2) Our Services */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "NOS SERVICES" : "OUR SERVICES"}
            </div>

            <ul className="grid gap-2">
              {services.map((t) => (
                <li key={t} className="text-[14px] font-semibold text-white/80">
                  <span className="mr-2 text-[#F47B20]">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* 3) Company Policies */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "POLITIQUES" : "COMPANY POLICIES"}
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

            <div className="mt-5 text-[13px] text-white/65">
              {lang === "fr"
                ? "Besoin d'aide? Ecrivez-nous sur WhatsApp - reponse rapide."
                : "Need help? Message us on WhatsApp - fast response."}
            </div>
          </div>

          {/* 4) Request a Callback + Social */}
          <div>
            <div className="mb-4 text-[13px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "DEMANDER UN RAPPEL" : "REQUEST A CALLBACK"}
            </div>

            {/* Glass container */}
            <div
              className={cn(
                "rounded-2xl border border-white/15 bg-white/10 p-4 shadow-[0_18px_55px_rgba(0,0,0,.28)]",
                "backdrop-blur-xl"
              )}
            >
              <div className="text-[13px] font-semibold text-white/80">
                {lang === "fr"
                  ? "Entrez votre numero et nous vous rappelons."
                  : "Enter your number and we will call you back."}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={phone}
                  onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                  placeholder={lang === "fr" ? "Votre numero" : "Your number"}
                  inputMode="tel"
                  className={cn(
                    "h-11 w-full rounded-xl bg-white/10 px-3 text-[14px] font-bold text-white placeholder:text-white/45",
                    "ring-1 ring-white/15 outline-none",
                    "focus:ring-2 focus:ring-[#F47B20]/55"
                  )}
                />

                <button
                  type="button"
                  onClick={submitCallback}
                  className={cn(
                    "h-11 shrink-0 rounded-xl px-4 text-[13px] font-extrabold text-[#0B1B4A]",
                    "bg-[#F47B20] shadow-[0_14px_30px_rgba(244,123,32,.28)]",
                    "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.38)]",
                    "focus:outline-none focus:ring-2 focus:ring-white/40"
                  )}
                >
                  {lang === "fr" ? "Envoyer" : "Send"}
                </button>
              </div>

              {/* Follow us */}
              <div className="mt-5">
                <div className="text-[12px] font-extrabold tracking-widest text-white/70">
                  {lang === "fr" ? "SUIVEZ-NOUS" : "FOLLOW US"}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.alt}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.alt}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white/10 ring-1 ring-white/18 backdrop-blur hover:bg-white/16 transition"
                    >
                      <Image src={s.src} alt={s.alt} width={20} height={20} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA link */}
            <a
              href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                lang === "fr" ? "Bonjour MultiiMaint, je souhaite un devis." : "Hello MultiiMaint, I would like a quote."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-5 py-3 text-[14px] font-extrabold text-white ring-1 ring-white/15 hover:bg-white/14 transition"
            >
              {c.nav.cta}
            </a>
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
                <span
                  className={cn(
                    "inline-flex h-5 w-5 items-center justify-center",
                    "animate-[mm_pulse_1.2s_ease-in-out_infinite]"
                  )}
                  aria-hidden="true"
                >
                  ❤️
                </span>
              </a>
            </div>

            <div className="text-[12px] text-white/55">
              {lang === "fr" ? "Premium maintenance & facility services a Maurice." : "Premium maintenance & facility services in Mauritius."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

