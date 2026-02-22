import "./globals.css";
import type { Metadata, Viewport } from "next";
import { LangProvider } from "@/contexts/LangContext";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import Header from "@/components/multiimaint/Header";
import Footer from "@/components/multiimaint/Footer";

const SITE = "https://www.multiimaint.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MultiiMaint Ltd — Maintenance, Nettoyage & Facility Management",
    template: "%s — MultiiMaint Ltd",
  },
  description:
    "Maintenance préventive et corrective, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    title: "MultiiMaint Ltd — Maintenance, Nettoyage & Facility Management",
    description:
      "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
    siteName: "MultiiMaint Ltd",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MultiiMaint Ltd" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiiMaint Ltd",
    description:
      "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MultiiMaint Ltd",
    url: SITE,
    image: `${SITE}/og.png`,
    areaServed: "Mauritius",
    telephone: "+230 5716 0579",
    email: "support@multiimaint.com",
    description:
      "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
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
    sameAs: [],
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MultiiMaint Ltd",
    url: SITE,
    logo: `${SITE}/og.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+230 5716 0579",
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
          {/* ✅ 3-row layout: header / content / footer */}
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />

            {/* ✅ MAIN: no global padding here (pages control spacing) */}
            <main id="main" className="w-full min-h-[60vh]">
              {children}
            </main>

            <Footer />
          </div>

          {/* ✅ WhatsApp floating button (above everything) */}
          <WhatsAppFloat />
        </LangProvider>
      </body>
    </html>
  );
}