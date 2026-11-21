-- VAULT private storage setup.
-- Run in the Supabase SQL editor for the dedicated VAULT project.
-- Each user's objects live under a first-level folder matching auth.uid().

insert into storage.buckets (id, name, public)
values ('vault-files', 'vault-files', false)
on conflict (id) do update set public = false;

create policy "VAULT users can read their own files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'vault-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "VAULT users can upload to their own folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'vault-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "VAULT users can update their own files"
on storage.objects for update
to authenticated
using (
  bucket_id = 'vault-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'vault-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "VAULT users can delete their own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'vault-files'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
