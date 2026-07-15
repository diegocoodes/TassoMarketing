"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SectionScrollReveal() {
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("#conteudo-principal > section:not(#inicio)"),
    );

    if (reducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.dataset.scrollReveal = "visible");
      return;
    }

    sections.forEach((section) => {
      section.dataset.scrollReveal = "pending";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.scrollReveal = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.06 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return null;
}
