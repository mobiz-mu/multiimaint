"use client";

import Image from "next/image";
import Link from "next/link";
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
  shopHref: string;
  quoteHref: string;
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
        : "bg-red-500 text-white";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold",
        "shadow-[0_10px_22px_rgba(2,6,23,.10)]",
        cls
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {text}
    </div>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 15v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeShop() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);

  // Keeping your structure, but shop is LOCKED (coming soon)
  const whatsappBase = "https://wa.me/23057160579";
  const waMsg = "Bonjour Multiimaint , Mo bizin ene quotation , ou kapv aide moi svp , merci ?";

  const cards = useMemo<ShopCard[]>(
    () => [
      {
        key: "tools",
        title: lang === "fr" ? "Outils & Équipements" : "Tools & Equipment",
        desc:
          lang === "fr"
            ? "Équipements pro pour maintenance, interventions et chantiers — sélection corporate et durable."
            : "Professional gear for maintenance, repairs and field jobs — durable, corporate-grade selection.",
        img: "/shop-tools.jpg",
        badge: { text: lang === "fr" ? "Top" : "Top", tone: "top" },
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(waMsg + "\nCategorie: Outils & Équipements")}`,
      },
      {
        key: "cleaning",
        title: lang === "fr" ? "Produits de Nettoyage" : "Cleaning Products",
        desc:
          lang === "fr"
            ? "Gamme hygiène & désinfection pro — efficacité, sécurité et résultats constants."
            : "Professional hygiene & disinfection range — safe, effective and consistent results.",
        img: "/shop-cleaning-products.jpg",
        badge: { text: lang === "fr" ? "Populaire" : "Popular", tone: "popular" },
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(waMsg + "\nCategorie: Produits de Nettoyage")}`,
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
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(waMsg + "\nCategorie: Pièces Détachées")}`,
      },
    ],
    [lang]
  );

  const comingSoonTitle =
    lang === "fr" ? "Bientôt disponible… Restez à l’écoute." : "Coming Soon… Stay Tuned.";
  const comingSoonSub =
    lang === "fr"
      ? "La boutique est en préparation. Pour toute demande urgente, contactez-nous via WhatsApp."
      : "Our shop is being prepared. For urgent requests, contact us via WhatsApp.";

  return (
    <section
      id="shop"
      className="relative py-16 md:py-20 bg-white"
      aria-label={lang === "fr" ? "Boutique MultiiMaint (bientôt disponible)" : "MultiiMaint shop (coming soon)"}
    >
      {/* ✅ Premium orange/white overlay gradient (static) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f0] via-white to-white" />
        <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F47B20]/12 blur-3xl" />
        <div className="absolute -bottom-40 right-[10%] h-[520px] w-[520px] rounded-full bg-[#ff9a4a]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {lang === "fr" ? "Notre Boutique" : "Our Shop"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              {lang === "fr"
                ? "Outils, produits et pièces pro — section boutique en cours de finalisation."
                : "Tools, products and spares — shop section is being finalized."}
            </p>
          </div>
        </Reveal>

        {/* ✅ Locked message bar */}
        <Reveal delay={0.08}>
          <div
            className={cn(
              "mt-8 rounded-3xl border border-[#F47B20]/25 bg-white/80 backdrop-blur",
              "shadow-[0_14px_44px_rgba(2,6,23,.06)]"
            )}
          >
            <div className="flex flex-col items-center gap-3 px-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F47B20]/12 text-[#0B1B4A] ring-1 ring-[#F47B20]/25">
                  <LockIcon className="h-5 w-5" />
                </span>

                <div>
                  <div className="text-[15px] font-extrabold text-[#0B1B4A]">{comingSoonTitle}</div>
                  <div className="mt-1 text-[13px] font-semibold text-slate-600">{comingSoonSub}</div>
                </div>
              </div>

              {/* WhatsApp still allowed (optional). If you want ZERO access, remove this. */}
              <a
                href={`https://wa.me/23057160579?text=${encodeURIComponent(waMsg)}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-2xl px-6",
                  "bg-[#0B1B4A] text-white text-[13px] font-extrabold",
                  "shadow-[0_14px_30px_rgba(11,27,74,.20)]",
                  "transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/30"
                )}
                aria-label={lang === "fr" ? "Contacter via WhatsApp" : "Contact via WhatsApp"}
              >
                {lang === "fr" ? "Contacter WhatsApp" : "Contact WhatsApp"}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Cards (NO animations, NO access) */}
        <div className="relative mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((x, idx) => (
            <Reveal key={x.key} delay={0.05 + idx * 0.05}>
              <article
                className={cn(
                  "relative overflow-hidden rounded-3xl",
                  "border border-slate-200 bg-white",
                  "shadow-[0_18px_60px_rgba(2,6,23,.08)]"
                )}
              >
                {/* top line */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b]" />

                {/* badge */}
                <div className="absolute left-4 top-4 z-10">
                  <Badge text={x.badge.text} tone={x.badge.tone} />
                </div>

                {/* image */}
                <div className="relative h-[210px] w-full overflow-hidden">
                  <Image
                    src={x.img}
                    alt={`${x.title} — ${lang === "fr" ? "boutique MultiiMaint (bientôt disponible)" : "MultiiMaint shop (coming soon)"}`}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-[16px] font-extrabold tracking-tight text-slate-900">{x.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-700">{x.desc}</p>

                  {/* Disabled actions */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled
                      className={cn(
                        "inline-flex h-10 flex-1 items-center justify-center rounded-2xl px-4",
                        "bg-slate-100 text-slate-500 text-[13px] font-extrabold",
                        "ring-1 ring-slate-200 cursor-not-allowed"
                      )}
                      aria-disabled="true"
                    >
                      {lang === "fr" ? "Voir Shop" : "View Shop"}
                    </button>

                    <button
                      type="button"
                      disabled
                      className={cn(
                        "inline-flex h-10 flex-1 items-center justify-center rounded-2xl px-4",
                        "bg-[#F47B20]/15 text-[#0B1B4A]/55 text-[13px] font-extrabold",
                        "ring-1 ring-[#F47B20]/25 cursor-not-allowed"
                      )}
                      aria-disabled="true"
                    >
                      {lang === "fr" ? "Devis" : "Get Quote"}
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold text-slate-600">
                    <LockIcon className="h-4 w-4 text-[#F47B20]" />
                    <span>{lang === "fr" ? "Accès désactivé (bientôt disponible)" : "Access disabled (coming soon)"}</span>
                  </div>

                  <span className="sr-only">
                    {lang === "fr"
                      ? "Section boutique MultiiMaint bientôt disponible. Les catégories ne sont pas accessibles pour le moment."
                      : "MultiiMaint shop coming soon. Categories are not accessible yet."}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}

          {/* ✅ Overlay that blocks taps/clicks + Coming Soon text (as requested) */}
          <div
            className={cn(
              "absolute inset-0 rounded-[32px]",
              "bg-gradient-to-br from-white/65 via-[#fff3e8]/70 to-[#F47B20]/15",
              "backdrop-blur-[2px]",
              "ring-1 ring-[#F47B20]/15"
            )}
            style={{ pointerEvents: "auto" }}
            aria-hidden="true"
          >
            <div className="grid h-full place-items-center p-6">
              <div className="max-w-xl text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 ring-1 ring-[#F47B20]/20">
                  <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                  <span className="text-[12px] font-extrabold tracking-wide text-[#0B1B4A]">
                    {lang === "fr" ? "BOUTIQUE EN PRÉPARATION" : "SHOP IN PREPARATION"}
                  </span>
                </div>

                <div className="mt-4 text-balance text-2xl font-extrabold text-[#0B1B4A] sm:text-3xl">
                  {lang === "fr" ? "Bientôt disponible… Restez à l’écoute." : "Coming Soon… Stay Tuned."}
                </div>

                <p className="mx-auto mt-2 max-w-[60ch] text-[13.5px] font-semibold text-slate-700 sm:text-[14px]">
                  {lang === "fr"
                    ? "La boutique est désactivée pour le moment. Nous finalisons les catégories, les prix et le catalogue."
                    : "The shop is disabled for now. We’re finalizing categories, pricing and the catalog."}
                </p>

                <div className="mt-4 text-[12px] font-semibold text-slate-600">
                  {lang === "fr"
                    ? "Astuce : Vous pouvez toujours nous contacter via WhatsApp pour un besoin urgent."
                    : "Tip: You can still contact us via WhatsApp for urgent needs."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extra SEO note (hidden) */}
        <span className="sr-only">
          {lang === "fr"
            ? "Boutique MultiiMaint à l’île Maurice, bientôt disponible : outils, produits de nettoyage et pièces détachées."
            : "MultiiMaint shop in Mauritius coming soon: tools, cleaning products and spare parts."}
        </span>
      </div>
    </section>
  );
}


