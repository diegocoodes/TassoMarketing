"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type FAQItemProps = {
  answer: string;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  question: string;
};

export function FAQItem({
  answer,
  id,
  isOpen,
  onToggle,
  question,
}: FAQItemProps) {
  return (
    <div className={`overflow-hidden rounded-xl border bg-[#0d0f11] transition-colors duration-300 ${isOpen ? "border-[rgba(245,169,0,0.55)]" : "border-white/10 hover:border-white/20"}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          className="group flex min-h-16 w-full items-stretch justify-between gap-5 text-left"
        >
          <span className={`flex items-center px-5 py-4 text-sm font-semibold leading-6 transition-colors md:px-6 md:text-base ${isOpen ? "text-white" : "text-[var(--color-text-soft)] group-hover:text-white"}`}>{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex w-14 shrink-0 items-center justify-center bg-gradient-to-b from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black md:w-16"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={`${id}-panel`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div initial={{ y: -6 }} animate={{ y: 0 }} className="max-w-2xl border-t border-white/8 px-5 py-5 text-sm leading-7 text-[var(--color-text-muted)] md:px-6 md:text-base">
              {answer}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
