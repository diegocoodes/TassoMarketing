import { CheckCircle2 } from "lucide-react";

type BenefitItemProps = {
  text: string;
};

export function BenefitItem({ text }: BenefitItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-[var(--color-text-soft)]">
      <CheckCircle2
        className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-light)]"
        aria-hidden="true"
      />
      <span>{text}</span>
    </li>
  );
}
