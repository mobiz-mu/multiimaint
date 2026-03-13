// src/components/multiimaint/HomeServices.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type ServiceCard = {
  key: "maintenance" | "cleaning" | "facilities" | "gardening";
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
  href: string;
  imageSrc: string;
  imageAlt: string;
  seoTag: string;
};

function cn(...x: Array<string | false | null | undefined>) {
  return x.filter(Boolean).join(" ");
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
      <path d="M9 18l6-6-6-6" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
      <path
        d="M12 22s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 11.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" strokeWidth="2" />
    </svg>
  );
}

function CheckDot() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-current" aria-hidden="true">
      <path
        d="M20 6L9 17l-5-5"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeServices() {
  const services: ServiceCard[] = [
    {
      key: "maintenance",
      badge: "Maintenance",
      title: "Preventive & corrective maintenance in Mauritius (premium)",
      summary:
        "Premium technical maintenance for businesses and residences: fast response, fault prevention, repairs and professional follow-up.",
      bullets: [
        "Fast response & reliable diagnostics",
        "Preventive & corrective maintenance",
        "Safety-first process & controlled quality",
        "Photo updates, KPIs & clear reporting",
        "Tailored solutions for each site",
      ],
      href: "/services/maintenance",
      imageSrc: "/services/Maintenance.jpeg",
      imageAlt: "Technician performing HVAC maintenance in a modern building in Mauritius.",
      seoTag: "Maintenance services Mauritius",
    },
    {
      key: "cleaning",
      badge: "Cleaning",
      title: "Professional cleaning & hygiene services in Mauritius (premium)",
      summary:
        "Premium cleaning for offices, retail and residences: hygiene, disinfection, neat finishing, flexible scheduling and quality checks.",
      bullets: [
        "Offices, retail, residences & sites",
        "Professional methods & right products",
        "Hygiene, disinfection & neat finishing",
        "Flexible scheduling (one-off or contract)",
        "Quality checks & client follow-up",
      ],
      href: "/services/cleaning",
      imageSrc: "/services/Professional Cleaning.jpeg",
      imageAlt: "Professional cleaner disinfecting glass surfaces in a bright commercial space.",
      seoTag: "Cleaning services Mauritius",
    },
    {
      key: "facilities",
      badge: "Facilities Management",
      title: "Facilities management: site supervision & coordination in Mauritius",
      summary:
        "Multi-site supervision and coordinated interventions: KPIs, reporting, vendor management, optimization and one point of contact.",
      bullets: [
        "Multi-site operations & contracts",
        "KPIs, reporting & performance tracking",
        "Vendor coordination & interventions",
        "Cost and priority optimization",
        "Single point of contact (SPOC)",
      ],
      href: "/services/facilities-management",
      imageSrc: "/services/Facilities Management.jpeg",
      imageAlt: "Facilities manager reviewing operations on a tablet with a city view background.",
      seoTag: "Facilities management Mauritius",
    },
    {
      key: "gardening",
      badge: "Gardening (Indoor & Outdoor)",
      title: "Indoor & outdoor gardening in Mauritius: upkeep & outdoor cleanliness",
      summary:
        "Green spaces and outdoor upkeep: gardening, trimming, clearing, surroundings cleaning and scheduled or one-off visits.",
      bullets: [
        "Regular green-space upkeep",
        "Indoor & outdoor gardening support",
        "Trimming, clearing and cleanliness",
        "Paths, surroundings & exterior areas",
        "One-off or scheduled interventions",
      ],
      href: "/services/gardening",
      imageSrc: "/services/Gardening.jpeg",
      imageAlt: "Gardening team maintaining green spaces and trimming plants outdoors in Mauritius.",
      seoTag: "Gardening services Mauritius",
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="w-full bg-white"
    >
      {/* Tight, premium spacing (no big blank areas) */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:py-12">
        {/* Header */}
        <div className="text-center">
          <p className="text-[12px] font-extrabold tracking-[0.22em] text-slate-500">
            MULTIIMAINT • MAURITIUS
          </p>

          <h2
            id="services-title"
            className="mt-2 text-balance text-[28px] font-extrabold tracking-tight text-slate-950 sm:text-[34px]"
          >
            Our Services
          </h2>

          <p className="mx-auto mt-2 max-w-3xl text-pretty text-[14.5px] leading-relaxed text-slate-600 sm:text-[15.5px]">
            Maintenance, cleaning, facilities management and gardening in Mauritius —{" "}
            <span className="font-semibold text-slate-700">
              premium service, controlled quality
            </span>{" "}
            and professional follow-up.
          </p>

          {/* SEO helper (visible but subtle, helps relevance) */}
          <p className="mx-auto mt-1 max-w-3xl text-[12.5px] leading-relaxed text-slate-500">
            Trusted for{" "}
            <span className="font-semibold text-slate-600">
              business sites, offices, retail, residences
            </span>{" "}
            and multi-site operations across Mauritius.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.key}
              className={cn(
                "group overflow-hidden rounded-[28px] bg-white",
                "ring-1 ring-slate-200 shadow-[0_20px_60px_rgba(2,6,23,.08)]",
                "hover:shadow-[0_28px_80px_rgba(2,6,23,.12)] transition"
              )}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={s.imageSrc}
                  alt={s.imageAlt}
                  fill
                  priority={s.key === "maintenance" || s.key === "cleaning"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Top-left badge */}
                <div className="absolute left-4 top-4">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
                      "bg-white/88 backdrop-blur",
                      "ring-1 ring-black/5 shadow-sm"
                    )}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-[#F47B20]" aria-hidden="true" />
                    <span className="text-[12.5px] font-extrabold text-slate-900">
                      {s.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7">
                <h3 className="text-balance text-[18px] font-extrabold tracking-tight text-slate-950 sm:text-[19px]">
                  {s.title}
                </h3>

                {/* Small summary (kept, but compact/premium) */}
                <p className="mt-2 text-pretty text-[13.5px] leading-relaxed text-slate-600">
                  {s.summary}
                </p>

                {/* Bullets */}
                <ul className="mt-4 grid gap-2" aria-label={`${s.badge} key benefits`}>
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-700">
                      <span className="mt-[2px] text-[#F47B20]" aria-hidden="true">
                        <CheckDot />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer row */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={s.href}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3",
                      "bg-[#F47B20] text-[#0B1B4A]",
                      "text-[13.5px] font-extrabold",
                      "shadow-[0_14px_30px_rgba(244,123,32,.22)] hover:brightness-110 transition",
                      "focus:outline-none focus:ring-2 focus:ring-[#F47B20]/40 focus:ring-offset-2"
                    )}
                    aria-label={`Learn more about ${s.badge} services`}
                  >
                    Learn more
                    <ChevronRight />
                  </Link>

                  <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-slate-500">
                    <span className="text-pink-500" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <span className="whitespace-nowrap">Mauritius</span>
                    <span className="text-slate-300" aria-hidden="true">
                      •
                    </span>
                    <span className="whitespace-nowrap">{s.seoTag}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA strip (no blank space; looks executive) */}
        <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_rgba(2,6,23,.06)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[14px] font-extrabold text-slate-950">
                Need a quotation for your site?
              </p>
              <p className="mt-1 text-[13px] text-slate-600">
                Fast response on WhatsApp — premium execution, controlled quality, and professional follow-up.
              </p>
            </div>

            <a
              href={`https://wa.me/23057160579?text=${encodeURIComponent(
                "Bonjour Multiimaint , Est ce que vous pourriez m'aidez pour un quotation ?"
              )}`}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
                "bg-[#0B1B4A] text-white",
                "text-[13.5px] font-extrabold",
                "hover:brightness-110 transition",
                "focus:outline-none focus:ring-2 focus:ring-[#0B1B4A]/35 focus:ring-offset-2"
              )}
              aria-label="Request a quote on WhatsApp"
            >
              Request a Quote
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
