"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Lang = "fr" | "en";
type MenuKey = null | "services" | "shop";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================================
   Premium Animated Language Switcher Pill
========================================= */
function LangSwitcherPill() {
  const { lang, setLang } = useLang() as { lang: Lang; setLang: (l: Lang) => void };
  const isFr = lang === "fr";

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full p-1",
        "bg-white/10 ring-1 ring-white/18 backdrop-blur",
        "shadow-[0_10px_22px_rgba(0,0,0,.18)] select-none"
      )}
      role="group"
      aria-label="Language switcher"
    >
      {/* sliding active bg */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full",
          "bg-white/16 ring-1 ring-white/22 shadow-[0_14px_28px_rgba(0,0,0,.18)]",
          "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
          isFr ? "translate-x-0" : "translate-x-[calc(100%+4px)]"
        )}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute -left-16 top-0 h-full w-24 rotate-12 bg-white/25 blur-[0.5px] animate-[mm_sweep_2.6s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* FR */}
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={cn(
          "relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5",
          "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/55",
          isFr ? "text-white" : "text-white/80 hover:text-white"
        )}
        aria-pressed={isFr}
        aria-label="Français"
      >
        <Image
          src="/flags/fr.png"
          alt="FR"
          width={18}
          height={18}
          className={cn("h-[18px] w-[18px] rounded-full ring-1 ring-white/25", isFr && "animate-[mm_pop_.22s_ease-out]")}
          priority
        />
        <span className="hidden text-xs font-extrabold tracking-wide sm:inline">FR</span>
      </button>

      {/* EN */}
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "relative z-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5",
          "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/55",
          !isFr ? "text-white" : "text-white/80 hover:text-white"
        )}
        aria-pressed={!isFr}
        aria-label="English"
      >
        <Image
          src="/flags/en.png"
          alt="EN"
          width={18}
          height={18}
          className={cn("h-[18px] w-[18px] rounded-full ring-1 ring-white/25", !isFr && "animate-[mm_pop_.22s_ease-out]")}
          priority
        />
        <span className="hidden text-xs font-extrabold tracking-wide sm:inline">EN</span>
      </button>
    </div>
  );
}

