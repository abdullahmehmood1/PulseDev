UPDATE public.projects SET image_url = 'https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_hero_fixed.png', extra_images = ARRAY['https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_quality_fixed.png','https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_progress_fixed.png'] WHERE title = 'Onyx';

-- Revert Temporary Anon Upload Policy 4
DROP POLICY IF EXISTS "Anon Upload Temporary 4" ON storage.objects;
