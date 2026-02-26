// src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const SITE = "https://www.multiimaint.com";
const PAGE_URL = `${SITE}/contact`;

const PHONE = "+230 5716 0579";
const EMAIL = "info@multiimaint.com";
const ADDRESS_LOCALITY = "Quatre Bornes";
const COUNTRY = "MU";

// Quatre Bornes (approx)
const QB_LAT = -20.2646;
const QB_LNG = 57.4792;

// Social profiles (same as header)
const SAME_AS = [
  "https://www.linkedin.com/company/multiimaint/",
  "https://www.facebook.com/MultiiMaint/",
  "https://www.instagram.com/multiimaint?utm_source=qr&igsh=a2VoZG1nNmk0cHN6",
  "https://www.tiktok.com/@multiimaint?_r=1&_t=ZS-94ESGmlB1lK",
  "https://youtube.com/@multiimaint?si=jA9QufDEexUg79am",
];

export const metadata: Metadata = {
  title: {
    default: "Contact | MultiiMaint Ltd",
    template: "%s | MultiiMaint Ltd",
  },
  description:
    "Contact MultiiMaint Ltd in Mauritius for a quote or intervention. Maintenance & repair, professional cleaning, facilities management and gardening. Fast reply via WhatsApp or email.",
  alternates: { canonical: PAGE_URL },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Contact — MultiiMaint Ltd (Mauritius)",
    description:
      "Request a quote or schedule an intervention in Mauritius. Fast reply via WhatsApp or email — Quatre Bornes, service across the island.",
    siteName: "MultiiMaint Ltd",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "MultiiMaint Ltd" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact — MultiiMaint Ltd",
    description:
      "Request a quote or schedule an intervention in Mauritius. Fast reply via WhatsApp or email.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  // JSON-LD: LocalBusiness + ContactPage + Breadcrumbs
  const ldLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MultiiMaint Ltd",
    url: SITE,
    image: `${SITE}/og.png`,
    telephone: PHONE,
    email: EMAIL,
    areaServed: "Mauritius",
    description:
      "Maintenance & repair, professional cleaning, facilities management and gardening across Mauritius. Based in Quatre Bornes.",
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS_LOCALITY,
      addressCountry: COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: QB_LAT,
      longitude: QB_LNG,
    },
    sameAs: SAME_AS,
  };

  const ldContactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact | MultiiMaint Ltd",
    url: PAGE_URL,
    about: {
      "@type": "Organization",
      name: "MultiiMaint Ltd",
      url: SITE,
      telephone: PHONE,
      email: EMAIL,
    },
  };

  const ldBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([ldLocalBusiness, ldContactPage, ldBreadcrumbs]),
        }}
      />
      <ContactClient />
    </>
  );
}