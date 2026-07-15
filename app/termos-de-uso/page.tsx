import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function TermsOfUsePage() {
  return (
    <main className="py-24 md:py-32">
      <Container>
        <div className="surface-panel rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow">Documento provisório</p>
          <h1 className="font-display type-section-title mt-6">
            Termos de uso
          </h1>
          <div className="type-body-md mt-8 space-y-5 text-[var(--color-text-soft)]">
            <p>
              Esta página foi deixada pronta para receber os termos oficiais de
              uso da Universo Marketing.
            </p>
            <p>
              O site atual é estático e institucional, sem autenticação,
              dashboard, banco de dados ou coleta avançada de informações.
            </p>
            <p>
              Assim que a redação final for definida, basta substituir este
              conteúdo mantendo a rota já preparada.
            </p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex text-sm font-medium text-[var(--color-gold-light)] transition hover:text-white"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </Container>
    </main>
  );
}
