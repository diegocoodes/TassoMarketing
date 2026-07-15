"use client";

import Image from "next/image";
import { ArrowRight, BarChart3, Crosshair, Rocket, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  { icon: Search, title: "Diagnóstico", description: "Entendemos seu negócio, público, oferta e cenário atual." },
  { icon: Crosshair, title: "Planejamento", description: "Definimos canais, campanhas e prioridades para a operação." },
  { icon: Rocket, title: "Implementação", description: "Colocamos a estratégia em prática com estrutura e precisão." },
  { icon: BarChart3, title: "Otimização", description: "Analisamos dados, realizamos testes e melhoramos continuamente." },
] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-process-reveal]", { opacity: 0, y: 26 }, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 76%" },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="como-funciona" ref={sectionRef} className="bg-[#ECEBEF] py-18 text-black md:py-24">
      <Container>
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-9 lg:p-12">
            <div className="text-center md:text-left" data-process-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">Como funciona</p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-tight text-black">Uma estratégia pronta para transformar atenção em vendas</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-600 md:text-base">Do diagnóstico à otimização, cada etapa é construída para dar direção ao investimento e gerar oportunidades melhores.</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={step.title} data-process-reveal className="rounded-xl bg-[#f4f3f2] p-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-black text-[var(--color-gold-light)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[0.65rem] font-bold tracking-[0.16em] text-[var(--color-gold-deep)]">0{index + 1}</p>
                        <h3 className="mt-1 font-display text-sm font-semibold text-black">{step.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-zinc-600">{step.description}</p>
                  </article>
                );
              })}
            </div>

            <div data-process-reveal className="mt-7">
              <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowRight className="h-4 w-4" />} className="w-full" magnetic>Quero aumentar minhas vendas</Button>
            </div>
          </div>

          <div data-process-reveal className="relative min-h-[32rem] overflow-hidden bg-black lg:min-h-full">
            <Image src={siteConfig.assets.tassoNotebook} alt="T. Thales durante o planejamento de uma estratégia digital." fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-7 pb-7 pt-24 text-white">
              <p className="font-display text-2xl font-semibold">T. Thales</p>
              <p className="mt-2 text-sm text-zinc-300">Estratégia, acompanhamento e evolução contínua.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
