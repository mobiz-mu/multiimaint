"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function PoliciesClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const p = c.pages.policies[lang];

  const list = [
    { href: "/policies/privacy", title: p.privacy.title, desc: p.privacy.desc },
    { href: "/policies/terms", title: p.terms.title, desc: p.terms.desc },
    { href: "/policies/refund", title: p.refund.title, desc: p.refund.desc },
    { href: "/policies/cookies", title: p.cookies.title, desc: p.cookies.desc },
  ];

  return (
    <PageWrap>
      <PageHero
        kicker={lang === "fr" ? "Légal • Confiance • Transparence" : "Legal • Trust • Transparency"}
        title={lang === "fr" ? "Politiques" : "Policies"}
        desc={lang === "fr" ? "Consultez nos politiques officielles." : "View our official policies."}
      />

      <section className="mt-7 grid gap-6 sm:grid-cols-2">
        {list.map((it) => (
          <article
            key={it.href}
            className={cn(
              "rounded-[28px] border border-slate-200 bg-white p-6",
              "shadow-[0_18px_55px_rgba(2,6,23,.06)]",
              "transition hover:-translate-y-[2px] hover:shadow-[0_26px_80px_rgba(2,6,23,.10)]"
            )}
          >
            <h2 className="text-[18px] font-extrabold text-slate-900">{it.title}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{it.desc}</p>
            <Link
              href={it.href}
              className="mt-4 inline-flex text-[13px] font-extrabold text-[#0B1B4A] hover:text-[#F47B20]"
            >
              {lang === "fr" ? "Ouvrir →" : "Open →"}
            </Link>
          </article>
        ))}
      </section>
    </PageWrap>
  );
}
