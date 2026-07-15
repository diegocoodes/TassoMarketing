import {
  Crosshair,
  FileSearch2,
  Handshake,
  LineChart,
  Repeat,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";

export const differentials = [
  {
    number: "01",
    title: "Estratégia personalizada",
    description:
      "Cada plano nasce do contexto da empresa, da oferta, da capacidade de atendimento e dos objetivos comerciais.",
    icon: Crosshair,
  },
  {
    number: "02",
    title: "Acompanhamento próximo",
    description:
      "As decisões não ficam soltas no tempo. Há leitura constante do cenário e ajuste prático das ações.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Decisões orientadas por dados",
    description:
      "Campanhas, atendimento e processos são analisados com base no que realmente está acontecendo.",
    icon: LineChart,
  },
  {
    number: "04",
    title: "Integração entre marketing e atendimento",
    description:
      "A estrutura conecta anúncios, CRM, automações e rotina comercial para reduzir perdas no caminho até a venda.",
    icon: Workflow,
  },
  {
    number: "05",
    title: "Relatórios claros",
    description:
      "A leitura dos resultados precisa ser útil para decisão, não um volume de números sem contexto.",
    icon: FileSearch2,
  },
  {
    number: "06",
    title: "Melhoria contínua",
    description:
      "O trabalho evolui em ciclos de observação, teste e refinamento para sustentar crescimento com mais consistência.",
    icon: Repeat,
  },
  {
    number: "07",
    title: "Soluções adaptadas à realidade",
    description:
      "Ferramentas, canais e prioridades são definidos conforme o momento e a estrutura disponível em cada empresa.",
    icon: SlidersHorizontal,
  },
] as const;
