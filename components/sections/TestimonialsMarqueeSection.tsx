"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BorderBeam } from "@/components/animation/BorderBeam";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { SpotlightCard } from "@/components/animation/SpotlightCard";
import { Container } from "@/components/layout/Container";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { clients } from "@/data/clients";
import { testimonials } from "@/data/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const companyNames = Array.from(
  new Set(testimonials.map((testimonial) => testimonial.company)),
);

function TestimonialCard({
  company,
  feedback,
}: (typeof testimonials)[number]) {
  const client = clients.find((item) => item.name === company);

  return (
    <SpotlightCard
      role="article"
      className="flex h-[21rem] w-[27rem] shrink-0 flex-col rounded-[1.75rem] border border-white/[0.08] bg-[#0b0c0e]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
    >
      <BorderBeam duration={8} />
      <div className="flex items-center justify-between gap-4">
        {client ? (
          <span className="relative flex size-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-1.5">
            <Image
              src={client.logo}
              alt={client.alt ?? `Logo da ${company}`}
              fill
              sizes="56px"
              className="object-contain p-1.5"
            />
          </span>
        ) : (
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
            Cliente Universo
          </span>
        )}
        <span className="flex size-11 items-center justify-center rounded-full border border-[rgba(245,169,0,0.24)] bg-[rgba(245,169,0,0.08)]">
          <Quote
            className="size-5 text-[var(--color-gold-light)]"
            aria-hidden="true"
          />
        </span>
      </div>
      <p className="mt-7 flex-1 text-base leading-8 text-zinc-300">
        “{feedback}”
      </p>
      <p className="mt-6 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
        {company}
      </p>
    </SpotlightCard>
  );
}

function StaticTestimonialCard({
  company,
  feedback,
}: (typeof testimonials)[number]) {
  const client = clients.find((item) => item.name === company);

  return (
    <article className="spotlight-card flex h-[21rem] w-[27rem] shrink-0 flex-col rounded-[1.75rem] border border-white/[0.08] bg-[#0b0c0e]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      <div className="flex items-center justify-between gap-4">
        {client ? (
          <span className="relative flex size-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-1.5">
            <Image
              src={client.logo}
              alt=""
              fill
              sizes="56px"
              className="object-contain p-1.5"
            />
          </span>
        ) : (
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
            Cliente Universo
          </span>
        )}
        <span className="flex size-11 items-center justify-center rounded-full border border-[rgba(245,169,0,0.24)] bg-[rgba(245,169,0,0.08)]">
          <Quote
            className="size-5 text-[var(--color-gold-light)]"
            aria-hidden="true"
          />
        </span>
      </div>
      <p className="mt-7 flex-1 text-base leading-8 text-zinc-300">
        &ldquo;{feedback}&rdquo;
      </p>
      <p className="mt-6 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
        {company}
      </p>
    </article>
  );
}

const testimonialCards: LogoItem[] = testimonials.map((testimonial) => ({
  node: <TestimonialCard {...testimonial} />,
  duplicateNode: <StaticTestimonialCard {...testimonial} />,
  title: testimonial.company,
  ariaLabel: `Feedback da empresa ${testimonial.company}`,
}));

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
    const index = testimonials.findIndex(
      (testimonial) => testimonial.company === company,
    );
    if (index >= 0) selectTestimonial(index);
  };

  return (
    <section
      aria-labelledby="feedbacks-title"
      className="relative overflow-hidden bg-[#050505] py-24 md:py-36"
    >
      <SpaceParticles density="section" className="opacity-55" />
      <Container className="relative z-10">
        <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-12 md:flex-row md:items-end md:pb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
              Histórias de clientes
            </p>
            <h2
              id="feedbacks-title"
              className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.96] tracking-[-0.055em] md:text-6xl"
            >
              Quem trabalha com a Universo.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400 md:text-base">
            Experiências de empresas que contam com estratégia, mídia e
            acompanhamento próximo para evoluir.
          </p>
        </div>

        <div className="lg:hidden">
          <div className="grid min-h-[32rem] items-center gap-10 py-12 md:py-16">
            <div className="flex items-center justify-between">
              {activeClient ? (
                <div className="relative size-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:size-24">
                  <Image
                    src={activeClient.logo}
                    alt={
                      activeClient.alt ??
                      `Logo da ${activeTestimonial.company}`
                    }
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-gold-light)]">
                  {activeTestimonial.company}
                </span>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => selectTestimonial(activeIndex - 1)}
                  className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
                  aria-label="Depoimento anterior"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => selectTestimonial(activeIndex + 1)}
                  className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-[var(--color-gold)] hover:text-[var(--color-gold-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]"
                  aria-label="Próximo depoimento"
                >
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
                  transition={{
                    duration: reducedMotion ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-live={hasInteracted ? "polite" : "off"}
                >
                  <Quote
                    className="size-7 text-[var(--color-gold-light)]"
                    aria-hidden="true"
                  />
                  <p className="mt-7 max-w-[25ch] text-[clamp(1.65rem,7vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.045em] text-white">
                    “{activeTestimonial.feedback}”
                  </p>
                  <footer className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold-light)]">
                    {activeTestimonial.company}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="overflow-x-auto border-y border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="flex min-w-max items-center"
              aria-label="Selecionar empresa"
            >
              {companyNames.map((company) => (
                <button
                  key={company}
                  type="button"
                  onClick={() => selectCompany(company)}
                  className={cn(
                    "min-h-14 border-r border-white/10 px-5 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-300 first:border-l",
                    activeTestimonial.company === company
                      ? "bg-[var(--color-gold)] text-black"
                      : "text-zinc-500 hover:text-white",
                  )}
                  aria-pressed={activeTestimonial.company === company}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-10 mt-16 hidden w-full overflow-hidden py-4 lg:block">
        <LogoLoop
          logos={testimonialCards}
          speed={44}
          direction="right"
          logoHeight={336}
          gap={18}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Todos os comentários de clientes da Universo Marketing"
        />
      </div>
    </section>
  );
}
