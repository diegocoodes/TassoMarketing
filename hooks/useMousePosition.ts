"use client";

import { useEffect, useState } from "react";

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPosition({ x: event.clientX, y: event.clientY }));
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => {
      window.removeEventListener("pointermove", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return position;
}
