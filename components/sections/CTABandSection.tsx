"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const message = "Tráfego pago • Automação • Inteligência artificial • CRM • SEO • Agendamento • Estratégia digital • ";

export function CTABandSection() {
  const reducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;
    const tween = gsap.to(track, { xPercent: -50, duration: 32, repeat: -1, ease: "none" });
    const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.3 });
    const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.3 });
    track.addEventListener("pointerenter", slow);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", slow);
    track.addEventListener("focusout", resume);
    return () => { track.removeEventListener("pointerenter", slow); track.removeEventListener("pointerleave", resume); track.removeEventListener("focusin", slow); track.removeEventListener("focusout", resume); tween.kill(); };
  }, [reducedMotion]);

  return (
    <section className="overflow-hidden border-y border-[rgba(245,169,0,0.15)] bg-[rgba(245,169,0,0.04)] py-5" aria-label="Especialidades da Universo Marketing">
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap font-display text-lg font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-light)] md:text-xl"
      >
        <span>{message.repeat(8)}</span>
        <span aria-hidden="true">{message.repeat(8)}</span>
      </div>
    </section>
  );
}
