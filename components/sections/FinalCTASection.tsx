"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FinalCTASection() {
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
        "[data-final-reveal]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <div className="surface-panel relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,169,0,0.15),transparent_35%)]" />
          <div className="absolute -top-16 right-0 h-48 w-48 rounded-full border border-white/8" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <div data-final-reveal>
                <SectionTitle
                  eyebrow="Chamada final"
                  title="Sua empresa não precisa apenas de mais visualizações. Ela precisa de mais oportunidades."
                  description="Solicite uma análise e descubra como tráfego pago, automação e tecnologia podem ajudar seu negócio a crescer na internet."
                />
              </div>
              <div data-final-reveal className="mt-8">
                <Button
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Solicitar análise pelo WhatsApp
                </Button>
              </div>
            </div>
            <div
              data-final-reveal
              className="mx-auto flex h-40 w-40 items-center justify-center rounded-[2rem] border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] md:h-48 md:w-48"
            >
              <Image
                src={siteConfig.assets.brandIcon}
                alt="Placeholder do símbolo da Universo Marketing"
                width={160}
                height={160}
                className="h-24 w-24 object-contain md:h-28 md:w-28"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
