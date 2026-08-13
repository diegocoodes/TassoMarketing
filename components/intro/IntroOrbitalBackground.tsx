"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

type IntroOrbitalBackgroundProps = {
  reducedMotion: boolean;
};

const stars = [
  [92, 126, 1.4, 0.38],
  [176, 695, 1.1, 0.26],
  [242, 245, 1.7, 0.48],
  [328, 762, 1.2, 0.34],
  [391, 111, 1, 0.3],
  [482, 570, 1.5, 0.44],
  [551, 205, 1.1, 0.32],
  [638, 814, 1.3, 0.35],
  [712, 82, 1.6, 0.45],
  [786, 694, 1.1, 0.28],
  [864, 181, 1.3, 0.4],
  [946, 789, 1.5, 0.42],
  [1018, 267, 1.1, 0.3],
  [1093, 663, 1.7, 0.46],
  [1181, 102, 1.2, 0.32],
  [1262, 545, 1.4, 0.38],
  [1354, 228, 1.1, 0.34],
  [1390, 746, 1.5, 0.4],
] as const;

export function IntroOrbitalBackground({
  reducedMotion,
}: IntroOrbitalBackgroundProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 42, damping: 24, mass: 0.8 });
  const y = useSpring(pointerY, { stiffness: 42, damping: 24, mass: 0.8 });

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(pointer: coarse)").matches) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 12);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 10);
    };
    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", resetPointer);
    };
  }, [pointerX, pointerY, reducedMotion]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <motion.div className="absolute -inset-8" style={{ x, y }}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-75"
        >
          {stars.map(([cx, cy, radius, opacity]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={radius}
              fill="#ffd45b"
              opacity={opacity}
            />
          ))}

          <g>
            <motion.ellipse
              cx="720"
              cy="450"
              rx="610"
              ry="205"
              transform="rotate(-12 720 450)"
              fill="none"
              stroke="rgba(245,169,0,0.34)"
              strokeWidth="1.1"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <circle cx="1294" cy="325" r="3.4" fill="#ffd45b" />
          </g>

          <g>
            <motion.ellipse
              cx="720"
              cy="450"
              rx="470"
              ry="300"
              transform="rotate(18 720 450)"
              fill="none"
              stroke="rgba(245,169,0,0.24)"
              strokeWidth="0.8"
              strokeDasharray="2 9"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.72 }}
              transition={{ duration: 1.65, delay: 0.12, ease: "easeOut" }}
            />
            <circle cx="278" cy="558" r="2.6" fill="#f5a900" opacity="0.86" />
          </g>

          <motion.ellipse
            cx="720"
            cy="450"
            rx="335"
            ry="126"
            transform="rotate(-28 720 450)"
            fill="none"
            stroke="rgba(245,169,0,0.22)"
            strokeWidth="0.7"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.62 }}
            transition={{ duration: 1.3, delay: 0.22, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
