// src/app/services/gardening/page.tsx
import type { Metadata } from "next";
import GardeningClient from "./GardeningClient";

const SITE = "https://multiimaint.mu";

export const metadata: Metadata = {
  title: "Gardening",
  description:
    "Professional gardening and green space maintenance in Mauritius with scheduled upkeep, trimming, exterior cleaning and premium finishing by MultiiMaint Ltd.",
  keywords: [
    "gardening Mauritius",
    "landscaping Mauritius",
    "green space maintenance",
    "garden maintenance",
    "hedge trimming",
    "lawn care Mauritius",
    "exterior cleaning",
    "MultiiMaint gardening",
  ],
  alternates: { canonical: `${SITE}/services/gardening` },
  openGraph: {
    title: "Gardening — MultiiMaint Ltd",
    description:
      "Professional gardening and green space maintenance in Mauritius with trimming, upkeep and premium finishing.",
    url: `${SITE}/services/gardening`,
    type: "website",
    images: [{ url: "/services/Gardening.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gardening — MultiiMaint Ltd",
    description:
      "Professional gardening and green space maintenance in Mauritius.",
    images: ["/services/Gardening.jpeg"],
  },
};

export default function Page() {
  return <GardeningClient />;
}

