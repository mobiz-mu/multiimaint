// src/app/services/maintenance/page.tsx
import type { Metadata } from "next";
import MaintenanceClient from "./MaintenanceClient";

const SITE = "https://www.multiimaint.com";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "Preventive and corrective maintenance in Mauritius with fast response, safety-first process, quality control and clear reporting by MultiiMaint Ltd.",
  keywords: [
    "maintenance Mauritius",
    "preventive maintenance",
    "corrective maintenance",
    "building maintenance",
    "electrical maintenance",
    "plumbing maintenance",
    "AC maintenance",
    "facility maintenance",
    "MultiiMaint",
    "Quatre Bornes",
  ],
  alternates: { canonical: `${SITE}/services/maintenance` },
  openGraph: {
    title: "Maintenance — MultiiMaint Ltd",
    description:
      "Preventive and corrective maintenance in Mauritius with fast response, safety-first process, quality control and clear reporting.",
    url: `${SITE}/services/maintenance`,
    type: "website",
    images: [{ url: "/services/Maintenance.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance — MultiiMaint Ltd",
    description:
      "Preventive and corrective maintenance in Mauritius with quality control and reporting.",
    images: ["/services/Maintenance.jpeg"],
  },
};

export default function Page() {
  return <MaintenanceClient />;
}