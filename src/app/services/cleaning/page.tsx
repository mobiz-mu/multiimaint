// src/app/services/cleaning/page.tsx
import type { Metadata } from "next";
import CleaningClient from "./CleaningClient";

const SITE = "https://multiimaint.mu";

export const metadata: Metadata = {
  title: "Cleaning",
  description:
    "Professional cleaning and hygiene services in Mauritius with disinfection, quality control and clear client follow-up by MultiiMaint Ltd.",
  keywords: [
    "professional cleaning Mauritius",
    "office cleaning",
    "retail cleaning",
    "residential cleaning",
    "deep cleaning",
    "disinfection Mauritius",
    "hygiene services",
    "janitorial services",
    "MultiiMaint",
  ],
  alternates: { canonical: `${SITE}/services/cleaning` },
  openGraph: {
    title: "Cleaning — MultiiMaint Ltd",
    description:
      "Professional cleaning and hygiene services in Mauritius with disinfection, quality control and client follow-up.",
    url: `${SITE}/services/cleaning`,
    type: "website",
    images: [{ url: "/services/Professional Cleaning.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cleaning — MultiiMaint Ltd",
    description:
      "Professional cleaning and hygiene services in Mauritius with disinfection and quality control.",
    images: ["/services/Professional Cleaning.jpeg"],
  },
};

export default function Page() {
  return <CleaningClient />;
}

