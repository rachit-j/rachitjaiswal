import { animate, onScroll } from "animejs";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function drawContactField() {
  const canvas = document.querySelector("[data-contact-field]");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const render = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width; canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = "rgba(68,217,255,.45)"; context.lineWidth = 1;
    for (let i = 0; i < 9; i += 1) { context.beginPath(); for (let x = 0; x <= width; x += 20) { const y = height * .62 + i * 13 + Math.sin(x * .012 + i) * (7 + i); if (x === 0) context.moveTo(x, y); else context.lineTo(x, y); } context.stroke(); }
  };
  render(); window.addEventListener("resize", render, { passive: true });
}

export function initializeStoryMotion() {
  const hero = document.querySelector("[data-landing-hero]");
  const content = document.querySelector("[data-hero-content]");
  const header = document.querySelector(".site-header");
  const flowCanvas = hero?.querySelector("[data-flow-field]");
  const line = document.querySelector("[data-signal-path]");
  const projects = document.querySelectorAll("[data-featured-project]");
  const timeline = document.querySelectorAll("[data-timeline-item]");
  const timelinePath = document.querySelector("[data-timeline-path]");
  if (!hero || !content || !header) return;
  drawContactField();
  if (reduced()) return;

  let queued = false;
  const updateHero = () => {
    queued = false;
    const progress = Math.max(0, Math.min(1, window.scrollY / Math.max(1, hero.offsetHeight)));
    content.style.transform = `translateY(${-progress * 42}px) scale(${1 - progress * .035})`;
    content.style.opacity = String(1 - progress * .7);
    if (flowCanvas) flowCanvas.style.opacity = String(.86 - progress * .7);
    header.classList.toggle("is-scrolled", progress > .08);
  };
  window.addEventListener("scroll", () => { if (!queued) { queued = true; requestAnimationFrame(updateHero); } }, { passive: true }); updateHero();

  const story = document.querySelector("[data-home-story]");
  if (line && story) onScroll({ target: story, enter: "top bottom", onEnter: () => animate(line, { strokeDashoffset: [1000, 0], duration: 1800, ease: "out(3)" }) });
  projects.forEach((project) => onScroll({ target: project, enter: "top 78%", onEnter: () => {
    animate(project.querySelector("[data-project-media]"), { clipPath: ["inset(10% 12% 10% 12%)", "inset(0% 0% 0% 0%)"], scale: [.96, 1], duration: 650, ease: "out(4)" });
    animate(project.querySelector("[data-project-copy]"), { translateY: [28, 0], opacity: [0, 1], duration: 520, ease: "out(3)" });
  }}));
  const timelineRoot = document.querySelector("[data-experience-timeline]");
  if (timelineRoot && timelinePath) onScroll({ target: timelineRoot, enter: "top 78%", onEnter: () => animate(timelinePath, { strokeDashoffset: [100, 0], duration: 900, ease: "out(3)" }) });
  timeline.forEach((item) => onScroll({ target: item, enter: "top 75%", onEnter: () => {
    animate(item.querySelector("[data-timeline-node]"), { scale: [0, 1], duration: 320, ease: "out(4)" });
    animate(item.querySelector("[data-timeline-copy]"), { translateX: [-16, 0], opacity: [0, 1], duration: 420, ease: "out(3)" });
  }}));
}
