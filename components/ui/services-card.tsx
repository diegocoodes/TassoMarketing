import {
  ArrowUpRight,
  Camera,
  Code2,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { getWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/utils";

const serviceIcons = {
  camera: Camera,
  code: Code2,
  megaphone: Megaphone,
  monitor: MonitorSmartphone,
  palette: Palette,
} satisfies Record<string, LucideIcon>;

export type ServiceIcon = keyof typeof serviceIcons;

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  featured?: boolean;
  items?: readonly string[];
}

type ServiceStackProps = {
  services: readonly Service[];
};

type StickyStyle = CSSProperties & {
  "--service-sticky-top": string;
};

export function ServiceStack({ services }: ServiceStackProps) {
  return (
    <div className="space-y-4 lg:space-y-10" aria-label="Serviços da Universo Marketing">
      {services.map((service, index) => {
        const Icon = serviceIcons[service.icon];
        const stickyStyle: StickyStyle = {
          "--service-sticky-top": `${96 + index * 12}px`,
          zIndex: index + 1,
        };

        return (
          <article
            key={service.title}
            style={stickyStyle}
            className={cn(
              "group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101113] p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(245,169,0,0.42)] hover:bg-[#15130d] sm:p-8 lg:sticky lg:top-[var(--service-sticky-top)] lg:min-h-[31rem] lg:rounded-[2.5rem] lg:p-12",
              service.featured && "border-[rgba(245,169,0,0.38)] bg-[#13120e]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,169,0,0.65)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative grid min-h-full gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div className="flex flex-col">
                <div className="flex items-center justify-end">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border border-white/12 text-[var(--color-gold-light)] transition-colors duration-300 group-hover:border-[rgba(245,169,0,0.38)]",
                      service.featured && "border-[rgba(245,169,0,0.34)] bg-[var(--color-gold)] text-black",
                    )}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-14 lg:mt-auto">
                  <h3 className="max-w-[14ch] text-3xl font-semibold uppercase leading-[1.02] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-[var(--color-gold-light)] sm:text-4xl lg:text-5xl">
                    {service.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-end">
                {service.items && service.items.length > 0 ? (
                  <ul className="border-t border-white/10" aria-label={`Entregas de ${service.title}`}>
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex min-h-12 items-center gap-3 border-b border-white/10 py-3 text-sm leading-6 text-zinc-300 sm:min-h-14"
                      >
                        <span className="size-1.5 shrink-0 bg-[var(--color-gold)]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <a
                  href={getWhatsAppUrl(
                    `Olá! Conheci a Universo Marketing pelo site e tenho interesse no serviço de ${service.title}. Gostaria de saber mais.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-7 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-[border-color,background-color,color] duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] sm:w-auto sm:min-w-60",
                    service.featured && "border-[var(--color-gold)] bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)]",
                  )}
                  aria-label={`Conversar no WhatsApp sobre ${service.title}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Quero este serviço
                  </span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
