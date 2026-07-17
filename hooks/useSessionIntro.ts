"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

export function useSessionIntro() {
  const [isVisible, setIsVisible] = useState<boolean>(siteConfig.intro.enabled);
  const [isSessionResolved, setIsSessionResolved] = useState(
    !siteConfig.intro.enabled,
  );

  useEffect(() => {
    if (!siteConfig.intro.enabled) return;

    let completed = false;
    try {
      completed =
        window.sessionStorage.getItem(siteConfig.intro.sessionStorageKey) ===
        "true";
    } catch {
      completed = false;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(!completed);
      setIsSessionResolved(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function completeIntro() {
    try {
      window.sessionStorage.setItem(siteConfig.intro.sessionStorageKey, "true");
    } catch {
      // The gateway still closes when storage is unavailable.
    }

    setIsVisible(false);
  }

  return { isVisible, isSessionResolved, completeIntro };
}
