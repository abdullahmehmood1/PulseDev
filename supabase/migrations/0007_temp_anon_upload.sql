create policy "Anon Upload Temporary"
on storage.objects for insert
to anon
with check ( bucket_id = 'project-images' );
