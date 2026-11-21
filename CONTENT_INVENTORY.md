# PIJUSH — Content and Project Inventory

Status: Initial inventory only. Repository names and past project context are leads, not proof of current production status. Verify each repository, live demo, screenshots, current state and authorship before publishing any claim.

## Personal identity

- Display name: Pijush
- Role phrasing: Creative developer / student developer (confirm final public wording).
- Core themes: web development, developer tools, maps/geospatial interfaces, cybersecurity learning tools, utilities and interactive experiments.
- Writing voice: direct, curious, practical; explain what was built and what was learned.
- Avoid publishing age, school affiliation, private contact details or personal information unless explicitly approved.

## Candidate projects from known development history

| Project | Known repository | Candidate portfolio angle | Publication status |
|---|---|---|---|
| PIJUSH-WEB-OS | `TEJAS-MK2/PIJUSH-WEB-OS` | Browser-based desktop environment with a Windows XP-inspired interface | Verify current build, screenshots and live demo |
| Code-Forge | `TEJAS-MK2/Code-Forge` | Browser-based code editor and development workspace | Verify editor functionality and current deployment |
| ATLAS / MAP | `TEJAS-MK2/ATLAS`, `TEJAS-MK2/MAP` | Mapping platform, spatial data and layer workflows | Confirm which repository is canonical and current |
| PacketLab | `TEJAS-MK2/Cybersecurity` | Interactive cybersecurity learning / packet exploration | Verify scope, safety boundaries and project maturity |
| Chat | `TEJAS-MK2/Chat` | Real-time chat application | Verify current architecture, auth state and deployment |
| Calculator | `TEJAS-MK2/Calculator` | Calculator engine with cross-language implementations | Verify ports, tests and current feature set |
| Weather | `TEJAS-MK2/WEATHER` | Weather application using Open-Meteo | Verify API integration, UI and live demo |
| Storage / VAULT | `TEJAS-MK2/Vault` | Private cloud file manager; legacy product being migrated out of this site | Do not feature as the identity of the new portfolio |
| Fintech / Subscription Bouncer | `TEJAS-MK2/Fintech` | Subscription detection and savings workflow concept | Clearly label prototype/concept until integrations are verified |
| MITROON | `TEJAS-MK2/MITROON` | Political-character fighting game concept | Verify status, content and whether it belongs in the public portfolio |

Other experiments mentioned historically include a custom keyboard, expense tracker, PWA tools, Termux utilities, browser games, and an Internet Intelligence Dashboard. Include only if there is a current repository, working demo or meaningful build artifact.

## Project verification checklist

For each selected project, collect:
- Canonical repository URL and default branch.
- Current commit / last meaningful update.
- What works today (not the original wishlist).
- Whether it is a concept, prototype, active build or completed project.
- Stack and major technical decisions.
- A real screenshot, short capture or visual asset from the project itself.
- Working live demo, if one exists.
- Specific contribution and lessons learned.
- Any security, privacy or content caveats.

Do not invent completion percentages, user counts, stars, download counts, uptime, performance improvements or testimonials.

## Suggested initial selection

A balanced first portfolio can show 4 projects:
1. Code-Forge — developer tooling.
2. ATLAS — spatial / map engineering.
3. PIJUSH-WEB-OS — distinctive interface and interaction design.
4. Calculator — core engineering, testing and language portability.

PacketLab can be a fifth project if the repository contains a safe, demonstrable working build. The remaining projects can live in an archive or experiments index after verification.

This is a suggested editorial mix, not a claim that these projects are complete.

## Content schema proposal

Each project record should use a typed schema with explicit publication state:

```ts
type ProjectStatus = 'concept' | 'prototype' | 'active' | 'completed'

type Project = {
  slug: string
  title: string
  summary: string
  description: string
  status: ProjectStatus
  role: string
  stack: string[]
  repositoryUrl?: string
  demoUrl?: string
  coverImage?: string
  gallery?: string[]
  featured: boolean
  year: number
}
```

The UI must hide absent links and media instead of rendering placeholders. Status labels must reflect verified repository evidence.

## About page content prompts

- What kinds of problems do you enjoy solving?
- Which project taught you the most, and why?
- What do you care about in interface design?
- Which technical areas are you exploring now?
- What are you trying to build next?

Use specific examples from real work. Avoid generic claims about being passionate or innovative.

## Contact and social links

No contact address or social profile URL has been verified in this inventory. Do not invent email addresses, handles or links. Add only user-confirmed or repository-linked public profiles.

## Phase 2 content gate

Before the homepage implementation is considered complete:
- Confirm the public name/role line.
- Verify at least three project repositories and their current state.
- Gather at least one genuine image per featured project or decide on a consistent CSS-based treatment.
- Confirm real contact and social destinations.
- Review every public claim for accuracy.