export default function Header() {
  const { lang } = useLang() as { lang: Lang };
  const c = copy(lang);

  // ✅ WhatsApp CTA (prefilled message)
  const WA_PHONE = "23057160579";
  const WA_TEXT = "Bonjour Multiimaint , Mo bizin ene quotation , ou kapv aide moi svp , merci ?";
  const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;

  // ✅ Top center slogans (Creole) — rotate
  const slogans = useMemo(
    () => ["😄 Pa stress, nou la pou sa.", "🧼 Nou nettoye. Nou repare. Ou relax.", "⚡ MultiiMaint – To problem, nou solution."],
    []
  );

  const [tickIndex, setTickIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTickIndex((i) => (i + 1) % slogans.length), 2800);
    return () => clearInterval(t);
  }, [slogans.length]);

  // ✅ Menus
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // close delay so moving from button -> panel doesn’t collapse
  const closeTimer = useRef<number | null>(null);
  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  }
  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  const wrapRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // ✅ Routes
  const pages = {
    home: "/",
    services: "/services",
    shop: "/shop",
    about: "/about",
    blog: "/blog",
    contact: "/contact",
  };

  const nav = [
    { label: c.nav.home, href: pages.home },
    { label: c.nav.services, href: pages.services, key: "services" as const },
    { label: c.nav.shop, href: pages.shop, key: "shop" as const },
    { label: c.nav.about, href: pages.about },
    { label: c.nav.blog, href: pages.blog },
    { label: c.nav.contact, href: pages.contact },
  ];

  const servicesDropdown = [
    { label: lang === "fr" ? "Maintenance" : "Maintenance", href: `${pages.services}#maintenance` },
    { label: lang === "fr" ? "Facility Management" : "Facility Management", href: `${pages.services}#facility` },
    { label: lang === "fr" ? "Nettoyage & Hygiène" : "Cleaning & Hygiene", href: `${pages.services}#cleaning` },
    { label: lang === "fr" ? "Travaux / Rénovations" : "Works / Renovations", href: `${pages.services}#renovations` },
    { label: lang === "fr" ? "Contrats & Sous-traitance" : "Contracts & Subcontracting", href: `${pages.services}#contracts` },
    { label: lang === "fr" ? "Conseil & Audit" : "Consulting & Audit", href: `${pages.services}#audit` },
  ];

  const shopDropdown = [
    { label: lang === "fr" ? "Outils & équipements" : "Tools & Equipment", href: `${pages.shop}#tools` },
    { label: lang === "fr" ? "Produits de nettoyage" : "Cleaning Products", href: `${pages.shop}#cleaning-products` },
    { label: lang === "fr" ? "Pièces détachées" : "Spare Parts", href: `${pages.shop}#spares` },
  ];

  // ✅ EXACT one-line sizing
  const topItem =
    "h-9 px-3 inline-flex items-center rounded-lg leading-none appearance-none " +
    "text-[14px] font-semibold text-slate-700 " +
    "hover:bg-slate-100 hover:text-slate-900 transition";

  const caret =
    "ml-2 inline-flex items-center justify-center rounded-full " +
    "h-5 w-5 text-[14px] font-black leading-none " +
    "text-[#F47B20] bg-[#F47B20]/10 ring-1 ring-[#F47B20]/30 " +
    "transition-all duration-200";

  function toggleMenu(k: Exclude<MenuKey, null>) {
    setOpen((o) => (o === k ? null : k));
  }

  function closeAll() {
    setOpen(null);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full" ref={wrapRef}>
      {/* ===== Top navy bar (full width) ===== */}
      <div className="w-full bg-[#0B1B4A] text-white">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-1.5">
          {/* Social icons (top-left) */}
          <div className="hidden items-center gap-2 sm:flex">
            {[
              { src: "/socialmedia/facebook.png", alt: "Facebook", href: "#" },
              { src: "/socialmedia/instagram.png", alt: "Instagram", href: "#" },
              { src: "/socialmedia/tiktok.png", alt: "TikTok", href: "#" },
              { src: "/socialmedia/linkedin.png", alt: "LinkedIn", href: "#" },
            ].map((s) => (
              <a
                key={s.alt}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.alt}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/18 backdrop-blur hover:bg-white/16 transition"
              >
                <Image src={s.src} alt={s.alt} width={18} height={18} className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          {/* Center slogans */}
          <div className="min-w-0 text-center">
            <div className="mx-auto inline-flex max-w-[980px] items-center justify-center gap-2">
              <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-white/90" />
              <span className="truncate text-[13px] font-extrabold tracking-wide drop-shadow-sm animate-[mm_fadeIn_.35s_ease-out]">
                {slogans[tickIndex]}
              </span>
            </div>
          </div>

          {/* ✅ Animated pill (top-right) */}
          <div className="flex items-center justify-end gap-2">
            <LangSwitcherPill />
          </div>
        </div>
      </div>

      {/* ===== Main header row ===== */}
      <div className="w-full border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1.5">
          {/* Left logo + animated brand */}
          <Link href={pages.home} className="flex items-center gap-3">
            <Image src="/multiimaint-logo.png" alt="MultiiMaint Ltd" width={140} height={140} className="h-[82px] w-[82px]" priority />
            <div className="leading-none">
              <div className="relative whitespace-nowrap text-[15px] font-extrabold tracking-wide text-[#0B1B4A] animate-[mm_glow_2.8s_ease-in-out_infinite]">
                MultiiMaint Ltd
                <span className="pointer-events-none absolute inset-0 -z-10 blur-[10px] opacity-25">
                  MultiiMaint Ltd
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href={pages.home} className={topItem} onMouseEnter={() => setOpen(null)}>
              {nav[0].label}
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpen("services");
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => toggleMenu("services")}
                className={cn(topItem, open === "services" && "bg-slate-100 text-slate-900")}
                aria-haspopup="menu"
                aria-expanded={open === "services"}
              >
                {c.nav.services}
                <span
                  className={cn(
                    caret,
                    open === "services" ? "rotate-180 scale-110 bg-[#F47B20]/15 ring-[#F47B20]/45" : "hover:scale-110"
                  )}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {open === "services" && (
                <div
                  role="menu"
                  className={cn(
                    "absolute left-0 top-[calc(100%+8px)] w-[390px] overflow-hidden rounded-2xl",
                    "border border-[#F47B20]/40 bg-white shadow-[0_18px_55px_rgba(2,6,23,.12)]",
                    "animate-[mm_drop_.18s_ease-out]"
                  )}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-gradient-to-r from-[#F47B20] to-[#ff9a4a] px-4 py-2 text-xs font-extrabold text-[#0B1B4A]">
                    {lang === "fr" ? "Nos Services" : "Our Services"}
                  </div>

                  <div className="p-2">
                    {servicesDropdown.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        role="menuitem"
                        className="group flex h-11 items-center justify-between rounded-xl px-3 text-[14px] font-semibold text-slate-800 hover:bg-orange-50 hover:text-slate-900 transition"
                        onClick={closeAll}
                      >
                        <span>{it.label}</span>
                        <span className="text-[#F47B20] transition group-hover:translate-x-[2px]">→</span>
                      </Link>
                    ))}
                  </div>

                  <div className="px-3 pb-3">
                    <Link
                      href={pages.services}
                      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#0B1B4A] text-[13px] font-extrabold text-white hover:brightness-110 transition"
                      onClick={closeAll}
                    >
                      {lang === "fr" ? "Voir tous les services" : "View all services"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Shop dropdown */}
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpen("shop");
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => toggleMenu("shop")}
                className={cn(topItem, open === "shop" && "bg-slate-100 text-slate-900")}
                aria-haspopup="menu"
                aria-expanded={open === "shop"}
              >
                {c.nav.shop}
                <span
                  className={cn(
                    caret,
                    open === "shop" ? "rotate-180 scale-110 bg-[#F47B20]/15 ring-[#F47B20]/45" : "hover:scale-110"
                  )}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {open === "shop" && (
                <div
                  role="menu"
                  className={cn(
                    "absolute left-0 top-[calc(100%+8px)] w-[350px] overflow-hidden rounded-2xl",
                    "border border-[#F47B20]/40 bg-white shadow-[0_18px_55px_rgba(2,6,23,.12)]",
                    "animate-[mm_drop_.18s_ease-out]"
                  )}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-gradient-to-r from-[#F47B20] to-[#ff9a4a] px-4 py-2 text-xs font-extrabold text-[#0B1B4A]">
                    {lang === "fr" ? "Boutique" : "Shop"}
                  </div>

                  <div className="p-2">
                    {shopDropdown.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        role="menuitem"
                        className="group flex h-11 items-center justify-between rounded-xl px-3 text-[14px] font-semibold text-slate-800 hover:bg-orange-50 hover:text-slate-900 transition"
                        onClick={closeAll}
                      >
                        <span>{it.label}</span>
                        <span className="text-[#F47B20] transition group-hover:translate-x-[2px]">→</span>
                      </Link>
                    ))}
                  </div>

                  <div className="px-3 pb-3">
                    <Link
                      href={pages.shop}
                      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#0B1B4A] text-[13px] font-extrabold text-white hover:brightness-110 transition"
                      onClick={closeAll}
                    >
                      {lang === "fr" ? "Accéder à la boutique" : "Go to shop"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {nav.slice(3).map((it) => (
              <Link key={it.href} href={it.href} className={topItem} onMouseEnter={() => setOpen(null)}>
                {it.label}
              </Link>
            ))}

            {/* CTA */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "ml-2 inline-flex h-9 items-center justify-center rounded-2xl px-6 text-[14px] font-extrabold",
                "bg-[#F47B20] text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.30)]",
                "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.40)]",
                "focus:outline-none focus:ring-2 focus:ring-slate-400",
                "animate-[mm_buzz_1.9s_ease-in-out_infinite]"
              )}
              onMouseEnter={() => setOpen(null)}
            >
              {c.nav.cta}
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-900 shadow-sm hover:bg-slate-50 md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={cn("fixed inset-0 z-[80] md:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!mobileOpen}>
          <div className={cn("absolute inset-0 bg-black/35 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")} onClick={() => setMobileOpen(false)} />

          <div
            className={cn(
              "absolute right-0 top-0 h-full w-[84%] max-w-[360px] bg-white shadow-[0_20px_70px_rgba(0,0,0,.25)]",
              "transition-transform duration-300",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <Image src="/multiimaint-logo.png" alt="MultiiMaint" width={52} height={52} className="h-12 w-12" />
                <div className="text-sm font-extrabold text-[#0B1B4A]">MultiiMaint Ltd</div>
              </div>
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-extrabold"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="mb-4 flex items-center gap-2">
                {[
                  { src: "/socialmedia/facebook.png", alt: "Facebook", href: "#" },
                  { src: "/socialmedia/instagram.png", alt: "Instagram", href: "#" },
                  { src: "/socialmedia/tiktok.png", alt: "TikTok", href: "#" },
                  { src: "/socialmedia/linkedin.png", alt: "LinkedIn", href: "#" },
                ].map((s) => (
                  <a
                    key={s.alt}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.alt}
                    className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 ring-1 ring-slate-200 hover:bg-slate-50 transition"
                  >
                    <Image src={s.src} alt={s.alt} width={20} height={20} className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* language pill in drawer */}
              <div className="mb-4 flex justify-start">
                <div className="rounded-2xl bg-[#0B1B4A] px-3 py-2">
                  <LangSwitcherPill />
                </div>
              </div>

              <div className="grid gap-2">
                {nav.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="rounded-xl px-3 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {it.label}
                  </Link>
                ))}

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-5 py-3 text-[14px] font-extrabold text-[#0B1B4A] shadow-sm hover:brightness-105"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.nav.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


