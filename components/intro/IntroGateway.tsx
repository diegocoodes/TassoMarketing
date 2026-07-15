"use client";

import Image from "next/image";
import {
  CalendarDays,
  ClipboardList,
  Globe2,
  MoveDown,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { IntroActionCard } from "@/components/intro/IntroActionCard";
import { IntroClientLogos } from "@/components/intro/IntroClientLogos";
import { LeadForm } from "@/components/intro/LeadForm";
import Particles from "@/components/ui/Particles";
import { siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSessionIntro } from "@/hooks/useSessionIntro";

const introParticleColors = ["#edb301"];

export function IntroGateway() {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { isVisible, completeIntro } = useSessionIntro();
  const reducedMotion = useReducedMotion();
  const schedulingUrl = siteConfig.scheduling.url.trim();

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;

    if (!isVisible || !root || !panel) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([root, panel, "[data-intro-item]"], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(
          panel,
          { opacity: 0, y: 26, scale: 0.975 },
          { opacity: 1, y: 0, scale: 1, duration: 0.52 },
          "-=0.12",
        )
        .fromTo(
          "[data-intro-item]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.065 },
          "-=0.25",
        );
    }, root);

    return () => ctx.revert();
  }, [isVisible, reducedMotion]);

  function finishIntro() {
    completeIntro();
    window.requestAnimationFrame(() => {
      document.getElementById("inicio")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function revealSite() {
    const root = rootRef.current;
    const panel = panelRef.current;

    if (isExiting || !root || !panel) return;
    setIsExiting(true);

    if (reducedMotion) {
      gsap.to(root, { opacity: 0, duration: 0.12, onComplete: finishIntro });
      return;
    }

    gsap
      .timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: finishIntro,
      })
      .to("[data-intro-item]", {
        opacity: 0,
        y: -12,
        duration: 0.22,
        stagger: 0.025,
      })
      .to(panel, { opacity: 0, y: -30, scale: 0.98, duration: 0.36 }, "-=0.1")
      .fromTo(transitionRef.current, { opacity: 0, scale: 0.15 }, { opacity: 1, scale: 18, duration: 0.52, ease: "power3.in" }, "-=0.3")
      .to(root, { opacity: 0, duration: 0.22 }, "-=0.08");
  }

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={rootRef}
        className="intro-gateway fixed inset-0 z-[100] min-h-svh overflow-x-hidden overflow-y-auto bg-[#050505] px-4 py-4 sm:px-6 sm:py-6"
      >
        <div ref={transitionRef} className="pointer-events-none fixed left-1/2 top-1/2 z-[90] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold)] opacity-0" aria-hidden="true" />
        <div className="pointer-events-none fixed inset-0 opacity-65" aria-hidden="true">
          <Particles
            particleColors={introParticleColors}
            particleCount={220}
            particleSpread={10}
            speed={0.06}
            particleBaseSize={70}
            sizeRandomness={0.7}
            particleHoverFactor={0.5}
            cameraDistance={20}
            pixelRatio={1}
          />
        </div>
        <button
          type="button"
          onClick={revealSite}
          disabled={isExiting}
          className="fixed right-4 top-4 z-20 rounded-full border border-white/10 bg-black/55 px-4 py-2.5 text-xs font-semibold text-zinc-400 backdrop-blur-md transition hover:border-[rgba(245,169,0,0.35)] hover:text-white sm:right-6 sm:top-6"
        >
          Pular e conhecer o site
        </button>

        <div className="relative z-10 flex min-h-[calc(100svh-2rem)] w-full min-w-0 items-center justify-center py-14 sm:min-h-[calc(100svh-3rem)] sm:py-12">
          <div
            ref={panelRef}
            className="relative min-w-0 w-full max-w-[920px] overflow-hidden rounded-[2rem] border border-[rgba(245,169,0,0.28)] bg-[rgba(10,10,12,0.94)] p-5 sm:p-8 lg:p-10"
          >
            <div data-intro-item className="relative mx-auto h-16 w-52 overflow-hidden">
              <Image
                src={siteConfig.assets.brandLogo}
                alt="Universo Marketing"
                fill
                sizes="208px"
                className="object-cover object-center"
              />
            </div>

            <div className="relative mx-auto mt-5 max-w-2xl text-center">
              <h1 data-intro-item className="mt-5 font-display text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-white">
                Como podemos ajudar o seu negócio hoje?
              </h1>
              <p data-intro-item className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
                Escolha o próximo passo para falar com nossa equipe, agendar uma conversa ou conhecer melhor a Universo Marketing.
              </p>
            </div>

            <div className="relative mx-auto mt-8 flex max-w-2xl flex-col gap-3">
              <div data-intro-item>
                <IntroActionCard
                  icon={ClipboardList}
                  title="Preencher formulário"
                  onClick={() => setIsFormOpen(true)}
                />
              </div>
              <div data-intro-item>
                <IntroActionCard
                  icon={CalendarDays}
                  title="Agendar reunião"
                  href={schedulingUrl || undefined}
                  disabled={!schedulingUrl}
                />
              </div>
              <div data-intro-item>
                <IntroActionCard
                  icon={Globe2}
                  title="Conhecer o site"
                  onClick={revealSite}
                />
              </div>
            </div>

            <IntroClientLogos />

            <div data-intro-item className="mt-5 flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-zinc-600">
              <MoveDown className="h-3.5 w-3.5" aria-hidden="true" />
              Escolha uma opção para continuar
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen ? <LeadForm onClose={() => setIsFormOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
