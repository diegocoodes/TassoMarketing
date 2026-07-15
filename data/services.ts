import {
  Bot,
  CalendarClock,
  Search,
  Target,
  Waypoints,
} from "lucide-react";

export const services = [
  {
    title: "Tráfego pago",
    description:
      "Campanhas estratégicas no Google, Instagram e Facebook para alcançar pessoas com potencial real de compra.",
    icon: Target,
    featured: true,
  },
  {
    title: "Atendimento com IA",
    description:
      "Respostas mais rápidas, organização dos contatos e atendimento disponível mesmo fora do horário comercial.",
    icon: Bot,
  },
  {
    title: "CRM e automações",
    description:
      "Acompanhamento dos leads desde o primeiro contato até o fechamento da venda.",
    icon: Waypoints,
  },
  {
    title: "Software de agendamento",
    description:
      "Organização de horários, redução de faltas e mais praticidade para clientes e equipe.",
    icon: CalendarClock,
  },
  {
    title: "SEO",
    description:
      "Melhoria da presença da empresa no Google para gerar novas oportunidades de forma contínua.",
    icon: Search,
  },
] as const;
