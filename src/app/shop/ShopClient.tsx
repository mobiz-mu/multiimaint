// src/app/shop/ShopClient.tsx
"use client";

import Link from "next/link";
import React, { useMemo } from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

export default function ShopClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.shop[lang];

  const categories =
    lang === "fr"
      ? [
          { title: "Équipements de nettoyage", desc: "Machines, accessoires et solutions professionnelles." },
          { title: "Consommables & hygiène", desc: "Essentiels, kits, recharges et fournitures." },
          { title: "Maintenance & outillage", desc: "Outils techniques, pièces et besoins terrain." },
        ]
      : [
          { title: "Cleaning equipment", desc: "Machines, accessories and pro-grade solutions." },
          { title: "Consumables & hygiene", desc: "Essentials, refills, kits and supplies." },
          { title: "Maintenance tools", desc: "Technical tools, parts and field essentials." },
        ];

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Store",
      name: "MultiiMaint Shop",
      description:
        lang === "fr"
          ? "Boutique MultiiMaint à Maurice : équipements, consommables et solutions professionnelles. Prochainement disponible."
          : "MultiiMaint Shop in Mauritius: equipment, consumables and professional solutions. Coming soon.",
      areaServed: {
        "@type": "Country",
        name: "Mauritius",
      },
    };
  }, [lang]);

  return (
    <PageWrap>
      {/* =========================
          HERO – PREMIUM COMING SOON
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">

          {/* Dark navy + orange luxury gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/30 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(244,123,32,.35),transparent_55%)]" />

          {/* Glass overlay center */}
          <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 text-center">
            <div className="max-w-[900px] rounded-[30px] bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-12 shadow-[0_20px_70px_rgba(0,0,0,.45)]">

              {/* Orange / Blue overlay text */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-[12px] font-extrabold tracking-widest text-white ring-1 ring-white/20">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {lang === "fr" ? "PROCHAINEMENT" : "COMING SOON"}
              </div>

              <h1 className="mt-6 text-[40px] font-extrabold leading-tight text-white md:text-[64px]">
                MultiiMaint Shop
              </h1>

              <h2 className="mt-3 text-[20px] font-bold text-[#F47B20] md:text-[26px]">
                {lang === "fr"
                  ? "Équipements & Essentiels Professionnels"
                  : "Professional Equipment & Essentials"}
              </h2>

              <p className="mt-5 text-[15px] leading-relaxed text-white/85 md:text-[17px]">
                {t.note}
              </p>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-8 py-4 text-[14px] font-extrabold text-[#0B1B4A] shadow-lg transition hover:scale-105 hover:brightness-110"
                >
                  {lang === "fr" ? "Contactez-nous" : "Contact Us"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CATEGORY PREVIEW
      ========================= */}
      <section className="mt-6">
        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(2,6,23,.06)] md:p-10">

          <div className="text-center">
            <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
              {lang === "fr" ? "APERÇU BOUTIQUE" : "SHOP PREVIEW"}
            </div>
            <h2 className="mt-2 text-[26px] font-extrabold text-slate-900">
              {lang === "fr"
                ? "Catégories disponibles bientôt"
                : "Categories launching soon"}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {categories.map((x) => (
              <div
                key={x.title}
                className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                  {lang === "fr" ? "CATÉGORIE" : "CATEGORY"}
                </div>

                <div className="mt-3 text-[18px] font-extrabold text-slate-900">
                  {x.title}
                </div>

                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                  {x.desc}
                </p>

                <div className="mt-6 text-[13px] font-semibold text-[#0B1B4A]">
                  {lang === "fr"
                    ? "Prix, stock & livraison locale bientôt disponibles."
                    : "Pricing, stock & local delivery coming soon."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <span className="sr-only">
        MultiiMaint Shop Mauritius. Professional cleaning equipment, maintenance tools and consumables. Coming soon.
      </span>
    </PageWrap>
  );
}
