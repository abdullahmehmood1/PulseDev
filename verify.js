require('dotenv').config({ path: './client/.env' });

async function verify() {
  const url = process.env.VITE_SUPABASE_URL;
  console.log("Verifying Bucket via Public URL...");
  
  const publicUrl = `${url}/storage/v1/object/public/project-images/dummy.png`;
  console.log("Fetching:", publicUrl);
  
  const res = await fetch(publicUrl);
  const text = await res.text();
  
  console.log("Status:", res.status);
  console.log("Response:", text);
}

verify();
