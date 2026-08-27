# Information architecture

## Primary navigation

| Label | Canonical path | Purpose |
| --- | --- | --- |
| Home | `/` | Thesis, selected proof of work, capability areas, writing, contact. |
| Work | `/work/` | Featured project stories and a compact archive. |
| About | `/about/` | Current interests, selected experience, timeline, education, and contact. |
| Writing | `/writing/` | Curated public writing plus an archive for historical operational material. |

Persistent external actions are GitHub and LinkedIn. Do not add Resume until a public asset or URL is verified.

## Page hierarchy

- **Home:** oversized identity and concise systems/research thesis; selected work; selected experience/research; four capability groups; selected writing; contact/footer.
- **Work:** editorial Featured Work for KasmV2, TrinamiX, UC Merced, and Scorpio, then a scan-friendly archive. Controls are All, AI, Systems, Robotics, and Research and remain usable without JavaScript.
- **Project case studies:** title/summary/metadata, then only supported sections among overview, problem, role, contribution, architecture, implementation, results, impact, gallery, reflection, and related work. Team context and individual contribution are separate.
- **About:** concise introduction/interests, selected experience, compressed timeline, education, contact, and Earlier Work.
- **Writing:** Research, Engineering Notes, and Projects categories when supported by source content; historical instructions stay discoverable in an archive.

## URL preservation

- Retain existing `/projects/{slug}` paths and existing post permalinks.
- Canonicalize legacy page routes: `/home` → `/`, `/projects` → `/work/`, and `/blogs` → `/writing/`.
- The root page becomes canonical Home. Existing URLs redirect rather than disappear.

## Responsive navigation

- Desktop uses primary sections and clearly separated external actions.
- Mobile/tablet use a semantic disclosure menu with native buttons, focus control, Escape handling, and full-size touch targets.
- Content remains usable without JavaScript and outside menu state.
