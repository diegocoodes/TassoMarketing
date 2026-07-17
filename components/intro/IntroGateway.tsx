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
import { IntroOrbitalBackground } from "@/components/intro/IntroOrbitalBackground";
import { LeadForm } from "@/components/intro/LeadForm";
import {
  markIntroCompleted,
  markIntroWaiting,
  releaseHeroFromIntro,
  type IntroRevealOrigin,
} from "@/components/intro/introHeroEvents";
import { siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useSessionIntro } from "@/hooks/useSessionIntro";

function getRevealOrigin(trigger?: HTMLElement | null): IntroRevealOrigin {
  if (!trigger) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  const rect = trigger.getBoundingClientRect();
  return {
    x: Math.round(rect.left + rect.width / 2),
    y: Math.round(rect.top + rect.height / 2),
  };
}

export function IntroGateway() {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const isExitingRef = useRef(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { isVisible, isSessionResolved, completeIntro } = useSessionIntro();
  const reducedMotion = useReducedMotion();
  const schedulingUrl = siteConfig.scheduling.url.trim();

  useEffect(() => {
    if (!isSessionResolved || !isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSessionResolved, isVisible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!isSessionResolved || !isVisible || !root) return;

    const siteShell = document.querySelector<HTMLElement>("[data-site-shell]");
    const siteShellWasInert = siteShell?.inert ?? false;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    if (siteShell) siteShell.inert = true;

    const focusFrame = window.requestAnimationFrame(() => {
      root.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      if (siteShell?.isConnected) siteShell.inert = siteShellWasInert;

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isSessionResolved, isVisible]);

  useEffect(() => {
    const root = rootRef.current;
    if (
      !isSessionResolved ||
      !isVisible ||
      isFormOpen ||
      isExiting ||
      !root
    ) {
      return;
    }

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        skipButtonRef.current?.click();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        root.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter(
        (element) =>
          !element.hidden &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        root.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (
          activeElement === root ||
          activeElement === firstElement ||
          !root.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (activeElement === lastElement || !root.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [isExiting, isFormOpen, isSessionResolved, isVisible]);

  useEffect(
    () => () => {
      exitTimelineRef.current?.kill();
    },
    [],
  );

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;

    if (!isVisible || !root || !panel) return;
    markIntroWaiting();

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [root, panel, "[data-intro-logo]", "[data-intro-item]"],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          },
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.28 })
        .fromTo(
          panel,
          { opacity: 0, y: 24, scale: 0.978 },
          { opacity: 1, y: 0, scale: 1, duration: 0.52 },
          "-=0.1",
        )
        .fromTo(
          "[data-intro-logo]",
          {
            opacity: 0,
            scale: 1.08,
            clipPath: "inset(0% 48% 0% 48%)",
          },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.58,
          },
          "-=0.28",
        )
        .fromTo(
          "[data-intro-item]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.055 },
          "-=0.3",
        );
    }, root);

    return () => ctx.revert();
  }, [isVisible, reducedMotion]);

  function finishIntro() {
    markIntroCompleted();
    completeIntro();
    window.requestAnimationFrame(() => {
      document.getElementById("inicio")?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function revealSite(trigger?: HTMLElement | null) {
    const root = rootRef.current;
    const panel = panelRef.current;
    const transition = transitionRef.current;

    if (isExitingRef.current || !root || !panel || !transition) return;
    isExitingRef.current = true;
    setIsExiting(true);
    setIsFormOpen(false);

    const origin = getRevealOrigin(trigger);
    const center = `${origin.x}px ${origin.y}px`;

    if (reducedMotion) {
      releaseHeroFromIntro(origin);
      gsap.to(root, {
        opacity: 0,
        duration: 0.14,
        ease: "power1.out",
        onComplete: finishIntro,
      });
      return;
    }

    gsap.set(transition, {
      opacity: 1,
      clipPath: `circle(0px at ${center})`,
      WebkitClipPath: `circle(0px at ${center})`,
    });

    exitTimelineRef.current = gsap
      .timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: finishIntro,
      })
      .to(
        "[data-intro-item]",
        {
          opacity: 0,
          y: -10,
          duration: 0.18,
          stagger: 0.012,
        },
        0,
      )
      .to(panel, { opacity: 0, y: -20, scale: 0.985, duration: 0.38 }, 0.12)
      .to(
        transition,
        {
          clipPath: `circle(150vmax at ${center})`,
          WebkitClipPath: `circle(150vmax at ${center})`,
          duration: 0.72,
          ease: "power3.inOut",
        },
        0.14,
      )
      .call(() => releaseHeroFromIntro(origin), [], 0.5)
      .to(root, { opacity: 0, duration: 0.2, ease: "power2.out" }, 0.8);
  }

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={rootRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-gateway-title"
        aria-describedby="intro-gateway-description"
        aria-hidden={isFormOpen ? true : undefined}
        aria-busy={isExiting}
        inert={isFormOpen || isExiting ? true : undefined}
        tabIndex={-1}
        className="intro-gateway fixed inset-0 z-[100] min-h-svh overflow-x-hidden overflow-y-auto bg-[#050505] px-4 py-4 outline-none sm:px-6 sm:py-6"
      >
        <IntroOrbitalBackground reducedMotion={reducedMotion} />

        <div
          ref={transitionRef}
          className="pointer-events-none fixed inset-0 z-[90] bg-[radial-gradient(circle_at_center,#ffdc66_0%,#f5a900_42%,#d98e00_100%)] opacity-0 will-change-[clip-path]"
          aria-hidden="true"
        />

        <button
          ref={skipButtonRef}
          type="button"
          onClick={(event) => revealSite(event.currentTarget)}
          disabled={isExiting}
          className="fixed right-[calc(env(safe-area-inset-right)_+_1rem)] top-[calc(env(safe-area-inset-top)_+_1rem)] z-20 rounded-full border border-white/10 bg-black/55 px-4 py-2.5 text-xs font-semibold text-zinc-300 backdrop-blur-md transition hover:border-[rgba(245,169,0,0.35)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] disabled:pointer-events-none sm:right-[calc(env(safe-area-inset-right)_+_1.5rem)] sm:top-[calc(env(safe-area-inset-top)_+_1.5rem)]"
        >
          Pular e conhecer o site
        </button>

        <div className="relative z-10 flex min-h-[calc(100svh-2rem)] w-full min-w-0 items-center justify-center py-14 sm:min-h-[calc(100svh-3rem)] sm:py-12">
          <div
            ref={panelRef}
            className="relative w-full min-w-0 max-w-[920px] overflow-hidden rounded-[2rem] border border-[rgba(245,169,0,0.27)] bg-[rgba(8,8,10,0.88)] p-5 shadow-[0_28px_100px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,210,80,0.66)] to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-80 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(245,169,0,0.1),transparent_68%)]" />

            <div
              data-intro-logo
              className="relative mx-auto h-16 w-52 overflow-hidden"
            >
              <Image
                src={siteConfig.assets.brandLogo}
                alt="Universo Marketing"
                fill
                sizes="208px"
                className="object-cover object-[center_46%]"
              />
            </div>

            <div className="relative mx-auto mt-5 max-w-2xl text-center">
              <p
                data-intro-item
                className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-[var(--color-gold-light)]"
              >
                Seu próximo passo começa aqui
              </p>
              <h1
                id="intro-gateway-title"
                data-intro-item
                className="mt-4 font-display type-section-title text-white"
              >
                Como podemos ajudar o seu negócio hoje?
              </h1>
              <p
                id="intro-gateway-description"
                data-intro-item
                className="type-body-md mx-auto mt-4 max-w-xl text-[var(--color-text-muted)]"
              >
                Escolha como prefere começar. Nossa equipe está pronta para
                entender o seu momento e indicar o melhor caminho.
              </p>
            </div>

            <div className="relative mx-auto mt-8 flex max-w-2xl flex-col gap-3">
              <div data-intro-item>
                <IntroActionCard
                  icon={ClipboardList}
                  title="Preencher formulário"
                  description="Conte sobre o seu negócio e receba uma análise inicial."
                  variant="primary"
                  onClick={() => setIsFormOpen(true)}
                />
              </div>
              <div data-intro-item>
                <IntroActionCard
                  icon={CalendarDays}
                  title="Agendar reunião"
                  description="Escolha o melhor horário para conversar com nossa equipe."
                  variant="secondary"
                  href={schedulingUrl || undefined}
                  disabled={!schedulingUrl}
                />
              </div>
              <div data-intro-item>
                <IntroActionCard
                  icon={Globe2}
                  title="Conhecer o site"
                  description="Explore nossas soluções, projetos e forma de trabalhar."
                  variant="tertiary"
                  onClick={(event) => revealSite(event.currentTarget)}
                />
              </div>
            </div>

            <IntroClientLogos />

            <div
              data-intro-item
              className="mt-5 flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.16em] text-zinc-400"
            >
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
