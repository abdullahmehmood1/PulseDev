UPDATE public.projects SET extra_images = ARRAY['https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_quality_mockup.png','https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_progress_mockup.png'] WHERE title = 'Onyx';
UPDATE public.projects SET extra_images = ARRAY['https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_scan_mockup.png','https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_settings_mockup.png'] WHERE title = 'ScanFlow POS';

-- Revert Temporary Anon Upload Policy 2
DROP POLICY IF EXISTS "Anon Upload Temporary 2" ON storage.objects;
