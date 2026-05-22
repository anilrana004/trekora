import nodemailer from "nodemailer";

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === undefined
      ? port === 465
      : process.env.SMTP_SECURE !== "false";
  return {
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized:
        process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
    },
  };
}

export function adminInbox() {
  return (
    process.env.ADMIN_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "query@trekora.in"
  );
}

export async function sendMail({
  to,
  subject,
  text,
  html,
  replyTo,
  attachments,
}) {
  const transporter = nodemailer.createTransport(smtpConfig());
  const from = process.env.SMTP_FROM?.trim() || process.env.SMTP_USER?.trim();
  await transporter.sendMail({
    from: from.includes("<") ? from : `Trekora <${from}>`,
    to,
    subject,
    text,
    html,
    replyTo: replyTo || undefined,
    attachments: attachments?.length ? attachments : undefined,
  });
}

export function smtpErrorMessage(err) {
  const code = err?.code || "";
  const response = String(err?.response || err?.message || "");
  if (
    code === "EAUTH" ||
    /535|authentication|invalid login|username and password/i.test(response)
  ) {
    return "Email could not be sent — SMTP login failed. Check SMTP_USER and SMTP_PASS in src/.env.";
  }
  if (/SMTP is not configured/i.test(response)) {
    return response;
  }
  return "Email could not be sent. Please try again or contact us on WhatsApp.";
}
