"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HolographicServiceCardProps = {
  children: ReactNode;
  className?: string;
};

const spring = { stiffness: 180, damping: 24, mass: 0.7 };

export function HolographicServiceCard({
  children,
  className = "",
}: HolographicServiceCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  const rotateX = useSpring(rotateXValue, spring);
  const rotateY = useSpring(rotateYValue, spring);

  const updateShine = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch") {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--holo-x", `${x * 100}%`);
    card.style.setProperty("--holo-y", `${y * 100}%`);
    card.style.setProperty("--holo-band", `${115 - x * 140}%`);
    card.style.setProperty(
      "--holo-angle",
      `${Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90}deg`,
    );

    rotateXValue.set((0.5 - y) * 5);
    rotateYValue.set((x - 0.5) * 6);
  };

  const resetShine = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--holo-x", "50%");
    event.currentTarget.style.setProperty("--holo-y", "50%");
    event.currentTarget.style.setProperty("--holo-band", "50%");
    rotateXValue.set(0);
    rotateYValue.set(0);
  };

  return (
    <motion.article
      onPointerMove={updateShine}
      onPointerLeave={resetShine}
      style={{
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`group relative isolate overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#121214,#080809)] shadow-[inset_-4px_0_0_var(--color-gold),inset_0_-4px_0_var(--color-gold)] ${className}`.trim()}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          background:
            "radial-gradient(circle at var(--holo-x,50%) var(--holo-y,50%),rgba(255,212,71,.22) 0,rgba(245,169,0,.1) 22%,transparent 53%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[35%] z-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-70 motion-reduce:transition-none"
        style={{
          background:
            "linear-gradient(var(--holo-angle,125deg),transparent 35%,rgba(255,255,255,.12) 45%,rgba(255,212,71,.3) 50%,rgba(233,144,0,.14) 55%,transparent 65%)",
          backgroundPositionX: "var(--holo-band,50%)",
          backgroundSize: "220% 220%",
          transform: "translateZ(30px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-0 rounded-[calc(1rem-1px)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          background:
            "conic-gradient(from var(--holo-angle,125deg) at var(--holo-x,50%) var(--holo-y,50%),transparent 0deg,rgba(255,212,71,.16) 35deg,transparent 85deg,rgba(255,255,255,.08) 180deg,transparent 230deg)",
          maskImage:
            "linear-gradient(#000,#000) content-box,linear-gradient(#000,#000)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full" style={{ transform: "translateZ(18px)" }}>
        {children}
      </div>
    </motion.article>
  );
}
