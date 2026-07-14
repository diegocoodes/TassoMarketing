"use client";

import { BadgeCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const items = [
  "Tráfego pago",
  "Automação",
  "Inteligência artificial",
  "CRM",
  "SEO",
  "Agendamento",
  "Estratégia digital",
];

export function CredibilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section || reducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-credibility-item]",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={sectionRef} className="pb-18 md:pb-24">
      <Container>
        <div className="surface-panel rounded-[1.75rem] px-5 py-5 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {items.map((item) => (
              <div
                key={item}
                data-credibility-item
                className="inline-flex items-center gap-2 text-sm text-[var(--color-text-soft)] md:text-base"
              >
                <BadgeCheck
                  className="h-4 w-4 text-[var(--color-gold-light)]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
