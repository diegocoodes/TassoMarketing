"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const position = useMousePosition(enabled);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => {
      const nextEnabled = media.matches && !reducedMotion;
      setEnabled(nextEnabled);
    };
    update();
    media.addEventListener("change", update);
    return () => {
      media.removeEventListener("change", update);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;
    const over = (event: PointerEvent) => setInteractive(Boolean((event.target as Element)?.closest("a,button,[data-cursor]")));
    window.addEventListener("pointerover", over, { passive: true });
    return () => window.removeEventListener("pointerover", over);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] h-11 w-11 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-[rgba(245,169,0,0.65)] bg-black shadow-[0_0_22px_rgba(245,169,0,0.55)]"
      animate={{ scale: interactive ? 1.22 : 1, rotate: interactive ? 8 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ x: position.x, y: position.y }}
    >
      <span className="absolute inset-0 scale-[2.15] bg-[url('/images/brand/icone-universo-dourado.png')] bg-contain bg-center bg-no-repeat" />
    </motion.div>
  );
}
