type HeroLiquidMetalTextProps = {
  children: string;
  className?: string;
};

const metalGradient =
  "linear-gradient(105deg, var(--color-gold-deep) 0%, var(--color-gold) 15%, var(--color-gold-light) 27%, rgba(255,255,255,0.96) 34%, var(--color-gold-light) 39%, var(--color-gold-deep) 56%, var(--color-gold) 70%, rgba(255,255,255,0.88) 80%, var(--color-gold-light) 86%, var(--color-gold-deep) 100%)";

export function HeroLiquidMetalText({
  children,
  className = "",
}: HeroLiquidMetalTextProps) {
  return (
    <span
      data-hero-title-line
      className={`relative isolate block pb-[0.08em] will-change-transform ${className}`}
    >
      <span
        aria-hidden="true"
        data-hero-metal-shadow
        className="pointer-events-none absolute inset-0 block translate-y-[0.035em] text-[var(--color-gold-deep)] opacity-25 blur-[9px]"
      >
        {children}
      </span>
      <span
        data-hero-metal-text
        className="relative block bg-clip-text text-transparent [filter:drop-shadow(0_3px_8px_rgba(245,169,0,0.16))]"
        style={{
          backgroundImage: metalGradient,
          backgroundPosition: "0% 50%",
          backgroundSize: "280% 100%",
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        data-hero-metal-shine
        className="pointer-events-none absolute inset-0 block bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.92) 49%, transparent 60%)",
          backgroundPosition: "190% 50%",
          backgroundSize: "260% 100%",
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </span>
    </span>
  );
}
