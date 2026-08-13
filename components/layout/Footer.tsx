import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { BrandMark } from "@/components/ui/BrandMark";
import { getWhatsAppUrl, siteConfig } from "@/config/site";
import { navigationItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050608] pb-8 pt-20 md:pb-10 md:pt-28">
      <Container>
        <div className="grid gap-14 border-t border-white/10 pt-10 lg:grid-cols-[1.45fr_0.55fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark compact />
              <p className="text-xs font-bold uppercase leading-[1.2] tracking-[0.2em] text-white">
                Universo
                <span className="block text-zinc-600">Marketing</span>
              </p>
            </div>
            <p className="mt-7 max-w-md text-sm leading-7 text-zinc-500">
              Estratégia, criatividade, mídia e tecnologia para marcas que querem ocupar mais espaço.
            </p>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-600">
              Canais
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={siteConfig.social.companyInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  Instagram
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                  WhatsApp comercial
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 overflow-hidden border-b border-white/10 pb-5 md:mt-28">
          <p aria-hidden="true" className="whitespace-nowrap text-[clamp(4rem,14vw,12rem)] font-semibold leading-[0.72] tracking-[-0.075em] text-white/[0.055]">
            UNIVERSO®
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-5 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Universo Marketing. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/politica-de-privacidade/" className="transition hover:text-zinc-300">
              Política de privacidade
            </Link>
            <Link href="/termos-de-uso/" className="transition hover:text-zinc-300">
              Termos de uso
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
