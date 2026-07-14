"use client";

import { type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type IntroActionCardProps = {
  icon: LucideIcon;
  title: string;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const cardClasses =
  "group relative flex min-h-16 w-full items-center overflow-hidden rounded-[1.15rem] border border-[#ffca36] bg-gradient-to-r from-[#f5a900] to-[#ffc72c] p-3 text-left text-black shadow-[0_12px_30px_rgba(245,169,0,0.12)] transition hover:brightness-105 focus-visible:border-white sm:p-4";

function CardContent({
  icon: Icon,
  title,
}: IntroActionCardProps) {
  return (
    <div className="relative flex w-full items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-black/10 text-black transition group-hover:bg-black/15">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="font-display text-lg font-bold text-black sm:text-xl">
        {title}
      </h3>
    </div>
  );
}

export function IntroActionCard(props: IntroActionCardProps) {
  if (props.href && !props.disabled) {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-label={props.title}
      className={cardClasses}
      >
        <CardContent {...props} />
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      whileHover={props.disabled ? undefined : { y: -3, scale: 1.01 }}
      whileTap={props.disabled ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      aria-label={
        props.disabled ? `${props.title} - Agenda em configuração` : props.title
      }
      className={`${cardClasses} disabled:cursor-not-allowed`}
    >
      <CardContent {...props} />
    </motion.button>
  );
}
