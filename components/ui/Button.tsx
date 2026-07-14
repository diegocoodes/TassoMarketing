"use client";

import { motion } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";

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
  ...props
}: ButtonProps) {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-label={ariaLabel}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-[0.02em] transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </motion.a>
  );
}
