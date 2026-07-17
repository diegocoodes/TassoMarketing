export type Client = {
  name: string;
  logo: string;
  alt?: string;
  width?: number;
  height?: number;
  href?: string;
};

export const clients: Client[] = [
  {
    name: "ASTU",
    logo: "/logosempresa/astu.webp",
    alt: "Logo da ASTU",
    width: 144,
    height: 144,
  },
  {
    name: "GM Convertedora GNV",
    logo: "/logosempresa/gnv.webp",
    alt: "Logo da GM Convertedora GNV",
    width: 144,
    height: 144,
  },
  {
    name: "OMJ Estética Automotiva",
    logo: "/logosempresa/omj.webp",
    alt: "Logo da OMJ Estética Automotiva",
    width: 144,
    height: 144,
  },
  {
    name: "Rock Customs",
    logo: "/logosempresa/rock.webp",
    alt: "Logo da Rock Customs",
    width: 144,
    height: 144,
  },
  {
    name: "Conceito Jato",
    logo: "/logosempresa/conceito.webp",
    alt: "Logo da Conceito Jato",
    width: 144,
    height: 144,
  },
  {
    name: "ID Método",
    logo: "/logosempresa/id.webp",
    alt: "Logo da ID Método",
    width: 144,
    height: 144,
  },
  {
    name: "SWN",
    logo: "/logosempresa/swn.webp",
    alt: "Logo da SWN",
    width: 144,
    height: 144,
  },
  {
    name: "Expresso 22",
    logo: "/logosempresa/expresso22.webp",
    alt: "Logo da Expresso 22",
    width: 144,
    height: 144,
  },
  {
    name: "GYEON",
    logo: "/logosempresa/gyeon.webp",
    alt: "Logo da GYEON",
    width: 144,
    height: 144,
  },
  {
    name: "MK Estética",
    logo: "/logosempresa/mkestetica.webp",
    alt: "Logo da MK Estética",
    width: 144,
    height: 144,
  },
  {
    name: "Nevada",
    logo: "/logosempresa/nevada.webp",
    alt: "Logo da Nevada",
    width: 144,
    height: 144,
  },
  {
    name: "NP1",
    logo: "/logosempresa/np1.webp",
    alt: "Logo da NP1",
    width: 144,
    height: 144,
  },
];

export const marqueeConfig = {
  pixelsPerSecond: 65,
} as const;
