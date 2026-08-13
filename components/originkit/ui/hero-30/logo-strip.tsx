// Delivered by Originkit · adapted for Universo Marketing
"use client";

import Image from "next/image";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { clients } from "@/data/clients";

const clientLogos: LogoItem[] = clients.map((client) => ({
  src: client.logo,
  alt: client.alt ?? client.name,
  title: client.name,
  width: client.width,
  height: client.height,
}));

export const LogoStrip = () => (
  <section
    aria-label="Marcas atendidas pela Universo Marketing"
    className="relative z-10 h-20 w-full shrink-0 overflow-hidden border-y border-white/12 bg-black ipad:h-[85px]"
  >
    <LogoLoop
      logos={clientLogos}
      speed={34}
      hoverSpeed={12}
      direction="left"
      gap={0}
      logoHeight={48}
      fadeOut
      fadeOutColor="#000000"
      ariaLabel="Marcas atendidas pela Universo Marketing"
      className="h-full [&_.logoloop__item]:mr-0 [&_.logoloop__list]:h-full [&_.logoloop__track]:h-full"
      renderItem={(item, key) => {
        if ("node" in item) return <div key={key}>{item.node}</div>;
        return (
          <div
            key={key}
            className="relative flex h-20 w-[calc((100vw-32px)/3)] shrink-0 items-center justify-center overflow-hidden border-r border-white/12 ipad:h-[85px] ipad:w-[calc((100vw-96px)/4)] desktop-sm:w-[calc((min(100vw,1440px)-96px)/5)]"
          >
            <div className="relative h-12 w-[72%] opacity-90 saturate-[1.08] transition-opacity duration-300 hover:opacity-100">
              <Image
                src={item.src}
                alt={item.alt ?? item.title ?? ""}
                fill
                sizes="(max-width: 767px) 26vw, (max-width: 1279px) 21vw, 240px"
                className="object-contain"
              />
            </div>
          </div>
        );
      }}
    />
  </section>
);
