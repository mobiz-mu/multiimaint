"use client";

import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero } from "@/components/multiimaint/PageBits";

export function PolicyTemplate({
  type,
  bodyEn,
  bodyFr,
}: {
  type: "privacy" | "terms" | "refund" | "cookies";
  bodyEn: string[];
  bodyFr: string[];
}) {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const p = c.pages.policies[lang][type];

  const lines = lang === "fr" ? bodyFr : bodyEn;

  return (
    <PageWrap>
      <PageHero
        kicker={lang === "fr" ? "Politique officielle" : "Official policy"}
        title={p.title}
        desc={p.desc}
      />

      <section className="mt-7 rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)]">
        <div className="space-y-3 text-[14px] leading-relaxed text-slate-700">
          {lines.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        <p className="sr-only">
          MultiiMaint {p.title} Mauritius.
        </p>
      </section>
    </PageWrap>
  );
}
