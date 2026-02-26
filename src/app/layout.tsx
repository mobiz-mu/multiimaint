import "./globals.css";
import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/contexts/LangContext";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import Header from "@/components/multiimaint/Header";
import Footer from "@/components/multiimaint/Footer";

const SITE = "https://www.multiimaint.com";
const BRAND = "MultiiMaint Ltd";

const SOCIALS = [
  "https://www.facebook.com/MultiiMaint/",
  "https://www.instagram.com/multiimaint?utm_source=qr&igsh=a2VoZG1nNmk0cHN6",
  "https://www.tiktok.com/@multiimaint?_r=1&_t=ZS-94ESGmlB1lK",
  "https://www.linkedin.com/company/multiimaint/",
  "https://youtube.com/@multiimaint?si=jA9QufDEexUg79am",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  title: {
    default: `${BRAND} — Maintenance, Nettoyage & Facility Management à Maurice`,
    template: `%s — ${BRAND}`,
  },

  description:
    "Maintenance et réparation, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice. Intervention rapide, devis clair, équipe professionnelle.",

  keywords: [
    "MultiiMaint",
    "maintenance ile maurice",
    "maintenance et réparation maurice",
    "nettoyage professionnel maurice",
    "facility management maurice",
    "quatre bornes maintenance",
    "services de nettoyage maurice",
    "gardening maurice",
    "facilities management multisite",
  ],

  alternates: {
    canonical: SITE,
    languages: {
      fr: SITE,
      en: `${SITE}/en`,
    },
  },

  openGraph: {
    type: "website",
    url: SITE,
    title: `${BRAND} — Maintenance, Nettoyage & Facility Management à Maurice`,
    description:
      "Maintenance et réparation, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
    siteName: BRAND,
    locale: "fr_MU",
    alternateLocale: ["en_US"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: BRAND }],
  },

  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Mauritius`,
    description:
      "Maintenance & Repair, Professional Cleaning, Facility Management in Mauritius. Fast quote and pro follow-up.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    // Stronger Google directives (safe)
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" }, // optional if you have it
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.webmanifest",

  applicationName: BRAND,
  category: "Business",
  creator: BRAND,
  publisher: BRAND,

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    title: BRAND,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1B4A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Quatre Bornes (approx)
  const QB_LAT = -20.2646;
  const QB_LNG = 57.4792;

  // ✅ Use your main public email consistently
  const EMAIL = "info@multiimaint.com";
  const PHONE = "+230 5716 0579";

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND,
    url: SITE,
    image: `${SITE}/og.png`,
    areaServed: "Mauritius",
    telephone: PHONE,
    email: EMAIL,
    description:
      "Maintenance et réparation, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Quatre Bornes",
      addressCountry: "MU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: QB_LAT,
      longitude: QB_LNG,
    },
    sameAs: SOCIALS,
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: SITE,
    logo: `${SITE}/og.png`,
    sameAs: SOCIALS,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: PHONE,
        email: EMAIL,
        contactType: "customer service",
        areaServed: "MU",
        availableLanguage: ["fr", "en"],
      },
    ],
  };

  return (
    <html lang="fr" className="h-full">
      <body className="min-h-screen bg-white text-slate-900 antialiased overflow-x-hidden">
        {/* JSON-LD (SEO) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([localBusinessLd, orgLd]),
          }}
        />

        {/* Skip link (a11y) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-[#0B1B4A] focus:shadow-lg"
        >
          Skip to content
        </a>

        <LangProvider>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />

            <main id="main" className="w-full min-h-[60vh]" style={{ paddingTop: "var(--header-offset, 120px)" }}>
              {children}
            </main>

            <Footer />
          </div>

          <WhatsAppFloat />
        </LangProvider>
      </body>
    </html>
  );
}