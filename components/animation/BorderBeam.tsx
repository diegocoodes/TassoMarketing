"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type BorderBeamProps = {
  className?: string;
  delay?: number;
  duration?: number;
  radius?: number;
};

/** A source-owned, shadcn-style animated border that only paints SVG strokes. */
export function BorderBeam({
  className = "",
  delay = 0,
  duration = 5,
  radius = 20,
}: BorderBeamProps) {
  const reducedMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const beamRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const beam = beamRef.current;
    if (!svg || !beam || reducedMotion) return;

    let isInViewport = !("IntersectionObserver" in window);
    let isDocumentVisible = document.visibilityState === "visible";
    const animation = beam.animate(
      [{ strokeDashoffset: "0" }, { strokeDashoffset: "-1" }],
      {
        delay: Math.max(0, delay * 1000),
        duration: Math.max(1, duration * 1000),
        easing: "linear",
        iterations: Number.POSITIVE_INFINITY,
      },
    );
    animation.pause();
    animation.currentTime = 0;

    const syncAnimation = () => {
      if (isInViewport && isDocumentVisible) animation.play();
      else animation.pause();
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      syncAnimation();
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            isInViewport = entry.isIntersecting;
            syncAnimation();
          })
        : null;

    observer?.observe(svg);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    syncAnimation();

    return () => {
      animation.cancel();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [delay, duration, reducedMotion]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible ${className}`}
      fill="none"
      preserveAspectRatio="none"
    >
      <rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={radius}
        stroke="rgba(245,169,0,0.12)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        ref={beamRef}
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx={radius}
        pathLength="1"
        stroke="var(--color-gold-light)"
        strokeDasharray="0.14 0.86"
        strokeLinecap="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className="drop-shadow-[0_0_7px_rgba(245,169,0,0.9)]"
        strokeDashoffset="0"
      />
    </svg>
  );
}
