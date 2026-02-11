"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { useLang } from "@/contexts/LangContext";
import { copy } from "./copy";

type ShopCard = {
  key: "tools" | "cleaning" | "spares";
  title: string;
  desc: string;
  img: string;
  badge: { text: string; tone: "top" | "new" | "popular" };
  shopHref: string; // internal shop category page
  quoteHref: string; // whatsapp link
};

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function IconShop(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" fill="none">
      <path
        d="M3 10.5V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 10.5 6.2 3h11.6L20 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconQuote(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true" fill="none">
      <path
        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8 9h8M8 12h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
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
        "shadow-[0_10px_22px_rgba(2,6,23,.12)]",
        cls
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
      {text}
    </div>
  );
}

export default function HomeShop() {
  const { lang } = useLang();
  const c = copy(lang);

  const whatsappBase = "https://wa.me/23057160579";
  const waMsg =
    "Bonjour Multiimaint , Mo bizin ene quotation , ou kapv aide moi svp , merci ?";

  const baseCards = useMemo<ShopCard[]>(
    () => [
      {
        key: "tools",
        title: lang === "fr" ? "Outils & Équipements" : "Tools & Equipment",
        desc:
          lang === "fr"
            ? "Équipements pro solides pour maintenance, interventions et chantiers."
            : "Professional-grade gear for maintenance, repairs and field jobs.",
        img: "/shop-tools.jpg",
        badge: { text: lang === "fr" ? "Top Sellers" : "Top Sellers", tone: "top" },
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(
        waMsg + "\nCategorie: Outils & Équipements"
    )}`,
      },
      {
        key: "cleaning",
        title: lang === "fr" ? "Produits de Nettoyage" : "Cleaning Products",
        desc:
          lang === "fr"
            ? "Hygiène & nettoyage pro — efficacité, sécurité et résultats rapides."
            : "Pro hygiene range — safe, effective and fast results for every site.",
        img: "/shop-cleaning-products.jpg",
        badge: { text: lang === "fr" ? "Populaire" : "Popular", tone: "popular" },
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(
        waMsg + "\nCategorie: Produits de Nettoyage "
     )}`,
      },
      {
        key: "spares",
        title: lang === "fr" ? "Pièces Détachées" : "Spare Parts",
        desc:
          lang === "fr"
            ? "Pièces fiables pour remplacement rapide et continuité d’activité."
            : "Reliable spares for quick replacement and business continuity.",
        img: "/shop-spare-parts.jpg",
        badge: { text: lang === "fr" ? "Nouveau" : "New", tone: "new" },
        shopHref: "/shop",
        quoteHref: `${whatsappBase}?text=${encodeURIComponent(
        waMsg + "\nCategorie: Pièces Détachées"
     )}`,
      },
    ],
    [lang]
  );

  // ✅ rotate order every 5s (light + smooth)
  const [orderShift, setOrderShift] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOrderShift((s) => (s + 1) % baseCards.length), 5000);
    return () => clearInterval(id);
  }, [baseCards.length]);

  const cards = useMemo(() => {
    const arr = [...baseCards];
    for (let i = 0; i < orderShift; i++) arr.push(arr.shift()!);
    return arr;
  }, [baseCards, orderShift]);

  return (
    <section id="shop" className="relative py-16 md:py-20">
      {/* floating premium gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#F47B20]/18 blur-3xl animate-[mm_float_11s_ease-in-out_infinite]" />
        <div className="absolute -bottom-52 right-1/4 h-[620px] w-[620px] rounded-full bg-red-500/12 blur-3xl animate-[mm_float2_13s_ease-in-out_infinite]" />
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
                ? "Outils, produits et pièces pro — commande & devis rapide via WhatsApp."
                : "Tools, products and spares — order and get a fast quote via WhatsApp."}
            </p>
          </div>
        </Reveal>

        {/* Cards */}
        <div
          className={cn(
            "mt-12 grid gap-6",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            "transition-all duration-700"
          )}
        >
          {cards.map((x, idx) => (
            <Reveal key={x.key + "-" + idx} delay={0.03 + idx * 0.04}>
              <article
                className={cn(
                  "group relative overflow-hidden rounded-3xl",
                  "border border-white/40 bg-white/52 backdrop-blur-xl",
                  "shadow-[0_18px_60px_rgba(2,6,23,.10)]",
                  "transition-all duration-500",
                  "hover:-translate-y-[2px] hover:shadow-[0_22px_75px_rgba(2,6,23,.14)]"
                )}
                style={{ aspectRatio: "12 / 16" }}
              >
                {/* orange top line */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#F47B20] via-[#ff9a4a] to-[#ffb36b]" />

                {/* badge */}
                <div className="absolute left-4 top-4 z-10">
                  <Badge text={x.badge.text} tone={x.badge.tone} />
                </div>

                <div className="flex h-full flex-col p-6">
                  {/* ✅ BIG SQUARE image (fast loading) */}
                  <div className="mb-4">
                    <div className="relative mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-2xl bg-white/60 ring-1 ring-white/50">
                      <Image
                        src={x.img}
                        alt={x.title}
                        fill
                        priority={idx === 0}
                        quality={75}
                        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 260px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-center text-[16px] font-extrabold tracking-tight text-slate-900">
                    {x.title}
                  </h3>

                  {/* Description (tight, no big empty space) */}
                  <p className="mt-3 text-center text-[13px] leading-snug text-slate-700">
                    {x.desc}
                  </p>

                  {/* Buttons (two, centered, vibrating) */}
                  <div className="mt-auto pt-5">
                    <div className="flex items-center justify-center gap-3">
                      {/* View Shop (blue) */}
                      <Link
                        href={x.shopHref}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-2xl",
                          "h-10 px-4",
                          "bg-[#0B1B4A] text-white",
                          "text-[13px] font-extrabold",
                          "shadow-[0_14px_30px_rgba(11,27,74,.22)]",
                          "transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110",
                          "animate-[mm_buzz_2.1s_ease-in-out_infinite]"
                        )}
                        aria-label={lang === "fr" ? "Voir la boutique" : "View shop"}
                      >
                        <IconShop className="h-4 w-4" />
                        {lang === "fr" ? "Voir Shop" : "View Shop"}
                      </Link>

                      {/* Get Quote (orange -> WhatsApp) */}
                      <Link
                        href={x.quoteHref}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-2xl",
                          "h-10 px-4",
                          "bg-[#F47B20] text-[#0B1B4A]",
                          "text-[13px] font-extrabold",
                          "shadow-[0_14px_30px_rgba(244,123,32,.28)]",
                          "transition-all duration-300 hover:-translate-y-[1px] hover:brightness-105",
                          "animate-[mm_buzzStrong_1.7s_ease-in-out_infinite]"
                        )}
                        aria-label={lang === "fr" ? "Obtenir un devis WhatsApp" : "Get WhatsApp quote"}
                      >
                        <IconQuote className="h-4 w-4" />
                        {lang === "fr" ? "Devis" : "Get Quote"}
                      </Link>
                    </div>

                    {/* SEO helper */}
                    <span className="sr-only">
                      {lang === "fr"
                        ? "Boutique professionnelle Multiimaint à l’île Maurice."
                        : "Multiimaint professional shop in Mauritius."}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



