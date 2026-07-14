export type Client = {
  name: string;
  logo: string;
  alt?: string;
  width?: number;
  height?: number;
  href?: string;
};

export const clients: Client[] = [];

export const marqueeConfig = {
  pixelsPerSecond: 65,
} as const;
