"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEventHandler, PointerEventHandler, ReactNode } from "react";
import { useEffect, useState } from "react";
import { animationConfig } from "@/config/animation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  magnetic?: boolean;
};

const variantClasses = {
  primary:
    "bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-deep)] text-black shadow-[0_18px_48px_rgba(245,169,0,0.18)] hover:text-black",
  secondary:
    "border border-[var(--color-line-strong)] bg-white/5 text-white hover:border-[rgba(245,169,0,0.45)] hover:bg-white/8",
  ghost:
    "border border-white/10 bg-transparent text-[var(--color-text-soft)] hover:border-white/20 hover:text-white",
} as const;

export function Button({
  children,
  className = "",
  variant = "primary",
  icon,
  ariaLabel,
  magnetic = false,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [finePointer, setFinePointer] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handlePointerMove: PointerEventHandler<HTMLAnchorElement> = (event) => {
    if (!magnetic || !finePointer || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * animationConfig.magnetic.maxOffset * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * animationConfig.magnetic.maxOffset * 2);
  };

  return (
    <motion.a
      whileHover={isMobile ? undefined : { y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-label={ariaLabel}
      data-cursor-label="ABRIR"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { rawX.set(0); rawY.set(0); }}
      style={magnetic && !isMobile ? { x, y } : undefined}
      className={`premium-button group relative isolate mx-auto inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-center text-sm font-semibold tracking-[0.02em] transition sm:mx-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="absolute inset-0 -z-10 translate-y-[102%] bg-[var(--color-gold-light)] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:translate-y-0" aria-hidden="true" />
      <span className="button-glint pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" aria-hidden="true" />
      <span className="transition-colors group-hover:text-black group-focus-visible:text-black">{children}</span>
      <span className="transition duration-200 group-hover:translate-x-1 group-hover:text-black group-focus-visible:translate-x-1 group-focus-visible:text-black">{icon}</span>
    </motion.a>
  );
}
