# Repository guidance

## Ownership and Git

- `plan.md` is user-owned, untracked planning input. Preserve it; do not edit, delete, or commit it without explicit user approval.
- Work only on the dedicated `redesign-2026-portfolio` branch (or explicitly requested replacement). Do not commit directly to `main`, merge into main, force-push, reset history, or overwrite unrelated work.
- Inspect `git status` before edits. Keep commits focused and descriptive.

## Site architecture

- This is a Jekyll 4.4 site. Preserve useful public URLs, especially existing project and post URLs, while consolidating repeated content into `_data/` and reusable layouts/includes.
- Do not invent biographical, academic, employment, affiliation, timeline, metric, or project-impact facts. Mark unresolved public claims `TODO: VERIFY`.
- New project or experience data must be the source of truth for every page that repeats it.

## Build and local development

Current Jekyll commands:

```sh
bundle install
bundle exec jekyll serve
bundle exec jekyll build
```

The redesign adds a Node asset build. Until its `package.json` is introduced, there is no Node command to run. Once present, use the scripts documented in `README.md` before Jekyll serve/build so generated assets are available.

## Quality bar

- Treat static HTML/CSS as the primary experience; JavaScript and animation are progressive enhancement.
- Test Home, Work, About, Writing, representative project and post pages, and the 404 page at desktop, laptop, tablet, and mobile widths.
- Verify keyboard navigation, visible focus, semantic headings/landmarks, readable contrast, valid image paths, no horizontal overflow, and reduced motion. Check the browser console and production builds before handoff.
- Keep animation purposeful and restrained. Do not add particle fields, typewriters, cursor effects, or continuous decorative animation.
