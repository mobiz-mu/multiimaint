// src/components/multiimaint/HomeShop.tsx
"use client";

import Image from "next/image";
import { useMemo } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type ShopCard = {
  key: "tools" | "cleaning" | "spares";
  title: string;
  desc: string;
  img: string;
  badge: { text: string; tone: "top" | "new" | "popular" };
  categoryFr: string;
  categoryEn: string;
};

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function Badge({ text, tone }: { text: string; tone: "top" | "new" | "popular" }) {
  const cls =
    tone === "top"
      ? "bg-[#F47B20] text-[#0B1B4A]"
      : tone === "new"
        ? "bg-emerald-400 text-slate-900"
        : "bg-rose-500 text-white";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold",
        "shadow-[0_10px_22px_rgba(2,6,23,.10)]",
        cls
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" aria-hidden="true" />
      {text}
    </div>
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

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M12 2l2.2 6.6H21l-5.5 4 2.1 6.7L12 15.8 6.4 19.3l2.1-6.7-5.5-4h6.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeShop() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  const WA_PHONE = "23057160579";
  const waMsgFr = "Bonjour Multiimaint , Mo bizin ene quotation , ou kapv aide moi svp , merci ?";
  const waMsgEn = "Hello Multiimaint, I need a quotation. Can you help me please? Thank you.";
  const waBase = `https://wa.me/${WA_PHONE}`;
  const WA_LINK = `${waBase}?text=${encodeURIComponent(lang === "fr" ? waMsgFr : waMsgEn)}`;

  const cards = useMemo<ShopCard[]>(
    () => [
      {
        key: "tools",
        title: lang === "fr" ? "Outils & Équipements" : "Tools & Equipment",
        desc:
          lang === "fr"
            ? "Équipements pro pour maintenance, interventions et chantiers — sélection corporate et durable."
            : "Professional gear for maintenance, repairs and field work — durable, corporate-grade selection.",
        img: "/shop-tools.jpg",
        badge: { text: lang === "fr" ? "Top" : "Top", tone: "top" },
        categoryFr: "Outils & Équipements",
        categoryEn: "Tools & Equipment",
      },
      {
        key: "cleaning",
        title: lang === "fr" ? "Produits de Nettoyage" : "Cleaning Products",
        desc:
          lang === "fr"
            ? "Gamme hygiène & désinfection pro — efficacité, sécurité et résultats constants."
            : "Professional hygiene & disinfection range — safe, effective, consistent results.",
        img: "/shop-cleaning-products.jpg",
        badge: { text: lang === "fr" ? "Populaire" : "Popular", tone: "popular" },
        categoryFr: "Produits de Nettoyage",
        categoryEn: "Cleaning Products",
      },
      {
        key: "spares",
        title: lang === "fr" ? "Pièces Détachées" : "Spare Parts",
        desc:
          lang === "fr"
            ? "Pièces fiables pour remplacement rapide et continuité d’activité — qualité contrôlée."
            : "Reliable spares for quick replacement and business continuity — controlled quality.",
        img: "/shop-spare-parts.jpg",
        badge: { text: lang === "fr" ? "Nouveau" : "New", tone: "new" },
        categoryFr: "Pièces Détachées",
        categoryEn: "Spare Parts",
      },
    ],
    [lang]
  );

  const comingSoonTitle = lang === "fr" ? "Boutique bientôt disponible" : "Shop coming soon";
  const comingSoonSub =
    lang === "fr"
      ? "Nous finalisons le catalogue, les prix et les catégories. Pour toute demande urgente, contactez-nous sur WhatsApp."
      : "We’re finalizing the catalog, pricing and categories. For urgent requests, contact us on WhatsApp.";

  // SEO helper (minimal JSON-LD). Safe even while “coming soon”.
  const jsonLd = useMemo(() => {
    const name = lang === "fr" ? "Boutique MultiiMaint (Bientôt disponible)" : "MultiiMaint Shop (Coming Soon)";
    const desc =
      lang === "fr"
        ? "Boutique MultiiMaint à l’île Maurice : outils, produits de nettoyage et pièces détachées (bientôt disponible)."
        : "MultiiMaint shop in Mauritius: tools, cleaning products and spare parts (coming soon).";

    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      description: desc,
      about: {
        "@type": "Organization",
        name: "MultiiMaint Ltd",
        areaServed: "MU",
      },
      hasPart: cards.map((x) => ({
        "@type": "Thing",
        name: x.title,
        description: x.desc,
      })),
    };
  }, [cards, lang]);

  return (
    <section id="shop" aria-labelledby="shop-title" className="relative w-full bg-white">
      {/* Premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f0] via-white to-white" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#F47B20]/10 blur-3xl" />
        <div className="absolute -bottom-40 right-[8%] h-[520px] w-[520px] rounded-full bg-[#0B1B4A]/[0.06] blur-3xl" />
      </div>

      {/* SEO helper (structured data) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-12 md:py-14">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <p className="text-[12px] font-extrabold tracking-[0.22em] text-slate-500">MULTIIMAINT • MAURITIUS</p>

            <h2 id="shop-title" className="mt-2 text-balance text-[28px] font-extrabold tracking-tight text-slate-950 sm:text-[34px]">
              {lang === "fr" ? "Notre Boutique" : "Our Shop"}
            </h2>

            <p className="mx-auto mt-2 max-w-3xl text-pretty text-[14.5px] leading-relaxed text-slate-600 sm:text-[15.5px]">
              {lang === "fr"
                ? "Outils, produits et pièces pro — une boutique pensée pour la performance, la sécurité et la qualité."
                : "Tools, products and spares — a shop built for performance, safety and controlled quality."}
            </p>

            <p className="mx-auto mt-1 max-w-3xl text-[12.5px] leading-relaxed text-slate-500">
              {lang === "fr" ? "Pour bureaux, sites, résidences et opérations multi-sites." : "For offices, sites, residences and multi-site operations."}
            </p>
          </div>
        </Reveal>

        {/* Locked bar */}
        <Reveal delay={0.08}>
          <div
            className={cn(
              "mt-7 sm:mt-8 rounded-[28px]",
              "border border-[#F47B20]/25 bg-white/80 backdrop-blur",
              "shadow-[0_14px_44px_rgba(2,6,23,.06)]"
            )}
            role="region"
            aria-label={lang === "fr" ? "Boutique verrouillée (bientôt disponible)" : "Shop locked (coming soon)"}
          >
            <div className="flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#F47B20]/12 text-[#0B1B4A] ring-1 ring-[#F47B20]/25">
                  <LockIcon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <div className="text-[15px] font-extrabold text-[#0B1B4A]">{comingSoonTitle}</div>
                  <div className="mt-1 text-[13px] font-semibold leading-relaxed text-slate-600">{comingSoonSub}</div>
                </div>
              </div>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-6",
                  "bg-[#0B1B4A] text-white text-[13px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(11,27,74,.18)]",
                  "transition hover:brightness-110",
                  "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/30 focus:ring-offset-2"
                )}
                aria-label={lang === "fr" ? "Contacter Multiimaint via WhatsApp" : "Contact Multiimaint via WhatsApp"}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "fr" ? "Contacter WhatsApp" : "Contact WhatsApp"}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cards (mobile-first grid) + ORANGE GLASS OVERLAY */}
        <div className="relative mt-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((x, idx) => (
              <Reveal key={x.key} delay={0.06 + idx * 0.05}>
                <article
                  className={cn(
                    "relative overflow-hidden rounded-[28px] bg-white",
                    "ring-1 ring-slate-200 shadow-[0_18px_60px_rgba(2,6,23,.08)]",
                    "hover:shadow-[0_28px_80px_rgba(2,6,23,.12)] transition"
                  )}
                  aria-label={x.title}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b]"
                    aria-hidden="true"
                  />

                  <div className="absolute left-4 top-4 z-10">
                    <Badge text={x.badge.text} tone={x.badge.tone} />
                  </div>

                  <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 ring-1 ring-black/5 backdrop-blur">
                    <LockIcon className="h-4 w-4 text-[#F47B20]" />
                    <span className="text-[11px] font-extrabold text-slate-800">{lang === "fr" ? "Bientôt" : "Soon"}</span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={x.img}
                      alt={lang === "fr" ? `${x.title} — Boutique MultiiMaint bientôt disponible` : `${x.title} — MultiiMaint shop coming soon`}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-[16px] font-extrabold tracking-tight text-slate-950">{x.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{x.desc}</p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        disabled
                        className={cn(
                          "inline-flex h-10 items-center justify-center rounded-2xl px-4",
                          "bg-slate-100 text-slate-500 text-[13px] font-extrabold",
                          "ring-1 ring-slate-200 cursor-not-allowed"
                        )}
                        aria-disabled="true"
                      >
                        {lang === "fr" ? "Voir la boutique" : "View shop"}
                      </button>

                      <button
                        type="button"
                        disabled
                        className={cn(
                          "inline-flex h-10 items-center justify-center rounded-2xl px-4",
                          "bg-[#F47B20]/15 text-[#0B1B4A]/60 text-[13px] font-extrabold",
                          "ring-1 ring-[#F47B20]/25 cursor-not-allowed"
                        )}
                        aria-disabled="true"
                      >
                        {lang === "fr" ? "Demander un devis" : "Get quote"}
                      </button>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-[#0B1B4A]/5 text-[#0B1B4A] ring-1 ring-slate-200">
                        <StarIcon className="h-4 w-4" />
                      </span>
                      <span className="truncate">
                        {lang === "fr" ? `Catégorie : ${x.categoryFr} • Île Maurice` : `Category: ${x.categoryEn} • Mauritius`}
                      </span>
                    </div>

                    <span className="sr-only">
                      {lang === "fr" ? "Boutique MultiiMaint bientôt disponible. Accès désactivé pour le moment." : "MultiiMaint shop coming soon. Access is disabled for now."}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ✅ ORANGE GLASS OVERLAY + TEXT (blocks clicks, allows scroll) */}
          <div
            className={cn(
              "absolute inset-0 rounded-[32px]",
              "bg-gradient-to-br from-[#F47B20]/18 via-[#fff3e8]/55 to-[#F47B20]/22",
              "backdrop-blur-md",
              "ring-1 ring-[#F47B20]/25",
              "shadow-[0_18px_70px_rgba(244,123,32,.12)]"
            )}
            style={{ pointerEvents: "auto" }}
            role="note"
            aria-label={lang === "fr" ? "Boutique bientôt disponible" : "Shop coming soon"}
          >
            <div className="grid h-full place-items-center p-6 sm:p-10">
              <div className="max-w-2xl text-center">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-[#F47B20]/25">
                  <span className="h-2 w-2 rounded-full bg-[#F47B20]" aria-hidden="true" />
                  <span className="text-[12px] font-extrabold tracking-[0.18em] text-[#0B1B4A]">
                    {lang === "fr" ? "STAY TUNED" : "STAY TUNED"}
                  </span>
                </div>

                <h3 className="mt-4 text-balance text-[26px] font-extrabold tracking-tight text-[#0B1B4A] sm:text-[34px]">
                  {lang === "fr" ? "Coming soon…" : "Coming soon…"}
                </h3>

                <p className="mx-auto mt-2 max-w-[64ch] text-pretty text-[13.5px] font-semibold leading-relaxed text-slate-700 sm:text-[14.5px]">
                  {lang === "fr"
                    ? "Nous finalisons les catégories, le catalogue et les prix pour une expérience boutique premium."
                    : "We’re finalizing categories, catalog and pricing for a premium shop experience."}
                </p>

                <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                      "bg-[#0B1B4A] text-white",
                      "text-[13.5px] font-extrabold",
                      "shadow-[0_14px_30px_rgba(11,27,74,.18)] hover:brightness-110 transition",
                      "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/30 focus:ring-offset-2"
                    )}
                    aria-label={lang === "fr" ? "Contacter WhatsApp pour un besoin urgent" : "Contact WhatsApp for urgent needs"}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {lang === "fr" ? "Demande urgente (WhatsApp)" : "Urgent request (WhatsApp)"}
                  </a>

                  <div className="inline-flex items-center gap-2 rounded-2xl bg-white/65 px-4 py-3 ring-1 ring-[#F47B20]/25">
                    <LockIcon className="h-4 w-4 text-[#F47B20]" />
                    <span className="text-[12.5px] font-extrabold text-slate-800">
                      {lang === "fr" ? "Accès boutique désactivé" : "Shop access disabled"}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-[12px] font-semibold text-slate-600">
                  {lang === "fr"
                    ? "Astuce : contactez-nous maintenant pour un devis rapide."
                    : "Tip: contact us now for a quick quote."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom executive CTA strip */}
        <Reveal delay={0.12}>
          <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(2,6,23,.06)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[14px] font-extrabold text-slate-950">{lang === "fr" ? "Besoin urgent ?" : "Need something urgently?"}</p>
                <p className="mt-1 text-[13px] text-slate-600">
                  {lang === "fr"
                    ? "Même si la boutique est en préparation, nous pouvons vous aider rapidement via WhatsApp."
                    : "Even while the shop is being prepared, we can assist quickly via WhatsApp."}
                </p>
              </div>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                  "bg-[#F47B20] text-[#0B1B4A]",
                  "text-[13.5px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(244,123,32,.22)] hover:brightness-110 transition",
                  "focus:outline-none focus:ring-2 focus:ring-[#F47B20]/40 focus:ring-offset-2"
                )}
                aria-label={lang === "fr" ? "Demander un devis via WhatsApp" : "Request a quote via WhatsApp"}
              >
                <WhatsAppIcon className="h-4 w-4" />
                {lang === "fr" ? "Demander un devis" : c?.nav?.cta || "Request a quote"}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Extra SEO (screen reader only) */}
        <span className="sr-only">
          {lang === "fr"
            ? "Boutique MultiiMaint à l’île Maurice : outils, produits de nettoyage et pièces détachées, bientôt disponible."
            : "MultiiMaint shop in Mauritius: tools, cleaning products and spare parts, coming soon."}
        </span>
      </div>
    </section>
  );
}
