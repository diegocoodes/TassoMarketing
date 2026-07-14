import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const rightFit = [
  "Desejam receber mais contatos qualificados",
  "Já anunciam, mas não conseguem bons resultados",
  "Dependem apenas de indicação",
  "Demoram para responder clientes",
  "Precisam organizar o processo comercial",
  "Querem crescer de forma estruturada",
] as const;

const notIdealYet = [
  "Procuram resultados sem investimento",
  "Esperam uma fórmula mágica",
  "Não desejam acompanhar indicadores",
  "Não possuem estrutura para atender novos clientes",
] as const;

export function AudienceSection() {
  return (
    <section className="py-18 md:py-24">
      <Container>
        <SectionTitle
          eyebrow="Para quem é"
          title="Essa estratégia é indicada para empresas que..."
          description="O trabalho faz mais sentido quando existe interesse real em estrutura, acompanhamento e evolução contínua."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="surface-panel rounded-[1.75rem] p-6 md:p-7">
            <h3 className="text-2xl font-semibold text-white">Perfil ideal</h3>
            <ul className="mt-6 space-y-3">
              {rightFit.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-panel rounded-[1.75rem] p-6 md:p-7">
            <h3 className="text-2xl font-semibold text-white">
              Talvez não seja o momento ideal se você...
            </h3>
            <ul className="mt-6 space-y-3">
              {notIdealYet.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
