"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
};

export function ServiceCard({
  title,
  description,
  icon: Icon,
  featured = false,
}: ServiceCardProps) {
  return (
    <div data-reveal>
      <motion.article
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={`h-full rounded-[1.75rem] p-6 md:p-7 ${
          featured
            ? "gold-glow border border-[rgba(245,169,0,0.22)] bg-[linear-gradient(180deg,rgba(245,169,0,0.14),rgba(255,255,255,0.02))]"
            : "surface-panel"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,169,0,0.18)] bg-[rgba(245,169,0,0.08)] text-[var(--color-gold-light)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
          {description}
        </p>
      </motion.article>
    </div>
  );
}
