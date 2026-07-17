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

  const orbitTransition = reducedMotion
    ? undefined
    : { duration: 52, repeat: Infinity, ease: "linear" as const };

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#050505]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(245,169,0,0.11),transparent_31%),radial-gradient(circle_at_10%_10%,rgba(255,199,44,0.045),transparent_28%),linear-gradient(180deg,#080808_0%,#040404_100%)]" />

      <motion.div className="absolute -inset-8" style={{ x, y }}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-90"
        >
          <defs>
            <linearGradient id="intro-orbit-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f5a900" stopOpacity="0" />
              <stop offset="0.42" stopColor="#f5a900" stopOpacity="0.5" />
              <stop offset="0.72" stopColor="#ffdc68" stopOpacity="0.16" />
              <stop offset="1" stopColor="#f5a900" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="intro-core" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#ffd45b" stopOpacity="0.42" />
              <stop offset="0.24" stopColor="#f5a900" stopOpacity="0.12" />
              <stop offset="1" stopColor="#f5a900" stopOpacity="0" />
            </radialGradient>
            <filter id="intro-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {stars.map(([cx, cy, radius, opacity], index) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={radius}
              fill="#ffd45b"
              opacity={opacity}
              animate={
                reducedMotion
                  ? undefined
                  : { opacity: [opacity * 0.45, opacity, opacity * 0.45] }
              }
              transition={{
                duration: 3.4 + (index % 4) * 0.8,
                delay: (index % 6) * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.g
            style={{ transformOrigin: "720px 450px" }}
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={orbitTransition}
          >
            <motion.ellipse
              cx="720"
              cy="450"
              rx="610"
              ry="205"
              transform="rotate(-12 720 450)"
              fill="none"
              stroke="url(#intro-orbit-gold)"
              strokeWidth="1.1"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <circle cx="1294" cy="325" r="3.4" fill="#ffd45b" />
            <circle
              cx="1294"
              cy="325"
              r="12"
              fill="#f5a900"
              opacity="0.22"
              filter="url(#intro-soft-glow)"
            />
          </motion.g>

          <motion.g
            style={{ transformOrigin: "720px 450px" }}
            animate={reducedMotion ? undefined : { rotate: -360 }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 68, repeat: Infinity, ease: "linear" }
            }
          >
            <motion.ellipse
              cx="720"
              cy="450"
              rx="470"
              ry="300"
              transform="rotate(18 720 450)"
              fill="none"
              stroke="url(#intro-orbit-gold)"
              strokeWidth="0.8"
              strokeDasharray="2 9"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.72 }}
              transition={{ duration: 1.65, delay: 0.12, ease: "easeOut" }}
            />
            <circle cx="278" cy="558" r="2.6" fill="#f5a900" opacity="0.86" />
          </motion.g>

          <motion.ellipse
            cx="720"
            cy="450"
            rx="335"
            ry="126"
            transform="rotate(-28 720 450)"
            fill="none"
            stroke="url(#intro-orbit-gold)"
            strokeWidth="0.7"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.62 }}
            transition={{ duration: 1.3, delay: 0.22, ease: "easeOut" }}
          />
          <circle cx="720" cy="450" r="230" fill="url(#intro-core)" />
        </svg>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.018)_48%,transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle_at_20%_30%,white_0.45px,transparent_0.7px),radial-gradient(circle_at_70%_60%,white_0.45px,transparent_0.7px)] [background-size:5px_5px,7px_7px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.68)_100%)]" />
    </div>
  );
}
