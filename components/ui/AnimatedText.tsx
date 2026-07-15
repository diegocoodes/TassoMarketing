type AnimatedTextProps = {
  lines: string[];
  fullText: string;
  className?: string;
};

export function AnimatedText({
  lines,
  fullText,
  className = "",
}: AnimatedTextProps) {
  return (
    <div className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line) => (
          <span key={line} className="block overflow-hidden pb-2">
            <span
              data-hero-line
              className={`font-display block w-fit text-[clamp(2.9rem,8vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.03em] ${line.includes("anúncios em clientes") ? "hero-title-highlight before:hidden" : "text-white"}`}
              style={line.includes("anúncios em clientes") ? { color: "var(--color-gold-deep)" } : undefined}
            >
              {line}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
