import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-gray-600">Île Maurice</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          MultiiMaint Ltd — Maintenance, Nettoyage & Facility Management
        </h1>

        <p className="mt-4 text-gray-700">
          Solutions professionnelles pour particuliers, entreprises et sites multisectoriels à travers l’île Maurice.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-black px-5 py-3 text-white" href="/services">
            Nos Services
          </Link>
          <Link className="rounded-xl border px-5 py-3" href="/shop">
            Boutique
          </Link>
          <Link className="rounded-xl border px-5 py-3" href="/contact">
            Demander un devis
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Maintenance", d: "Préventive & corrective (clim, plomberie, électricité…)" },
          { t: "Facility Management", d: "Multisite, coordination, KPI, équipes techniques" },
          { t: "Nettoyage Pro", d: "Industriel & tertiaire, désinfection, HACCP" },
          { t: "Boutique", d: "Outils, produits de nettoyage, pièces détachées" },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="font-medium">{x.t}</div>
            <div className="mt-2 text-sm text-gray-700">{x.d}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
