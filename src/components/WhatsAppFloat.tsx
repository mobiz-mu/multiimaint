"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const WA = useMemo(
    () =>
      "https://wa.me/23057160579?text=" +
      encodeURIComponent("Bonjour MultiiMaint, je souhaite un devis."),
    []
  );

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-center">
      {/* Label */}
      <div
        className={[
          "mb-2 select-none rounded-full px-3 py-1",
          "bg-[#0B1B4A]/85 text-white backdrop-blur",
          "text-[11px] font-extrabold tracking-wide",
          "shadow-[0_14px_34px_rgba(2,6,23,.25)] ring-1 ring-white/15",
          "animate-[mm_fadeIn_.35s_ease-out]",
        ].join(" ")}
      >
        Chat with us
      </div>

      {/* Floating Button (NO background circle) */}
      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Message MultiiMaint on WhatsApp"
        className={[
          // no bg, no circle
          "group relative grid place-items-center",
          "h-[74px] w-[74px]",
          "transition-transform duration-300 hover:-translate-y-[2px]",
          "focus:outline-none focus:ring-2 focus:ring-[#F47B20]/60 rounded-2xl",
          // bounce animation (whole icon container)
          "animate-[mm_waBounce_1.6s_cubic-bezier(.2,.8,.2,1)_infinite]",
        ].join(" ")}
      >
        {/* WhatsApp icon - bigger */}
        <Image
          src="/socialmedia/whatsapp.png"
          alt="WhatsApp"
          width={52}
          height={52}
          className="h-[52px] w-[52px] drop-shadow-[0_18px_40px_rgba(0,0,0,.35)] transition-transform duration-300 group-hover:scale-[1.06]"
          priority={false}
        />

        {/* subtle premium glow only (no circle bg) */}
        <span className="pointer-events-none absolute -inset-6 rounded-full bg-[#17B890]/14 blur-2xl opacity-70" />

        {/* Inline keyframes (premium + self-contained) */}
        <style jsx>{`
          @keyframes mm_fadeIn_ {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes mm_waBounce_ {
            0%,
            100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-6px);
            }
          }
        `}</style>
      </a>
    </div>
  );
}