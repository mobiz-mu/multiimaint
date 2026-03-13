// src/app/services/page.tsx
import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore MultiiMaint services in Mauritius: maintenance, professional cleaning, facilities management and gardening with quality control and reporting.",
  keywords: [
    "MultiiMaint",
    "Mauritius maintenance",
    "professional cleaning Mauritius",
    "facilities management Mauritius",
    "gardening Mauritius",
    "building maintenance",
    "office cleaning",
  ],
  alternates: { canonical: "https://multiimaint.mu/services" },
  openGraph: {
    title: "Services | MultiiMaint Ltd",
    description:
      "Maintenance, professional cleaning, facilities management and gardening in Mauritius with quality control and reporting.",
    url: "https://multiimaint.mu/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | MultiiMaint Ltd",
    description:
      "Explore MultiiMaint services in Mauritius: maintenance, cleaning, facilities management and gardening.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}

