const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

function flowAngle(x, y, time) {
  return Math.sin(x * .0047 + time * .00022) * 1.35
    + Math.cos(y * .0041 - time * .00018) * 1.1
    + Math.sin((x + y) * .0023 + time * .00013) * .62 - Math.PI / 2;
}

function particleCount(width, height) {
  const area = width * height;
  const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const mobile = width < 760;
  const density = lowPower ? .00009 : .00014;
  return clamp(Math.round(area * density), mobile ? 55 : 120, mobile ? 110 : 260);
}

function drawStaticFrame(context, width, height) {
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.strokeStyle = "rgba(68, 217, 255, .19)";
  for (let row = 0; row < 13; row += 1) {
    context.beginPath();
    const y = ((row + 1) / 14) * height;
    for (let x = 0; x <= width; x += 24) {
      const offset = Math.sin(x * .012 + row * .75) * 14 + Math.sin(x * .004 + row) * 9;
      if (x === 0) context.moveTo(x, y + offset);
      else context.lineTo(x, y + offset);
    }
    context.stroke();
  }
}

export function initializeFlowField() {
  const canvas = document.querySelector("[data-flow-field]");
  const hero = document.querySelector("[data-landing-hero]");
  if (!canvas || !hero) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  let width = 0;
  let height = 0;
  let particles = [];
  let pointer = { x: -1000, y: -1000, active: false };
  let active = true;
  let running = false;
  let frame = 0;
  let lastFrame = 0;
  const isReduced = reducedMotion();

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: particleCount(width, height) }, () => ({
      x: Math.random() * width, y: Math.random() * height, px: 0, py: 0, speed: .55 + Math.random() * .9
    }));
    particles.forEach((particle) => { particle.px = particle.x; particle.py = particle.y; });
    if (isReduced) drawStaticFrame(context, width, height);
  };

  const step = (timestamp) => {
    if (!running) return;
    frame = window.requestAnimationFrame(step);
    if (document.hidden || isReduced || timestamp - lastFrame < 32) return;
    lastFrame = timestamp;
    context.fillStyle = "rgba(5, 7, 11, .11)";
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "lighter";
    context.lineWidth = .8;
    context.strokeStyle = "rgba(53, 204, 255, .32)";
    for (const particle of particles) {
      particle.px = particle.x;
      particle.py = particle.y;
      const angle = flowAngle(particle.x, particle.y, timestamp);
      let vx = Math.cos(angle) * particle.speed;
      let vy = Math.sin(angle) * particle.speed;
      if (pointer.active) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 128) {
          const force = (1 - distance / 128) * 1.15;
          vx += (dx / (distance || 1)) * force;
          vy += (dy / (distance || 1)) * force;
        }
      }
      particle.x += vx;
      particle.y += vy;
      if (particle.x < 0 || particle.x > width || particle.y < 0 || particle.y > height) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.px = particle.x;
        particle.py = particle.y;
      }
      context.beginPath();
      context.moveTo(particle.px, particle.py);
      context.lineTo(particle.x, particle.y);
      context.stroke();
    }
    context.globalCompositeOperation = "source-over";
  };

  hero.addEventListener("pointermove", (event) => {
    if (!active || isReduced) return;
    const rect = hero.getBoundingClientRect();
    pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true };
  }, { passive: true });
  hero.addEventListener("pointerleave", () => { pointer.active = false; }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  const start = () => {
    if (running || isReduced || document.hidden) return;
    running = true;
    frame = window.requestAnimationFrame(step);
  };
  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (active) start();
    if (!document.hidden && isReduced) drawStaticFrame(context, width, height);
  });
  new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    pointer.active = false;
    if (active) start();
    else stop();
  }, { threshold: .01 }).observe(hero);

  resize();
  start();
  return () => window.cancelAnimationFrame(frame);
}
