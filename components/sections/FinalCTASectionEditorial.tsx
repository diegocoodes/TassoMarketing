"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/config/site";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function FinalCTASectionEditorial() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isMobile || !sectionRef.current || !orbitRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        orbitRef.current,
        { scale: 0.82 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => context.revert();
  }, [isMobile, reducedMotion]);

  return (
    <section ref={sectionRef} id="contato" className="scroll-mt-24 px-2 pb-2 md:px-4 md:pb-4">
      <div className="agency-cta relative overflow-hidden rounded-[2rem] bg-[var(--color-gold)] px-4 py-20 text-black sm:px-8 md:rounded-[3.5rem] md:px-10 md:py-28 lg:py-36">
        <div ref={orbitRef} className="agency-cta-orbit" aria-hidden="true" />
        <Container className="relative z-10 text-center">
          <h2 className="mx-auto max-w-[13ch] text-[clamp(2.75rem,7vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
            {["Vamos expandir o", "universo da sua marca?"].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block"
                  initial={reducedMotion ? false : { y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-black/70 md:text-lg"
          >
            Conte o cenário atual e a meta da empresa. Vamos avaliar canais, orçamento e os próximos passos.
          </motion.p>
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex justify-center"
          >
            <Button
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="w-full !border-black/20 !bg-black !text-white hover:!border-black sm:w-auto"
              icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
            >
              Conversar com a agência
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
