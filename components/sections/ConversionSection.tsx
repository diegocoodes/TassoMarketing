"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays, MessageCircleMore, Send } from "lucide-react";
import { useState } from "react";
import { LeadForm } from "@/components/intro/LeadForm";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

export function ConversionSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const schedulingUrl = siteConfig.scheduling.url.trim() || getWhatsAppUrl("Olá, T. Thales! Gostaria de agendar uma conversa estratégica.");

  return (
    <section id="contato" className="bg-[#f4f1e8] py-18 text-black md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-gold-light)]">Vamos conversar</p>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-tight text-black">Marque uma conversa estratégica</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-700 md:text-lg">Conte um pouco sobre o seu negócio e descubra qual estratégia combina com o momento da sua empresa.</p>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111214] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] md:p-9">
            <div className="absolute inset-x-10 bottom-0 h-32 bg-[rgba(245,169,0,0.12)] blur-3xl" />
            <div className="relative grid gap-3">
              <motion.button type="button" onClick={() => setIsFormOpen(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} className="flex min-h-14 w-full items-center justify-between rounded-full bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] px-6 text-sm font-bold uppercase tracking-[0.04em] text-black">
                <span className="flex items-center gap-3"><Send className="h-5 w-5" /> Preencher formulário</span><ArrowUpRight className="h-5 w-5" />
              </motion.button>
              <Button href={schedulingUrl} target="_blank" rel="noopener noreferrer" variant="secondary" className="min-h-14 justify-between px-6" icon={<CalendarDays className="h-5 w-5" />}>Agendar uma conversa</Button>
              <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" variant="secondary" className="min-h-14 justify-between px-6" icon={<MessageCircleMore className="h-5 w-5" />}>Falar pelo WhatsApp</Button>
            </div>
          </div>
        </div>
      </Container>
      <AnimatePresence>{isFormOpen ? <LeadForm onClose={() => setIsFormOpen(false)} /> : null}</AnimatePresence>
    </section>
  );
}
