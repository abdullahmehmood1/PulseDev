-- Add extra_images column to projects table
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS extra_images text[] DEFAULT '{}';

-- Temporarily allow anon upload
CREATE POLICY "Anon Upload Temporary 2"
ON storage.objects FOR INSERT
TO anon
WITH CHECK ( bucket_id = 'project-images' );
