# Supabase setup

VAULT is cloud-only. The dedicated Supabase project has been created and the private storage bucket and access policies have been applied.

## Connected project

- Project: `VAULT`
- Project ref: `jlwutbqzjgxhbhakvoci`
- Region: `ap-south-1` (Mumbai, India)
- API URL: `https://jlwutbqzjgxhbhakvoci.supabase.co`
- Private bucket: `vault-files`

## Local / deployment environment

Copy the values from [../.env.example](../.env.example) into your local `.env` file and into the frontend deployment environment. The publishable key is intended for browser use; never expose a Supabase secret or service-role key in frontend code.

- `VITE_SUPABASE_URL`: project API URL.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: public publishable client key.
- `VITE_STORAGE_BUCKET`: `vault-files`.

Configure the deployed VAULT domain as an allowed Auth redirect URL in Supabase Auth. Email magic-link sign-in is used by the current frontend.

## Storage security model

The `vault-files` bucket is private. Objects are stored below a first-level folder named with the authenticated user's UUID. Policies grant SELECT, INSERT, UPDATE, and DELETE only when that first path segment matches `auth.uid()`.

The bucket and policies are deployed. The frontend uses authenticated sessions and user-scoped object paths. Do not make the bucket public. Use authenticated downloads or short-lived signed URLs for sharing.

## Current implementation boundary

The first frontend slice includes email magic-link sign-in, user-scoped file listing, direct cloud uploads, drag-and-drop upload, search, and grid/list presentation. Folder management, rich previews, metadata records for notes and bookmarks, trash, and sharing are subsequent phases.
