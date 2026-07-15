"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.25 });

  if (reducedMotion || isMobile) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-[var(--color-gold-deep)] via-[var(--color-gold-light)] to-white"
      style={{ scaleX }}
    />
  );
}
