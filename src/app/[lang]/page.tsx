import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Lang = "fr" | "en";

function copy(lang: Lang) {
  const isFr = lang === "fr";
  return {
    lang,
    topNav: {
      services: isFr ? "Nos Services" : "Services",
      shop: isFr ? "Boutique" : "Shop",
      about: isFr ? "À propos" : "About",
      blog: "Blog",
      contact: isFr ? "Contact" : "Contact",
      cta: isFr ? "Demander un Devis" : "Request a Quote",
    },
    hero: {
      kicker: isFr ? "Île Maurice • Réactivité • Qualité" : "Mauritius • Fast response • Quality",
      h: isFr ? "Gros ou petit problème, nous la pou ou !" : "Big or small issue — we’ve got you covered!",
      p: isFr
        ? "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements — pour particuliers et entreprises."
        : "Maintenance, professional cleaning, multisite facility management and equipment shop — for homes & businesses.",
      primary: isFr ? "Demander un Devis" : "Request a Quote",
      secondary: isFr ? "Voir la Boutique" : "Visit the Shop",
    },
    sections: {
      services: isFr ? "Nos Services" : "Our Services",
      shop: isFr ? "Boutique Produits" : "Shop Products",
      about: isFr ? "À Propos" : "About Us",
      blog: isFr ? "Notre Blog" : "Our Blog",
      contact: isFr ? "Contact" : "Contact",
      newsletter: isFr ? "Newsletter" : "Newsletter",
    },
    services: [
      {
        t: isFr ? "Maintenance préventive & corrective" : "Preventive & corrective maintenance",
        d: isFr ? "Climatisation, plomberie, électricité — interventions rapides + reporting." : "AC, plumbing, electrical — fast interventions + reporting.",
      },
      {
        t: isFr ? "Facility Management multisite" : "Multisite facility management",
        d: isFr ? "Coordination multi-sites, équipes locales, suivi KPI." : "Multisite coordination, local teams, KPI tracking.",
      },
      {
        t: isFr ? "Nettoyage professionnel & hygiène" : "Professional cleaning & hygiene",
        d: isFr ? "Industriel/tertiaire, désinfection, vitres/sols, HACCP." : "Industrial/commercial, disinfection, windows/floors, HACCP-ready.",
      },
      {
        t: isFr ? "Terrains & extérieurs" : "Outdoor areas",
        d: isFr ? "Parkings, allées, déchets, espaces verts, remise en état." : "Parking, walkways, waste, green areas, site reset.",
      },
      {
        t: isFr ? "Petits travaux & rénovations" : "Small works & renovations",
        d: isFr ? "Peinture, menuiserie, carrelage — suivi de chantier." : "Painting, carpentry, tiling — project follow-up.",
      },
      {
        t: isFr ? "Contrats & sous-traitance" : "Contracts & subcontracting",
        d: isFr ? "Négociation, coordination prestataires, optimisation qualité/coûts." : "Negotiation, vendor coordination, cost/quality optimization.",
      },
      {
        t: isFr ? "Conseil & audit technique" : "Technical consulting & audit",
        d: isFr ? "Évaluation, recommandations, plans sur mesure." : "Assessment, recommendations, tailored maintenance plans.",
      },
    ],
    shopCats: [
      { t: isFr ? "Outils & Équipements" : "Tools & Equipment", d: isFr ? "Équipements professionnels" : "Professional-grade gear" },
      { t: isFr ? "Produits Nettoyage" : "Cleaning Products", d: isFr ? "Tous secteurs" : "For all industries" },
      { t: isFr ? "Pièces Détachées" : "Spare Parts", d: isFr ? "Maintenance & réparations" : "Maintenance & repairs" },
    ],
    about: {
      points: [
        isFr ? "Fiabilité, rapidité, proximité" : "Reliable, fast, close to you",
        isFr ? "Interventions rapides partout à Maurice" : "Fast response across Mauritius",
        isFr ? "Solutions pro pour particuliers & entreprises" : "Pro solutions for homes & businesses",
      ],
    },
    blogCards: [
      {
        t: isFr ? "Checklist: entretien préventif (bureaux)" : "Checklist: preventive maintenance (offices)",
        d: isFr ? "Les points essentiels à vérifier chaque mois." : "The key items to check monthly.",
      },
      {
        t: isFr ? "Hygiène & HACCP: bonnes pratiques" : "Hygiene & HACCP: best practices",
        d: isFr ? "Réduisez les risques avec une routine claire." : "Reduce risk with a clear routine.",
      },
      {
        t: isFr ? "Comment optimiser vos coûts de maintenance" : "How to optimize maintenance costs",
        d: isFr ? "KPI, sous-traitance, planification — nos conseils." : "KPIs, subcontracting, planning — tips.",
      },
    ],
    contact: {
      wa: "https://wa.me/23057160579",
      waLabel: isFr ? "WhatsApp (Operation Manager)" : "WhatsApp (Operation Manager)",
      email: "contact@multiimaint.mu",
      phone: "+230 5716 0579",
      address: isFr ? "Île Maurice" : "Mauritius",
      form: {
        name: isFr ? "Nom / Entreprise" : "Name / Company",
        phone: isFr ? "Téléphone" : "Phone",
        email: "Email",
        msg: isFr ? "Décrivez votre besoin (service / boutique…)" : "Describe your request (service / shop…)",
        send: isFr ? "Envoyer" : "Send",
        note: isFr ? "Réponse rapide par WhatsApp / Email." : "Fast reply via WhatsApp / Email.",
      },
    },
    footer: {
      built: isFr ? "Site construit par" : "Built by",
      rights: isFr ? "Tous droits réservés." : "All rights reserved.",
    },
  };
}

