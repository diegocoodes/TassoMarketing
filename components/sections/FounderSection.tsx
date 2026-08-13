"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const expertise = [
  "Planejamento de campanhas",
  "Análise de mídia e conversão",
  "CRM e automações",
  "Acompanhamento direto",
] as const;

export function FounderSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden py-12 md:py-24">
      <SpaceParticles density="minimal" className="opacity-24" />
      <Container className="relative z-10">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111216] lg:grid-cols-[0.92fr_1.08fr] lg:rounded-[2.5rem]">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[27rem] overflow-hidden bg-[#08090b] sm:min-h-[36rem] lg:min-h-[46rem]"
          >
            <Image
              src={siteConfig.assets.tassoPortrait}
              alt="Fundador e estrategista da Universo Marketing"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover object-[center_25%]"
            />
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.28 }}
            transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center p-7 sm:p-10 lg:p-14 xl:p-20"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Fundador & estrategista</p>
              <h2 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">Tasso Thales</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-zinc-300 md:text-lg md:leading-9">
                Tasso Thales fundou a Universo para reunir planejamento e execução no mesmo time. Ele acompanha as contas, participa das decisões de campanha e mantém contato direto com cada cliente.
              </p>
              <ul className="mt-9 grid border-t border-white/10 text-sm text-zinc-300 sm:grid-cols-2">
                {expertise.map((item) => (
                  <li key={item} className="border-b border-white/10 py-4 sm:odd:pr-4 sm:even:pl-4">{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
