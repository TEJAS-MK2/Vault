# PIJUSH — Visual Direction

Status: Phase 2 direction defined and implemented across Phases 3–8. Automated browser/accessibility QA passed; physical-device and assistive-technology review remain.

## Creative thesis

**A living digital sketchbook for a developer who builds things.**

The site should feel authored, exploratory and technically curious—not like a portfolio template, agency landing page or AI-generated SaaS dashboard. The visual language combines an editorial portfolio with a small interactive digital instrument panel. The work is the content; the interface provides atmosphere and navigation without competing with it.

Identity decisions:
- Identity: creative developer / builder.
- Appearance: dark by default.
- Motion: experimental, responsive to user intent and restrained where reading matters.
- Voice: direct, curious, precise; no inflated claims or generic startup slogans.
- Primary domain: `pijush.runs-on.dev`.

## Art direction

### Visual metaphor: signal / canvas / instrument

Use a deep near-black canvas, subtle technical grid/noise, sharp typographic contrast and a limited signal color. Introduce one or two expressive visual moments that feel custom to the site: a generative cursor field, a responsive orbital/coordinate graphic, or a live project index. Do not turn every section into a glowing glass card.

The visual system should balance:
- **Editorial:** large typography, asymmetric composition, generous negative space, concise copy.
- **Technical:** coordinates, timestamps, version labels, thin rules, monospace metadata and precise alignment.
- **Expressive:** unexpected scale shifts, kinetic typography, generative geometry and tactile hover states.
- **Human:** real project screenshots, actual build notes, candid descriptions and personal context.

## Color tokens

| Token | Value | Role |
|---|---|---|
| `--bg` | `#090A0D` | Main canvas |
| `--bg-raised` | `#111319` | Secondary surfaces |
| `--surface` | `#171A22` | Interactive panels |
| `--surface-hover` | `#202431` | Hover surface |
| `--text` | `#F1F0EB` | Main text |
| `--text-muted` | `#A1A4AE` | Secondary text |
| `--text-dim` | `#858A96` | Metadata (AA contrast on the main canvas) |
| `--line` | `#292D37` | Rules and borders |
| `--signal` | `#B6F36B` | Primary electric-lime signal |
| `--signal-alt` | `#8B7CFF` | Occasional violet counterpoint |
| `--warning` | `#FFB86B` | Warnings / experimental states |
| `--danger` | `#FF6B78` | Errors only |

Usage:
- The signal lime is an accent, not a page background. Reserve it for focus, active states, small labels and moments of interaction.
- Violet may appear in generative artwork or a single project-specific treatment; do not make every section multi-colored.
- Avoid gradient-filled cards, excessive blur, glassmorphism and glowing outlines on every element.
- Maintain WCAG AA contrast for body text and controls. Validate actual rendered colors.

## Typography

Use a deliberate two-family system:
- Display and body: a locally bundled or system sans with distinctive shapes and strong variable weight range. Candidate: Space Grotesk, subject to licensing and asset verification.
- Technical metadata: a restrained monospace. Candidate: IBM Plex Mono, subject to licensing and asset verification.

Use oversized display type sparingly, compact all-caps labels for metadata, and readable body copy. Avoid the familiar AI-template combination of giant gradient heading plus three identical feature cards.

## Layout language

- Desktop: editorial asymmetric grid, 12-column foundation, content width around 1440px.
- Mobile: deliberate single-column art direction, not a compressed desktop layout.
- Use a mix of full-bleed visual moments and narrow reading columns.
- Project entries should feel like an index or archive, with varied media proportions rather than identical cards.
- Use thin rules, index numbers, dates and small captions to establish hierarchy.
- Keep navigation compact and useful. Do not add decorative navigation items without real destinations.

## Motion principles

Motion is a core part of the identity, but must remain purposeful.

### Allowed signature interactions
1. A low-amplitude generative canvas/field that responds to pointer position and slowly evolves.
2. A custom cursor treatment on fine-pointer devices only; never hide the native cursor on touch.
3. Kinetic headline reveal on first entry, with no blocking intro sequence.
4. Project media that subtly shifts, clips or reveals detail on hover/focus.
5. A responsive navigation indicator or coordinate readout that reacts to pointer/scroll position.
6. Small page transitions with short duration and no forced waiting.

### Motion constraints
- Respect `prefers-reduced-motion: reduce`; provide static alternatives and disable continuous animation.
- Avoid scroll hijacking, forced horizontal scroll, cursor-following elements that obscure content, flashing, excessive parallax and motion that delays navigation.
- Keep animation compositing-friendly; prefer transform and opacity. Avoid expensive full-screen filters.
- Pause or reduce background animation when the tab is hidden and when the page is not in view.
- Provide keyboard-equivalent states for every hover interaction.
- Test on mid-range Android devices as well as desktop.
- Motion must not be required to understand content or discover links.

### Timing starting points
- Micro interaction: 120–220ms.
- Hover reveal: 180–320ms.
- Section entrance: 350–650ms, once per meaningful viewport entry.
- Generative ambient motion: continuous but low contrast and low CPU; reduced-motion disables it.
These are starting values, not a reason to animate every element.

## Homepage composition

1. **Opening frame:** name / role / short personal statement; one signature generative visual, not a fabricated product mockup.
2. **Selected work:** 3–5 verified projects, each with a distinct image or real interface capture, role, stack and current status.
3. **Builder's note:** a concise explanation of what Pijush likes building and why.
4. **Experiments:** smaller prototypes, interactive sketches and unusual explorations.
5. **Now / current focus:** optional short, maintainable status note.
6. **Contact:** real and verified contact methods only.

## Component direction

- Navigation: compact wordmark, route links, one visible active state.
- Project index: varied editorial rows or asymmetric tiles; never fabricate usage metrics or testimonials.
- Project detail: problem/context, decisions, implementation, screenshots, lessons, links and status.
- Buttons: mostly text-led with clear focus and active feedback.
- Panels: use only when grouping real information. Prefer rules and typography to card containers.
- Background graphics: one authored system, not a pile of decorative gradients.

## Anti-template rules

Do not use:
- Fake terminal windows or fake code output.
- Fabricated visitor counts, uptime, user counts, awards or project metrics.
- Generic phrases such as “Turning ideas into reality” or “Passionate about innovation”.
- Repeated three-card feature grids, floating pill badges or generic glowing blobs.
- Stock photos, random 3D objects or AI-generated portraits presented as real.
- Fake social proof, fake testimonials or links that do not lead anywhere.
- Animation solely to make a page look busy.

## Accessibility and performance baseline

- Semantic landmarks and heading order.
- Keyboard navigation and visible focus indicators.
- WCAG AA text contrast.
- Reduced-motion support from the first animation component.
- Responsive from 320px wide upward.
- Lazy-load below-the-fold media; provide explicit image dimensions.
- Avoid remote font dependencies where possible; self-host licensed font files if used.
- No continuous heavy WebGL by default. A CSS/canvas-first signature effect is preferred; WebGL only if a measured benefit justifies it.

## Phase 2 exit criteria

- [x] Identity, appearance and motion direction locked.
- [x] Color and typography system defined.
- [x] Motion signature and safety constraints documented.
- [x] Homepage information architecture established.
- [x] Verify the four featured project repositories, demo links and current descriptions; distinguish genuine screenshot from conceptual illustrations.
- [x] Keep unverified contact/social links out of the public site.
- [x] Prepare and implement typed route/content schemas.

