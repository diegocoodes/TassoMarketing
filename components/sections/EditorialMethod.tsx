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
      const activateStep = (activeIndex: number) => {
        gsap.to(steps, {
          opacity: (index) => index < activeIndex ? 0.15 : index === activeIndex ? 1 : 0.3,
          duration: 0.35,
          stagger: 0.025,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      gsap.set(steps, { opacity: (index) => index === 0 ? 1 : 0.3 });
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => activateStep(index),
          onEnterBack: () => activateStep(index),
        });
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

          <div className="mt-16 border-b border-black/15 lg:mt-0">
            {journey.map((item) => (
              <article
                key={item.step}
                data-method-step
                className="relative flex min-h-[20rem] items-center overflow-hidden border-t border-black/15 py-10 sm:min-h-[24rem] sm:py-14 lg:min-h-[30rem]"
              >
                <div className="relative grid w-full gap-7 md:grid-cols-[0.42fr_0.58fr] md:items-end">
                  <h3 className="text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                    {item.step}
                  </h3>
                  <p className="max-w-lg text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
