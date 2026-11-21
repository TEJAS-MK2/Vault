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

## Technology

- **Frontend:** React + TypeScript + Vite
- **Database:** Supabase Postgres
- **Object storage:** Supabase Storage
- **Authentication:** Supabase Auth (email magic links)
- **Deployment target:** Vercel

## Connected cloud project

- Supabase project: `VAULT`
- Region: Mumbai, India (`ap-south-1`)
- Private bucket: `vault-files`
- Project ref: `jlwutbqzjgxhbhakvoci`

See [supabase/SETUP.md](./supabase/SETUP.md) for configuration and security details. Do not commit service-role keys or other secrets.

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

Initial frontend foundation and dedicated Supabase project are in place. The private `vault-files` bucket and per-user storage policies have been deployed and verified. The current UI supports email magic-link sign-in, user-scoped cloud file listing and uploads, search, and grid/list presentation. Additional content types and management workflows remain in the roadmap.
