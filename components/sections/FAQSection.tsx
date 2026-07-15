"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { FAQItem } from "@/components/ui/FAQItem";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faqItems } from "@/data/faq";
import { getWhatsAppUrl } from "@/config/site";

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");

  return (
    <section id="duvidas" className="border-y border-white/8 bg-[#070708] py-18 md:py-24">
      <Container>
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

          <div>
            <div className="grid gap-3">
              {faqItems.map((item, index) => {
                const id = `faq-${index}`;

                return (
                  <FAQItem
                    key={item.question}
                    id={id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openItem === id}
                    onToggle={() => setOpenItem((current) => (current === id ? null : id))}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
