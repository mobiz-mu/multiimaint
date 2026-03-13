"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full">
      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-4",
          "flex flex-col",
          "gap-6 md:gap-8" // controlled vertical rhythm
        )}
      >
        {children}
      </div>
    </main>
  );
}

export function PageHero({
  kicker,
  title,
  desc,
  right,
  children,
}: {
  kicker?: string;
  title: string;
  desc?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-[28px]",
        "border border-slate-200 bg-white",
        "shadow-[0_18px_55px_rgba(2,6,23,.07)]"
      )}
    >
      {/* Premium top border */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0B1B4A] via-[#F47B20] to-[#0B1B4A]" />
      <div className="pointer-events-none absolute -top-24 right-[-80px] h-[260px] w-[260px] rounded-full bg-[#F47B20]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-[-80px] h-[260px] w-[260px] rounded-full bg-[#0B1B4A]/10 blur-3xl" />

      <div className="relative p-5 md:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            {kicker ? (
              <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{kicker}</div>
            ) : null}

            <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {title}
            </h1>

            {desc ? (
              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-700 md:text-[15px]">
                {desc}
              </p>
            ) : null}

            {children ? <div className="mt-5">{children}</div> : null}
          </div>

          {right ? (
            <div className="shrink-0 md:max-w-[340px]">{right}</div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function CTAButtons({ showShop = true }: { showShop?: boolean }) {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="/contact"
        className={cn(
          "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-[13px] font-extrabold",
          "bg-[#F47B20] text-[#0B1B4A]",
          "shadow-[0_14px_30px_rgba(244,123,32,.25)]",
          "transition hover:-translate-y-[1px] hover:shadow-[0_18px_44px_rgba(244,123,32,.34)]",
          "focus:outline-none focus:ring-2 focus:ring-slate-400"
        )}
      >
        {lang === "fr" ? "Demander un devis" : "Request a quote"}
      </Link>

      {showShop ? (
        <Link
          href="/shop"
          className={cn(
            "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-[13px] font-extrabold",
            "bg-white text-slate-900 ring-1 ring-slate-200",
            "transition hover:bg-slate-50",
            "focus:outline-none focus:ring-2 focus:ring-slate-400"
          )}
        >
          {c.nav?.shop ?? (lang === "fr" ? "Boutique" : "Shop")}
        </Link>
      ) : null}
    </div>
  );
}
