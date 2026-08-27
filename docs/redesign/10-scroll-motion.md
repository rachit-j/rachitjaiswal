# Scroll Motion System — Visual Pivot

## Intent and baseline

The homepage is a two-part experience: the first viewport retains the original site's centered, black, cyan flow-field identity; native scrolling then opens into a more mature technical portfolio. Animation communicates transition, sequence, and technical relationships—not generic viewport entrance effects. The existing shared Jekyll shell, `src/main.js` ESM entry point, Anime.js 4.5 dependency, and static no-JavaScript reading order remain the baseline.

Motion must use the existing dark/cyan visual direction defined by the pivot. This document specifies behavior and integration hooks only; it does not change typography or palette.

## Required homepage hooks

Replace the current home hero's content hooks with the following semantic structure; all text and links must be visible and usable before JavaScript executes.

```html
<section class="landing" data-landing aria-labelledby="hero-title">
  <div class="landing__flow" data-flow aria-hidden="true"><canvas data-flow-canvas></canvas></div>
  <div class="landing__content" data-landing-content>
    <h1 id="hero-title" data-typewriter>…</h1>
    <p data-landing-domain>AI • Robotics • Systems Engineering</p>
  </div>
  <a class="landing__scroll-guide" data-scroll-guide href="#selected-work">…</a>
</section>
<div class="signal-path" data-signal-path aria-hidden="true">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path data-signal-path-line … /></svg>
</div>
```

- `data-typewriter` contains the initial, complete string **“I am Rachit Jaiswal”** as its static fallback. Additional cycling strings are supplied only from a `data-typewriter-phrases` value after the user supplies approved wording; do not encode unverified titles.
- `data-flow` is a visually hidden-from-assistive-tech canvas layer; `data-flow-canvas` is the only drawing target. It is positioned behind, never intercepts pointer/touch input, and pauses when `data-landing` is not intersecting the viewport.
- `data-scroll-guide` is an ordinary anchor. Its visual rule shares the start point of the document-level signal path but does not prevent native anchor navigation.
- Add `data-home-section` and a unique `data-signal-stop` value to Selected Work, Experience, Capabilities, Writing, and the contact/footer ending. The signal SVG must be a separate decorative element, never a substitute for timeline/heading information.

For work, use semantic, vertically ordered content and augment it with these hooks:

```html
<section id="selected-work" data-work-sequence>
  <article data-featured-project data-project-index="01">
    <div data-project-media>…real supported media or existing mark fallback…</div>
    <div data-project-copy>…</div>
    <svg data-project-diagram>…only when source material supports it…</svg>
  </article>
</section>
```

`data-project-media` requires an explicit CSS aspect ratio and a non-animated initial state. `data-project-diagram` is optional and has no semantic content unavailable elsewhere. The proposed Experience markup is `<ol class="experience-timeline" data-experience-timeline>` with each item exposing `data-timeline-item`, `data-timeline-node`, and `data-timeline-copy`; its date, organization, and role remain ordinary readable HTML.

## Runtime modules and state model

Keep `src/main.js` as the small coordinator and split behavior into `src/motion/` modules:

| Module | Public interface | Responsibility |
| --- | --- | --- |
| `flow-field.js` | `createFlowField({ canvas, root, reducedMotion }) → { pause, resume, destroy }` | Canvas implementation of the original slow flowing cyan field; no p5 global, no pointer work outside the landing, capped DPR and adaptive particles. |
| `typewriter.js` | `startTypewriter({ element, phrases, reducedMotion }) → { stop }` | Preserve the original typewriter character. Initial text starts stable; only approved additional phrases cycle. |
| `hero-transition.js` | `initHeroTransition({ landing, content, flow, guide, header, reducedMotion })` | Scroll-linked landing exit and header state. |
| `signal-path.js` | `initSignalPath({ line, stops, reducedMotion })` | Draws the decorative cyan signal only across real section transitions. |
| `work-sequence.js` | `initWorkSequence({ root, projects, reducedMotion, isMobile })` | Desktop project-stage states and mobile independent project reveals. |
| `timeline.js` | `initTimeline({ root, items, reducedMotion })` | Draws the experience path and activates nodes/copy once. |

