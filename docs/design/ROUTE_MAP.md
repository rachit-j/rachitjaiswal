# Route and implementation map

Phase 1, 2026-10-03. Branch: `webv2` (opening user instruction overrides pasted `redesign/signal`).

## Stack and commands

- Jekyll 4.4.1 with Minima 2.5 and jekyll-feed; Liquid layouts/includes and Markdown posts.
- Build: `bundle exec jekyll build`. Serve: `bundle exec jekyll serve --host 127.0.0.1` (http://127.0.0.1:4000).
- No bundler is required. Existing CDN Tailwind/Alpine/p5/particles belong to legacy templates. Signal assets are plain `assets/signal.css` and `assets/signal.js`.
- Pages currently emit `.html` files; extensionless existing links rely on hosting resolution. Phase 2 should set explicit pretty permalinks while preserving `.html` aliases if needed. Posts retain the default `/:categories/:year/:month/:day/:title:output_ext`.
- Signal shell: `_layouts/signal.html`, `_includes/signal/{head,header,footer,tracker}.html`. Page bodies own `<main>` so cover and notebook DOM remain exact.
- Existing portrait: `assets/img/profile.png`, 2114×2411; confirmed from `_layouts/landing.html:190`. Reference crop is internal only.
- Private inputs, docs, graph, node_modules and legacy data snapshots excluded in `_config.yml`.

## Page ownership for Phase 2

| Reference | Route | Content source | Existing layout → target | Owner |
|---|---|---|---|---|
| index.html | `/` | `index.md` | landing → signal | A |
| index.html | `/home` | `home.html` | homepage → signal, canonical / | A |
| work.html | `/projects` | `projects.html` | projectlayout → signal | B |
| work/math-ai.html | `/projects/math-ai` | `projects/math-ai.html (new)` | signal | B |
| work/aruw-perception.html | `/projects/aruw-perception` | `projects/aruw-perception.html (new)` | signal | B |
| work/kasmv2.html | `/projects/kasmv2` | `projects/kasmv2.html` | projectdetails → signal | B |
| notebook.html | `/notebook` | `notebook.html + _data/notebook.yml (new)` | signal | C |
| about.html | `/about` | `about.html` | about → signal | E |
| — | `/blogs` | `blogs.html` | blogslist → signal | D |
| — | `/projects/scorpio` | `projects/scorpio.html` | projectdetails → signal (no flow) | D |
| — | `/projects/trinamix` | `projects/trinamix.html` | projectdetails → signal (no flow) | D |
| — | `/projects/horizon` | `projects/horizon.html` | projectdetails → signal (no flow) | D |
| — | `/projects/medilink` | `projects/medilink.html` | projectdetails → signal (no flow) | D |
| — | `/projects/rift` | `projects/rift.html` | projectdetails → signal (no flow) | D |
| — | `/projects/artemis` | `projects/artemis.html` | projectdetails → signal (no flow) | D |
| — | `/projects/ucmerced` | `projects/ucmerced.html` | projectdetails → signal (no flow) | D |
| — | `/projects/codemaxxers` | `projects/codemaxxers.html` | projectdetails → signal (no flow) | D |
| — | /404.html | `404.html` | existing default/Minima; review later | lead |

## All dated posts

| Preserved URL | Source | Layout |
|---|---|---|
| `/2024/01/30/Cors-and-Dotenv.html` | `_posts/2024-01-30-Cors-and-Dotenv.md` | post → Signal prose (D) |
| `/2024/01/30/deployment_IPYNB_2_.html` | `_posts/2024-01-30-deployment_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/01/31/CSA-change-port.html` | `_posts/2024-01-31-CSA-change-port.md` | post → Signal prose (D) |
| `/2024/02/07/server_names_hash_bucket_size-error.html` | `_posts/2024-02-07-server_names_hash_bucket_size-error.md` | post → Signal prose (D) |
| `/2024/02/12/CSA-Deployment-Quiz.html` | `_posts/2024-02-12-CSA-Deployment-Quiz.md` | post → Signal prose (D) |
| `/2024/03/20/CSP-change-port.html` | `_posts/2024-03-20-CSP-change-port.md` | post → Signal prose (D) |
| `/2024/07/05/docker-cronjob-for-containers_IPYNB_2_-2.html` | `_posts/2024-07-05-docker-cronjob-for-containers_IPYNB_2_ 2.md` | post → Signal prose (D) |
| `/2024/07/05/manual-addition-of-docker-images_IPYNB_2_.html` | `_posts/2024-07-05-manual-addition-of-docker-images_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/07/12/multiserver-developers-guide.html` | `_posts/2024-07-12-multiserver-developers-guide.md` | post → Signal prose (D) |
| `/2024/07/12/multiserver-menu-guide.html` | `_posts/2024-07-12-multiserver-menu-guide.md` | post → Signal prose (D) |
| `/2024/07/12/security-group-configuration_IPYNB_2_.html` | `_posts/2024-07-12-security-group-configuration_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/07/12/terraform-vs-ansible.html` | `_posts/2024-07-12-terraform-vs-ansible.md` | post → Signal prose (D) |
| `/2024/07/15/manual-registry-addition_IPYNB_2_.html` | `_posts/2024-07-15-manual-registry-addition_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/07/15/persistent-data_IPYNB_2_.html` | `_posts/2024-07-15-persistent-data_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/07/30/autoscale-config_IPYNB_2_-2.html` | `_posts/2024-07-30-autoscale-config_IPYNB_2_ 2.md` | post → Signal prose (D) |
| `/2024/07/31/plans-for-big-meet_IPYNB_2_.html` | `_posts/2024-07-31-plans-for-big-meet_IPYNB_2_.md` | post → Signal prose (D) |
| `/2024/08/07/persistent-storage_IPYNB_2_-2.html` | `_posts/2024-08-07-persistent-storage_IPYNB_2_ 2.md` | post → Signal prose (D) |

## Preservation and integration notes

- `/experience/*` has no content source and must be removed from internal links rather than masked with unrelated pages (E).
- Résumé removal is Phase 2 E; preserve unrelated project/research PDFs.
- `about.html` has a pre-existing user edit. Phase 1 does not change or commit it.
- Shared includes are namespaced during integration so existing pages retain their current shell until their owners migrate them.
- Lead owns `_config.yml`, shared shell, docs and commits. D may append only approved `.prose` CSS and document its classes. E supplies metadata edits to lead.
- Five Luna streams run in batches within the available three child slots after Phase 1; QA F runs after integration. No subagents ran in Phase 1.
- Reference lives at `docs/design/reference/`; parked matrix at `docs/design/parked/`; both excluded. Content packet remains in /private/tmp, ZIP inputs excluded.
