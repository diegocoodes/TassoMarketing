"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { FAQItem } from "@/components/ui/FAQItem";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqItems } from "@/data/faq";

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");

  return (
    <section id="duvidas" className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Perguntas frequentes"
          title="Perguntas frequentes"
          description="Abaixo estão as respostas para dúvidas comuns sobre investimento, operação e escopo de trabalho."
        />
        <div className="mt-10 grid gap-4">
          {faqItems.map((item, index) => {
            const id = `faq-${index}`;

            return (
              <FAQItem
                key={item.question}
                id={id}
                question={item.question}
                answer={item.answer}
                isOpen={openItem === id}
                onToggle={() =>
                  setOpenItem((current) => (current === id ? null : id))
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
