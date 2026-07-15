"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type SpotlightCardProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function SpotlightCard({ children, className = "", ...props }: SpotlightCardProps) {
  return (
    <motion.div
      {...props}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
