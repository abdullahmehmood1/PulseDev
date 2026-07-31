import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from both server and client to be safe, prefer service role if available
dotenv.config({ path: './server/.env' });
dotenv.config({ path: './client/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const apps = [
  {
    title: "Onyx",
    category: "Mobile App",
    description: "High-end, lightning-fast video and MP3 downloader for platforms like Instagram and YouTube. Features a clean, minimalist UI for maximum performance and no watermarks.",
    tech_stack: ["React Native", "Node.js", "FFmpeg", "REST API"],
    project_url: null,
    is_featured: true,
    sort_order: 10,
    imagePath: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\onyx_mockup_1785502169132.png',
    fileName: 'onyx_mockup.png'
  },
  {
    title: "ScanFlow POS",
    category: "Mobile App",
    description: "Advanced Point of Sale and inventory management dashboard for utility and departmental stores. Operates entirely on mobile without external hardware, featuring advanced barcode scanning, rich analytics, and instant manual checkouts.",
    tech_stack: ["Flutter", "Firebase", "SQLite", "Camera Vision"],
    project_url: null,
    is_featured: true,
    sort_order: 20,
    imagePath: 'C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\scanflow_mockup_1785502187284.png',
    fileName: 'scanflow_mockup.png'
  }
];

async function seed() {
  for (const app of apps) {
    console.log(`Processing ${app.title}...`);
    
    // Upload image
    console.log(`Uploading ${app.fileName}...`);
    const fileData = fs.readFileSync(app.imagePath);
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('project-images')
      .upload(`public/${app.fileName}`, fileData, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`Error uploading ${app.fileName}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(`public/${app.fileName}`);
    const imageUrl = publicUrlData.publicUrl;

    // Insert to DB
    const { data: dbData, error: dbError } = await supabase
      .from('projects')
      .insert({
        title: app.title,
        category: app.category,
        description: app.description,
        tech_stack: app.tech_stack,
        project_url: app.project_url,
        image_url: imageUrl,
        is_featured: app.is_featured,
        sort_order: app.sort_order
      });

    if (dbError) {
      console.error(`Error inserting ${app.title} into database:`, dbError);
    } else {
      console.log(`Successfully added ${app.title}!`);
    }
  }
}

seed().catch(console.error);
