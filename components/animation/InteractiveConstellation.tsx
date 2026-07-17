"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type InteractiveConstellationProps = {
  className?: string;
};

const paths = [
  "M64 388 C142 284 206 324 278 226 S432 132 574 90",
  "M78 134 C184 84 236 180 322 164 S472 178 586 280",
  "M126 462 C214 390 324 432 374 330 S490 254 590 280",
];

const nodes = [
  [64, 388], [78, 134], [126, 462], [278, 226], [322, 164],
  [374, 330], [574, 90], [586, 280], [590, 280],
] as const;

/** Decorative SVG network whose light source follows fine-pointer movement. */
export function InteractiveConstellation({ className = "" }: InteractiveConstellationProps) {
  const reducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const rawX = useMotionValue(320);
  const rawY = useMotionValue(250);
  const x = useSpring(rawX, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.4 });
  const gradientId = useId().replace(/:/g, "");
  const animationActive = !reducedMotion && isInViewport && isDocumentVisible;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            setIsInViewport(entry.isIntersecting);
            handleVisibilityChange();
          })
        : null;
    const fallbackFrame = observer
      ? null
      : window.requestAnimationFrame(() => {
          setIsInViewport(true);
          handleVisibilityChange();
        });

    observer?.observe(svg);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (fallbackFrame !== null) window.cancelAnimationFrame(fallbackFrame);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>) => {
    if (reducedMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width) * 640);
    rawY.set(((event.clientY - rect.top) / rect.height) * 520);
  };

  return (
    <motion.svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 640 520"
      className={`select-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => { rawX.set(320); rawY.set(250); }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <defs>
        <radialGradient id={gradientId}>
          <stop offset="0" stopColor="var(--color-gold-light)" stopOpacity="0.26" />
          <stop offset="0.45" stopColor="var(--color-gold)" stopOpacity="0.08" />
          <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.circle cx={x} cy={y} r="150" fill={`url(#${gradientId})`} />

      {paths.map((path, index) => (
        <motion.path
          key={path}
          d={path}
          fill="none"
          stroke={index === 1 ? "rgba(255,255,255,0.09)" : "rgba(245,169,0,0.2)"}
          strokeWidth="1.2"
          strokeDasharray={index === 1 ? "3 9" : undefined}
          initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ amount: 0.25 }}
          transition={{ duration: 1.7, delay: index * 0.16, ease: "easeInOut" }}
        />
      ))}

      {nodes.map(([cx, cy], index) => (
        <motion.g key={`${cx}-${cy}`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={10}
            fill="rgba(245,169,0,0.08)"
            stroke="rgba(245,169,0,0.2)"
            animate={animationActive ? { scale: [0.8, 1.3, 0.8], opacity: [0.35, 0.75, 0.35] } : { scale: 1, opacity: 1 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            transition={animationActive
              ? { duration: 3.2, delay: index * 0.18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              : { duration: 0 }}
          />
          <circle cx={cx} cy={cy} r="2.5" fill="var(--color-gold-light)" />
        </motion.g>
      ))}

      {animationActive ? paths.slice(0, 2).map((path, index) => (
        <circle key={`pulse-${path}`} r="3.5" fill="var(--color-gold-light)" className="drop-shadow-[0_0_7px_rgba(245,169,0,0.95)]">
          <animateMotion path={path} dur={`${6.5 + index * 1.4}s`} begin={`${index * -2.4}s`} repeatCount="indefinite" />
        </circle>
      )) : null}
    </motion.svg>
  );
}
