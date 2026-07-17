"use client";

import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SpotlightCardProps = HTMLMotionProps<"div"> & { children: ReactNode };

export function SpotlightCard({
  children,
  className = "",
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: SpotlightCardProps) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), { stiffness: 220, damping: 24 });

  return (
    <motion.div
      {...props}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
        if (!reducedMotion && event.pointerType !== "touch") {
          pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
          pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        pointerX.set(0);
        pointerY.set(0);
        onPointerLeave?.(event);
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{
        ...style,
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  );
}
