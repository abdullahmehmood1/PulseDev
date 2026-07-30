// @ts-nocheck
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
    
    const serviceMap = {
      'web': 'Web Development',
      'mobile': 'Mobile Apps',
      'saas': 'SaaS Launch',
      'devops': 'DevOps & Cloud',
      'security': 'Security Audit',
      'automation': 'Automation'
    };
    const formattedService = lead.service ? (serviceMap[lead.service] || lead.service) : 'N/A';

    const subject = `New Lead (${lead.source}): ${lead.name}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0f1d;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0a0f1d;">
          <tr>
            <td align="center" style="padding: 40px 10px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto; width: 100%; max-width: 600px; background-color: #111d2e; border-radius: 12px; border: 1px solid #243350;">
                <tr>
                  <td align="center" style="background-color: #0d1526; padding: 35px 20px; border-bottom: 3px solid #3b9ee8; border-top-left-radius: 12px; border-top-right-radius: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
                      <tr>
                        <td align="center" valign="middle" width="52" height="52" style="background-color: #1f5882; border-radius: 8px; border: 2px solid rgba(255, 255, 255, 0.25);">
                          <span style="font-family: 'Arial Black', Impact, sans-serif; font-size: 20px; font-weight: bold; color: #ffffff; letter-spacing: 0.04em;">PD</span>
                        </td>
                      </tr>
                    </table>
                    <h1 style="font-family: 'Arial Black', Impact, sans-serif; font-size: 24px; font-weight: bold; color: #ffffff; margin: 16px 0 8px 0; letter-spacing: 0.06em; text-transform: uppercase;">PulseDev</h1>
                    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; letter-spacing: 0.15em; color: #3b9ee8; text-transform: uppercase; margin: 0;">New Lead Notification</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #ffffff; margin: 0 0 24px 0; line-height: 1.5;">A new lead has been submitted via the <strong>${lead.source}</strong> form.</p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 35px;">
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Name:</strong> <span style="color: #ffffff; font-weight: bold;">${lead.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Email:</strong> <span style="color: #ffffff;">${lead.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Phone:</strong> <span style="color: #ffffff;">${lead.phone || 'N/A'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Company:</strong> <span style="color: #ffffff;">${lead.company || 'N/A'}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Service:</strong> <span style="color: #ffffff;">${formattedService}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid #243350; font-family: Arial, Helvetica, sans-serif; font-size: 15px;">
                          <strong style="color: #94a3b8; padding-right: 15px;">Budget:</strong> <span style="color: #ffffff;">${lead.budget || 'N/A'}</span>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 40px;">
                      <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; padding-bottom: 10px;">
                          Message
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #0d1526; border-left: 4px solid #3b9ee8; padding: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #ffffff; line-height: 1.6;">
                          ${lead.message}
                        </td>
                      </tr>
                    </table>

                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto;">
                            <tr>
                              <td align="center" style="border-radius: 8px; background-color: #1f5882; border: 1px solid #cbd5e1;">
                                <a href="https://pulsedev.dev/admin" target="_blank" style="font-family: 'Arial Black', Impact, sans-serif; font-size: 14px; color: #ffffff; text-decoration: none; padding: 16px 32px; display: inline-block; border-radius: 8px; font-weight: bold; letter-spacing: 0.12em; text-transform: uppercase;">
                                  View in Admin Dashboard
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const brevoPayload = {
      sender: { name: "PulseDev Admin", email: BREVO_SENDER_EMAIL },
      to: [
        { email: NOTIFY_TO_EMAIL },
        { email: "pulsedevsoftware@gmail.com" }
      ],
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
