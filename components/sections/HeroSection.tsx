"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const indicators = [
  "Estratégia personalizada",
  "Atendimento direto",
  "Decisões orientadas por dados",
];

const floatingCards = [
  "Campanha ativa",
  "Novos contatos",
  "Leads organizados",
  "Estratégia monitorada",
  "Atendimento automatizado",
] as const;

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
        )
        .fromTo(
          "[data-hero-indicator]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.18",
        )
        .fromTo(
          "[data-hero-visual]",
          { opacity: 0, scale: 0.97, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.48",
        )
        .fromTo(
          "[data-hero-card]",
          { opacity: 0, x: 18, y: 14 },
          { opacity: 1, x: 0, y: 0, duration: 0.45, stagger: 0.08 },
          "-=0.3",
        );

      gsap.to("[data-orbit='slow']", {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      gsap.to("[data-orbit='float']", {
        y: -10,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
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
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10 max-w-3xl">
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
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Quero uma análise do meu negócio
              </Button>
              <Button href="#solucoes" variant="secondary">
                Conhecer as soluções
              </Button>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {indicators.map((item) => (
                <div
                  key={item}
                  data-hero-indicator
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-text-soft)]"
                >
                  <CheckCircle2
                    className="h-4 w-4 text-[var(--color-gold-light)]"
                    aria-hidden="true"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div data-hero-visual className="relative isolate">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(245,169,0,0.18),transparent_58%)] blur-2xl" />
            <div className="surface-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
              <div
                data-orbit="slow"
                className="absolute inset-6 rounded-[2rem] border border-[rgba(245,169,0,0.16)]"
              />
              <div
                data-orbit="float"
                className="absolute inset-x-12 top-8 h-40 rounded-full border border-white/6"
              />
              <div className="relative z-10 flex items-start justify-between gap-5">
                <div>
                  <Image
                    src={siteConfig.assets.brandLogo}
                    alt="Logo da Universo Marketing"
                    width={340}
                    height={132}
                    priority
                    className="h-12 w-auto object-contain md:h-14"
                  />
                  <p className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                    {siteConfig.positionStatement}
                  </p>
                </div>
                <div className="flex h-18 w-18 items-center justify-center rounded-[1.75rem] border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)]">
                  <Image
                    src={siteConfig.assets.brandIcon}
                    alt="Ícone da Universo Marketing"
                    width={72}
                    height={72}
                    priority
                    className="h-12 w-12 object-contain"
                  />
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {floatingCards.map((card, index) => (
                  <div
                    key={card}
                    data-hero-card
                    className={`rounded-[1.5rem] border border-white/10 bg-[#111214] p-4 ${
                      index === 0 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                      Monitoramento
                    </p>
                    <p className="mt-3 text-lg font-medium text-white">{card}</p>
                    <div className="mt-4 h-1.5 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[var(--color-gold-light)] to-[var(--color-gold-deep)]"
                        style={{ width: `${58 + index * 7}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#resultados"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:border-[rgba(245,169,0,0.3)] hover:text-white"
                >
                  Estrutura comercial mais clara
                </Link>
                <Link
                  href="#clientes"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--color-text-soft)] transition hover:border-[rgba(245,169,0,0.3)] hover:text-white"
                >
                  Leads acompanhados com mais consistência
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
