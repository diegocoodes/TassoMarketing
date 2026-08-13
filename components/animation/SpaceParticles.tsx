"use client";

import Particles from "@/components/ui/Particles";
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
    particleCount: 230,
    particleSpread: 14,
    particleBaseSize: 92,
  },
  section: {
    particleCount: 150,
    particleSpread: 11,
    particleBaseSize: 82,
  },
  compact: {
    particleCount: 100,
    particleSpread: 9,
    particleBaseSize: 74,
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
        particleCount={preset.particleCount}
        particleSpread={preset.particleSpread}
        speed={0.075}
        particleColors={SPACE_COLORS}
        moveParticlesOnHover
        particleHoverFactor={0.75}
        alphaParticles
        particleBaseSize={preset.particleBaseSize}
        sizeRandomness={1.35}
        cameraDistance={20}
        pixelRatio={1}
      />
    </div>
  );
}
