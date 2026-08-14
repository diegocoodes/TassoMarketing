import {
  ArrowUpRight,
  Camera,
  Code2,
  Headphones,
  Megaphone,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { cn } from "@/lib/utils";

const serviceIcons = {
  camera: Camera,
  code: Code2,
  headphones: Headphones,
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
  showCta?: boolean;
}

type ServiceGridProps = {
  services: readonly Service[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      aria-label="Serviços da Universo Marketing"
    >
      {services.map((service) => {
        const Icon = serviceIcons[service.icon];

        return (
          <article
            key={service.title}
            className={cn(
              "group relative isolate flex h-full min-h-[38rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101113] p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(245,169,0,0.42)] hover:bg-[#15130d] sm:p-8 lg:rounded-[2rem]",
              service.featured &&
                "border-[rgba(245,169,0,0.38)] bg-[#13120e]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,169,0,0.65)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <div className="relative flex items-center justify-end">
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full border border-white/12 text-[var(--color-gold-light)] transition-colors duration-300 group-hover:border-[rgba(245,169,0,0.38)]",
                  service.featured &&
                    "border-[rgba(245,169,0,0.34)] bg-[var(--color-gold)] text-black",
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
            </div>

            <div className="relative mt-12">
              <h3 className="max-w-[15ch] text-2xl font-semibold uppercase leading-[1.02] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-[var(--color-gold-light)] sm:text-3xl">
                {service.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-zinc-400">
                {service.description}
              </p>
            </div>

            <div className="relative mt-auto pt-8">
              {service.items && service.items.length > 0 ? (
                <ul
                  className="border-t border-white/10"
                  aria-label={`Entregas de ${service.title}`}
                >
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex min-h-11 items-center gap-3 border-b border-white/10 py-2.5 text-xs leading-5 text-zinc-300"
                    >
                      <span
                        className="size-1.5 shrink-0 bg-[var(--color-gold)]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {service.showCta !== false ? (
                <a
                  href={getWhatsAppUrl(
                    `Olá! Conheci a Universo Marketing pelo site e tenho interesse no serviço de ${service.title}. Gostaria de saber mais.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "mt-7 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-[border-color,background-color,color] duration-300 hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)]",
                    service.featured &&
                      "border-[var(--color-gold)] bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)]",
                  )}
                  aria-label={`Conversar no WhatsApp sobre ${service.title}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Quero este serviço
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
