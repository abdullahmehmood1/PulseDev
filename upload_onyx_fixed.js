import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const uploads = [
  {
    type: 'extra1',
    name: 'onyx_quality_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\media__1785504767388.png'
  },
  {
    type: 'hero',
    name: 'onyx_hero_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\media__1785504771298.png'
  },
  {
    type: 'extra2',
    name: 'onyx_progress_fixed.png',
    path: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\media__1785504775774.png'
  }
];

async function seed() {
  console.log('Uploading Onyx fixed images...');
  
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

  console.log(`-- SQL to run for Onyx:`);
  console.log(`UPDATE public.projects SET image_url = '${heroUrl}', extra_images = ARRAY['${extraUrls.join("','")}'] WHERE title = 'Onyx';`);
}

seed().catch(console.error);
