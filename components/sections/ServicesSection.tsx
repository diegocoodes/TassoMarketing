"use client";

import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { BorderBeam } from "@/components/animation/BorderBeam";
import { HolographicServiceCard } from "@/components/animation/HolographicServiceCard";
import { InteractiveConstellation } from "@/components/animation/InteractiveConstellation";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { services } from "@/data/services";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;

    if (!section || !pin || !viewport || !track || !progress) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, mobile, reduceMotion } = context.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-service-card]",
            section,
          );

          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });

          if (reduceMotion) {
            gsap.set(track, { clearProps: "transform" });
            gsap.set(cards, { clearProps: "opacity,transform" });
            gsap.set(progress, { scaleX: 1 });
            return;
          }

          if (desktop) {
            const travel = () =>
              Math.max(0, track.scrollWidth - viewport.clientWidth);

            gsap.set(cards, { opacity: 1, y: 0 });

            gsap.to(track, {
              x: () => -travel(),
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () =>
                  `+=${Math.max(travel() * 1.15, window.innerHeight * 1.55)}`,
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => gsap.set(progress, { scaleX: self.progress }),
                snap:
                  cards.length > 1
                    ? {
                        snapTo: 1 / (cards.length - 1),
                        duration: { min: 0.15, max: 0.4 },
                        delay: 0.05,
                        ease: "power1.inOut",
                      }
                    : undefined,
              },
            });

            return;
          }

          if (mobile) {
            gsap.fromTo(
              cards,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: track,
                  start: "top 82%",
                  once: true,
                },
              },
            );
            gsap.set(progress, { scaleX: 1 });
          }
        },
      );
    }, section);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="solucoes"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-18 md:py-24 lg:py-0 motion-reduce:lg:py-24"
    >
      <div
        ref={pinRef}
        className="relative lg:flex lg:h-[100svh] lg:min-h-[40rem] lg:items-center motion-reduce:lg:h-auto motion-reduce:lg:min-h-0"
      >
        <InteractiveConstellation className="absolute inset-y-0 right-0 hidden h-full w-[62%] opacity-55 lg:block" />
        <Container className="relative z-10 w-full">
          <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 xl:gap-20">
            <div>
              <SectionTitle
                eyebrow="Nossas soluções"
                title="Estrutura para transformar atenção em oportunidades"
                description="Conectamos mídia, atendimento e organização comercial para sua empresa atrair as pessoas certas e aproveitar melhor cada contato."
              />
              <div className="mt-8 flex justify-center lg:justify-start">
                <Button
                  href="#contato"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                  magnetic
                >
                  Quero aumentar minhas vendas
                </Button>
              </div>
              <p className="type-caption mt-3 text-zinc-500">
                Atendimento direto e estratégia personalizada.
              </p>

              <div className="mt-8 hidden items-center gap-4 lg:flex" aria-hidden="true">
                <span className="font-display text-[10px] tracking-[0.24em] text-[var(--color-gold-light)]">
                  01
                </span>
                <span className="relative h-px w-28 overflow-hidden bg-white/10">
                  <span
                    ref={progressRef}
                    className="absolute inset-0 block bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-light)]"
                  />
                </span>
                <span className="font-display text-[10px] tracking-[0.24em] text-zinc-600">
                  03
                </span>
                <span className="ml-1 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  role para explorar
                </span>
              </div>
            </div>

            <div
              ref={viewportRef}
              className="min-w-0 overflow-visible lg:overflow-hidden motion-reduce:lg:overflow-visible"
            >
              <div
                ref={trackRef}
                className="flex flex-col gap-4 lg:w-max lg:flex-row lg:gap-5 lg:py-8 lg:pr-4 motion-reduce:lg:w-auto motion-reduce:lg:flex-col motion-reduce:lg:py-0 motion-reduce:lg:pr-0"
              >
                {services.slice(0, 3).map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={service.title}
                      data-service-card
                      className="lg:w-[clamp(28rem,43vw,40rem)] lg:flex-none motion-reduce:lg:w-auto"
                    >
                      <HolographicServiceCard className="h-full min-h-[18rem] px-6 pb-7 pt-0 md:px-8 lg:min-h-[22rem] lg:px-10 lg:pb-9">
                        <BorderBeam duration={5.5 + index * 0.8} delay={index * 0.35} />
                        <span
                          aria-hidden="true"
                          className="absolute right-6 top-5 font-display text-5xl font-black text-white/[0.035] transition-colors duration-300 group-hover:text-[rgba(245,169,0,0.09)] lg:right-9 lg:top-8 lg:text-7xl"
                        >
                          0{index + 1}
                        </span>
                        <div className="flex h-12 w-12 items-center justify-center rounded-b-xl bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black lg:h-14 lg:w-14">
                          <Icon className="icon-draw h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
                        </div>
                        <h3 className="mt-5 font-display text-2xl font-semibold text-white md:text-3xl lg:mt-10 lg:text-4xl">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base lg:mt-5 lg:max-w-xl lg:text-lg lg:leading-8">
                          {service.description}
                        </p>
                      </HolographicServiceCard>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
