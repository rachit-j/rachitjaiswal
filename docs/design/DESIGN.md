# Signal — design system for rachitjaiswal.com

Signal is the visual theme for Rachit Jaiswal's personal site. It combines a schematic style (white paper, ink lines, one violet signal color, systems drawn as pipelines) with fluid, purposeful motion: a living attractor on the homepage cover, signals that propagate through project diagrams, and a scroll tracker.

**Sources of truth, in order:**
1. This file, for every visual and interaction decision.
2. The reference implementation in `signal-site/`. It is the exact target for markup, CSS, JS, and appearance. `assets/signal.css` and `assets/signal.js` should be ported verbatim.
3. The content handoff packet (`rachit-website-content-handoff/`), for every fact, date, metric, and piece of public copy.

If this file and the reference implementation disagree, follow the reference implementation and fix this file. If either disagrees with the handoff on content, the handoff wins.

---

## 1. The idea

The site should read like a well-drawn system diagram: calm, precise, and easy to scan, with one color reserved for "where the signal is right now." Motion is the signal moving: through a morphing attractor on the homepage cover, through a project's stages on its case study, down the spine of the notebook as you read.

Two equations carry the identity:
- a recursive **Peter de Jong attractor** fills the homepage cover;
- a **harmonograph** (two decaying oscillations) makes the small marks: the favicon and the scroll tracker.

The personal identity carries over from the original site so returning visitors recognize it: the circular profile photo as logo, the name card, the tagline, and the email, GitHub, and LinkedIn icons.

## 2. Principles

1. **Cover, then a lean sheet.** The homepage opens on a full-screen ink cover with the moving attractor and the name card. Scrolling slides a white sheet up over it, carrying the introduction, three projects, and the notebook teaser. Diagrams, filters, and details live on their own pages.
2. **One signal color.** Violet means active, selected, current, or "you are here." It is never decoration.
3. **Show structure, not claims.** Projects are explained as the systems they are. A diagram stage exists only if its content is confirmed in the handoff.
4. **Motion answers something.** Every animation responds to a page load, a scroll, or a click, and has a reduced-motion fallback.
5. **Type carries personality.** Large, tight Bricolage Grotesque headlines do the expressive work; everything else stays quiet.

## 3. Decision log (don't reintroduce rejected directions)

| Decision | Rejected alternative |
|---|---|
| White paper / ink / violet schematic theme | The old site's starfield, constellation background, futuristic fonts, cyan glow, and glass cards |
| Same theme | A warm off-white editorial theme with muted green illustrations and blue accents |
| Notebook as structure and content | Literal notebook paper, handwriting, or a stationery look |
| De Jong attractor on a full-screen cover | Hilbert curve (replaced), boxed harmonograph in the hero (moved to the small marks) |
| Flow diagrams only on case-study pages | Flow diagrams on the homepage |
| Projects-by-area dot matrix parked in `parked/` | The matrix on the homepage |
| Notebook = experiences, research, and real writing | Invented draft posts or "planned topic" entries |
| No résumé download anywhere | Any résumé, CV, or download control |

## 4. Tokens

### Color

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#ffffff` | Page and sheet background |
| `--ink` | `#17181f` | Text, lines, borders; the cover and notebook-teaser fields |
| `--graph` | `#5a5f6d` | Secondary text, metadata (6.4:1 on paper) |
| `--hair` | `#dcdee4` | Dividers, inactive spine |
| `--hair2` | `#eef0f3` | Grid-paper lines, faint dividers |
| `--sig` | `#5b2ee0` | Signal: selected, current, active; the contact footer field (white text 7.2:1) |
| `--sig-soft` | `#efeaff` | Hover fill on interactive elements |
| `--sig-ink` | `#3d1aa8` | Signal-colored text on paper |
| `--sig-light` | `#b9a6ff` | Signal on ink |
| `--on-ink` | `#c9ccd6` | Secondary text on ink |
| `--on-sig` | `#e9e3ff` | Secondary text on signal |

