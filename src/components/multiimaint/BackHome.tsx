// src/components/multiimaint/BackHome.tsx
"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";

export default function BackHome() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  return (
    <div className="fixed left-4 top-[88px] z-[60] md:top-[96px]">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[13px] font-extrabold text-slate-900 shadow-[0_18px_50px_rgba(2,6,23,.10)] ring-1 ring-slate-200 backdrop-blur hover:bg-white"
      >
        ← {lang === "fr" ? "Accueil" : "Home"}
      </Link>
    </div>
  );
}
