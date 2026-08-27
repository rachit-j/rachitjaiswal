# Independent Final Design and Code Review

## Resolution update — 2026-08-26

The orchestrator applied the release-blocking fixes identified below: rendered case-study Markdown, public verification placeholders, writing curation, mobile-menu state/keyboard behavior, static filter baseline, social preview metadata, portrait optimization, and 404 treatment. The remaining acceptance check is live browser QA across the documented viewport and reduced-motion matrix.

Reviewed: 2026-08-26

## Verdict

The redesign has a strong structural direction: a shared Jekyll shell, data-backed project/experience content, restrained typography-led styling, and a small progressive-enhancement layer. It is not ready to call complete yet. The public verification placeholders, incomplete no-JavaScript filtering, and mobile-menu accessibility issue need resolution first; responsive visual QA remains outstanding.

## Review by audience

- **Recruiter / engineering visitor:** The visual hierarchy and selected-work ordering communicate a more mature technical portfolio. Literal `TODO: VERIFY` text in the hero-path cards, however, immediately undermines credibility.
- **Research lab / professor:** Project pages correctly separate context from role at a high level, but several research claims and timeframes are intentionally unresolved. Hide unsupported metadata rather than showing its verification status publicly.
- **Design-conscious visitor:** The restrained palette, rules, and editorial scaling avoid generic template aesthetics. The current project treatment is logo-led; it will benefit from real, rights-cleared system screenshots/diagrams when available, not decorative replacements.
- **Engineering reviewer:** The new layouts/data/components and Node asset build are a meaningful maintenance improvement. The frontend build is reproducible locally and the Pages workflow runs the asset build before Jekyll.

## Concrete changes requested

1. Complete the P0 and P1 items in `07-testing.md` before handoff.
2. Keep one source of truth: project-page narrative, card copy, and experience claims must all resolve from the data model or clearly scoped page content. Do not let edits reintroduce duplicate biographical claims.
3. Do not add more motion until browser QA verifies the current Anime.js effects are error-free, legible, and absent in reduced-motion mode. The existing static design should remain the reference experience.
4. Make the Writing selection intentional. The Home currently surfaces an agenda post as “selected writing,” which reads as operational history rather than a durable engineering note. Curate a featured-writing flag or omit it from the preview while retaining it in an archive.
5. Add 404-specific spacing/type polish and test it as a genuine unknown-route response, not just the generated `404.html` file.
6. Verify Pages deployment behavior on the custom domain and repository URL: generated assets use `relative_url`, which is correct when the Action-provided base path is applied, but deployment must be checked after enabling the workflow.

## Build evidence

- `npm run build`: pass; generated `assets/dist/site.css` (13.1 kB) and `assets/dist/site.js` (53.0 kB).
- `bundle exec jekyll build --trace`: pass; 34 HTML documents generated.
- `git diff --check`: pass at review time.

## Release gate

Do not mark the redesign complete until the P0 issues are fixed, the 8 MB portrait is optimized, and the required multi-viewport keyboard/reduced-motion/console review is recorded with outcomes.