There are three fields: **paper** (content), **ink** (the homepage cover and the notebook teaser), and **signal** (the contact footer). Don't add other background colors.

### Type

| Role | Face | Setting |
|---|---|---|
| Cover name (in lockup) | Bricolage Grotesque 800 | `clamp(2.9rem,9vw,8.25rem)/.86`, tracking −0.045em, opsz 96 |
| Display / page titles | Bricolage Grotesque 800 | `.display` `clamp(3.1rem,10.5vw,9.5rem)/.86`; `.h-page` `clamp(2.8rem,8vw,6.5rem)/.9`, tracking −0.04em |
| Section heads | Bricolage Grotesque 800 | `clamp(2rem,4.5vw,3.5rem)/.95`, tracking −0.035em |
| Intro statement (home sheet) | Bricolage Grotesque 700 | `clamp(1.6rem,3.4vw,2.7rem)/1.18`, max 34ch |
| Sub-heads, entry titles | Bricolage Grotesque 700 | 1.3–1.6rem, tracking −0.015em |
| Body | Public Sans 400/500/600 | 1.03rem/1.6; lede 1.12–1.25rem |
| Data (dates, stage keys, captions, equation) | Geist Mono 400/500 | 0.72–0.85rem |

Fonts load from Google Fonts with system fallbacks (see `<head>` in the reference pages). Mono is only for real data. Use sentence case everywhere: no all-caps labels and no eyebrow text above headings.

### Layout

- Max width `76rem`; gutter `clamp(1.1rem,4vw,2.5rem)`; header height `3.6rem`.
- Left-aligned throughout. Body text max ~40rem.
- Grid paper (`.grid-paper`, 24px) appears only behind diagrams and the harmonograph figure.
- Square corners. Borders are 1–1.5px ink. No shadows, gradients, or rounded cards. Circles are allowed only for the photo, status dots, and the signal head.
- Breakpoints: 900px (columns collapse, flows turn vertical), 700px (cover reflows, equation hides), 540px (header name text hides, lockup stacks, contact rows stack).

### Motion

| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(.22,.7,.2,1)` |
| `--step` | 140ms per stage when a signal propagates |
| Title rule draw | 1.4s, once on load |
| Avatar signal dot | pops in at 1.4s, 0.6s |
| Attractor loop | 110s per parameter loop |
| Harmonograph draw | 2800ms, ease-in-out-quad |
| Hover slides | 0.35–0.4s |

## 5. Pages and production routes

The reference uses flat file names. The production site keeps its existing URLs (handoff `07_IMPLEMENTATION_AND_ROUTES.md`):

| Reference file | Production route | Notes |
|---|---|---|
| `index.html` | `/` | New homepage: cover plus sheet. |
| — | `/home` | Must keep working. Serve the same homepage or redirect to `/`, whichever the stack supports cleanly, with a canonical URL of `/`. |
| `work.html` | `/projects` | The nav label is "Work." |
| `work/math-ai.html` | `/projects/math-ai` | New page. |
| `work/aruw-perception.html` | `/projects/aruw-perception` | New page. |
| `work/kasmv2.html` | `/projects/kasmv2` | Existing route, new content and layout. |
| `notebook.html` | `/notebook` | New page. |
| `about.html` | `/about` | Existing route. |
| — | `/blogs` and dated posts | Keep every URL. Restyle with Signal prose (§7.14) and archive notices from handoff `06`. |
| — | `/projects/{scorpio,trinamix,horizon,medilink,rift,artemis,ucmerced,codemaxxers}` | Keep the routes. Restyle as case studies **without** a flow diagram unless stages are confirmed. Use handoff `05` copy. |

**Navigation:** Work (`/projects`), Notebook (`/notebook`), About (`/about`). The brand (photo + name) links to `/`. Contact is the footer on every page. `/blogs` is reached from the notebook ("All writing, including the archive").

In production, the "Earlier projects" rows on `/projects` link to their existing project routes; the reference shows them as non-links only because those pages didn't exist there. Rows without a verified destination stay `.row.static`.

### Page contents

- **Home:** the cover (lockup, icons, scroll cue, equation, pause), then a sheet with the intro statement and two links (Explore my work, Open the notebook), "Selected work" (3 rows plus an "All work" link), the ink notebook teaser (CMU, Qualcomm, CAIDA, then Open the notebook), and the footer.
- **Work:** a ruled page title, a lede, the three case-study rows, the Hive line (In development), and an "Earlier projects" list.
- **Case study:** a crumb ("All work"), a ruled title, the state and context line, a one-sentence summary, the flow band, the prose sections and facts aside, and a "Next project" row (Math AI → CMR → ARUW → Math AI).
- **Notebook:** a ruled title, a lede, a sticky filter bar with a count, a year index, and a log grouped In progress / 2026 / 2025 / 2024 / 2023 / 2022 / 2019 / Earlier.
- **About:** a ruled title, the about intro (handoff), a link to the notebook, then Education and Capabilities.

## 6. Identity assets

| Asset | Source | Notes |
|---|---|---|
| Profile photo | Original site `/assets/img/profile.png` (the landing-card avatar) | The reference ships a low-resolution crop. Production must use the original full-resolution file. |
| Contact icons | Inline SVG, copied from the reference | Drawn envelope, GitHub mark, LinkedIn "in" |
| Favicon | Undamped 2 : 3 harmonograph as an inline SVG data URI | Copy the `<link rel="icon">` from the reference `<head>` |
| Tagline | Handoff landing copy | "AI · Robotics · Systems · Human-computer interaction" |
| Contact details | Handoff `public-content.json` | Email `jaiswal.rachit07@gmail.com` ("Email"), GitHub `rachit-j`, LinkedIn |

## 7. Components

Class names, data attributes, IDs, and DOM structure are a **contract** with `signal.js` and `signal.css`. Preserve them exactly.

### 7.1 Header (`.site-head`)
Sticky, translucent white, with a hairline bottom border. The brand is the photo (`.avatar-sm`, 30px, 1.5px ink ring) plus the name; below 540px only the photo shows. Nav links get a violet underline that draws in on hover; the current page keeps it (`aria-current="page"`). On the homepage the body has `class="has-cover"`, the header is `position: fixed`, and it starts with `.on-cover` (transparent, light text); JS removes that class once the sheet reaches the header.

### 7.2 Titles (`.display`, `.h-page`, `.h-sec`, `.ruled`)
Large and tight. `.ruled` adds an ink rule (white on the cover) that draws left to right once on load.

### 7.3 Cover (`[data-cover]`, home only)
A full-viewport ink panel (`position: sticky; top: 0; height: 100svh; min-height: 34rem`) at `z-index: 0`. `main.sheet` (paper) and `.site-foot` sit above it at `z-index: 2`, so scrolling slides the sheet over the cover.

- **Background canvas (`.cover-canvas`)** renders a Peter de Jong attractor. Each point comes from the previous one:
  ```
  x′ = sin(a·y) − cos(b·x)
  y′ = sin(c·x) − cos(d·y)
  ```
  The parameters travel a closed loop, `p(t) = center + amplitude · sin(2πt + phase)`:
  center `(2.017, −2.324, 1.049, −2.277)`, amplitude `(0.342, 0.336, 0.346, 0.574)`, phase `(2.213, 0.114, 0.693, 4.708)`.
  One loop takes 110s, starting at a random t. The loop was found by search so the map stays chaotic almost everywhere along it. If a frame collapses (distinct pixels < 0.3% of the canvas), time runs 8× faster.
- **Rendering:** about 36,000 iterations per frame, scaled with canvas area, go into two Float32 density buffers.
  - The slow buffer (decay 0.965 per frame) maps ink → dust `rgb(228,230,238)` via `a = v·K/(1+v·K)`.
  - The fast buffer (decay 0.84) marks newly forming regions. Those regions, plus the densest filaments, blend toward `--sig-light`.
  - Pixels are written with a `Uint32Array` over `ImageData`. Resolution is capped at 900px (560px under 700px viewport width).
  - If frames take longer than 22ms, the iteration count drops by 25% at a time.
- **Placement:** a square canvas, right-aligned, `width: min(112svh, 66vw)`. Under 700px it is 135vw, centered at 42% height, and dimmed to 0.6.
- **Foreground (`.cover-inner`):** the identity lockup (§7.4) and contact icons (§7.5), at the lower left.
- **Cover foot (`.cover-foot`):**
  - a "Scroll" cue linking to `#intro`;
  - the equation in mono with live a, b, c, d values (updated every 200ms, `aria-hidden`, hidden under 700px);
  - a Pause/Play button (`[data-pause]`, `aria-pressed`, label changes with state).
