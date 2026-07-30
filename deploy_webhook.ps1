# Set Edge Function Secrets
npx supabase secrets set BREVO_API_KEY="YOUR_BREVO_API_KEY" BREVO_SENDER_EMAIL="saadmehmood7741@gmail.com" NOTIFY_TO_EMAIL="saadmehmood7741@gmail.com"

# Deploy Edge Function (with --no-verify-jwt so the webhook can call it directly, or rely on service role key)
npx supabase functions deploy notify-new-lead

Write-Host "Deployment complete! Please set up the Webhook."
Write-Host "NOTE: The Supabase Management API currently does not have a public endpoint for creating webhooks programmatically."
Write-Host "Please run the following SQL in your Supabase SQL Editor, replacing YOUR_SERVICE_ROLE_KEY with your actual Service Role Key:"
Write-Host ""
Write-Host "CREATE TRIGGER `"notify_new_lead_webhook`" AFTER INSERT ON `"public`".`"submissions`""
Write-Host "FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request("
Write-Host "  'https://vradfudhojejfsywnkmj.supabase.co/functions/v1/notify-new-lead',"
Write-Host "  'POST',"
Write-Host "  '{`"Content-Type`":`"application/json`", `"Authorization`":`"Bearer YOUR_SERVICE_ROLE_KEY`"}',"
Write-Host "  '{}',"
Write-Host "  '5000'"
Write-Host ");"
