# VAULT

**Your personal digital storage workspace.**

VAULT is a cloud-only place to keep, organize, find, and preview the digital things that matter: files, photos, videos, documents, archives, notes, and links.

> The goal: make storage feel calm, dependable, and effortless — not like another noisy SaaS dashboard.

## Product direction

- **Everything in one place:** files and media, notes, bookmarks, and saved references.
- **Cloud-only:** data is stored remotely and available across signed-in devices. No local-first or offline-storage promise.
- **Clear organization:** folders, collections, tags, favorites, and a useful recent-items view.
- **Fast retrieval:** global search, filters, file-type views, and meaningful metadata.
- **Trustworthy controls:** upload progress, clear errors, recoverable deletion, and transparent storage usage.
- **Responsive by default:** a first-class phone experience as well as desktop.

## Design direction

VAULT uses a restrained, editorial productivity aesthetic: warm neutral surfaces, dark ink typography, quiet green accents, crisp borders, and generous but purposeful spacing. No purple gradients, neon glow, decorative glassmorphism, or generic AI-dashboard patterns.

See [DESIGN.md](./DESIGN.md) for the visual system and interface principles.

## Planned technology

- **Frontend:** React + TypeScript + Vite
- **Styling:** CSS design tokens and component-level styles
- **Cloud platform:** Supabase
- **Database:** Supabase Postgres for metadata, folders, notes, links, and ownership
- **Object storage:** Supabase Storage for uploaded files and media
- **Authentication:** Supabase Auth; private user-owned data
- **Deployment:** Vercel

The browser should access private objects through authenticated Supabase clients and short-lived signed URLs where appropriate. Never expose the Supabase service-role key in frontend code.

## Core areas

1. **Overview** — recent activity, storage usage, quick actions.
2. **All files** — searchable grid and list views with previews.
3. **Media** — photos, videos, and audio.
4. **Documents** — PDFs, office files, and text documents.
5. **Notes** — saved text and ideas.
6. **Links** — bookmarks and references.
7. **Folders & collections** — user-defined organization.
8. **Favorites** — pinned items.
9. **Trash** — recoverable deleted items with retention rules.
10. **Settings** — profile, storage, security, and preferences.

## Development principles

- Keep the interface useful before making it decorative.
- Build accessible controls, keyboard navigation, and responsive layouts.
- Treat every upload as a real cloud operation; never imply a demo upload was saved.
- Enforce ownership and authorization in database policies and storage policies.
- Validate file type and size, handle interrupted uploads, and show clear progress.
- Test permissions and failure paths, not just the happy path.

## Status

Early foundation stage. The repository currently contains the product direction and design specification; application implementation is next.
