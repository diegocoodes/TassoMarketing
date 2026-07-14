"use client";

import { LineChart, MessageCircleMore, Radar, Waypoints } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { BenefitItem } from "@/components/ui/BenefitItem";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { benefits } from "@/data/benefits";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const panels = [
  { label: "Campanhas", icon: Radar, value: "Acompanhamento contínuo" },
  { label: "Leads", icon: Waypoints, value: "Organização por etapas" },
  { label: "Atendimento", icon: MessageCircleMore, value: "Mais velocidade" },
  { label: "Leitura", icon: LineChart, value: "Decisões com clareza" },
] as const;

export function BenefitsSection() {
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
        "[data-benefit-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
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
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-benefit-reveal>
            <SectionTitle
              eyebrow="Benefícios"
              title="O que muda quando sua empresa possui uma estratégia de verdade?"
              description="A estrutura certa melhora a geração de oportunidades e também a forma como o negócio responde, acompanha e decide."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <BenefitItem key={benefit} text={benefit} />
              ))}
            </ul>
          </div>

          <div
            data-benefit-reveal
            className="surface-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,169,0,0.12),transparent_30%)]" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {panels.map((panel, index) => {
                const Icon = panel.icon;

                return (
                  <div
                    key={panel.label}
                    className={`rounded-[1.5rem] border border-white/10 bg-[#111214] p-5 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {panel.label}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] text-[var(--color-gold-light)]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                    <p className="mt-6 text-2xl font-semibold text-white">
                      {panel.value}
                    </p>
                    <div className="mt-5 h-1.5 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-deep)]"
                        style={{ width: `${72 - index * 8}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
