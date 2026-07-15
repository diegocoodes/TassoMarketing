"use client";

import Image from "next/image";
import { Bot, ChartNoAxesCombined, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pillars = [
  { icon: Target, title: "Atrair", description: "Campanhas direcionadas às pessoas certas." },
  { icon: Bot, title: "Converter", description: "Atendimento rápido e processos conectados." },
  { icon: ChartNoAxesCombined, title: "Evoluir", description: "Dados transformados em decisões melhores." },
] as const;

export function StrategySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 72%" } });
      timeline
        .fromTo("[data-strategy-line]", { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left" })
        .fromTo("[data-strategy-image]", { opacity: 0, x: -45, scale: 0.94, clipPath: "inset(0 35% 0 0)" }, { opacity: 1, x: 0, scale: 1, clipPath: "inset(0 0% 0 0)", duration: 1 }, "-=0.5")
        .fromTo("[data-strategy-copy]", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07 }, "-=0.5")
        .fromTo("[data-strategy-pillar]", { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.35");

      gsap.to("[data-strategy-orbit]", { rotate: 360, duration: 24, repeat: -1, ease: "none", transformOrigin: "center" });
      gsap.to("[data-strategy-glow]", { scale: 1.18, opacity: 0.7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to("[data-strategy-float]", { y: -10, duration: 1.8, stagger: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to("[data-strategy-image]", {
        y: -45,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="estrategia" ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_55%,rgba(245,169,0,0.17),transparent_34%),linear-gradient(180deg,#050505_0%,#050505_10%,#0c0905_55%,#050505_100%)]" />
      <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(5rem,15vw,14rem)] font-black tracking-[-0.08em] text-white/[0.018]">ESTRATÉGIA</p>
      <div data-strategy-line className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />
      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-strategy-image className="relative mx-auto min-h-[36rem] w-full max-w-md">
            <div data-strategy-glow className="absolute inset-12 rounded-full bg-[rgba(245,169,0,0.16)] blur-3xl" />
            <div data-strategy-orbit className="absolute inset-10 rounded-full border border-dashed border-[rgba(245,169,0,0.22)]">
              <span className="absolute -top-1 left-1/2 h-3 w-3 rounded-full bg-[var(--color-gold-light)] shadow-[0_0_18px_rgba(245,169,0,0.9)]" />
            </div>
            <Image src={siteConfig.assets.tassoNinja} alt="T. Thales em composição visual inspirada em estratégia e precisão." fill sizes="(max-width: 1024px) 90vw, 42vw" className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.7)]" />
            <span data-strategy-float className="absolute left-0 top-24 rounded-full bg-white px-4 py-2 text-xs font-bold text-black shadow-xl">Planejamento</span>
            <span data-strategy-float className="absolute bottom-28 right-0 rounded-full bg-[var(--color-gold)] px-4 py-2 text-xs font-bold text-black shadow-xl">Otimização contínua</span>
          </div>
          <div className="text-center lg:text-left">
            <p data-strategy-copy className="eyebrow">Estratégia digital</p>
            <h2 data-strategy-copy className="mt-6 font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.025em] text-white">Estratégia que conecta cada etapa do crescimento</h2>
            <p data-strategy-copy className="mt-6 text-base leading-8 text-[var(--color-text-muted)] md:text-lg">Não basta anunciar. Planejamento, tecnologia, atendimento e análise precisam trabalhar como uma única operação para transformar investimento em oportunidades comerciais.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return <article key={pillar.title} data-strategy-pillar className="rounded-2xl bg-white/[0.04] p-4"><Icon className="mx-auto h-5 w-5 text-[var(--color-gold-light)] lg:mx-0" aria-hidden="true" /><h3 className="mt-4 font-display text-sm font-semibold text-white">{pillar.title}</h3><p className="mt-2 text-xs leading-5 text-zinc-500">{pillar.description}</p></article>;
              })}
            </div>
            <div data-strategy-copy className="mt-8"><Button href="#como-funciona">Conhecer nossa estratégia</Button></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
