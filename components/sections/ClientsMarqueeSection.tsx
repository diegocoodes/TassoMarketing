import { Container } from "@/components/layout/Container";
import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { clients } from "@/data/clients";

const clientLogos: LogoItem[] = clients.map((client) => ({
  src: client.logo,
  alt: client.alt ?? client.name,
  title: client.name,
  width: client.width,
  height: client.height,
  href: client.href,
}));

export function ClientsMarqueeSection() {
  return (
    <section id="clientes" className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Marcas atendidas"
          title="Marcas que já confiaram no nosso trabalho"
          description="Empresas de diferentes segmentos que contaram com estratégia, tráfego e acompanhamento da Universo Marketing."
          align="center"
        />
        <div className="surface-panel mt-10 overflow-hidden rounded-[2rem] px-2 py-6 md:px-4 md:py-8">
          <LogoLoop
            logos={clientLogos}
            speed={55}
            direction="left"
            logoHeight={64}
            gap={32}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#0d0d0f"
            ariaLabel="Marcas atendidas pela Universo Marketing"
            className="client-logo-loop"
          />
        </div>
      </Container>
    </section>
  );
}
