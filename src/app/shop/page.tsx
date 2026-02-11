"use client";

import Header from "@/components/multiimaint/Header";
import HomeShop from "@/components/multiimaint/HomeShop";
import Footer from "@/components/multiimaint/Footer";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";

export default function ShopPage() {
  const { lang } = useLang();
  const c = copy(lang);

  return (
    <>
      <Header />

      {/* ✅ Full-width main (no clipping, same premium style as Services/Contact) */}
      <main id="main" className="w-full">
        {/* ===== Premium page hero ===== */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white/85 py-10 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/12 blur-3xl animate-[mm_floatCenter_12s_ease-in-out_infinite]" />
            <div className="absolute -bottom-44 left-[12%] h-[560px] w-[560px] rounded-full bg-red-500/8 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
            <div className="absolute -bottom-40 right-[10%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_float3_12s_ease-in-out_infinite]" />
          </div>

          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              {/* mini breadcrumb */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-[12px] font-extrabold text-slate-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F47B20]" />
                {lang === "fr" ? "Accueil" : "Home"}
                <span className="text-slate-400">/</span>
                <span className="text-[#0B1B4A]">{c.sections.shop}</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {lang === "fr" ? "Boutique Professionnelle" : "Professional Shop"}
              </h1>

              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
                {lang === "fr"
                  ? "Outils & équipements, produits de nettoyage et pièces détachées — commande rapide et devis instantané via WhatsApp. Qualité pro, disponibilité et suivi."
                  : "Tools & equipment, cleaning products and spare parts — fast ordering and instant WhatsApp quotes. Pro-grade quality, availability and follow-up."}
              </p>

              {/* quick category chips (anchors for later sections) */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { id: "tools", label: lang === "fr" ? "Outils & Équipements" : "Tools & Equipment" },
                  { id: "cleaning-products", label: lang === "fr" ? "Produits Nettoyage" : "Cleaning Products" },
                  { id: "spares", label: lang === "fr" ? "Pièces Détachées" : "Spare Parts" },
                ].map((x) => (
                  <a
                    key={x.id}
                    href={`#${x.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-[12px] font-extrabold text-slate-800 shadow-sm hover:bg-white transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0B1B4A]" />
                    {x.label}
                  </a>
                ))}
              </div>

              {/* small premium note */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0B1B4A]/95 px-4 py-2 text-[12px] font-extrabold text-white shadow-[0_14px_34px_rgba(2,6,23,.22)]">
                <span className="text-[#F47B20]">●</span>
                {lang === "fr"
                  ? "Devis WhatsApp • Commande rapide • Livraison / retrait selon disponibilité"
                  : "WhatsApp quotes • Fast ordering • Delivery / pickup depending on availability"}
              </div>

              {/* SEO helper (visible H1 above is premium; keep SR-only extra keywords) */}
              <p className="sr-only">
                {lang === "fr"
                  ? "Boutique Multiimaint à l’île Maurice : outils, produits de nettoyage et pièces détachées. Demandez un devis ou passez commande."
                  : "Multiimaint shop in Mauritius: tools, cleaning products and spare parts. Request a quote or place an order."}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== Shop section (your component already has its own header + cards) ===== */}
        <HomeShop />

        {/* ✅ anchors for category jumps (place real category sections later if you want) */}
        <div className="sr-only">
          <div id="tools" />
          <div id="cleaning-products" />
          <div id="spares" />
        </div>
      </main>

      <Footer />
    </>
  );
}
