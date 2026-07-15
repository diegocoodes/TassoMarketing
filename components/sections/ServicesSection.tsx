"use client";

import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="solucoes" ref={sectionRef} className="bg-[#050505] py-18 md:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <SectionTitle
              eyebrow="Nossas soluções"
              title="Estrutura para transformar atenção em oportunidades"
              description="Conectamos mídia, atendimento e organização comercial para sua empresa atrair as pessoas certas e aproveitar melhor cada contato."
            />
            <div className="mt-8">
              <Button href="#contato" icon={<ArrowUpRight className="h-4 w-4" />} magnetic>Quero aumentar minhas vendas</Button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">Atendimento direto e estratégia personalizada.</p>
          </div>

          <div className="space-y-4">
            {services.slice(0, 3).map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} data-reveal className="group relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#121214,#080809)] px-6 pb-7 pt-0 shadow-[inset_-4px_0_0_var(--color-gold),inset_0_-4px_0_var(--color-gold)] md:px-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-b-xl bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white md:text-3xl">{service.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
