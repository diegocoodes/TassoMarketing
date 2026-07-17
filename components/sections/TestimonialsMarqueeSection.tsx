"use client";

import { Quote } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { BorderBeam } from "@/components/animation/BorderBeam";
import { SpotlightCard } from "@/components/animation/SpotlightCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { testimonials } from "@/data/testimonials";
import { clients } from "@/data/clients";

function TestimonialCard({ company, feedback }: (typeof testimonials)[number]) {
  const client = clients.find((item) => item.name === company);

  return (
    <SpotlightCard role="article" data-cursor data-cursor-label="LER" className="flex h-[19rem] w-[min(21rem,82vw)] shrink-0 flex-col rounded-2xl bg-[#121214] p-6 shadow-[inset_0_-3px_0_var(--color-gold)] md:w-[23rem]">
      <BorderBeam duration={7} />
      <div className="flex items-center justify-between gap-4">
        {client ? (
          <div className="relative h-14 w-14 overflow-hidden rounded-full bg-black p-1.5">
            <Image src={client.logo} alt={`Logotipo ${company}`} fill sizes="56px" className="object-contain p-1.5" />
          </div>
        ) : <div />}
        <Quote className="h-7 w-7 text-[var(--color-gold-light)]" aria-hidden="true" />
      </div>
      <p className="type-body-md mt-5 flex-1 text-zinc-300">“{feedback}”</p>
      <p className="font-display type-card-title mt-6 border-t border-white/8 pt-4 text-white">{company}</p>
    </SpotlightCard>
  );
}

function StaticTestimonialCard({ company, feedback }: (typeof testimonials)[number]) {
  const client = clients.find((item) => item.name === company);

  return (
    <article className="spotlight-card flex h-[19rem] w-[min(21rem,82vw)] shrink-0 flex-col rounded-2xl bg-[#121214] p-6 shadow-[inset_0_-3px_0_var(--color-gold)] md:w-[23rem]">
      <div className="flex items-center justify-between gap-4">
        {client ? (
          <div className="relative h-14 w-14 overflow-hidden rounded-full bg-black p-1.5">
            <Image src={client.logo} alt="" fill sizes="56px" className="object-contain p-1.5" />
          </div>
        ) : <div />}
        <Quote className="h-7 w-7 text-[var(--color-gold-light)]" aria-hidden="true" />
      </div>
      <p className="type-body-md mt-5 flex-1 text-zinc-300">&ldquo;{feedback}&rdquo;</p>
      <p className="font-display type-card-title mt-6 border-t border-white/8 pt-4 text-white">{company}</p>
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
    <section aria-labelledby="feedbacks-title" className="overflow-hidden bg-[#050505] py-18 md:py-24">
      <Container>
        <SectionTitle eyebrow="Feedbacks" title="O que nossos clientes dizem" description="Experiências de empresas que contaram com estratégia e acompanhamento da Universo Marketing." align="center" className="[&_h2]:scroll-mt-28" />
        <span id="feedbacks-title" className="sr-only">O que nossos clientes dizem</span>
      </Container>

      <div className="mt-12 w-full overflow-hidden py-3">
        <LogoLoop
          logos={testimonialCards}
          speed={52}
          direction="left"
          logoHeight={304}
          gap={16}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Feedbacks de clientes da Universo Marketing"
        />
      </div>
      <div className="mt-1 hidden w-full overflow-hidden py-3 md:block">
        <LogoLoop
          logos={[...testimonialCards].reverse()}
          speed={46}
          direction="right"
          logoHeight={304}
          gap={16}
          hoverSpeed={0}
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Mais feedbacks de clientes da Universo Marketing"
        />
      </div>
    </section>
  );
}
