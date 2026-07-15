type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "mx-auto text-center md:mx-0 md:text-left";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`.trim()}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[0.95] tracking-tight text-white">
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg ${align === "center" ? "mx-auto" : "mx-auto md:mx-0"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
