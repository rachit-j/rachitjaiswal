# Repository and architecture audit

## Snapshot

- The repository is a Jekyll 4.4.1 site with `minima` and `jekyll-feed` declared in `_config.yml`/Gemfile.
- The current redesign branch is `redesign-2026-portfolio`. At audit time, `plan.md` is untracked and user-owned; it must remain untouched.
- There is no `package.json`, frontend bundler, workflow configuration, or tracked README in the current tree.
- `CNAME` is present, and `_config.yml` sets `url` to `https://rachitjaiswal.com`.

## Current public structure

- `/` renders `index.md` with the legacy `landing` layout.
- `/home`, `/about`, `/projects`, and `/blogs` are separate top-level pages.
- Project pages are under `/projects/{artemis,codemaxxers,horizon,kasmv2,medilink,rift,scorpio,trinamix,ucmerced}.html`.
- Writing is sourced from `_posts/` with dated filenames and uses the `post` layout.

## Architecture findings

- Layouts each contain full document markup or shell logic, duplicating metadata, fonts, scripts, navigation, and styling.
- `_includes/header.html` emits a `<head>` element and font links then is included inside layout bodies. This creates invalid nested document structure and repeated resources.
- Tailwind is loaded from its runtime CDN in multiple layouts; fonts, Font Awesome, Alpine.js, Highlight.js, and inline style configuration are also duplicated.
- The homepage loads p5.js and `assets/js/waves.js`; the landing layout loads particles.js. The homepage has a rotating typewriter identity.
- Project details, About, and Projects embed repeated HTML. Project front matter exists, but archive and experience content are hardcoded separately, so there is no single source of truth.
- Existing media is mostly profile photos, organization/project logos, and a few project PDFs. No image pipeline is present.

## Content constraints

- `about.html` contains dated “Present” statements for KasmV2, CyberPatriot, Tech Space, Aerospace & Rocketry Club, and University of Washington. Their current validity is not established by repository material.
- The site has useful material about KasmV2, TrinamiX, UC Merced AI safety research, and Scorpio; earlier projects and high-school activities need new hierarchy rather than automatic deletion.
- Some dates, roles, awards, usage metrics, and project claims appear only in legacy pages and require verification before promotion.

## Planned remediation

- Consolidate shared shells/includes, move repeated content to `_data/`, and preserve useful project/post URLs.
- Build compiled CSS and bundled modular JavaScript before Jekyll output; remove runtime Tailwind and legacy decorative dependencies.
- Add reproducible deployment build steps, SEO metadata, accessibility support, and responsive/visual validation.
