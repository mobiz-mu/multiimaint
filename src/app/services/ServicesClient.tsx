"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap } from "@/components/multiimaint/PageBits";

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

export default function ServicesClient() {
  const { lang } = useLang() as { lang: "fr" | "en" };
  const c = copy(lang);
  const t = c.pages.services[lang];
  const s = t.sections;

  const cards = [
    {
      key: "maintenance",
      title: s.maintenance.title,
      desc: s.maintenance.desc,
      hrefPage: "/services/maintenance",
      img: "/services/Maintenance.jpeg",
      chip: lang === "fr" ? "Maintenance" : "Maintenance",
    },
    {
      key: "cleaning",
      title: s.cleaning.title,
      desc: s.cleaning.desc,
      hrefPage: "/services/cleaning",
      img: "/services/Professional Cleaning.jpeg",
      chip: lang === "fr" ? "Nettoyage" : "Cleaning",
    },
    {
      key: "facility",
      title: s.facility.title,
      desc: s.facility.desc,
      hrefPage: "/services/facilities-management",
      img: "/services/Facilities Management.jpeg",
      chip: "Facilities Management",
    },
    {
      key: "gardening",
      title: s.gardening.title,
      desc: s.gardening.desc,
      hrefPage: "/services/gardening",
      img: "/services/Gardening.jpeg",
      chip: lang === "fr" ? "Jardinage" : "Gardening",
    },
  ] as const;

  return (
    <PageWrap>
      {/* =========================
          HERO – EXECUTIVE BAND
      ========================= */}
      <section className="relative -mt-8 md:-mt-10">
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 shadow-[0_30px_90px_rgba(2,6,23,.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B4A] via-slate-900 to-black" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F47B20]/30 via-transparent to-[#0B1B4A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="relative z-10 px-6 py-16 md:px-10 md:py-20 text-white">
            <div className="mx-auto max-w-[1200px]">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-extrabold tracking-widest ring-1 ring-white/20 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#F47B20]" />
                {t.kicker}
              </div>

              <h1 className="mt-6 text-[38px] font-extrabold md:text-[60px]">
                {t.title}
              </h1>

              <p className="mt-4 max-w-[880px] text-[15px] text-white/85 md:text-[17px]">
                {t.desc}
              </p>

              <div className="mt-6 h-[3px] w-28 bg-gradient-to-r from-[#F47B20] to-[#0B1B4A]" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SERVICE CARDS
      ========================= */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        {cards.map((card, idx) => (
          <article
            key={card.key}
            className={cn(
              "group overflow-hidden rounded-[30px] bg-white",
              "border border-slate-200",
              "shadow-[0_20px_70px_rgba(2,6,23,.08)]",
              "transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(2,6,23,.15)]"
            )}
          >
            <div className="relative h-[230px] w-full">
              <Image
                src={card.img}
                alt={card.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-[12px] font-extrabold text-white ring-1 ring-white/20 backdrop-blur">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#F47B20]" />
                {card.chip}
              </div>
            </div>

            <div className="p-7">
              <h2 className="text-[20px] font-extrabold text-slate-900">
                {card.title}
              </h2>

              <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                {card.desc}
              </p>

              <div className="mt-6">
                <Link
                  href={card.hrefPage}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-6 py-3 text-[14px] font-extrabold text-[#0B1B4A] shadow-[0_18px_50px_rgba(244,123,32,.25)] hover:brightness-110 transition"
                >
                  {t.explore}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* =========================
          DETAILED ANCHOR SECTIONS
      ========================= */}
      <section className="mt-10">
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(2,6,23,.06)] md:p-10">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">
            {t.anchorsTitle}
          </div>
          <p className="mt-3 text-[15px] text-slate-700">
            {t.anchorsDesc}
          </p>

          {[s.maintenance, s.cleaning, s.facility, s.gardening].map(
            (section, i) => (
              <div
                key={section.title}
                className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-7"
              >
                <div className="text-[18px] font-extrabold text-slate-900">
                  {section.title}
                </div>

                <p className="mt-2 text-[14px] text-slate-700">
                  {section.desc}
                </p>

                <ul className="mt-4 space-y-2 text-[14px] text-slate-700">
                  {section.bullets.map((b: string) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href={
                      i === 0
                        ? "/services/maintenance"
                        : i === 1
                        ? "/services/cleaning"
                        : i === 2
                        ? "/services/facilities-management"
                        : "/services/gardening"
                    }
                    className="inline-flex rounded-2xl bg-[#0B1B4A] px-6 py-3 text-[14px] font-extrabold text-white shadow-md hover:brightness-110 transition"
                  >
                    {section.pageCta}
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint services in Mauritius: maintenance, cleaning,
        facilities management and gardening.
      </span>
    </PageWrap>
  );
}