function mmHref(lang: Lang, to: string) {
  return `/${lang}${to === "/" ? "" : to}`;
}

export default async function Home({ params }: { params: Promise<{ lang: Lang }> }) {
  const p = await params;
  const lang = p?.lang === "en" ? "en" : "fr";
  const c = copy(lang);

  return (
    <>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(244,123,32,.28),transparent_60%),radial-gradient(900px_500px_at_90%_10%,rgba(23,184,144,.22),transparent_55%),linear-gradient(180deg,var(--mm-navy),#07142c_55%,#050e22)]" />
        <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,14,34,.78)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href={mmHref(lang, "/")} className="flex items-center gap-3">
            <Image
              src={"/multiimaint-logo.png"} // replace with your final public link later if needed
              alt="MultiiMaint Ltd"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg bg-white/5 p-1"
              priority
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">MultiiMaint</div>
              <div className="text-xs text-white/65">Ltd</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm text-white/80 md:flex">
            <a className="hover:text-white" href="#services">{c.topNav.services}</a>
            <a className="hover:text-white" href="#shop">{c.topNav.shop}</a>
            <a className="hover:text-white" href="#about">{c.topNav.about}</a>
            <a className="hover:text-white" href="#blog">{c.topNav.blog}</a>
            <a className="hover:text-white" href="#contact">{c.topNav.contact}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="hidden rounded-xl border border-white/10 bg-white/5 p-1 md:flex">
              <Link
                href="/fr"
                className={`rounded-lg px-3 py-1 text-xs ${lang === "fr" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
              >
                FR
              </Link>
              <Link
                href="/en"
                className={`rounded-lg px-3 py-1 text-xs ${lang === "en" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"}`}
              >
                EN
              </Link>
            </div>

            <a
              href="#contact"
              className="rounded-xl bg-[var(--mm-orange)] px-4 py-2 text-sm font-medium text-[#0b1b3a] shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              {c.topNav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4">
        <section className="relative py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
                <span className="h-2 w-2 rounded-full bg-[var(--mm-green)]" />
                {c.hero.kicker}
              </div>

              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                {c.hero.h}
              </h1>

              <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">
                {c.hero.p}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-2xl bg-[var(--mm-orange)] px-6 py-3 font-medium text-[#0b1b3a] shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  {c.hero.primary}
                </a>
                <a
                  href="#shop"
                  className="rounded-2xl border border-white/14 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  {c.hero.secondary}
                </a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
                {[
                  { k: "24/7", v: lang === "fr" ? "Support" : "Support" },
                  { k: "KPI", v: lang === "fr" ? "Suivi" : "Tracking" },
                  { k: "HACCP", v: lang === "fr" ? "Conforme" : "Ready" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-lg font-semibold">{x.k}</div>
                    <div className="text-xs text-white/70">{x.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="relative">
              {/* Animated hero panel */}
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
                <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-[var(--mm-orange)] opacity-20 blur-2xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--mm-green)] opacity-20 blur-2xl" />

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white/85">MultiiMaint</div>
                  <div className="text-xs text-white/60">Web • Mobile • Facility</div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    lang === "fr" ? "SOS Maintenance" : "SOS Maintenance",
                    lang === "fr" ? "Demander un Service" : "Request a Service",
                    lang === "fr" ? "Commander Produits" : "Order Products",
                  ].map((x, i) => (
                    <div
                      key={x}
                      className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,.06)] px-4 py-3"
                      style={{
                        transform: `translateY(${i * 0}px)`,
                      }}
                    >
                      <div className="text-sm font-medium">{x}</div>
                      <div className="mt-1 text-xs text-white/65">
                        {lang === "fr" ? "Réponse rapide • Suivi • Qualité" : "Fast reply • Tracking • Quality"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">{lang === "fr" ? "Paiement" : "Payment"}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[
                      lang === "fr" ? "Carte Bancaire" : "Card",
                      lang === "fr" ? "Mobile Money" : "Mobile Money",
                      lang === "fr" ? "Payer sur Place" : "Pay on site",
                    ].map((x) => (
                      <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-white/55">
                {lang === "fr" ? "Design premium • Performance • SEO" : "Premium design • Performance • SEO"}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-12 md:py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold md:text-3xl">{c.sections.services}</h2>
              <div className="hidden text-sm text-white/65 md:block">
                {lang === "fr" ? "Maintenance • Nettoyage • Facility" : "Maintenance • Cleaning • Facility"}
              </div>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s, idx) => (
              <Reveal key={s.t} delay={0.05 + idx * 0.03}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--mm-orange)]" />
                    <h3 className="font-semibold">{s.t}</h3>
                  </div>
                  <p className="mt-3 text-sm text-white/75">{s.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Shop */}
        <section id="shop" className="py-12 md:py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold md:text-3xl">{c.sections.shop}</h2>
              <Link
                href={mmHref(lang, "/shop")}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 hover:bg-white/10"
              >
                {lang === "fr" ? "Voir la boutique" : "Open shop"}
              </Link>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {c.shopCats.map((x, idx) => (
              <Reveal key={x.t} delay={0.08 + idx * 0.05}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="text-lg font-semibold">{x.t}</div>
                  <div className="mt-2 text-sm text-white/75">{x.d}</div>
                  <div className="mt-5">
                    <a
                      href="#contact"
                      className="inline-flex rounded-2xl bg-[var(--mm-orange)] px-4 py-2 text-sm font-medium text-[#0b1b3a] hover:brightness-110"
                    >
                      {lang === "fr" ? "Commander / Devis" : "Order / Quote"}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <h2 className="text-2xl font-semibold md:text-3xl">{c.sections.about}</h2>
              <p className="mt-4 text-white/75">
                {lang === "fr"
                  ? "Un partenaire fiable, innovant et polyvalent pour la gestion et l’entretien de vos infrastructures."
                  : "A reliable, innovative and versatile partner to manage and maintain your facilities."}
              </p>

              <ul className="mt-6 space-y-3">
                {c.about.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-1 h-2 w-2 rounded-full bg-[var(--mm-green)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={c.contact.wa}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10"
                >
                  {lang === "fr" ? "WhatsApp direct" : "WhatsApp direct"}
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl bg-[var(--mm-orange)] px-5 py-3 text-sm font-medium text-[#0b1b3a] hover:brightness-110"
                >
                  {lang === "fr" ? "Planifier une intervention" : "Schedule a visit"}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-medium text-white/85">
                  {lang === "fr" ? "Fiabilité • Rapidité • Proximité" : "Reliable • Fast • Close"}
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    lang === "fr" ? "Intervention en cours" : "Job in progress",
                    lang === "fr" ? "Technicien en route" : "Technician on the way",
                    lang === "fr" ? "Terminé (rapport)" : "Completed (report)",
                  ].map((x, idx) => (
                    <div key={x} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="text-sm font-medium">{x}</div>
                      <div className="mt-1 text-xs text-white/65">
                        {lang === "fr" ? "Suivi clair & communication rapide" : "Clear tracking & fast communication"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="py-12 md:py-16">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold md:text-3xl">{c.sections.blog}</h2>
              <span className="text-sm text-white/65">{lang === "fr" ? "Conseils & actualités" : "Tips & updates"}</span>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {c.blogCards.map((b, idx) => (
              <Reveal key={b.t} delay={0.05 + idx * 0.04}>
                <article className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                  <h3 className="font-semibold">{b.t}</h3>
                  <p className="mt-2 text-sm text-white/75">{b.d}</p>
                  <div className="mt-4 text-sm text-[var(--mm-orange)]">
                    {lang === "fr" ? "Lire →" : "Read →"}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact + Newsletter */}
        <section id="contact" className="py-12 pb-16 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-semibold md:text-3xl">{c.sections.contact}</h2>
              <p className="mt-3 text-white/75">
                {lang === "fr"
                  ? "Demandez un devis ou une intervention. Réponse rapide par WhatsApp / email."
                  : "Request a quote or intervention. Fast reply via WhatsApp / email."}
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/80">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">WhatsApp</div>
                  <a className="mt-1 block font-medium hover:underline" href={c.contact.wa} target="_blank" rel="noreferrer">
                    {c.contact.waLabel}
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">{lang === "fr" ? "Téléphone" : "Phone"}</div>
                  <div className="mt-1 font-medium">{c.contact.phone}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">Email</div>
                  <div className="mt-1 font-medium">{c.contact.email}</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/60">{lang === "fr" ? "Localisation" : "Location"}</div>
                  <div className="mt-1 font-medium">{c.contact.address}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <form className="grid gap-3">
                  <input aria-label={c.contact.form.name} placeholder={c.contact.form.name} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/45 outline-none focus:ring-2 focus:ring-white/30" />
                  <input aria-label={c.contact.form.phone} placeholder={c.contact.form.phone} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/45 outline-none focus:ring-2 focus:ring-white/30" />
                  <input aria-label={c.contact.form.email} placeholder={c.contact.form.email} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/45 outline-none focus:ring-2 focus:ring-white/30" />
                  <textarea aria-label={c.contact.form.msg} placeholder={c.contact.form.msg} className="min-h-[120px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/45 outline-none focus:ring-2 focus:ring-white/30" />
                  <button
                    type="button"
                    className="mt-2 rounded-2xl bg-[var(--mm-orange)] px-6 py-3 text-sm font-semibold text-[#0b1b3a] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    {c.contact.form.send}
                  </button>
                  <div className="text-xs text-white/55">{c.contact.form.note}</div>
                </form>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">{c.sections.newsletter}</div>
                  <div className="mt-1 text-xs text-white/65">
                    {lang === "fr" ? "Recevez nos conseils & nouveautés." : "Get tips & updates."}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input
                      aria-label="Newsletter email"
                      placeholder="Email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/45 outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <button
                      type="button"
                      className="shrink-0 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
                    >
                      {lang === "fr" ? "S’inscrire" : "Join"}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-10 text-sm text-white/65">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} MultiiMaint Ltd. {c.footer.rights}</div>
            <div>
              {c.footer.built}{" "}
              <a
                href="https://mobiz.mu"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline"
              >
                mobiz.mu
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
