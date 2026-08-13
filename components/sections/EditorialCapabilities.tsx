"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BarChart3, PenTool, Target, Workflow, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const capabilities: Array<{
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
}> = [
  {
    title: "Aquisição & mídia",
    description:
      "Campanhas orientadas por intenção, contexto e dados para colocar sua marca diante das pessoas certas.",
    items: ["Google Ads", "Meta Ads", "Estratégia de mídia"],
    icon: Target,
  },
  {
    title: "Marca & conteúdo",
    description:
      "Posicionamento e comunicação para tornar sua proposta mais clara, desejável e fácil de reconhecer.",
    items: ["Direção criativa", "Conteúdo", "Landing pages"],
    icon: PenTool,
  },
  {
    title: "Automação & CRM",
    description:
      "Jornadas conectadas para organizar oportunidades, acelerar respostas e aproximar marketing e vendas.",
    items: ["Atendimento com IA", "CRM", "Automações"],
    icon: Workflow,
  },
  {
    title: "Dados & conversão",
    description:
      "Leitura contínua dos sinais do negócio para evoluir campanhas, páginas e decisões comerciais.",
    items: ["Mensuração", "Otimização", "SEO"],
    icon: BarChart3,
  },
];

export function EditorialCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current || !lineRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-capability-step]");
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top" });
      gsap.set(blocks, { opacity: 0.28, y: 28 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-capability-flow]",
          start: "top 72%",
          end: "bottom 58%",
          scrub: 0.45,
        },
      });

      timeline
        .to(lineRef.current, { scaleY: 1, duration: 1, ease: "none" }, 0)
        .to(
          blocks,
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.28,
            ease: "power3.out",
          },
          0.04,
        );
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="agency-paper scroll-mt-24 py-24 text-[#101114] md:py-36 lg:py-44"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5f00]">
              Estratégia conectada
            </p>
            <h2 className="mt-5 max-w-[14ch] text-[clamp(2.7rem,6vw,6.1rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
              Do primeiro impacto à próxima venda.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-600 md:text-base">
            Cada frente trabalha em conjunto para transformar atenção em relacionamento e oportunidades reais de negócio.
          </p>
        </div>

        <div
          data-capability-flow
          className="relative mt-16 pl-8 md:mt-24 md:pl-12 lg:pl-16"
        >
          <span className="absolute inset-y-0 left-0 w-px bg-black/12" aria-hidden="true">
            <span ref={lineRef} className="block h-full w-full origin-top bg-[var(--color-gold-deep)]" />
          </span>

          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <article
                key={capability.title}
                data-capability-step
                className={`group relative grid border-t border-black/15 py-12 md:grid-cols-12 md:gap-8 md:py-16 ${
                  index % 2 === 1 ? "md:ml-[8%]" : "md:mr-[5%]"
                }`}
              >
                <span
                  className="absolute -left-[2.28rem] top-12 size-2 rounded-full border-2 border-[#ecebe6] bg-[var(--color-gold-deep)] md:-left-[3.28rem] md:top-16 lg:-left-[4.28rem]"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between md:col-span-5">
                  <div>
                    <span className="font-mono text-xs tracking-[0.14em] text-[#8a5f00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 max-w-[11ch] text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                      {capability.title}
                    </h3>
                  </div>
                  <Icon className="size-6 text-[#8a5f00] transition-transform duration-300 group-hover:translate-y-[-2px]" aria-hidden="true" />
                </div>

                <div className="mt-8 md:col-span-6 md:col-start-7 md:mt-0">
                  <p className="max-w-xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
                    {capability.description}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 border-t border-black/10 pt-5" aria-label={`Entregas de ${capability.title}`}>
                    {capability.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.07em] text-zinc-700">
                        <span className="size-1 bg-[#8a5f00]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