## Repository-backed verification notes (21 November 2026)

The following facts were checked against the repositories' current `main` README files. This verifies the repository's documented scope, not independent operation of every feature or current live-demo health.

### Strong featured-project candidates

**Code Forge** — [Repository](https://github.com/TEJAS-MK2/Code-Forge) · [Live app](https://tejas-mk2.github.io/Code-Forge/)
- README describes a local-first HTML/CSS/JavaScript browser IDE with CodeMirror 6, sandboxed preview, runtime console, diagnostics, browser-local projects, snapshots, JSON/ZIP backup and offline shell.
- Important honest boundary: projects stay in that browser profile; there is no cloud sync. Preview sandboxing is not a guarantee that arbitrary code is safe.
- Portfolio angle: building a robust browser developer tool with local-first data safety and recovery UX.

**ATLAS** — [Repository](https://github.com/TEJAS-MK2/ATLAS) · [Live app](https://tejas-mk2.github.io/ATLAS/)
- README identifies the current product as ATLAS 4.3 / Aurora Spatial Workspace.
- Documented stack includes JavaScript ES modules, Leaflet, globe.gl, Three.js, GeoJSON, OpenStreetMap, Supabase and PWA support.
- Portfolio angle: map-first geospatial workspace and spatial interaction design.
- Verify the current production build and the precise feature set before making claims about individual analysis workflows.

**PIJUSH OS** — [Repository](https://github.com/TEJAS-MK2/PIJUSH-WEB-OS) · [Live app](https://tejas-mk2.github.io/PIJUSH-WEB-OS/)
- README describes a static browser desktop/PWA using vanilla HTML, CSS and JavaScript, with a Windows XP Luna-inspired shell.
- Documented elements include window management, file manager, virtual filesystem, built-in apps, IndexedDB persistence, backup/restore, package sandboxing and diagnostics.
- Portfolio angle: ambitious interface engineering, desktop metaphors and browser-local application architecture.
- Important honest boundary: it is a browser-based desktop environment, not an operating system.

**Modern Calculator** — [Repository](https://github.com/TEJAS-MK2/Calculator) · [Live app](https://tejas-mk2.github.io/Calculator/)
- README describes a browser calculator and reusable calculation engines across JavaScript, Python, Ruby, Java, Gradle and .NET.
- Documented areas include exact rational arithmetic, scientific tools, matrices, statistics, PWA/offline support and tests.
- Portfolio angle: reusable calculation-engine design and cross-language implementation.
- Verify package registry links and versions before displaying them as current install instructions.

### Additional candidates

**Subscription Bouncer** — [Repository](https://github.com/TEJAS-MK2/Fintech) · [Live app](https://subscription-bouncer.vercel.app/)
- README describes an India-first subscription intelligence workspace with CSV imports, recurring-payment pattern detection, duplicate candidates, price-change signals and user-scoped Supabase data.
- Critical limitation: it does not connect to bank accounts, initiate payments, cancel subscriptions or negotiate with merchants. Savings are estimates.
- Portfolio angle: explainable transaction-pattern analysis and a carefully scoped fintech prototype.

**MITROON** — [Repository](https://github.com/TEJAS-MK2/MITROON) · [GitHub Pages demo](https://tejas-mk2.github.io/MITROON/) · [Vercel demo](https://mitroon-pijush1.vercel.app/)
- README describes an Indian political-satire 2D arcade fighting game, with a sixteen-fighter parody roster, local CPU play and early private WebSocket room prototype.
- Critical limitation: multiplayer is not authoritative against cheating; ranked play, accounts and persistent online tournament features are not implemented.
- Portfolio angle: game interaction, canvas presentation and a distinctive cultural satire concept. Use a content warning/context line and review all artwork and copy before featuring.

### Excluded pending repository verification

- `TEJAS-MK2/WEATHER` did not resolve through the repository endpoint during this audit; do not publish its link until the canonical repository is confirmed.
- `TEJAS-MK2/Cybersecurity` and `TEJAS-MK2/Chat` were not verified in this pass. Keep them out of the featured list until their canonical repositories and README files are checked.
- Do not assume similarly named repositories are the same project; resolve canonical repository URLs first.

### Recommended homepage order

1. Code Forge — a strong direct match for a developer-builder identity.
2. ATLAS — the most visually expressive geospatial project.
3. PIJUSH OS — distinctive interface/interaction work.
4. Modern Calculator — engineering depth and reusable software.
5. Subscription Bouncer or MITROON — optional, based on visual evidence and final editorial balance.

Use four featured projects initially. Place the rest in an archive rather than overcrowding the homepage.
