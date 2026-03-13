// src/app/services/facilities-management/page.tsx
import type { Metadata } from "next";
import FacilitiesClient from "./FacilitiesClient";

const SITE = "https://multiimaint.mu";

export const metadata: Metadata = {
  title: "Facilities Management",
  description:
    "Facilities management in Mauritius: site supervision, coordinated interventions, KPIs and reporting with a single point of contact by MultiiMaint Ltd.",
  keywords: [
    "facilities management Mauritius",
    "facility management",
    "site supervision",
    "maintenance coordination",
    "service provider coordination",
    "KPI reporting",
    "multi-site facility management",
    "MultiiMaint",
  ],
  alternates: { canonical: `${SITE}/services/facilities-management` },
  openGraph: {
    title: "Facilities Management — MultiiMaint Ltd",
    description:
      "Facilities management in Mauritius with site supervision, coordinated interventions, KPIs and reporting with a single point of contact.",
    url: `${SITE}/services/facilities-management`,
    type: "website",
    images: [{ url: "/services/Facilities Management.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facilities Management — MultiiMaint Ltd",
    description:
      "Facilities management in Mauritius with KPIs, reporting and a single point of contact.",
    images: ["/services/Facilities Management.jpeg"],
  },
};

export default function Page() {
  return <FacilitiesClient />;
}

