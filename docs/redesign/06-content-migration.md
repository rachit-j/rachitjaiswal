# Content migration map

## Canonical data destinations

| Source | Destination | Migration rule |
| --- | --- | --- |
| `_config.yml` identity/settings | `_data/site.yml` plus config | Keep Jekyll/deploy settings in config; move reusable public identity/navigation/social metadata to data. |
| `projects/*.html` front matter/body | `_data/projects.yml` + case-study content | Data holds repeated title, summary, categories, role, organization, technologies, links, imagery, and feature/archive state; content holds project narrative. |
| `projects.html` cards | Data-driven Work views | Do not maintain independent card copy. |
| `about.html` entries | `_data/experience.yml`, `_data/education.yml` | Store canonical timeline facts once and render concise current/earlier views. |
| `home.html` intro/skills | Home components/data | Replace skill chips with context-led capability groups. |
| `_posts/*` | Revised writing taxonomy/archive | Preserve URLs and bodies unless a deliberate formatting/content repair is made. |

## Feature and archive treatment

- Feature KasmV2, TrinamiX, UC Merced AI safety research, and Scorpio subject to verified current copy.
- Keep Artemis compact; retain Horizon, MediLink, RIFT, CodeMaxxers, and supported Tech Space/Qualcomm material in Work’s archive.
- Place university, selected work, and strongest current experience prominently only after dates/roles/status are confirmed.
- Compress Del Norte, student leadership, CyberPatriot, prior competitions, and earlier research into Earlier Work/education rather than erasing meaningful history.
- Place dated Kasm instructions and the Aug. 1 agenda in Writing’s archive; retain durable revised notes in main Writing.

## Required verification

- `TODO: VERIFY` University of Washington program/enrollment wording and all legacy “Present” dates.
- `TODO: VERIFY` KasmV2 title, team size, active deployment, district scope, usage, and tool attribution.
- `TODO: VERIFY` TrinamiX role, dates, work relationship, and project claims.
- `TODO: VERIFY` UC Merced appointment, advisor, scope, dates, and public-link suitability.
- `TODO: VERIFY` Scorpio role, season, contribution, and current status.
- `TODO: VERIFY` award, organization, advisor, user-count, and publication claims in archived work.
- `TODO: VERIFY` public resume asset/URL before adding Resume navigation.

## Rules

- Separate team achievement from individual contribution in every case study.
- Preserve useful links, supplied PDFs, logos, and legacy URLs.
- Do not create unsupported metrics, dates, technology lists, affiliations, diagrams, or images.
- Proofread migrated copy and repair malformed code blocks without changing operational meaning.
