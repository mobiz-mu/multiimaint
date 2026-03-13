// src/app/mission-vision/page.tsx
import type { Metadata } from "next";
import MissionVisionClient from "./MissionVisionClient";

const SITE = "https://multiimaint.mu";

export const metadata: Metadata = {
  title: "Mission & Vision",
  description:
    "MultiiMaint mission and vision: delivering premium maintenance, cleaning and facilities services in Mauritius with safety, quality control and reporting.",
  keywords: [
    "MultiiMaint mission",
    "MultiiMaint vision",
    "facility services Mauritius",
    "premium maintenance Mauritius",
    "cleaning services Mauritius",
    "corporate facilities Mauritius",
    "quality control Mauritius",
  ],
  alternates: { canonical: `${SITE}/mission-vision` },
  openGraph: {
    title: "Mission & Vision — MultiiMaint Ltd",
    description:
      "Premium facility services in Mauritius with safety, quality control and transparent reporting.",
    url: `${SITE}/mission-vision`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission & Vision — MultiiMaint Ltd",
    description:
      "Premium facility services in Mauritius with safety and reporting.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <MissionVisionClient />;
}

