# Implementation report

## Phase 1 checkpoint — October 3, 2026

Branch: `webv2`, following the user's opening instruction rather than the pasted `redesign/signal` name. Refreshed origin and main before creating the branch. No push, merge, deployment, DNS or hosting change was performed by this agent.

### Implementation

- Confirmed Jekyll 4.4.1, Minima 2.5 and jekyll-feed. Kept the generator and asset model.
- Ported `assets/signal.css` and `assets/signal.js` byte-for-byte from the approved reference. Neither required path edits. No prose extension yet.
- Added `_layouts/signal.html` and namespaced shared head, header, footer and tracker includes. Conditional `has-cover`, `on-cover`, active navigation and canonical-path support are ready for the page streams.
- Kept the exact Google Fonts link, favicon data URI and tracker SVG. Shared links use production routes and Jekyll URL filters.
- Added canonical and Open Graph metadata to the new head. No unsupported structured-data facts were introduced.
- Stored the approved design, reference and parked matrix under `docs/design/`; mapped every reference page, existing project and all 17 dated posts in `ROUTE_MAP.md`.
- Excluded docs, iteration inputs, graph outputs, packet directories, node_modules, vendor and old data snapshots from Jekyll output.
- Referenced Claude's existing 401-node graph during recon; ran `graphify update .`, then merged source-verified shell includes/asset references and reclustered. Final local graph: 549 nodes, 751 edges, 28 communities. Original curated graph backups were created by Graphify. Graph outputs remain local and unserved; no LLM community relabeling was run.

### Routes and page status

All existing pages remain in their original form in this checkpoint. The reusable shell is ready but not yet connected to public pages. No new public routes, redirects, archived post presentation or case-study bodies were introduced. Phase 2 will migrate Home, Work, case studies, Notebook, blog/legacy pages and About. Phase 3 QA follows integration.

The shell was exercised with an ephemeral About-reference body built as `signal-shell-check.html`. The fixture was removed from the repository after its temporary build and is not committed or part of the production build.

### Verification evidence

- `bundle check`: dependencies satisfied.
- Baseline and modified `bundle exec jekyll build --destination ...`: exit 0. Existing Minima Sass deprecation warnings and a wdm-extension warning remain.
- `cmp` confirms both public Signal asset files match the reference exactly.
- `git diff --check`: clean for this work.
- Temporary built output contains no docs, iteration, packet, graph, node_modules or legacy data directories, and no ZIP files.
- Opened reference homepage before implementation in isolated Playwright WebKit. Built-in internal browser unavailable; isolated Firefox failed to launch. No personal browser or authenticated session was used.
- Reference About and temporary shell screenshots inspected at 1440×900 and 390×844; overflow checked additionally at 360×844. One h1 each, correct active About navigation, no horizontal overflow, no page JavaScript errors. Tracker initializes. About content remains readable with JavaScript disabled.
- Original portrait successfully decoded in WebKit. Its rendered orientation reflects the existing image metadata.

### Deviations and limitations

The only intentional shared visual-copy deviation is removal of the reference-only footer label “Design preview, not the live site”; the reference span and surrounding DOM remain. Original full-resolution portrait replaces the preview crop as requested. Added metadata does not affect visual layout.

Full page parity, cover/flow/notebook behavior, reduced motion, axe/Lighthouse, complete link checks and performance checks await the integrated pages. Résumé removal is not complete: the old About download control remains in legacy content at this checkpoint. Existing unrelated research/project PDFs have not been removed.

Pre-existing `about.html` edits and untracked assets/dist, node_modules, graph and iteration inputs were preserved. They are not included in the Phase 1 commits. Graph was updated locally at the user's request.

### Local review

Run `bundle exec jekyll serve --host 127.0.0.1` and open http://127.0.0.1:4000. This checkpoint still shows legacy pages; the redesign page streams are the next phase. The approved internal reference is in `docs/design/reference/`, excluded from Jekyll.

No content decision is required to finish Phase 1. The packet's conservative fallbacks permit Phase 2 to proceed without inventing optional facts.
