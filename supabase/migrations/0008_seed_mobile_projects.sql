-- Insert Mobile App Projects
INSERT INTO public.projects (title, category, description, tech_stack, image_url, is_featured, sort_order)
VALUES
(
  'Onyx',
  'Mobile App',
  'High-end, lightning-fast video and MP3 downloader for platforms like Instagram and YouTube. Features a clean, minimalist UI for maximum performance and no watermarks.',
  ARRAY['React Native', 'Node.js', 'FFmpeg', 'REST API'],
  'https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/onyx_mockup.png',
  true,
  10
),
(
  'ScanFlow POS',
  'Mobile App',
  'Advanced Point of Sale and inventory management dashboard for utility and departmental stores. Operates entirely on mobile without external hardware, featuring advanced barcode scanning, rich analytics, and instant manual checkouts.',
  ARRAY['Flutter', 'Firebase', 'SQLite', 'Camera Vision'],
  'https://vradfudhojejfsywnkmj.supabase.co/storage/v1/object/public/project-images/public/scanflow_mockup.png',
  true,
  20
);

-- Revert Temporary Anon Upload Policy
DROP POLICY IF EXISTS "Anon Upload Temporary" ON storage.objects;
