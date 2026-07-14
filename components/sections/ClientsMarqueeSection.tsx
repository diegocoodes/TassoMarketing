import { Container } from "@/components/layout/Container";
import { InfiniteLogoMarquee } from "@/components/ui/InfiniteLogoMarquee";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { clients } from "@/data/clients";

export function ClientsMarqueeSection() {
  return (
    <section id="clientes" className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Marcas atendidas"
          title="Estrutura pronta para mostrar as empresas e marcas atendidas"
          description="As logos oficiais podem ser anexadas depois na pasta de clientes. O componente já está preparado para marquee automático, grade estática com movimento reduzido e acessibilidade para leitores de tela."
          align="center"
        />
        <div className="surface-panel mt-10 rounded-[2rem] px-4 py-6 md:px-6 md:py-8">
          <InfiniteLogoMarquee clients={clients} />
        </div>
      </Container>
    </section>
  );
}
