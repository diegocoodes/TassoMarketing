"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { Container } from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stages = ["Atrair", "Converter", "Relacionar", "Crescer"] as const;

export function ConnectedGrowthFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current || !pathRef.current || !dotRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!path || !dot) return;

      const labels = gsap.utils.toArray<HTMLElement>("[data-growth-label]");
      const progress = { value: 0 };
      const length = path.getTotalLength();
      gsap.set(labels, { opacity: 0.38 });

      const updateDot = () => {
        const point = path.getPointAtLength(progress.value * length);
        gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 35%",
          scrub: 0.55,
        },
      });

      timeline.to(progress, { value: 1, duration: 1, ease: "none", onUpdate: updateDot }, 0);
      labels.forEach((label, index) => {
        const position = index / stages.length;
        timeline
          .to(label, { opacity: 1, duration: 0.08, ease: "none" }, position)
          .to(label, { opacity: index === labels.length - 1 ? 1 : 0.38, duration: 0.08, ease: "none" }, position + 0.16);
      });
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-36 lg:py-44">
      <SpaceParticles density="sparse" className="opacity-32" />
      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">Operação integrada</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.7rem,5.5vw,5.7rem)] font-semibold leading-[0.93] tracking-[-0.06em]">
              Marketing, atendimento e vendas no mesmo fluxo.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
              Campanhas, formulários, CRM e atendimento compartilham os mesmos dados. A equipe comercial acompanha cada contato desde a origem.
            </p>
          </div>

          <div className="relative mx-auto aspect-square w-[92%] max-w-[34rem] sm:w-full" aria-label="Fluxo conectado: atrair, converter, relacionar e crescer">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
              <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.35" />
              <circle cx="50" cy="50" r="27" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
              <circle ref={pathRef} cx="50" cy="50" r="36" fill="none" stroke="rgba(245,169,0,0.42)" strokeWidth="0.45" />
              <circle ref={dotRef} cx="50" cy="14" r="1.35" fill="#f5a900" />
            </svg>

            <div className="absolute inset-[31%] flex items-center justify-center rounded-full border border-white/10 bg-[#0b0c0e] text-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm">Fluxo<span className="block text-[var(--color-gold-light)]">contínuo</span></span>
            </div>

            <span data-growth-label className="absolute left-1/2 top-[5%] -translate-x-1/2 text-xs font-bold uppercase tracking-[0.14em] text-white">Atrair</span>
            <span data-growth-label className="absolute right-[-1%] top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-[0.14em] text-white">Converter</span>
            <span data-growth-label className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-[0.14em] text-white">Relacionar</span>
            <span data-growth-label className="absolute left-[1%] top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-[0.14em] text-white">Crescer</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
