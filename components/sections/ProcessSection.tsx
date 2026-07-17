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

const steps = [
  { icon: Search, title: "Diagnóstico", description: "Entendemos seu negócio, público, oferta e cenário atual." },
  { icon: Crosshair, title: "Planejamento", description: "Definimos canais, campanhas e prioridades para a operação." },
  { icon: Rocket, title: "Implementação", description: "Colocamos a estratégia em prática com estrutura e precisão." },
  { icon: BarChart3, title: "Otimização", description: "Analisamos dados, realizamos testes e melhoramos continuamente." },
] as const;

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const select = gsap.utils.selector(section);
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const scene = select<HTMLElement>("[data-process-desktop]")[0];
        const sceneSteps = select<HTMLElement>("[data-process-scene-step]");
        const visualSteps = select<HTMLElement>("[data-process-visual-step]");
        const progressFills = select<HTMLElement>("[data-process-progress-fill]");
        const photo = select<HTMLElement>("[data-process-photo]")[0];

        if (!scene || sceneSteps.length !== steps.length || visualSteps.length !== steps.length) return;

        gsap.set(sceneSteps, {
          autoAlpha: 0,
          y: 46,
          scale: 1.025,
        });
        gsap.set(visualSteps, { autoAlpha: 0, scale: 1.06 });
        gsap.set(progressFills, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(sceneSteps[0], { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(visualSteps[0], { autoAlpha: 1, scale: 1 });
        gsap.set(progressFills[0], { scaleX: 1 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 3.6, 2700)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.7 });

        for (let index = 1; index < sceneSteps.length; index += 1) {
          const previous = sceneSteps[index - 1];
          const current = sceneSteps[index];
          const previousVisual = visualSteps[index - 1];
          const currentVisual = visualSteps[index];
          const label = `process-step-${index}`;

          timeline
            .addLabel(label)
            .to(previous, { autoAlpha: 0, y: -42, scale: 0.97, duration: 0.42, ease: "power2.in" }, label)
            .to(previousVisual, { autoAlpha: 0, scale: 0.95, duration: 0.44, ease: "power2.in" }, label)
            .fromTo(current, { autoAlpha: 0, y: 50, scale: 1.03 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.64, ease: "power3.out" }, `${label}+=0.1`)
            .fromTo(currentVisual, { autoAlpha: 0, scale: 1.07 }, { autoAlpha: 1, scale: 1, duration: 0.68, ease: "power3.out" }, `${label}+=0.08`)
            .to(progressFills[index], { scaleX: 1, duration: 0.52, ease: "power2.out" }, `${label}+=0.12`)
            .to({}, { duration: 0.72 });
        }

        timeline.to({}, { duration: 0.72 });

        if (photo) {
          timeline.fromTo(
            photo,
            { scale: 1.02, xPercent: 0 },
            { scale: 1.13, xPercent: -2, duration: timeline.duration(), ease: "none" },
            0,
          );
        }
      });

      media.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          select("[data-process-mobile-reveal]"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: select("[data-process-mobile]")[0], start: "top 78%" },
          },
        );
      });
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="relative bg-[#ECEBEF] text-black">
      <div
        data-process-desktop
        className="hidden min-h-screen w-full items-center overflow-hidden py-8 lg:flex lg:motion-reduce:hidden"
      >
        <Container className="w-full">
          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_32px_100px_rgba(0,0,0,0.18)] lg:grid-cols-[1.06fr_0.94fr]">
            <div className="relative z-10 flex min-w-0 flex-col p-9 xl:p-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">Como funciona</p>
                <h2 className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4vw,3.65rem)] font-semibold leading-[0.96] tracking-tight text-black">
                  Uma estratégia pronta para transformar atenção em vendas
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600 md:text-base">
                  Do diagnóstico à otimização, cada etapa é construída para dar direção ao investimento e gerar oportunidades melhores.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-2" aria-hidden="true">
                {steps.map((step, index) => (
                  <span key={step.title} className="relative h-px overflow-hidden bg-black/10">
                    <span
                      data-process-progress-fill
                      className={`absolute inset-0 origin-left bg-[var(--color-gold-deep)] ${index === 0 ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </span>
                ))}
              </div>

              <div className="relative mt-7 min-h-[15rem] flex-1">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article
                      key={step.title}
                      data-process-scene-step
                      className={`absolute inset-0 flex flex-col justify-center will-change-[transform,opacity] ${index === 0 ? "visible opacity-100" : "invisible opacity-0"}`}
                    >
                      <div className="flex items-center gap-5">
                        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-black text-[var(--color-gold-light)] shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-xs font-bold tracking-[0.22em] text-[var(--color-gold-deep)]">ETAPA 0{index + 1}</p>
                          <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-black xl:text-4xl">{step.title}</h3>
                        </div>
                      </div>
                      <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600">{step.description}</p>
                      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 font-display text-[10rem] font-black leading-none tracking-[-0.08em] text-black/[0.035]">
                        0{index + 1}
                      </span>
                    </article>
                  );
                })}
              </div>

              <div className="relative z-10 mt-7 max-w-sm">
                <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowRight className="h-4 w-4" />} className="w-full" magnetic>
                  Quero aumentar minhas vendas
                </Button>
              </div>
            </div>

            <div className="relative min-h-[38rem] overflow-hidden bg-black">
              <Image
                data-process-photo
                src={siteConfig.assets.tassoNotebook}
                alt="T. Thales durante o planejamento de uma estratégia digital."
                fill
                sizes="45vw"
                className="object-cover object-center will-change-transform"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.08),rgba(0,0,0,0.48)),radial-gradient(circle_at_72%_25%,rgba(245,169,0,0.2),transparent_32%)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />

              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    data-process-visual-step
                    className={`absolute inset-0 flex flex-col justify-between p-8 text-white will-change-[transform,opacity] xl:p-10 ${index === 0 ? "visible opacity-100" : "invisible opacity-0"}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="rounded-full border border-white/20 bg-black/25 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] backdrop-blur-md">
                        Processo / 0{index + 1}
                      </span>
                      <span aria-hidden="true" className="font-display text-[8rem] font-black leading-none tracking-[-0.08em] text-white/[0.09]">0{index + 1}</span>
                    </div>
                    <div className="relative z-10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[rgba(245,169,0,0.45)] bg-[rgba(245,169,0,0.14)] text-[var(--color-gold-light)] backdrop-blur-md">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="mt-5 font-display text-3xl font-semibold">{step.title}</p>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-zinc-300">Estratégia, acompanhamento e evolução contínua.</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      <div data-process-mobile className="py-18 md:py-24 lg:hidden lg:motion-reduce:block">
        <Container>
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.16)] lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-6 sm:p-9 lg:p-12">
              <div className="text-center md:text-left" data-process-mobile-reveal>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">Como funciona</p>
                <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-tight text-black">
                  Uma estratégia pronta para transformar atenção em vendas
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-600 md:text-base">
                  Do diagnóstico à otimização, cada etapa é construída para dar direção ao investimento e gerar oportunidades melhores.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.title} data-process-mobile-reveal className="relative overflow-hidden rounded-xl bg-[#f4f3f2] p-4">
                      <span aria-hidden="true" className="pointer-events-none absolute -bottom-8 right-0 font-display text-8xl font-black text-black/[0.035]">0{index + 1}</span>
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

              <div data-process-mobile-reveal className="mt-7">
                <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowRight className="h-4 w-4" />} className="w-full" magnetic>
                  Quero aumentar minhas vendas
                </Button>
              </div>
            </div>

            <div data-process-mobile-reveal className="relative min-h-[32rem] overflow-hidden bg-black lg:min-h-full">
              <Image
                src={siteConfig.assets.tassoNotebook}
                alt="T. Thales durante o planejamento de uma estratégia digital."
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-7 pb-7 pt-24 text-white">
                <p className="font-display text-2xl font-semibold">T. Thales</p>
                <p className="mt-2 text-sm text-zinc-300">Estratégia, acompanhamento e evolução contínua.</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
