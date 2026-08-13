// Delivered by Originkit · adapted for Universo Marketing
"use client";

import Image from "next/image";
import { clients } from "@/data/clients";

const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)";

const CELL =
  "relative flex h-full w-[calc((100vw-32px)/3)] shrink-0 items-center justify-center overflow-hidden border-r border-white/12 ipad:w-[calc((100vw-96px)/4)] desktop-sm:w-[calc((min(100vw,1440px)-96px)/5)]";

function Half({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <>
      {clients.map((client) => (
        <div key={client.name} className={CELL}>
          <div className="relative h-12 w-[72%] opacity-90 saturate-[1.08] transition duration-300 hover:opacity-100">
            <Image
              src={client.logo}
              alt={duplicate ? "" : client.alt ?? client.name}
              fill
              sizes="(max-width: 767px) 26vw, (max-width: 1279px) 21vw, 240px"
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </>
  );
}

export const LogoStrip = () => (
  <section
    aria-label="Marcas atendidas pela Universo Marketing"
    className="relative z-10 h-20 w-full shrink-0 overflow-hidden border-y border-white/12 bg-black ipad:h-[85px]"
  >
    <div
      className="h-full"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <div className="flex h-full w-max animate-trusted-marquee will-change-transform">
        <div className="flex h-full shrink-0">
          <Half />
        </div>
        <div className="flex h-full shrink-0" aria-hidden="true">
          <Half duplicate />
        </div>
      </div>
    </div>
  </section>
);