- **Scroll:** JS sets `--p` (0→1 over one cover height). It lifts and fades the lockup, dims and slightly scales the canvas, fades the foot, toggles `.on-cover` on the header and `.off` on the tracker, and stops rendering when `p = 1`.
- **Reduced motion:** a single fully developed still frame, the Pause button hidden, and no `--p` effects.

### 7.4 Identity lockup (`.id-lockup`)
The original landing card without its glass panel. `.avatar-lg` (a 4.75–9.5rem circle inside a 1.5px ring, white on the cover) sits beside the `h1` name. A violet signal dot sits on the ring at the top right. The tagline sits under the name. A rule runs under the whole lockup. Below 540px the photo stacks above the name.

### 7.5 Contact icons (`.icon-links`)
Three 2.75rem squares with a 1.5px border and an inline SVG icon (white on the cover, ink on paper); on hover each fills violet with a white icon. Each has an `aria-label` ("Email", "GitHub", "LinkedIn").

### 7.6 Work rows (`.rows`, `.row`, `.row.static`)
Hairline-separated rows. Left: a large Bricolage title (`.row-t`) with mono context (`.row-ctx`). Right: a bold proof line and a one-sentence summary (`.row-s`). On hover or focus, a violet ↳ slides in before the title.

### 7.7 Proof callout (`.proof`)
One verified figure with its qualifier, behind a 3px violet left rule. Never show a number without its qualifier.

### 7.8 Status marker (`.state`, `.state.live`, `.state.held`)
A dot plus mono text. The ink dot means completed or historical; the pulsing violet dot means in development; the hollow dot means paused.

### 7.9 Flow diagram (`[data-flow]`, case studies only)
- Markup: a `.flow.grid-paper` band with `data-flow="flow-{slug}"`, an `ol.stages` (filled by JS), a `.note` tabpanel, a `.replay` button, and a `<script type="application/json" id="flow-{slug}">` holding the stage data: `[{"k":"stage key","v":"stage name","t":"what I did here","tools":"optional"}]`.
- Stages form an ARIA tablist. Selecting one lights wires and stages up to it one step at a time (140ms each): passed stages get a violet outline, the current stage is filled violet.
- When the band first reaches 50% visibility, the signal sweeps through every stage and returns to the first. "Replay" repeats this.
- Arrow keys, Home, and End navigate. The flow runs horizontally on desktop and vertically under 900px.
- Stage text comes only from confirmed handoff facts. The reference's three flows are already compliant; reuse their JSON verbatim.

### 7.10 Case-study layout
`.cs-head` (crumb, `h1.h-page.ruled`, `.cs-meta` with the state and context, `.cs-summary`), then the flow band, then `.cs-body`: `.cs-text` (h2 sections) and a sticky `.facts` aside (proof, `dl` facts, one link), then `nav.next`.

