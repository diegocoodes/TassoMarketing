"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 88%", "end 48%"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const alignment = align === "center" ? "mx-auto text-center" : "mx-auto text-center md:mx-0 md:text-left";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`.trim()}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 ref={headingRef} className="font-display relative mt-5 text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.95] tracking-tight">
        <span className="block text-white/20">{title}</span>
        <motion.span
          aria-hidden="true"
          className="scroll-fill-text absolute inset-0 block"
          style={{ clipPath: reducedMotion ? "inset(0 0% 0 0)" : clipPath }}
        >
          {title}
        </motion.span>
      </h2>
      {description ? (
        <p className={`mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg ${align === "center" ? "mx-auto" : "mx-auto md:mx-0"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
