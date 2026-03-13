"use client";

import { PolicyTemplate } from "../_PolicyTemplate";

export default function PrivacyClient() {
  return (
    <PolicyTemplate
      type="privacy"
      bodyEn={[
        "We collect information you provide (such as your name, phone number, service request and messages) when you contact us.",
        "We use this information to respond to requests, provide quotes, schedule interventions and improve customer experience.",
        "We do not sell your personal data. We only share information with service partners when necessary to deliver the requested service.",
        "We take reasonable measures to protect your information. However, no system is 100% secure.",
        "If you have questions about privacy, contact us via the Contact page.",
      ]}
      bodyFr={[
        "Nous collectons les informations que vous fournissez (nom, téléphone, demande de service et messages) lorsque vous nous contactez.",
        "Nous utilisons ces informations pour répondre, établir des devis, planifier les interventions et améliorer l’expérience client.",
        "Nous ne vendons pas vos données. Nous partageons uniquement les informations nécessaires avec des partenaires lorsque c’est requis pour la prestation.",
        "Nous appliquons des mesures raisonnables de protection. Aucun système n’est sécurisé à 100%.",
        "Pour toute question, contactez-nous via la page Contact.",
      ]}
    />
  );
}
