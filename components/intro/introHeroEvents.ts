export const INTRO_HERO_REVEAL_EVENT = "universo:intro-hero-reveal";

export type IntroRevealOrigin = {
  x: number;
  y: number;
};

type IntroPhase = "waiting" | "revealing" | "completed";

function setIntroPhase(phase: IntroPhase) {
  document.documentElement.dataset.universoIntro = phase;
}

export function markIntroWaiting() {
  const phase = document.documentElement.dataset.universoIntro;
  if (phase !== "completed" && phase !== "revealing") {
    setIntroPhase("waiting");
  }
}

export function releaseHeroFromIntro(origin: IntroRevealOrigin) {
  const phase = document.documentElement.dataset.universoIntro;
  if (phase === "revealing" || phase === "completed") return;

  setIntroPhase("revealing");
  window.dispatchEvent(
    new CustomEvent<IntroRevealOrigin>(INTRO_HERO_REVEAL_EVENT, {
      detail: origin,
    }),
  );
}

export function markIntroCompleted() {
  setIntroPhase("completed");
}
