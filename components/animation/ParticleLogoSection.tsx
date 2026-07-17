"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  phase: number;
};

const VIEW_WIDTH = 420;
const VIEW_HEIGHT = 240;

export function ParticleLogoSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = VIEW_WIDTH * ratio;
    canvas.height = VIEW_HEIGHT * ratio;
    context.scale(ratio, ratio);

    let animationFrame: number | null = null;
    let isInViewport = !("IntersectionObserver" in window);
    let isDocumentVisible = document.visibilityState === "visible";
    let particles: Particle[] = [];
    let activeElapsed = 0;
    let previousTime: number | null = null;
    const pointer = { x: -1000, y: -1000 };
    const image = new window.Image();

    const draw = (time: number) => {
      context.clearRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
      const progress = reducedMotion ? 1 : Math.min(1, time / 1900);
      const eased = 1 - Math.pow(1 - progress, 4);

      particles.forEach((particle) => {
        const attraction = reducedMotion ? 1 : 0.055 + eased * 0.07;
        particle.x += (particle.targetX - particle.x) * attraction;
        particle.y += (particle.targetY - particle.y) * attraction;

        if (!reducedMotion) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < 46) {
            const force = (46 - distance) * 0.075;
            particle.x += (dx / distance) * force;
            particle.y += (dy / distance) * force;
          }
        }

        const shimmer = reducedMotion ? 0 : Math.sin(time * 0.002 + particle.phase) * 0.22;
        context.beginPath();
        context.arc(particle.x, particle.y, Math.max(0.65, particle.size + shimmer), 0, Math.PI * 2);
        context.fillStyle = `rgba(255, ${190 + Math.round(shimmer * 55)}, 28, ${0.62 + eased * 0.38})`;
        context.fill();
      });
    };

    const shouldRender = () =>
      isInViewport && isDocumentVisible && particles.length > 0;

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      previousTime = null;
    };

    const render = (time: number) => {
      animationFrame = null;
      if (!shouldRender() || reducedMotion) {
        previousTime = null;
        return;
      }

      if (previousTime !== null) activeElapsed += time - previousTime;
      previousTime = time;
      draw(activeElapsed);
      animationFrame = window.requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (!shouldRender()) return;

      if (reducedMotion) {
        draw(0);
      } else if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const syncAnimation = () => {
      if (shouldRender()) startAnimation();
      else stopAnimation();
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      syncAnimation();
    };

    image.onload = () => {
      const source = document.createElement("canvas");
      source.width = image.naturalWidth;
      source.height = image.naturalHeight;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      if (!sourceContext) return;
      sourceContext.drawImage(image, 0, 0);
      const sourcePixels = sourceContext.getImageData(0, 0, source.width, source.height).data;

      let minX = source.width;
      let minY = source.height;
      let maxX = 0;
      let maxY = 0;
      for (let y = 0; y < source.height; y += 4) {
        for (let x = 0; x < source.width; x += 4) {
          const index = (y * source.width + x) * 4;
          const brightness = sourcePixels[index] + sourcePixels[index + 1] + sourcePixels[index + 2];
          if (sourcePixels[index + 3] < 45 || brightness < 190) continue;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }

      const cropX = Math.max(0, minX - 8);
      const cropY = Math.max(0, minY - 8);
      const cropWidth = Math.max(1, Math.min(source.width - cropX, maxX - minX + 16));
      const cropHeight = Math.max(1, Math.min(source.height - cropY, maxY - minY + 16));
      const sampler = document.createElement("canvas");
      sampler.width = VIEW_WIDTH;
      sampler.height = VIEW_HEIGHT;
      const samplerContext = sampler.getContext("2d", { willReadFrequently: true });
      if (!samplerContext) return;

      const maxWidth = 300;
      const maxHeight = 145;
      const scale = Math.min(maxWidth / cropWidth, maxHeight / cropHeight);
      const width = cropWidth * scale;
      const height = cropHeight * scale;
      const offsetX = (VIEW_WIDTH - width) / 2;
      const offsetY = (VIEW_HEIGHT - height) / 2;
      samplerContext.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        offsetX,
        offsetY,
        width,
        height,
      );
      const pixels = samplerContext.getImageData(0, 0, VIEW_WIDTH, VIEW_HEIGHT).data;

      const nextParticles: Particle[] = [];
      for (let y = 0; y < VIEW_HEIGHT; y += 5) {
        for (let x = 0; x < VIEW_WIDTH; x += 5) {
          const index = (y * VIEW_WIDTH + x) * 4;
          const brightness = pixels[index] + pixels[index + 1] + pixels[index + 2];
          if (pixels[index + 3] < 45 || brightness < 190) continue;
          const angle = Math.random() * Math.PI * 2;
          const radius = 100 + Math.random() * 250;
          nextParticles.push({
            x: VIEW_WIDTH / 2 + Math.cos(angle) * radius,
            y: VIEW_HEIGHT / 2 + Math.sin(angle) * radius,
            targetX: x,
            targetY: y,
            size: 0.85 + Math.random() * 0.9,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      particles = nextParticles;
      activeElapsed = 0;
      previousTime = null;
      syncAnimation();
    };

    let imageRequested = false;
    const requestImage = () => {
      if (imageRequested) return;
      imageRequested = true;
      image.src = siteConfig.assets.brandLogo;
    };

    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([entry]) => {
            isInViewport = entry.isIntersecting;
            if (isInViewport) requestImage();
            syncAnimation();
          }, { threshold: [0, 0.15] })
        : null;

    observer?.observe(canvas);
    if (!observer) requestImage();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * VIEW_WIDTH;
      pointer.y = ((event.clientY - rect.top) / rect.height) * VIEW_HEIGHT;
    };
    const leave = () => { pointer.x = -1000; pointer.y = -1000; };
    canvas.addEventListener("pointermove", move, { passive: true });
    canvas.addEventListener("pointerleave", leave, { passive: true });
    syncAnimation();

    return () => {
      stopAnimation();
      observer?.disconnect();
      image.onload = null;
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <section id="universo-em-movimento" aria-label="Universo Marketing em movimento" className="relative overflow-hidden bg-[#050505] py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,169,0,0.13),transparent_34%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(245,169,0,0.12)] md:h-72 md:w-72" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-gold-light)]">Universo em movimento</p>
        <div className="relative mt-2 aspect-[7/4] w-full max-w-[420px] overflow-hidden">
          <Image
            src={siteConfig.assets.brandLogo}
            alt=""
            fill
            sizes="420px"
            className={`pointer-events-none object-cover transition-opacity duration-500 ${reducedMotion ? "opacity-100" : "opacity-[0.08]"}`}
          />
          <canvas
            ref={canvasRef}
            data-cursor
            data-cursor-label="MOVER"
            className="relative z-10 aspect-[7/4] h-auto w-full touch-none"
          />
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-500">Estratégia, tecnologia e movimento conectados em uma única direção.</p>
      </div>
    </section>
  );
}
