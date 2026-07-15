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
    logo: "/logosempresa/astu.png",
    alt: "Logo da ASTU",
    width: 500,
    height: 500,
  },
  {
    name: "GM Convertedora GNV",
    logo: "/logosempresa/gnv.png",
    alt: "Logo da GM Convertedora GNV",
    width: 500,
    height: 500,
  },
  {
    name: "OMJ Estética Automotiva",
    logo: "/logosempresa/omj.png",
    alt: "Logo da OMJ Estética Automotiva",
    width: 500,
    height: 500,
  },
  {
    name: "Rock Customs",
    logo: "/logosempresa/rock.png",
    alt: "Logo da Rock Customs",
    width: 687,
    height: 687,
  },
  {
    name: "Conceito Jato",
    logo: "/logosempresa/conceito.png",
    alt: "Logo da Conceito Jato",
    width: 500,
    height: 500,
  },
  {
    name: "ID Método",
    logo: "/logosempresa/id.png",
    alt: "Logo da ID Método",
    width: 500,
    height: 500,
  },
  {
    name: "SWN",
    logo: "/logosempresa/swn.png",
    alt: "Logo da SWN",
    width: 500,
    height: 500,
  },
  {
    name: "Expresso 22",
    logo: "/logosempresa/expresso22.png",
    alt: "Logo da Expresso 22",
    width: 687,
    height: 687,
  },
  {
    name: "GYEON",
    logo: "/logosempresa/gyeon.png",
    alt: "Logo da GYEON",
    width: 687,
    height: 687,
  },
  {
    name: "MK Estética",
    logo: "/logosempresa/mkestetica%20copy.png",
    alt: "Logo da MK Estética",
    width: 500,
    height: 500,
  },
  {
    name: "Nevada",
    logo: "/logosempresa/nevada.png",
    alt: "Logo da Nevada",
    width: 500,
    height: 500,
  },
  {
    name: "NP1",
    logo: "/logosempresa/np1%20copy.png",
    alt: "Logo da NP1",
    width: 500,
    height: 500,
  },
];

export const marqueeConfig = {
  pixelsPerSecond: 65,
} as const;
