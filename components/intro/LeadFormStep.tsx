"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LeadFormStepProps = {
  children: ReactNode;
  stepKey: string;
  direction?: number;
};

export function LeadFormStep({ children, stepKey, direction = 1 }: LeadFormStepProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reducedMotion ? 0 : direction * -18 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
