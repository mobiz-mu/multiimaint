"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "fr" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (v: Lang) => void;
  toggle: () => void;
};

const LangCtx = createContext<LangContextType | null>(null);

function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "fr";
  const n = navigator.language?.toLowerCase() || "";
  return n.startsWith("fr") ? "fr" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);

  // ⬇️ Initial language resolution (once)
  useEffect(() => {
    const saved = localStorage.getItem("mm_lang");
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    } else {
      setLang(detectBrowserLang());
    }
    setMounted(true);
  }, []);

  // ⬇️ Persist + sync <html lang>
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("mm_lang", lang);
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle: () => setLang((p) => (p === "fr" ? "en" : "fr")),
    }),
    [lang]
  );

  if (!mounted) return null; // prevents hydration flicker

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) {
    throw new Error("useLang must be used inside LangProvider");
  }
  return ctx;
}

