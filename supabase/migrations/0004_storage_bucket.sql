insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

create policy "Public Access" 
  on storage.objects for select 
  to public 
  using (bucket_id = 'project-images');

create policy "Admin upload access"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

create policy "Admin update access"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images');

create policy "Admin delete access"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');
