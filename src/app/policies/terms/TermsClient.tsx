"use client";

import { PolicyTemplate } from "../_PolicyTemplate";

export default function TermsClient() {
  return (
    <PolicyTemplate
      type="terms"
      bodyEn={[
        "Quotes are estimates based on provided information. Final pricing may vary after site verification.",
        "Service scheduling depends on availability, location and required resources.",
        "Clients must ensure safe access to the site and disclose relevant hazards.",
        "We aim to deliver services with professional standards, safety practices and quality control.",
        "Liability is limited to the extent permitted by applicable law.",
      ]}
      bodyFr={[
        "Les devis sont des estimations basées sur les informations reçues. Le prix final peut varier après vérification sur site.",
        "La planification dépend des disponibilités, de la localisation et des ressources nécessaires.",
        "Le client doit assurer un accès sécurisé et signaler tout risque/hazard pertinent.",
        "Nous assurons des prestations professionnelles, avec sécurité et contrôle qualité.",
        "La responsabilité est limitée dans la mesure permise par la loi applicable.",
      ]}
    />
  );
}