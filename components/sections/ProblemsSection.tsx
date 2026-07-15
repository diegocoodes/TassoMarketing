"use client";

import { ArrowUpRight, MessageCircleWarning, TimerReset, TrendingDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SpotlightCard } from "@/components/animation/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getWhatsAppUrl } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const problems = [
  {
    title: "Anúncios sem retorno",
    description: "Sua empresa investe em divulgação, mas não consegue identificar com clareza quais campanhas realmente geram oportunidades.",
    icon: TrendingDown,
  },
  {
    title: "Atendimento demorado",
    description: "Potenciais clientes perdem o interesse enquanto aguardam uma resposta, reduzindo as chances de transformar contatos em vendas.",
    icon: MessageCircleWarning,
  },
  {
    title: "Leads sem acompanhamento",
    description: "Os contatos chegam, mas sem uma rotina organizada de acompanhamento muitas oportunidades acabam sendo esquecidas.",
    icon: TimerReset,
  },
] as const;

export function ProblemsSection() {
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
        "[data-problem-card]",
        { opacity: 0, y: 32 },
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
    <section ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <SectionTitle
          title="Reconhece algum destes desafios?"
          description="Estes são alguns dos obstáculos mais comuns que impedem empresas de transformar presença digital em novas oportunidades de negócio."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div key={problem.title} data-problem-card>
                <SpotlightCard
                  className="surface-panel h-full rounded-2xl border border-[rgba(245,169,0,0.34)] border-b-[4px] border-r-[4px] border-b-[var(--color-gold)] border-r-[var(--color-gold)] px-6 pb-7 pt-0"
                >
                  <div className="flex h-12 w-12 -translate-y-px items-center justify-center rounded-b-xl bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black shadow-[0_10px_30px_rgba(245,169,0,0.2)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display type-card-title mt-5 text-white">
                    {problem.title}
                  </h3>
                  <p className="type-body-md mt-3 text-[var(--color-text-muted)]">
                    {problem.description}
                  </p>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
        <div className="mt-9 flex justify-center">
          <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowUpRight className="h-4 w-4" />} magnetic>
            Quero melhorar meus resultados
          </Button>
        </div>
      </Container>
    </section>
  );
}
