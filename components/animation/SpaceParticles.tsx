"use client";

import Particles from "@/components/ui/Particles";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

const SPACE_COLORS = [
  "#ffffff",
  "#ffffff",
  "#d4d4d8",
  "#f5a900",
  "#ffd447",
];

const DENSITY_PRESETS = {
  hero: {
    particleCount: 150,
    particleSpread: 14,
    particleBaseSize: 82,
  },
  section: {
    particleCount: 85,
    particleSpread: 11,
    particleBaseSize: 72,
  },
  services: {
    particleCount: 105,
    particleSpread: 12,
    particleBaseSize: 74,
  },
  sparse: {
    particleCount: 55,
    particleSpread: 9,
    particleBaseSize: 68,
  },
  minimal: {
    particleCount: 28,
    particleSpread: 8,
    particleBaseSize: 64,
  },
} as const;

type SpaceParticlesProps = {
  density?: keyof typeof DENSITY_PRESETS;
  className?: string;
};

export function SpaceParticles({
  density = "section",
  className,
}: SpaceParticlesProps) {
  const preset = DENSITY_PRESETS[density];
  const isMobile = useIsMobile();
  const particleCount = isMobile
    ? Math.max(18, Math.round(preset.particleCount * 0.55))
    : preset.particleCount;

  return (
    <div
      data-space-particles
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-60",
        className,
      )}
      aria-hidden="true"
    >
      <Particles
        className="h-full w-full"
        particleCount={particleCount}
        particleSpread={preset.particleSpread}
        speed={0.012}
        particleColors={SPACE_COLORS}
        alphaParticles
        particleBaseSize={preset.particleBaseSize}
        sizeRandomness={1.1}
        cameraDistance={20}
        disableRotation
        pixelRatio={1}
      />
    </div>
  );
}
