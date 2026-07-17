"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(track, { xPercent: -50, duration: 58, repeat: -1, ease: "none", paused: true });
    let active = false;
    let hovered = false;
    const settle = gsap.delayedCall(0.14, () => {
      if (!hovered) gsap.to(tween, { timeScale: 1, duration: 0.9, overwrite: true });
    }).pause();
    const visibilityTrigger = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onToggle(self) {
        active = self.isActive;
        tween.paused(!active);
      },
    });
    const velocityTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        if (!active || hovered) return;
        const boost = gsap.utils.clamp(1, 2.2, 1 + Math.abs(self.getVelocity()) / 1600);
        gsap.to(tween, { timeScale: boost, duration: 0.16, overwrite: true });
        settle.restart(true);
      },
    });
    const slow = () => { hovered = true; settle.pause(); gsap.to(tween, { timeScale: 0.18, duration: 0.35 }); };
    const resume = () => { hovered = false; gsap.to(tween, { timeScale: 1, duration: 0.5 }); };
    track.addEventListener("pointerenter", slow);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("focusin", slow);
    track.addEventListener("focusout", resume);
    return () => { track.removeEventListener("pointerenter", slow); track.removeEventListener("pointerleave", resume); track.removeEventListener("focusin", slow); track.removeEventListener("focusout", resume); settle.kill(); visibilityTrigger.kill(); velocityTrigger.kill(); tween.kill(); };
  }, [reducedMotion]);

  return (
    <section className="overflow-hidden border-y border-[rgba(245,169,0,0.15)] bg-[rgba(245,169,0,0.04)] py-5" aria-label="Especialidades da Universo Marketing">
      <div
        ref={trackRef}
        className="font-display type-section-subtitle flex w-max whitespace-nowrap uppercase text-[var(--color-gold-light)]"
      >
        <span>{message.repeat(5)}</span>
        <span aria-hidden="true">{message.repeat(5)}</span>
      </div>
    </section>
  );
}
