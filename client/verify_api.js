import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vradfudhojejfsywnkmj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyYWRmdWRob2plamZzeXdua21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNDcyMzUsImV4cCI6MjEwMDkyMzIzNX0.Oop4_k7Hiz2SpJFW4rH6U5OYlcyU5YAJtCe0t0Ddwig';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log("=== Checking submissions status ===");
  const { data: subs, error: subErr } = await supabase.from('submissions').select('id, status').limit(5);
  if (subErr) console.error("Error:", subErr);
  else console.log(subs);

  console.log("\n=== Checking submission_notes table ===");
  const { data: notes, error: notesErr } = await supabase.from('submission_notes').select('*').limit(1);
  if (notesErr) console.error("Error:", notesErr);
  else console.log("Table exists, returned:", notes);
  
  console.log("\n=== Testing constraints (inserting invalid status) ===");
  const { error: insertErr } = await supabase.from('submissions').insert({
    source: 'contact', name: 'Test', email: 'test@test.com', message: 'Test message', status: 'invalid_status'
  });
  console.log("Insert with invalid status result (expected error):", insertErr ? insertErr.message : "Success? (bad)");
  
  console.log("\n=== Testing constraints (inserting valid status) ===");
  const { error: insertErr2 } = await supabase.from('submissions').insert({
    source: 'contact', name: 'Test', email: 'test@test.com', message: 'Test message', status: 'proposal_sent'
  });
  console.log("Insert with valid status result:", insertErr2 ? insertErr2.message : "Success");
}

verify();
