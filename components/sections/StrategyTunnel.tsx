const tunnelRings = [
  "M470 413 L570 413 L590 450 L570 487 L470 487 L450 450 Z",
  "M420 375 L620 375 L665 450 L620 525 L420 525 L375 450 Z",
  "M340 315 L700 315 L775 450 L700 585 L340 585 L265 450 Z",
  "M220 225 L820 225 L940 450 L820 675 L220 675 L100 450 Z",
  "M45 90 L995 90 L1185 450 L995 810 L45 810 L-145 450 Z",
  "M-210 -105 L1250 -105 L1540 450 L1250 1005 L-210 1005 L-500 450 Z",
] as const;

const tunnelRails = [
  "M520 450 L-210 -105",
  "M520 450 L1250 -105",
  "M520 450 L1540 450",
  "M520 450 L1250 1005",
  "M520 450 L-210 1005",
  "M520 450 L-500 450",
] as const;

const electricPaths = [
  "M520 450 C670 360 795 260 1080 150 C1250 85 1390 120 1560 42",
  "M520 450 C760 458 910 392 1160 500 C1325 570 1440 545 1590 660",
  "M520 450 C650 570 835 650 965 835 C1085 1005 1280 950 1450 1060",
] as const;

export function StrategyTunnel() {
  return (
    <div
      data-strategy-tunnel-wrap
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        data-strategy-tunnel
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full overflow-visible opacity-70 will-change-transform"
      >
        <defs>
          <radialGradient id="strategy-tunnel-halo" cx="0" cy="0" r="1" gradientTransform="translate(520 450) rotate(90) scale(340 460)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5A900" stopOpacity="0.2" />
            <stop offset="0.42" stopColor="#F5A900" stopOpacity="0.055" />
            <stop offset="1" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="strategy-tunnel-line" x1="100" y1="80" x2="1180" y2="820" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.03" />
            <stop offset="0.44" stopColor="#F5A900" stopOpacity="0.34" />
            <stop offset="1" stopColor="#FFD447" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="strategy-electric-line" x1="520" y1="450" x2="1570" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5A900" stopOpacity="0" />
            <stop offset="0.36" stopColor="#F5A900" />
            <stop offset="0.7" stopColor="#FFD447" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="strategy-electric-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="520" cy="450" rx="500" ry="390" fill="url(#strategy-tunnel-halo)" />

        <g fill="none" stroke="url(#strategy-tunnel-line)" vectorEffect="non-scaling-stroke">
          {tunnelRails.map((path) => (
            <path key={path} data-strategy-tunnel-rail d={path} strokeWidth="1" />
          ))}
          {tunnelRings.map((path, index) => (
            <path
              key={path}
              data-strategy-tunnel-ring
              d={path}
              strokeWidth={index < 2 ? 1.5 : 1}
            />
          ))}
        </g>

        <g
          fill="none"
          stroke="url(#strategy-electric-line)"
          strokeLinecap="round"
          filter="url(#strategy-electric-glow)"
        >
          {electricPaths.map((path) => (
            <path
              key={path}
              data-strategy-electric
              d={path}
              pathLength="1000"
              opacity="0.28"
              strokeWidth="2.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g fill="#FFD447">
          <circle data-strategy-tunnel-node cx="520" cy="450" r="4" />
          <circle data-strategy-tunnel-node cx="775" cy="450" r="3" />
          <circle data-strategy-tunnel-node cx="700" cy="315" r="2.5" />
          <circle data-strategy-tunnel-node cx="820" cy="675" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
