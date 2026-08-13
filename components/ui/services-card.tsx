"use client";

import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Code2,
  Megaphone,
  MonitorSmartphone,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const serviceIcons = {
  camera: Camera,
  code: Code2,
  megaphone: Megaphone,
  monitor: MonitorSmartphone,
  palette: Palette,
} satisfies Record<string, LucideIcon>;

export type ServiceIcon = keyof typeof serviceIcons;

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  gradient: string;
  featured?: boolean;
  items?: readonly string[];
}

type ServiceCarouselProps = {
  services: readonly Service[];
  options?: EmblaOptionsType;
};

type ServiceCardProps = {
  service: Service;
  index: number;
  reducedMotion: boolean;
};

function ServiceCard({ service, index, reducedMotion }: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <motion.article
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 44 },
        visible: (cardIndex: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : 0.55,
            delay: reducedMotion ? 0 : cardIndex * 0.08,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      }}
      className={cn(
        "group relative isolate flex h-full min-h-[34rem] w-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-7 sm:p-8",
        service.featured &&
          "border-[rgba(245,169,0,0.48)] shadow-[0_24px_80px_rgba(245,169,0,0.13)]",
        service.gradient,
      )}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-[rgba(245,169,0,0.15)] opacity-50 blur-3xl transition duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),transparent_42%)]"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        {service.featured ? (
          <span className="rounded-full border border-[rgba(245,169,0,0.38)] bg-[rgba(245,169,0,0.12)] px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.15em] text-[var(--color-gold-light)]">
            Em destaque
          </span>
        ) : (
          <span aria-hidden="true" />
        )}
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-full border border-white/10 bg-black/25 text-[var(--color-gold-light)] backdrop-blur-sm",
            service.featured &&
              "size-14 border-[rgba(245,169,0,0.4)] bg-[var(--color-gold)] text-black shadow-[0_0_30px_rgba(245,169,0,0.25)]",
          )}
        >
          <Icon className={cn("size-5", service.featured && "size-6")} aria-hidden="true" />
        </span>
      </div>

      <div className="relative mt-auto pt-20">
        <h3 className="max-w-[16ch] text-2xl font-semibold uppercase leading-[1.05] tracking-[-0.035em] text-white sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-zinc-400">
          {service.description}
        </p>

        {service.items && service.items.length > 0 ? (
          <ul
            className="mt-7 border-t border-white/10"
            aria-label={`Entregas de ${service.title}`}
          >
            {service.items.map((item) => (
              <li
                key={item}
                className="flex min-h-11 items-center gap-3 border-b border-white/10 py-2.5 text-xs leading-5 text-zinc-300"
              >
                <span
                  className="size-1 shrink-0 rounded-full bg-[var(--color-gold)]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}

export function ServiceCarousel({ services, options }: ServiceCarouselProps) {
  const reducedMotion = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(revealRef, { once: true, amount: 0.12 });
  const [viewportRef, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: services.length > 3,
    skipSnaps: false,
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(services.length);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateCarouselState = useCallback((carouselApi: EmblaCarouselType) => {
    setSelectedIndex(carouselApi.selectedScrollSnap());
    setSnapCount(carouselApi.scrollSnapList().length);
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) return;

    const animationFrameId = window.requestAnimationFrame(() => {
      updateCarouselState(api);
    });
    api.on("select", updateCarouselState);
    api.on("reInit", updateCarouselState);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      api.off("select", updateCarouselState);
      api.off("reInit", updateCarouselState);
    };
  }, [api, updateCarouselState]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      api?.scrollPrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      api?.scrollNext();
    }
  };

  return (
    <div
      ref={revealRef}
      className="relative"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Serviços da Universo Marketing"
      onKeyDown={handleKeyDown}
    >
      <div className="mb-7 flex items-center justify-between gap-5">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          <span className="size-1.5 rounded-full bg-[var(--color-gold)] shadow-[0_0_12px_rgba(245,169,0,0.7)]" aria-hidden="true" />
          Deslize para explorar
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.045] text-white transition hover:border-[rgba(245,169,0,0.48)] hover:bg-[rgba(245,169,0,0.1)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Serviço anterior"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.045] text-white transition hover:border-[rgba(245,169,0,0.48)] hover:bg-[rgba(245,169,0,0.1)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] disabled:pointer-events-none disabled:opacity-30"
            aria-label="Próximo serviço"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          className="-ml-4 flex touch-pan-y items-stretch"
          initial={reducedMotion ? false : "hidden"}
          animate={reducedMotion || isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[68%] md:basis-1/2 xl:basis-1/3"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${services.length}: ${service.title}`}
            >
              <ServiceCard
                service={service}
                index={index}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-7 flex justify-center gap-2" aria-label="Selecionar serviço">
        {Array.from({ length: snapCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              selectedIndex === index
                ? "w-8 bg-[var(--color-gold)]"
                : "w-1.5 bg-white/20 hover:bg-white/45",
            )}
            aria-label={`Ir para o serviço ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
