"use client";

import { ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { type MouseEventHandler } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type IntroActionCardVariant = "primary" | "secondary" | "tertiary";

type IntroActionCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: IntroActionCardVariant;
  href?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const baseClasses =
  "group relative flex min-h-[5.25rem] w-full items-center overflow-hidden rounded-[1.2rem] border p-3.5 text-left outline-none transition-[border-color,background-color,box-shadow,filter] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] sm:p-4";

const variantClasses: Record<IntroActionCardVariant, string> = {
  primary:
    "border-[#ffd766] bg-gradient-to-r from-[#f5a900] via-[#f8b916] to-[#ffd14a] text-black shadow-[0_16px_45px_rgba(245,169,0,0.16)] hover:brightness-[1.04]",
  secondary:
    "border-[rgba(245,169,0,0.34)] bg-[linear-gradient(110deg,rgba(245,169,0,0.12),rgba(255,255,255,0.025))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] hover:border-[rgba(255,207,73,0.58)] hover:bg-[linear-gradient(110deg,rgba(245,169,0,0.17),rgba(255,255,255,0.04))]",
  tertiary:
    "border-white/10 bg-white/[0.025] text-white hover:border-white/20 hover:bg-white/[0.045]",
};

const iconClasses: Record<IntroActionCardVariant, string> = {
  primary: "border-black/10 bg-black/10 text-black group-hover:bg-black/15",
  secondary:
    "border-[rgba(245,169,0,0.28)] bg-[rgba(245,169,0,0.1)] text-[var(--color-gold-light)] group-hover:bg-[rgba(245,169,0,0.15)]",
  tertiary:
    "border-white/10 bg-white/[0.04] text-zinc-300 group-hover:border-[rgba(245,169,0,0.25)] group-hover:text-[var(--color-gold-light)]",
};

function CardContent({
  icon: Icon,
  title,
  description,
  variant = "primary",
  external = false,
}: Pick<IntroActionCardProps, "icon" | "title" | "description" | "variant"> & {
  external?: boolean;
}) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const isPrimary = variant === "primary";

  return (
    <div className="relative flex w-full min-w-0 items-center gap-3.5 sm:gap-4">
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] border transition-colors duration-300 ${iconClasses[variant]}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block font-display text-base font-semibold leading-tight sm:text-lg ${
            isPrimary ? "text-black" : "text-white"
          }`}
        >
          {title}
        </span>
        <span
          className={`mt-1 block text-xs leading-relaxed sm:text-[0.82rem] ${
            isPrimary ? "text-black/65" : "text-zinc-400"
          }`}
        >
          {description}
        </span>
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-300 group-hover:translate-x-0.5 ${
          isPrimary
            ? "border-black/10 bg-black/[0.08] text-black"
            : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-[rgba(245,169,0,0.3)] group-hover:text-[var(--color-gold-light)]"
        }`}
      >
        <Arrow className="h-4 w-4" aria-hidden="true" />
      </span>
    </div>
  );
}

export function IntroActionCard({
  variant = "primary",
  ...props
}: IntroActionCardProps) {
  const reducedMotion = useReducedMotion();
  const interaction = reducedMotion ? undefined : { y: -2, scale: 1.006 };
  const classes = `${baseClasses} ${variantClasses[variant]} disabled:cursor-not-allowed disabled:opacity-45`;

  if (props.href && !props.disabled) {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={interaction}
        whileTap={reducedMotion ? undefined : { scale: 0.992 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        aria-label={`${props.title} — abre em uma nova aba`}
        className={classes}
      >
        <CardContent {...props} variant={variant} external />
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      whileHover={props.disabled ? undefined : interaction}
      whileTap={
        props.disabled || reducedMotion ? undefined : { scale: 0.992 }
      }
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-label={
        props.disabled ? `${props.title} — agenda em configuração` : props.title
      }
      className={classes}
    >
      <CardContent {...props} variant={variant} />
    </motion.button>
  );
}
