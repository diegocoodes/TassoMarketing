export function HeroVolumetricRays() {
  return (
    <div
      data-hero-rays
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden opacity-70 mix-blend-multiply will-change-transform motion-reduce:hidden md:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient
            id="hero-ray-wide"
            x1="1205"
            y1="344"
            x2="286"
            y2="68"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-gold-light)" stopOpacity="0.42" />
            <stop offset="0.34" stopColor="var(--color-gold)" stopOpacity="0.2" />
            <stop offset="1" stopColor="var(--color-gold-deep)" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="hero-ray-narrow"
            x1="1205"
            y1="344"
            x2="470"
            y2="760"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-gold-light)" stopOpacity="0.55" />
            <stop offset="0.4" stopColor="var(--color-gold)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--color-gold-deep)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-ray-origin">
            <stop stopColor="rgba(255,255,255,0.94)" />
            <stop offset="0.22" stopColor="var(--color-gold-light)" stopOpacity="0.58" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0" />
          </radialGradient>
          <filter id="hero-ray-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="19" />
          </filter>
          <filter id="hero-ray-soft-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <g data-hero-ray-field className="will-change-transform">
          <g filter="url(#hero-ray-blur)" opacity="0.74">
            <path
              data-hero-ray
              d="M1210 342L220 -128L555 -88Z"
              fill="url(#hero-ray-wide)"
            />
            <path
              data-hero-ray
              d="M1210 342L358 94L182 260Z"
              fill="url(#hero-ray-wide)"
              opacity="0.58"
            />
            <path
              data-hero-ray
              d="M1210 342L430 822L690 914Z"
              fill="url(#hero-ray-narrow)"
              opacity="0.52"
            />
          </g>
          <g filter="url(#hero-ray-soft-blur)" opacity="0.72">
            <path
              data-hero-ray
              d="M1205 344L520 12L640 14Z"
              fill="url(#hero-ray-wide)"
            />
            <path
              data-hero-ray
              d="M1205 344L505 678L620 722Z"
              fill="url(#hero-ray-narrow)"
              opacity="0.62"
            />
          </g>
          <ellipse
            data-hero-ray-origin
            cx="1205"
            cy="344"
            rx="182"
            ry="154"
            fill="url(#hero-ray-origin)"
            opacity="0.36"
          />
        </g>
      </svg>
    </div>
  );
}
