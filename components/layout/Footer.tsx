import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="footer-gold mx-2 mb-2 rounded-[2.75rem] bg-[var(--color-gold)] py-12 text-black md:mx-4 md:mb-4 md:rounded-[4rem] md:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-text-muted)]">
              Universo Marketing — Estratégia, tráfego e tecnologia para
              transformar atenção em oportunidades.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Navegação
            </h2>
            <ul className="mt-4 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-text-muted)] transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Contato
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-text-muted)]">
              <li>
                <a
                  href={siteConfig.social.tassoInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Instagram T. Thales
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.companyInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Instagram Universo Marketing
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  WhatsApp comercial
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 pt-2 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-de-privacidade/" className="transition hover:text-white">
              Política de privacidade
            </Link>
            <Link href="/termos-de-uso/" className="transition hover:text-white">
              Termos de uso
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Universo Marketing. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
