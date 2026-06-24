import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function buildEmailHtml(name: string, email: string, message: string): string {
  const now = new Date().toUTCString();
  const escaped = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Message — wikidotexe</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border:2px solid #1C1C1C;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1C1C1C;padding:32px 36px;">
              <p style="margin:0 0 4px;color:#FAFAFA;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.6;">/home/contact</p>
              <h1 style="margin:0;color:#FAFAFA;font-size:28px;font-weight:700;letter-spacing:-0.03em;line-height:1.1;">
                New Message<br/>
                <span style="font-style:italic;color:transparent;-webkit-text-stroke:1px #FAFAFA;">Incoming</span>.
              </h1>
            </td>
          </tr>

          <!-- META STRIP -->
          <tr>
            <td style="border-top:2px solid #1C1C1C;border-bottom:2px solid #1C1C1C;padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:14px 36px;border-right:2px solid #1C1C1C;width:50%;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B6B;">FROM</p>
                    <p style="margin:0;font-size:14px;color:#1C1C1C;font-weight:700;">${name}</p>
                  </td>
                  <td style="padding:14px 36px;width:50%;vertical-align:top;">
                    <p style="margin:0 0 2px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B6B;">RECEIVED</p>
                    <p style="margin:0;font-size:14px;color:#1C1C1C;font-weight:700;">${now}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="border-top:2px solid #1C1C1C;padding:14px 36px;">
                    <p style="margin:0 0 2px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B6B;">REPLY-TO</p>
                    <a href="mailto:${email}" style="margin:0;font-size:14px;color:#1C1C1C;font-weight:700;text-decoration:underline;">${email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE BODY -->
          <tr>
            <td style="padding:36px;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#6B6B6B;">MESSAGE</p>
              <div style="border-left:3px solid #1C1C1C;padding:16px 20px;background:#F0F0F0;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#1C1C1C;">${escaped}</p>
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 36px 36px;">
              <a href="mailto:${email}"
                style="display:inline-block;background:#1C1C1C;color:#FAFAFA;padding:14px 28px;font-size:14px;font-weight:700;text-decoration:none;border:2px solid #1C1C1C;letter-spacing:0.04em;">
                Reply to ${name} →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="border-top:2px solid #1C1C1C;padding:20px 36px;background:#1C1C1C;">
              <p style="margin:0;font-size:11px;color:#FAFAFA;opacity:0.5;letter-spacing:0.1em;">
                wikidotexe · about.wikiarlianm.com · This message was sent via the portfolio contact form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"wikidotexe" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] New message from ${name}`,
    text: `From: ${name} <${email}>\nReceived: ${new Date().toUTCString()}\n\n${message}`,
    html: buildEmailHtml(name, email, message),
  });

  return NextResponse.json({ ok: true });
}
