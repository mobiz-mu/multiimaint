"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";
import HeroReveal from "@/components/HeroReveal";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;

    const onChange = () => setReduced(!!mql.matches);
    onChange();

    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return reduced;
}

export default function HeroBanner() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  const reducedMotion = usePrefersReducedMotion();

  const slides = useMemo(
    () => [
      { src: "/hero-maintenance.jpg", alt: "Maintenance" },
      { src: "/hero-cleaning.jpg", alt: "Cleaning" },
      { src: "/hero-facility.jpg", alt: "Facility management" },
    ],
    []
  );

  // ---------- slideshow ----------
  const [index, setIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    if (isHover) return;

    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 5200);
    return () => window.clearInterval(id);
  }, [slides.length, reducedMotion, isHover]);

  // ---------- typewriter ----------
  const headline =
    c.hero?.h ??
    (lang === "fr" ? "Maintenance & Nettoyage à l’Île Maurice" : "Maintenance & Cleaning in Mauritius");

  const subline =
    c.hero?.p ??
    (lang === "fr"
      ? "Un partenaire fiable pour vos sites, vos équipes et vos équipements."
      : "A reliable partner for your sites, teams and equipment.");

  const [typed, setTyped] = useState(reducedMotion ? headline : "");
  const [typingDone, setTypingDone] = useState(reducedMotion);

  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    // reset per language/headline change
    if (typingTimer.current) window.clearInterval(typingTimer.current);
    setTypingDone(false);

    if (reducedMotion) {
      setTyped(headline);
      setTypingDone(true);
      return;
    }

    setTyped("");

    const step = 3;
    const intervalMs = 65;

    let i = 0;
    typingTimer.current = window.setInterval(() => {
      i += step;
      const next = headline.slice(0, i);
      setTyped(next);

      if (i >= headline.length) {
        if (typingTimer.current) window.clearInterval(typingTimer.current);
        typingTimer.current = null;
        setTypingDone(true);
      }
    }, intervalMs);

    return () => {
      if (typingTimer.current) window.clearInterval(typingTimer.current);
      typingTimer.current = null;
    };
  }, [headline, reducedMotion]);

  const points = useMemo(() => {
    return lang === "fr"
      ? [
          { t: "Intervention Rapide", d: "Réponse & action sans délai" },
          { t: "Qualité & Reporting", d: "Suivi, KPI, transparence" },
          { t: "Boutique Pro", d: "Produits & équipements" },
        ]
      : [
          { t: "Fast Response", d: "Quick intervention & support" },
          { t: "Quality & Reporting", d: "KPIs, tracking, clarity" },
          { t: "Pro Shop", d: "Products & equipment" },
        ];
  }, [lang]);

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }
  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <section className="relative -mt-2">
      {/* Full-width cover (Facebook cover feel) */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
        <div
          className={cn(
            "relative",
            // mobile-first: more breathing space and safe-area-friendly height
            "h-[360px] sm:h-[440px] md:h-[540px] lg:h-[580px]",
            // iOS momentum scrolling in case of overlays (safe)
            "touch-pan-y"
          )}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Slide images */}
          {slides.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              className={cn(
                "object-cover",
                "transition-opacity duration-700 will-change-[opacity]",
                i === index ? "opacity-100" : "opacity-0"
              )}
              sizes="100vw"
            />
          ))}

          {/* readability gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/38 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/12" />

          {/* subtle animated glow blobs */}
          {!reducedMotion && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#F47B20]/20 blur-3xl animate-[mm_float_9s_ease-in-out_infinite]" />
              <div className="absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-[#17B890]/16 blur-3xl animate-[mm_float2_11s_ease-in-out_infinite]" />
            </div>
          )}

          {/* ✅ Mobile swipe hint & arrows (very clean) */}
          <div className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-4">
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[12px] font-extrabold text-white/90 ring-1 ring-white/15 backdrop-blur sm:hidden">
              <span className="inline-block h-2 w-2 rounded-full bg-[#F47B20]" />
              {lang === "fr" ? "Glissez ou utilisez les flèches" : "Swipe or use arrows"}
            </div>
          </div>

          {/* Arrows (mobile + desktop) */}
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className={cn(
              "absolute left-3 top-1/2 z-30 -translate-y-1/2",
              "grid h-11 w-11 place-items-center rounded-full",
              "bg-white/10 text-white ring-1 ring-white/18 backdrop-blur",
              "shadow-[0_14px_34px_rgba(0,0,0,.25)]",
              "transition hover:bg-white/16 active:scale-[.98]",
              "focus:outline-none focus:ring-2 focus:ring-white/45"
            )}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className={cn(
              "absolute right-3 top-1/2 z-30 -translate-y-1/2",
              "grid h-11 w-11 place-items-center rounded-full",
              "bg-white/10 text-white ring-1 ring-white/18 backdrop-blur",
              "shadow-[0_14px_34px_rgba(0,0,0,.25)]",
              "transition hover:bg-white/16 active:scale-[.98]",
              "focus:outline-none focus:ring-2 focus:ring-white/45"
            )}
          >
            ›
          </button>

          {/* content */}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center">
              <div
                className={cn(
                  "relative w-full max-w-[900px] overflow-hidden rounded-3xl",
                  "border border-white/20 bg-white/10 backdrop-blur-md",
                  "shadow-[0_18px_60px_rgba(0,0,0,.25)]",
                  "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent",
                  "animate-[mm_pop_.55s_ease-out]"
                )}
              >
                {/* accent diamond */}
                <div className="pointer-events-none absolute -top-5 left-1/2 h-10 w-10 -translate-x-1/2 rotate-45 rounded-xl border border-white/20 bg-white/10 backdrop-blur shadow-[0_14px_40px_rgba(0,0,0,.18)]" />

                {/* ✅ Better padding for small phones */}
                <div className="p-5 sm:p-8">
                  <HeroReveal delay={0.04}>
                    <div className="mx-auto text-white/90 text-[11px] sm:text-xs font-extrabold tracking-wider">
                      {c.hero?.kicker}
                    </div>
                  </HeroReveal>

                  <HeroReveal delay={0.08}>
                    <h1 className="mx-auto mt-2 text-balance text-[26px] leading-[1.1] font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                      <span className="drop-shadow-[0_14px_34px_rgba(0,0,0,.55)]">
                        {typed}
                        {!reducedMotion && (
                          <span
                            className={cn(
                              "ml-1 inline-block w-[10px] align-[-2px] bg-white/85",
                              typingDone ? "opacity-0" : "opacity-100",
                              "h-[1.08em] animate-[mm_caret_1s_steps(2,end)_infinite]"
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </h1>
                  </HeroReveal>

                  <HeroReveal delay={0.12}>
                    <p className="mx-auto mt-3 max-w-[62ch] text-pretty text-[13.5px] font-medium text-white/90 sm:text-base md:text-lg">
                      {subline}
                    </p>
                  </HeroReveal>

                  <HeroReveal delay={0.16}>
                    <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#contact"
                        className={cn(
                          "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-extrabold",
                          "bg-[#F47B20] text-[#0B1B4A] shadow-[0_16px_44px_rgba(244,123,32,.32)]",
                          "transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_22px_60px_rgba(244,123,32,.40)]",
                          "focus:outline-none focus:ring-2 focus:ring-white/50"
                        )}
                      >
                        {c.hero?.primary ?? (lang === "fr" ? "Demander un Devis" : "Request a Quote")}
                      </a>

                      <a
                        href="#services"
                        className={cn(
                          "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-extrabold",
                          "bg-white/14 text-white ring-1 ring-white/25 backdrop-blur",
                          "transition-all duration-300 hover:bg-white/18",
                          "focus:outline-none focus:ring-2 focus:ring-white/50"
                        )}
                      >
                        {c.hero?.secondary ?? (lang === "fr" ? "Voir nos Services" : "View Services")}
                      </a>
                    </div>
                  </HeroReveal>

                  <HeroReveal delay={0.2}>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {points.map((p) => (
                        <div
                          key={p.t}
                          className={cn(
                            "rounded-2xl border border-white/18 bg-white/10 px-4 py-3 backdrop-blur-md",
                            "shadow-[0_14px_38px_rgba(0,0,0,.18)]",
                            "transition-transform duration-300 hover:-translate-y-[1px]"
                          )}
                        >
                          <div className="text-sm font-extrabold text-white">{p.t}</div>
                          <div className="mt-0.5 text-xs font-medium text-white/85">{p.d}</div>
                        </div>
                      ))}
                    </div>
                  </HeroReveal>
                </div>
              </div>

              {/* ✅ slide dots (bigger touch targets on mobile) */}
              <div className="mt-5 flex items-center justify-center">
                <div className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/15">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={cn(
                        "rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/40",
                        "h-3 w-3 sm:h-2.5 sm:w-2.5",
                        i === index
                          ? "bg-[#F47B20] shadow-[0_0_0_4px_rgba(244,123,32,.20)]"
                          : "bg-white/45 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Tiny slide index badge (nice premium detail) */}
          <div className="absolute bottom-3 right-3 z-30 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-extrabold text-white/90 ring-1 ring-white/15 backdrop-blur">
            {index + 1}/{slides.length}
          </div>
        </div>
      </div>
    </section>
  );
}
