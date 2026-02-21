// src/app/shop/ShopClient.tsx
"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

export default function ShopClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.shop[lang];

  const categories =
    lang === "fr"
      ? [
          { title: "Équipements de nettoyage", desc: "Machines, accessoires, solutions professionnelles." },
          { title: "Consommables & hygiène", desc: "Essentiels, consommables, kits et recharges." },
          { title: "Maintenance & outillage", desc: "Outils, pièces et besoins techniques." },
        ]
      : [
          { title: "Cleaning equipment", desc: "Machines, accessories and pro-grade solutions." },
          { title: "Consumables & hygiene", desc: "Essentials, refills, kits and supplies." },
          { title: "Maintenance tools", desc: "Tools, parts and technical essentials." },
        ];

  return (
    <PageWrap>
      {/* ✅ Clean sticky back bar */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Services" : "Services"}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-5 py-2 text-[13px] font-extrabold text-slate-900 hover:bg-slate-200 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>
        </div>
      </div>

      <PageHero kicker={t.kicker} title={t.title} desc={t.desc}>
        <CTAButtons showShop={false} />
      </PageHero>

      {/* ✅ Premium 16:9 Coming Soon Banner (no image needed) */}
      <section className="mt-7">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(2,6,23,.08)]">
          <div className="relative aspect-[16/9] w-full">
            {/* Luxury gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(244,123,32,.35),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,.18),transparent_55%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

            <div className="absolute inset-0 flex items-end p-6 md:p-8">
              <div className="max-w-[820px] text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#F47B20]" />
                  {lang === "fr" ? "PROCHAINEMENT" : "COMING SOON"}
                </div>

                <h2 className="mt-3 text-[22px] font-extrabold leading-tight md:text-[30px]">
                  {lang === "fr"
                    ? "Boutique MultiiMaint — équipements & essentiels."
                    : "MultiiMaint Shop — equipment & essentials."}
                </h2>

                <p className="mt-2 text-[14px] text-white/90 md:text-[15px]">
                  {t.note}
                </p>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[13px] font-extrabold text-[#0B1B4A]"
                  >
                    {lang === "fr" ? "Demander un Devis" : "Request a Quote"}
                  </a>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-2xl bg-white/10 px-6 py-3 text-[13px] font-extrabold text-white ring-1 ring-white/20 hover:bg-white/15"
                  >
                    {lang === "fr" ? "Voir nos services" : "Explore our services"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Premium category cards */}
          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            {categories.map((x) => (
              <div key={x.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
                  {lang === "fr" ? "CATÉGORIE" : "CATEGORY"}
                </div>
                <div className="mt-2 text-[16px] font-extrabold text-slate-900">{x.title}</div>
                <div className="mt-2 text-[13px] leading-relaxed text-slate-700">{x.desc}</div>
                <div className="mt-4 text-[13px] font-semibold text-slate-900">
                  {lang === "fr"
                    ? "Bientôt : prix, stock & livraison locale."
                    : "Soon: pricing, stock & local delivery."}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint Shop in Mauritius: equipment and essentials for maintenance, cleaning and facilities. Coming soon.
      </span>
    </PageWrap>
  );
}