Each initializer returns a cleanup function. `main.js` calls them only on Home, uses a single `matchMedia('(prefers-reduced-motion: reduce)')` listener, and rebuilds/destroys breakpoint-specific sequences on desktop/mobile changes. Existing menu and Work-filter initialization remains independent.

Use Anime.js 4 `animate`, `timeline`, `onScroll`, and SVG draw/path animation. Reserve `splitText` for optional below-fold project headings only if the resulting DOM preserves the accessible source string; it is not the typewriter replacement. Use `createLayout()` only for the standalone Work filter's layout changes, after filtering semantic state is updated.

### Scroll states

1. **Landing, 0–~80vh:** Flow field runs at low intensity; centered identity remains legible. Typewriter may cycle after its first complete phrase. Nothing below the fold is required to animate.
2. **Opening, ~60–125vh:** `onScroll()` maps the landing content to a small upward translation (maximum 8–12%), slight scale reduction (no less than .96), and opacity fade. The flow canvas reduces opacity/contrast and pauses after the landing leaves view. The header gains its defined backing/state. The guide line becomes the first segment of the signal path while Selected Work enters at normal document position.
3. **Featured work:** On desktop only, the work root supplies a naturally sized sticky visual/copy stage with a bounded sticky range. As the reader progresses through each article, `data-project-media`, `data-project-copy`, index, and signal progress transition between project states; the previous project is never removed from document order or focus. Use a mask/clip reveal plus ≤1.03 media scale and staggered copy/metadata opacity. On mobile, disable sticky/scrubbing and reveal each project once with a short media mask/copy transition.
4. **Experience:** When the timeline enters, draw its real SVG path once; activate each node and associated copy as its item reaches the middle of the viewport. Do not scrub individual text or animate every bullet.
5. **Quiet sections and ending:** Capability words use a small emphasis change only; Writing has hover/focus feedback and at most a one-time list reveal. At Contact, the signal line resolves and the flow-field idea may return as a static/subtle low-cost cyan texture—not a second persistent simulation.

No wheel interception, scroll snapping, horizontal pinning, fullscreen route transitions, cursor effects, perpetual below-fold loops, or a universal fade-up observer.

## Flow-field performance and motion preferences

Port the original `assets/js/waves.js` behavior—slow flow direction, cyan energy, trails, and centered-hero depth—rather than its broad mutable hue palette or its p5 global lifecycle. Implement canvas directly or wrap p5 only if benchmarked equivalent; the runtime must expose pause/resume/destroy.

- Cap canvas DPR at `min(devicePixelRatio, 1.5)` desktop and `1` on mobile. Start with an adaptive budget (desktop 450–650 particles, laptop 350–500, mobile 120–220) and reduce it when `navigator.hardwareConcurrency <= 4`, `deviceMemory` is low when available, or frame time remains above 20ms for a short sample window.
- Use `requestAnimationFrame`, `IntersectionObserver`, `visibilitychange`, and resize debouncing. Stop RAF when hidden/offscreen; only attach a throttled pointer effect while the landing is intersecting and pointer capability is `fine`. Touch is passive and optional; it must not block scroll.
- Respect battery/data constraints when detectable (`saveData`): choose the low budget. Do not fetch external animation libraries.
- With reduced motion: do not create the simulation, typewriter cycle, scroll-scrub transforms, sticky project sequence, or SVG draws. Render a static near-black canvas/SVG texture with the same cyan identity; show every project/timeline item in its final state immediately. Keep ordinary hover/focus affordances short or static.

## Verification and acceptance checks

- Check Home at 0%, 25%, 50%, 75%, and 100% scroll at 1440px, 1024px, 768px, and 375px. Verify the landing immediately recalls the original before the cyan signal takes over after scroll.
- Record performance with DevTools: no RAF after hero exit, no significant scroll-handler work, no canvas pointer listeners while offscreen, no layout shifts from media, and no console errors. Test tab navigation through the hero anchor, each project link, timeline links, and footer.
- Test `prefers-reduced-motion: reduce` before load and after a live preference change: static flow treatment, no hidden or delayed content, and native scroll/anchor behavior remain correct.
- Test no-JavaScript rendering: complete hero identity, selected work, experience timeline data, capabilities, Writing, and contact retain a coherent reading order; signal/path and all animation states are decorative enhancement only.