### 7.11 Notebook (`[data-notebook]` on `<main>`)
- `.nb-tools`: filter buttons (`data-kind`: all, industry, research, systems, education, writing) using `aria-pressed`, plus `.count` (`aria-live`). The filter is reflected in `?filter=`, so case studies can link to a filtered view. Visible entries fade in with a stagger when the filter changes.
- `.years`: the year index, sticky on desktop and a horizontal strip on mobile. The current group is marked with `aria-current="true"`.
- `.log`: groups (`section.yr-group#y2026`, etc.) of `article.entry[data-kind]`. A spine runs down the left and fills violet with scroll (`--p`). Nodes are violet for `.now`, hollow ink for past entries, and small gray for `.writing`.
- Entry anatomy: `.e-when` (mono), `h3`, `.e-role`, a paragraph, optional `.e-notes` (violet-tick bullets), and an `.e-foot` with links or a `.tag`.
- Writing entries link to the real dated posts. The 2024 group ends with the handoff archive notice and a link to `/blogs`.
- Entries come from handoff `public-content.json` (experience, education, earlier_optional, the Hive blurb) and `blog-migration.json`. Writing entries cover only posts whose action is a "Keep …" variant; the reference shows five.

### 7.12 Ink field (`.field-ink`)
The homepage notebook teaser: three recent entries on ink, then a link.

### 7.13 Signal footer (`.site-foot#contact`)
On every page: "Contact," one line of copy, and large link rows (Email, GitHub, LinkedIn) that slide right on hover with mono details. Below that is a thin ink line with the name.

### 7.14 Prose (blog posts and legacy pages)
Not in the reference; extend `signal.css` with a `.prose` section that follows these rules:
- column max 40rem, body 1.03rem/1.7 Public Sans;
- `h2` Bricolage 700 1.6rem; `h3` Bricolage 700 1.25rem;
- links underlined with a 2px `--sig` line;
- inline `code` in Geist Mono on `--hair2`;
- `pre` blocks on `--ink` with `--on-ink` text, mono 0.85rem, square corners, and `overflow-x: auto`; rendered blocks have `tabindex="0"` for keyboard scrolling;
- tables with hairline rules and mono header cells;
- `blockquote` styled like `.proof`;
- images at `max-width: 100%` with a 1px `--hair` border.

Article pages use a `.cs-head`-style header: crumb "Notebook," a title in `.h-page` at smaller size, and mono original date. The archive notice uses the `.note` style (white, hair border, 3px violet left rule). Document any new classes here.

Signal prose extension classes: `.post-page` marks the article wrapper and constrains it to the viewport (`width:100%; min-width:0`) so long code scrolls inside its block; `.post-head` spaces the article header, `.post-title` scales its title below a case-study title and wraps long technical identifiers, `.post-date` sets the original date in mono, and `.post-prose` spaces the article body. `.archive-notice` and `.archive-banner` present historical context with a violet left rule. `.project-media` labels preserved legacy research media. The `.prose` rules also cover tables, code, figures, and lists; tables scroll inside their own viewport on narrow screens.

### 7.15 Scroll tracker (`.tracker`)
A 48px fixed box at the bottom right holding the undamped 2 : 3 harmonograph. The line fills violet up to a moving dot as the page scrolls. It is decorative (`aria-hidden`), appears on every page, and is hidden over the cover.

### 7.16 Harmonograph (`[data-harmonograph]`, available but unused on pages)
With t from 0 to 260, d = 0.0045, detune 0.006, and phase 0.8:
```
x = e^(−d t) sin(f1 t)       + e^(−1.3 d t) sin((f2 + detune) t + phase)
y = e^(−d t) sin(f1 t + π/2) + e^(−1.3 d t) sin((f2 + detune) t + phase + s·π/2)
```
- There are six presets (1:2, 1:3, 2:3, 2:5, and 3:4 with `s = −1`; 2:3 with `s = +1`).
- The favicon and tracker use the undamped 2 : 3, `s = −1` figure over t from 0 to 2π.

