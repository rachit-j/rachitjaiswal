# Signal website implementation report

October 3, 2026. Branch: `webv2`.

## Result and routes

The approved Signal reference is integrated into the existing Jekyll 4.4.1 site. No React, CSS framework or bundler was added. All page streams were implemented with Luna subagents, integrated and committed by the lead; a separate Luna QA stream followed integration.

| Page | Status / source |
|---|---|
| `/` and `/home` | Reference cover, canvas, lockup and sheet; shared `_includes/signal/home-content.html`; canonical `/` |
| `/projects` | Reference Work rows, modest Hive entry and linked earlier projects |
| `/projects/math-ai` | Reference case study and exact flow JSON; public paper link |
| `/projects/aruw-perception` | Reference case study and exact flow JSON; qualified latency and team outcome |
| `/projects/kasmv2` | Reference case study and exact flow JSON; historical internship/rollout; real dated writing links |
| `/notebook` | Reference groups, year index, spine and filters; 21 data-driven entries including five real dated writing links |
| `/about` | Exact reference main DOM except production link; verified education/capabilities |
| `/blogs` | Selected writing and archive rows using all 17 supplied excerpts/dispositions |
| All 17 dated posts | Original URLs/dates preserved; Signal article/prose layout and historical notices; July 5 Docker guide links to July 15 guide |
| Scorpio, TrinamiX, Horizon, MediLink, Rift, Artemis, UC Merced, CodeMaxxers | Existing routes preserved as Signal case studies without flow diagrams, using supplied copy |
| `/404.html` | Signal shared shell and recovery link |

Pages preserve `.html` file emission, and Jekyll resolves the extensionless production links. No hosting configuration was changed. The root and Home alias share the same body. Full route/source mapping is in `docs/design/ROUTE_MAP.md`.

## Shared implementation

- `_layouts/signal.html` and `_includes/signal/{head,header,footer,tracker}.html` provide the exact shared reference DOM, fonts, SVG favicon, stylesheet, deferred script, navigation and footer.
- `signal.js` is byte-for-byte unchanged. `signal.css` preserves the reference byte prefix and appends only the permitted prose section, including article/archive classes documented in DESIGN §7.14.
- Original full-resolution `assets/img/profile.png` retained. Preview crop remains only in the excluded internal reference.
- Metadata reflects CMU-era positioning, with supplied per-article excerpts, canonical URLs and Open Graph tags. No phone, résumé download, fabricated affiliation or unsupported structured-data claim was added.
- Old About résumé control and copied experience links are removed. There is no résumé PDF in source. Obsolete logo images remain in source but `assets/resume` is excluded from builds. All three unrelated project/research PDFs remain served.
- `docs`, `iteration`, handoff/reference directories, graph outputs, node_modules, vendor and legacy data snapshots are excluded. Fresh build verifies no packet ZIPs, docs or internal data are emitted.
- The existing local graph was referenced during recon and updated with current source-derived Signal page/layout relationships. Old semantic descriptions for replaced pages were removed; unchanged graph material retained. Final local graph has 486 nodes / 507 edges / 34 communities before the last small content refinements. Graphify created backups. Graph outputs remain local and excluded from the site.

## Deviations from the static reference

- Required original portrait replaces the preview crop.
- Flat reference links are production routes; earlier project rows are actual links as required by DESIGN §5.
- Removed the reference-only footer label “Design preview, not the live site,” retaining its span and surrounding DOM.
- Notebook explicitly describes UW as previous attendance. Home short bio remains the approved compact public copy; the reference-directed Notebook CTA is retained.
- No extra Kasm resource buttons were added to the reference facts aside; the unverified repository remains omitted. Two overview URLs were checked but omitted to preserve the approved component shape.
- Blog/legacy content has no static reference counterpart; follows DESIGN §7.14 and the existing case-study grammar. New prose rules constrain the article flex item, wrap long technical titles and make scrollable code keyboard-focusable.
- Three expired retained outbound links and one inaccessible unverified discussion link were omitted after QA; no replacement destination was invented.
- The attractor starts at a random point in its approved cycle, so paired homepage screenshots show different frames. CSS, equations and renderer are unchanged.

No other intentional design change was made. Screenshot comparisons and QA details are in `qa-report.md` and `qa-artifacts/`.

## Validation

- `bundle check`: dependencies satisfied.
- Repeated builds after each integration slice with `bundle exec jekyll build --destination /private/tmp/rachit-signal-check`: exit 0. Existing Minima Sass deprecation warnings and wdm-extension warning remain.
- `git diff --check`: clean. Three flow JSON bodies equal the reference byte-for-byte; original CSS prefix and unchanged JS verified.
- Paired screenshots: all seven reference pages at 1440×900 and 390×844 (28 screenshots). Original portrait and allowed content/link corrections are the intentional differences.
- All 35 emitted HTML routes fit at 360px, have one h1 and a skip link; content remains present with JavaScript disabled.
- Cover values update; Pause/Play label changes; sheet/header/tracker behavior works; RAF scheduling goes idle once the cover is covered.
- All three flows initialize, sweep/replay and support arrows, Home and End.
- Notebook filters return 21/3/4/3/2/5/4 entries for All/Industry/Research/Systems/Education/Writing/Leadership; empty groups hide, writing query works, year index and spine update.
- Reduced motion hides the cover pause control, draws a still frame and produces no running animations in the tested page.
- Axe WCAG A/AA checks initially found six scrollable code regions lacking keyboard focus; lead fixed the article layout and the six-route retest passes. Full final QA results are in the QA report.
- Internal-link HTTP scan: zero 4xx. Expanded audit checked 38 retained outbound URLs and 60 distinct packet URLs. Three retained 404s were removed. LinkedIn anti-bot status remains inconclusive; packet-only failed old résumé/experience destinations are not retained.
- Fresh build has no résumé directory/file/control, packet files, ZIPs, docs, graph, source IDs or verification notes. Three unrelated PDFs preserved.
- Cover rough observed frame rate: about 72 FPS in isolated headless WebKit over a short sample. WebKit does not support the Long Tasks observer here; no long-task absence claim is made. Real-device/browser performance may differ.

Old technical blog recipes were not modernized against current product documentation; they carry historical context notices. Automated checks are not a full accessibility certification or an external employer-fact audit.

## Local preview and execution boundary

Current preview: http://127.0.0.1:4001.

To run: `bundle exec jekyll serve --host 127.0.0.1 --port 4001` (use another port if occupied). Build: `bundle exec jekyll build`.

The user explicitly authorized committing the rebuilt About page and pushing `webv2` after an approval-review block about the pre-existing edit. The old edit is preserved in `/private/tmp/rachit-about-before-signal.html` and `.patch`. No merge, deployment, DNS or hosting change is authorized or performed. Push status is reported in the final response after execution.

Optional facts/projects held and safe fallbacks are detailed in `content-verification.md`; none blocks the verified update. Existing unrelated untracked assets/dist, iteration, node_modules and local graph files are preserved outside these implementation commits.

## 2026-10-03 iteration

Contact now says Email. Featured work is Math AI, CMR, ARUW. KasmV2 moved to Earlier projects and its original URL remains. CMR has a new case study with a synthetic interactive SVG point-cloud/graph/path experiment; only the user-confirmed project focus is asserted. Math AI now records user-confirmed NeurIPS 2026 Math AI Workshop acceptance. Leadership’s Notebook filter is removed, with its historical entries retained in All. Design docs were updated first. The isolated WebKit build and affected-route checks passed; see the QA report. Graphify’s local code graph was refreshed (496 nodes, 514 edges); internal graph outputs remain excluded and untracked.
