"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LeadFormStepProps = {
  children: ReactNode;
  stepKey: string;
};

export function LeadFormStep({ children, stepKey }: LeadFormStepProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
      transition={{ duration: reducedMotion ? 0.12 : 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
