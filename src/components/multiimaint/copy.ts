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
     // ✅ add inside your copy(lang) return object
pages: {
  services: {
    en: {
      kicker: "Mauritius • Premium Service • Quality Control",
      title: "Our Services",
      desc:
        "Maintenance, professional cleaning, facilities management and indoor/outdoor gardening in Mauritius — premium delivery, controlled quality and professional follow-up.",
      jump: "Jump to details",
      explore: "Explore service page",
      anchorsTitle: "Service Details",
      anchorsDesc:
        "Browse each service section below or open the dedicated page for full details.",
      sections: {
        maintenance: {
          title: "Preventive & Corrective Maintenance",
          desc:
            "Premium technical maintenance for businesses and residences — fast response, fault prevention, repairs and professional follow-up.",
          bullets: [
            "Fast response & reliable diagnostics",
            "Preventive & corrective maintenance",
            "Safety-first process & quality control",
            "Photo updates, KPIs & clear reporting",
            "Tailored solutions for each site",
          ],
          pageCta: "Open Maintenance Page",
        },
        cleaning: {
          title: "Professional Cleaning & Hygiene",
          desc:
            "Premium cleaning for offices, retail and residences: hygiene, disinfection, neat finishing, flexible scheduling and quality checks.",
          bullets: [
            "Offices, retail, residences & sites",
            "Professional methods & right products",
            "Hygiene, disinfection & neat finishing",
            "Flexible scheduling (one-off or contract)",
            "Quality checks & client follow-up",
          ],
          pageCta: "Open Cleaning Page",
        },
        facility: {
          title: "Facilities Management",
          desc:
            "Multi-site supervision and coordinated interventions: KPIs, reporting, vendor management, optimization and one point of contact.",
          bullets: [
            "Multi-site operations & contracts",
            "KPIs, reporting & performance tracking",
            "Vendor coordination & interventions",
            "Cost and priority optimization",
            "Single point of contact (SPOC)",
          ],
          pageCta: "Open Facilities Page",
        },
        gardening: {
          title: "Indoor & Outdoor Gardening",
          desc:
            "Green spaces and outdoor upkeep: gardening, trimming, clearing, surroundings cleaning and scheduled or one-off visits.",
          bullets: [
            "Regular green-space upkeep",
            "Indoor & outdoor gardening support",
            "Trimming, clearing and cleanliness",
            "Paths, surroundings & exterior areas",
            "One-off or scheduled interventions",
          ],
          pageCta: "Open Gardening Page",
        },
      },
    },
    fr: {
      kicker: "Île Maurice • Service Premium • Qualité Contrôlée",
      title: "Nos Services",
      desc:
        "Maintenance, nettoyage, facilities management et jardinage à l’Île Maurice — service premium, qualité contrôlée et suivi professionnel.",
      jump: "Aller aux détails",
      explore: "Voir la page du service",
      anchorsTitle: "Détails des Services",
      anchorsDesc:
        "Consultez chaque section ci-dessous ou ouvrez la page dédiée pour tous les détails.",
      sections: {
        maintenance: {
          title: "Maintenance Préventive & Corrective",
          desc:
            "Maintenance technique premium pour entreprises et résidences : intervention rapide, prévention des pannes, réparations et suivi professionnel.",
          bullets: [
            "Intervention rapide & diagnostic fiable",
            "Préventif & correctif (équipements & bâtiments)",
            "Procédures sécurité, qualité & conformité",
            "Suivi avec photos, KPI & compte-rendu",
            "Solutions sur mesure pour chaque site",
          ],
          pageCta: "Ouvrir la page Maintenance",
        },
        cleaning: {
          title: "Nettoyage Professionnel & Hygiène",
          desc:
            "Nettoyage pro pour bureaux, commerces et résidences : hygiène, désinfection, finitions soignées, planning flexible et contrôle qualité.",
          bullets: [
            "Bureaux, commerces, résidences & sites",
            "Méthodes pro & produits adaptés",
            "Hygiène, désinfection & finitions",
            "Planning flexible (ponctuel ou contrat)",
            "Contrôle qualité & suivi client",
          ],
          pageCta: "Ouvrir la page Nettoyage",
        },
        facility: {
          title: "Facilities Management",
          desc:
            "Gestion et supervision multi-sites : coordination des interventions, KPI, reporting, optimisation des coûts et un seul point de contact.",
          bullets: [
            "Gestion multi-sites & contrats",
            "KPI, reporting & suivi performance",
            "Coordination prestataires & interventions",
            "Optimisation des coûts & priorités",
            "Point de contact unique (SPOC)",
          ],
          pageCta: "Ouvrir la page Facilities",
        },
        gardening: {
          title: "Jardinage Intérieur & Extérieur",
          desc:
            "Entretien d’espaces verts et extérieurs : jardinage, taille, débroussaillage, nettoyage des abords et interventions planifiées.",
          bullets: [
            "Entretien régulier des espaces verts",
            "Jardinage intérieur & extérieur",
            "Taille, nettoyage, débroussaillage",
            "Allées, abords & propreté extérieure",
            "Interventions ponctuelles ou planifiées",
          ],
          pageCta: "Ouvrir la page Jardinage",
        },
      },
    },
  },

  about: {
    en: {
      kicker: "MultiiMaint Ltd • Mauritius",
      title: "About MultiiMaint",
      desc:
        "We deliver premium maintenance and facility services for homes, offices and multi-site operations — with safety, quality control and clear reporting.",
      cta: "Mission & Vision",
    },
    fr: {
      kicker: "MultiiMaint Ltd • Île Maurice",
      title: "À propos de MultiiMaint",
      desc:
        "Nous proposons des services premium pour maisons, bureaux et multi-sites — sécurité, contrôle qualité et reporting clair.",
      cta: "Mission & Vision",
    },
  },

  missionVision: {
    en: {
      kicker: "Mission • Vision • Values",
      title: "Our Mission & Vision",
      desc:
        "Premium facility services in Mauritius with predictable quality, safety and professional reporting — for long-term trust.",
      missionTitle: "Mission",
      missionText:
        "Provide fast, reliable premium services with clear communication, quality checks and measurable reporting.",
      visionTitle: "Vision",
      visionText:
        "Become the most trusted facility partner in Mauritius — known for safety, transparency and consistent quality.",
    },
    fr: {
      kicker: "Mission • Vision • Valeurs",
      title: "Notre Mission & Vision",
      desc:
        "Services premium à l’Île Maurice avec qualité, sécurité et reporting professionnel — pour une confiance durable.",
      missionTitle: "Mission",
      missionText:
        "Offrir un service rapide et fiable avec communication claire, contrôle qualité et reporting mesurable.",
      visionTitle: "Vision",
      visionText:
        "Devenir le partenaire le plus fiable à Maurice — reconnu pour la sécurité, la transparence et la constance.",
    },
  },

  shop: {
    en: {
      kicker: "Shop • Equipment • Essentials",
      title: "MultiiMaint Shop",
      desc:
        "We’re preparing the shop section. Soon you’ll be able to browse equipment and essentials with local support in Mauritius.",
      note: "Coming soon: categories, featured products, request-to-buy workflow.",
    },
    fr: {
      kicker: "Boutique • Équipements • Essentiels",
      title: "Boutique MultiiMaint",
      desc:
        "Nous préparons la boutique. Bientôt : équipements et essentiels avec support local à l’Île Maurice.",
      note: "À venir : catégories, produits phares, demande d’achat.",
    },
  },

  blog: {
    en: {
      kicker: "Insights • Tips • Standards",
      title: "MultiiMaint Blog",
      desc:
        "Practical guidance for maintenance, cleaning, facilities management and gardening in Mauritius.",
      readMore: "Read more →",
    },
    fr: {
      kicker: "Conseils • Astuces • Standards",
      title: "Blog MultiiMaint",
      desc:
        "Conseils pratiques pour la maintenance, le nettoyage, le facilities management et le jardinage à Maurice.",
      readMore: "Lire plus →",
    },
  },

  contact: {
    en: {
      kicker: "Contact • Quotes • Support",
      title: "Contact MultiiMaint",
      desc:
        "Request a quote or ask a question. We respond fast and can schedule interventions across Mauritius.",
      waTitle: "WhatsApp (fastest)",
      waDesc: "Message us with your location, service needed and preferred time.",
      formTitle: "Contact form",
      formDesc: "You can connect this to email or Supabase later — placeholder for now.",
    },
    fr: {
      kicker: "Contact • Devis • Support",
      title: "Contactez MultiiMaint",
      desc:
        "Demandez un devis ou posez une question. Réponse rapide et interventions partout à l’Île Maurice.",
      waTitle: "WhatsApp (le plus rapide)",
      waDesc: "Envoyez votre localisation, service souhaité et créneau préféré.",
      formTitle: "Formulaire de contact",
      formDesc: "Connexion Email/Supabase plus tard — bloc provisoire pour le moment.",
    },
  },

  policies: {
    en: {
      privacy: { title: "Privacy Policy", desc: "How we collect, use and protect your information." },
      terms: { title: "Terms & Conditions", desc: "Website use, quotes, service delivery, and liability terms." },
      refund: { title: "Refund Policy", desc: "Refund eligibility and process." },
      cookies: { title: "Cookie Policy", desc: "How cookies are used on this site." },
    },
    fr: {
      privacy: { title: "Politique de Confidentialité", desc: "Comment nous collectons, utilisons et protégeons vos informations." },
      terms: { title: "Conditions Générales", desc: "Utilisation du site, devis, prestation et responsabilités." },
      refund: { title: "Politique de Remboursement", desc: "Éligibilité et procédure de remboursement." },
      cookies: { title: "Politique des Cookies", desc: "Comment les cookies sont utilisés sur ce site." },
    },
  },
},

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

