// src/components/multiimaint/HomeShop.tsx
"use client";

import Image from "next/image";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M20.5 11.8A8.5 8.5 0 0 1 7 18.7L3.5 19.5l.9-3.4A8.5 8.5 0 1 1 20.5 11.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.9c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.3l.8 1.9c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3-.1.5.3.7 1 1.5 1.8 2 .3.2.6.3.8.1l.6-.6c.2-.2.4-.2.6-.1l2 .9c.2.1.3.3.3.5v.6c0 .3-.1.5-.4.6-.7.3-1.7.4-2.7 0-1.3-.5-2.5-1.4-3.6-2.6-1.2-1.1-2-2.3-2.5-3.6-.4-1-.3-2 .1-2.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 15v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type Card = {
  title: string;
  desc: string;
  img: string;
  meta: string;
};

export default function HomeShop() {
  const { lang } = useLang() as { lang: "fr" | "en" };

  const WA_PHONE = "23057160579";
  const WA_TEXT =
    lang === "fr"
      ? "Bonjour Multiimaint, Mo bizin ene quotation svp."
      : "Hello Multiimaint, I need a quotation please.";
  const WA_LINK = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_TEXT)}`;

  const heading = lang === "fr" ? "Notre Boutique" : "Our Shop";
  const sub =
    lang === "fr"
      ? "Outils, produits et pièces détachées — une boutique premium est en préparation."
      : "Tools, products and spare parts — a premium shop experience is being prepared.";

  const comingTitle = lang === "fr" ? "Coming Soon… Stay Tuned!" : "Coming Soon… Stay Tuned!";
  const comingDesc =
    lang === "fr"
      ? "Nous finalisons le catalogue, les catégories et les prix. Pour toute demande urgente, contactez-nous."
      : "We’re finalizing catalog, categories and pricing. For urgent requests, contact us.";

  const cards = useMemo<Card[]>(
    () => [
      {
        title: lang === "fr" ? "Outils & Équipements" : "Tools & Equipment",
        desc:
          lang === "fr"
            ? "Équipements professionnels pour maintenance, interventions et chantiers."
            : "Professional gear for maintenance, repairs and field work.",
        img: "/shop-tools.jpg",
        meta: lang === "fr" ? "Corporate grade • Durable" : "Corporate-grade • Durable",
      },
      {
        title: lang === "fr" ? "Produits de Nettoyage" : "Cleaning Products",
        desc:
          lang === "fr"
            ? "Hygiène & désinfection — efficacité, sécurité, résultats constants."
            : "Hygiene & disinfection — safe, effective, consistent results.",
        img: "/shop-cleaning-products.jpg",
        meta: lang === "fr" ? "Hygiene • Disinfection" : "Hygiene • Disinfection",
      },
      {
        title: lang === "fr" ? "Pièces Détachées" : "Spare Parts",
        desc:
          lang === "fr"
            ? "Pièces fiables pour remplacement rapide et continuité d’activité."
            : "Reliable parts for quick replacement and business continuity.",
        img: "/shop-spare-parts.jpg",
        meta: lang === "fr" ? "Fast replace • Quality" : "Fast replace • Quality",
      },
    ],
    [lang]
  );

  // SEO (structured data)
  const jsonLd = useMemo(() => {
    const name = lang === "fr" ? "Boutique MultiiMaint (Bientôt disponible)" : "MultiiMaint Shop (Coming Soon)";
    const description =
      lang === "fr"
        ? "Boutique MultiiMaint à l’Île Maurice : outils, produits de nettoyage et pièces détachées (bientôt disponible)."
        : "MultiiMaint shop in Mauritius: tools, cleaning products and spare parts (coming soon).";

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      description,
      about: { "@type": "Organization", name: "MultiiMaint Ltd", areaServed: "MU" },
      hasPart: cards.map((x) => ({ "@type": "Thing", name: x.title, description: x.desc })),
    };
  }, [cards, lang]);

  return (
    <section id="shop" aria-labelledby="shop-title" className="relative w-full overflow-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Premium background (mobile-safe, white base) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
        <div className="absolute -bottom-48 right-[7%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/[0.07] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F47B20]/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#0B1B4A]/10 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-12 md:py-16">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <p className="text-[12px] font-extrabold tracking-[0.22em] text-slate-500">MULTIIMAINT • MAURITIUS</p>

            <h2
              id="shop-title"
              className="mt-2 text-balance text-[28px] font-extrabold tracking-tight text-slate-950 sm:text-[34px]"
            >
              {heading}
            </h2>

            <p className="mx-auto mt-2 max-w-3xl text-pretty text-[14.5px] leading-relaxed text-slate-600 sm:text-[15.5px]">
              {sub}
            </p>
          </div>
        </Reveal>

        {/* Cards (premium) */}
        <div className="relative mt-8 md:mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <Reveal key={card.title} delay={0.06 + i * 0.05}>
                <article
                  className={cn(
                    "group relative overflow-hidden rounded-[28px] bg-white",
                    "ring-1 ring-slate-200",
                    "shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                    "transition hover:-translate-y-[2px] hover:shadow-[0_28px_90px_rgba(2,6,23,.12)]"
                  )}
                  aria-label={card.title}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ffb36b] to-[#0B1B4A]/60"
                    aria-hidden="true"
                  />

                  {/* Corner lock */}
                  <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                    <LockIcon className="h-4 w-4 text-[#F47B20]" />
                    <span className="text-[11px] font-extrabold text-slate-800">{lang === "fr" ? "Bientôt" : "Soon"}</span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={i === 0}
                      className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-[16px] font-extrabold tracking-tight text-slate-950">{card.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{card.desc}</p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-[#0B1B4A]/5 px-3 py-1 text-[12px] font-extrabold text-[#0B1B4A] ring-1 ring-[#0B1B4A]/10">
                        {card.meta}
                      </span>

                      <span className="text-[12px] font-extrabold text-slate-500">{lang === "fr" ? "Maurice" : "Mauritius"}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Executive glass overlay (orange reflect) */}
          <Reveal delay={0.12}>
            <div
              className={cn(
                "relative mt-8 overflow-hidden rounded-[32px]",
                "ring-1 ring-[#F47B20]/25",
                "shadow-[0_22px_80px_rgba(244,123,32,.12)]"
              )}
            >
              {/* glass background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F47B20]/18 via-white/55 to-[#0B1B4A]/10" />
              <div className="absolute inset-0 backdrop-blur-xl" />

              {/* orange reflect / highlight */}
              <div
                className="pointer-events-none absolute -left-24 top-8 h-44 w-64 rotate-12 rounded-full bg-[#F47B20]/25 blur-2xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-20 bottom-6 h-44 w-72 -rotate-12 rounded-full bg-[#ffb36b]/25 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-start">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-[#F47B20]/25">
                      <span className="h-2 w-2 rounded-full bg-[#F47B20]" aria-hidden="true" />
                      <span className="text-[12px] font-extrabold tracking-[0.18em] text-[#0B1B4A]">
                        {lang === "fr" ? "COMING SOON" : "COMING SOON"}
                      </span>
                    </div>

                    <h3 className="mt-4 text-balance text-[24px] font-extrabold tracking-tight text-[#0B1B4A] sm:text-[30px]">
                      {comingTitle}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[70ch] text-pretty text-[13.5px] font-semibold leading-relaxed text-slate-700 sm:mx-0 sm:text-[14.5px]">
                      {comingDesc}
                    </p>

                    <p className="mt-3 text-[12.5px] font-semibold text-slate-600">
                      {lang === "fr"
                        ? "Astuce : envoyez votre localisation + le produit demandé pour une réponse rapide."
                        : "Tip: send your location + requested item for a fast reply."}
                    </p>
                  </div>

                  {/* Buttons (blue with white text) */}
                  <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:min-w-[280px]">
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl px-6",
                        "bg-[#0B1B4A] text-white",
                        "text-[13.5px] font-extrabold",
                        "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                        "transition hover:brightness-110 active:scale-[0.99]",
                        "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/30 focus:ring-offset-2"
                      )}
                      aria-label={lang === "fr" ? "Contacter Multiimaint sur WhatsApp" : "Contact Multiimaint on WhatsApp"}
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {lang === "fr" ? "Contactez-nous" : "Contact us"}
                    </a>

                    <a
                      href="/contact"
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-center rounded-2xl px-6",
                        "bg-[#123a9b] text-white", // executive blue button
                        "text-[13.5px] font-extrabold",
                        "shadow-[0_14px_30px_rgba(18,58,155,.18)]",
                        "transition hover:brightness-110 active:scale-[0.99]",
                        "focus:outline-none focus:ring-2 focus:ring-[#123a9b]/30 focus:ring-offset-2"
                      )}
                      aria-label={lang === "fr" ? "Ouvrir la page contact" : "Open contact page"}
                    >
                      {lang === "fr" ? "Page Contact" : "Contact Page"}
                    </a>

                    <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/65 px-4 py-3 ring-1 ring-[#F47B20]/25">
                      <LockIcon className="h-4 w-4 text-[#F47B20]" />
                      <span className="text-[12.5px] font-extrabold text-slate-800">
                        {lang === "fr" ? "Boutique en préparation" : "Shop in preparation"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* extra microcopy for SEO/a11y */}
                <p className="sr-only">
                  {lang === "fr"
                    ? "Boutique MultiiMaint à l’Île Maurice : outils, produits de nettoyage et pièces détachées. Bientôt disponible."
                    : "MultiiMaint shop in Mauritius: tools, cleaning products and spare parts. Coming soon."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
