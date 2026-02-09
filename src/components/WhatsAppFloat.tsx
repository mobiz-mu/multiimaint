"use client";

import React from "react";

const WA = "https://wa.me/23057160579?text=" + encodeURIComponent("Bonjour MultiiMaint, je souhaite un devis.");

export default function WhatsAppFloat() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Message MultiiMaint Operation Manager on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full shadow-lg
                 bg-[var(--mm-green)] text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/70"
    >
      {/* WhatsApp icon (inline SVG) */}
      <svg width="26" height="26" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.47c-.28-.14-1.64-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.17-.28-.02-.43.12-.57.12-.12.28-.33.43-.5.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.02 2.81 1.17 3 .14.19 2.01 3.07 4.87 4.31.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.55-.33z" />
        <path d="M26.67 5.33A14.57 14.57 0 0 0 16.02 1C8.16 1 1.78 7.38 1.78 15.24c0 2.5.65 4.94 1.9 7.1L1.67 31l8.9-1.97a14.2 14.2 0 0 0 5.45 1.11h.01c7.86 0 14.24-6.38 14.24-14.24 0-3.8-1.48-7.37-4.14-10.57zM16.03 27.6h-.01a11.9 11.9 0 0 1-5.05-1.12l-.36-.17-5.28 1.17 1.12-5.15-.18-.37a11.89 11.89 0 0 1-1.6-6.01C4.67 9.12 9.2 4.6 16.02 4.6c3.04 0 5.89 1.18 8.03 3.33a11.26 11.26 0 0 1 3.31 8.03c0 6.82-4.52 11.64-11.33 11.64z" />
      </svg>
    </a>
  );
}
