"use client";

import { PolicyTemplate } from "../_PolicyTemplate";

export default function RefundClient() {
  return (
    <PolicyTemplate
      type="refund"
      bodyEn={[
        "Refund eligibility depends on the service type, work status and agreed terms in the quote/contract.",
        "If a service is cancelled before dispatch, we may offer a partial refund depending on costs already incurred.",
        "If an issue occurs, contact us first so we can inspect and propose a corrective solution.",
        "Refunds (if applicable) are processed through the original payment method when possible.",
      ]}
      bodyFr={[
        "L’éligibilité au remboursement dépend du type de service, de l’avancement des travaux et des conditions du devis/contrat.",
        "En cas d’annulation avant déplacement, un remboursement partiel peut s’appliquer selon les coûts engagés.",
        "En cas de problème, contactez-nous afin que nous puissions constater et proposer une solution corrective.",
        "Les remboursements (si applicables) sont effectués via le moyen de paiement initial lorsque possible.",
      ]}
    />
  );
}
