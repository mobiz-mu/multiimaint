// src/app/contact/page.tsx
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const SITE = "https://www.multiimaint.com";

export const metadata: Metadata = {
  title: "Contact | MultiiMaint Ltd",
  description:
    "Contact MultiiMaint in Mauritius for scheduling, support and service enquiries: maintenance, professional cleaning, facilities management and gardening.",
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    title: "Contact — MultiiMaint Ltd",
    description:
      "Reach MultiiMaint for scheduling, support and service enquiries in Mauritius.",
    url: `${SITE}/contact`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — MultiiMaint Ltd",
    description:
      "Reach MultiiMaint for scheduling, support and service enquiries in Mauritius.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <ContactClient />;
}
