export const animationConfig = {
  ease: {
    standard: "power2.out",
    premium: "power3.out",
    smooth: "power1.inOut",
  },
  duration: { fast: 0.35, normal: 0.7, slow: 1 },
  stagger: { fast: 0.04, normal: 0.08, slow: 0.12 },
  marquee: { pixelsPerSecond: 65 },
  magnetic: { maxOffset: 8 },
} as const;
