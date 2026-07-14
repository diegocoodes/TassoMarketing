import LogoLoop, { type LogoItem } from "@/components/ui/LogoLoop";
import { clients } from "@/data/clients";

const clientLogos: LogoItem[] = clients.map((client) => ({
  src: client.logo,
  alt: client.alt ?? client.name,
  title: client.name,
  width: client.width,
  height: client.height,
  href: client.href,
}));

export function IntroClientLogos() {
  if (clientLogos.length === 0) {
    return null;
  }

  return (
    <div data-intro-item className="mt-8 border-t border-white/8 pt-6">
      <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Algumas marcas que já confiaram no nosso trabalho
      </p>
      <div className="mt-4 overflow-hidden">
        <LogoLoop
          logos={clientLogos}
          speed={38}
          direction="left"
          logoHeight={50}
          gap={20}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#0a0a0c"
          ariaLabel="Algumas marcas que já confiaram no nosso trabalho"
          className="client-logo-loop"
        />
      </div>
    </div>
  );
}
