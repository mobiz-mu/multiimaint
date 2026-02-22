// src/components/multiimaint/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type Lang = "fr" | "en";
type MenuKey = null | "services" | "about";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

/* =========================================
   SEO helper (Header-level safe defaults)
   - You can move this to page-level later if you prefer
========================================= */
function SeoHelper({ lang }: { lang: Lang }) {
  const title =
    lang === "fr"
      ? "MultiiMaint Ltd | Maintenance, Nettoyage & Facilities Management"
      : "MultiiMaint Ltd | Maintenance, Cleaning & Facilities Management";

  const desc =
    lang === "fr"
      ? "Services premium de maintenance, nettoyage professionnel, facilities management et jardinage à Maurice."
      : "Premium maintenance, professional cleaning, facilities management and gardening services in Mauritius.";

  const url = "https://multiimaint.com";
  const ogImage = `${url}/og.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MultiiMaint Ltd",
    url,
    image: ogImage,
    telephone: "+23057160579",
    address: { "@type": "PostalAddress", addressCountry: "MU" },
    areaServed: "Mauritius",
    description: desc,
    sameAs: [],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}

/* =========================================
   Premium Language Switcher (FR/EN in WHITE)
========================================= */
function LangSwitcherPill({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang() as { lang: Lang; setLang: (l: Lang) => void };
  const isFr = lang === "fr";

  const btn = (active: boolean) =>
    cn(
      "relative inline-flex items-center gap-2 rounded-full px-2.5 py-1.5",
      "transition-all duration-200 ease-out",
      "focus:outline-none focus:ring-2 focus:ring-white/35",
      // Always white labels; active gets a subtle glow
      "text-white/90 hover:text-white",
      active && "text-white"
    );

  return (
    <div className="relative inline-flex items-center gap-2 select-none" role="group" aria-label="Language switcher">
      <button type="button" onClick={() => setLang("fr")} className={btn(isFr)} aria-pressed={isFr} aria-label="Français">
        {isFr && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full ring-1 ring-white/25 bg-white/12 shadow-sm"
          />
        )}
        <Image
          src="/flags/fr.png"
          alt="Drapeau Français"
          width={18}
          height={18}
          className="h-[18px] w-[18px] rounded-full ring-1 ring-white/30"
          priority
        />
        <span className={cn("text-xs font-extrabold tracking-wide", compact ? "" : "hidden sm:inline")}>FR</span>
      </button>

      <button type="button" onClick={() => setLang("en")} className={btn(!isFr)} aria-pressed={!isFr} aria-label="English">
        {!isFr && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-full ring-1 ring-white/25 bg-white/12 shadow-sm"
          />
        )}
        <Image
          src="/flags/en.png"
          alt="English flag"
          width={18}
          height={18}
          className="h-[18px] w-[18px] rounded-full ring-1 ring-white/30"
          priority
        />
        <span className={cn("text-xs font-extrabold tracking-wide", compact ? "" : "hidden sm:inline")}>EN</span>
      </button>
    </div>
  );
}

/* =========================================
   ONE Chevron style (desktop + mobile)
========================================= */
function Chevron({ open }: { open: boolean }) {
  return (
    <span className={cn("ml-2 inline-flex items-center justify-center transition-transform duration-200", open && "rotate-180")}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="stroke-current" aria-hidden="true">
        <path d="M5 8l5 5 5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* =========================================
   Mini Icon (REAL svg only)
========================================= */
function MiniIcon({ kind }: { kind: "wrench" | "sparkle" | "building" | "leaf" | "info" | "target" | "blog" | "bag" | "phone" }) {
  const common = "h-5 w-5";
  switch (kind) {
    case "wrench":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 7.5a6.5 6.5 0 0 1-8.7 6.1l-6.1 6.1a2 2 0 0 1-2.8-2.8l6.1-6.1A6.5 6.5 0 0 1 16.5 3l-3 3 4.5 4.5 3-3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M19 13l.7 3 2.3.9-2.3.9-.7 3-.7-3-2.3-.9 2.3-.9.7-3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "building":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 7h4M8 11h4M8 15h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "leaf":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 4c-7 1-12 5-14 11-1 3 1 5 4 4 6-2 10-7 10-14Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 18c2-3 5-5 9-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "info":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 10v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 7h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case "target":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 22a10 10 0 1 0-10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 18a6 6 0 1 0-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 14a2 2 0 1 0-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 4l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "blog":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "bag":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 8V7a5 5 0 0 1 10 0v1"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M6 8h12l-1 13H7L6 8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22 16.9v3a2 2 0 0 1-2.2 2c-9.4-.8-16.9-8.3-17.7-17.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.2 1.3.6 2.5 1.1 3.7a2 2 0 0 1-.5 2.2L8.5 10.8c1.5 2.8 3.9 5.2 6.7 6.7l1.2-1.2a2 2 0 0 1 2.2-.5c1.2.5 2.4.9 3.7 1.1A2 2 0 0 1 22 16.9Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/* =========================================
   Premium hamburger with stable taps (iOS/Android)
========================================= */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
      <path d={open ? "M6 6l12 12" : "M4 7h16"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d={open ? "M18 6L6 18" : "M4 12h16"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {!open && <path d="M4 17h16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

export default function Header() {
  const { lang } = useLang() as { lang: Lang };
  const c = copy(lang);
  const pathname = usePathname();

  // WhatsApp (Requested FR prefix message exactly)
  const WA_PHONE = "23057160579";
  const WA_PREFIX_FR = "Bonjour Multiimaint , Est ce que vous pourriez m'aidez pour un quotation ?";

  const WA_TEXT =
    lang === "fr"
      ? WA_PREFIX_FR
      : "Hello Multiimaint, can you help me with a quotation?";
  const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;

  // Rotating slogans
  const slogans = useMemo(
    () => ["😄 Pa stress, nou la pou sa.", "🧼 Nou nettoye. Nou repare. Ou relax.", "⚡ MultiiMaint — To problem, nou solution."],
    []
  );
  const [tickIndex, setTickIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTickIndex((i) => (i + 1) % slogans.length), 5000);
    return () => window.clearInterval(t);
  }, [slogans.length]);

  // menus
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<{ services: boolean; about: boolean }>({ services: false, about: false });

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  function closeAll() {
    setOpen(null);
    setMobileOpen(false);
    setMobileAcc({ services: false, about: false });
  }

  function toggleMenu(k: Exclude<MenuKey, null>) {
    setOpen((o) => (o === k ? null : k));
  }

  function scheduleClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  }
  function cancelClose() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
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

  // lock body scroll for mobile drawer (safe on iOS)
  useEffect(() => {
    if (!mobileOpen) return;
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [mobileOpen]);

  // close menus on route change
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
    setMobileAcc({ services: false, about: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // routes
  const pages = {
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
  };

  // Services: ONLY 4 + view all (no subtitle anywhere)
  const servicesList = [
    { label: lang === "fr" ? "Maintenance" : "Maintenance", href: pages.maintenance, icon: "wrench" as const },
    { label: lang === "fr" ? "Nettoyage" : "Cleaning", href: pages.cleaning, icon: "sparkle" as const },
    { label: lang === "fr" ? "Facilities Management" : "Facilities Mgmt", href: pages.facilities, icon: "building" as const },
    { label: lang === "fr" ? "Jardinage" : "Gardening", href: pages.gardening, icon: "leaf" as const },
  ];

  const aboutList = [
    { label: lang === "fr" ? "À propos" : "About", href: pages.about, icon: "info" as const },
    { label: lang === "fr" ? "Mission & Vision" : "Mission & Vision", href: pages.missionVision, icon: "target" as const },
    { label: lang === "fr" ? "Blog" : "Blog", href: pages.blog, icon: "blog" as const },
  ];

  const socials = [
    { src: "/socialmedia/facebook.png", alt: "Facebook MultiiMaint", href: "#" },
    { src: "/socialmedia/instagram.png", alt: "Instagram MultiiMaint", href: "#" },
    { src: "/socialmedia/tiktok.png", alt: "TikTok MultiiMaint", href: "#" },
    { src: "/socialmedia/linkedin.png", alt: "LinkedIn MultiiMaint", href: "#" },
    { src: "/socialmedia/youtube.png", alt: "YouTube MultiiMaint", href: "#" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const topLink = (href: string) =>
    cn(
      "h-10 px-3 inline-flex items-center rounded-xl leading-none",
      "text-[14px] font-semibold",
      isActive(href)
        ? "bg-slate-100 text-slate-900 ring-1 ring-slate-200"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      "transition"
    );

  // premium small dropdown panel (white, compact, vertical)
  const panel =
    "absolute left-0 top-[calc(100%+12px)] z-[200] w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_90px_rgba(2,6,23,.16)]";

  const dropItem =
    "group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 ring-1 ring-slate-200 hover:bg-slate-50 transition";

  return (
    <>
      <SeoHelper lang={lang} />

      <header className="sticky top-0 z-[100] w-full" ref={wrapRef}>
        {/* ===== Top enterprise strip ===== */}
        <div className="w-full bg-[#0B1B4A] text-white">
          <div className="mx-auto hidden w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 sm:grid">
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.alt}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/16 transition"
                >
                  <Image src={s.src} alt={s.alt} width={18} height={18} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>

            <div className="min-w-0 text-center">
              <div className="mx-auto inline-flex max-w-[980px] items-center justify-center gap-2">
                <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                <span className="truncate text-[14px] font-extrabold tracking-wide">{slogans[tickIndex]}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <div className="rounded-2xl bg-white/10 px-2 py-1 ring-1 ring-white/15">
                <LangSwitcherPill />
              </div>
            </div>
          </div>

          {/* Mobile top line */}
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-2 px-4 py-2 sm:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex min-w-0 items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                <span className="truncate text-[13px] font-extrabold tracking-wide">{slogans[tickIndex]}</span>
              </div>
              <div className="rounded-2xl bg-white/10 px-2 py-1 ring-1 ring-white/15">
                <LangSwitcherPill compact />
              </div>
            </div>
          </div>
        </div>

        {/* ===== Main header row (white, stable on iOS/Android) ===== */}
        <div className="w-full border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3">
            {/* Logo */}
            <Link href={pages.home} className="flex items-center gap-3" onClick={() => setOpen(null)} aria-label="MultiiMaint Homepage">
              <Image
                src="/multiimaint-logo.png"
                alt="Logo MultiiMaint Ltd"
                width={84}
                height={84}
                className="h-[56px] w-[56px] sm:h-[64px] sm:w-[64px]"
                priority
              />
              <div className="leading-none">
                <div className="whitespace-nowrap text-[14px] sm:text-[15px] font-extrabold tracking-wide text-[#0B1B4A]">
                  MultiiMaint Ltd
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              <Link href={pages.home} className={topLink(pages.home)} onMouseEnter={() => setOpen(null)}>
                {c.nav.home}
              </Link>

              {/* SERVICES (small, premium, vertical) */}
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
                  className={cn(topLink(pages.services), "pr-2", open === "services" && "bg-slate-100")}
                  aria-haspopup="menu"
                  aria-expanded={open === "services"}
                >
                  {c.nav.services}
                  <Chevron open={open === "services"} />
                </button>

                {open === "services" && (
                  <div role="menu" className={panel} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                    <div className="border-b border-slate-200 bg-white px-5 py-4">
                      <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">
                        {lang === "fr" ? "SERVICES" : "SERVICES"}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="grid gap-2">
                        {servicesList.map((it) => (
                          <Link key={it.label} href={it.href} role="menuitem" onClick={closeAll} className={dropItem}>
                            <span className="inline-flex items-center gap-3">
                              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-[#0B1B4A] ring-1 ring-slate-200">
                                <MiniIcon kind={it.icon} />
                              </span>
                              <span className="text-[13.5px] font-extrabold text-slate-900">{it.label}</span>
                            </span>
                            <span className="text-[#F47B20] opacity-0 transition group-hover:opacity-100 group-hover:translate-x-[2px]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                                <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href={pages.services}
                        onClick={closeAll}
                        className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-2xl bg-[#0B1B4A] px-4 text-[13px] font-extrabold text-white hover:brightness-110"
                      >
                        {lang === "fr" ? "Voir tous les services" : "View all services"}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* SHOP (added back) */}
              <Link href={pages.shop} className={topLink(pages.shop)} onMouseEnter={() => setOpen(null)}>
                {c.nav.shop ?? "Shop"}
              </Link>

              {/* ABOUT (small, vertical, no subtitle text) */}
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
                  className={cn(topLink(pages.about), "pr-2", open === "about" && "bg-slate-100")}
                  aria-haspopup="menu"
                  aria-expanded={open === "about"}
                >
                  {lang === "fr" ? "À propos" : "About"}
                  <Chevron open={open === "about"} />
                </button>

                {open === "about" && (
                  <div role="menu" className={panel} onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                    <div className="border-b border-slate-200 bg-white px-5 py-4">
                      <div className="text-[12px] font-extrabold tracking-widest text-[#0B1B4A]">
                        {lang === "fr" ? "À PROPOS" : "ABOUT"}
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="grid gap-2">
                        {aboutList.map((it) => (
                          <Link key={it.label} href={it.href} role="menuitem" onClick={closeAll} className={dropItem}>
                            <span className="inline-flex items-center gap-3">
                              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-[#0B1B4A] ring-1 ring-slate-200">
                                <MiniIcon kind={it.icon} />
                              </span>
                              <span className="text-[13.5px] font-extrabold text-slate-900">{it.label}</span>
                            </span>
                            <span className="text-[#0B1B4A] opacity-0 transition group-hover:opacity-100 group-hover:translate-x-[2px]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                                <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact */}
              <Link href={pages.contact} className={topLink(pages.contact)} onMouseEnter={() => setOpen(null)}>
                {c.nav.contact}
              </Link>

              {/* Request A Quote (orange bg, navy text) */}
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "ml-2 inline-flex h-10 items-center justify-center rounded-2xl px-5 text-[14px] font-extrabold",
                  "bg-[#F47B20] text-[#0B1B4A]",
                  "shadow-[0_14px_30px_rgba(244,123,32,.22)] hover:brightness-110 transition"
                )}
                onMouseEnter={() => setOpen(null)}
                onClick={() => setOpen(null)}
              >
                Request A Quote
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              type="button"
              className={cn(
                "md:hidden inline-flex items-center justify-center rounded-2xl",
                "border border-slate-200 bg-white px-3.5 py-2.5",
                "text-slate-900 shadow-sm hover:bg-slate-50 active:scale-[0.99] transition",
                "touch-manipulation"
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>

          <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[#F47B20]/40 to-transparent" />
        </div>

        {/* =========================
            MOBILE DRAWER
        ========================= */}
        <div className={cn("fixed inset-0 md:hidden z-[999]", mobileOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!mobileOpen}>
          <div
            className={cn("absolute inset-0 bg-black/45 transition-opacity duration-200", mobileOpen ? "opacity-100" : "opacity-0")}
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={cn(
              "absolute right-0 top-0 h-[100dvh] w-[92%] max-w-[392px]",
              "bg-white shadow-[0_25px_90px_rgba(0,0,0,.35)]",
              "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
              mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-[100dvh] flex-col">
              {/* top */}
              <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image src="/multiimaint-logo.png" alt="Logo MultiiMaint" width={52} height={52} className="h-12 w-12" />
                    <div>
                      <div className="text-sm font-extrabold text-[#0B1B4A]">MultiiMaint Ltd</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-extrabold text-slate-900 hover:bg-slate-50 touch-manipulation"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-3 rounded-2xl bg-[#0B1B4A] px-3 py-2 ring-1 ring-white/10">
                  <LangSwitcherPill compact />
                </div>
              </div>

              {/* scroll */}
              <div className="flex-1 overflow-y-auto px-4 py-4 overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
                <div className="grid gap-2">
                  <Link
                    href={pages.home}
                    className={cn(
                      "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold",
                      isActive(pages.home) ? "ring-1 ring-[#F47B20]/35 bg-orange-50 text-slate-900" : "text-slate-900 hover:bg-slate-50"
                    )}
                    onClick={closeAll}
                  >
                    {c.nav.home}
                  </Link>

                  {/* Services accordion */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50 touch-manipulation"
                      onClick={() => setMobileAcc((v) => ({ ...v, services: !v.services }))}
                      aria-expanded={mobileAcc.services}
                      aria-controls="mobile-services"
                    >
                      <span>{c.nav.services}</span>
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-900 ring-1 ring-slate-200 transition-transform",
                          mobileAcc.services && "rotate-180"
                        )}
                        aria-hidden="true"
                      >
                        <Chevron open={mobileAcc.services} />
                      </span>
                    </button>

                    <div className={cn("grid transition-[grid-template-rows] duration-300", mobileAcc.services ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="min-h-0 overflow-hidden" id="mobile-services">
                        <div className="px-3 pb-3">
                          <div className="grid gap-2">
                            {servicesList.map((it) => (
                              <Link
                                key={it.label}
                                href={it.href}
                                className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-slate-200 hover:bg-orange-50/60 transition"
                                onClick={closeAll}
                              >
                                <span className="inline-flex items-center gap-3">
                                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-[#0B1B4A] ring-1 ring-slate-200">
                                    <MiniIcon kind={it.icon} />
                                  </span>
                                  <span className="text-[13.5px] font-extrabold text-slate-900">{it.label}</span>
                                </span>
                                <span className="text-[#F47B20]">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                                    <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </Link>
                            ))}
                          </div>

                          <Link
                            href={pages.services}
                            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#0B1B4A] text-[13px] font-extrabold text-white hover:brightness-110"
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
                    className={cn(
                      "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold",
                      isActive(pages.shop) ? "ring-1 ring-[#F47B20]/35 bg-orange-50 text-slate-900" : "text-slate-900 hover:bg-slate-50"
                    )}
                    onClick={closeAll}
                  >
                    {c.nav.shop ?? "Shop"}
                  </Link>

                  {/* About accordion */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-[14px] font-extrabold text-slate-900 hover:bg-slate-50 touch-manipulation"
                      onClick={() => setMobileAcc((v) => ({ ...v, about: !v.about }))}
                      aria-expanded={mobileAcc.about}
                      aria-controls="mobile-about"
                    >
                      <span>{lang === "fr" ? "À propos" : "About"}</span>
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-900 ring-1 ring-slate-200 transition-transform",
                          mobileAcc.about && "rotate-180"
                        )}
                        aria-hidden="true"
                      >
                        <Chevron open={mobileAcc.about} />
                      </span>
                    </button>

                    <div className={cn("grid transition-[grid-template-rows] duration-300", mobileAcc.about ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="min-h-0 overflow-hidden" id="mobile-about">
                        <div className="px-3 pb-3">
                          <div className="grid gap-2">
                            {aboutList.map((it) => (
                              <Link
                                key={it.label}
                                href={it.href}
                                className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-slate-200 hover:bg-slate-50 transition"
                                onClick={closeAll}
                              >
                                <span className="inline-flex items-center gap-3">
                                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-[#0B1B4A] ring-1 ring-slate-200">
                                    <MiniIcon kind={it.icon} />
                                  </span>
                                  <span className="text-[13.5px] font-extrabold text-slate-900">{it.label}</span>
                                </span>
                                <span className="text-[#0B1B4A]">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
                                    <path d="M9 18l6-6-6-6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <Link
                    href={pages.contact}
                    className={cn(
                      "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[14px] font-extrabold",
                      isActive(pages.contact) ? "ring-1 ring-[#F47B20]/35 bg-orange-50 text-slate-900" : "text-slate-900 hover:bg-slate-50"
                    )}
                    onClick={closeAll}
                  >
                    {c.nav.contact}
                  </Link>

                  {/* Request Quote button (mobile) */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-5 py-3 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_14px_30px_rgba(244,123,32,.22)] hover:brightness-110"
                    onClick={closeAll}
                  >
                    Request A Quote
                  </a>

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

                  <div className="mt-3 text-[12px] font-semibold text-slate-500">Support: support@multiimaint.com</div>
                </div>

                <div className="h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}