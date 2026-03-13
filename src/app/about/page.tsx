// src/app/about/page.tsx
import type { Metadata } from "next";
import AboutClient from "./AboutClient";

const SITE = "https://multiimaint.mu";

export const metadata: Metadata = {
  title: "About",
  description:
    "About MultiiMaint: premium maintenance, professional cleaning and facilities management services in Mauritius with quality control and reporting.",
  keywords: [
    "MultiiMaint",
    "maintenance Mauritius",
    "professional cleaning Mauritius",
    "facilities management Mauritius",
    "facility services Mauritius",
    "Quatre Bornes",
    "site supervision",
    "quality control",
  ],
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "About — MultiiMaint Ltd",
    description:
      "Premium maintenance, cleaning and facilities management services in Mauritius with quality control and reporting.",
    url: `${SITE}/about`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About — MultiiMaint Ltd",
    description:
      "Premium maintenance, cleaning and facilities management services in Mauritius.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <AboutClient />;
}

