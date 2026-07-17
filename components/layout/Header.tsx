"use client";

import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getWhatsAppUrl } from "@/config/site";
import { navigationItems } from "@/data/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");
  const reducedMotion = useReducedMotion();

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
    const sections = navigationItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="absolute top-0 z-40 w-full bg-transparent p-3 lg:sticky lg:bg-[#ECEBEF] lg:px-6 lg:py-3">
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
        className={`ml-auto flex w-fit items-center justify-end rounded-full border-0 bg-transparent p-0 shadow-none transition-all lg:mx-auto lg:w-auto lg:max-w-[1320px] lg:justify-between lg:border lg:px-5 ${isScrolled ? "lg:py-2" : "lg:py-3"} ${
          isScrolled
            ? "lg:border-black/10 lg:bg-[rgba(236,235,239,0.96)] lg:shadow-lg lg:shadow-[#c99418]/10 lg:backdrop-blur-md"
            : "lg:border-black/10 lg:bg-[#ECEBEF] lg:shadow-md lg:shadow-[#c99418]/10"
        }`}
      >
        <motion.div
          className="hidden lg:block"
          animate={{ scale: isScrolled ? 0.92 : 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <BrandMark />
        </motion.div>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => {
            const isActive = activeHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={`relative py-2 text-sm font-semibold transition hover:text-black ${isActive ? "text-black" : "text-zinc-600"}`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="active-navigation"
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    className="absolute inset-x-0 -bottom-1 mx-auto h-0.5 rounded-full bg-[var(--color-gold-light)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            Solicitar análise
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Abrir menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d89b00]/50 bg-[var(--color-gold-light)] text-black shadow-[0_10px_30px_rgba(245,169,0,0.22)] transition hover:bg-[#ffdc67] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden motion-reduce:transition-none"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>

          <SheetContent className="overflow-hidden lg:hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_5%,rgba(245,169,0,0.17),transparent_29%),radial-gradient(circle_at_10%_75%,rgba(245,169,0,0.08),transparent_34%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--color-gold-light)]/55 to-transparent"
            />

            <div className="relative flex min-h-0 flex-1 flex-col px-6 pb-7 pt-6">
              <div className="border-b border-white/10 pb-5 pr-14">
                <SheetTitle className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-[var(--color-gold-light)]">
                  Navegação
                </SheetTitle>
                <SheetDescription className="mt-2 max-w-[15rem] text-sm leading-relaxed">
                  Explore a Universo Marketing e encontre a solução ideal para sua empresa.
                </SheetDescription>
              </div>

              <nav aria-label="Navegação principal mobile" className="mt-7">
                <div className="grid gap-2">
                  {navigationItems.map((item, index) => {
                    const isActive = activeHref === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: reducedMotion ? 0 : 0.07 + index * 0.055,
                          duration: reducedMotion ? 0 : 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={isActive ? "location" : undefined}
                            className={`group flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-light)] motion-reduce:transition-none ${
                              isActive
                                ? "border-[rgba(245,169,0,0.32)] bg-[rgba(245,169,0,0.1)] text-white"
                                : "border-transparent text-zinc-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                            }`}
                          >
                            <span
                              className={`text-[0.65rem] tabular-nums tracking-[0.16em] ${
                                isActive
                                  ? "text-[var(--color-gold-light)]"
                                  : "text-zinc-600 group-hover:text-zinc-400"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1">{item.label}</span>
                            <span
                              aria-hidden="true"
                              className={`size-1.5 rounded-full transition ${
                                isActive
                                  ? "bg-[var(--color-gold-light)] shadow-[0_0_12px_rgba(245,169,0,0.8)]"
                                  : "bg-white/15 group-hover:bg-white/35"
                              }`}
                            />
                          </Link>
                        </SheetClose>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 0.38,
                  duration: reducedMotion ? 0 : 0.3,
                }}
                className="mt-auto border-t border-white/10 pt-6"
              >
                <Button
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  Solicitar análise
                </Button>
                <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
                  Estratégia, mídia e crescimento com acompanhamento próximo.
                </p>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </header>
  );
}
