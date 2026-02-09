import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "MultiiMaint Ltd — Maintenance, Nettoyage & Facility Management",
  description:
    "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements à l’île Maurice.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              MultiiMaint <span className="text-gray-500">Ltd</span>
            </Link>

            <nav className="flex items-center gap-4 text-sm">
              <Link className="hover:underline" href="/services">Services</Link>
              <Link className="hover:underline" href="/shop">Boutique</Link>
              <Link className="hover:underline" href="/contact">Devis</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
            <div>
              <div className="font-medium">MultiiMaint Ltd</div>
              <p className="mt-2 text-sm text-gray-600">
                Maintenance, nettoyage professionnel & facility management à l’île Maurice.
              </p>
            </div>

            <div>
              <div className="font-medium">Services</div>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>Maintenance</li>
                <li>Facility management</li>
                <li>Nettoyage & hygiène</li>
                <li>Petits travaux</li>
              </ul>
            </div>

            <div>
              <div className="font-medium">Contact</div>
              <p className="mt-2 text-sm text-gray-600">
                📍 Île Maurice <br />
                ✉️ contact@multiimaint.mu <br />
                📞 +230 XXXXXXXX
              </p>
            </div>
          </div>

          <div className="border-t py-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} MultiiMaint Ltd. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
