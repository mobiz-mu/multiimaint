"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

type Slide = {
  desktop: string;
  mobile: string;
  alt: string;
};

export default function HeroBanner() {
  const slides = useMemo<Slide[]>(
    () => [
      {
        desktop: "/herobanner/Multiimaintcleaning.png",
        mobile: "/herobanner/mobile/Professional Cleaning.jpeg",
        alt: "MultiiMaint Cleaning Mauritius",
      },
      {
        desktop: "/herobanner/Multiimaintmaintenance.png",
        mobile: "/herobanner/mobile/Maintenance.jpeg",
        alt: "MultiiMaint Maintenance Mauritius",
      },
      {
        desktop: "/herobanner/gardeningmultiimaint.png",
        mobile: "/herobanner/mobile/Gardening.jpeg",
        alt: "MultiiMaint Gardening Mauritius",
      },
      {
        desktop: "/herobanner/Multiimaintfacilitiesmagemernt.png",
        mobile: "/herobanner/mobile/Facilities Management.jpeg",
        alt: "MultiiMaint Facility Management Mauritius",
      },
      {
        desktop: "/herobanner/airconditioningmultiimaint.png",
        mobile: "/herobanner/mobile/Maintenance.jpeg",
        alt: "MultiiMaint Air Conditioning Mauritius",
      },
    ],
    []
  );

  const n = slides.length;
  const loopSlides = [...slides, slides[0]];
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(true);

  const intervalMs = 5000; // ✅ 5 seconds

  // Auto slide every 5 sec
  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index !== n) return;
    const t = setTimeout(() => {
      setAnimating(false);
      setIndex(0);
      requestAnimationFrame(() => setAnimating(true));
    }, 600);
    return () => clearTimeout(t);
  }, [index, n]);

  const goPrev = () => {
    setAnimating(true);
    if (index === 0) {
      setAnimating(false);
      setIndex(n);
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

  const dotIndex = index === n ? 0 : index;

  return (
    <section className="w-screen h-[90vh] overflow-hidden relative m-0 p-0">
      <div
        className="absolute inset-0 flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animating ? "transform 600ms ease" : "none",
        }}
      >
        {loopSlides.map((s, i) => (
          <div key={i} className="relative w-screen h-[90vh] shrink-0">
            {/* Desktop FULL IMAGE NO CROP */}
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={s.desktop}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-contain object-center"
              />
            </div>

            {/* Mobile (keep crop style) */}
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

      {/* 🎯 Animated Colorful Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 
        w-12 h-12 rounded-full flex items-center justify-center
        bg-gradient-to-r from-[#00c853] to-[#F47B20]
        text-white text-2xl font-bold shadow-xl
        hover:scale-110 transition-all duration-300
        animate-pulse"
      >
        ‹
      </button>

      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 
        w-12 h-12 rounded-full flex items-center justify-center
        bg-gradient-to-r from-[#F47B20] to-[#00c853]
        text-white text-2xl font-bold shadow-xl
        hover:scale-110 transition-all duration-300
        animate-pulse"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {slides.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 rounded-full transition-all duration-300",
              i === dotIndex
                ? "w-8 bg-[#F47B20]"
                : "w-3 bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}