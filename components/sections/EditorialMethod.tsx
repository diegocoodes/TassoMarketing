"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const journey = [
  {
    step: "Mapear",
    description:
      "Mergulhamos no negócio, no mercado e na jornada de compra para encontrar os pontos de maior impacto.",
  },
  {
    step: "Construir",
    description:
      "Transformamos o diagnóstico em estratégia, mensagens, campanhas e uma operação digital integrada.",
  },
  {
    step: "Expandir",
    description:
      "Acompanhamos os sinais, testamos hipóteses e refinamos o sistema para sustentar a próxima fase.",
  },
] as const;

export function EditorialMethod() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-method-step]");
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.3 },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 62%",
              end: "bottom 38%",
              toggleActions: "play reverse play reverse",
            },
          },
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className="agency-paper scroll-mt-24 py-24 text-[#101114] md:py-36"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5f00]">
              Método Universo
            </p>
            <h2 className="mt-5 max-w-[13ch] text-[clamp(2.7rem,5.2vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              Do diagnóstico à otimização.
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-zinc-600 md:text-base">
              O trabalho começa pelo contexto do negócio, vira plano de execução e continua com análise e ajustes frequentes.
            </p>
          </div>

          <ol className="mt-16 border-b border-black/15 lg:mt-0">
            {journey.map((item, index) => (
              <li
                key={item.step}
                data-method-step
                className="relative flex min-h-[22rem] items-end overflow-hidden border-t border-black/15 py-10 sm:min-h-[26rem] sm:py-14 lg:min-h-[34rem]"
              >
                <span className="pointer-events-none absolute -right-[0.05em] -top-[0.18em] font-mono text-[clamp(8rem,22vw,18rem)] font-semibold leading-none tracking-[-0.12em] text-black/[0.045]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative grid w-full gap-5 md:grid-cols-[0.36fr_0.64fr] md:items-end">
                  <div>
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-[#8a5f00]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                      {item.step}
                    </h3>
                  </div>
                  <p className="max-w-lg text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
