import { Plus } from "lucide-react";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { Container } from "@/components/layout/Container";
import Hero30 from "@/components/originkit/hero-30";
import { ConnectedGrowthFlow } from "@/components/sections/ConnectedGrowthFlow";
import { EditorialCapabilities } from "@/components/sections/EditorialCapabilities";
import { EditorialMethod } from "@/components/sections/EditorialMethod";
import { FinalCTASectionEditorial } from "@/components/sections/FinalCTASectionEditorial";
import { FounderSection } from "@/components/sections/FounderSection";
import { TestimonialsMarqueeSection } from "@/components/sections/TestimonialsMarqueeSection";
import {
  ServiceGrid,
  type Service,
} from "@/components/ui/services-card";
import { faqItems } from "@/data/faq";

const serviceOfferings = [
  {
    title: "Tráfego Pago",
    description:
      "Gestão contínua dos anúncios, com análise de desempenho e ajustes de verba, público e comunicação.",
    icon: "megaphone",
    featured: true,
    items: [
      "Gestão e análise de tráfego pago",
      "Meta Ads: Facebook, Instagram e WhatsApp",
      "Google Search e Google Meu Negócio",
      "Anúncios no YouTube, em sites e aplicativos",
    ],
  },
  {
    title: "Social Media",
    description:
      "Planejamento e produção para manter a marca ativa, coerente e relevante nas redes sociais.",
    icon: "palette",
    items: [
      "Design e artes",
      "Edição de vídeos",
      "Planejamento e publicação de postagens",
      "Estratégia de criação de conteúdo",
      "Análise dos dados orgânicos da rede social e do perfil",
    ],
  },
  {
    title: "Web Design",
    description:
      "Estrutura digital criada para apresentar a empresa com clareza e transformar visitas em contatos ou vendas.",
    icon: "monitor",
    items: [
      "Criação de sites e landing pages",
      "Desenvolvimento de e-commerce",
      "Gestão e otimização do site",
      "Servidor, hospedagem e domínio incluídos",
    ],
  },
  {
    title: "Captação",
    description:
      "Produção presencial de imagens para empresas localizadas na Região Metropolitana do Recife.",
    icon: "camera",
    items: [
      "Captação profissional de vídeos e imagens na empresa",
      "Roteiro alinhado aos objetivos da marca",
      "Orientação profissional para a produção dos conteúdos",
      "Atendimento presencial na Região Metropolitana do Recife",
    ],
  },
  {
    title: "Programação e Desenvolvimento",
    description:
      "Sistemas e integrações para organizar o atendimento, reduzir tarefas manuais e ampliar a capacidade da operação.",
    icon: "code",
    items: [
      "CRM em plataforma própria",
      "Chatbots, automações e atendimento com inteligência artificial",
      "SEO para busca orgânica",
      "Software de agendamento automático",
      "Integrações com API oficial",
    ],
  },
  {
    title: "Acompanhamento incluído",
    description:
      "Estratégia, execução e análise conectadas para sua operação evoluir sem perder ritmo.",
    icon: "headphones",
    showCta: false,
    items: [
      "Portal do cliente",
      "Relatórios quinzenais e mensais",
      "Acompanhamento diário",
      "Reunião mensal",
      "Suporte",
      "Diagnóstico e implantação",
      "Acompanhamento dos resultados",
    ],
  },
] as const satisfies readonly Service[];

export function AgencyLanding() {
  return (
    <>
      <Hero30 />

      <EditorialCapabilities />

      <section id="servicos" className="relative scroll-mt-24 overflow-hidden py-20 md:py-32 lg:py-40">
        <SpaceParticles density="services" className="opacity-46" />
        <Container className="relative z-10">
          <div className="border-b border-white/10 pb-14 md:pb-20">
            <h2 className="max-w-[13ch] text-[clamp(2.65rem,5.8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-white">
              Serviços para a operação digital completa.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              A Universo pode assumir desde a produção diária até campanhas, sites, captação e sistemas conectados ao atendimento comercial.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <ServiceGrid services={serviceOfferings} />
          </div>
        </Container>
      </section>

      <ConnectedGrowthFlow />

      <EditorialMethod />

      <TestimonialsMarqueeSection />

      <FounderSection />

      <section className="relative overflow-hidden py-24 md:py-36">
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <h2 className="max-w-[11ch] text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                Perguntas frequentes.
              </h2>
            </div>
            <div className="border-t border-white/10">
              {faqItems.map((item) => (
                <details key={item.question} className="agency-faq group border-b border-white/10">
                  <summary className="flex min-h-24 cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base font-semibold text-white marker:hidden sm:text-lg">
                    <span>{item.question}</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-zinc-400 transition group-open:rotate-45 group-open:border-[var(--color-gold)] group-open:text-[var(--color-gold-light)]">
                      <Plus className="size-4" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="agency-faq-answer grid">
                    <p className="min-h-0 max-w-2xl overflow-hidden pr-8 text-sm leading-7 text-zinc-400 sm:pr-12 sm:text-base sm:leading-8">
                      <span className="block pb-8">{item.answer}</span>
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FinalCTASectionEditorial />
    </>
  );
}
