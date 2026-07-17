"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorVisibleRef = useRef(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState("");
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const cursorX = useSpring(rawX, { stiffness: 900, damping: 54, mass: 0.18 });
  const cursorY = useSpring(rawY, { stiffness: 900, damping: 54, mass: 0.18 });
  const trail1X = useSpring(rawX, { stiffness: 280, damping: 28, mass: 0.3 });
  const trail1Y = useSpring(rawY, { stiffness: 280, damping: 28, mass: 0.3 });
  const trail2X = useSpring(rawX, { stiffness: 170, damping: 26, mass: 0.45 });
  const trail2Y = useSpring(rawY, { stiffness: 170, damping: 26, mass: 0.45 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => {
      const nextEnabled =
        media.matches &&
        !reducedMotion &&
        document.visibilityState === "visible";
      setEnabled(nextEnabled);
      if (!nextEnabled && cursorVisibleRef.current) {
        cursorVisibleRef.current = false;
        setCursorVisible(false);
      }
    };
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      if (!cursorVisibleRef.current) {
        cursorVisibleRef.current = true;
        setCursorVisible(true);
      }
    };

    const hide = () => {
      if (cursorVisibleRef.current) {
        cursorVisibleRef.current = false;
        setCursorVisible(false);
      }
      setInteractive(false);
      setLabel("");
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const over = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const explicit = target?.closest<HTMLElement>("[data-cursor-label]");
      const actionable = target?.closest<HTMLElement>("a,button,[data-cursor]");
      const nextInteractive = Boolean(actionable);

      setInteractive(nextInteractive);
      setLabel(
        explicit?.dataset.cursorLabel ??
          (actionable?.matches("a,button") ? "ABRIR" : nextInteractive ? "VER" : ""),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled || !cursorVisible) return null;

  const trail = [
    { x: trail1X, y: trail1Y, size: 8, opacity: 0.34 },
    { x: trail2X, y: trail2Y, size: 6, opacity: 0.26 },
  ];

  return (
    <>
      {trail.map((particle, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[190] rounded-full bg-[var(--color-gold-light)] shadow-[0_0_12px_rgba(245,169,0,0.75)]"
          style={{
            x: particle.x,
            y: particle.y,
            width: particle.size,
            height: particle.size,
            marginLeft: particle.size / -2,
            marginTop: particle.size / -2,
            opacity: particle.opacity,
          }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-[rgba(245,169,0,0.65)] bg-black shadow-[0_0_22px_rgba(245,169,0,0.55)]"
        animate={{
          width: label ? 76 : 44,
          height: label ? 34 : 44,
          scale: interactive ? 1.08 : 1,
          rotate: label ? 0 : interactive ? 8 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ x: cursorX, y: cursorY }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[0.58rem] font-bold tracking-[0.16em] text-[var(--color-gold-light)]"
            >
              {label}
            </motion.span>
          ) : (
            <motion.span
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 scale-[2.15] bg-[url('/images/brand/icone-universo-dourado.png')] bg-contain bg-center bg-no-repeat"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
