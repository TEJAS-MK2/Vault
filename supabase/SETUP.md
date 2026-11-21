# Supabase setup

VAULT is cloud-only. The dedicated Supabase project and private object bucket have already been created.

## Connected project

- Project: `VAULT`
- Project ref: `jlwutbqzjgxhbhakvoci`
- Region: `ap-south-1` (Mumbai, India)
- API URL: `https://jlwutbqzjgxhbhakvoci.supabase.co`
- Private bucket: `vault-files`

## Frontend configuration

The GitHub Pages workflow injects these values at build time:

- `VITE_SUPABASE_URL`: the project API URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: the Supabase publishable key (safe for browser use).
- `VITE_STORAGE_BUCKET`: `vault-files`.

For local development, copy `../.env.example` to `.env` and fill in the same values. Never use the project service-role key or any Supabase secret in a `VITE_*` variable.

## Required Auth redirect configuration

In **Supabase Dashboard → Authentication → URL Configuration**:

- Set **Site URL** to `https://pijush.runs-on.dev/`.
- Add `https://pijush.runs-on.dev/app` to **Redirect URLs**.
- For local development, also allow `http://localhost:5173/app`.

The application sends the magic-link redirect to the current site's `/app` route. The redirect allowlist must be configured in Supabase before production sign-in links can complete successfully.

## Storage security model

The `vault-files` bucket is private (`public = false`). Objects are stored below a first-level folder named with the authenticated user's UUID:

`{auth.uid()}/{optional-folder-path}/{filename}`

Storage policies restrict SELECT, INSERT, UPDATE and DELETE to objects whose first path segment equals the authenticated user's UUID. UPDATE policies include both USING and WITH CHECK. Do not make this bucket public.

The app uses authenticated `.download()` calls for file downloads. It does not generate public URLs for private objects. Names are validated client-side to reject path separators, control characters and dot-segments; the Storage RLS policies remain the security boundary and must not be replaced by client validation.

## Current features

Email magic-link authentication, private folder listing, uploads, folder creation, nested-folder navigation, search by name in the current folder, authenticated downloads, file rename, recursive folder/file deletion and grid/list presentation.

## GitHub Pages

Repository settings must use **Settings → Pages → Build and deployment → Source → GitHub Actions**. The workflow builds the site from the custom domain root and publishes the `dist` directory, including a `404.html` fallback for client-side routes. The repository must have the custom domain configured as `pijush.runs-on.dev`.

## Keep secrets out of the repository

Only the Supabase publishable key is embedded in the public website. Never commit `.env`, service-role keys, access tokens or other secrets. If a secret is accidentally exposed, rotate it immediately in Supabase.
