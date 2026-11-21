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
