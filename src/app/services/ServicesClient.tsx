// src/app/services/ServicesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import { copy } from "@/components/multiimaint/copy";
import { PageWrap, PageHero, CTAButtons } from "@/components/multiimaint/PageBits";

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
      hrefAnchor: "/services#maintenance",
      img: "/services/Maintenance.jpeg",
      chip: lang === "fr" ? "Maintenance" : "Maintenance",
      alt:
        lang === "fr"
          ? "Maintenance préventive et corrective MultiiMaint à l’Île Maurice."
          : "MultiiMaint preventive and corrective maintenance in Mauritius.",
    },
    {
      key: "cleaning",
      title: s.cleaning.title,
      desc: s.cleaning.desc,
      hrefPage: "/services/cleaning",
      hrefAnchor: "/services#nettoyage",
      img: "/services/Professional Cleaning.jpeg",
      chip: lang === "fr" ? "Nettoyage" : "Cleaning",
      alt:
        lang === "fr"
          ? "Nettoyage professionnel MultiiMaint à l’Île Maurice : hygiène et désinfection."
          : "MultiiMaint professional cleaning in Mauritius: hygiene and disinfection.",
    },
    {
      key: "facility",
      title: s.facility.title,
      desc: s.facility.desc,
      hrefPage: "/services/facilities-management",
      hrefAnchor: "/services#facility-management",
      img: "/services/Facilities Management.jpeg",
      chip: "Facilities Management",
      alt:
        lang === "fr"
          ? "Facilities management MultiiMaint à Maurice : supervision de site et reporting."
          : "MultiiMaint facilities management in Mauritius: site supervision and reporting.",
    },
    {
      key: "gardening",
      title: s.gardening.title,
      desc: s.gardening.desc,
      hrefPage: "/services/gardening",
      hrefAnchor: "/services#jardinage",
      img: "/services/Gardening.jpeg",
      chip: lang === "fr" ? "Jardinage" : "Gardening",
      alt:
        lang === "fr"
          ? "Jardinage intérieur & extérieur MultiiMaint à l’Île Maurice."
          : "MultiiMaint indoor & outdoor gardening in Mauritius.",
    },
  ] as const;

  return (
    <PageWrap>
      {/* ✅ Sticky Back to Home (under header) */}
      <div className="sticky top-[72px] z-30 -mx-4 bg-slate-50/80 px-4 py-3 backdrop-blur-md md:top-[84px]">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-extrabold text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100 transition"
          >
            ← {lang === "fr" ? "Accueil" : "Home"}
          </Link>
        </div>
      </div>

      <PageHero kicker={t.kicker} title={t.title} desc={t.desc}>
        <CTAButtons />
      </PageHero>

      {/* Cards */}
      <section className="mt-7 grid gap-6 sm:grid-cols-2">
        {cards.map((card, idx) => (
          <article
            key={card.key}
            className={cn(
              "group overflow-hidden rounded-[28px] bg-white",
              "border border-slate-200",
              "shadow-[0_18px_55px_rgba(2,6,23,.08)]",
              "transition hover:-translate-y-[2px] hover:shadow-[0_26px_80px_rgba(2,6,23,.12)]"
            )}
          >
            <div className="relative h-[210px] w-full">
              <Image
                src={card.img}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                priority={idx === 0} // ✅ only first is priority for speed
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-white/16 px-3 py-2 text-[12px] font-extrabold text-white ring-1 ring-white/20 backdrop-blur">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#F47B20]" />
                {card.chip}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-[18px] font-extrabold tracking-tight text-slate-900">{card.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-700">{card.desc}</p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={card.hrefPage}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#F47B20] px-5 py-2 text-[13px] font-extrabold text-[#0B1B4A]"
                >
                  {t.explore}
                </Link>
                <Link
                  href={card.hrefAnchor}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2 text-[13px] font-extrabold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  {t.jump}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Anchor sections */}
      <section className="mt-10">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_rgba(2,6,23,.06)] md:p-8">
          <div className="text-[12px] font-extrabold tracking-widest text-[#F47B20]">{t.anchorsTitle}</div>
          <p className="mt-2 text-[14px] text-slate-700">{t.anchorsDesc}</p>

          {/* MAINTENANCE */}
          <div id="maintenance" className="mt-7 scroll-mt-28 rounded-3xl border border-slate-200 p-6">
            <div className="text-[16px] font-extrabold text-slate-900">{s.maintenance.title}</div>
            <p className="mt-2 text-[14px] text-slate-700">{s.maintenance.desc}</p>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.maintenance.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/services/maintenance"
                className="inline-flex rounded-2xl bg-[#0B1B4A] px-5 py-2 text-[13px] font-extrabold text-white"
              >
                {s.maintenance.pageCta}
              </Link>
            </div>
          </div>

          {/* CLEANING */}
          <div id="nettoyage" className="mt-6 scroll-mt-28 rounded-3xl border border-slate-200 p-6">
            <div className="text-[16px] font-extrabold text-slate-900">{s.cleaning.title}</div>
            <p className="mt-2 text-[14px] text-slate-700">{s.cleaning.desc}</p>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.cleaning.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/services/cleaning"
                className="inline-flex rounded-2xl bg-[#0B1B4A] px-5 py-2 text-[13px] font-extrabold text-white"
              >
                {s.cleaning.pageCta}
              </Link>
            </div>
          </div>

          {/* FACILITY */}
          <div id="facility-management" className="mt-6 scroll-mt-28 rounded-3xl border border-slate-200 p-6">
            <div className="text-[16px] font-extrabold text-slate-900">{s.facility.title}</div>
            <p className="mt-2 text-[14px] text-slate-700">{s.facility.desc}</p>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.facility.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/services/facilities-management"
                className="inline-flex rounded-2xl bg-[#0B1B4A] px-5 py-2 text-[13px] font-extrabold text-white"
              >
                {s.facility.pageCta}
              </Link>
            </div>
          </div>

          {/* GARDENING */}
          <div id="jardinage" className="mt-6 scroll-mt-28 rounded-3xl border border-slate-200 p-6">
            <div className="text-[16px] font-extrabold text-slate-900">{s.gardening.title}</div>
            <p className="mt-2 text-[14px] text-slate-700">{s.gardening.desc}</p>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-700">
              {s.gardening.bullets.map((b: string) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
            <div className="mt-4">
              <Link
                href="/services/gardening"
                className="inline-flex rounded-2xl bg-[#0B1B4A] px-5 py-2 text-[13px] font-extrabold text-white"
              >
                {s.gardening.pageCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <span className="sr-only">
        MultiiMaint services in Mauritius: maintenance, cleaning, facilities management and gardening. Premium service with
        quality control and reporting.
      </span>
    </PageWrap>
  );
}