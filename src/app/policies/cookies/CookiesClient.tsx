"use client";

import { PolicyTemplate } from "../_PolicyTemplate";

export default function CookiesClient() {
  return (
    <PolicyTemplate
      type="cookies"
      bodyEn={[
        "Cookies help improve website experience and measure basic traffic.",
        "You can disable cookies in your browser settings. Some features may not work properly.",
        "We may use analytics tools to understand visits and improve content.",
      ]}
      bodyFr={[
        "Les cookies aident à améliorer l’expérience du site et à mesurer le trafic basique.",
        "Vous pouvez désactiver les cookies dans votre navigateur. Certaines fonctionnalités peuvent être limitées.",
        "Nous pouvons utiliser des outils d’analyse pour améliorer le contenu et l’expérience.",
      ]}
    />
  );
}