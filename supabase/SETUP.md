# Supabase setup

VAULT is cloud-only. It does not use browser local storage as a file store.

## Required project configuration

1. Use a dedicated Supabase project for VAULT.
2. Enable email one-time-password / magic-link sign-in in Supabase Auth.
3. Create a private Storage bucket named `vault-files` by running [storage-policies.sql](./storage-policies.sql) in the SQL Editor.
4. Add the project URL and publishable key to your deployment environment using the names in [../.env.example](../.env.example).
5. Configure the Auth redirect URL for the deployed VAULT domain.

## Environment

- `VITE_SUPABASE_URL`: project API URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: publishable client key. Never put a service-role or secret key in browser environment variables.
- `VITE_STORAGE_BUCKET`: defaults to `vault-files`.

## Storage security model

The bucket must remain private. Objects are stored below a first-level folder named with the authenticated user's UUID. The SQL policies grant SELECT, INSERT, UPDATE, and DELETE only when that first path segment matches `auth.uid()`.

Do not make the bucket public. Use authenticated downloads or short-lived signed URLs for sharing. Review the policies and test cross-user denial before launch.

## Current implementation boundary

The first frontend slice includes email magic-link sign-in, user-scoped file listing, direct cloud uploads, drag-and-drop upload, search, and grid/list presentation. Folder management, rich previews, metadata records for notes and bookmarks, trash, and sharing are subsequent phases.
