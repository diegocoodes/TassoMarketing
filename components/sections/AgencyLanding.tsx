import {
  ArrowUpRight,
  BarChart3,
  Check,
  Orbit,
  PenTool,
  Plus,
  Target,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { SpaceParticles } from "@/components/animation/SpaceParticles";
import { Container } from "@/components/layout/Container";
import Hero30 from "@/components/originkit/hero-30";
import { Button } from "@/components/ui/Button";
import {
  ServiceCarousel,
  type Service,
} from "@/components/ui/services-card";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { faqItems } from "@/data/faq";
import { testimonials } from "@/data/testimonials";

const capabilities = [
  {
    title: "Aquisição & mídia",
    description:
      "Campanhas orientadas por intenção, contexto e dados para colocar sua marca diante das pessoas certas.",
    items: ["Google Ads", "Meta Ads", "Estratégia de mídia"],
    icon: Target,
  },
  {
    title: "Marca & conteúdo",
    description:
      "Posicionamento e comunicação para tornar sua proposta mais clara, desejável e fácil de reconhecer.",
    items: ["Direção criativa", "Conteúdo", "Landing pages"],
    icon: PenTool,
  },
  {
    title: "Automação & CRM",
    description:
      "Jornadas conectadas para organizar oportunidades, acelerar respostas e aproximar marketing e vendas.",
    items: ["Atendimento com IA", "CRM", "Automações"],
    icon: Workflow,
  },
  {
    title: "Dados & conversão",
    description:
      "Leitura contínua dos sinais do negócio para evoluir campanhas, páginas e decisões comerciais.",
    items: ["Mensuração", "Otimização", "SEO"],
    icon: BarChart3,
  },
] as const;

const journey = [
  {
    step: "Mapear",
    description:
      "Mergulhamos no negócio, no mercado e na jornada de compra para encontrar os pontos de maior impacto.",
  },
  {
    step: "Construir",
    description:
      "Transformamos o diagnóstico em estratégia, mensagens, campanhas e uma operação digital integrada.",
  },
  {
    step: "Expandir",
    description:
      "Acompanhamos os sinais, testamos hipóteses e refinamos o sistema para sustentar a próxima fase.",
  },
] as const;

const serviceOfferings = [
  {
    title: "Tráfego Pago",
    description:
      "Gestão contínua dos anúncios, com análise de desempenho e ajustes de verba, público e comunicação.",
    icon: "megaphone",
    gradient: "from-[#30220a] via-[#181307] to-[#08090b]",
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
    gradient: "from-[#211b0d] via-[#11110e] to-[#08090b]",
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
    gradient: "from-[#17191b] via-[#0f1012] to-[#08090b]",
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
    gradient: "from-[#1d180d] via-[#10100d] to-[#08090b]",
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
    gradient: "from-[#181410] via-[#0f0f0f] to-[#08090b]",
    items: [
      "CRM em plataforma própria",
      "Chatbots, automações e atendimento com inteligência artificial",
      "SEO para busca orgânica",
      "Software de agendamento automático",
      "Integrações com API oficial",
    ],
  },
] as const satisfies readonly Service[];

const serviceSupport = [
  "Portal do cliente",
  "Relatórios quinzenais e mensais",
  "Acompanhamento diário",
  "Reunião mensal",
  "Suporte",
  "Diagnóstico e implantação",
  "Acompanhamento dos resultados",
] as const;

const selectedTestimonials = [testimonials[1], testimonials[4], testimonials[5]];

export function AgencyLanding() {
  return (
    <>
      <Hero30 />

      <section id="solucoes" className="agency-paper scroll-mt-24 py-24 text-[#101114] md:py-36 lg:py-44">
        <Container>
          <h2 className="max-w-[14ch] text-[clamp(2.7rem,6vw,6.1rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
            Do primeiro impacto à próxima venda.
          </h2>

          <div className="mt-16 grid border-l border-t border-black/15 md:mt-24 md:grid-cols-2">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <article
                  key={capability.title}
                  className="agency-capability group relative min-h-[27rem] overflow-hidden border-b border-r border-black/15 p-7 sm:p-9 lg:p-11"
                >
                  <div className="flex items-start justify-end">
                    <Icon className="size-6 text-[#9a6a00] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  <div className="mt-16 sm:mt-20">
                    <h3 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                      {capability.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                      {capability.description}
                    </p>
                    <ul className="mt-8 border-t border-black/10" aria-label={`Entregas de ${capability.title}`}>
                      {capability.items.map((item) => (
                        <li key={item} className="border-b border-black/10 py-3 text-xs font-medium uppercase tracking-[0.08em] text-zinc-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="servicos" className="relative scroll-mt-24 overflow-hidden py-20 md:py-32 lg:py-40">
        <SpaceParticles density="dense" className="opacity-80" />
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
            <ServiceCarousel services={serviceOfferings} />
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-[rgba(245,169,0,0.24)] bg-[#0b0c0e]/95 p-7 shadow-[0_35px_100px_rgba(0,0,0,0.32)] backdrop-blur-sm sm:p-10 md:mt-20 lg:rounded-[2.75rem] lg:p-14">
            <div className="pointer-events-none absolute -left-28 -top-32 size-80 rounded-full bg-[rgba(245,169,0,0.16)] blur-[90px]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" aria-hidden="true" />

            <div className="relative grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-20">
              <div>
                <p className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
                  <span className="size-1.5 rounded-full bg-[var(--color-gold)] shadow-[0_0_14px_rgba(245,169,0,0.8)]" aria-hidden="true" />
                  Suporte contínuo
                </p>
                <h3 className="mt-5 max-w-sm text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                  Acompanhamento incluído.
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
                  Estratégia, execução e análise conectadas para sua operação evoluir sem perder ritmo.
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {serviceSupport.map((item) => (
                  <li
                    key={item}
                    className="group flex min-h-16 items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm font-medium text-zinc-300 transition duration-300 hover:border-[rgba(245,169,0,0.28)] hover:bg-[rgba(245,169,0,0.06)] hover:text-white sm:last:col-span-2"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[rgba(245,169,0,0.25)] bg-[rgba(245,169,0,0.1)] text-[var(--color-gold-light)] transition group-hover:bg-[var(--color-gold)] group-hover:text-black">
                      <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36 lg:py-44">
        <SpaceParticles className="opacity-70" />
        <Container className="relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <h2 className="max-w-[12ch] text-[clamp(2.7rem,5.5vw,5.7rem)] font-semibold leading-[0.93] tracking-[-0.06em]">
                Marketing, atendimento e vendas no mesmo fluxo.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
                Campanhas, formulários, CRM e atendimento compartilham os mesmos dados. A equipe comercial acompanha cada contato desde a origem.
              </p>
            </div>

            <div className="agency-system relative mx-auto aspect-square w-full max-w-[36rem]" aria-label="Sistema integrado de crescimento">
              <div className="agency-system-ring agency-system-ring-one" />
              <div className="agency-system-ring agency-system-ring-two" />
              <div className="agency-system-ring agency-system-ring-three" />
              <div className="agency-system-core">
                <Orbit className="size-6 text-black" aria-hidden="true" />
                <span>Crescimento</span>
              </div>
              <div className="agency-system-node agency-system-node-one">
                Atrair
              </div>
              <div className="agency-system-node agency-system-node-two">
                Converter
              </div>
              <div className="agency-system-node agency-system-node-three">
                Relacionar
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="metodo" className="agency-paper scroll-mt-24 py-24 text-[#101114] md:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="max-w-[13ch] text-[clamp(2.7rem,5.2vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
                Do diagnóstico à otimização.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-zinc-600 md:text-base">
              O trabalho começa pelo contexto do negócio, vira plano de execução e continua com análise e ajustes frequentes.
            </p>
          </div>

          <ol className="mt-16 grid border-t border-black/15 md:mt-24 md:grid-cols-3">
            {journey.map((item) => (
              <li key={item.step} className="group border-b border-black/15 py-10 md:border-r md:px-8 md:py-12 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
                <div className="flex items-center justify-end">
                  <ArrowUpRight className="size-5 text-zinc-400 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#9a6a00]" aria-hidden="true" />
                </div>
                <h3 className="mt-12 text-3xl font-semibold tracking-[-0.04em]">{item.step}</h3>
                <p className="mt-5 text-sm leading-7 text-zinc-600">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <SpaceParticles />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                Quem trabalha com a Universo.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {selectedTestimonials.map((testimonial) => (
                <blockquote key={testimonial.company} className="flex min-h-[22rem] flex-col bg-[#0b0c0e] p-7 lg:p-8">
                  <p className="flex-1 text-base leading-8 text-zinc-300">
                    “{testimonial.feedback}”
                  </p>
                  <footer className="mt-8 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {testimonial.company}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="sobre" className="relative scroll-mt-24 overflow-hidden py-10 md:py-20">
        <SpaceParticles density="compact" className="opacity-45" />
        <Container className="relative z-10">
          <div className="agency-about grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#111216] lg:grid-cols-[0.92fr_1.08fr] lg:rounded-[3rem]">
            <div className="relative min-h-[28rem] overflow-hidden bg-[#08090b] sm:min-h-[36rem] lg:min-h-[46rem]">
              <Image
                src={siteConfig.assets.tassoPortrait}
                alt="Fundador e estrategista da Universo Marketing"
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover object-[center_25%] grayscale"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(8,9,11,0.88)_100%)]" />
              <div className="agency-about-orbit" aria-hidden="true" />
            </div>

            <div className="flex items-center p-7 sm:p-10 lg:p-14 xl:p-20">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Fundador & estrategista
                </p>
                <h2 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                  Tasso Thales
                </h2>
                <p className="mt-8 max-w-xl text-base leading-8 text-zinc-300 md:text-lg md:leading-9">
                  Tasso Thales fundou a Universo para reunir planejamento e execução no mesmo time. Ele acompanha as contas, participa das decisões de campanha e mantém contato direto com cada cliente.
                </p>
                <ul className="mt-9 grid border-t border-white/10 text-sm text-zinc-300 sm:grid-cols-2">
                  {["Planejamento de campanhas", "Análise de mídia e conversão", "CRM e automações", "Acompanhamento direto"].map((item) => (
                    <li key={item} className="border-b border-white/10 py-4 sm:odd:pr-4 sm:even:pl-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden py-24 md:py-36">
        <SpaceParticles density="compact" />
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
                  <p className="max-w-2xl pb-8 pr-12 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contato" className="scroll-mt-24 px-2 pb-2 md:px-4 md:pb-4">
        <div className="agency-cta relative overflow-hidden rounded-[2.5rem] bg-[var(--color-gold)] px-5 py-20 text-black md:rounded-[4rem] md:px-10 md:py-28 lg:py-36">
          <div className="agency-cta-orbit" aria-hidden="true" />
          <Container className="relative z-10 text-center">
            <h2 className="mx-auto max-w-[13ch] text-[clamp(3rem,7vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
              Vamos expandir o universo da sua marca?
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-black/70 md:text-lg">
              Conte o cenário atual e a meta da empresa. Vamos avaliar canais, orçamento e os próximos passos.
            </p>
            <div className="mt-10 flex justify-center">
              <Button
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="!border-black/20 !bg-black !text-white hover:!border-black"
                icon={<ArrowUpRight className="size-4" aria-hidden="true" />}
              >
                Conversar com a agência
              </Button>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
