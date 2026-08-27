# Visual Pivot: Original Heritage → Technical Scroll Story

## Evidence and limitation

The original `main` worktree (`/private/tmp/rachit-site-original`) and the current `redesign-2026-portfolio` output were built and compared at template, CSS, JavaScript, asset, and generated-HTML level. Browser-control/screenshot tooling is not available in this environment, so this is not a pixel-level visual approval. The implementation must still complete the required local viewport QA (desktop, laptop, tablet, and phone) once a browser surface is available.

The original `/home` composition is explicit in `_layouts/homepage.html`: a fixed black canvas, fixed p5 canvas behind content, a full-viewport centered hero, cyan `I am …` typewriter, a concise `AI • Robotics • Systems Engineering` line, and a compact translucent fixed navigation. Its flow-field (`assets/js/waves.js`) is the actual visual signature: fine moving trails, dark depth, and light pointer response. The original `/` landing is a separate, even simpler black/cyan entry screen. The current redesign homepage instead begins with a light-default Instrument Sans editorial grid, rust accent, offset two-line `Rachit / Jaiswal` display, then a staggered grayscale logo-card grid.

## Preserve from original

- **Immersive first viewport.** Retain a true `100svh` black/near-black landing state with one centered focal group, not a content-heavy above-the-fold resume or an offset editorial composition.
- **Cyan energy on black.** Cyan/electric blue is the primary identity and interaction/motion signal. Use off-white for readable content and subdued slate for supporting content; do not introduce a competing warm UI palette.
- **Flow-field character.** Recreate the p5 flow-field as a refined progressive enhancement: fine cyan/blue trails moving across a dark field, restrained pointer response, and no unrelated visual effect substituted in its place. It conveys the original technical curiosity better than a generic particle network.
- **Simple, centered identity.** The hero should lead with `I am Rachit Jaiswal`, a single verified domain line, and a scroll affordance. The small amount of information is intentional: it creates atmosphere and curiosity before the technical narrative begins.
- **Technical type roles.** Keep the original lineage of WDXL Lubrifont SC for identity/display and Oxanium (or the established technical companion) for navigation, metadata, and compact body UI. Limit the final system to these clear roles plus, only if needed, one highly legible reading face.
- **Quiet depth, not UI chrome.** A subtle dark translucent header and carefully bounded cyan glow/opacity in the flow field may remain. The original’s personality comes from depth and motion, not from dense cards, labels, or decorative rules.
- **Typewriter recognizability.** Keep a polished typewriter for the hero identity, beginning with the verified name. Avoid replacing it with an Anime.js character reveal. Unconfirmed future phrases remain `TODO: USER INPUT`; reduced motion shows stable copy without a cursor animation.

## Preserve from redesign

- Shared valid Jekyll page shell, semantic landmarks, canonical navigation, URL redirects, SEO metadata, and responsive accessible navigation.
- Structured `_data` sources and reusable project/experience components; the visual pivot must not return to duplicated long-form page HTML or duplicated facts.
- Node-managed compiled CSS and modular JavaScript, including the installed Anime.js dependency. Keep Jekyll as the page/content system.
- Existing project and writing URL preservation, cleaner Work/About/Writing information architecture, and content-verification discipline.
- Keyboard/focus treatment, accessible mobile menu and filters, lazy-loading/explicit media handling, and baseline reduced-motion behavior.
- The actual portrait, project marks, project PDFs, and any other existing assets as evidence-backed material. Do not fabricate project screens, metrics, diagrams, or images to fill a cinematic layout.

## Remove or rework from redesign

- Remove the warm cream `#f5f3ec` default, rust `#a8452d` accent, and radically different automatic light/dark identities. The canonical site is dark; `color-scheme` should communicate dark controls rather than define a beige alternate brand.
- Replace the giant offset `Rachit / Jaiswal` display and its editorial reading order with a centered hero built around the original `I am …` phrasing and supporting domain line.
- Replace Instrument Sans/IBM Plex Mono as the visual identity. They may remain only if a body-text legibility test justifies one of them; the hero/nav must restore a recognizable technical type lineage.
- Rebuild the staggered editorial project grid, grayscale-first logo treatments, generic large surface boxes, and magazine-like offsets. Featured work must occupy larger sequential compositions and use real supporting visuals where they exist; logos become secondary marks.
- Reduce thin horizontal rules and tiny uppercase eyebrows from default structural decoration to purposeful metadata/progress/section connections only. Cyan must guide attention, not outline every surface.
- Replace the current generic `translateY + opacity` section reveal as the primary motion language. Motion must represent a scroll-driven state change: hero opens, signal path continues, projects unfold, and the timeline activates.

