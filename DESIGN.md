# VAULT — Design specification

## Research references

Design exploration focused on file-management patterns, not copying a branded UI or assets.

- [Beamline UI — File manager](https://beamline.io/components/file-manager): side navigation for file views, persistent storage context, breadcrumb path, global file search, grid/list switching, upload as the primary action, and contextual file actions.
- [Mobbin — Web dashboard and filtering patterns](https://mobbin.com/explore/web/screens/monitoring-dashboard): compact dashboard hierarchy, restrained controls, filters and clear navigation patterns.
- [Made Good Designs — File manager UX](https://www.madegooddesigns.com/): common patterns around file lists, folder paths, upload flows and empty/error states.

These references inform familiar interaction patterns only. VAULT uses its own layout, copy, color palette and CSS illustration. No reference screenshots, logos or proprietary assets are copied.

## Visual direction

A confident, premium cloud workspace with the clarity of a well-made desktop utility. Pair cool off-white surfaces and deep midnight navigation with a focused electric-blue accent, crisp borders, generous spacing and restrained depth. Keep decoration subordinate to the files.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| Canvas | `#F6F8FC` | Public and workspace background |
| Paper | `#FFFFFF` | Secondary page surface |
| Surface | `#FFFFFF` | Cards, panels and controls |
| Ink | `#172033` | Primary text |
| Muted ink | `#657087` | Secondary text |
| Border | `#E7EBF2` | Separators and outlines |
| Primary | `#315EFB` | Primary actions and selection |
| Primary strong | `#244BD3` | Hover state |
| Primary soft | `#EDF2FF` | Selected navigation |
| Warm accent | `#9B7A55` | Small visual highlights |
| Danger | `#D44D5C` | Destructive actions |

## Typography

Use native system sans-serif stacks. The production site does not load remote font files or analytics scripts. Use bold, tightly tracked display headings, clear hierarchy and tabular numerals for sizes and timestamps. Keep metadata visually quieter than file names.

## Public homepage

- Header with wordmark, short navigation, sign-in link and one primary action.
- Editorial hero with plain-language value proposition.
- CSS-built workspace illustration; no third-party images required.
- Short trust strip and feature explanations.
- Clear final CTA, then footer links to terms and privacy.

## Workspace

- Midnight-blue left navigation with file-type views and account controls.
- Electric-blue primary actions and selected states; cool white surfaces and crisp borders.
- Top bar with current path breadcrumbs, scoped search and private-state indicator.
- Page heading with new-folder and upload actions.
- Folder-first file list with grid/list switch.
- Contextual actions for download, rename and delete.
- Empty, loading and error states.
- Mobile navigation drawer, compact controls and touch-friendly entry cards.

## Interaction and accessibility

- Use semantic buttons, anchors, labels and section headings.
- Keyboard search shortcut: Ctrl/Cmd + K; Escape closes the mobile menu.
- Keep the folder path visible when drilling into nested folders.
- Use authenticated Supabase operations for every cloud file action.
- Respect `prefers-reduced-motion`.
- Provide visible focus rings, readable labels and accessible action names.
- Do not imply an upload succeeded until the storage API confirms it.

## Security and product boundaries

- Keep the storage bucket private and rely on server-side Storage RLS.
- Do not use a public URL for private file downloads.
- Keep the publishable key public and never expose a service-role/secret key.
- Search currently matches names in the current folder. It is not full-text content search.
- Trash, restore, shared folders, notes, bookmarks, and resumable large-file uploads are future work until their backing data model and controls are implemented.
