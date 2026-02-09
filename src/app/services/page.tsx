export default function Services() {
  const items = [
    { t: "Maintenance préventive et corrective", d: "Entretien régulier, interventions rapides, suivi + reporting." },
    { t: "Facility Management multisite", d: "Coordination multi-sites, équipes locales, suivi KPI." },
    { t: "Nettoyage professionnel et hygiène", d: "Industriel/tertiaire, vitres/sols, solutions HACCP." },
    { t: "Nettoyage terrains & extérieurs", d: "Parkings/allées, déchets, espaces verts, remise en état." },
    { t: "Petits travaux et rénovations", d: "Peinture, menuiserie, carrelage, coordination sous-traitants." },
    { t: "Gestion contrats & sous-traitance", d: "Négociation, coordination prestataires, optimisation coût/qualité." },
    { t: "Conseil & audit technique", d: "Évaluation, recommandations, plan de maintenance sur mesure." },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Nos Services</h1>
      <p className="mt-2 text-gray-700">
        Une gamme complète de solutions en maintenance, nettoyage, facility management et boutique.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((x) => (
          <div key={x.t} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="font-medium">{x.t}</div>
            <div className="mt-2 text-sm text-gray-700">{x.d}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
