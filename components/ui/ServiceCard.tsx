"use client";

import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/animation/SpotlightCard";

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
      <SpotlightCard
        className={`h-full rounded-[1.75rem] p-6 md:p-7 ${
          featured
            ? "bg-[linear-gradient(180deg,rgba(245,169,0,0.14),rgba(255,255,255,0.025))]"
            : "bg-white/[0.025]"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(245,169,0,0.1)] text-[var(--color-gold-light)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="font-display type-section-subtitle mt-6 text-white">{title}</h3>
        <p className="type-body-md mt-4 text-[var(--color-text-muted)]">
          {description}
        </p>
      </SpotlightCard>
    </div>
  );
}
