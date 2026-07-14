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
    <div className="surface-panel overflow-hidden rounded-[1.5rem]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-white md:px-6 md:text-lg"
        >
          <span>{question}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0 rounded-full border border-white/10 p-2 text-[var(--color-gold-light)]"
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
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-7 text-[var(--color-text-muted)] md:px-6 md:text-base">
              {answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
