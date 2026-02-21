"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Lang = "fr" | "en";
type MenuKey = null | "services" | "shop" | "about";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================================
   Premium Animated Language Switcher (NO background)
========================================= */
function LangSwitcherPill({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang() as { lang: Lang; setLang: (l: Lang) => void };
  const isFr = lang === "fr";

  return (
    <div className="relative inline-flex items-center gap-2 select-none" role="group" aria-label="Language switcher">
      {/* FR */}
      <button
        type="button"
        onClick={() => setLang("fr")}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full px-2.5 py-1.5",
          "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
          "focus:outline-none focus:ring-2 focus:ring-white/55",
          isFr ? "text-white" : "text-white/80 hover:text-white"
        )}
        aria-pressed={isFr}
        aria-label="Français"
      >
        {isFr && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full ring-1 ring-white/35 shadow-[0_16px_40px_rgba(0,0,0,.20)] animate-[mm_pop_.22s_ease-out]"
          />
        )}
        <Image
          src="/flags/fr.png"
          alt="Drapeau Français"
          width={18}
          height={18}
          className={cn("h-[18px] w-[18px] rounded-full ring-1 ring-white/25", isFr && "animate-[mm_pop_.22s_ease-out]")}
          priority
        />
        <span className={cn("text-xs font-extrabold tracking-wide", compact ? "" : "hidden sm:inline")}>FR</span>
      </button>

      {/* EN */}
      <button
        type="button"
        onClick={() => setLang("en")}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-full px-2.5 py-1.5",
          "transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
          "focus:outline-none focus:ring-2 focus:ring-white/55",
          !isFr ? "text-white" : "text-white/80 hover:text-white"
        )}
        aria-pressed={!isFr}
        aria-label="English"
      >
        {!isFr && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full ring-1 ring-white/35 shadow-[0_16px_40px_rgba(0,0,0,.20)] animate-[mm_pop_.22s_ease-out]"
          />
        )}
        <Image
          src="/flags/en.png"
          alt="English flag"
          width={18}
          height={18}
          className={cn("h-[18px] w-[18px] rounded-full ring-1 ring-white/25", !isFr && "animate-[mm_pop_.22s_ease-out]")}
          priority
        />
        <span className={cn("text-xs font-extrabold tracking-wide", compact ? "" : "hidden sm:inline")}>EN</span>
      </button>
    </div>
  );
}

