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
      <h2 className="font-display type-section-title mt-5 text-white">
        {title}
      </h2>
      {description ? (
        <p className={`type-body-lg mt-5 max-w-2xl text-[var(--color-text-muted)] ${align === "center" ? "mx-auto" : "mx-auto md:mx-0"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
