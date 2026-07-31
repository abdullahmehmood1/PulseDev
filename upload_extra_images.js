import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploads = [
  {
    title: "Onyx",
    files: [
      { name: 'onyx_quality_mockup.png', path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\onyx_quality_mockup_1785502746432.png' },
      { name: 'onyx_progress_mockup.png', path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\onyx_progress_mockup_1785502757348.png' }
    ]
  },
  {
    title: "ScanFlow POS",
    files: [
      { name: 'scanflow_scan_mockup.png', path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_scan_mockup_1785502767445.png' },
      { name: 'scanflow_settings_mockup.png', path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_settings_mockup_1785502776421.png' }
    ]
  }
];

async function seed() {
  for (const app of uploads) {
    console.log(`Processing ${app.title}...`);
    let uploadedUrls = [];

    for (const f of app.files) {
      console.log(`Uploading ${f.name}...`);
      const fileData = fs.readFileSync(f.path);
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('project-images')
        .upload(`public/${f.name}`, fileData, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error(`Error uploading ${f.name}:`, uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(`public/${f.name}`);
      uploadedUrls.push(publicUrlData.publicUrl);
    }

    console.log(`-- SQL to run for ${app.title}:`);
    console.log(`UPDATE public.projects SET extra_images = ARRAY['${uploadedUrls.join("','")}'] WHERE title = '${app.title}';`);
  }
}

seed().catch(console.error);
