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
      </Container>
      <div className="mt-12 w-full overflow-hidden py-4 md:py-6">
        <LogoLoop
          logos={clientLogos}
          speed={65}
          direction="left"
          logoHeight={72}
          gap={44}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#050505"
          ariaLabel="Marcas atendidas pela Universo Marketing"
          className="client-logo-loop"
        />
      </div>
    </section>
  );
}
