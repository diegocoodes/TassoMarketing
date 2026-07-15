"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-about-reveal]", { opacity: 0, y: 24 }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      });
      gsap.fromTo("[data-about-line]", { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.9,
        transformOrigin: "left center",
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 72%" },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="sobre" ref={sectionRef} className="relative overflow-hidden bg-[#050505] pb-20 pt-8 md:pb-28 md:pt-14">
      <Container>
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#ECEBEF] lg:grid-cols-2 lg:rounded-[2rem] lg:border-0">
          <div className="relative aspect-[4/3] overflow-hidden bg-black sm:aspect-[16/11] lg:aspect-auto lg:min-h-[42rem]">
            <Image
              src={siteConfig.assets.tassoBanner}
              alt="T. Thales, CEO da Universo Marketing, em ambiente profissional."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[72%_center]"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute bottom-6 left-6 hidden rounded-xl bg-black/75 px-4 py-3 text-sm text-white backdrop-blur-md lg:block">
              <span className="block font-semibold text-[var(--color-gold-light)]">Universo Marketing</span>
              Estratégia aplicada ao crescimento
            </div>
          </div>

          <div className="flex items-center p-6 text-black sm:p-9 lg:p-12">
            <div>
              <p data-about-reveal className="inline-flex items-center rounded-full border border-black/10 bg-black/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">Sobre mim</p>
              <p data-about-reveal className="type-section-subtitle mt-7 text-zinc-700">Prazer,</p>
              <h2 data-about-reveal className="font-display type-section-title mt-1 text-black">T. <span className="text-black">Thales</span></h2>
              <div data-about-line className="mt-5 h-1 w-36 rounded-full bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-light)]" />

              <p data-about-reveal className="type-body-md mt-6 inline-flex items-center gap-2 font-semibold text-zinc-900">
                <BadgeCheck className="h-5 w-5 text-[var(--color-gold-deep)]" aria-hidden="true" />
                CEO da Universo Marketing e especialista em tráfego pago
              </p>
              <p data-about-reveal className="type-body-md mt-5 text-zinc-700">
                T. Thales desenvolve estratégias de marketing digital para ajudar empresas a gerar oportunidades comerciais e construir processos mais eficientes de atendimento e vendas.
              </p>
              <p data-about-reveal className="type-body-md mt-4 text-zinc-700">
                Seu trabalho conecta anúncios, inteligência artificial, CRM, automações, SEO e tecnologia em uma estrutura integrada de crescimento.
              </p>

              <div data-about-reveal className="mt-8 flex justify-center lg:justify-start">
                <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">Quero aumentar minhas vendas</Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
