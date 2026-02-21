"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

const blogImages = [
  "/blog-maintenance-checklist.jpg",
  "/blog-hygiene-haccp.jpg",
  "/blog-cost-optimization.jpg",
  "/blog-facility-trends.jpg",
  "/blog-cleaning-tips.jpg",
  "/blog-safety-compliance.jpg",
];

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function IconBook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4 19a2 2 0 0 0 2 2h12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
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

export default function HomeBlog() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const reducedMotion = usePrefersReducedMotion();

  const header = useMemo(() => {
    return {
      h: lang === "fr" ? "Blog & Conseils" : "Blog & Tips",
      p:
        lang === "fr"
          ? "Guides premium en maintenance, hygiène, sécurité et facilities management à l’Île Maurice — pour mieux planifier, mieux contrôler la qualité et optimiser vos opérations."
          : "Premium guides on maintenance, hygiene, safety and facilities management in Mauritius — to plan better, control quality and optimize operations.",
    };
  }, [lang]);

  // Build cards from copy + images
  const baseCards = useMemo(() => {
    const base: ReadonlyArray<{ t: string; d: string }> = c.blogCards ?? [];
    const trimmed = base.slice(0, 6);
    return trimmed.map((b, idx) => ({
      ...b,
      img: blogImages[idx % blogImages.length],
      alt: lang === "fr" ? `${b.t} — Blog MultiiMaint` : `${b.t} — MultiiMaint Blog`,
      idx,
    }));
  }, [c.blogCards, lang]);

  // Duplicate list to create a seamless infinite loop (no blank space)
  const loopCards = useMemo(() => {
    // Need enough items to cover wide screens; duplicate 3x safely
    const n = baseCards.length || 6;
    const a = baseCards.length ? baseCards : blogImages.slice(0, 6).map((img, i) => ({ t: "Post", d: "", img, alt: "Blog", idx: i }));
    return [...a, ...a, ...a].map((x, i) => ({ ...x, _k: `${x.idx}-${i}-${x.t}` }));
  }, [baseCards]);

  const viewAllLabel = lang === "fr" ? "Voir tous les articles" : "View all posts";

  // Infinite auto-scroll using translateX
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const xRef = useRef(0);
  const widthRef = useRef(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const el = trackRef.current;
    if (!el) return;

    // The first 1/3 of content is one full set, measure that width
    // We rely on 3x duplication -> wrap seamlessly at 1 set width.
    const compute = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      // measure width of first "set" (same count as baseCards)
      const setCount = baseCards.length || 6;
      let w = 0;
      for (let i = 0; i < Math.min(setCount, children.length); i++) {
        w += children[i].offsetWidth;
      }

      // include gaps via computed styles (gap-x)
      const style = window.getComputedStyle(el);
      const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
      // gaps between items in the set
      w += gap * (Math.min(setCount, children.length) - 1);

      widthRef.current = w || el.scrollWidth / 3 || 0;
    };

    compute();
    window.addEventListener("resize", compute);

    const speed = 0.45; // px per frame baseline (premium slow)
    const tick = () => {
      const w = widthRef.current;
      if (!w) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // pause on hover
      if (!hoverRef.current) {
        xRef.current += speed;
        if (xRef.current >= w) xRef.current -= w;
        el.style.transform = `translate3d(${-xRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", compute);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [baseCards.length, reducedMotion]);

  return (
    <section
      id="blog"
      className={cn(
        "relative bg-white",
        // ✅ move section a little up (less top spacing)
        "pt-6 pb-10 md:pt-8 md:pb-12"
      )}
      aria-label={lang === "fr" ? "Blog MultiiMaint" : "MultiiMaint Blog"}
    >
      {/* White background + subtle luxury gradients (static) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute -top-52 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/5 blur-3xl" />
        <div className="absolute -bottom-64 right-[10%] h-[640px] w-[640px] rounded-full bg-[#F47B20]/7 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {header.h}
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {header.p}
            </p>

            {/* ONE premium button */}
            <div className="mt-4 flex justify-center">
              <Link
                href="/blog"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                  "bg-[#0B1B4A] text-white",
                  "text-[13px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                  "transition hover:brightness-110",
                  "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/25"
                )}
                aria-label={viewAllLabel}
              >
                <IconBook className="h-4 w-4" />
                {viewAllLabel}
              </Link>
            </div>

            <p className="mt-3 text-[12px] font-semibold text-slate-500">
              {lang === "fr"
                ? "Maintenance • Hygiène • Sécurité • KPI • Facilities management"
                : "Maintenance • Hygiene • Safety • KPIs • Facilities management"}
            </p>
          </div>
        </Reveal>
      </div>

      {/* ✅ Continuous one-row premium slider (no blank space) */}
      <div className="mt-6">
        {/* Mask edges for luxury feel */}
        <div
          className={cn(
            "relative overflow-hidden",
            "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent",
            "after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent"
          )}
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="relative">
              <div
                ref={trackRef}
                className={cn(
                  "flex w-max gap-5",
                  // smooth transform for reduced motion too
                  "will-change-transform"
                )}
                style={{
                  transform: "translate3d(0,0,0)",
                }}
                aria-label={lang === "fr" ? "Carrousel d’articles" : "Posts carousel"}
              >
                {loopCards.map((b: any, idx: number) => (
                  <article
                    key={b._k}
                    className={cn(
                      "group relative overflow-hidden rounded-[28px] bg-white",
                      "border border-slate-200/80",
                      "shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                      "transition-all duration-300",
                      "hover:-translate-y-[2px] hover:shadow-[0_26px_85px_rgba(2,6,23,.12)]"
                    )}
                    // ✅ fixed width ensures no “blank” holes; responsive widths
                    style={{
                      width: "min(86vw, 360px)",
                    }}
                  >
                    {/* Top accent line */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#0B1B4A] to-[#F47B20]" />

                    {/* Image */}
                    <div className="relative h-[190px] overflow-hidden">
                      <Image
                        src={b.img}
                        alt={b.alt}
                        fill
                        sizes="(max-width: 640px) 86vw, 360px"
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        priority={idx < 2}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[11px] font-extrabold text-[#0B1B4A] ring-1 ring-white/60">
                        {lang === "fr" ? "Conseil Pro" : "Pro Tip"}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-5">
                      <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900">
                        {b.t}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate-700 line-clamp-3">
                        {b.d}
                      </p>

                      {/* Card button */}
                      <div className="mt-4">
                        <Link
                          href="/blog"
                          className={cn(
                            "inline-flex h-10 w-full items-center justify-center rounded-2xl",
                            "bg-[#F47B20] text-[#0B1B4A]",
                            "text-[13px] font-extrabold",
                            "shadow-[0_14px_30px_rgba(244,123,32,.18)]",
                            "transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.26)]",
                            "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/20"
                          )}
                          aria-label={`${lang === "fr" ? "Lire la suite" : "Read more"}: ${b.t}`}
                        >
                          {lang === "fr" ? "Lire la suite" : "Read more"}
                        </Link>
                      </div>

                      <span className="sr-only">
                        {lang === "fr"
                          ? `Article MultiiMaint: ${b.t}. Conseils en maintenance, hygiène, sécurité et facilities management à Maurice.`
                          : `MultiiMaint article: ${b.t}. Tips on maintenance, hygiene, safety and facilities management in Mauritius.`}
                      </span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Reduced motion fallback: allow manual horizontal scroll */}
              {reducedMotion && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="pointer-events-auto absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-slate-200">
                    {lang === "fr" ? "Faites défiler →" : "Scroll →"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile friendliness: allow swipe scroll even with autoplay */}
        <style jsx>{`
          @media (prefers-reduced-motion: reduce) {
            div[aria-label="Posts carousel"] {
              transform: none !important;
            }
          }
        `}</style>

        {/* ✅ On touch devices: allow user swipe by enabling overflow-x */}
        <div className="mx-auto max-w-6xl px-4">
          <div className="mt-4 -mx-4 px-4 overflow-x-auto md:hidden">
            <div className="w-max h-0" />
          </div>
        </div>
      </div>

      <p className="sr-only">
        {lang === "fr"
          ? "Blog MultiiMaint à l’île Maurice : maintenance, nettoyage professionnel, hygiène, sécurité, conformité, KPI et facilities management."
          : "MultiiMaint blog in Mauritius: maintenance, professional cleaning, hygiene, safety, compliance, KPIs and facilities management."}
      </p>
    </section>
  );
}