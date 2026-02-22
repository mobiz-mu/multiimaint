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

function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const t =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0);
    setTouch(t);
  }, []);
  return touch;
}

function IconBook({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 19a2 2 0 0 0 2 2h12V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 8h8M8 12h8M8 16h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeBlog() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const isTouch = useIsTouch();

  const header = {
    h: lang === "fr" ? "Blog & Conseils" : "Blog & Tips",
    p:
      lang === "fr"
        ? "Guides premium en maintenance, hygiène et facilities management à Maurice."
        : "Premium guides on maintenance, hygiene and facilities management in Mauritius.",
  };

  const cards = useMemo(() => {
    const base: ReadonlyArray<{ t: string; d: string }> = c.blogCards ?? [];
    return base.slice(0, 6).map((b, i) => ({
      ...b,
      img: blogImages[i % blogImages.length],
      alt: `${b.t} — MultiiMaint Blog`,
      id: i,
    }));
  }, [c.blogCards]);

  const trackRef = useRef<HTMLDivElement | null>(null);

  // Desktop autoplay only
  useEffect(() => {
    if (isTouch) return;

    const el = trackRef.current;
    if (!el) return;

    let x = 0;
    const speed = 0.4;
    let raf: number;

    const loop = () => {
      x += speed;
      if (x >= el.scrollWidth / 2) x = 0;
      el.style.transform = `translate3d(-${x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isTouch]);

  return (
    <section
      id="blog"
      className="relative z-0 bg-white pt-6 pb-10 md:pt-8 md:pb-12"
      aria-label="MultiiMaint Blog"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {header.h}
            </h2>
            <p className="mt-2 text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
              {header.p}
            </p>

            <div className="mt-5 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-[#0B1B4A] text-white font-extrabold text-sm shadow-lg hover:brightness-110 transition"
              >
                <IconBook className="h-4 w-4" />
                {lang === "fr" ? "Voir tous les articles" : "View all posts"}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Carousel */}
      <div className="mt-8">
        <div
          className={cn(
            "relative",
            "overflow-x-auto md:overflow-hidden",
            "touch-pan-x overscroll-x-contain",
            "[&::-webkit-scrollbar]:hidden"
          )}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform min-w-full"
          >
              {[...cards, ...cards].map((b, i) => (
                <article
                  key={i}
                  className="w-[80vw] sm:w-[360px] shrink-0 rounded-[28px] bg-white border border-slate-200 shadow-[0_18px_60px_rgba(2,6,23,.08)] overflow-hidden"
                >
                  <div className="relative h-[190px]">
                    <Image
                      src={b.img}
                      alt={b.alt}
                      fill
                      sizes="(max-width: 768px) 85vw, 360px"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-extrabold text-slate-900 text-[15px]">
                      {b.t}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {b.d}
                    </p>

                    <Link
                      href="/blog"
                      className="mt-4 inline-flex w-full justify-center rounded-2xl bg-[#F47B20] px-4 py-2 text-sm font-extrabold text-[#0B1B4A] shadow-md hover:brightness-110 transition"
                    >
                      {lang === "fr" ? "Lire la suite" : "Read more"}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">
        MultiiMaint blog Mauritius maintenance cleaning hygiene facilities management.
      </p>
    </section>
  );
}