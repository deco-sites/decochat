import { verifyCaptcha } from "site/sdk/recaptcha.ts";
import { getSupabaseClient } from "site/clients/supabase.ts";

async function sendEmail(
  { from, to, subject, html }: {
    from: string;
    to: string;
    subject: string;
    html: string;
  },
) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(
      {
        from,
        to,
        subject,
        html,
      },
    ),
  });

  return { ok: true };
}

export type Props = {
  recaptcha: string;
  data: string;
};

export default async function action(
  props: Props,
  _req: Request,
  _ctx: unknown,
): Promise<void> {
  const recaptchaToken = props.recaptcha;
  const isCaptchaValid = await verifyCaptcha(recaptchaToken.toString());
  console;
  if (!isCaptchaValid) {
    throw new Error("Invalid reCAPTCHA token");
  }
  const { data, error } = await getSupabaseClient().from("form_submission")
    .insert({
      data: JSON.parse(props.data),
      site_id: 16085,
    });
  if (error) {
    throw new Error(error.message);
  }
  sendEmail({
    from: "cecilia@deco.cx",
    to: JSON.parse(props.data).email,
    subject: "🎉 You’re In! Welcome to the Agents & MCP Hackathon by deco.chat",
    html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to the Agents & MCP Hackathon by deco.chat</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
      color: #535353;
    "
  >
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse: collapse"
    >
      <tr>
        <td style="padding: 20px 0">
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="
              border-collapse: collapse;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  padding: 40px 30px;
                  background-color: #d0ec1a;
                  text-align: center;
                "
              >
                <h1 style="color:rgb(1, 12, 4); margin: 0; font-size: 28px">
                  🎉 Welcome to the Hackathon!
                </h1>
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td style="padding: 30px">
                <p style="margin-top: 0">Hi ${
      JSON.parse(props.data).fullName
    },</p>

                <p>Welcome aboard!</p>

                <p>
                  You've successfully registered for the Agents & MCP Hackathon
                  by deco.chat—we're excited to have you with us.
                </p>

                <!-- Key Details Box -->
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    background-color: #f8f9fa;
                    border-radius: 6px;
                    margin: 20px 0;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <p style="margin: 5px 0">
                        🗓 <strong>Hackathon Dates:</strong> April 25–26
                      </p>
                      <p style="margin: 5px 0">
                        🌍 <strong>Where:</strong>
                        <a
                          href="https://discord.gg/MTUFh7Hjyx"
                          style="color: #0066cc"
                          >deco.cx/discord</a
                        >
                      </p>
                      <p style="margin: 5px 0">
                        💡 <strong>What to expect:</strong> A 100% async,
                        beginner-friendly experience
                      </p>
                    </td>
                  </tr>
                </table>

                <p>
                  Whether you're here to experiment with AI for the first time
                  or dive deep into custom Agent architectures, you're in the
                  right place.
                </p>

                <h2 style="color: #000000; margin-top: 30px">
                  Here's what to do next:
                </h2>

                <!-- Next Steps Box -->
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                  style="
                    background-color: #f8f9fa;
                    border-radius: 6px;
                    margin: 20px 0;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <p style="margin: 10px 0">
                        ✅ <strong>Join our Discord:</strong>
                        <a
                          href="https://discord.gg/MTUFh7Hjyx"
                          style="color: #0066cc"
                          >Join Now →</a
                        >
                      </p>
                      <p
                        style="
                          margin: 10px 0;
                          padding-left: 25px;
                          font-size: 16px;
                          color: #666;
                        "
                      >
                        That's where all the action, announcements, mentorship,
                        and networking will happen.
                      </p>

                      <p style="margin: 10px 0">
                        ✅ <strong>Say hi in the #introductions channel</strong>
                      </p>
                      <p
                        style="
                          margin: 10px 0;
                          padding-left: 25px;
                          font-size: 16px;
                          color: #666;
                        "
                      >
                        Let us know who you are and whether you're looking for a
                        team.
                      </p>

                      <p style="margin: 10px 0">
                        ✅ <strong>Check out the timeline</strong>
                      </p>
                      <p
                        style="
                          margin: 10px 0;
                          padding-left: 25px;
                          font-size: 16px;
                          color: #666;
                        "
                      >
                        You'll be able to work at your own pace. We'll release
                        materials before the Hack officially opens.
                      </p>
                    </td>
                  </tr>
                </table>

                <h3 style="color: #000000">🛠 Got questions?</h3>
                <p>Just ping us on Discord or reply to this email.</p>

                <p style="margin-top: 30px">
                  We can't wait to see what you'll build.<br />
                  Let's shape the future of AI—together.
                </p>

                <p style="margin-top: 30px; color: #666">
                  Best regards,<br />
                  The deco.chat Team
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  padding: 30px;
                  background-color: #f8f9fa;
                  text-align: center;
                "
              >
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  width="100%"
                >
                  <tr>
                    <td style="text-align: center; padding-bottom: 20px">
                      <a
                        href="https://deco.chat/"
                        style="
                          color: #666666;
                          text-decoration: none;
                          margin: 0 10px;
                        "
                        >Website</a
                      >
                      <span style="color: #666666">|</span>
                      <a
                        href="https://discord.gg/MTUFh7Hjyx"
                        style="
                          color: #666666;
                          text-decoration: none;
                          margin: 0 10px;
                        "
                        >Discord</a
                      >
                      <span style="color: #666666">|</span>
                      <a
                        href="mailto:hackathon@deco.cx"
                        style="
                          color: #666666;
                          text-decoration: none;
                          margin: 0 10px;
                        "
                        >Email us</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        text-align: center;
                        color: #666666;
                        font-size: 12px;
                      "
                    >
                      <p style="margin: 0">
                        © 2025 deco.chat. All rights reserved.
                      </p>
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
</html>`,
  });
}
