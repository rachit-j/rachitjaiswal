# QA report

Run 2026-10-03 against the integrated Jekyll preview at `http://127.0.0.1:4001/` and the approved static reference at `http://127.0.0.1:8765/`. Browser checks used the dedicated isolated Playwright WebKit installation; no Chrome or personal browser session was launched.

## Results

All 35 emitted HTML routes passed the 360px horizontal-overflow check after the post layout fixes. Each route has exactly one `h1`, a `.skip` link, and usable page content with JavaScript disabled. The skip link becomes visible with focus and pressing Enter moves to `#main`. The 17 dated posts, 8 legacy project pages, and all new pages were included in the no-JS check. Internal link requests across the emitted routes returned no 4xx responses.

The site and reference were captured at 1440×900 and 390×844 for the seven mapped pages: home, About, Notebook, Work, Math AI, ARUW Perception, and KasmV2. This produced 28 screenshots in [qa-artifacts](/Users/rachitjaiswal/Desktop/Github/rachitjaiswal-1/docs/website-update/qa-artifacts). Side-by-side review showed the same page structure, typography, spacing, and interaction surfaces. Visible differences are handoff-corrected copy, the required original full-resolution profile image, and the attractor’s changing phase at capture time.

Cover checks passed: the attractor rendered, its four parameter values changed, Pause switched to Play, scrolling past the sheet changed the header and revealed the tracker, and the values stopped changing after the cover was covered. The measured request rate was about 73 frames per second over a short 2.5-second WebKit sample. WebKit does not support `PerformanceObserver` entries of type `longtask`, so long-task timing could not be measured.

All three case-study flows initialized on first view, replayed through their stages, and responded to Home, End, and arrow-key navigation. All seven Notebook filters updated the count and hid empty year groups; `?filter=writing` selected Writing and showed five entries. The 2024 year link marked itself current and moved the notebook spine. Under reduced motion, the cover showed a still canvas, the pause control was hidden, and WebKit reported no running animations.

Axe-core ran in WebKit over all 35 routes using WCAG 2.1 A/AA rules. The first immediate scan caught a contrast warning on the Notebook’s newly entering Carnegie Mellon entry while its fade animation was in progress; after the animation settled, a repeat of the Notebook scan had no violations. The six dated posts with scrollable code samples initially triggered `scrollable-region-focusable`; adding keyboard focus to the `<pre>` regions removed those findings. The lead independently retested the repaired post pages and their 360px layout.

The fresh output at `/private/tmp/rachit-signal-check` contains no `docs/`, reference site, handoff packet, `iteration/`, graph output, résumé assets, résumé PDF, or source verification notes. It preserves the three unrelated Horizon/MediLink research and project PDFs. The linked assets under the source tree’s old `assets/resume/img/` folder are excluded from the build.

## Link audit and fixes

The final emitted pages contain 34 unique external URLs. Thirty-three returned HTTP 200. LinkedIn returned HTTP 999, which is inconclusive because the site rate-limits automated requests; the required personal profile link remains in the footer and home contact icons at [_includes/signal/footer.html:8](/Users/rachitjaiswal/Desktop/Github/rachitjaiswal-1/_includes/signal/footer.html:8) and [_includes/signal/home-content.html:14](/Users/rachitjaiswal/Desktop/Github/rachitjaiswal-1/_includes/signal/home-content.html:14).

The broader check covered 76 distinct URLs in the full handoff packet and the current rendered site. It found three dead destinations that had been retained in public copy: the Kasm startup-script URL (formerly `_posts/2024-07-30-autoscale-config_IPYNB_2_ 2.md:105`), an Open Coding Society issue link (formerly `_posts/2024-07-12-multiserver-developers-guide.md:1284`), and the 2023–24 Scorpio repository (formerly `projects/scorpio.html:17`). The lead removed these links and kept only verified destinations. The old StackOverflow reference in `_posts/2024-01-30-Cors-and-Dotenv.md:47` returned HTTP 403 and was also omitted as unverified.

The packet’s Kasm repository link at `05_PROJECT_CASE_STUDIES.md:53` returned 404 and is not present in the public page; no replacement was invented. Packet-only references to the removed résumé and `/experience/*` URLs also return 404 by design and are absent from the rendered site. LinkedIn’s HTTP 999 is the only inconclusive status among current public links.

## Corrections made during QA

The 360px sweep first found horizontal overflow in 11 dated posts, caused by flex-item intrinsic sizing and long post-title/code content. The post layout was constrained and long titles were allowed to wrap; all 35 routes now pass. Axe also identified code blocks that could scroll but were not keyboard-focusable; the post layout now adds `tabindex="0"` to rendered `<pre>` blocks at [_layouts/post.html:14](/Users/rachitjaiswal/Desktop/Github/rachitjaiswal-1/_layouts/post.html:14). Dead or unverified outbound links listed above were removed using the handoff’s omit-if-unverified rule.

The preview was verified through isolated WebKit, and the clean Jekyll output was inspected separately. LinkedIn rate limiting and WebKit’s lack of long-task support remain the only limits on the requested checks.

## Final rerun after push

On 2026-10-03, a fresh Jekyll build completed successfully. Isolated Playwright WebKit reran all 35 routes: zero mobile overflow, heading, skip-link, no-JavaScript, WCAG 2.1 A/AA axe, or internal HTTP-link failures. The three case-study flows, seven Notebook filters, Writing query, year index/spine, reduced motion, and covered-canvas idle checks passed again. Build exclusion checks passed and all three unrelated PDFs remain. The preview used the same committed source; the fresh build was checked separately. External links and screenshots were not repeated in this focused rerun; their results and limitations remain documented above. Existing Minima Sass deprecation warnings remain nonfatal.

## CMR iteration checks

2026-10-03: the build passed after the CMR iteration. Isolated WebKit passed checks on the eight affected routes at 360, 390, and 1440 pixels, with one h1 and no horizontal overflow. WCAG 2.1 A/AA axe reported no violations on those routes. The CMR layer buttons and radius slider worked with mouse and keyboard; reducing the radius broke paths and increasing it reconnected both. No browser script errors occurred. The static diagram remained visible without JavaScript. Featured order, workshop acceptance, six Notebook filters, retained historical leadership entries, and the old leadership query falling back to All passed. Desktop/mobile screenshots were visually inspected. Original Signal assets are unchanged.

## Cover transition iteration

2026-10-03: fresh build passed. Isolated WebKit checked the cover at 1440×900 and 390×844: identity stays opaque above the entering sheet, fades near the header, becomes inert/aria-hidden after exiting, and restores on reverse scroll. Neither viewport overflowed; WCAG 2.1 A/AA axe reported zero violations at the initial position. Reduced-motion identity remains stationary and opaque; no-JavaScript identity remains visible. No script errors occurred. Temporary preview stopped after verification.

2026-10-04 — Boxes page: fresh Jekyll build passed. Isolated WebKit over the built files passed four-stage flow Replay, Home, End, and ArrowRight controls; 360/390/1440 layout with no overflow; one h1; WCAG 2.1 A/AA axe with no violations; Dev projects link; no-JavaScript content; no browser script errors. No preview server was started.
