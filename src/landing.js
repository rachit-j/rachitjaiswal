const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initializeLandingTypewriter() {
  const target = document.querySelector("[data-typewriter]");
  if (!target || prefersReducedMotion()) return;
  // Keep the server-rendered first identity visible immediately. Additional
  // approved phrases can be added later without ever blanking the hero.
  target.textContent = "I am Rachit Jaiswal";
}
