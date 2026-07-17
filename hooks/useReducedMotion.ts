"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribers = new Set<() => void>();
let mediaQuery: MediaQueryList | null = null;

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber());
};

const getMediaQuery = () => {
  if (!mediaQuery && typeof window !== "undefined") {
    mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  }

  return mediaQuery;
};

const subscribe = (subscriber: () => void) => {
  subscribers.add(subscriber);
  const query = getMediaQuery();

  if (subscribers.size === 1) {
    query?.addEventListener("change", notifySubscribers);
  }

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) {
      query?.removeEventListener("change", notifySubscribers);
    }
  };
};

const getSnapshot = () => getMediaQuery()?.matches ?? false;
const getServerSnapshot = () => false;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
