require('dotenv').config({ path: './client/.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

const projects = [
  {
    title: "DietPro",
    category: "AI SaaS / Web App",
    description: "Your Personal AI Dietitian. Generate highly personalized meal plans, track your calories effortlessly, and achieve your fitness goals with the world's smartest nutrition engine.",
    tech_stack: ["React", "Next.js", "AI", "PostgreSQL"],
    project_url: "https://diet-pro-two.vercel.app/",
    imagePath: "C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\dietpro_mockup_1785500230532.png",
    fileName: "dietpro_mockup.png",
    is_featured: true,
    sort_order: 1
  },
  {
    title: "PhishGuard AI",
    category: "Cybersecurity",
    description: "Detect Phishing Websites Instantly. Advanced neural threat protection and zero trust architecture for real-time security analysis.",
    tech_stack: ["React", "Python", "Machine Learning", "AWS"],
    project_url: "https://phishing-website-detection-app.vercel.app/",
    imagePath: "C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\phishguard_mockup_1785500243456.png",
    fileName: "phishguard_mockup.png",
    is_featured: true,
    sort_order: 2
  },
  {
    title: "DailyInstruct",
    category: "News & Media",
    description: "A modern digital publication platform covering geopolitics, technology, markets, and business news with real-time economic dashboards.",
    tech_stack: ["Next.js", "TailwindCSS", "PostgreSQL", "Vercel"],
    project_url: "https://www.dailyinstruct.com/",
    imagePath: "C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\dailyinstruct_mockup_1785500256741.png",
    fileName: "dailyinstruct_mockup.png",
    is_featured: true,
    sort_order: 3
  },
  {
    title: "Bol",
    category: "AI Messaging App",
    description: "Stop settling for noise. Next-generation messaging with intelligent summaries, voice transcription, and end-to-end encryption.",
    tech_stack: ["React Native", "WebSockets", "AI", "Node.js"],
    project_url: "https://bol-alpha.vercel.app/",
    imagePath: "C:\\Users\\na350\\.gemini\\antigravity\\brain\\60873417-1a9b-4090-b75d-eb70a6426467\\bol_mockup_1785500266049.png",
    fileName: "bol_mockup.png",
    is_featured: true,
    sort_order: 4
  }
];

async function seed() {
  for (let p of projects) {
    console.log(`Processing ${p.title}...`);
    
    // Upload image
    const fileData = fs.readFileSync(p.imagePath);
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('project-images')
      .upload(`public/${p.fileName}`, fileData, {
        contentType: 'image/png',
        upsert: true
      });

    if (uploadError) {
      console.error(`Error uploading ${p.fileName}:`, uploadError);
      continue;
    }

    const { data: publicUrlData } = supabase.storage.from('project-images').getPublicUrl(`public/${p.fileName}`);
    const imageUrl = publicUrlData.publicUrl;

    console.log(`-- SQL for ${p.title}:`);
    console.log(`INSERT INTO public.projects (title, category, description, tech_stack, project_url, image_url, is_featured, sort_order) VALUES ('${p.title}', '${p.category}', '${p.description.replace(/'/g, "''")}', ARRAY[${p.tech_stack.map(t => `'${t}'`).join(', ')}], '${p.project_url}', '${imageUrl}', ${p.is_featured}, ${p.sort_order});\n`);
  }
  console.log("Seeding complete!");
}

seed();
