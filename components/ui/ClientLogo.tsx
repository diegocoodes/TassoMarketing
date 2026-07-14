"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Client } from "@/data/clients";

type ClientLogoProps = {
  client: Client;
};

export function ClientLogo({ client }: ClientLogoProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileFocus={{ scale: 1.04 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="flex items-center justify-center px-8 py-4 opacity-75 saturate-50 transition hover:opacity-100 hover:saturate-100 focus-within:opacity-100 focus-within:saturate-100 md:px-10"
    >
      <Image
        src={client.logo}
        alt={client.alt ?? client.name}
        width={client.width ?? 180}
        height={client.height ?? 64}
        className="h-10 w-auto object-contain md:h-12"
      />
    </motion.div>
  );

  if (client.href) {
    return (
      <a
        href={client.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={client.name}
      >
        {content}
      </a>
    );
  }

  return <div aria-label={client.name}>{content}</div>;
}
