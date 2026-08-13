// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AccretionDisk } from "@/components/originkit/ui/hero-30/accretion-disk";
import { Backdrop } from "@/components/originkit/ui/hero-30/backdrop";
import { LogoStrip } from "@/components/originkit/ui/hero-30/logo-strip";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import {
  INTRO_HERO_REVEAL_EVENT,
} from "@/components/intro/introHeroEvents";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { getWhatsAppUrl } from "@/config/site";

const GUTTER = "px-6 ipad:px-14";

const CTA =
  "inline-flex min-h-14 w-full items-center justify-center gap-2 px-5 py-3 font-geist-mono text-sm font-semibold tracking-[-0.03em] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] motion-reduce:transform-none min-[520px]:w-auto";

export const SectionHero = () => {
  const [revealTitle, setRevealTitle] = useState(false);

  useEffect(() => {
    const reveal = () => setRevealTitle(true);
    const phase = document.documentElement.dataset.universoIntro;

    if (!phase || phase === "completed" || phase === "revealing") {
      reveal();
    }

    window.addEventListener(INTRO_HERO_REVEAL_EVENT, reveal);
    return () => window.removeEventListener(INTRO_HERO_REVEAL_EVENT, reveal);
  }, []);

  return <section
    id="inicio"
    aria-labelledby="hero-30-title"
    className="animate-hero-reveal relative isolate flex min-h-[800px] w-full scroll-mt-24 flex-col overflow-hidden bg-black iphone:min-h-[848px] ipad:min-h-[1063px] desktop-sm:min-h-[clamp(832px,100dvh,1142px)]"
  >
    <div className="absolute inset-y-0 left-1/2 w-full max-w-[1920px] -translate-x-1/2">
      <Backdrop />
    </div>

    <SpaceParticles
      density="hero"
      className="opacity-75 [mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)]"
    />

    <div className="pointer-events-none absolute inset-0 left-1/2 z-[2] w-full max-w-[1920px] -translate-x-1/2">
      <AccretionDisk className="bottom-20 h-[297px] w-[370px] ipad:bottom-[85px] ipad:h-[520px] ipad:w-[647px] desktop-sm:bottom-[85px] desktop-sm:left-[72%] desktop-sm:aspect-[673/540] desktop-sm:h-auto desktop-sm:w-[min(54%,960px)]" />
    </div>

    <div className="relative z-10 mx-auto flex min-h-[800px] w-full max-w-[1920px] flex-1 flex-col pt-28 iphone:min-h-[848px] ipad:min-h-[1063px] ipad:pt-32 desktop-sm:min-h-[clamp(832px,100dvh,1142px)] desktop-sm:pt-36">
      <div
        className={`flex flex-col items-start ${GUTTER}`}
      >
        <div className="flex max-w-[760px] flex-col items-start gap-7">
          <div className="flex flex-col items-start gap-3">
            <div id="hero-30-title">
              <BlurReveal
                as="h1"
                trigger={revealTitle}
                delay={0.08}
                speedReveal={1.25}
                speedSegment={0.72}
                className="max-w-[15ch] font-geist-mono text-[clamp(2.5rem,11.2vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.07em] text-white"
              >
                Sua marca precisa de um universo maior.
              </BlurReveal>
            </div>
            <p className="max-w-[610px] font-tight text-sm leading-7 text-white/60 ipad:text-base ipad:leading-8">
              Planejamos campanhas, criamos conteúdo e organizamos a operação digital para gerar mais oportunidades de venda.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 items-center gap-2 min-[520px]:flex min-[520px]:flex-wrap">
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
          </div>
        </div>
      </div>

      <div aria-hidden className="flex-1" />

      <LogoStrip />
    </div>
  </section>;
};
