// src/components/Stagger.tsx
"use client";

import React from "react";
import Reveal from "@/components/Reveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { staggerAdaptive } from "@/lib/stagger";

export function StaggerGroup({
  children,
  className = "",
  base = 0.05,
  step = 0.03,
}: {
  children: React.ReactNode;
  className?: string;
  base?: number;
  step?: number;
}) {
  const isMobile = useIsMobile();
  const kids = React.Children.toArray(children);

  return (
    <div className={className}>
      {kids.map((child, i) => (
        <Reveal key={i} delay={isMobile ? staggerAdaptive(i, true) : base + i * step}>
          {child as any}
        </Reveal>
      ))}
    </div>
  );
}
