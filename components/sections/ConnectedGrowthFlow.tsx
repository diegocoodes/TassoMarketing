"use client";

import gsap from "gsap";
import { useRef } from "react";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { Container } from "@/components/layout/Container";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stages = [
  {
    label: "Atrair",
    position: "left-1/2 top-[5%] -translate-x-1/2",
  },
  {
    label: "Converter",
    position: "right-[-1%] top-1/2 -translate-y-1/2",
  },
  {
    label: "Relacionar",
    position: "bottom-[5%] left-1/2 -translate-x-1/2",
  },
  {
    label: "Crescer",
    position: "left-[1%] top-1/2 -translate-y-1/2",
  },
] as const;

export function ConnectedGrowthFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitItemsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !orbitItemsRef.current) return;

    const context = gsap.context(() => {
      const labels = gsap.utils.toArray<HTMLElement>(
        "[data-growth-label-text]",
      );
      const orbitDuration = 38;

      gsap.to(orbitItemsRef.current, {
        rotation: 360,
        duration: orbitDuration,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Os nomes percorrem a órbita, mas esta rotação inversa mantém a leitura
      // sempre na horizontal enquanto cada etapa muda de posição.
      gsap.to(labels, {
        rotation: -360,
        duration: orbitDuration,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-36 lg:py-44"
    >
      <SpaceParticles density="sparse" className="opacity-32" />
      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
              Operação integrada
            </p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.7rem,5.5vw,5.7rem)] font-semibold leading-[0.93] tracking-[-0.06em]">
              Marketing, atendimento e vendas no mesmo fluxo.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
              Campanhas, formulários, CRM e atendimento compartilham os mesmos
              dados. A equipe comercial acompanha cada contato desde a origem.
            </p>
          </div>

          <div
            className="relative mx-auto aspect-square w-[92%] max-w-[34rem] sm:w-full"
            aria-label="Fluxo conectado: atrair, converter, relacionar e crescer"
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full overflow-visible"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.35"
              />
              <circle
                cx="50"
                cy="50"
                r="27"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="rgba(245,169,0,0.42)"
                strokeWidth="0.45"
              />
            </svg>

            <div className="absolute inset-[31%] flex items-center justify-center rounded-full border border-white/10 bg-[#0b0c0e] text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm">
                Fluxo
                <span className="block text-[var(--color-gold-light)]">
                  contínuo
                </span>
              </span>
            </div>

            <div
              ref={orbitItemsRef}
              className="pointer-events-none absolute inset-0 will-change-transform motion-reduce:transform-none"
              aria-hidden="true"
            >
              <span className="absolute left-1/2 top-[13.5%] size-3 -translate-x-1/2 rounded-full bg-[var(--color-gold)] shadow-[0_0_16px_rgba(245,169,0,0.55)] sm:size-3.5" />

              {stages.map((stage) => (
                <span
                  key={stage.label}
                  className={`absolute ${stage.position}`}
                >
                  <span
                    data-growth-label-text
                    className="block whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-white will-change-transform motion-reduce:transform-none"
                  >
                    {stage.label}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
