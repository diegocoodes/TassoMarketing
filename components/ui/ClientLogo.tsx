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
      className="mx-3 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f3f1ec] opacity-80 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:opacity-100 focus-within:opacity-100 md:mx-4 md:h-24 md:w-24"
    >
      <Image
        src={client.logo}
        alt={client.alt ?? client.name}
        width={client.width ?? 180}
        height={client.height ?? 64}
        className="h-full w-full rounded-full object-cover mix-blend-multiply"
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
