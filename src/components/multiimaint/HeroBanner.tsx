"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
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
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

type Slide = {
  desktop: string;
  mobile: string;
  alt: string;
};

export default function HeroBanner() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const reducedMotion = usePrefersReducedMotion();

  const slides = useMemo<Slide[]>(
    () => [
      {
        desktop: "/herobanner/desktop/Professional Cleaning.png",
        mobile: "/herobanner/mobile/Professional Cleaning.jpeg",
        alt:
          lang === "fr"
            ? "Nettoyage professionnel MultiiMaint à l’Île Maurice : hygiène premium, désinfection et contrôle qualité."
            : "MultiiMaint professional cleaning in Mauritius: premium hygiene, disinfection and quality control.",
      },
      {
        desktop: "/herobanner/desktop/Maintenance.png",
        mobile: "/herobanner/mobile/Maintenance.jpeg",
        alt:
          lang === "fr"
            ? "Maintenance MultiiMaint à Maurice : intervention rapide, prévention, sécurité et reporting."
            : "MultiiMaint maintenance in Mauritius: fast response, prevention, safety and reporting.",
      },
      {
        desktop: "/herobanner/desktop/Gardening.png",
        mobile: "/herobanner/mobile/Gardening.jpeg",
        alt:
          lang === "fr"
            ? "Jardinage MultiiMaint à Maurice : entretien espaces verts, propreté extérieure et interventions planifiées."
            : "MultiiMaint gardening in Mauritius: green space upkeep, outdoor cleanliness and scheduled visits.",
      },
      {
        desktop: "/herobanner/desktop/Facilities Management.png",
        mobile: "/herobanner/mobile/Facilities Management.jpeg",
        alt:
          lang === "fr"
            ? "Facilities Management MultiiMaint à Maurice : supervision de site, coordination et KPI reporting."
            : "MultiiMaint facilities management in Mauritius: site supervision, coordination and KPI reporting.",
      },
    ],
    [lang]
  );

  const n = slides.length;

  // We add 1 cloned slide at the end for perfect looping
  const loopSlides = useMemo(() => [...slides, slides[0]], [slides]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0); // 0..n (n is the clone)
  const [pause, setPause] = useState(false);
  const [animating, setAnimating] = useState(true);

  const intervalMs = 5200;

  // auto slide: 1 -> 2 -> 3 -> 4
  useEffect(() => {
    if (reducedMotion || pause) return;
    const id = window.setInterval(() => {
      setAnimating(true);
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [pause, reducedMotion]);

  // when we reach the cloned slide, jump back to 0 without animation
  useEffect(() => {
    if (index !== n) return;

    const t = window.setTimeout(() => {
      setAnimating(false); // remove transition
      setIndex(0); // jump instantly
      // re-enable transition next frame
      requestAnimationFrame(() => setAnimating(true));
    }, 650); // must match transition duration below

    return () => window.clearTimeout(t);
  }, [index, n]);

  // manual controls
  const goPrev = () => {
    setAnimating(true);
    // if currently at 0, jump to last real slide instantly then animate back one
    if (index === 0) {
      setAnimating(false);
      setIndex(n); // go to clone position (same as first)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(true);
          setIndex(n - 1);
        });
      });
      return;
    }
    setIndex((i) => i - 1);
  };

  const goNext = () => {
    setAnimating(true);
    setIndex((i) => i + 1);
  };

  const goTo = (i: number) => {
    setAnimating(true);
    setIndex(i);
  };

  const dotIndex = index === n ? 0 : index;

  return (
    <section
      className="relative -mt-2"
      aria-label={lang === "fr" ? "Bannière MultiiMaint" : "MultiiMaint hero banner"}
    >
      {/* FULL WIDTH STRIP - no forced bg */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            "aspect-[9/16] md:aspect-[16/9]",
            "max-h-[92vh] md:max-h-none",
            "touch-pan-y"
          )}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          {/* TRACK */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex"
            style={{
              transform: `translate3d(-${index * 100}%,0,0)`,
              transition: animating ? "transform 650ms cubic-bezier(.2,.8,.2,1)" : "none",
              willChange: "transform",
            }}
          >
            {loopSlides.map((s, i) => (
              <div key={i} className="relative h-full w-full shrink-0 basis-full">
                {/* Desktop */}
                <div className="absolute inset-0 hidden md:block">
                  <Image
                    src={s.desktop}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Mobile */}
                <div className="absolute inset-0 block md:hidden">
                  <Image
                    src={s.mobile}
                    alt={s.alt}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE GLASS ONLY (kept as-is) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4 md:hidden pointer-events-none">
            <div className="pointer-events-auto w-full max-w-[420px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 text-center text-white shadow-[0_30px_90px_rgba(0,0,0,.35)]">
              <HeroReveal>
                <div className="text-[11px] font-extrabold tracking-widest text-[#F47B20]">
                  Mauritius • Fast Response • Quality
                </div>
              </HeroReveal>

              <HeroReveal delay={0.06}>
                <h1 className="mt-2 text-2xl font-extrabold leading-tight">
                  {lang === "fr"
                    ? "Big or small issue — we’ve got you covered!"
                    : "Big or small issue — we’ve got you covered!"}
                </h1>
              </HeroReveal>

              <HeroReveal delay={0.1}>
                <p className="mt-3 text-sm text-white/90">
                  {lang === "fr"
                    ? "Maintenance, nettoyage, facility management et jardinage — pour maisons & entreprises."
                    : "Maintenance, cleaning, facility management and gardening — for homes & businesses."}
                </p>
              </HeroReveal>

              <HeroReveal delay={0.14}>
                <a
                  href="#contact"
                  className="mt-5 inline-flex w-full justify-center rounded-xl bg-[#F47B20] px-6 py-3 font-extrabold text-[#0B1B4A]"
                >
                  {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
                </a>
              </HeroReveal>
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            aria-label={lang === "fr" ? "Image précédente" : "Previous image"}
            onClick={goPrev}
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15 transition"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={lang === "fr" ? "Image suivante" : "Next image"}
            onClick={goNext}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md ring-1 ring-white/20 hover:bg-white/15 transition"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 flex gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md ring-1 ring-white/15">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={lang === "fr" ? `Aller à la photo ${i + 1}` : `Go to image ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === dotIndex ? "bg-[#F47B20] w-7" : "bg-white/60 w-2.5 hover:bg-white/80"
                )}
              />
            ))}
          </div>

          {/* SEO helper */}
          <p className="sr-only">
            {lang === "fr"
              ? "Bannière MultiiMaint : maintenance, nettoyage, facilities management et jardinage à l’Île Maurice."
              : "MultiiMaint hero banner: maintenance, cleaning, facilities management and gardening in Mauritius."}
          </p>
        </div>
      </div>
    </section>
  );
}