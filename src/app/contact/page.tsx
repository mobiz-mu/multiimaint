export default function Contact() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Contact / Devis</h1>
      <p className="mt-2 text-gray-700">Envoyez votre demande, on vous répond rapidement.</p>

      <form className="mt-8 grid gap-4 rounded-2xl border bg-white p-6 max-w-xl">
        <input className="rounded-xl border px-4 py-3" placeholder="Nom / Entreprise" />
        <input className="rounded-xl border px-4 py-3" placeholder="Téléphone" />
        <input className="rounded-xl border px-4 py-3" placeholder="Email" />
        <textarea className="min-h-[120px] rounded-xl border px-4 py-3" placeholder="Votre besoin (services / boutique / urgence…)" />
        <button className="rounded-xl bg-black px-5 py-3 text-white" type="button">
          Envoyer (API à brancher)
        </button>
      </form>
    </main>
  );
}
