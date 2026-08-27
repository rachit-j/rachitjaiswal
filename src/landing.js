const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initializeLandingTypewriter() {
  const target = document.querySelector("[data-typewriter]");
  if (!target || prefersReducedMotion()) return;

  const phrase = "I am Rachit Jaiswal";
  target.textContent = "";
  let position = 0;
  const type = () => {
    target.textContent = phrase.slice(0, position);
    position += 1;
    if (position <= phrase.length) window.setTimeout(type, position === 1 ? 360 : 62);
  };
  type();
}
