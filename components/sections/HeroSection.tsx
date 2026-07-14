"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (reducedMotion) {
      gsap.set(section.querySelectorAll("[data-hero-item]"), {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-badge]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55 },
      )
        .fromTo(
          "[data-hero-line]",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.25",
        )
        .fromTo(
          "[data-hero-copy]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero-actions]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.22",
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="section-grid relative pt-14 pb-18 md:pt-18 md:pb-24"
    >
      <Container>
        <div className="flex justify-center">
          <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
            <p data-hero-badge className="eyebrow">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Tráfego pago, automação e crescimento digital
            </p>
            <h1 className="mt-7">
              <AnimatedText
                fullText="Transforme anúncios em clientes para o seu negócio"
                lines={[
                  "Transforme",
                  "anúncios em clientes",
                  "para o seu negócio",
                ]}
              />
            </h1>
            <p
              data-hero-copy
              className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-xl"
            >
              Estratégias de tráfego pago, automação e atendimento inteligente
              para atrair oportunidades, melhorar seu processo comercial e
              aumentar suas vendas.
            </p>
            <div
              data-hero-actions
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Button
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Quero uma análise do meu negócio
              </Button>
              <Button href="#clientes" variant="secondary">
                Conhecer nosso trabalho
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
