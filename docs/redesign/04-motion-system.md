# Motion system

## Principles

Motion is progressive enhancement. It must communicate hierarchy, a state change, an interaction, or a genuine technical relationship. The static site remains complete and well-composed without JavaScript.

## Architecture

- Install stable Anime.js 4.x through the Node asset pipeline with modular ESM imports, not a CDN or beta release.
- Keep orchestration in `assets/js/main.js` and focused modules under `assets/js/motion/` for shared constants, hero, reveal, projects, and diagrams. Templates expose semantic hooks only.
- Use CSS for simple state/hover feedback where sufficient.

## Behaviors

- **Hero:** reveal navigation, name, statement, and technical metadata/rule in an ordered 0.8–1.4 second composition. Source text remains available to assistive technology.
- **Scroll:** animate selected section headings, featured-work compositions, and meaningful diagrams selectively. Never use generic fade-up on every element.
- **Work filtering:** controls update semantic state/content first; layout animation only clarifies reflow.
- **Microinteractions:** image 1→1.02 scaling, arrow offset up to 4px, and rule/metadata transitions are short and restrained.
- **Technical diagrams:** animate SVG paths only for genuine project architecture or data-flow explanations supported by project material.

## Reduced motion

- Detect `prefers-reduced-motion` in CSS and JavaScript before initiating nonessential animation.
- Disable large transforms, scrolling/scrubbing, text splitting, and decorative transitions while retaining information, navigation, filters, and keyboard behavior.
- Remove the p5/wave/particle background and rotating typewriter; do not replace them with other persistent animation.
