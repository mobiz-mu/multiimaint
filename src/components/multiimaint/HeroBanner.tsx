// src/components/multiimaint/HeroBanner.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

type Slide = {
  desktop: string;
  mobile: string;
  alt: string;
};

function SlideLayer({
  slide,
  priority,
  className,
}: {
  slide: Slide;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {/* Desktop (full image, no crop) */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={slide.desktop}
          alt={slide.alt}
          fill
          priority={priority}
          sizes="100vw"
          className="select-none object-contain object-center"
        />
      </div>

      {/* Mobile (full image, no crop) */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src={slide.mobile}
          alt={slide.alt}
          fill
          priority={priority}
          sizes="100vw"
          className="select-none object-contain object-center"
        />
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        desktop: "/herobanner/Multiimaintcleaning.png",
        mobile: "/herobanner/mobile/Professional Cleaning.jpeg",
        alt: "MultiiMaint Professional Cleaning in Mauritius",
      },
      {
        desktop: "/herobanner/Multiimaintmaintenance.png",
        mobile: "/herobanner/mobile/Maintenance.jpeg",
        alt: "MultiiMaint Maintenance Services in Mauritius",
      },
      {
        desktop: "/herobanner/gardeningmultiimaint.png",
        mobile: "/herobanner/mobile/Gardening.jpeg",
        alt: "MultiiMaint Gardening Services in Mauritius",
      },
      {
        desktop: "/herobanner/Multiimaintfacilitiesmagemernt.png",
        mobile: "/herobanner/mobile/Facilities Management.jpeg",
        alt: "MultiiMaint Facilities Management in Mauritius",
      },
      {
        desktop: "/herobanner/airconditioningmultiimaint.png",
        mobile: "/herobanner/mobile/Maintenance.jpeg",
        alt: "MultiiMaint Air Conditioning Services in Mauritius",
      },
    ],
    []
  );

  const n = slides.length;

  // ===== A11y: reduced motion
  const reducedMotion = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (reducedMotion.current = mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // ===== Measure header height so hero fits perfectly under it
  // Add `data-site-header` on your Header component root for best accuracy.
  // Example: <header data-site-header ...>
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const pickHeader = () =>
      (document.querySelector("[data-site-header]") as HTMLElement | null) ||
      (document.querySelector("header") as HTMLElement | null);

    const setVar = () => {
      const el = pickHeader();
      const h = el?.getBoundingClientRect().height ?? 0;
      root.style.setProperty("--mm-header-h", `${Math.max(0, Math.round(h))}px`);
    };

    setVar();

    const el = pickHeader();
    let ro: ResizeObserver | null = null;

    if (el && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => setVar());
      ro.observe(el);
    }

    window.addEventListener("resize", setVar);
    // if fonts load later, header height can change
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (document as any).fonts?.ready?.then?.(() => setVar());

    return () => {
      window.removeEventListener("resize", setVar);
      ro?.disconnect();
    };
  }, []);

  // ===== Premium cross-fade
  const DURATION = 520; // ms
  const intervalMs = 5200;

  const [active, setActive] = useState(0); // what you see after fade completes
  const [incoming, setIncoming] = useState<number | null>(null); // fading in
  const [fading, setFading] = useState(false);

  const timerRef = useRef<number | null>(null);
  const fadeRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (fadeRef.current) window.clearTimeout(fadeRef.current);
    timerRef.current = null;
    fadeRef.current = null;
  };

  const startFadeTo = (nextIndex: number) => {
    if (n <= 1) return;
    if (nextIndex === active) return;

    // If reduced motion, snap
    if (reducedMotion.current) {
      setIncoming(null);
      setFading(false);
      setActive((nextIndex + n) % n);
      return;
    }

    const target = (nextIndex + n) % n;
    setIncoming(target);
    // next tick so opacity transition always triggers
    requestAnimationFrame(() => setFading(true));

    if (fadeRef.current) window.clearTimeout(fadeRef.current);
    fadeRef.current = window.setTimeout(() => {
      setActive(target);
      setFading(false);
      // allow click to immediately fade again
      setIncoming(null);
    }, DURATION);
  };

  const goPrev = () => startFadeTo(active - 1);
  const goNext = () => startFadeTo(active + 1);

  // autoplay
  useEffect(() => {
    clearTimers();
    if (reducedMotion.current) return;
    timerRef.current = window.setInterval(() => {
      startFadeTo(active + 1);
    }, intervalMs);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, n]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const dotIndex = incoming ?? active;

  return (
    <section
      aria-label="MultiiMaint hero banner"
      className={cn(
        "relative w-full overflow-hidden bg-white",
        // Fits perfectly under header: full view height minus header height
        "min-h-[56svh] sm:min-h-[70svh]",
        "md:min-h-[calc(100svh-var(--mm-header-h,0px))]"
      )}
      style={{
        // extra safety for browsers where min-h calc behaves differently
        height: "calc(100svh - var(--mm-header-h, 0px))",
        maxHeight: "calc(100svh - var(--mm-header-h, 0px))",
      }}
    >
      {/* Background (keeps it premium even if images have transparent/odd ratios) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-slate-50" />

      {/* Image stage (full-width, full image visible - no cropping) */}
      <div className="absolute inset-0">
        {/* Current */}
        <SlideLayer slide={slides[active]} priority />

        {/* Incoming (fade on top) */}
        {incoming !== null ? (
          <SlideLayer
            slide={slides[incoming]}
            className={cn(
              "opacity-0",
              fading && "opacity-100",
              "transition-opacity"
            )}
            // inline style to ensure duration is exact
            // (Tailwind duration classes may differ across setups)
            // eslint-disable-next-line react/no-unknown-property
            style={undefined as any}
          />
        ) : null}

        {/* Premium contrast overlay (desktop stays clean; this is subtle) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/6 to-transparent" />
      </div>

      {/* Mobile glass panel (ONLY mobile) */}
      <div className="absolute inset-x-0 bottom-0 z-10 md:hidden">
        <div className="mx-auto w-full max-w-7xl px-4 pb-5">
          <div
            className={cn(
              "rounded-3xl p-4",
              "bg-white/12 backdrop-blur-xl",
              "ring-1 ring-white/20",
              "shadow-[0_18px_60px_rgba(0,0,0,.25)]"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold tracking-[0.18em] text-white/85">
                  MULTIIMAINT • MAURITIUS
                </div>
                <div className="mt-1 text-balance text-[18px] font-extrabold leading-snug text-white">
                  Pa stress, nou la pou sa.
                </div>
                <div className="mt-1 text-[12.5px] font-semibold leading-relaxed text-white/80">
                  Maintenance • Nettoyage • Facilities • Jardinage
                </div>
              </div>

              <Link
                href="/contact"
                className={cn(
                  "shrink-0 inline-flex items-center justify-center",
                  "rounded-2xl px-4 py-2.5",
                  "bg-[#F47B20] text-[#0B1B4A]",
                  "text-[12.5px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(244,123,32,.28)]",
                  "active:scale-[0.99] transition"
                )}
                aria-label="Contact MultiiMaint"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className={cn(
          "absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10",
          "h-10 w-10 sm:h-12 sm:w-12 rounded-full grid place-items-center",
          "bg-white/85 backdrop-blur border border-white/50",
          "text-[#0B1B4A] shadow-lg active:scale-95 transition",
          "touch-manipulation"
        )}
      >
        <span className="text-2xl leading-none">‹</span>
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className={cn(
          "absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10",
          "h-10 w-10 sm:h-12 sm:w-12 rounded-full grid place-items-center",
          "bg-white/85 backdrop-blur border border-white/50",
          "text-[#0B1B4A] shadow-lg active:scale-95 transition",
          "touch-manipulation"
        )}
      >
        <span className="text-2xl leading-none">›</span>
      </button>

      {/* Dots (kept above mobile glass) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 md:bottom-5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => startFadeTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === dotIndex ? "w-8 bg-[#F47B20]" : "w-2.5 bg-white/70"
            )}
          />
        ))}
      </div>

      {/* A11y helper */}
      <p className="sr-only" aria-live="polite">
        Slide {dotIndex + 1} of {n}.
      </p>

      {/* Force our fade duration exactly (without relying on Tailwind config) */}
      <style jsx>{`
        :global(.transition-opacity) {
          transition-duration: ${DURATION}ms;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  );
}