"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { HeroLiquidMetalText } from "@/components/animation/HeroLiquidMetalText";
import { HeroVolumetricRays } from "@/components/animation/HeroVolumetricRays";
import { INTRO_HERO_REVEAL_EVENT } from "@/components/intro/introHeroEvents";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const subjectMask =
  "radial-gradient(ellipse 36% 64% at 73% 69%, #000 0%, #000 51%, rgba(0,0,0,0.82) 61%, transparent 74%)";

const notificationMask = [
  "radial-gradient(ellipse 15% 11% at 61% 23%, #000 26%, transparent 72%)",
  "radial-gradient(ellipse 13% 9% at 87% 23%, #000 24%, transparent 72%)",
  "radial-gradient(ellipse 14% 11% at 91% 45%, #000 26%, transparent 72%)",
  "radial-gradient(ellipse 14% 10% at 45% 61%, #000 24%, transparent 72%)",
].join(", ");

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const visibleElements = section.querySelectorAll(
      "[data-hero-title-line], [data-hero-copy], [data-hero-actions], [data-hero-mobile-actions]",
    );

    if (reducedMotion) {
      gsap.set(visibleElements, {
        opacity: 1,
        y: 0,
        yPercent: 0,
        x: 0,
        rotateX: 0,
        scale: 1,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const introPhase = document.documentElement.dataset.universoIntro;
    let heroReleased =
      !siteConfig.intro.enabled ||
      introPhase === "completed" ||
      introPhase === "revealing";
    const entranceTimelines = new Set<gsap.core.Timeline>();
    const sectionBounds = section.getBoundingClientRect();
    let sectionInViewport =
      sectionBounds.bottom > 0 &&
      sectionBounds.top < window.innerHeight &&
      sectionBounds.right > 0 &&
      sectionBounds.left < window.innerWidth;
    const visibilitySubscribers = new Set<(isVisible: boolean) => void>();
    const isSectionActive = () =>
      heroReleased &&
      sectionInViewport &&
      document.visibilityState !== "hidden";
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
    const registerEntranceTimeline = (timeline: gsap.core.Timeline) => {
      entranceTimelines.add(timeline);
      if (heroReleased) timeline.play(0);
      else timeline.pause(0);

      return () => entranceTimelines.delete(timeline);
    };
    const releaseHeroEntrance = () => {
      if (heroReleased) return;
      heroReleased = true;
      entranceTimelines.forEach((timeline) => timeline.play(0));
      notifyVisibilitySubscribers();
    };
    const handleIntroReveal = () => releaseHeroEntrance();
    const viewportObserver = new IntersectionObserver(([entry]) => {
      sectionInViewport = entry.isIntersecting;
      notifyVisibilitySubscribers();
    });
    const handleDocumentVisibility = () => notifyVisibilitySubscribers();

    viewportObserver.observe(section);
    document.addEventListener("visibilitychange", handleDocumentVisibility);
    window.addEventListener(INTRO_HERO_REVEAL_EVENT, handleIntroReveal);

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(min-width: 768px)", () => {
        const entranceTimeline = gsap
          .timeline({ paused: true, defaults: { ease: "power3.out" } })
          .fromTo(
            "[data-hero-title-line]",
            { opacity: 0, yPercent: 112, rotateX: -12 },
            {
              opacity: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 0.82,
              delay: 0.18,
              stagger: 0.1,
            },
          )
          .fromTo(
            "[data-hero-copy]",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.52 },
            "-=0.34",
          )
          .fromTo(
            "[data-hero-actions]",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.48 },
            "-=0.25",
          );
        const unregisterEntrance = registerEntranceTimeline(entranceTimeline);

        const ambientAnimations = [
          gsap.fromTo(
            "[data-hero-metal-text]",
            { backgroundPosition: "0% 50%" },
            {
              backgroundPosition: "200% 50%",
              duration: 5.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              paused: true,
            },
          ),
          gsap.fromTo(
            "[data-hero-metal-shine]",
            { backgroundPosition: "190% 50%" },
            {
              backgroundPosition: "-90% 50%",
              duration: 2.2,
              repeat: -1,
              repeatDelay: 1.35,
              ease: "power2.inOut",
              paused: true,
            },
          ),
          gsap.to("[data-hero-metal-shadow]", {
            opacity: 0.38,
            scale: 1.008,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "center center",
            paused: true,
          }),
          gsap.to("[data-aurora='one']", {
            xPercent: 24,
            yPercent: -18,
            scale: 1.25,
            duration: 5.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          }),
          gsap.to("[data-aurora='two']", {
            xPercent: -28,
            yPercent: 22,
            scale: 0.8,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            paused: true,
          }),
        ];
        const unsubscribeVisibility = subscribeToVisibility((isVisible) => {
          ambientAnimations.forEach((animation) =>
            animation.paused(!isVisible),
          );
        });

        const scrollSettings = {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        };

        gsap.to("[data-hero-scroll='base']", {
          yPercent: 8,
          scale: 1.045,
          ease: "none",
          scrollTrigger: scrollSettings,
        });
        gsap.to("[data-hero-scroll='subject']", {
          yPercent: 15,
          scale: 1.07,
          ease: "none",
          scrollTrigger: scrollSettings,
        });
        gsap.to("[data-hero-scroll='signals']", {
          yPercent: 23,
          scale: 1.09,
          ease: "none",
          scrollTrigger: scrollSettings,
        });
        gsap.to("[data-hero-rays]", {
          yPercent: 11,
          scale: 1.05,
          ease: "none",
          scrollTrigger: scrollSettings,
        });

        return () => {
          unregisterEntrance();
          unsubscribeVisibility();
        };
      });

      media.add("(max-width: 767px)", () => {
        const entranceTimeline = gsap
          .timeline({ paused: true })
          .fromTo(
            "[data-hero-mobile-actions]",
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.48,
              delay: 0.24,
              ease: "power3.out",
            },
          );

        return registerEntranceTimeline(entranceTimeline);
      });

      media.add("(min-width: 768px) and (pointer: fine)", () => {
        const layerConfig = [
          { selector: '[data-hero-depth="base"]', xAmount: -5, yAmount: -4 },
          { selector: '[data-hero-depth="subject"]', xAmount: 11, yAmount: 8 },
          { selector: '[data-hero-depth="signals"]', xAmount: 18, yAmount: 13 },
        ];

        const depthControllers = layerConfig.flatMap(
          ({ selector, xAmount, yAmount }) => {
            const element = section.querySelector<HTMLElement>(selector);
            if (!element) return [];

            gsap.set(element, { scale: 1.035, force3D: true });
            return [
              {
                xAmount,
                yAmount,
                xTo: gsap.quickTo(element, "x", {
                  duration: 0.72,
                  ease: "power3.out",
                }),
                yTo: gsap.quickTo(element, "y", {
                  duration: 0.72,
                  ease: "power3.out",
                }),
              },
            ];
          },
        );

        const rayField = section.querySelector<SVGGElement>("[data-hero-ray-field]");
        const rayOrigin = section.querySelector<SVGEllipseElement>(
          "[data-hero-ray-origin]",
        );
        const rayControllers = Array.from(
          section.querySelectorAll<SVGPathElement>("[data-hero-ray]"),
        ).map((ray, index) => ({
          factor: index + 1,
          xTo: gsap.quickTo(ray, "x", { duration: 0.9, ease: "power3.out" }),
          yTo: gsap.quickTo(ray, "y", { duration: 0.9, ease: "power3.out" }),
        }));

        if (rayField) {
          gsap.set(rayField, { transformOrigin: "1205px 344px", force3D: true });
        }

        const rayXTo = rayField
          ? gsap.quickTo(rayField, "x", { duration: 0.9, ease: "power3.out" })
          : null;
        const rayYTo = rayField
          ? gsap.quickTo(rayField, "y", { duration: 0.9, ease: "power3.out" })
          : null;
        const rayRotationTo = rayField
          ? gsap.quickTo(rayField, "rotation", {
              duration: 1.05,
              ease: "power3.out",
            })
          : null;
        const originXTo = rayOrigin
          ? gsap.quickTo(rayOrigin, "x", { duration: 0.72, ease: "power3.out" })
          : null;
        const originYTo = rayOrigin
          ? gsap.quickTo(rayOrigin, "y", { duration: 0.72, ease: "power3.out" })
          : null;

        const updateDepth = (normalizedX: number, normalizedY: number) => {
          depthControllers.forEach(({ xAmount, yAmount, xTo, yTo }) => {
            xTo(normalizedX * xAmount);
            yTo(normalizedY * yAmount);
          });

          rayXTo?.(normalizedX * 13);
          rayYTo?.(normalizedY * 10);
          rayRotationTo?.(normalizedX * 1.8 - normalizedY * 1.2);
          originXTo?.(normalizedX * 5);
          originYTo?.(normalizedY * 4);
          rayControllers.forEach(({ factor, xTo, yTo }) => {
            xTo(normalizedX * factor * 1.2);
            yTo(normalizedY * factor * 0.9);
          });

          section.style.setProperty(
            "--hero-x",
            `${((normalizedX + 1) / 2) * 100}%`,
          );
          section.style.setProperty(
            "--hero-y",
            `${((normalizedY + 1) / 2) * 100}%`,
          );
        };

        const handlePointerMove = (event: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          const normalizedX = gsap.utils.clamp(
            -1,
            1,
            ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          );
          const normalizedY = gsap.utils.clamp(
            -1,
            1,
            ((event.clientY - rect.top) / rect.height - 0.5) * 2,
          );
          updateDepth(normalizedX, normalizedY);
        };

        const handlePointerLeave = () => updateDepth(0, 0);

        let pointerListenersAttached = false;
        const setPointerListeners = (shouldAttach: boolean) => {
          if (shouldAttach && !pointerListenersAttached) {
            section.addEventListener("pointermove", handlePointerMove);
            section.addEventListener("pointerleave", handlePointerLeave);
            pointerListenersAttached = true;
            return;
          }

          if (!shouldAttach && pointerListenersAttached) {
            section.removeEventListener("pointermove", handlePointerMove);
            section.removeEventListener("pointerleave", handlePointerLeave);
            pointerListenersAttached = false;
            handlePointerLeave();
          }
        };
        const unsubscribeVisibility = subscribeToVisibility(setPointerListeners);

        return () => {
          unsubscribeVisibility();
          setPointerListeners(false);
          section.style.removeProperty("--hero-x");
          section.style.removeProperty("--hero-y");
        };
      });
    }, section);

    return () => {
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      window.removeEventListener(INTRO_HERO_REVEAL_EVENT, handleIntroReveal);
      entranceTimelines.clear();
      visibilitySubscribers.clear();
      media.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-light relative isolate overflow-hidden bg-[#f4f3f2] text-black md:flex md:min-h-[48rem] md:items-center md:py-24 lg:min-h-[52rem]"
    >
      <div className="absolute inset-0 -z-20 hidden overflow-hidden md:block">
        <div
          data-hero-scroll="base"
          className="absolute inset-0 will-change-transform"
        >
          <div
            data-hero-depth="base"
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={siteConfig.assets.heroBanner}
              alt="T. Thales trabalhando com notebook em um ambiente de estratégia digital."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <HeroVolumetricRays />

        <div
          data-hero-scroll="subject"
          aria-hidden="true"
          className="absolute inset-0 z-20 will-change-transform motion-reduce:hidden"
          style={{
            maskImage: subjectMask,
            WebkitMaskImage: subjectMask,
          }}
        >
          <div
            data-hero-depth="subject"
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={siteConfig.assets.heroBanner}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div
          data-hero-scroll="signals"
          aria-hidden="true"
          className="absolute inset-0 z-30 will-change-transform motion-reduce:hidden"
          style={{
            maskImage: notificationMask,
            WebkitMaskImage: notificationMask,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          <div
            data-hero-depth="signals"
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={siteConfig.assets.heroBanner}
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#f4f3f2] via-[#f4f3f2]/75 to-transparent md:block" />
      <div className="hero-reactive-glow pointer-events-none absolute inset-0 -z-10 hidden md:block" />
      <div
        data-aurora="one"
        className="pointer-events-none absolute -left-20 top-16 -z-10 hidden h-80 w-80 rounded-full bg-[rgba(245,169,0,0.22)] blur-[90px] will-change-transform motion-reduce:hidden md:block"
      />
      <div
        data-aurora="two"
        className="pointer-events-none absolute left-1/3 top-1/2 -z-10 hidden h-64 w-64 rounded-full bg-[rgba(255,212,71,0.18)] blur-[100px] will-change-transform motion-reduce:hidden md:block"
      />

      <Container className="relative z-10 hidden md:block">
        <div className="max-w-3xl text-left">
          <h1 className="font-display [perspective:900px] text-[clamp(2.35rem,11vw,3.3rem)] font-semibold leading-[0.92] tracking-[-0.03em] md:text-[clamp(2.9rem,8vw,6.5rem)] md:leading-[0.88]">
            <span className="block overflow-hidden">
              <span
                data-hero-title-line
                className="block origin-left text-black will-change-transform"
              >
                Transforme
              </span>
            </span>
            <span className="block overflow-hidden">
              <HeroLiquidMetalText>anúncios em clientes</HeroLiquidMetalText>
            </span>
            <span className="block overflow-hidden">
              <span
                data-hero-title-line
                className="block origin-left text-black will-change-transform"
              >
                para o seu negócio
              </span>
            </span>
          </h1>
          <p
            data-hero-copy
            className="mt-5 max-w-xl text-base leading-7 text-zinc-700 md:mt-6 md:text-lg md:leading-8"
          >
            Estratégias de tráfego pago, automação e atendimento inteligente para
            atrair oportunidades, melhorar seu processo comercial e aumentar suas
            vendas.
          </p>
          <div
            data-hero-actions
            className="mt-8 hidden flex-col gap-3 sm:flex-row md:flex"
          >
            <Button
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ArrowRight className="h-4 w-4" />}
              className="hero-cta-pulse"
              magnetic
            >
              Quero uma análise do meu negócio
            </Button>
            <Button href="#solucoes" variant="secondary" className="hero-secondary">
              Conhecer as soluções
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative md:hidden">
        <Image
          src={siteConfig.assets.heroBannerMobile}
          alt="T. Thales trabalhando com notebook."
          width={941}
          height={1672}
          priority
          className="h-auto w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-4 pb-5 pt-16">
          <p className="mx-auto mb-3 max-w-xs text-center font-display text-xl font-semibold leading-tight text-white">
            Mais clientes.{" "}
            <span className="text-[var(--color-gold-light)]">Mais crescimento.</span>
          </p>
          <div data-hero-mobile-actions className="flex flex-col gap-3">
            <Button
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full"
            >
              Quero aumentar minhas vendas
            </Button>
            <Button
              href="#solucoes"
              variant="secondary"
              className="hero-secondary w-full"
            >
              Conhecer as soluções
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
