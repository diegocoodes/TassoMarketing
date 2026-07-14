import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function PrivacyPolicyPage() {
  return (
    <main className="py-24 md:py-32">
      <Container>
        <div className="surface-panel rounded-[2rem] p-8 md:p-12">
          <p className="eyebrow">Documento provisório</p>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
            Política de privacidade
          </h1>
          <div className="mt-8 space-y-5 text-[var(--color-text-soft)]">
            <p>
              Esta página foi preparada para a futura publicação da política de
              privacidade oficial da Universo Marketing.
            </p>
            <p>
              Quando os processos internos, formulários e integrações forem
              definidos, este conteúdo pode ser substituído pelo documento
              jurídico definitivo sem alterar a estrutura do site.
            </p>
            <p>
              Até lá, a landing page opera como apresentação institucional e
              direciona o contato principal para o WhatsApp.
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
