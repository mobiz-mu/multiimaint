"use client";

import { useLang } from "@/contexts/LangContext";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function LangToggle() {
  const { lang, setLang } = useLang();

  const isFr = lang === "fr";

  return (
    <div
      className={cn(
        "hidden md:inline-flex items-center",
        "rounded-2xl border border-white/16 bg-white/8 p-1",
        "backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,.20)]"
      )}
      role="group"
      aria-label="Language switch"
    >
      {/* ✅ Animated sliding pill */}
      <div className="relative inline-flex items-center gap-1">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute top-1 bottom-1 left-1 w-[48px] rounded-xl",
            "bg-white/18 ring-1 ring-white/16",
            "shadow-[0_10px_22px_rgba(0,0,0,.18)]",
            "transition-transform duration-300 ease-out",
            isFr ? "translate-x-0" : "translate-x-[52px]"
          )}
        />

        <button
          type="button"
          onClick={() => setLang("fr")}
          aria-pressed={isFr}
          className={cn(
            "relative z-10 h-9 w-[48px] rounded-xl",
            "text-[12px] font-extrabold tracking-wide",
            "transition-colors duration-200",
            isFr ? "text-white" : "text-white/70 hover:text-white"
          )}
        >
          FR
        </button>

        <button
          type="button"
          onClick={() => setLang("en")}
          aria-pressed={!isFr}
          className={cn(
            "relative z-10 h-9 w-[48px] rounded-xl",
            "text-[12px] font-extrabold tracking-wide",
            "transition-colors duration-200",
            !isFr ? "text-white" : "text-white/70 hover:text-white"
          )}
        >
          EN
        </button>
      </div>

      {/* ✅ Tiny premium shimmer line */}
      <span
        aria-hidden="true"
        className="ml-2 hidden h-7 w-[1px] bg-white/20 md:block"
      />
      <span
        aria-hidden="true"
        className="ml-2 hidden text-[11px] font-extrabold tracking-wide text-white/80 md:block animate-[mm_fadeIn_.35s_ease-out]"
      >
        {isFr ? "FR" : "EN"}
      </span>
    </div>
  );
}

