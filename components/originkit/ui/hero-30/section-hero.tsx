// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { AccretionDisk } from "@/components/originkit/ui/hero-30/accretion-disk";
import { Backdrop } from "@/components/originkit/ui/hero-30/backdrop";
import { LogoStrip } from "@/components/originkit/ui/hero-30/logo-strip";
import {
  INTRO_HERO_REVEAL_EVENT,
} from "@/components/intro/introHeroEvents";
import { getWhatsAppUrl } from "@/config/site";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GUTTER = "px-6 ipad:px-14";

const CTA =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 px-5 py-3 font-geist-mono text-sm font-semibold tracking-[-0.03em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] motion-reduce:transform-none min-[520px]:w-auto";

export const SectionHero = () => {
  const [revealTitle, setRevealTitle] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const reveal = () => setRevealTitle(true);
    const phase = document.documentElement.dataset.universoIntro;

    if (!phase || phase === "completed" || phase === "revealing") {
      reveal();
    }

    window.addEventListener(INTRO_HERO_REVEAL_EVENT, reveal);
    return () => window.removeEventListener(INTRO_HERO_REVEAL_EVENT, reveal);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current || !orbitRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(orbitRef.current, {
        y: 80,
        rotation: 20,
        scale: 0.94,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return <section
    ref={sectionRef}
    id="inicio"
    aria-labelledby="hero-30-title"
    className="animate-hero-reveal relative isolate flex min-h-[800px] w-full scroll-mt-24 flex-col overflow-hidden bg-black iphone:min-h-[848px] ipad:min-h-[1063px] desktop-sm:min-h-[clamp(832px,100dvh,1142px)]"
  >
    <div className="absolute inset-y-0 left-1/2 w-full max-w-[1920px] -translate-x-1/2">
      <Backdrop />
    </div>

    <SpaceParticles
      density="hero"
      className="opacity-60 [mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)]"
    />

    <div className="pointer-events-none absolute inset-0 left-1/2 z-[2] w-full max-w-[1920px] -translate-x-1/2">
      <motion.div
        className="absolute inset-0"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={revealTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.64, ease: [0.22, 1, 0.36, 1] }}
      >
        <div ref={orbitRef} className="absolute inset-0 origin-center">
          <AccretionDisk className="bottom-20 h-[270px] w-[336px] iphone:h-[285px] iphone:w-[355px] ipad:bottom-[85px] ipad:h-[500px] ipad:w-[622px] desktop-sm:bottom-[85px] desktop-sm:left-[72%] desktop-sm:aspect-[673/540] desktop-sm:h-auto desktop-sm:w-[min(54%,960px)]" />
        </div>
      </motion.div>
    </div>

    <div className="relative z-10 mx-auto flex min-h-[800px] w-full max-w-[1920px] flex-1 flex-col pt-28 iphone:min-h-[848px] ipad:min-h-[1063px] ipad:pt-32 desktop-sm:min-h-[clamp(832px,100dvh,1142px)] desktop-sm:pt-36">
      <div
        className={`flex flex-col items-start ${GUTTER}`}
      >
        <div className="flex w-full max-w-[760px] flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-5">
            <h1
              id="hero-30-title"
              className="max-w-[16ch] font-geist-mono text-[clamp(2.1rem,9.2vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.07em] text-white"
            >
              {["Sua marca", "precisa de um", "universo maior."].map((line, index) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={reducedMotion ? false : { y: "110%" }}
                    animate={revealTitle ? { y: 0 } : { y: "110%" }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.9,
                      delay: reducedMotion ? 0 : 0.08 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={revealTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[36rem] font-tight text-[0.94rem] leading-7 text-white/65 ipad:text-base ipad:leading-8"
            >
              Planejamos campanhas, criamos conteúdo e organizamos a operação digital para gerar mais oportunidades de venda.
            </motion.p>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={revealTitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
            className="grid w-full grid-cols-1 items-center gap-3 min-[520px]:flex min-[520px]:flex-wrap"
          >
            <a
              href="#servicos"
              className={`bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)] ${CTA}`}
            >
              Explorar soluções
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`border border-white/15 bg-white text-black hover:bg-zinc-200 ${CTA}`}
            >
              Iniciar conversa
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>

      <div aria-hidden className="flex-1" />

      <LogoStrip />
    </div>
  </section>;
};