export default function Header() {
  const { lang } = useLang() as { lang: Lang };
  const c = copy(lang);

  // WhatsApp CTA
  const WA_PHONE = "23057160579";
  const WA_TEXT = lang === "fr"
    ? "Bonjour MultiiMaint 👋\nMo bizin ene quotation, ou kapav aide moi svp? Merci."
    : "Hello MultiiMaint 👋\nI need a quotation. Can you help me please? Thank you.";
  const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;

  // rotating slogans
  const slogans = useMemo(
    () => [
      "😄 Pa stress, nou la pou sa.",
      "🧼 Nou nettoye. Nou repare. Ou relax.",
      "⚡ MultiiMaint – To problem, nou solution.",
    ],
    []
  );

  const [tickIndex, setTickIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTickIndex((i) => (i + 1) % slogans.length), 2800);
    return () => window.clearInterval(t);
  }, [slogans.length]);

  // menus
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<{ services: boolean; shop: boolean; about: boolean }>({
    services: false,
    shop: false,
    about: false,
  });

  const wrapRef = useRef<HTMLDivElement | null>(null);

  function closeAll() {
    setOpen(null);
    setMobileOpen(false);
    setMobileAcc({ services: false, shop: false, about: false });
  }

  // outside click / ESC
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) closeAll();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // lock body scroll on mobile drawer (important for iOS)
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ✅ ROUTES (direct to pages)
  const pages = {
    home: "/",
    services: "/services",
    maintenance: "/services/maintenance",
    cleaning: "/services/cleaning",
    facilities: "/services/facilities-management",
    gardening: "/services/gardening",
    shop: "/shop",
    about: "/about",
    missionVision: "/mission-vision", // ✅ direct page route
    blog: "/blog",
    contact: "/contact",
  };

  // ✅ Services dropdown direct pages
  const servicesDropdown = [
    { label: lang === "fr" ? "Maintenance" : "Maintenance", href: pages.maintenance },
    { label: lang === "fr" ? "Nettoyage" : "Cleaning", href: pages.cleaning },
    { label: lang === "fr" ? "Facilities Management" : "Facilities Management", href: pages.facilities },
    { label: lang === "fr" ? "Jardinage (intérieur & extérieur)" : "Gardening (Indoor & Outdoor)", href: pages.gardening },
  ];

  // Shop dropdown (keep, but safe)
  const shopDropdown = [
    { label: lang === "fr" ? "Boutique" : "Shop", href: pages.shop },
  ];

  // About dropdown (direct)
  const aboutDropdown = [
    { label: lang === "fr" ? "À propos de nous" : "About Us", href: pages.about },
    { label: lang === "fr" ? "Mission & Vision" : "Mission & Vision", href: pages.missionVision },
    { label: lang === "fr" ? "Blog" : "Blog", href: pages.blog },
  ];

  // desktop nav (keep same order)
  const navDesktop = [
    { label: c.nav.home, href: pages.home },
    { label: c.nav.services, href: pages.services, key: "services" as const },
    { label: c.nav.shop, href: pages.shop, key: "shop" as const },
    { label: lang === "fr" ? "À propos de nous" : "About Us", href: pages.about, key: "about" as const },
    { label: c.nav.contact, href: pages.contact },
  ];

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

  // close delay for hover menus
  const closeTimer = useRef<number | null>(null);
  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  }
  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  // socials (use real links later)
  const socials = [
    { src: "/socialmedia/facebook.png", alt: "Facebook MultiiMaint", href: "#" },
    { src: "/socialmedia/instagram.png", alt: "Instagram MultiiMaint", href: "#" },
    { src: "/socialmedia/tiktok.png", alt: "TikTok MultiiMaint", href: "#" },
    { src: "/socialmedia/linkedin.png", alt: "LinkedIn MultiiMaint", href: "#" },
    { src: "/socialmedia/youtube.png", alt: "YouTube MultiiMaint", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full" ref={wrapRef}>
      {/* ===== Top navy bar (desktop keep same) ===== */}
      <div className="w-full bg-[#0B1B4A] text-white">
        {/* Desktop/tablet */}
        <div className="mx-auto hidden w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-1.5 sm:grid">
          <div className="flex items-center gap-2">
            {socials.map((s) => (
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

          <div className="min-w-0 text-center">
            <div className="mx-auto inline-flex max-w-[980px] items-center justify-center gap-2">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
              <span className="truncate text-[15px] font-extrabold tracking-wide drop-shadow-sm">
                {slogans[tickIndex]}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <LangSwitcherPill />
          </div>
        </div>

        {/* Mobile: keep clean (no social here, per your request: socials in menu) */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-2 px-4 py-2 sm:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex min-w-0 items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
              <span className="truncate text-[14px] font-extrabold tracking-wide drop-shadow-sm">
                {slogans[tickIndex]}
              </span>
            </div>

            {/* No flags here on mobile — will be inside menu at bottom */}
            <span className="text-[12px] font-extrabold text-white/80">
              {lang === "fr" ? "Menu" : "Menu"}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Main header row ===== */}
      <div className="w-full border-b border-slate-200/70 bg-white/92 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link href={pages.home} className="flex items-center gap-3" onClick={() => setOpen(null)} aria-label="MultiiMaint Homepage">
            <Image
              src="/multiimaint-logo.png"
              alt="Logo MultiiMaint Ltd"
              width={140}
              height={140}
              className="h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] md:h-[82px] md:w-[82px]"
              priority
            />
            <div className="leading-none">
              <div className="relative whitespace-nowrap text-[14px] sm:text-[15px] font-extrabold tracking-wide text-[#0B1B4A]">
                MultiiMaint Ltd
                <span className="pointer-events-none absolute inset-0 -z-10 blur-[10px] opacity-25">MultiiMaint Ltd</span>
              </div>
              <div className="mt-1 hidden text-[12px] font-semibold text-slate-600 sm:block">
                {lang === "fr"
                  ? "Maintenance • Nettoyage • Facilities • Jardinage"
                  : "Maintenance • Cleaning • Facilities • Gardening"}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            <Link href={pages.home} className={topItem} onMouseEnter={() => setOpen(null)}>
              {navDesktop[0].label}
            </Link>

            {/* Services */}
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
                {navDesktop[1].label}
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
                    "absolute left-0 top-[calc(100%+8px)] w-[380px] overflow-hidden rounded-2xl",
                    "border border-[#F47B20]/40 bg-white shadow-[0_18px_55px_rgba(2,6,23,.12)]"
                  )}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-gradient-to-r from-[#F47B20] to-[#ff9a4a] px-4 py-2 text-xs font-extrabold text-[#0B1B4A]">
                    {lang === "fr" ? "Services" : "Services"}
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

            {/* Shop */}
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
                {navDesktop[2].label}
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
                    "absolute left-0 top-[calc(100%+8px)] w-[320px] overflow-hidden rounded-2xl",
                    "border border-[#F47B20]/40 bg-white shadow-[0_18px_55px_rgba(2,6,23,.12)]"
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
                </div>
              )}
            </div>

            {/* About */}
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpen("about");
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                onClick={() => toggleMenu("about")}
                className={cn(topItem, open === "about" && "bg-slate-100 text-slate-900")}
                aria-haspopup="menu"
                aria-expanded={open === "about"}
              >
                {navDesktop[3].label}
                <span
                  className={cn(
                    caret,
                    open === "about" ? "rotate-180 scale-110 bg-[#F47B20]/15 ring-[#F47B20]/45" : "hover:scale-110"
                  )}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {open === "about" && (
                <div
                  role="menu"
                  className={cn(
                    "absolute left-0 top-[calc(100%+8px)] w-[320px] overflow-hidden rounded-2xl",
                    "border border-[#0B1B4A]/25 bg-white shadow-[0_18px_55px_rgba(2,6,23,.12)]"
                  )}
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                >
                  <div className="bg-gradient-to-r from-[#0B1B4A] to-[#132b6f] px-4 py-2 text-xs font-extrabold text-white">
                    {lang === "fr" ? "À propos" : "About"}
                  </div>
                  <div className="p-2">
                    {aboutDropdown.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        role="menuitem"
                        className="group flex h-11 items-center justify-between rounded-xl px-3 text-[14px] font-semibold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition"
                        onClick={closeAll}
                      >
                        <span>{it.label}</span>
                        <span className="text-[#0B1B4A] transition group-hover:translate-x-[2px]">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <Link href={pages.contact} className={topItem} onMouseEnter={() => setOpen(null)}>
              {navDesktop[4].label}
            </Link>

            {/* CTA (desktop) */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "ml-2 inline-flex h-9 items-center justify-center rounded-2xl px-6 text-[14px] font-extrabold",
                "bg-[#F47B20] text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.30)]",
                "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.40)]",
                "focus:outline-none focus:ring-2 focus:ring-slate-400"
              )}
              onMouseEnter={() => setOpen(null)}
              aria-label={lang === "fr" ? "Ouvrir WhatsApp pour demander un devis" : "Open WhatsApp to request a quote"}
            >
              {c.nav.cta}
            </a>
          </nav>

          {/* Mobile hamburger (WHITE background, premium) */}
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-2xl",
              "border border-slate-200 bg-white px-3.5 py-2.5",
              "text-[13px] font-extrabold text-slate-900 shadow-sm hover:bg-slate-50",
              "md:hidden"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>

        {/* ===== Mobile Drawer (WHITE, luxury, flags bottom) ===== */}
        <div
          className={cn("fixed inset-0 z-[80] md:hidden", mobileOpen ? "pointer-events-auto" : "pointer-events-none")}
          aria-hidden={!mobileOpen}
        >
          <div
            className={cn("absolute inset-0 bg-black/40 transition-opacity", mobileOpen ? "opacity-100" : "opacity-0")}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={cn(
              "absolute right-0 top-0 h-full w-[90%] max-w-[390px] bg-white",
              "shadow-[0_20px_70px_rgba(0,0,0,.28)]",
              "transition-transform duration-300",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <Image src="/multiimaint-logo.png" alt="Logo MultiiMaint" width={52} height={52} className="h-12 w-12" />
                <div>
                  <div className="text-sm font-extrabold text-[#0B1B4A]">MultiiMaint Ltd</div>
                  <div className="text-[12px] font-semibold text-slate-600">
                    {lang === "fr" ? "Service premium • Réponse rapide" : "Premium service • Fast response"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="flex h-[calc(100%-72px)] flex-col">
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {/* MENU LINKS */}
                <div className="grid gap-2">
                  <Link
                    href={pages.home}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                    onClick={closeAll}
                  >
                    {c.nav.home}
                  </Link>

                  {/* Services accordion */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                      onClick={() => setMobileAcc((v) => ({ ...v, services: !v.services }))}
                      aria-expanded={mobileAcc.services}
                      aria-controls="mobile-services"
                    >
                      <span>{c.nav.services}</span>
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-full bg-orange-50 text-[#F47B20] ring-1 ring-orange-100 transition",
                          mobileAcc.services && "rotate-180"
                        )}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>

                    <div
                      id="mobile-services"
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        mobileAcc.services ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-3 pb-3">
                          <div className="grid gap-1">
                            {servicesDropdown.map((it) => (
                              <Link
                                key={it.label}
                                href={it.href}
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-slate-800 hover:bg-orange-50"
                                onClick={closeAll}
                              >
                                <span>{it.label}</span>
                                <span className="text-[#F47B20]">→</span>
                              </Link>
                            ))}
                          </div>

                          <Link
                            href={pages.services}
                            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0B1B4A] text-[13px] font-extrabold text-white hover:brightness-110"
                            onClick={closeAll}
                          >
                            {lang === "fr" ? "Voir tous les services" : "View all services"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shop */}
                  <Link
                    href={pages.shop}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                    onClick={closeAll}
                  >
                    {c.nav.shop}
                  </Link>

                  {/* About */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                      onClick={() => setMobileAcc((v) => ({ ...v, about: !v.about }))}
                      aria-expanded={mobileAcc.about}
                      aria-controls="mobile-about"
                    >
                      <span>{lang === "fr" ? "À propos de nous" : "About Us"}</span>
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-[#0B1B4A] ring-1 ring-slate-200 transition",
                          mobileAcc.about && "rotate-180"
                        )}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>

                    <div
                      id="mobile-about"
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        mobileAcc.about ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="px-3 pb-3">
                          <div className="grid gap-1">
                            {aboutDropdown.map((it) => (
                              <Link
                                key={it.label}
                                href={it.href}
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-slate-800 hover:bg-slate-100"
                                onClick={closeAll}
                              >
                                <span>{it.label}</span>
                                <span className="text-[#0B1B4A]">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Blog direct */}
                  <Link
                    href={pages.blog}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                    onClick={closeAll}
                  >
                    {lang === "fr" ? "Blog" : "Blog"}
                  </Link>

                  {/* Contact */}
                  <Link
                    href={pages.contact}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50"
                    onClick={closeAll}
                  >
                    {c.nav.contact}
                  </Link>

                  {/* Request a quote (mobile only IN menu) */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-5 py-3 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.25)] hover:brightness-105"
                    onClick={closeAll}
                    aria-label={lang === "fr" ? "Demander un devis sur WhatsApp" : "Request a quote on WhatsApp"}
                  >
                    {lang === "fr" ? "Demander un devis" : "Request a quote"}
                  </a>

                  {/* Socials (mobile only IN menu) */}
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-[12px] font-extrabold tracking-wide text-slate-700">
                      {lang === "fr" ? "Réseaux sociaux" : "Social media"}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {socials.map((s) => (
                        <a
                          key={s.alt}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.alt}
                          className="grid h-11 w-11 place-items-center rounded-full bg-white ring-1 ring-slate-200 hover:bg-slate-50 transition"
                        >
                          <Image src={s.src} alt={s.alt} width={20} height={20} className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="h-4" />
              </div>

              {/* ✅ FLAGS AT BOTTOM (requested) */}
              <div className="border-t border-slate-200 bg-white px-4 py-4">
                <div className="mb-2 text-[12px] font-extrabold tracking-wide text-slate-700">
                  {lang === "fr" ? "Langue" : "Language"}
                </div>
                <div className="rounded-2xl bg-[#0B1B4A] px-3 py-2">
                  <LangSwitcherPill compact />
                </div>

                <div className="mt-3 text-[12px] font-semibold text-slate-500">
                  {lang === "fr" ? "Support: support@multiimaint.com" : "Support: support@multiimaint.com"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

