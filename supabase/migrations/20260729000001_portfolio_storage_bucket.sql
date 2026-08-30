-- Migration: Portfolio image storage bucket
-- Description: Public storage bucket for uploading portfolio project images
-- from the Admin Panel (real file upload instead of URL-paste).

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Allow the public bucket to be read / written. Service-role calls bypass RLS,
-- these policies also let object reads work through the public URL.
create policy "Portfolio images select"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

create policy "Portfolio images insert"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images');

create policy "Portfolio images update"
  on storage.objects for update
  using (bucket_id = 'portfolio-images')
  with check (bucket_id = 'portfolio-images');

create policy "Portfolio images delete"
  on storage.objects for delete
  using (bucket_id = 'portfolio-images');