-- Temporarily allow anon upload
CREATE POLICY "Anon Upload Temporary 3"
ON storage.objects FOR INSERT
TO anon
WITH CHECK ( bucket_id = 'project-images' );
