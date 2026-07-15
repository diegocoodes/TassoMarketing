"use client";

import { MessageCircleMore } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { getWhatsAppUrl } from "@/config/site";

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; setIsVisible(window.scrollY > Math.min(window.innerHeight * 0.7, 720)); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <AnimatePresence>
    {isVisible ? <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="fixed right-4 bottom-4 z-50 safe-bottom md:right-6 md:bottom-6">
      <motion.a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-gold-light)] to-[var(--color-gold-deep)] text-black shadow-[0_16px_42px_rgba(245,169,0,0.22)]"
      >
        <MessageCircleMore className="h-6 w-6" aria-hidden="true" />
        <AnimatePresence>
          {isHovered ? (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute right-[calc(100%+0.75rem)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#111214] px-4 py-2 text-xs font-medium text-white shadow-lg md:block"
            >
              Fale conosco
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.a>
    </motion.div> : null}
    </AnimatePresence>
  );
}
