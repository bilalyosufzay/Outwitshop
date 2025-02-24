
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
  resetUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl }: PasswordResetRequest = await req.json();

    console.log("Sending password reset email to:", email);
    console.log("Reset URL:", resetUrl);

    const emailResponse = await resend.emails.send({
      from: "Outwit Shop <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password - Outwit Shop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6366f1; text-align: center; margin-bottom: 24px;">Reset Your Password</h1>
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            Hello,
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            We received a request to reset your password for your Outwit Shop account. Click the button below to access your account:
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Account
            </a>
          </div>
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            Clicking this link will automatically sign you in. Once signed in, you can change your password from your account settings if needed.
          </p>
          <p style="color: #374151; font-size: 16px; line-height: 24px;">
            If you didn't request this password reset, you can safely ignore this email.
          </p>
          <p style="color: #374151; font-size: 14px; margin-top: 32px; text-align: center;">
            This link will expire in 24 hours.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
