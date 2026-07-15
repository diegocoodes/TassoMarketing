"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { getWhatsAppUrl } from "@/config/site";
import { navigationItems } from "@/data/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    let lastValue = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const nextValue = window.scrollY > 24;
      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setIsScrolled(nextValue);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = navigationItems.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-30% 0px -60%", threshold: [0, 0.2, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="absolute top-0 z-40 w-full bg-transparent p-3 lg:sticky lg:bg-[#ECEBEF] lg:px-6 lg:py-3">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`ml-auto flex w-fit items-center justify-end rounded-full border-0 bg-transparent p-0 shadow-none transition-all lg:mx-auto lg:w-auto lg:max-w-[1320px] lg:justify-between lg:border lg:px-5 ${isScrolled ? "lg:py-2" : "lg:py-3"} ${
          isScrolled
            ? "lg:border-black/10 lg:bg-[rgba(236,235,239,0.96)] lg:shadow-lg lg:shadow-[#c99418]/10 lg:backdrop-blur-md"
            : "lg:border-black/10 lg:bg-[#ECEBEF] lg:shadow-md lg:shadow-[#c99418]/10"
        }`}
      >
        <motion.div className="hidden lg:block" animate={{ scale: isScrolled ? 0.92 : 1 }} transition={{ duration: 0.2 }}><BrandMark /></motion.div>
        <nav className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-2 text-sm font-semibold transition hover:text-black ${activeHref === item.href ? "text-black" : "text-zinc-600"}`}
            >
              {item.label}
              {activeHref === item.href ? <motion.span layoutId="active-navigation" className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 rounded-full bg-[var(--color-gold-light)]" /> : null}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            Solicitar análise
          </Button>
        </div>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d89b00]/50 bg-[var(--color-gold-light)] text-black lg:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto mt-3 max-w-[1320px] rounded-[1.75rem] border border-black/10 bg-[rgba(236,235,239,0.98)] p-5 shadow-xl shadow-[#c99418]/10 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-zinc-700 transition hover:bg-black/5 hover:text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full"
            >
              Solicitar análise
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
