UPDATE public.projects SET image_url = 'https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_hero_fixed.png', extra_images = ARRAY['https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_scan_fixed.png','https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_settings_fixed.png'] WHERE title = 'ScanFlow POS';

-- Revert Temporary Anon Upload Policy 3
DROP POLICY IF EXISTS "Anon Upload Temporary 3" ON storage.objects;
