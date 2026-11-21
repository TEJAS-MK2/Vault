# PIJUSH Phase 8 — QA report

Date: 22 November 2026
Target: `migration/pijush-personal-site` branch, PR #8
Environment: local production build served with Vite preview; Chromium via Playwright; axe-core WCAG 2.1 A/AA rules.
Production was not deployed or modified.

## Automated build and route checks

- `npm ci --no-audit --no-fund`: passed.
- `npm run build` (TypeScript project build + Vite production build): passed.
- `npm run test`: passed before the Phase 8 regression additions; the updated suite is included in the current PR CI run.
- `npm run test:smoke`: passed.
- GitHub Pages fallback: generated `dist/404.html`; byte-for-byte comparison with `dist/index.html` passed.
- All 13 routes were opened directly at 390px and 1440px: home, About, Projects, all four project detail pages, Experiments, Writing, Uses, Now, Contact and an unknown route.
- Every route rendered one H1, had the expected title and canonical path, and no horizontal overflow.
- Unknown routes correctly received `noindex,nofollow`.
- No browser page errors or console errors were recorded.

## Responsive checks

Viewport widths tested: 320, 360, 390, 430, 768, 1024 and 1440 CSS pixels.
No document-level horizontal overflow was detected at any width. Header content fit within its available width at each tested viewport.

## Accessibility checks

- axe-core WCAG 2 A/AA and WCAG 2.1 A/AA scans were run on all 13 routes at 390px and 1440px (26 route/viewport scans).
- Initial findings: footer muted text contrast was 3.87:1, below the 4.5:1 normal-text requirement; the wordmark's accessible name did not contain its visible label.
- Fixes: raised the muted text token to `#858a96` and changed the wordmark accessible name to `P. PIJUSH home`.
- Re-run result: zero axe violations across all 26 scans.
- Reduced-motion preference was enabled during browser checks.
- Keyboard skip link, visible focus styles, navigation landmark and main landmark are present.

## Media and build observations

- The genuine Calculator screenshot returned HTTP 200 and loaded in Chromium (1280px intrinsic width).
- CSP allows only the required `raw.githubusercontent.com` host for that image; no broad image wildcard was added.
- Built asset sizes: CSS 18.94 KB, app JS 36.86 KB, React vendor JS 223.22 KB (about 81.9 KB combined gzip as reported by Vite).
- External screenshot hosting remains a runtime dependency. Moving the image into the repository is a follow-up improvement, not a launch blocker verified by this pass.

## Fixes committed from QA

- Project detail titles now use the verified project display name (e.g. `ATLAS — PIJUSH`) and the project-specific summary as the meta description.
- Unknown project slugs now use a not-found title and are not indexable.
- Footer muted text contrast improved.
- Wordmark accessible name corrected.
- Regression tests added for project metadata and accessibility source contracts.

## Not covered / launch caveats

- This is browser automation against the built app, not a physical-device test. Test on a real Android/iOS device before launch.
- axe-core is an automated audit, not a substitute for keyboard-only and screen-reader usability review.
- Social crawlers that do not execute JavaScript may see shared base metadata on deep routes; per-route metadata is client-side.
- GitHub Pages response headers are not configurable in this workflow; the CSP is a meta policy.
- The legacy Supabase package and unreferenced client module remain to avoid an incomplete dependency-removal operation in this pass. The app does not import or connect to Supabase, and backend resources/data/policies remain preserved.
- Writing and Experiments are intentionally honest empty states until actual posts and experiments are ready.

## Verdict

The static build, route smoke checks, responsive layout checks and automated accessibility scans passed in the local production-preview environment. Await the GitHub Actions result on the final PR head. Physical-device and assistive-technology checks remain before a public launch. This report does not authorize merge or deployment.
