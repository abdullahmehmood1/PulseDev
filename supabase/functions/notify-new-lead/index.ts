import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY');
const BREVO_SENDER_EMAIL = Deno.env.get('BREVO_SENDER_EMAIL');
const NOTIFY_TO_EMAIL = Deno.env.get('NOTIFY_TO_EMAIL');

serve(async (req) => {
  try {
    const payload = await req.json();
    
    // Check if this is an INSERT trigger
    if (payload.type !== 'INSERT' || !payload.record) {
      return new Response("Not an INSERT event", { status: 400 });
    }

    const lead = payload.record;
    
    const subject = `New Lead (${lead.source}): ${lead.name}`;
    
    const htmlContent = `
      <h2>New Lead Submission</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
      <p><strong>Source:</strong> ${lead.source}</p>
      <p><strong>Service:</strong> ${lead.service || 'N/A'}</p>
      <p><strong>Budget:</strong> ${lead.budget || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ccc;">
        ${lead.message}
      </blockquote>
    `;

    const brevoPayload = {
      sender: { name: "PulseDev Admin", email: BREVO_SENDER_EMAIL },
      to: [{ email: NOTIFY_TO_EMAIL }],
      subject: subject,
      htmlContent: htmlContent
    };

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify(brevoPayload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Brevo API Error:", errorText);
      return new Response(JSON.stringify({ error: "Failed to send email", details: errorText }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Function Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
})
