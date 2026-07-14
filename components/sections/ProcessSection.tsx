"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Analisamos sua empresa, público, concorrentes, oferta e presença digital.",
  },
  {
    number: "02",
    title: "Planejamento",
    description:
      "Definimos canais, campanhas, orçamento e processo de atendimento.",
  },
  {
    number: "03",
    title: "Implementação",
    description:
      "Configuramos a estrutura necessária para começar a gerar oportunidades.",
  },
  {
    number: "04",
    title: "Otimização",
    description:
      "Acompanhamos os resultados, realizamos testes e aplicamos melhorias contínuas.",
  },
] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const desktopProgress = desktopProgressRef.current;
    const mobileProgress = mobileProgressRef.current;

    if (!section || !desktopProgress || !mobileProgress) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      gsap.set([desktopProgress, mobileProgress], { scaleX: 1, scaleY: 1 });
      return;
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-step]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );
    }, section);

    mm.add("(min-width: 768px)", () => {
      gsap.set(desktopProgress, { transformOrigin: "left center", scaleX: 0 });
      gsap.to(desktopProgress, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "bottom 55%",
          scrub: true,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(mobileProgress, { transformOrigin: "top center", scaleY: 0 });
      gsap.to(mobileProgress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="como-funciona" ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Como funciona"
          title="Uma estratégia construída para o seu negócio"
          description="O trabalho une análise, planejamento e acompanhamento para que a operação digital tenha direção clara desde o primeiro passo."
        />

        <div className="relative mt-10 hidden md:block">
          <div className="absolute top-8 left-0 h-px w-full bg-white/10" />
          <div
            ref={desktopProgressRef}
            className="absolute top-8 left-0 h-px w-full bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-deep)]"
          />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <article key={step.number} data-process-step className="pt-14">
                <div className="mb-5 h-4 w-4 rounded-full border border-[rgba(245,169,0,0.26)] bg-[var(--color-bg)]" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                  {step.number}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mt-10 md:hidden">
          <div className="absolute top-0 left-5 h-full w-px bg-white/10" />
          <div
            ref={mobileProgressRef}
            className="absolute top-0 left-5 h-full w-px bg-gradient-to-b from-[var(--color-gold-light)] to-[var(--color-gold-deep)]"
          />
          <div className="space-y-8">
            {steps.map((step) => (
              <article key={step.number} data-process-step className="relative pl-14">
                <div className="absolute top-1 left-[14px] h-3 w-3 rounded-full border border-[rgba(245,169,0,0.26)] bg-[var(--color-bg)]" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                  {step.number}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
