# Accessibility, Performance, and Build Review

## Remediation update — 2026-08-26

- Resolved: project case-study Markdown is rendered through `markdownify`; literal public `TODO: VERIFY` markers are suppressed; the mobile menu announces its state, supports Escape, and returns focus to its trigger; the Work filter is hidden without JavaScript and announces results when enhanced.
- Resolved: the About portrait now uses a 1600px, 176 KB derivative with intrinsic dimensions; the original 8.1 MB source is no longer referenced publicly.
- Resolved: site and project pages emit Open Graph and Twitter image metadata; the 404 page has dedicated styling.
- Remaining release QA: browser-assisted visual, keyboard, console, and reduced-motion checks at the listed viewport widths were not possible because no browser-control surface was available in this environment.

Reviewed: 2026-08-26 (independent source and production-build pass)

## Checks run

| Check | Result | Evidence |
| --- | --- | --- |
| Frontend production build | Pass | `npm run build` completed; minified CSS is 13.1 kB and JS is 53.0 kB. |
| Jekyll production-style build | Pass | `bundle exec jekyll build --trace` completed; 34 HTML files were generated. |
| Referenced local asset presence | Pass | Rendered root-relative asset references resolved to files in the build tree. |
| Image text alternatives | Pass, limited | New template images include `alt`; project marks are labeled as marks. Existing post content remains outside this check. |
| Keyboard/focus source review | Needs fixes | Skip link and `:focus-visible` treatment exist, but the mobile menu has an inaccurate accessible name and no Escape/focus behavior. |
| Motion source review | Needs follow-up | Reduced-motion CSS and the JavaScript preference check exist; runtime behavior has not been browser-tested in this independent pass. |
| Visual viewport/console review | Not run | No browser-control surface was available to this reviewer. Must be completed before release at mobile, tablet, laptop, and desktop sizes. |

## Priority findings

### P0 — resolved in the remediation update

1. **The mobile menu button announces the wrong state.**
   - In `_includes/header.html` the screen-reader-only label remains `Open navigation` permanently. `src/main.js` only changes an `aria-hidden` visual label from Menu to Close, so assistive technologies continue to announce “Open navigation” after the menu opens.
   - Update the accessible label alongside `aria-expanded` (for example, `Open navigation` / `Close navigation`), and test it with keyboard and a screen reader.

2. **The Work filter is not progressively enhanced.**
   - `work.md` renders interactive `<button>` controls even when JavaScript is unavailable; without `src/main.js`, all projects remain visible and activating a category button has no effect. This conflicts with the requirement that filtering not harm accessibility and that static HTML remain the primary experience.
   - Choose one complete baseline: server-rendered category URLs/query handling, or render category links with a usable no-JS destination and enhance them to buttons only once JS loads. Add a concise results announcement (`aria-live`) when the enhanced filter changes the visible set.

3. **`TODO: VERIFY` is publicly rendered in primary navigation paths.**
   - The Home and Work pages currently publish unresolved dates/claims in featured content (KasmV2 and UC Merced), and the Archive exposes further placeholder timeframes/roles. This is a content-quality issue with professional impact, not merely an internal note.
   - Keep the markers in the data/documentation, but suppress unverified fields in public templates or replace them only after the owner verifies them. Do not ship literal `TODO` strings to visitors.

### P1 — resolved or retained for future polish

4. **The About portrait is an 8.1 MB, 6048×4032 JPEG.**
   - `assets/img/profile3.JPG` is loaded on About at a maximum rendered width of roughly 18rem on mobile and a modest column on desktop. Its source also retains camera EXIF data.
   - Export a cropped, orientation-corrected responsive derivative (WebP/AVIF plus JPEG fallback if needed), strip unnecessary metadata, add intrinsic `width`/`height`, and use `srcset`/`sizes`. The original can remain outside the published asset path if it is needed as a source.

5. **New template images have no intrinsic dimensions.**
   - All newly rendered `<img>` elements omit HTML `width` and `height`. CSS aspect-ratio reduces the risk for the portrait and project-mark containers, but intrinsic dimensions would give browsers a reliable layout reservation and help prevent layout shift.
   - Add dimensions from known assets or a data field. Keep `height: auto` in CSS.

6. **Mobile navigation needs expected keyboard behavior.**
   - It opens/closes on click and link activation, but lacks Escape-to-close and a defined focus handoff. At minimum, Escape should close and return focus to the trigger; when opened, move focus to the first navigation link. Verify that hidden links cannot be tabbed to.

7. **New-tab behavior is not communicated in accessible names.**
   - Header and case-study links use `target="_blank"` safely with `rel="noopener noreferrer"`, but the new-context behavior is only represented by an `aria-hidden` arrow.
   - Add visually hidden “(opens in a new tab)” text to these links, or avoid opening ordinary profile/project links in a new tab.

8. **Social preview images are absent from generated pages.**
   - The built site has zero `og:image` or `twitter:image` tags. This weakens sharing previews despite the SEO plugin.
   - Create a verified, appropriately licensed social-preview asset and configure it per site/page; avoid reusing a project logo as a default preview.

### P2 — improve where practical

9. **External Google Fonts remain a render, privacy, and resilience dependency.**
   - The shell preconnects to and downloads two Google font families at page load. `display=swap` is a good baseline, but self-hosting the exact required WOFF2 subsets would reduce third-party connections and make typography more reliable.

10. **Post-body images need a separate content audit.**
   - Existing writing posts embed remote GitHub-hosted images and raw HTML. These are outside the new image component path and may have missing intrinsic dimensions or degraded links. Audit the public posts selected for Writing, lazy-load noncritical images, and preserve useful alt text.

11. **404 has no dedicated layout rules.**
   - It inherits general page styles and has no `.not-found` treatment in `src/styles.css`. It is readable, but should receive the same intentional responsive/spacing QA as primary pages.

## Positive implementation notes

- The shared default layout provides a real skip link, semantic header/nav/main/footer landmarks, a single visible page `<h1>`, and global visible focus styles.
- The light/dark token values are high contrast by inspection; avoid changing them without a measured contrast regression check.
- Motion is transform/opacity based, excludes the former particle system, and is disabled for `prefers-reduced-motion` both in CSS and before Anime.js initialization.
- The asset pipeline replaces runtime Tailwind and bundles Anime.js as an ESM module. No active p5, particles, Tailwind CDN, Alpine, or duplicate Highlight.js references were found outside historical plan/audit documentation.

## Required final QA

- Check Home, Work, About, Writing, a featured project, an archived project, a writing post, and 404 at 320px, 768px, 1024px, 1440px, and large-desktop widths.
- Keyboard test: skip link, desktop navigation, mobile toggle open/close/Escape, every Work filter, project/card links, and external-link announcement.
- Test `prefers-reduced-motion: reduce` for initial hero, scroll reveals, filtering, hover states, and anchor scrolling.
- Review DevTools console/network for JavaScript errors, missing assets, image payloads, and content layout shift. Re-run `npm run build` and `JEKYLL_ENV=production bundle exec jekyll build` after fixes.
