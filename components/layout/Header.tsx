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
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 28);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
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
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActiveHref(`#${current.target.id}`);
      },
      { rootMargin: "-25% 0px -65%", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition focus:translate-y-0"
      >
        Ir para o conteúdo
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`container-shell flex min-h-16 items-center justify-between rounded-full border px-3 pr-3 transition duration-300 md:px-4 ${
            isScrolled
              ? "border-white/10 bg-[#090a0c]/88 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl"
              : "border-white/[0.08] bg-black/20 backdrop-blur-md"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <BrandMark compact />
            <span className="hidden text-[0.64rem] font-bold uppercase leading-[1.15] tracking-[0.18em] text-white min-[390px]:block">
              Universo
              <span className="block text-zinc-500">Marketing</span>
            </span>
          </div>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative rounded-full px-4 py-2 text-xs font-semibold transition ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="active-navigation"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--color-gold-light)]"
                      transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="!min-h-10 !px-5 !py-2 !text-xs"
            >
              Falar com a agência
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.1] lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent className="border-white/10 bg-[#08090b] text-white lg:hidden">
              <div className="relative flex min-h-0 flex-1 flex-col px-6 pb-8 pt-8">
                <SheetTitle className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-gold-light)]">
                  Universo Marketing
                </SheetTitle>
                <SheetDescription className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">
                  Soluções para atrair, atender e vender melhor.
                </SheetDescription>

                <nav aria-label="Navegação principal mobile" className="mt-10 border-t border-white/10">
                  {navigationItems.map((item) => {
                    const isActive = activeHref === item.href;
                    return (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive ? "location" : undefined}
                          className="group flex min-h-16 items-center gap-4 border-b border-white/10 text-lg font-semibold"
                        >
                          <span className={`transition ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                            {item.label}
                          </span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                <div className="mt-auto pt-10">
                  <Button
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                  >
                    Iniciar conversa
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </header>
    </>
  );
}
