// src/app/services/maintenance/page.tsx
import type { Metadata } from "next";
import MaintenanceClient from "./MaintenanceClient";

const SITE = "https://multiimaint.mu";
const CANONICAL_URL = `${SITE}/services/maintenance`;

export const metadata: Metadata = {
  // ✅ Use globalThis.URL to avoid any shadowing issues
  metadataBase: new globalThis.URL(SITE),

  title: "Maintenance Services in Mauritius | Preventive & Corrective | MultiiMaint Ltd",
  description:
    "Premium preventive & corrective maintenance in Mauritius for villas, offices, retail and multi-site operations. Fast response, safety-first execution, quality control and clear reporting by MultiiMaint Ltd.",

  keywords: [
    "maintenance Mauritius",
    "preventive maintenance Mauritius",
    "corrective maintenance Mauritius",
    "building maintenance Mauritius",
    "home maintenance Mauritius",
    "commercial maintenance Mauritius",
    "facility maintenance Mauritius",
    "emergency maintenance Mauritius",
    "Quatre Bornes maintenance",
    "MultiiMaint",
  ],

  alternates: { canonical: CANONICAL_URL },

  openGraph: {
    title: "Maintenance Services in Mauritius — MultiiMaint Ltd",
    description:
      "Premium preventive & corrective maintenance with fast response, safety-first process, quality control and clear reporting.",
    url: CANONICAL_URL,
    type: "website",
    siteName: "MultiiMaint Ltd",
    images: [
      {
        url: "/services/Maintenance.jpeg",
        width: 1200,
        height: 630,
        alt: "MultiiMaint Maintenance Services Mauritius",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Maintenance Services in Mauritius — MultiiMaint Ltd",
    description: "Premium preventive & corrective maintenance in Mauritius with quality control and clear reporting.",
    images: ["/services/Maintenance.jpeg"],
  },

  robots: { index: true, follow: true },
};

export default function Page() {
  return <MaintenanceClient />;
}

