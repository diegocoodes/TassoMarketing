"use client";

import { FileImage, FolderClock, LayoutPanelTop } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { results } from "@/data/results";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const resultIcons = [FileImage, LayoutPanelTop, FolderClock];

export function ResultsSection() {
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
        "[data-result-card]",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
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
    <section id="resultados" ref={sectionRef} className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Resultados"
          title="Resultados construídos com estratégia e acompanhamento"
          description="A seção já está pronta para receber cases, prints e resumos reais assim que os materiais oficiais forem anexados."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {results.map((result, index) => {
            const Icon = resultIcons[index] ?? FileImage;

            return (
              <article
                key={result.title}
                data-result-card
                className="surface-panel rounded-[1.75rem] p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] text-[var(--color-gold-light)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-6 inline-flex rounded-full border border-[rgba(245,169,0,0.22)] bg-[rgba(245,169,0,0.08)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-light)]">
                  {result.status}
                </p>
                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {result.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                  {result.description}
                </p>
                <div className="mt-6 rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 px-5 py-10 text-center text-sm text-[var(--color-text-muted)]">
                  Espaço reservado para imagem ou print oficial do cliente.
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
