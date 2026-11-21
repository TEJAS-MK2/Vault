# PIJUSH Personal Website — Migration Plan

Status: Phases 1–8 implemented on the migration branch. Phase 8 browser QA and accessibility scans passed locally. Final CI passed on head `5bf1e6e4d44d63d5dbaf4dfc725e85e745cf0311` (run 44944781000). Production remains unchanged.

## Confirmed creative direction

- Identity: creative developer portfolio
- Default appearance: dark
- Motion: experimental and interactive
- Product: personal website and digital home for Pijush
- Existing storage product UI and public positioning are being replaced.

## Phase 1 repository audit

Repository: `TEJAS-MK2/Vault`
Audited base: `main` at `050c4021a6703358cfb2c7cc9514d5cf08c27d0b`
Domain: `pijush.runs-on.dev`
Hosting: GitHub Pages with GitHub Actions
Stack: React 19, TypeScript, Vite 6
Current application entry: `src/main.tsx` → `src/App.tsx`

### Existing structure

- The application is concentrated in a single ~47 KB `src/App.tsx` file.
- Presentation is split across three overlapping stylesheets: `styles.css` (~61.5 KB), `framer.css` (~14 KB) and `editorial.css` (~16.5 KB).
- The app has a hand-rolled History API router for `/`, `/app`, `/terms` and `/privacy`.
- Supabase client setup lives in `src/lib/supabase.ts`.
- The Supabase Storage policy SQL and setup guide are in `supabase/`.
- CI and Pages deployment are already configured in `.github/workflows/`.
- Static SEO assets currently include a favicon, robots.txt and sitemap.xml.

### Keep and reuse

- Existing Git history and repository.
- `pijush.runs-on.dev` custom domain and `CNAME`.
- GitHub Pages deployment workflow and Node 22 CI baseline.
- TypeScript strictness, npm lockfile, dependency audit and production smoke-test pattern.
- Useful accessibility, reduced-motion and responsive implementation practices after review.

### Replace or remove from the website

- VAULT product branding, storage landing page, workspace, login and legal copy.
- Supabase client dependency and all browser-side auth/storage integration once no route depends on them.
- Supabase-specific CSP origins and storage configuration in documentation.
- Storage-oriented design system and redundant stylesheet layers.
- Storage-specific sitemap entries and metadata.

### Data and security guardrails

- Do not delete the Supabase project, private bucket, storage objects, auth users or SQL policies during the website migration.
- The old Supabase project currently contains the private `vault-files` bucket and account-scoped object policies. Treat its contents as user data.
- First remove the website's dependency on Supabase, then separately verify whether any data needs export/retention before proposing infrastructure decommissioning.
- Keep secrets out of the repository. The existing browser publishable key is not a service-role key, but it will no longer be needed by the portfolio.
- Do not change DNS or the CNAME unless deployment verification requires it.

### Current outstanding work

- PR #7 (`redesign/real-product-homepage`) is an interim VAULT homepage redesign, not the PIJUSH personal-site migration. Its latest CI run passed, but it has not been merged. Do not merge it into the migration path; the new direction supersedes it.
- Production remains on the existing main branch until a personal-site implementation is reviewed and deployed.

## Target architecture

Keep React + TypeScript + Vite and refactor into small route-level modules. Avoid a framework migration unless a measured requirement appears.

```text
src/
  app/          router, route metadata, app shell
  components/   navigation, footer, motion, reusable UI
  pages/        Home, About, Projects, ProjectDetail, Writing,
                Article, Experiments, Uses, Now, Contact, NotFound
  content/      profile, projects, articles, experiments
  data/         typed content schemas and project registry
  styles/       tokens, typography, global, motion, responsive
  assets/       optimized local images, project media, graphics
public/         favicon, social preview, robots, sitemap, manifest
```

### Proposed routes

- `/` — introduction, selected work, about preview, recent writing and contact invitation
- `/about` — background, interests and development journey
- `/projects` — project directory
- `/projects/:slug` — detailed project case study
- `/writing` and `/writing/:slug` — articles and technical notes
- `/experiments` — prototypes and creative explorations
- `/uses` — tools and development setup
- `/now` — current focus
- `/contact` — contact and verified social links

## Implementation phases

