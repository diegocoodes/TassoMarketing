"use client";

import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-about-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="sobre" ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div
            data-about-reveal
            className="surface-panel overflow-hidden rounded-[2rem] p-5 md:p-6"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,#111214_0%,#0c0c0d_100%)] px-6 py-12 md:px-8">
              <div className="absolute top-6 right-6 opacity-10">
                <Image
                  src={siteConfig.assets.brandIcon}
                  alt=""
                  width={180}
                  height={180}
                  className="h-28 w-28 object-contain"
                />
              </div>
              <div className="relative z-10 flex min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="eyebrow">Identidade profissional</span>
                <Image
                  src={siteConfig.assets.tassoBadge}
                  alt="Identidade visual de T. Thales | Gestor de Tráfego Pago"
                  width={800}
                  height={800}
                  priority
                  className="mt-8 h-auto w-full max-w-md object-contain"
                />
                <p className="mt-8 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">
                  A seção já está pronta para receber a foto profissional quando
                  ela estiver disponível, sem depender de imagens fictícias.
                </p>
              </div>
            </div>
          </div>
          <div data-about-reveal>
            <SectionTitle
              eyebrow="Sobre T. Thales"
              title="Estratégia, tecnologia e crescimento digital"
              description="T. Thales é especialista em tráfego pago e estratégias de marketing digital. À frente da Universo Marketing, desenvolve soluções para ajudar empresas a aumentar sua presença na internet, gerar oportunidades comerciais e construir processos mais eficientes de atendimento e vendas."
            />
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
              Seu trabalho conecta anúncios, inteligência artificial, CRM,
              automações, SEO e tecnologia em uma estratégia integrada de
              crescimento.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Especialista em tráfego pago
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--color-text-soft)]">
                CEO da Universo Marketing
              </span>
            </div>
            <div className="mt-8">
              <Button
                href={siteConfig.social.tassoInstagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Acompanhar no Instagram
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
