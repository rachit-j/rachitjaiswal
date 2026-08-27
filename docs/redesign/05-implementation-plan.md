# Implementation plan

## Foundation

- Record audit/content decisions and retain existing source pages until their data-backed replacements pass build and URL checks.
- Add frontend package scripts and a simple production asset build; make deployment build assets before Jekyll.
- Introduce shared shells/includes, modern metadata, and global design tokens.

## Content and pages

- Create canonical site, project, experience, and education data. Migrate verified copy; mark unsupported claims `TODO: VERIFY`.
- Build Home, then Work/project case studies, About, and Writing. Keep old project/post paths live and add legacy redirects.
- Move older projects and temporary/operational writing into archive treatments without deleting useful material.

## Enhancement

- Add responsive navigation, page metadata, focus states, image dimensions/lazy loading, and reduced-motion styling before motion polish.
- Add selective Anime.js only after the static composition is sound.
- Remove Tailwind CDN, p5, particles, duplicated loading, and unused assets only after reference searches confirm removal is safe.

## Verification

- Build frontend assets and Jekyll output repeatedly; inspect canonical/legacy URLs, 404, desktop-to-mobile layouts, keyboard behavior, and reduced motion.
- Run independent accessibility/performance and design/code reviews, recording evidence in `07-testing.md` and `08-final-review.md`.
- Commit discrete milestones: documentation/audit, architecture/data, design system, Home, Work/case studies, About/Writing, motion, and final QA.
