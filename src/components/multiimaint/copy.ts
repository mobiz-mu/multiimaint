export type Lang = "fr" | "en";

export function copy(lang: Lang) {
  const isFr = lang === "fr";

  return {
    nav: {
      home: isFr ? "Accueil" : "Home",
      services: isFr ? "Nos Services" : "Services",
      shop: isFr ? "Boutique" : "Shop",
      about: isFr ? "A propos" : "About",
      blog: "Blog",
      contact: "Contact",
      cta: isFr ? "Demander un Devis" : "Request a Quote",
    },

    hero: {
      kicker: isFr ? "Ile Maurice - Reactivite - Qualite" : "Mauritius - Fast response - Quality",
      h: isFr
        ? "Gros ou petit probleme, nous la pou ou !"
        : "Big or small issue - we've got you covered!",
      p: isFr
        ? "Maintenance, nettoyage professionnel, facility management multisite et boutique d'equipements - pour particuliers et entreprises."
        : "Maintenance, professional cleaning, multisite facility management and equipment shop - for homes & businesses.",
      primary: isFr ? "Demander un Devis" : "Request a Quote",
      secondary: isFr ? "Voir la Boutique" : "Visit the Shop",
    },

    sections: {
      services: isFr ? "Nos Services" : "Our Services",
      shop: isFr ? "Boutique Produits" : "Shop Products",
      about: isFr ? "A Propos" : "About Us",
      blog: isFr ? "Notre Blog" : "Our Blog",
      contact: "Contact",
      newsletter: "Newsletter",
    },

    services: [
      {
        t: isFr ? "Maintenance preventive & corrective" : "Preventive & corrective maintenance",
        d: isFr
          ? "Climatisation, plomberie, electricite - interventions rapides + reporting."
          : "AC, plumbing, electrical - fast interventions + reporting.",
      },
      {
        t: isFr ? "Facility Management multisite" : "Multisite facility management",
        d: isFr ? "Coordination multi-sites, equipes locales, suivi KPI." : "Multisite coordination, local teams, KPI tracking.",
      },
      {
        t: isFr ? "Nettoyage professionnel & hygiene" : "Professional cleaning & hygiene",
        d: isFr
          ? "Industriel/tertiaire, desinfection, vitres/sols, HACCP."
          : "Industrial/commercial, disinfection, windows/floors, HACCP-ready.",
      },
      {
        t: isFr ? "Terrains & exterieurs" : "Outdoor areas",
        d: isFr ? "Parkings, allees, dechets, espaces verts, remise en etat." : "Parking, walkways, waste, green areas, site reset.",
      },
      {
        t: isFr ? "Petits travaux & renovations" : "Small works & renovations",
        d: isFr ? "Peinture, menuiserie, carrelage - suivi de chantier." : "Painting, carpentry, tiling - project follow-up.",
      },
      {
        t: isFr ? "Contrats & sous-traitance" : "Contracts & subcontracting",
        d: isFr
          ? "Negociation, coordination prestataires, optimisation qualite/couts."
          : "Negotiation, vendor coordination, cost/quality optimization.",
      },
      {
        t: isFr ? "Conseil & audit technique" : "Technical consulting & audit",
        d: isFr ? "Evaluation, recommandations, plans sur mesure." : "Assessment, recommendations, tailored maintenance plans.",
      },
    ],

    shopCats: [
      { t: isFr ? "Outils & Equipements" : "Tools & Equipment", d: isFr ? "Equipements professionnels" : "Professional-grade gear" },
      { t: isFr ? "Produits Nettoyage" : "Cleaning Products", d: isFr ? "Tous secteurs" : "For all industries" },
      { t: isFr ? "Pieces Detachees" : "Spare Parts", d: isFr ? "Maintenance & reparations" : "Maintenance & repairs" },
    ],

    blogCards: [
      {
        t: isFr ? "Checklist: entretien preventif (bureaux)" : "Checklist: preventive maintenance (offices)",
        d: isFr ? "Les points essentiels a verifier chaque mois." : "The key items to check monthly.",
      },
      {
        t: isFr ? "Hygiene & HACCP: bonnes pratiques" : "Hygiene & HACCP: best practices",
        d: isFr ? "Reduisez les risques avec une routine claire." : "Reduce risk with a clear routine.",
      },
      {
        t: isFr ? "Optimiser vos couts de maintenance" : "Optimize maintenance costs",
        d: isFr ? "KPI, sous-traitance, planification - nos conseils." : "KPIs, subcontracting, planning - tips.",
      },
      {
        t: isFr ? "Tendances Facility Management" : "Facility management trends",
        d: isFr ? "Technologie, performance, supervision multisite." : "Technology, performance, multisite supervision.",
      },
      {
        t: isFr ? "Astuces nettoyage pro" : "Professional cleaning tips",
        d: isFr ? "Materiel, produits, routines efficaces." : "Tools, products, effective routines.",
      },
      {
        t: isFr ? "Securite & conformite" : "Safety & compliance",
        d: isFr ? "Reduisez les risques et ameliorez vos standards." : "Reduce risks and improve standards.",
      },
    ],

    contact: {
      wa:
        "https://wa.me/23057160579?text=" +
        encodeURIComponent(isFr ? "Bonjour MultiiMaint, je souhaite un devis." : "Hello MultiiMaint, I would like a quote."),
      waLabel: isFr ? "WhatsApp (Operation Manager)" : "WhatsApp (Operation Manager)",
      email: "support@multiimaint.mu",
      phone: "+230 5716 0579",
      address: isFr ? "Ile Maurice" : "Mauritius",
      form: {
        name: isFr ? "Nom / Entreprise" : "Name / Company",
        phone: isFr ? "Telephone" : "Phone",
        email: "Email",
        msg: isFr ? "Decrivez votre besoin (service / boutique...)" : "Describe your request (service / shop...)",
        send: isFr ? "Envoyer" : "Send",
        note: isFr ? "Reponse rapide par WhatsApp / Email." : "Fast reply via WhatsApp / Email.",
      },
    },

    footer: {
      built: isFr ? "Site construit par" : "Built by",
      rights: isFr ? "Tous droits reserves." : "All rights reserved.",
    },
  } as const;
}

