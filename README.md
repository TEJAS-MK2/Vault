# VAULT

**A little more room for everything.**

VAULT is a cloud-only storage workspace for files, photographs, videos and documents. It combines a quiet, editorial public homepage with a responsive private file workspace.

**Live site:** https://tejas-mk2.github.io/Vault/

## What is included

- Public homepage with product overview and clear sign-in entry points.
- Email magic-link authentication through Supabase Auth.
- Private cloud file listing, uploads and drag-and-drop uploads.
- Folder creation, nested folder navigation and path breadcrumbs.
- Authenticated downloads, file rename and recursive folder/file deletion.
- Search within the current folder, file-type views, and grid/list layouts.
- Responsive workspace navigation and keyboard shortcut (Ctrl/Cmd + K).
- Dedicated Terms and Conditions, Privacy Policy and custom 404 pages.
- GitHub Pages build/deploy workflow, route fallback, CSP and dependency audit in CI.

## Design direction

VAULT uses warm off-white surfaces, dark ink typography, quiet green accents, precise borders and restrained motion. The interface takes familiar file-manager conventions—persistent search, breadcrumbs, grid/list view, folder-first browsing and visible file actions—from design research without copying another product's assets or identity.

See [DESIGN.md](./DESIGN.md) for references and interface guidance.

## Technology

- React 19 + TypeScript + Vite
- Supabase Auth and private Supabase Storage
- Lucide icons
- GitHub Actions + GitHub Pages

## Cloud project

- Supabase project: `VAULT`
- Region: Mumbai, India (`ap-south-1`)
- Project ref: `jlwutbqzjgxhbhakvoci`
- Private bucket: `vault-files`

The website uses the Supabase publishable key only. Never place a service-role key or Supabase secret in a `VITE_*` variable, commit it, or ship it to the browser.

## Run locally

1. Install Node.js 22 or later.
2. Copy `.env.example` to `.env`.
3. Add the Supabase project URL, publishable key and bucket name.
4. Install and start:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run test:smoke
npm run preview
```

## GitHub Pages

The Vite base path is configured as `/Vault/`. The Pages workflow builds the site, runs a dependency audit, copies the built application shell to `dist/404.html` for client-side route fallback, and deploys the `dist` artifact.

In GitHub repository settings, select **Settings → Pages → Build and deployment → Source → GitHub Actions** if Pages has not already been configured for Actions.

## Supabase Auth redirect

Add the following URL to **Supabase Dashboard → Authentication → URL Configuration → Redirect URLs**:

`https://tejas-mk2.github.io/Vault/app`

For local development, add `http://localhost:5173/Vault/app` as well. Set the Site URL to `https://tejas-mk2.github.io/Vault/`.

## Security model

- The `vault-files` bucket remains private.
- Objects are stored under the authenticated user's UUID path.
- Storage RLS restricts SELECT, INSERT, UPDATE and DELETE to that first path segment.
- Downloads use authenticated Supabase Storage access; files are not made public.
- Client paths reject slashes, backslashes, control characters and dot-segments in file/folder names.
- Browser code contains no privileged Supabase key.
- A Content Security Policy limits scripts, styles, frames, images and connections to the site and its Supabase project.
- CI runs `npm audit --audit-level=high`, TypeScript build and a production-output smoke test.

GitHub Pages can serve static security metadata through the document CSP; response headers that require server control (for example, strict transport and frame-ancestors headers) are not configurable from this static project alone.

## Current product boundaries

This release includes folders and core file actions. Full-text indexing, notes/bookmarks, multi-user sharing, trash/restore, large-file resumable uploads and user-facing storage quota reporting are not implemented yet and are not represented as working controls in the UI.

## Legal pages

- [Terms and Conditions](https://tejas-mk2.github.io/Vault/terms)
- [Privacy Policy](https://tejas-mk2.github.io/Vault/privacy)

The legal pages are a product-specific starting point, not a substitute for jurisdiction-specific legal review before commercial use.
