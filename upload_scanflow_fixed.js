import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploads = [
  {
    type: 'hero',
    name: 'scanflow_hero_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_hero_fixed_1785503180339.png'
  },
  {
    type: 'extra1',
    name: 'scanflow_scan_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_scan_fixed_1785503196858.png'
  },
  {
    type: 'extra2',
    name: 'scanflow_settings_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_settings_fixed_1785503207868.png'
  }
];

async function seed() {
  console.log('Uploading ScanFlow POS fixed images...');
  
  let heroUrl = '';
  let extraUrls = [];

  for (const f of uploads) {
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
    if (f.type === 'hero') {
      heroUrl = publicUrlData.publicUrl;
    } else {
      extraUrls.push(publicUrlData.publicUrl);
    }
  }

  console.log(`-- SQL to run for ScanFlow POS:`);
  console.log(`UPDATE public.projects SET image_url = '${heroUrl}', extra_images = ARRAY['${extraUrls.join("','")}'] WHERE title = 'ScanFlow POS';`);
}

seed().catch(console.error);
