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

      {/* Floating Button */}
      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Message MultiiMaint on WhatsApp"
        className={[
          "group relative grid h-16 w-16 place-items-center rounded-full",
          "bg-white/85 backdrop-blur-xl ring-1 ring-white/55",
          "shadow-[0_22px_60px_rgba(2,6,23,.22)]",
          "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_30px_80px_rgba(2,6,23,.28)]",
          "focus:outline-none focus:ring-2 focus:ring-[#F47B20]/60",
          // ✅ bounce + buzz layered
          "animate-[mm_waBounce_1.9s_ease-in-out_infinite]",
        ].join(" ")}
      >
        {/* inner vibration wrapper */}
        <span className="grid h-full w-full place-items-center animate-[mm_waBuzz_2.4s_ease-in-out_infinite]">
          <Image
            src="/socialmedia/whatsapp.png"
            alt="WhatsApp"
            width={34}
            height={34}
            className="h-[34px] w-[34px] transition-transform duration-300 group-hover:scale-[1.06]"
            priority={false}
          />
        </span>

        {/* premium glow */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-[#17B890]/30" />
        <span className="pointer-events-none absolute -inset-6 rounded-full bg-[#17B890]/18 blur-2xl opacity-70" />
      </a>
    </div>
  );
}