### 7.17 Parked: work matrix (`parked/work-matrix.html`)
A projects-by-area dot table, kept for later and not linked or deployed. If it returns, move its `<style>` into `signal.css` and label the area assignments as editorial.

## 8. Motion rules

1. One orchestrated moment per page: the cover on Home, the flow sweep on case studies, and the title rule elsewhere.
2. Everything else responds to the user.
3. No fade-up section entrances and no decorative loops. The only exceptions are the pausable cover attractor and the `.live` status pulse. The cover's scroll-linked fade is the only parallax.
4. `prefers-reduced-motion: reduce` disables all transitions and animations:
   - the cover shows a still frame;
   - flows show their first stage;
   - filters switch instantly.

## 9. Accessibility

- Include a skip link to `#main`, landmarks, one `h1` per page, and logical headings. The homepage `h1` is the name on the cover.
- Show a visible focus ring everywhere: a 2px violet outline, white on ink and signal fields, light violet on the ink teaser.
- Flows are keyboard tablists, filters use `aria-pressed`, and the notebook count is `aria-live`. The cover has a working Pause control.
- Contrast: ink/paper 17.7:1, graph/paper 6.4:1, white/signal 7.2:1, on-sig/signal 5.8:1.
- No horizontal scrolling at 360px. Identity and content must not depend on JS. Without JS the cover still shows the name card on ink, and every page still reads.

## 10. Content rules (from the handoff)

- Use only the handoff's public copy and verified facts. Respect the `09_VERIFICATION_REGISTER.md` fallbacks. Never render internal keys or source IDs.
- No résumé download, CV link, or résumé file anywhere in the built output.
- Metric wording is fixed:
  - Qualcomm: "production application for 200+ users"
  - ARUW: "roughly 30 ms to 6–7 ms end-to-end," with ARC 2026 third place credited to the team
  - KasmV2: "five high schools," as a historical deployment
- No placeholder links, invented posts, or unverified repositories. KasmV2 repo links stay out until the organization mismatch is resolved.
- Keep completed, ongoing, and in-development work clearly distinguished.

## 11. Don't

- Rounded cards, drop shadows, gradient washes, glow, starfields, constellations, cyan, or glass panels.
- Violet as decoration, or a second accent color.
- Flow diagrams or the matrix on the homepage.
- Metrics without qualifiers, or charts without measurement data.
- All-caps labels, eyebrow text, or "→" appended to link text.

## 12. Reference files

```
signal-site/
  DESIGN.md                  identical copy of this spec
  assets/signal.css          port verbatim; extend only with .prose (§7.14)
  assets/signal.js           port verbatim
  assets/img/profile.png     low-res crop; replace with the original site photo
  index.html                 → /
  work.html                  → /projects
  work/*.html                → /projects/{slug}
  notebook.html              → /notebook
  about.html                 → /about
  parked/work-matrix.html    keep in the repo outside the served tree
```

## 13. Changing this design

When Rachit asks for a design change, update this file first (tokens, component text, decision log), then the code, in the same commit. Keep this file in the repository at `docs/design/DESIGN.md`, excluded from the built site.


### 2026-10-03 — CMR iteration

Rachit replaces KasmV2 in featured work with ongoing CMR work on LiDAR lane detection using graph theory. The home and Work lists run Math AI → CMR → ARUW; KasmV2 moves to Earlier projects and keeps its existing route and historical Notebook entries. This reverses the original three-project selection. No acronym expansion, dates, results, affiliations, or repository links are inferred.

Contact text and the email icon accessible name are now “Email.” Remove the Leadership filter button only; retain its historical entries under All.

