"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ClientLogo } from "@/components/ui/ClientLogo";
import { marqueeConfig, type Client } from "@/data/clients";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type InfiniteLogoMarqueeProps = {
  clients: Client[];
};

export function InfiniteLogoMarquee({ clients }: InfiniteLogoMarqueeProps) {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || clients.length === 0) {
      return;
    }

    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;

    if (!wrapper || !track || !firstSet) {
      return;
    }

    let tween: gsap.core.Tween | undefined;
    const resizeObserver = new ResizeObserver(() => {
      tween?.kill();
      const width = firstSet.offsetWidth;

      if (!width) {
        return;
      }

      tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: width / marqueeConfig.pixelsPerSecond,
          ease: "none",
          repeat: -1,
        },
      );
    });

    resizeObserver.observe(firstSet);

    return () => {
      resizeObserver.disconnect();
      tween?.kill();
    };
  }, [clients, reducedMotion]);

  if (clients.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {["Espaço para logo 01", "Espaço para logo 02", "Espaço para logo 03"].map(
          (item) => (
            <div
              key={item}
              className="flex min-h-24 items-center justify-center rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.03] px-6 text-center text-sm text-[var(--color-text-muted)]"
            >
              {item}
            </div>
          ),
        )}
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {clients.map((client) => (
          <div
            key={client.name}
            className="surface-panel flex items-center justify-center rounded-[1.5rem]"
          >
            <ClientLogo client={client} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="mask-marquee overflow-hidden">
      <div ref={trackRef} className="flex w-max">
        <div ref={firstSetRef} className="flex items-center">
          {clients.map((client) => (
            <ClientLogo key={`first-${client.name}`} client={client} />
          ))}
        </div>
        <div className="flex items-center" aria-hidden="true">
          {clients.map((client) => (
            <ClientLogo key={`second-${client.name}`} client={client} />
          ))}
        </div>
      </div>
      <ul className="sr-only">
        {clients.map((client) => (
          <li key={`sr-${client.name}`}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}
