import { animate, onScroll, splitText } from "animejs";
import { initializeFlowField } from "./flow-field.js";
import { initializeLandingTypewriter } from "./landing.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (!toggle || !menu) return;
  const label = toggle.querySelector("[data-menu-label]");
  const visualLabel = toggle.querySelector("[aria-hidden]");
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    label.textContent = "Open navigation";
    visualLabel.textContent = "Menu";
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
    label.textContent = open ? "Open navigation" : "Close navigation";
    visualLabel.textContent = open ? "Menu" : "Close";
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { close(); toggle.focus(); }
  });
}

function revealHero() {
  if (reducedMotion) return;
  const name = document.querySelector("[data-hero-name]");
  if (!name) return;
  const split = splitText(name, { chars: true, words: false, accessible: true });
  animate(split.chars, {
    translateY: ["115%", "0%"],
    opacity: [0, 1],
    delay: (_, index) => 130 + index * 18,
    duration: 720,
    ease: "out(4)"
  });
  animate("[data-hero-item]", {
    translateY: [14, 0], opacity: [0, 1], delay: 90, duration: 500, ease: "out(3)"
  });
}

function revealSections() {
  if (reducedMotion) return;
  document.querySelectorAll(".home-section .section-heading, .page-intro, .about-section").forEach((target) => {
    onScroll({
      target,
      enter: "top 84%",
      onEnter: () => animate(target, { translateY: [18, 0], opacity: [0, 1], duration: 520, ease: "out(3)" })
    });
  });
}

function setWorkFilters() {
  const filters = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-project]");
  const status = document.querySelector("[data-filter-status]");
  if (!filters.length || !items.length) return;
  filters[0].parentElement.removeAttribute("hidden");
  filters.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    items.forEach((item) => {
      const matches = filter === "all" || item.dataset.categories.includes(filter);
      item.hidden = !matches;
      if (matches) count += 1;
      if (matches && !reducedMotion) animate(item, { opacity: [0, 1], translateY: [8, 0], duration: 240, ease: "out(3)" });
    });
    if (status) status.textContent = `${count} ${count === 1 ? "project" : "projects"} shown for ${button.textContent}.`;
  }));
}

setMenu();
revealHero();
revealSections();
setWorkFilters();
initializeFlowField();
initializeLandingTypewriter();
