// src/components/HeroReveal.tsx
"use client";

import React from "react";
import Reveal from "@/components/Reveal";

/**
 * HeroReveal — luxury easing + sensible default delays for hero/title blocks
 */
export default function HeroReveal({
  children,
  className = "",
  delay = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={[
        className,
        // premium easing (Apple-like)
        "ease-[cubic-bezier(.22,.61,.36,1)]",
      ].join(" ")}
    >
      {children}
    </Reveal>
  );
}
