"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { clients } from "@/data/clients";
import { testimonials } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const companyNames = Array.from(new Set(testimonials.map((testimonial) => testimonial.company)));

export function TestimonialsMarqueeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeTestimonial = testimonials[activeIndex];
  const activeClient = useMemo(
    () => clients.find((client) => client.name === activeTestimonial.company),
    [activeTestimonial.company],
  );

  useEffect(() => {
    if (reducedMotion || hasInteracted) return;
    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 7500);
    return () => window.clearInterval(intervalId);
  }, [hasInteracted, reducedMotion]);

  const selectTestimonial = (index: number) => {
    setHasInteracted(true);
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  const selectCompany = (company: string) => {
    const index = testimonials.findIndex((testimonial) => testimonial.company === company);
    if (index >= 0) selectTestimonial(index);
  };

  return (
    <section aria-labelledby="feedbacks-title" className="overflow-hidden bg-[#050505] py-24 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-12 md:flex-row md:items-end md:pb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">Histórias de clientes</p>
            <h2 id="feedbacks-title" className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl">Quem trabalha com a Universo.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">Experiências de empresas que contam com estratégia, mídia e acompanhamento próximo para evoluir.</p>
        </div>

        <div className="grid min-h-[32rem] items-center gap-10 py-12 md:py-16 lg:grid-cols-[0.28fr_0.72fr] lg:gap-20">
          <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-10">
            {activeClient ? (
              <div className="relative size-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:size-24">
                <Image src={activeClient.logo} alt={activeClient.alt ?? `Logo da ${activeTestimonial.company}`} fill sizes="96px" className="object-contain p-2" />
              </div>
            ) : (
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-gold-light)]">{activeTestimonial.company}</span>
            )}

            <div className="flex gap-2">
              <button type="button" onClick={() => selectTestimonial(activeIndex - 1)} className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]" aria-label="Depoimento anterior">
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => selectTestimonial(activeIndex + 1)} className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]" aria-label="Próximo depoimento">
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[21rem] overflow-hidden border-l border-[rgba(245,169,0,0.34)] pl-6 sm:pl-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={activeIndex}
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-live={hasInteracted ? "polite" : "off"}
              >
                <Quote className="size-7 text-[var(--color-gold-light)]" aria-hidden="true" />
                <p className="mt-7 max-w-[25ch] text-[clamp(1.65rem,4vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.045em] text-white">“{activeTestimonial.feedback}”</p>
                <footer className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold-light)]">{activeTestimonial.company}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="overflow-x-auto border-y border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center" aria-label="Selecionar empresa">
            {companyNames.map((company) => (
              <button
                key={company}
                type="button"
                onClick={() => selectCompany(company)}
                className={cn(
                  "min-h-14 border-r border-white/10 px-5 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 first:border-l",
                  activeTestimonial.company === company ? "bg-[var(--color-gold)] text-black" : "text-zinc-500 hover:text-white",
                )}
                aria-pressed={activeTestimonial.company === company}
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
