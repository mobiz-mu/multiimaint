export default function Shop() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Boutique</h1>
      <p className="mt-2 text-gray-700">
        Prochaine étape: produits réels + panier + commande + paiement (MCB/PayPal).
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { t: "Outils & équipements", d: "Équipements professionnels pour maintenance." },
          { t: "Produits de nettoyage", d: "Solutions adaptées à tous secteurs." },
          { t: "Pièces détachées", d: "Maintenance & réparations." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="font-medium">{x.t}</div>
            <div className="mt-2 text-sm text-gray-700">{x.d}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
