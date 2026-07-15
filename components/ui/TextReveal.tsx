"use client";

import { motion, type Variants } from "motion/react";
type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
};

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delayChildren: delay, staggerChildren: 0.055 },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  return (
    <motion.span aria-label={children} className={className} custom={delay} initial="hidden" animate="visible" variants={container}>
      {children.split(/(\s+)/).map((segment, index) => (
        <motion.span aria-hidden="true" className="inline-block whitespace-pre" key={`${segment}-${index}`} variants={word}>
          {segment}
        </motion.span>
      ))}
    </motion.span>
  );
}
