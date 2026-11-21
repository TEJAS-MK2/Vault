# PIJUSH production-readiness audit

Date: 22 November 2026
Scope: migration branch only; read-only review plus narrowly scoped fixes.
Production deployment, DNS, CNAME and Supabase resources were not changed.

## Findings and fixes

- **CSP blocked the Calculator screenshot.** The project image is served from `raw.githubusercontent.com`, while the previous `img-src` allowed only same-origin and data URLs. Added that exact image host to `img-src`; no wildcard image source was introduced.
- **Project detail pages were missing from the sitemap.** Added the four verified project detail paths. The sitemap continues to list only routes that currently exist.
- **Social metadata was incomplete.** Added a Twitter summary card and matching title/description. No fabricated social-preview image was added because there is no approved, verified preview asset yet.
- **Production smoke coverage was extended.** It now asserts the screenshot host is permitted by CSP and social-card metadata is emitted.

## Reviewed and retained

- GitHub Pages SPA fallback is generated as `dist/404.html` and tested byte-for-byte against the built entry document.
- Route metadata sets page title, description, canonical URL and `noindex,nofollow` for unknown paths.
- Unknown project slugs render the Not Found page.
- `robots.txt` references the canonical sitemap.
- Navigation includes a keyboard skip link, semantic navigation landmark, active-page state and external-link `rel=noreferrer`.
- Project art explicitly distinguishes the one genuine repository screenshot from conceptual SVG illustrations.
- Canvas motion has reduced-motion and hidden-tab handling; CSS has reduced-motion handling and touch-specific hover behavior.
- Existing CSP remains restrictive for scripts, frames, objects, forms and connections. GitHub Pages does not provide configurable response headers through this repository workflow; the CSP is delivered as a document meta policy, not represented as an HTTP response header.

## Outstanding launch considerations

- The Calculator screenshot still depends on GitHub's raw-content host being reachable. A checked-in optimized local asset would remove that runtime dependency; use only if the source image is added and verified in a later change.
- Route metadata is updated client-side. This static Vite build is not server-rendered or pre-rendered, so social crawlers that do not execute JavaScript may see the shared document metadata on deep routes.
- Writing and Experiments currently contain honest empty-state copy; add real authored material before promoting those sections as content destinations.
- The legacy Supabase client package remains in the dependency manifest even though the portfolio frontend no longer imports the client. Remove it only with a lockfile-regenerated change and a full regression run. Supabase project, bucket, objects, users and policies remain preserved.
- Manual visual verification on physical mobile devices and browser accessibility tooling is still required before launch.

## Phase 8 QA addendum

Browser QA found and fixed two accessibility issues: low-contrast muted footer text and a wordmark accessible-name mismatch. Project detail metadata was also improved to use verified display names and summaries, with unknown project slugs explicitly non-indexable. Playwright checked all 13 routes at 390px and 1440px, seven responsive widths from 320px to 1440px, and reduced-motion behavior. axe-core reported zero WCAG 2.1 A/AA violations across 26 route/viewport scans after fixes. No console/page errors or horizontal overflow were found. Full details: [PHASE_8_QA_REPORT.md](PHASE_8_QA_REPORT.md).

Physical-device and assistive-technology checks remain outstanding.

## Result

The CSP, sitemap, project metadata and automated accessibility findings are fixed on the migration branch. Final CI passed on head `5bf1e6e4d44d63d5dbaf4dfc725e85e745cf0311` in [run 44944781000](https://github.com/TEJAS-MK2/Vault/actions/runs/44944781000): dependency audit, regression tests, TypeScript build, Pages fallback and production smoke test all passed. This audit does not authorize merge or deployment.
