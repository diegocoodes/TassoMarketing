import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="footer-gold bg-[var(--color-gold)] py-12 text-black md:py-16">
      <Container>
        <div className="grid gap-10 text-center lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <BrandMark />
            <p className="type-body-md mt-5 max-w-md text-[var(--color-text-muted)]">
              Universo Marketing — Estratégia, tráfego e tecnologia para
              transformar atenção em oportunidades.
            </p>
          </div>
          <div>
            <h2 className="type-caption text-white/70">
              Navegação
            </h2>
            <ul className="mt-4 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-body-sm text-[var(--color-text-muted)] transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="type-caption text-white/70">
              Contato
            </h2>
            <ul className="type-body-sm mt-4 space-y-3 text-[var(--color-text-muted)]">
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
        <div className="type-body-sm mt-12 flex flex-col items-center gap-4 pt-2 text-center text-[var(--color-text-muted)] md:flex-row md:justify-between md:text-left">
          <div className="flex flex-wrap justify-center gap-5 md:justify-start">
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
