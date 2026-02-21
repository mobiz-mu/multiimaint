// src/app/shop/page.tsx
import type { Metadata } from "next";
import ShopClient from "./ShopClient";

const SITE = "https://www.multiimaint.com";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "MultiiMaint Shop in Mauritius: equipment and essentials for maintenance, cleaning and facilities. Coming soon.",
  keywords: [
    "MultiiMaint shop",
    "maintenance equipment Mauritius",
    "cleaning equipment Mauritius",
    "hygiene supplies Mauritius",
    "facility supplies",
    "tools Mauritius",
    "equipment delivery Mauritius",
  ],
  alternates: { canonical: `${SITE}/shop` },
  openGraph: {
    title: "Shop — MultiiMaint Ltd",
    description:
      "MultiiMaint Shop in Mauritius: equipment and essentials for maintenance, cleaning and facilities. Coming soon.",
    url: `${SITE}/shop`,
    type: "website",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop — MultiiMaint Ltd",
    description:
      "Equipment and essentials in Mauritius. Coming soon.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <ShopClient />;
}