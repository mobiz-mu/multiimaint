export type BlogLang = "fr" | "en";

export type BlogPost = {
  slug: string;

  title: Record<BlogLang, string>;
  excerpt: Record<BlogLang, string>;

  // ✅ optional: for better SEO + snippets
  seoTitle?: Record<BlogLang, string>;
  seoDesc?: Record<BlogLang, string>;

  image: string; // "/blog-xxx.jpg"

  // ✅ categories for pills
  categories: Array<"Maintenance" | "Cleaning" | "Facility" | "Costs" | "HACCP" | "Safety">;

  date?: string; // "2026-02-01"
  readTime?: string; // "4 min"

  content: Record<BlogLang, Array<{ h?: string; p: string }>>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "checklist-entretien-preventif-bureaux",
    title: {
      fr: "Checklist premium : entretien préventif (bureaux)",
      en: "Premium checklist: preventive maintenance (offices)",
    },
    excerpt: {
      fr: "Une routine mensuelle claire pour réduire les pannes, sécuriser les équipes et maîtriser les coûts.",
      en: "A clear monthly routine to reduce failures, protect teams, and control costs.",
    },
    seoTitle: {
      fr: "Checklist entretien préventif bureaux (mensuelle) | MultiiMaint",
      en: "Monthly office preventive maintenance checklist | MultiiMaint",
    },
    seoDesc: {
      fr: "Checklist mensuelle pour bureaux : climatisation, fuites, éclairage, sécurité, registre et KPI — pour réduire pannes et coûts.",
      en: "Monthly office checklist: AC, leaks, lighting, safety, logs and KPIs — to reduce failures and costs.",
    },
    image: "/blog-maintenance-checklist.jpg",
    categories: ["Maintenance", "Facility"],
    date: "2026-02-10",
    readTime: "6 min",
    content: {
      fr: [
        {
          p: "En environnement de bureau, les pannes coûtent cher : perte de productivité, inconfort, risques sécurité et interventions en urgence. Un plan d’entretien préventif simple, régulier et documenté permet de stabiliser vos coûts et de fiabiliser votre site.",
        },
        {
          h: "Objectif : passer du réactif au contrôlé",
          p: "Le but n’est pas de “tout vérifier tout le temps”, mais de vérifier les points à risque selon une fréquence stable, avec un registre clair (date, action, photo si besoin, signature).",
        },
        {
          h: "Checklist mensuelle (bureaux)",
          p: "• Climatisation/ventilation : filtres, bruits anormaux, odeurs, condensation\n• Électricité : éclairage, prises, multiprises, disjoncteurs signalés\n• Plomberie : fuites, pression, sanitaires, joints, odeurs\n• Sécurité : extincteurs visibles, sorties dégagées, signalisation\n• Portes/serrures : fermeture, contrôle d’accès, alignements\n• Zones à risque : cuisines, local technique, salles serveur, sanitaires\n• Propreté & hygiène : points de contact, zones communes, poubelles",
        },
        {
          h: "Le registre (la différence “premium”)",
          p: "Votre registre transforme la maintenance en management : vous tracez, vous comparez, vous priorisez. Ajoutez 3 KPI simples : (1) nombre d’incidents/mois, (2) délai moyen de résolution, (3) coût des urgences vs préventif.",
        },
        {
          h: "Conseil MultiiMaint",
          p: "Créez un calendrier annuel : mensuel (checklist), trimestriel (révision), annuel (audit). Cette structure réduit fortement les imprévus et améliore l’expérience des occupants.",
        },
      ],
      en: [
        {
          p: "In offices, breakdowns are expensive: productivity loss, discomfort, safety risks, and emergency call-outs. A simple preventive routine—done consistently and documented—stabilizes costs and makes your site reliable.",
        },
        {
          h: "Goal: move from reactive to controlled",
          p: "The goal isn’t to “check everything all the time”. It’s to check the key risk points on a steady schedule, using a clear log (date, action, photo if needed, signature).",
        },
        {
          h: "Monthly office checklist",
          p: "• HVAC/ventilation: filters, unusual noise, odors, condensation\n• Electrical: lighting, sockets, extensions, reported breakers\n• Plumbing: leaks, pressure, restrooms, seals, odors\n• Safety: visible extinguishers, clear exits, signage\n• Doors/locks: closing, access control, alignment\n• Risk zones: pantry, technical room, server room, restrooms\n• Hygiene: high-touch points, shared areas, bins",
        },
        {
          h: "The log (the “premium” difference)",
          p: "Your log turns maintenance into management: you track, compare, and prioritize. Add 3 simple KPIs: (1) incidents per month, (2) average resolution time, (3) emergency cost vs preventive cost.",
        },
        {
          h: "MultiiMaint tip",
          p: "Build an annual calendar: monthly (checklist), quarterly (review), yearly (audit). This structure reduces surprises and improves occupant experience.",
        },
      ],
    },
  },

  {
    slug: "hygiene-haccp-bonnes-pratiques",
    title: {
      fr: "Hygiène & HACCP : bonnes pratiques premium",
      en: "Hygiene & HACCP: premium best practices",
    },
    excerpt: {
      fr: "Routine, traçabilité et produits adaptés pour une hygiène conforme, durable et contrôlée.",
      en: "Routine, traceability, and correct products for compliant, consistent hygiene.",
    },
    seoTitle: {
      fr: "Hygiène & HACCP : bonnes pratiques + traçabilité | MultiiMaint",
      en: "Hygiene & HACCP: best practices + traceability | MultiiMaint",
    },
    seoDesc: {
      fr: "Hygiène HACCP : routine, séquence des zones, dilution, traçabilité, contrôle qualité et prévention des risques sur site.",
      en: "HACCP hygiene: routine, zone sequencing, dilution, traceability, quality control, and risk prevention.",
    },
    image: "/blog-hygiene-haccp.jpg",
    categories: ["Cleaning", "HACCP", "Safety"],
    date: "2026-02-12",
    readTime: "7 min",
    content: {
      fr: [
        {
          p: "HACCP n’est pas “juste du nettoyage”. C’est une méthode : prévenir, contrôler, tracer. Pour maintenir un niveau premium, vous devez standardiser les routines et prouver la conformité via la documentation.",
        },
        {
          h: "1) La séquence des zones (simple mais essentiel)",
          p: "Toujours aller du plus propre vers le plus sale. Exemple : zones de préparation → zones de circulation → zones déchets. Cela réduit les contaminations croisées.",
        },
        {
          h: "2) Les produits & la dilution (qualité constante)",
          p: "Le bon produit au bon dosage. Sous-dosage = inefficace. Surdosage = résidus + risques. Utilisez des fiches produit (dilution, temps de contact, compatibilité surfaces).",
        },
        {
          h: "3) Traçabilité & checklists",
          p: "Adoptez un registre simple : date/heure, zone, action, produit utilisé, signature. Ajoutez un “contrôle qualité” aléatoire (spot check) pour maintenir un standard premium.",
        },
        {
          h: "4) Points critiques à surveiller",
          p: "Poignées, interrupteurs, plans de travail, sanitaires, zones humides, drains, poubelles. Ce sont des zones à risque élevé : fréquence renforcée.",
        },
        {
          h: "Conseil MultiiMaint",
          p: "La régularité fait la différence : mieux vaut une routine stable et contrôlée qu’un “grand nettoyage” irrégulier.",
        },
      ],
      en: [
        {
          p: "HACCP is not “just cleaning”. It’s a method: prevent, control, and prove. To maintain a premium standard, you must standardize routines and demonstrate compliance through documentation.",
        },
        {
          h: "1) Zone sequencing (simple but critical)",
          p: "Always work from the cleanest to the dirtiest areas. Example: prep areas → circulation → waste areas. This reduces cross-contamination.",
        },
        {
          h: "2) Products & dilution (consistent results)",
          p: "Right product, right dosage. Under-dosing = ineffective. Over-dosing = residues + risk. Use product sheets (dilution, contact time, surface compatibility).",
        },
        {
          h: "3) Traceability & checklists",
          p: "Use a simple log: date/time, area, action, product used, signature. Add random quality checks (spot checks) to keep standards premium.",
        },
        {
          h: "4) Critical points to watch",
          p: "Handles, switches, worktops, restrooms, wet areas, drains, bins. These are high-risk points—raise the frequency.",
        },
        {
          h: "MultiiMaint tip",
          p: "Consistency is the difference: a stable, controlled routine beats an occasional “deep clean”.",
        },
      ],
    },
  },

  {
    slug: "optimiser-couts-maintenance",
    title: {
      fr: "Optimiser vos coûts de maintenance (sans baisser la qualité)",
      en: "Optimize maintenance costs (without lowering quality)",
    },
    excerpt: {
      fr: "Passez du réactif au préventif : KPI, planification, priorités et reporting — une approche corporate.",
      en: "Move from reactive to preventive: KPIs, scheduling, priorities and reporting — a corporate approach.",
    },
    seoTitle: {
      fr: "Optimiser les coûts de maintenance : KPI + planification | MultiiMaint",
      en: "Optimize maintenance costs: KPIs + scheduling | MultiiMaint",
    },
    seoDesc: {
      fr: "Réduisez vos coûts de maintenance : plan préventif, priorités, KPI, reporting et stratégie fournisseurs pour limiter les urgences.",
      en: "Reduce maintenance costs with preventive plans, priorities, KPIs, reporting, and supplier strategy to limit emergencies.",
    },
    image: "/blog-cost-optimization.jpg",
    categories: ["Costs", "Maintenance"],
    date: "2026-02-14",
    readTime: "7 min",
    content: {
      fr: [
        {
          p: "Les coûts explosent quand la maintenance est uniquement réactive. La stratégie premium consiste à réduire l’urgence, standardiser, et piloter avec des indicateurs simples.",
        },
        {
          h: "1) Identifiez vos “top 5” causes de pannes",
          p: "Sur 1 à 3 mois, listez les incidents récurrents (clim, fuites, éclairage, portes, sanitaires). Ces 5 causes représentent souvent la majorité des urgences.",
        },
        {
          h: "2) Planification = économies",
          p: "Les interventions planifiées coûtent moins cher que les urgences. Fixez un créneau mensuel/hebdo selon votre activité et vos zones à risque.",
        },
        {
          h: "3) KPI simples (mais puissants)",
          p: "• Incidents/mois\n• Délai moyen de résolution\n• % interventions urgentes vs planifiées\n• Coût urgences vs coût préventif",
        },
        {
          h: "4) Standardisez les pièces & consommables",
          p: "Uniformisez quand c’est possible (ampoules, filtres, joints). Moins de références = moins de délai = moins de coût.",
        },
        {
          h: "5) Reporting : le levier corporate",
          p: "Un reporting clair améliore les décisions : vous savez où investir, où réduire, et comment prioriser. C’est la base d’une gestion premium multi-sites.",
        },
      ],
      en: [
        {
          p: "Costs spike when maintenance is purely reactive. The premium strategy is to reduce emergencies, standardize operations, and manage with a few strong indicators.",
        },
        {
          h: "1) Identify your “top 5” failure causes",
          p: "Over 1–3 months, list recurring incidents (AC, leaks, lighting, doors, restrooms). These 5 causes often represent most emergencies.",
        },
        {
          h: "2) Scheduling = savings",
          p: "Planned interventions cost less than emergencies. Set a weekly/monthly slot depending on activity and risk areas.",
        },
        {
          h: "3) Simple KPIs (powerful)",
          p: "• Incidents/month\n• Average resolution time\n• % urgent vs planned jobs\n• Emergency cost vs preventive cost",
        },
        {
          h: "4) Standardize parts & consumables",
          p: "Standardize where possible (bulbs, filters, seals). Fewer references = less delay = lower cost.",
        },
        {
          h: "5) Reporting: corporate leverage",
          p: "Clear reporting improves decisions: where to invest, where to reduce, and how to prioritize. It’s the base for premium multi-site management.",
        },
      ],
    },
  },

  {
    slug: "tendances-facility-management",
    title: {
      fr: "Tendances du Facility Management (approche moderne)",
      en: "Facility management trends (modern approach)",
    },
    excerpt: {
      fr: "Transparence, KPI, supervision multi-sites et expérience occupant — les piliers du FM premium.",
      en: "Transparency, KPIs, multi-site supervision and occupant experience — key pillars of premium FM.",
    },
    seoTitle: {
      fr: "Tendances Facility Management : KPI + supervision | MultiiMaint",
      en: "Facility management trends: KPIs + supervision | MultiiMaint",
    },
    seoDesc: {
      fr: "FM moderne : supervision multi-sites, KPI, reporting, réactivité et qualité — pour une expérience occupant premium.",
      en: "Modern FM: multi-site supervision, KPIs, reporting, responsiveness and quality — for a premium occupant experience.",
    },
    image: "/blog-facility-trends.jpg",
    categories: ["Facility"],
    date: "2026-02-16",
    readTime: "6 min",
    content: {
      fr: [
        {
          p: "Le facility management évolue : aujourd’hui, les clients attendent une gestion structurée, des KPI, et un point de contact unique (SPOC). Le FM premium, c’est de la performance + de la transparence.",
        },
        {
          h: "1) Un SPOC (Single Point of Contact)",
          p: "Un interlocuteur unique simplifie les demandes, améliore la vitesse de décision et réduit les frictions sur site.",
        },
        {
          h: "2) KPI & reporting",
          p: "Les KPI essentiels : délais d’intervention, incidents, conformité hygiène/sécurité, satisfaction occupant. Le reporting rend la qualité visible.",
        },
        {
          h: "3) Supervision multi-sites",
          p: "La standardisation des routines (checklists, audits, procédures) assure le même niveau premium sur plusieurs sites.",
        },
        {
          h: "4) Priorisation & prévention",
          p: "Le FM moderne réduit les urgences par la prévention et la priorisation. Résultat : coût stable + expérience client supérieure.",
        },
      ],
      en: [
        {
          p: "Facility management is evolving: clients now expect structured management, KPIs, and a single point of contact (SPOC). Premium FM = performance + transparency.",
        },
        {
          h: "1) A SPOC (Single Point of Contact)",
          p: "One contact simplifies requests, improves decision speed and reduces friction on site.",
        },
        {
          h: "2) KPIs & reporting",
          p: "Key KPIs: response times, incidents, hygiene/safety compliance, occupant satisfaction. Reporting makes quality visible.",
        },
        {
          h: "3) Multi-site supervision",
          p: "Standard routines (checklists, audits, procedures) maintain the same premium level across multiple sites.",
        },
        {
          h: "4) Prioritization & prevention",
          p: "Modern FM reduces emergencies through prevention and prioritization. Result: stable costs + better customer experience.",
        },
      ],
    },
  },

  {
    slug: "astuces-nettoyage-pro",
    title: {
      fr: "Astuces de nettoyage professionnel (standard premium)",
      en: "Professional cleaning tips (premium standard)",
    },
    excerpt: {
      fr: "Microfibres, dilution, séquence des zones et contrôle qualité : les bases d’un rendu impeccable.",
      en: "Microfibers, dilution, zone sequencing and quality checks: the foundation of a flawless finish.",
    },
    seoTitle: {
      fr: "Astuces nettoyage professionnel : routine + qualité | MultiiMaint",
      en: "Professional cleaning tips: routine + quality | MultiiMaint",
    },
    seoDesc: {
      fr: "Nettoyage pro : microfibres, dilution, séquence zones, points de contact et contrôle qualité pour un rendu premium.",
      en: "Pro cleaning: microfibers, dilution, zone sequencing, high-touch points and quality checks for premium results.",
    },
    image: "/blog-cleaning-tips.jpg",
    categories: ["Cleaning"],
    date: "2026-02-18",
    readTime: "5 min",
    content: {
      fr: [
        {
          p: "Le nettoyage premium, ce n’est pas “plus d’effort”, c’est une meilleure méthode : bon matériel, bon dosage, bonne séquence, contrôle qualité.",
        },
        {
          h: "1) Microfibres : la base",
          p: "Utilisez des microfibres propres, dédiées par zone (sanitaires / bureaux / vitres). Cela réduit les traces et les contaminations croisées.",
        },
        {
          h: "2) Dilution correcte",
          p: "Le dosage influence le résultat : trop peu = inefficace, trop = résidus. Gardez une fiche simple par produit (dilution + temps de contact).",
        },
        {
          h: "3) Séquence de travail",
          p: "Toujours : haut → bas, propre → sale, sec → humide. Et terminez par les points de contact (poignées, interrupteurs, comptoirs).",
        },
        {
          h: "4) Contrôle qualité (5 minutes)",
          p: "Une vérification rapide : odeurs, traces, sols, sanitaires, poubelles. Ce mini-audit garantit un rendu premium constant.",
        },
      ],
      en: [
        {
          p: "Premium cleaning is not “more effort”. It’s a better method: correct tools, correct dilution, correct sequence, quality control.",
        },
        {
          h: "1) Microfibers: the foundation",
          p: "Use clean microfiber cloths dedicated per zone (restrooms / offices / glass). It reduces streaks and cross-contamination.",
        },
        {
          h: "2) Correct dilution",
          p: "Dosage impacts results: too little = ineffective, too much = residues. Keep a simple product sheet (dilution + contact time).",
        },
        {
          h: "3) Working sequence",
          p: "Always: top → bottom, clean → dirty, dry → wet. Finish with high-touch points (handles, switches, counters).",
        },
        {
          h: "4) Quality check (5 minutes)",
          p: "A quick check: smell, streaks, floors, restrooms, bins. This mini-audit keeps results consistently premium.",
        },
      ],
    },
  },

  {
    slug: "securite-conformite",
    title: {
      fr: "Sécurité & conformité : standards premium sur site",
      en: "Safety & compliance: premium site standards",
    },
    excerpt: {
      fr: "Réduisez les risques : signalisation, routines, documentation et suivi — une approche simple et efficace.",
      en: "Reduce risk with signage, routines, documentation and tracking — simple and effective.",
    },
    seoTitle: {
      fr: "Sécurité & conformité sur site : routines + suivi | MultiiMaint",
      en: "Site safety & compliance: routines + tracking | MultiiMaint",
    },
    seoDesc: {
      fr: "Sécurité sur site : signalisation, checklists, documentation, prévention et reporting pour réduire incidents et risques.",
      en: "Site safety: signage, checklists, documentation, prevention and reporting to reduce incidents and risk.",
    },
    image: "/blog-safety-compliance.jpg",
    categories: ["Safety", "Facility"],
    date: "2026-02-20",
    readTime: "6 min",
    content: {
      fr: [
        {
          p: "Un site propre et organisé est plus sûr. La sécurité premium repose sur des routines simples, une signalisation claire et une documentation minimale mais constante.",
        },
        {
          h: "1) Signaliser immédiatement",
          p: "Sol humide, zone technique, obstacles : la signalisation réduit les accidents. C’est un réflexe à standardiser.",
        },
        {
          h: "2) Checklists sécurité",
          p: "Sorties dégagées, extincteurs accessibles, zones à risque contrôlées, éclairage correct. Une checklist hebdomadaire suffit souvent à limiter les incidents.",
        },
        {
          h: "3) Documentation & suivi",
          p: "Tracez les actions : date, correction, photo si nécessaire. Un suivi clair réduit les répétitions et améliore la conformité.",
        },
        {
          h: "4) Prévention = coût maîtrisé",
          p: "Un incident coûte plus cher qu’une routine. Prévenir, c’est protéger vos équipes, vos clients et votre image.",
        },
      ],
      en: [
        {
          p: "A clean and organized site is safer. Premium safety relies on simple routines, clear signage and minimal—but consistent—documentation.",
        },
        {
          h: "1) Signal immediately",
          p: "Wet floors, technical zones, obstacles: signage reduces accidents. It must become a standard reflex.",
        },
        {
          h: "2) Safety checklists",
          p: "Clear exits, accessible extinguishers, risk zones controlled, correct lighting. A weekly checklist often prevents most incidents.",
        },
        {
          h: "3) Documentation & tracking",
          p: "Track actions: date, correction, photo if needed. Clear follow-up reduces repeat issues and improves compliance.",
        },
        {
          h: "4) Prevention = controlled cost",
          p: "An incident costs more than a routine. Prevention protects your teams, customers and brand image.",
        },
      ],
    },
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
