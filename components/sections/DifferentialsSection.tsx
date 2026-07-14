"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { differentials } from "@/data/differentials";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function DifferentialsSection() {
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
        "[data-differential-item]",
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
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
    <section ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Diferenciais"
          title="Mais do que anunciar: estruturamos o caminho até a venda"
          description="A proposta é integrar mídia, processo comercial e tecnologia de forma prática para que a operação cresça com mais consistência."
        />
        <div className="mt-10 grid gap-4">
          {differentials.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                data-differential-item
                className="surface-panel rounded-[1.75rem] p-5 md:p-6"
              >
                <div className="grid gap-5 md:grid-cols-[0.18fr_0.18fr_1fr] md:items-center">
                  <p className="font-display text-4xl font-semibold text-[var(--color-gold-light)]">
                    {item.number}
                  </p>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] text-[var(--color-gold-light)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
