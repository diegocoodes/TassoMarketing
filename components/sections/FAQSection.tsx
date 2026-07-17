"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/Button";
import { FAQItem } from "@/components/ui/FAQItem";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getWhatsAppUrl } from "@/config/site";
import { faqItems } from "@/data/faq";

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");

  return (
    <section id="duvidas" className="border-y border-white/8 bg-[#070708] py-18 md:py-24">
      <Container>
        <style>{`
          @keyframes faq-accordion-down {
            from { height: 0; opacity: 0; }
            to { height: var(--radix-accordion-content-height); opacity: 1; }
          }
          @keyframes faq-accordion-up {
            from { height: var(--radix-accordion-content-height); opacity: 1; }
            to { height: 0; opacity: 0; }
          }
        `}</style>
        <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="Dúvidas"
              title="Dúvidas frequentes respondidas com transparência"
              description="Estratégias sérias começam com informação clara. Entenda como funcionam investimento, operação e acompanhamento."
            />
            <div className="mt-7 flex justify-center lg:justify-start">
              <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                Quero melhorar meus resultados
              </Button>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            value={openItem ?? ""}
            onValueChange={(value) => setOpenItem(value || null)}
            className="grid gap-3"
          >
            {faqItems.map((item, index) => {
              const id = `faq-${index}`;

              return (
                <FAQItem
                  key={item.question}
                  id={id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItem === id}
                />
              );
            })}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
