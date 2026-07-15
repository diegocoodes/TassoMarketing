"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (reducedMotion) {
      gsap.set(section.querySelectorAll("[data-hero-copy], [data-hero-actions]"), { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo("[data-hero-copy]", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.52, delay: 0.58 })
        .fromTo("[data-hero-actions]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48 }, "-=0.24");
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="inicio" ref={sectionRef} className="hero-light relative isolate overflow-hidden bg-[#f4f3f2] text-black md:flex md:min-h-[48rem] md:items-center md:py-24 lg:min-h-[52rem]">
      <Image
        src={siteConfig.assets.heroBanner}
        alt="T. Thales trabalhando com notebook em um ambiente de estratégia digital."
        fill
        priority
        sizes="100vw"
        className="-z-20 hidden object-cover object-center md:block"
      />
      <Container className="relative z-10 hidden md:block">
        <div className="max-w-3xl text-left">
          <h1 className="font-display type-hero-title">
            <TextReveal className="block text-black" delay={0.08}>Transforme</TextReveal>
            <TextReveal className="block pb-2 text-[var(--color-gold-deep)]" delay={0.2}>anúncios em clientes</TextReveal>
            <TextReveal className="hidden text-black md:block" delay={0.34}>para o seu negócio</TextReveal>
          </h1>
          <p data-hero-copy className="type-body-lg mt-5 max-w-xl text-zinc-700 md:mt-6"><span className="md:hidden">Estratégia digital para atrair oportunidades e aumentar suas vendas.</span><span className="hidden md:inline">Estratégias de tráfego pago, automação e atendimento inteligente para atrair oportunidades, melhorar seu processo comercial e aumentar suas vendas.</span></p>
          <div data-hero-actions className="mt-8 hidden flex-col gap-3 sm:flex-row md:flex">
            <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowRight className="h-4 w-4" />} magnetic>Quero uma análise do meu negócio</Button>
            <Button href="#solucoes" variant="secondary" className="hero-secondary">Conhecer as soluções</Button>
          </div>
        </div>
      </Container>
      <div className="relative md:hidden">
        <Image src={siteConfig.assets.heroBannerMobile} alt="T. Thales trabalhando com notebook." width={941} height={1672} priority className="h-auto w-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-4 pb-5 pt-16">
          <p className="font-display type-section-subtitle mx-auto mb-3 max-w-xs text-center text-white">
            Mais clientes. <span className="text-[var(--color-gold-light)]">Mais crescimento.</span>
          </p>
          <div data-hero-actions className="flex flex-col gap-3">
            <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowRight className="h-4 w-4" />} className="w-full">Quero aumentar minhas vendas</Button>
            <Button href="#solucoes" variant="secondary" className="hero-secondary w-full">Conhecer as soluções</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
