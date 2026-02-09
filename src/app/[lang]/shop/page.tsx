export default async function Shop({ params }: { params: Promise<{ lang: "fr" | "en" }> }) {
  const p = await params;
  const lang = p?.lang === "en" ? "en" : "fr";

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 text-white">
      <h1 className="text-3xl font-semibold">{lang === "fr" ? "Boutique" : "Shop"}</h1>
      <p className="mt-3 text-white/75">
        {lang === "fr"
          ? "Prochaine étape: produits réels + panier + commandes + paiement."
          : "Next step: real products + cart + orders + payment."}
      </p>
    </main>
  );
}