CMR adds a responsive interactive SVG graph experiment in the case-study flow band, using the existing paper grid, ink, violet, mono labels, square controls, and ruled borders. Controls select Returns, Graph, or Lanes and adjust the connection radius. A deterministic illustrative point cloud and distance-based graph demonstrate connectivity; the diagram explicitly identifies itself as illustrative rather than recorded LiDAR or a performance result. No autoplay or motion is needed. The full SVG and explanation remain visible without JavaScript; controls appear only after initialization. Keyboard users can operate every button and slider. Classes `.lidar-demo`, `.lidar-controls`, `.lidar-viz`, `.lidar-points`, `.lidar-edges`, `.lidar-lanes`, `.lidar-status` live in a separate page-only stylesheet; original Signal CSS/JS stay unchanged.

Rachit confirms acceptance at the NeurIPS 2026 Math AI Workshop; state acceptance, not presentation. Keep the existing ICML 2026 presentation fact.

2026-10-03 — Rachit updates the primary public contact email to `jaiswal.rachit07@gmail.com`, superseding the handoff address.

### 2026-10-03 — Cover identity scroll transition

Rachit requests that the homepage name and contact buttons remain visible while the introductory About copy enters, then move upward and fade only as the identity begins leaving the viewport. This replaces the original early progress-based fade and slight parallax. Move the identity upward with the scroll distance, keeping it above the rising sheet; begin fading when its top reaches the fixed header and complete the fade as it exits. Scrolling back restores it. Keep the reference canvas, sheet, header, and tracker behavior. Separate home-only assets override `.cover-inner`; reduced motion retains a stationary identity with no fade, and no-JS retains the original static cover. Fully faded contact controls are inert and hidden from assistive technology.

2026-10-04 — Add Boxes as a Work-page project row linking directly to its GitHub repository. Reuse the existing row component; homepage selection remains Math AI, CMR, ARUW. Copy summarizes the repository README, with no metrics or dates added.

2026-10-04 — Move development projects into a separate Work-page section between the three featured case studies and Earlier projects. Use an `h2.h-sub` heading “Dev projects” and existing `.rows` / `.row` components for a smaller section. Replace the isolated Hive bench line with a static project row; retain its supplied description and in-development status. No dates or new links are invented.

Development order: Boxes → Hive → KasmV2. This is the lead’s recency assumption from the latest Boxes addition, ongoing Hive development, and KasmV2’s historical 2024–25 deployment; no dates are fabricated. KasmV2 moves from Earlier projects into Dev projects and retains its route.

2026-10-04 — Rachit reverses the smaller Dev projects heading decision: use `h2.h-sec`, matching Earlier projects. Hive uses `.row` without `.static` so its name shares the same size and typography as Boxes and KasmV2. Keep Hive as a non-link container because no verified destination was supplied.

2026-10-04 — Boxes receives a dedicated `/projects/boxes` case study. Reuse the approved case-study shell, facts aside, and existing interactive flow for repository → build → health check → traffic routing. Source factual copy from the Boxes repository README; no performance metrics, adoption claims, dates, or project status are inferred. Dev projects links to the local page, with the GitHub repository retained in its facts aside.

### 2026-10-04 — Continuous navigation (#2)

Rachit authorizes committing on main and requests only changes.md item 2: smoother page-to-page navigation without a loading flash. Opt all Signal pages into native cross-document view transitions via a separate shared stylesheet. Keep the outgoing page snapshot until the destination is ready, then use a short 180ms crossfade. Give the shared header the unique `site-header` transition name so it stays at its existing position across pages; its active navigation state changes with the destination. No slides, zooms, JavaScript router, additional loading screen, or content rewrite. Do not alter the approved reference assets. Disable navigation transitions under reduced motion. Unsupported browsers retain normal navigation, including real links, browser history and no-JavaScript use. This reverses the original no-main-commits rule for this explicitly authorized change; it does not authorize deployment. The local changes.md planning file is excluded from the build.
