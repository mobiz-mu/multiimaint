import "../globals.css";
import type { Metadata } from "next";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "MultiiMaint Ltd — Maintenance, Nettoyage & Facility Management",
  description:
    "MultiiMaint Ltd à l’île Maurice — maintenance, nettoyage professionnel, facility management multisite et boutique.",
};

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[var(--mm-navy)] text-white antialiased">
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
