"use client";

import {
  Activity,
  Inbox,
  MessageCircleWarning,
  SearchSlash,
  TimerReset,
  TrendingDown,
} from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const problems = [
  {
    title: "Anúncios sem retorno",
    description: "Investimento sem direção clara e baixa qualidade de oportunidade.",
    icon: TrendingDown,
  },
  {
    title: "Poucas mensagens de clientes",
    description: "A presença digital existe, mas o volume de contato continua baixo.",
    icon: Inbox,
  },
  {
    title: "Atendimento demorado",
    description: "Leads esfriam enquanto a resposta da empresa demora para chegar.",
    icon: MessageCircleWarning,
  },
  {
    title: "Leads sem acompanhamento",
    description: "Contatos entram, mas não existe uma rotina consistente de seguimento.",
    icon: TimerReset,
  },
  {
    title: "Dificuldade para medir resultados",
    description: "Sem leitura organizada, fica difícil saber o que manter ou corrigir.",
    icon: Activity,
  },
  {
    title: "Dependência de indicações",
    description: "O crescimento fica vulnerável quando depende só do boca a boca.",
    icon: SearchSlash,
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
          eyebrow="Pontos de atrito"
          title="Seu negócio está na internet, mas ainda não gera oportunidades todos os dias?"
          description="Publicar nas redes sociais não é suficiente. Sem estratégia de distribuição, atendimento e acompanhamento, sua empresa perde oportunidades e continua dependendo apenas de indicações."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {problems.map((problem) => {
            const Icon = problem.icon;

            return (
              <div key={problem.title} data-problem-card>
                <motion.article
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="surface-panel h-full rounded-[1.75rem] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] text-[var(--color-gold-light)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {problem.description}
                  </p>
                </motion.article>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
