"use client";

import { Plus } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { BorderBeam } from "@/components/animation/BorderBeam";

type FAQItemProps = {
  answer: string;
  id: string;
  isOpen: boolean;
  question: string;
};

export function FAQItem({ answer, id, isOpen, question }: FAQItemProps) {
  return (
    <AccordionPrimitive.Item
      value={id}
      className={`relative overflow-hidden rounded-xl border bg-[#0d0f11] transition-colors duration-300 motion-reduce:transition-none ${
        isOpen
          ? "border-[rgba(245,169,0,0.55)]"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {isOpen ? <BorderBeam duration={3.8} radius={12} /> : null}
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className="group/faq-trigger relative flex min-h-16 w-full items-stretch justify-between gap-5 text-left outline-none focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-gold-light)]"
        >
          <span
            className={`type-body-md flex flex-1 items-center px-5 py-4 font-semibold transition-colors md:px-6 motion-reduce:transition-none ${
              isOpen
                ? "text-white"
                : "text-[var(--color-text-soft)] group-hover/faq-trigger:text-white"
            }`}
          >
            {question}
          </span>
          <span
            aria-hidden="true"
            className="flex w-14 shrink-0 items-center justify-center bg-gradient-to-b from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black md:w-16"
          >
            <Plus
              className={`h-5 w-5 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : "rotate-0"}`}
            />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-[faq-accordion-down_320ms_ease-out] data-[state=closed]:animate-[faq-accordion-up_240ms_ease-in] motion-reduce:animate-none">
        <div className="type-body-md max-w-2xl border-t border-white/8 px-5 py-5 text-[var(--color-text-muted)] md:px-6">
          {answer}
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
