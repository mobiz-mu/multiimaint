"use client";

import Header from "@/components/multiimaint/Header";
import HomeContact from "@/components/multiimaint/HomeContact";
import Footer from "@/components/multiimaint/Footer";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";

export default function ContactPage() {
  const { lang } = useLang();
  const c = copy(lang);

  return (
    <>
      <Header />

      {/* ✅ Full-width main so HomeContact background blobs don’t get clipped */}
      <main id="main" className="w-full">
        {/* ===== Premium page hero ===== */}
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-white/85 py-10 backdrop-blur">
          {/* soft premium blobs */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl animate-[mm_floatCenter_12s_ease-in-out_infinite]" />
            <div className="absolute -bottom-40 left-[10%] h-[560px] w-[560px] rounded-full bg-red-500/8 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
            <div className="absolute -bottom-44 right-[10%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/8 blur-3xl animate-[mm_float3_12s_ease-in-out_infinite]" />
          </div>

          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              {/* mini breadcrumb */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-[12px] font-extrabold text-slate-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F47B20]" />
                {lang === "fr" ? "Accueil" : "Home"}
                <span className="text-slate-400">/</span>
                <span className="text-[#0B1B4A]">{c.sections.contact}</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                {lang === "fr" ? "Contactez MultiiMaint" : "Contact MultiiMaint"}
              </h1>

              <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
                {lang === "fr"
                  ? "Basés à Quatre Bornes, nous intervenons partout à l’île Maurice. Demandez un devis ou une intervention — réponse rapide via WhatsApp, et support par email."
                  : "Based in Quatre Bornes, we work across Mauritius. Request a quote or an intervention — fast reply via WhatsApp, with email support as well."}
              </p>

              {/* quick contact pills */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:support@multiimaint.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-[13px] font-extrabold text-[#0B1B4A] shadow-sm hover:bg-white transition"
                >
                  <span className="h-2 w-2 rounded-full bg-[#0B1B4A]" />
                  support@multiimaint.com
                </a>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-2 text-[13px] font-extrabold text-slate-800 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                  {lang === "fr" ? "Quatre Bornes, Île Maurice" : "Quatre Bornes, Mauritius"}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== Contact section (your existing premium component) ===== */}
        <HomeContact />

        {/* SEO helper */}
        <p className="sr-only">
          {lang === "fr"
            ? "Contact MultiiMaint Ltd à Quatre Bornes, Île Maurice. Maintenance, nettoyage professionnel et facility management partout à Maurice. Email support@multiimaint.com."
            : "Contact MultiiMaint Ltd in Quatre Bornes, Mauritius. Maintenance, professional cleaning and facility management across Mauritius. Email support@multiimaint.com."}
        </p>
      </main>

      <Footer />
    </>
  );
}