1. Phase 1 — Audit and migration preparation (this document).
2. Phase 2 — Brand system: art direction, typography, palette, layout grid, motion principles and asset inventory.
3. Phase 3 — App foundation: route structure, shared shell, metadata, 404 handling, accessibility and responsive primitives (implemented; CI passed).
4. Phase 4 — Homepage: custom hero, visual signature, selected work and editorial sections.
5. Phase 5 — Projects: verified project registry and reusable case-study pages.
6. Phase 6 — Personal content: About, Writing, Experiments, Uses, Now and Contact.
7. Phase 7 — Motion, performance and PWA: purposeful interaction, reduced-motion fallback, image optimization, offline shell and install metadata.
8. Phase 8 — QA and launch: route tests, mobile/desktop review, accessibility, SEO, dependency/security audit, Pages deployment and custom-domain verification.

## Acceptance criteria

- No VAULT branding, login, storage UI or broken storage routes remain in the public experience.
- All project descriptions, screenshots, status claims and external links are verified before publication.
- Dark creative visual identity is coherent across all routes and screen sizes.
- Experimental motion remains usable with keyboard, touch and reduced-motion preferences.
- All routes work on the custom domain, including direct navigation and refresh.
- CI, production build, smoke tests and GitHub Pages deployment pass.
- No Supabase data or infrastructure is deleted as part of the frontend migration.
- README, metadata, favicon, sitemap and robots.txt describe PIJUSH rather than VAULT.

## Phase 4 implementation notes\n\n- Rebuilt the homepage around a large typographic introduction, custom orbital signal object, coordinate details and a scrolling discipline ticker.\n- Added original, inline SVG artwork for Code Forge, ATLAS, PIJUSH OS and Modern Calculator; these are authored illustrations of the documented project concepts, not screenshots or claims about the live UI.\n- Replaced the generic project list on the homepage with a responsive editorial project gallery and added the same artwork to project detail pages.\n- Added a manifesto section and clear contact invitation.\n- Added reduced-motion behavior for the ticker and hover transitions; the ambient canvas remains paused for reduced-motion users and hidden tabs.\n- Latest CI run `44943040270` passed dependency audit, regression tests, TypeScript build and production smoke test.\n\n## Phase 3 implementation notes

- Replaced the storage application entry with a small route-aware portfolio shell.
- Added typed project records for Code Forge, ATLAS, PIJUSH OS and Modern Calculator, using repository-backed summaries and verified source/demo links.
- Added Home, About, Projects, Project Detail, Experiments, Writing, Uses, Now, Contact and Not Found routes.
- Added shared responsive navigation/footer, dark design tokens, keyboard focus treatment and reduced-motion CSS.
- Added a lightweight canvas signal field that responds to pointer movement on fine-pointer devices, caps device pixel ratio, pauses while the tab is hidden and stops continuous motion when reduced motion is requested.
- Replaced title/description/canonical/robots metadata, favicon, sitemap, robots.txt, README and deployment workflow branding.
- Updated production smoke and regression tests for the new portfolio and retained legacy storage-policy idempotence checks.
- The legacy Supabase project, bucket, data and policy SQL remain intact. The old client package is still present in the dependency lock pending a deliberate dependency cleanup after CI review.

## Phase 7 production-readiness notes

- Corrected the CSP so it permits the single verified external host used by the genuine Calculator screenshot.
- Added the four project detail routes to the sitemap and added Twitter summary metadata.
- Extended production smoke tests to cover the image-source CSP directive and social metadata.
- Recorded the remaining launch caveats in [PRODUCTION_READINESS_AUDIT.md](PRODUCTION_READINESS_AUDIT.md).
- CI passed on final branch head `4dcc9da612bdd3bd298c85e9c32d6d9edf5fe5` in run [44943969311](https://github.com/TEJAS-MK2/Vault/actions/runs/44943969311): dependency audit, regression tests, TypeScript build and production smoke test all passed.
- Phase 8: Playwright checked all 13 routes at mobile and desktop widths, responsive widths 320–1440px, reduced motion, browser errors, and axe-core WCAG 2.1 A/AA. Initial contrast and accessible-name findings were fixed; 26 route/viewport accessibility scans then passed with zero violations. See [PHASE_8_QA_REPORT.md](PHASE_8_QA_REPORT.md).
- Physical-device and assistive-technology checks remain before public launch. The draft PR remains open. Do not merge or deploy until reviewed and explicitly approved.
