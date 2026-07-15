import { ArrowUpRight, Eye, Handshake, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getWhatsAppUrl } from "@/config/site";

const pillars = [
  {
    icon: Eye,
    title: "Visão do negócio",
    description: "Antes de investir em anúncios, entendemos sua operação, seus clientes e o cenário em que sua empresa está inserida.",
  },
  {
    icon: Zap,
    title: "Execução inteligente",
    description: "Cada decisão é orientada por dados e transformada em campanhas estruturadas para alcançar as pessoas certas.",
  },
  {
    icon: TrendingUp,
    title: "Resultado",
    description: "Acompanhamos o desempenho continuamente para corrigir rotas, aproveitar oportunidades e ampliar resultados.",
  },
  {
    icon: Handshake,
    title: "Parceria estratégica",
    description: "Trabalhamos próximos ao seu negócio, compartilhando decisões e construindo uma estratégia consistente de crescimento.",
  },
] as const;

export function AudienceSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-18 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,169,0,0.07),transparent_45%)]" />
      <Container className="relative">
        <SectionTitle
          eyebrow="Metodologia"
          title="Os pilares da nossa metodologia"
          description="Uma forma de trabalhar que combina visão estratégica, execução cuidadosa e acompanhamento próximo."
          align="center"
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-px overflow-hidden rounded-2xl bg-[rgba(245,169,0,0.32)] md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article key={pillar.title} className="relative bg-[linear-gradient(145deg,#141416,#09090a)] px-6 pb-8 pt-0 text-center md:px-9">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-b-xl bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display type-section-subtitle mt-6 text-white">{pillar.title}</h3>
                <p className="type-body-md mx-auto mt-4 max-w-sm text-zinc-400">{pillar.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-9 flex justify-center">
          <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" icon={<ArrowUpRight className="h-4 w-4" />} magnetic>
            Quero aumentar minhas vendas
          </Button>
        </div>
      </Container>
    </section>
  );
}
