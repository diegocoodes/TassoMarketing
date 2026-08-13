"use client";

import { Quote } from "lucide-react";
import { BorderBeam } from "@/components/animation/BorderBeam";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { SpotlightCard } from "@/components/animation/SpotlightCard";
import { Container } from "@/components/layout/Container";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { testimonials } from "@/data/testimonials";

function TestimonialCard({ company, feedback }: (typeof testimonials)[number]) {
  return (
    <SpotlightCard
      role="article"
      data-cursor
      data-cursor-label="LER"
      className="flex h-[20rem] w-[min(24rem,86vw)] shrink-0 flex-col rounded-[1.75rem] border border-white/[0.08] bg-[#0b0c0e]/95 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:h-[21rem] md:w-[27rem] md:p-8"
    >
      <BorderBeam duration={8} />
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
          Cliente Universo
        </span>
        <span className="flex size-11 items-center justify-center rounded-full border border-[rgba(245,169,0,0.24)] bg-[rgba(245,169,0,0.08)]">
          <Quote className="size-5 text-[var(--color-gold-light)]" aria-hidden="true" />
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

function StaticTestimonialCard({ company, feedback }: (typeof testimonials)[number]) {
  return (
    <article className="spotlight-card flex h-[20rem] w-[min(24rem,86vw)] shrink-0 flex-col rounded-[1.75rem] border border-white/[0.08] bg-[#0b0c0e]/95 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.24)] md:h-[21rem] md:w-[27rem] md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
          Cliente Universo
        </span>
        <span className="flex size-11 items-center justify-center rounded-full border border-[rgba(245,169,0,0.24)] bg-[rgba(245,169,0,0.08)]">
          <Quote className="size-5 text-[var(--color-gold-light)]" aria-hidden="true" />
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
  return (
    <section
      aria-labelledby="feedbacks-title"
      className="relative overflow-hidden bg-[#050505] py-24 md:py-36"
    >
      <SpaceParticles className="opacity-55" />
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
            Mais experiências de empresas que contam com estratégia, mídia e acompanhamento próximo para evoluir.
          </p>
        </div>
      </Container>

      <div className="relative z-10 mt-12 w-full overflow-hidden py-4 md:mt-16">
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
