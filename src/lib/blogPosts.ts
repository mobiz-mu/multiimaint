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
  categories: Array<
    | "Maintenance"
    | "Cleaning"
    | "Facility"
    | "Costs"
    | "HACCP"
    | "Safety"
  >;

  date?: string; // "2026-02-01"
  readTime?: string; // "4 min"

  content: Record<BlogLang, Array<{ h?: string; p: string }>>;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "checklist-entretien-preventif-bureaux",
    title: {
      fr: "Checklist: entretien préventif (bureaux)",
      en: "Checklist: preventive maintenance (offices)",
    },
    excerpt: {
      fr: "Les points essentiels à vérifier chaque mois.",
      en: "The key items to check monthly.",
    },
    seoTitle: {
      fr: "Checklist entretien préventif bureaux | MultiiMaint",
      en: "Office preventive maintenance checklist | MultiiMaint",
    },
    seoDesc: {
      fr: "Routine mensuelle, points critiques et bonnes pratiques pour réduire pannes et coûts.",
      en: "Monthly routine, critical checks and best practices to reduce failures and costs.",
    },
    image: "/blog-maintenance-checklist.jpg",
    categories: ["Maintenance", "Facility"],
    readTime: "4 min",
    content: {
      fr: [
        { p: "Une routine mensuelle simple réduit les pannes et les coûts imprévus." },
        { h: "À vérifier chaque mois", p: "Climatisation, fuites, éclairage, serrures, prises, filtres, zones à risque." },
        { h: "Bon réflexe", p: "Registre: date, action, photo, signature. KPI = moins d'imprévus." },
      ],
      en: [
        { p: "A simple monthly routine reduces failures and unexpected costs." },
        { h: "Monthly checks", p: "AC, leaks, lighting, locks, sockets, filters, risk areas." },
        { h: "Best practice", p: "Log: date, action, photo, signature. KPIs reduce surprises." },
      ],
    },
  },

  {
    slug: "hygiene-haccp-bonnes-pratiques",
    title: { fr: "Hygiène & HACCP: bonnes pratiques", en: "Hygiene & HACCP: best practices" },
    excerpt: { fr: "Réduisez les risques avec une routine claire.", en: "Reduce risk with a clear routine." },
    seoTitle: { fr: "Hygiène & HACCP: bonnes pratiques | MultiiMaint", en: "Hygiene & HACCP best practices | MultiiMaint" },
    seoDesc: { fr: "Routine, traçabilité et produits adaptés pour une hygiène conforme et durable.", en: "Routine, traceability and correct products for compliant hygiene." },
    image: "/blog-hygiene-haccp.jpg",
    categories: ["Cleaning", "HACCP", "Safety"],
    readTime: "5 min",
    content: {
      fr: [{ p: "La régularité + le bon produit = conformité et qualité constante." }],
      en: [{ p: "Consistency + the right products = compliance and steady quality." }],
    },
  },

  {
    slug: "optimiser-couts-maintenance",
    title: { fr: "Optimiser vos coûts de maintenance", en: "Optimize maintenance costs" },
    excerpt: { fr: "KPI, sous-traitance, planification — nos conseils.", en: "KPIs, subcontracting, planning — tips." },
    seoTitle: { fr: "Optimiser les coûts de maintenance | MultiiMaint", en: "Optimize maintenance costs | MultiiMaint" },
    seoDesc: { fr: "Passez du réactif au préventif avec KPI, planification et reporting.", en: "Move from reactive to preventive using KPIs, scheduling and reporting." },
    image: "/blog-cost-optimization.jpg",
    categories: ["Costs", "Maintenance"],
    readTime: "6 min",
    content: {
      fr: [{ p: "Les coûts baissent quand vous passez de réactif → préventif." }],
      en: [{ p: "Costs drop when you move from reactive → preventive." }],
    },
  },

  {
    slug: "tendances-facility-management",
    title: { fr: "Tendances Facility Management", en: "Facility management trends" },
    excerpt: { fr: "Technologie, performance, supervision multisite.", en: "Technology, performance, multisite supervision." },
    seoTitle: { fr: "Tendances Facility Management | MultiiMaint", en: "Facility management trends | MultiiMaint" },
    seoDesc: { fr: "Transparence, KPI, performance: les tendances FM à Maurice.", en: "Transparency, KPIs, performance: FM trends in Mauritius." },
    image: "/blog-facility-trends.jpg",
    categories: ["Facility"],
    readTime: "4 min",
    content: {
      fr: [{ p: "FM moderne = transparence, performance et expérience client premium." }],
      en: [{ p: "Modern FM = transparency, performance and a premium customer experience." }],
    },
  },

  {
    slug: "astuces-nettoyage-pro",
    title: { fr: "Astuces nettoyage pro", en: "Professional cleaning tips" },
    excerpt: { fr: "Matériel, produits, routines efficaces.", en: "Tools, products, effective routines." },
    seoTitle: { fr: "Astuces nettoyage professionnel | MultiiMaint", en: "Professional cleaning tips | MultiiMaint" },
    seoDesc: { fr: "Microfibres, dilution, séquence des zones et contrôle qualité.", en: "Microfibers, dilution, zone sequencing and quality checks." },
    image: "/blog-cleaning-tips.jpg",
    categories: ["Cleaning"],
    readTime: "3 min",
    content: {
      fr: [{ p: "Le bon combo: microfibres, dilution correcte, séquence de zones, contrôle qualité." }],
      en: [{ p: "The right combo: microfibers, correct dilution, zone sequencing, quality checks." }],
    },
  },

  {
    slug: "securite-conformite",
    title: { fr: "Sécurité & conformité", en: "Safety & compliance" },
    excerpt: { fr: "Réduisez les risques et améliorez vos standards.", en: "Reduce risks and improve standards." },
    seoTitle: { fr: "Sécurité & conformité sur site | MultiiMaint", en: "Site safety & compliance | MultiiMaint" },
    seoDesc: { fr: "Réduisez les risques: signalisation, routines, documentation et suivi.", en: "Reduce risk: signage, routines, documentation and tracking." },
    image: "/blog-safety-compliance.jpg",
    categories: ["Safety", "Facility"],
    readTime: "5 min",
    content: {
      fr: [{ p: "Un site propre = un site sûr. Signalez, corrigez, documentez." }],
      en: [{ p: "A clean site is a safe site. Report, fix, document." }],
    },
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) || null;
}
