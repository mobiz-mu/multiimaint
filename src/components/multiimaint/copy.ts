export type Lang = "fr" | "en";

type ServiceSection = {
  title: string;
  desc: string;
  bullets: string[];
  pageCta: string;
};

type PagesServices = {
  kicker: string;
  title: string;
  desc: string;
  explore: string;
  anchorsTitle: string;
  anchorsDesc: string;
  sections: {
    maintenance: ServiceSection;
    cleaning: ServiceSection;
    facility: ServiceSection; // ✅ IMPORTANT: singular (matches your code)
    gardening: ServiceSection;
  };
};

type PagesContact = {
  title: string;
  kicker: string;
  desc: string;
};

type PagesAbout = {
  title: string;
  kicker: string;
  desc: string;
};

type PagesShop = {
  title: string;
  kicker: string;
  desc: string;
  comingSoonTitle: string;
  comingSoonDesc: string;
  cta: string;
};

type PagesMissionVision = {
  kicker: string;
  title: string;
  desc: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  pillarsTitle: string;
  pillars: Array<{ title: string; desc: string }>;
  valuesTitle: string;
  values: Array<{ title: string; desc: string }>;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export function copy(lang: Lang) {
  const isFr = lang === "fr";

  const WA_PHONE = "23057160579";
  const EMAIL = "support@multiimaint.com";

  return {
    /* =========================
       NAV (Header/Footer)
    ========================= */
    nav: {
      home: isFr ? "Accueil" : "Home",
      services: isFr ? "Nos Services" : "Services",
      shop: isFr ? "Boutique" : "Shop",
      about: isFr ? "À propos" : "About",
      blog: "Blog",
      contact: "Contact",
      cta: isFr ? "Demander un devis" : "Request a Quote",
    },

    /* =========================
       HOME HERO (if used)
    ========================= */
    hero: {
      kicker: isFr
        ? "Île Maurice • Réactivité • Qualité"
        : "Mauritius • Fast response • Quality",
      h: isFr
        ? "Gros ou petit problème, nous là pou ou !"
        : "Big or small issue — we've got you covered!",
      p: isFr
        ? "Maintenance, nettoyage professionnel, facility management multisite et boutique d’équipements — pour particuliers et entreprises."
        : "Maintenance, professional cleaning, multi-site facilities management and equipment shop — for homes & businesses.",
      primary: isFr ? "Demander un devis" : "Request a Quote",
      secondary: isFr ? "Voir la boutique" : "Visit the Shop",
    },

    /* =========================
       SECTION LABELS (Home)
    ========================= */
    sections: {
      services: isFr ? "Nos Services" : "Our Services",
      shop: isFr ? "Boutique Produits" : "Shop Products",
      about: isFr ? "À propos" : "About Us",
      blog: isFr ? "Notre Blog" : "Our Blog",
      contact: "Contact",
      newsletter: "Newsletter",
    },

    /* =========================
       CONTACT (shared constants)
    ========================= */
    contact: {
      wa:
        "https://wa.me/" +
        WA_PHONE +
        "?text=" +
        encodeURIComponent(
          isFr
            ? "Bonjour MultiiMaint, je souhaite un devis."
            : "Hello MultiiMaint, I would like a quote."
        ),
      waLabel: isFr
        ? "WhatsApp (Responsable Opérations)"
        : "WhatsApp (Operations Manager)",
      email: EMAIL,
      phone: "+230 5716 0579",
      address: isFr ? "Île Maurice" : "Mauritius",
      form: {
        name: isFr ? "Nom / Entreprise" : "Name / Company",
        phone: isFr ? "Téléphone" : "Phone",
        email: "Email",
        msg: isFr
          ? "Décrivez votre besoin (service / boutique...)"
          : "Describe your request (service / shop...)",
        send: isFr ? "Envoyer" : "Send",
        note: isFr
          ? "Réponse rapide par WhatsApp / Email."
          : "Fast reply via WhatsApp / Email.",
      },
    },

    /* =========================
       FOOTER
    ========================= */
    footer: {
      built: isFr ? "Site construit par" : "Built by",
      rights: isFr ? "Tous droits réservés." : "All rights reserved.",
    },

    /* =========================
       PAGES
    ========================= */
    pages: {
      services: {
        fr: {
          kicker: "SERVICE PREMIUM • MAURICE",
          title: "Nos Services",
          desc: "Maintenance, nettoyage, facilities management et jardinage — méthode claire, qualité contrôlée et suivi premium.",
          explore: "Découvrir",
          anchorsTitle: "Détails par service",
          anchorsDesc:
            "Choisissez un service pour voir ce qui est inclus, notre méthode et comment nous intervenons sur site.",
          sections: {
            maintenance: {
              title: "Maintenance",
              desc: "Maintenance préventive et corrective pour bâtiments, équipements et interventions urgentes.",
              bullets: [
                "Diagnostic & intervention sur site",
                "Maintenance préventive / corrective",
                "Réactivité & planification",
                "Suivi & reporting simple",
              ],
              pageCta: "Voir Maintenance",
            },
            cleaning: {
              title: "Nettoyage",
              desc: "Nettoyage professionnel premium pour bureaux, commerces, résidences et sites — hygiène & finitions.",
              bullets: [
                "Nettoyage bureaux & espaces communs",
                "Hygiène, désinfection (si requis)",
                "Checklist & contrôle qualité",
                "Interventions ponctuelles ou contrat",
              ],
              pageCta: "Voir Nettoyage",
            },
            facility: {
              title: "Facilities Management",
              desc: "Coordination multi-sites, gestion des interventions, prestataires, contrôle qualité et reporting.",
              bullets: [
                "Supervision multi-sites",
                "Coordination interventions & prestataires",
                "Contrôle qualité & checklists",
                "Reporting & suivi régulier",
              ],
              pageCta: "Voir Facilities",
            },
            gardening: {
              title: "Jardinage",
              desc: "Jardinage intérieur & extérieur, entretien régulier, remise en état et finitions propres.",
              bullets: [
                "Entretien régulier & ponctuel",
                "Taille, nettoyage, remise en état",
                "Jardinage intérieur & extérieur",
                "Finitions propres & suivi",
              ],
              pageCta: "Voir Jardinage",
            },
          },
        } satisfies PagesServices,

        en: {
          kicker: "PREMIUM SERVICE • MAURITIUS",
          title: "Our Services",
          desc: "Maintenance, professional cleaning, facilities management and gardening — clear method, controlled quality and premium follow-up.",
          explore: "Explore",
          anchorsTitle: "Service details",
          anchorsDesc:
            "Choose a service to see what’s included, our method and how we operate on site.",
          sections: {
            maintenance: {
              title: "Maintenance",
              desc: "Preventive and corrective maintenance for buildings, equipment and urgent interventions.",
              bullets: [
                "On-site diagnostics & intervention",
                "Preventive / corrective maintenance",
                "Fast response & scheduling",
                "Simple follow-up & reporting",
              ],
              pageCta: "View Maintenance",
            },
            cleaning: {
              title: "Cleaning",
              desc: "Premium professional cleaning for offices, retail, residences and sites — hygiene & neat finishing.",
              bullets: [
                "Offices & common areas cleaning",
                "Hygiene, disinfection (if required)",
                "Checklist & quality checks",
                "One-off or recurring contract",
              ],
              pageCta: "View Cleaning",
            },
            facility: {
              title: "Facilities Management",
              desc: "Multi-site coordination, interventions management, suppliers, quality control and reporting.",
              bullets: [
                "Multi-site supervision",
                "Interventions & supplier coordination",
                "Quality control & checklists",
                "Reporting & regular follow-up",
              ],
              pageCta: "View Facilities",
            },
            gardening: {
              title: "Gardening",
              desc: "Indoor & outdoor gardening, regular upkeep, refresh and clean finishing.",
              bullets: [
                "Regular or one-off upkeep",
                "Trimming, cleaning, refresh",
                "Indoor & outdoor gardening",
                "Clean finishing & follow-up",
              ],
              pageCta: "View Gardening",
            },
          },
        } satisfies PagesServices,
      },

      contact: {
        fr: {
          kicker: "CONTACT • SUPPORT • INTERVENTIONS",
          title: "Contact",
          desc: "Réponse rapide, interventions planifiées et suivi qualité premium.",
        } satisfies PagesContact,
        en: {
          kicker: "CONTACT • SUPPORT • INTERVENTIONS",
          title: "Contact",
          desc: "Fast replies, scheduled interventions and premium quality follow-up.",
        } satisfies PagesContact,
      },

      about: {
        fr: {
          kicker: "À PROPOS • MULTIIMAINT",
          title: "À propos",
          desc: "Services premium à l’Île Maurice — maintenance, nettoyage, facilities management et jardinage, avec méthode, contrôle qualité et suivi.",
        } satisfies PagesAbout,
        en: {
          kicker: "ABOUT • MULTIIMAINT",
          title: "About",
          desc: "Premium services in Mauritius — maintenance, cleaning, facilities management and gardening, with method, quality control and follow-up.",
        } satisfies PagesAbout,
      },

      missionVision: {
        fr: {
          kicker: "MULTIIMAINT • MISSION & VISION",
          title: "Mission & Vision",
          desc: "Un service premium, structuré et fiable — pour particuliers et entreprises à l’Île Maurice.",
          missionTitle: "Notre mission",
          missionDesc:
            "Offrir des services de maintenance, nettoyage, facilities management et jardinage avec une exécution soignée, une sécurité maîtrisée, et un suivi clair.",
          visionTitle: "Notre vision",
          visionDesc:
            "Devenir la référence premium à Maurice pour la gestion et l’entretien des sites — avec des standards constants et une expérience client irréprochable.",
          pillarsTitle: "Nos piliers",
          pillars: [
            { title: "Qualité contrôlée", desc: "Checklists, contrôles finaux et standard constant." },
            { title: "Réactivité", desc: "Planification rapide et communication claire." },
            { title: "Fiabilité", desc: "Exécution propre, équipes encadrées, suivi." },
            { title: "Sécurité", desc: "Procédures adaptées, zones sensibles respectées." },
          ],
          valuesTitle: "Nos valeurs",
          values: [
            { title: "Professionnalisme", desc: "Méthode, ponctualité et finitions." },
            { title: "Transparence", desc: "Devis clair, suivi simple, priorité à la confiance." },
            { title: "Excellence", desc: "Amélioration continue et standards premium." },
          ],
          ctaTitle: "Parlons de votre site",
          ctaDesc:
            "Besoin d’une intervention ponctuelle ou d’un contrat récurrent ? Contactez-nous pour une organisation simple et efficace.",
          ctaPrimary: "Contacter",
          ctaSecondary: "Voir les services",
        } satisfies PagesMissionVision,

        en: {
          kicker: "MULTIIMAINT • MISSION & VISION",
          title: "Mission & Vision",
          desc: "Premium, structured and reliable service — for homes and businesses in Mauritius.",
          missionTitle: "Our mission",
          missionDesc:
            "Deliver maintenance, cleaning, facilities management and gardening with neat execution, controlled safety, and clear follow-up.",
          visionTitle: "Our vision",
          visionDesc:
            "Become the premium reference in Mauritius for site care and management — with consistent standards and an outstanding client experience.",
          pillarsTitle: "Our pillars",
          pillars: [
            { title: "Controlled quality", desc: "Checklists, final checks and consistent standards." },
            { title: "Fast response", desc: "Quick scheduling and clear communication." },
            { title: "Reliability", desc: "Clean execution, managed teams, follow-up." },
            { title: "Safety", desc: "Adapted procedures, sensitive areas respected." },
          ],
          valuesTitle: "Our values",
          values: [
            { title: "Professionalism", desc: "Method, punctuality and finishing." },
            { title: "Transparency", desc: "Clear quotes, simple follow-up, trust first." },
            { title: "Excellence", desc: "Continuous improvement and premium standards." },
          ],
          ctaTitle: "Let’s discuss your site",
          ctaDesc:
            "Need a one-off intervention or a recurring contract? Contact us for a simple, efficient setup.",
          ctaPrimary: "Contact",
          ctaSecondary: "View services",
        } satisfies PagesMissionVision,
      },
       
     policies: {
  fr: {
    privacy: {
      title: "Politique de Confidentialité",
      kicker: "CONFIDENTIALITÉ • DONNÉES • SÉCURITÉ",
      desc: "Nous respectons votre vie privée et protégeons vos données conformément aux bonnes pratiques.",
    },
    terms: {
      title: "Conditions Générales",
      kicker: "CONDITIONS • UTILISATION • SERVICES",
      desc: "Les présentes conditions régissent l'utilisation des services MultiiMaint Ltd.",
    },
    refund: {
      title: "Politique de Remboursement",
      kicker: "REMBOURSEMENT • SERVICE • GARANTIE",
      desc: "Nos remboursements sont étudiés au cas par cas selon la nature du service fourni.",
    },
    cookies: {
      title: "Politique des Cookies",
      kicker: "COOKIES • NAVIGATION • DONNÉES",
      desc: "Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur.",
    },
  },

  en: {
    privacy: {
      title: "Privacy Policy",
      kicker: "PRIVACY • DATA • SECURITY",
      desc: "We respect your privacy and protect your data according to best practices.",
    },
    terms: {
      title: "Terms & Conditions",
      kicker: "TERMS • USAGE • SERVICES",
      desc: "These terms govern the use of MultiiMaint Ltd services.",
    },
    refund: {
      title: "Refund Policy",
      kicker: "REFUND • SERVICE • POLICY",
      desc: "Refunds are reviewed case by case depending on the service provided.",
    },
    cookies: {
      title: "Cookie Policy",
      kicker: "COOKIES • BROWSING • DATA",
      desc: "This website may use cookies to enhance user experience.",
    },
  },
},
    

      shop: {
        fr: {
          kicker: "BOUTIQUE • ÉQUIPEMENTS PRO",
          title: "Boutique",
          desc: "Outils, produits de nettoyage et pièces — sélection professionnelle.",
          comingSoonTitle: "Coming Soon… Stay Tuned!",
          comingSoonDesc:
            "Notre boutique arrive bientôt. Pour toute demande urgente, contactez-nous sur WhatsApp.",
          cta: "Contactez-nous",
        } satisfies PagesShop,
        en: {
          kicker: "SHOP • PRO EQUIPMENT",
          title: "Shop",
          desc: "Tools, cleaning products and spare parts — professional selection.",
          comingSoonTitle: "Coming Soon… Stay Tuned!",
          comingSoonDesc:
            "Our shop is launching soon. For urgent requests, contact us on WhatsApp.",
          cta: "Contact us",
        } satisfies PagesShop,
      },
    },
  } as const;
}