## Decision-ready landing specification

1. **Canvas and chrome:** The homepage starts on `#05070b` (or equally near-black), with a fixed/absolute full-hero flow-field canvas below content. The header overlays the hero in a subtle dark translucent treatment; it becomes more legible with a restrained backing once the hero begins to exit. Do not put the header in a beige bordered bar.
2. **Hero composition:** At every desktop width, keep the identity group centered horizontally and visually near the viewport center. It contains only the typewriter headline (`I am Rachit Jaiswal` as first stable phrase), the verified `AI • Robotics • Systems Engineering` line, and a cyan scroll indicator. On mobile, preserve this hierarchy and 44px navigation targets; reduce flow density and do not shrink the identity below clear readability.
3. **Flow-field implementation:** Use a canvas implementation compatible with the modular build, preferably a small local canvas module rather than loading p5 from a CDN. Cap DPR at 1–1.5, derive particles from viewport area/device capability, use a low mobile cap, do pointer work only during hero visibility, and pause simulation via `IntersectionObserver` when the hero is offscreen. In reduced motion, show a static sparse cyan trace/gradient-like canvas frame with no loop or pointer response.
4. **Hero exit:** Native scrolling remains untouched. Across approximately the first hero exit, Anime.js maps hero copy to a small upward translation and subtle scale/opacity reduction; the flow field dims and then pauses; the indicator becomes the origin of a thin cyan SVG signal path; the first content section rises into the dark canvas. No abrupt screen swap, pinned full-screen scene, scroll snap, or delayed navigation.
5. **Continuous motif:** The cyan signal path is one semantic visual system: a modest SVG line from the hero indicator, then section connector/progress line, then the experience timeline. It should draw only when it explains sequence/progress and must not become a decorative squiggle.

## Decision-ready below-fold direction

- **Selected work is the primary scroll story.** Show 3–5 featured projects in an ordered vertical sequence. Desktop may use a partially sticky media stage and mask/scale changes while adjacent title, role, year, and concise statement update; mobile uses ordinary vertical sections with efficient image reveal. This is not a carousel and never intercepts scroll.
- **Use evidence-backed visuals.** Prefer supplied project PDFs, screenshots, diagrams, robotics imagery, or project-specific media when present. If an item only has a logo, compose it as a technical mark with descriptive content rather than inventing a screenshot or architecture graphic.
- **Experience/research becomes a timeline.** Bind the same cyan line to real structured experience entries. Draw the path and activate nodes/associated text on entry; do not animate every bullet or create a game-like skill tree. Unconfirmed content stays `TODO: USER INPUT` in the content-input document, not invented public prose.
- **Capabilities and writing stay quiet.** Capabilities are large, sparse technical words rather than four cards or skills chips. Writing is a readable list with minimal interaction feedback. The final contact area can reprise low-intensity flow-field energy and resolve the cyan path.

## Motion and accessibility guardrails

- Anime.js begins meaningfully at the hero-to-content boundary and coordinates composed states; it does not replace normal document flow or serve as a site-wide fade-up utility.
- Favor `transform`, `opacity`, SVG stroke/mask, and layout-stable media. Desktop sticky behavior must have a non-sticky mobile fallback.
- The no-JavaScript page remains complete: canvas is absent or static, hero copy is present, project/story order remains intelligible, and links/navigation work normally.
- Reduced motion removes scroll-scrubbed transforms, canvas looping, decorative transitions, and cursor blinking while retaining the black/cyan visual identity and immediately available content.
- Validate hero readability against the moving field, keyboard focus against near-black surfaces, canvas `aria-hidden`, typewriter stable accessible text, menu focus/escape behavior, and no horizontal overflow at all required widths.

## Required visual checkpoints after implementation

Capture and evaluate the homepage at 0%, 25%, 50%, 75%, and 100% scroll on desktop and mobile. The 0% frame must be immediately recognizable as an evolution of the original; 25–75% must visibly become a mature technical scroll narrative; the end must resolve the signal path and visual energy rather than stop after a list.
