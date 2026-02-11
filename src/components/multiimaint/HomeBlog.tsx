"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

function rotateBy<T>(arr: T[], n: number) {
  const len = arr.length;
  if (!len) return arr;
  const k = ((n % len) + len) % len;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

/** ✅ Hero-only reveal wrapper (more elegant than default Reveal) */
function HeroReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "transition-all duration-700 will-change-transform",
        "opacity-100",
        className
      )}
    >
      {children}
    </Reveal>
  );
}

export default function HomeBlog() {
  const { lang } = useLang();
  const c = copy(lang);

  const [shift, setShift] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setShift((s) => (s + 1) % 6), 5000);
    return () => clearInterval(t);
  }, []);

  const header = useMemo(() => {
    return {
      h: lang === "fr" ? "Blog & Conseils" : "Blog & Tips",
      p:
        lang === "fr"
          ? "Guides premium en maintenance, hygiène, optimisation des coûts et facility management — pour mieux planifier, mieux contrôler et améliorer la qualité au quotidien."
          : "Premium guides on maintenance, hygiene, cost optimization and facility management — to plan better, control quality and improve day-to-day operations.",
    };
  }, [lang]);

  const cards = useMemo(() => {
    const base = c.blogCards || [];
    const withImg = base.map((b: any, idx: number) => ({
      ...b,
      img: blogImages[idx % blogImages.length],
      idx,
    }));
    return rotateBy(withImg, shift);
  }, [c.blogCards, shift]);

  return (
    <section id="blog" className="relative py-14 md:py-20">
      {/* premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_floatCenter_11s_ease-in-out_infinite]" />
        <div className="absolute -bottom-56 right-[12%] h-[620px] w-[620px] rounded-full bg-[#F47B20]/10 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* ✅ HeroReveal for header */}
        <HeroReveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {header.h}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {header.p}
            </p>
          </div>
        </HeroReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {cards.map((b: any, idx: number) => (
            <Reveal key={`${b.t}-${b.idx}-${shift}`} delay={0.03 + idx * 0.02}>
              <article
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl",
                  "border border-white/40 bg-white/55 backdrop-blur-xl",
                  "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                  "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]"
                )}
              >
                {/* ✅ Optional: full card clickable overlay (DOES NOT block Read more) */}
                <Link
                  href="/blog"
                  aria-label={lang === "fr" ? "Voir le blog" : "View blog"}
                  className="absolute inset-0 z-10"
                />

                {/* top line */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b] opacity-95" />

                {/* image */}
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={b.img}
                    alt={b.t}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    priority={idx === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="pointer-events-none absolute -left-20 top-0 h-full w-64 rotate-12 bg-white/30 opacity-40 blur-[0.6px]" />
                </div>

                {/* content */}
                <div className="relative z-20 flex h-full flex-col p-5">
                  <h3 className="text-[15px] font-extrabold tracking-tight text-slate-900">
                    {b.t}
                  </h3>

                  <p className="mt-2 text-[13px] leading-relaxed text-slate-700 line-clamp-3">
                    {b.d}
                  </p>

                  {/* ✅ bottom-right Read More (visible, above overlay) */}
                  <div className="mt-auto pt-4 flex justify-end">
                    <Link
                      href="/blog"
                      aria-label={lang === "fr" ? "Lire la suite" : "Read more"}
                      className={cn(
                        "relative z-[30] inline-flex items-center gap-2",
                        "text-[13px] font-extrabold tracking-tight",
                        "text-[#0B1B4A]",
                        "transition-colors hover:text-[#0B1B4A]",
                        "group/read"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="underline-offset-4 group-hover/read:underline">
                        {lang === "fr" ? "Lire la suite" : "Read more"}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "inline-flex items-center justify-center",
                          "text-[#F47B20]",
                          "transition-transform duration-300",
                          "group-hover/read:translate-x-1",
                          "animate-[mm_arrowPulse_1.6s_ease-in-out_infinite]"
                        )}
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="sr-only">
          {lang === "fr"
            ? "Blog MultiiMaint : maintenance, nettoyage professionnel, hygiène, sécurité, conformité et facility management à l’île Maurice."
            : "MultiiMaint blog: maintenance, professional cleaning, hygiene, safety, compliance and facility management in Mauritius."}
        </p>
      </div>
    </section>
  );
}

