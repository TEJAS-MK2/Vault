# VAULT — Design specification

## Visual direction

A calm, modern file workspace with the clarity of a well-made desktop utility and the warmth of a considered editorial product. It should feel human-designed, dependable, and quietly premium.

Design references researched:
- [Dribbble — Cloud storage UI](https://dribbble.com/search/cloud-storage-ui)
- [Dribbble — File manager web app](https://dribbble.com/search/file-manager-web-app)
- [Dribbble — File storage app](https://dribbble.com/search/file-storage-app)
- [Dribbble — Cloud storage app UI](https://dribbble.com/search/cloud-storage-app-ui)

These are inspiration for familiar file-management patterns, not assets or layouts to copy.

## Color system

### Light theme (default)

| Token | Hex | Use |
|---|---|---|
| Canvas | `#F5F6F2` | Main app background |
| Surface | `#FFFFFF` | Panels, menus, cards |
| Surface muted | `#EEF1EB` | Subtle grouped areas |
| Ink | `#202923` | Primary text |
| Muted ink | `#68736B` | Secondary text |
| Border | `#E2E7DF` | Dividers and outlines |
| Primary | `#426B55` | Main actions and selected states |
| Primary soft | `#E7EFE8` | Soft selection and accent surfaces |
| Warm accent | `#B77B4B` | Small highlights, used sparingly |
| Danger | `#B94B45` | Destructive actions and errors |
| Success | `#3F795A` | Successful states |

### Dark theme

| Token | Hex | Use |
|---|---|---|
| Canvas | `#171C19` | Main app background |
| Surface | `#202722` | Panels and cards |
| Surface muted | `#28322B` | Subtle grouped areas |
| Ink | `#EEF2EC` | Primary text |
| Muted ink | `#A4AFA5` | Secondary text |
| Border | `#354139` | Dividers and outlines |
| Primary | `#91B49A` | Main actions and selected states |
| Primary soft | `#293B30` | Soft selection surfaces |
| Warm accent | `#D2A176` | Small highlights |

Use semantic tokens rather than hard-coded colors inside components. Check contrast for text and controls in both themes.

## Typography

- Use a neutral, highly readable sans-serif such as Inter or Geist.
- Use clear hierarchy and moderate weights; avoid oversized marketing-style headings inside the app.
- Use tabular numerals for file sizes, dates, and storage metrics.
- Keep metadata visually quieter than filenames.

## Layout

- Desktop: compact left navigation, a clear top bar, and a flexible content area.
- Main content: breadcrumb/title row, contextual actions, search/filter controls, then files.
- Use a comfortable content width and consistent spacing; avoid a dashboard made entirely of cards.
- Grid and list views should both be first-class.
- On mobile, collapse navigation into a simple drawer or bottom navigation and keep upload/search actions reachable.

## Components and interaction

- File rows/cards show a recognizable type or thumbnail, filename, modified date, size, and contextual actions.
- Use real previews for supported image, video, audio, and document formats.
- Upload uses a visible drop zone and a persistent queue with per-file progress, pause/retry where supported, and clear failure messages.
- Selection reveals a compact bulk-action bar.
- Menus and dialogs should be simple, predictable, and keyboard accessible.
- Empty states should explain what belongs here and offer one useful next action.
- Use motion only for feedback: short transitions, upload progress, menu/dialog entry. No ambient animations.

## Avoid

- Purple/blue gradient backgrounds as the main identity.
- Neon outlines, glowing blobs, excessive blur, and glassmorphism everywhere.
- Random 3D objects, floating orbs, AI sparkles, or decorative charts.
- Over-rounded cards and buttons on every surface.
- Fake storage metrics, fake uploads, or fake activity in production UI.

## Product voice

Plain, concise, and reassuring. Prefer “Upload files”, “Move to folder”, “Copy link”, and “Restore” over vague marketing language.
