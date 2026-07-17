"use client";

import Image from "next/image";
import { ArrowUpRight, ChartNoAxesCombined, Target, Workflow } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { StrategyTunnel } from "./StrategyTunnel";

const journey = [
  { icon: Target, title: "Atrair", description: "Campanhas direcionadas para alcançar as pessoas certas." },
  { icon: Workflow, title: "Converter", description: "Atendimento e processos conectados para aproveitar cada oportunidade." },
  { icon: ChartNoAxesCombined, title: "Evoluir", description: "Dados transformados em decisões e melhorias contínuas." },
] as const;

const tags = [
  { label: "Estratégia", position: "left-0 top-[15%] bg-zinc-950/90 text-white sm:left-[2%]" },
  { label: "Precisão", position: "right-0 top-[43%] bg-[var(--color-gold)] text-black sm:right-[1%]" },
  { label: "Execução", position: "bottom-[10%] left-[3%] bg-zinc-950/90 text-white sm:left-[8%]" },
] as const;

export function StrategySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const select = gsap.utils.selector(section);
    const sectionBounds = section.getBoundingClientRect();
    let sectionInViewport =
      sectionBounds.bottom > 0 &&
      sectionBounds.top < window.innerHeight &&
      sectionBounds.right > 0 &&
      sectionBounds.left < window.innerWidth;
    const visibilitySubscribers = new Set<(isVisible: boolean) => void>();
    const isSectionActive = () =>
      sectionInViewport && document.visibilityState !== "hidden";
    const notifyVisibilitySubscribers = () => {
      const isVisible = isSectionActive();
      visibilitySubscribers.forEach((subscriber) => subscriber(isVisible));
    };
    const subscribeToVisibility = (
      subscriber: (isVisible: boolean) => void,
    ) => {
      visibilitySubscribers.add(subscriber);
      subscriber(isSectionActive());
      return () => {
        visibilitySubscribers.delete(subscriber);
      };
    };
    const viewportObserver = new IntersectionObserver(([entry]) => {
      sectionInViewport = entry.isIntersecting;
      notifyVisibilitySubscribers();
    });
    const handleDocumentVisibility = () => notifyVisibilitySubscribers();

    viewportObserver.observe(section);
    document.addEventListener("visibilitychange", handleDocumentVisibility);

    const media = gsap.matchMedia();

    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });

        timeline
          .fromTo(select("[data-strategy-line]"), { scaleX: 0 }, { scaleX: 1, duration: 0.8, transformOrigin: "left" })
          .fromTo(select("[data-strategy-tunnel-ring]"), { opacity: 0, scale: 0.78 }, { opacity: 1, scale: 1, duration: 1.1, stagger: 0.07, transformOrigin: "520px 450px" }, "-=0.7")
          .fromTo(select("[data-strategy-tunnel-rail]"), { opacity: 0 }, { opacity: 1, duration: 0.7, stagger: 0.05 }, "-=0.8")
          .fromTo(select("[data-strategy-glow]"), { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.7 }, "-=0.75")
          .fromTo(select("[data-strategy-orbit-path]"), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.9 }, "-=0.55")
          .fromTo(select("[data-strategy-person]"), { opacity: 0, y: 28, scale: 1.04, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9 }, "-=0.5")
          .fromTo(select("[data-strategy-shine]"), { xPercent: -170, opacity: 0 }, { xPercent: 260, opacity: 0.65, duration: 0.85 }, "-=0.18")
          .fromTo(select("[data-strategy-tag]"), { opacity: 0, y: 18, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.09 }, "-=0.45")
          .fromTo(select("[data-strategy-copy]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07 }, "-=0.5")
          .fromTo(select("[data-strategy-card]"), { opacity: 0, y: 18, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.35")
          .fromTo(select("[data-strategy-progress]"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, transformOrigin: "left" }, "-=0.35")
          .fromTo(select("[data-strategy-cta]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.18");

        const ambientAnimations = [
          gsap.to(select("[data-strategy-orbit]"), { rotate: 360, duration: 24, repeat: -1, ease: "none", transformOrigin: "center", paused: true }),
          gsap.to(select("[data-strategy-glow]"), { scale: 1.18, opacity: 0.7, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
          gsap.to(select("[data-strategy-tunnel-ring]"), { strokeDashoffset: -26, duration: 3.8, stagger: 0.12, repeat: -1, ease: "none", paused: true }),
          gsap.fromTo(
            select("[data-strategy-electric]"),
            { strokeDasharray: "2 998", strokeDashoffset: 70, opacity: 0.15 },
            { strokeDashoffset: -930, opacity: 0.95, duration: 2.25, stagger: 0.38, repeat: -1, ease: "none", paused: true },
          ),
          gsap.to(select("[data-strategy-tunnel-node]"), { scale: 2.2, opacity: 0.18, duration: 1.25, stagger: 0.22, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "center", paused: true }),
        ];
        const unsubscribeVisibility = subscribeToVisibility((isVisible) => {
          ambientAnimations.forEach((animation) =>
            animation.paused(!isVisible),
          );
        });

        gsap.to(select("[data-strategy-visual-inner]"), {
          y: -24,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
        gsap.fromTo(select("[data-strategy-path]"), { strokeDashoffset: 1000 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: section, start: "top 75%", end: "bottom 35%", scrub: 1 } });
        gsap.fromTo(select("[data-strategy-node]"), { opacity: 0.2, scale: 0.3 }, { opacity: 1, scale: 1, stagger: 0.18, transformOrigin: "center", ease: "back.out(2)", scrollTrigger: { trigger: select("[data-strategy-path]")[0], start: "top 78%", toggleActions: "play reverse play reverse" } });

        return unsubscribeVisibility;
      });

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tunnel = select<SVGElement>("[data-strategy-tunnel]")[0];
        if (!tunnel) return;

        const moveX = gsap.quickTo(tunnel, "xPercent", { duration: 1.1, ease: "power3.out" });
        const moveY = gsap.quickTo(tunnel, "yPercent", { duration: 1.1, ease: "power3.out" });
        const onPointerMove = (event: PointerEvent) => {
          const bounds = section.getBoundingClientRect();
          moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 2.4);
          moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 1.8);
        };
        const onPointerLeave = () => {
          moveX(0);
          moveY(0);
        };

        let pointerListenersAttached = false;
        const setPointerListeners = (shouldAttach: boolean) => {
          if (shouldAttach && !pointerListenersAttached) {
            section.addEventListener("pointermove", onPointerMove);
            section.addEventListener("pointerleave", onPointerLeave);
            pointerListenersAttached = true;
            return;
          }

          if (!shouldAttach && pointerListenersAttached) {
            section.removeEventListener("pointermove", onPointerMove);
            section.removeEventListener("pointerleave", onPointerLeave);
            pointerListenersAttached = false;
            onPointerLeave();
          }
        };
        const unsubscribeVisibility = subscribeToVisibility(setPointerListeners);

        gsap.to(tunnel, {
          scale: 1.08,
          ease: "none",
          transformOrigin: "32.5% 50%",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.1 },
        });

        return () => {
          unsubscribeVisibility();
          setPointerListeners(false);
        };
      });

    }, section);

    return () => {
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      visibilitySubscribers.clear();
      media.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="estrategia" ref={sectionRef} className="relative isolate overflow-hidden bg-[#050505] py-16 text-white md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_28%_50%,rgba(212,160,0,0.14),transparent_36%),radial-gradient(circle_at_72%_30%,rgba(212,160,0,0.06),transparent_32%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_180_180%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%22.9%22_numOctaves=%222%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22_opacity=%22.7%22/%3E%3C/svg%3E')]" aria-hidden="true" />
      <StrategyTunnel />
      <p className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[clamp(5rem,15vw,14rem)] font-black tracking-[-0.08em] text-white/[0.018]">ESTRATÉGIA</p>
      <div data-strategy-line className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-50" />
      <Container>
        <div className="strategy-grid relative grid items-center gap-10 lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)] lg:gap-8 xl:gap-12">
          <div className="strategy-visual relative mx-auto w-full max-w-[42rem] lg:max-w-none" aria-label="Composição visual de estratégia">
            <div data-strategy-visual-inner className="relative h-[27rem] sm:h-[34rem] lg:h-[42rem] xl:h-[46rem]">
              <div data-strategy-glow className="absolute inset-[12%] rounded-full bg-[rgba(212,160,0,0.17)] blur-[55px] transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
              <Image src={siteConfig.assets.brandIcon} alt="" width={440} height={440} className="pointer-events-none absolute left-1/2 top-1/2 w-[72%] -translate-x-1/2 -translate-y-1/2 opacity-[0.045]" aria-hidden="true" />

              <svg data-strategy-orbit className="pointer-events-none absolute inset-[5%] h-[90%] w-[90%] overflow-visible" viewBox="0 0 600 700" fill="none" aria-hidden="true">
                <ellipse data-strategy-orbit-path cx="300" cy="350" rx="238" ry="292" stroke="rgba(212,160,0,.3)" strokeWidth="1.25" strokeDasharray="8 8" pathLength="1000" />
                <circle cx="300" cy="58" r="5" fill="#F5A900" className="drop-shadow-[0_0_8px_#F5A900]" />
                <circle cx="512" cy="482" r="3.5" fill="#FFD36A" className="drop-shadow-[0_0_7px_#F5A900]" />
              </svg>

              <div data-strategy-person className="absolute inset-x-[-4%] bottom-0 top-[-4%] [mask-image:linear-gradient(to_bottom,black_0%,black_88%,transparent_100%)]">
                <Image src={siteConfig.assets.tassoNinja} alt="T. Thales em composição visual inspirada em estratégia, precisão e execução." fill loading="lazy" sizes="(max-width: 1023px) 94vw, 46vw" className="object-contain object-center-bottom drop-shadow-[0_28px_42px_rgba(0,0,0,0.72)]" />
                <span data-strategy-shine className="pointer-events-none absolute -inset-y-[10%] left-[18%] w-[14%] -skew-x-12 bg-gradient-to-r from-transparent via-[rgba(255,211,106,0.42)] to-transparent blur-md" aria-hidden="true" />
              </div>

              {tags.map((tag) => (
                <div key={tag.label} data-strategy-tag className={`absolute z-10 ${tag.position}`}>
                  <motion.span whileHover={reducedMotion ? undefined : { y: -3, scale: 1.025 }} transition={{ duration: 0.2 }} className="inline-flex h-10 items-center rounded-full border border-white/10 px-4 text-xs font-bold uppercase tracking-[0.14em] shadow-[0_12px_30px_rgba(0,0,0,0.38)] sm:h-11 sm:px-5">
                    {tag.label}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <div className="strategy-content relative text-left lg:pt-3">
            <p data-strategy-copy className="eyebrow">Estratégia digital</p>
            <h2 data-strategy-copy className="mt-6 max-w-[12ch] font-display text-[clamp(2.5rem,12vw,4.3rem)] font-black leading-[0.94] tracking-[-0.045em] text-white lg:text-[clamp(3rem,5.4vw,6.6rem)] lg:leading-[0.9]">
              Estratégia que transforma atenção em <span className="text-[var(--color-gold-light)]">crescimento</span>
            </h2>
            <p data-strategy-copy className="mt-7 max-w-[650px] text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.7] text-white/70">
              Planejamento, tecnologia, atendimento e análise trabalhando juntos para transformar investimento em oportunidades comerciais.
            </p>

            <div className="relative mt-8 grid gap-4 sm:grid-cols-3 sm:gap-3 xl:gap-4">
              <div data-strategy-progress className="pointer-events-none absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-60 sm:block" aria-hidden="true" />
              {journey.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} data-strategy-card className="relative">
                    <motion.article tabIndex={0} whileHover={reducedMotion ? undefined : { y: -5 }} transition={{ duration: 0.22, ease: "easeOut" }} className="group relative h-full min-h-[12rem] rounded-[20px] border border-white/10 bg-[#111111]/95 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.25)] outline-none transition-colors hover:border-[rgba(245,169,0,0.48)] focus-visible:border-[var(--color-gold)] focus-visible:ring-2 focus-visible:ring-[rgba(245,169,0,0.35)]">
                      <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.22)] bg-[rgba(245,169,0,0.08)]">
                        <Icon className="h-6 w-6 text-[var(--color-gold-light)]" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{step.description}</p>
                    </motion.article>
                  </div>
                );
              })}
            </div>
            <svg aria-hidden="true" viewBox="0 0 900 70" className="mt-2 hidden w-full overflow-visible sm:block">
              <path data-strategy-path d="M45 35 C180 0 260 70 450 35 S720 5 855 35" fill="none" stroke="url(#strategyGold)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1000" className="drop-shadow-[0_0_8px_rgba(245,169,0,0.8)]" />
              {[45, 450, 855].map((cx) => <g data-strategy-node key={cx}><circle cx={cx} cy="35" r="11" fill="rgba(245,169,0,0.13)" stroke="var(--color-gold-light)" /><circle cx={cx} cy="35" r="3" fill="var(--color-gold-light)" /></g>)}
              <defs><linearGradient id="strategyGold"><stop stopColor="#e99000"/><stop offset=".5" stopColor="#ffd447"/><stop offset="1" stopColor="#e99000"/></linearGradient></defs>
            </svg>

            <div data-strategy-cta className="mt-7">
              <Button href="#como-funciona" icon={<ArrowUpRight className="h-5 w-5" aria-hidden="true" />} magnetic className="w-full px-8 py-4 sm:w-auto">
                Conhecer nossa estratégia
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
