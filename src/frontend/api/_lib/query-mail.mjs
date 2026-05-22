import { normalizeIndianPhoneDigits } from "./indian-phone.mjs";
import { adminInbox, escapeHtml, sendMail } from "./smtp-mail.mjs";

export function validateQueryPayload(body) {
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phoneCountry = String(body?.phoneCountry ?? "IN").trim().toUpperCase() || "IN";
  const phoneRaw = String(body?.phone ?? "").replace(/\D/g, "");
  const phone =
    phoneCountry === "IN"
      ? normalizeIndianPhoneDigits(phoneRaw)
      : phoneRaw;
  const destination = String(body?.destination ?? "").trim();
  const destinationLabel =
    String(body?.destinationLabel ?? "").trim() || destination || "Not specified";
  const message = String(body?.message ?? "").trim();

  if (name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (phoneCountry === "IN" && phone.length !== 10) {
    return { ok: false, error: "Enter a valid 10-digit mobile number." };
  }
  if (phoneCountry !== "IN" && (phone.length < 7 || phone.length > 15)) {
    return { ok: false, error: "Enter a valid phone number." };
  }

  const source = String(body?.source ?? "Plan My Trek").trim();
  const isSendQuery = /send query|contact page|enquiry modal/i.test(source);

  if (isSendQuery && !message) {
    return { ok: false, error: "Please write a message." };
  }

  const phoneDisplay =
    phoneCountry === "IN"
      ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
      : `+${phone}`;

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      phoneDisplay,
      destination,
      destinationLabel,
      message,
      source,
      isSendQuery,
    },
  };
}

export async function sendPlanTrekEmails(data) {
  const adminTo = adminInbox();
  const subject = data.isSendQuery
    ? `Trek Query — ${data.name} — ${data.destinationLabel}`
    : `Plan My Trek — ${data.name}${data.destinationLabel !== "Not specified" ? ` — ${data.destinationLabel}` : ""}`;

  const inquiryLabel = data.isSendQuery ? "Send Query" : "Plan My Trek";

  const text = [
    `New ${inquiryLabel} inquiry (${data.source})`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.phoneDisplay}`,
    `Destination: ${data.destinationLabel}`,
    data.destination ? `Slug: ${data.destination}` : null,
    data.message ? ["", "Message / requirements:", data.message] : null,
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#111">${escapeHtml(inquiryLabel)} inquiry</h2>
    <p style="font-family:system-ui,sans-serif;color:#444;font-size:14px">${escapeHtml(data.source)}</p>
    <table cellpadding="0" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;color:#222;margin-top:12px">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Name</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Mobile</td><td>${escapeHtml(data.phoneDisplay)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Destination</td><td>${escapeHtml(data.destinationLabel)}</td></tr>
    </table>
    ${
      data.message
        ? `<p style="font-family:system-ui,sans-serif;margin-top:16px"><strong>Message</strong></p><pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;font-size:13px">${escapeHtml(data.message)}</pre>`
        : ""
    }
  `;

  await sendMail({
    to: adminTo,
    subject,
    text,
    html,
    replyTo: data.email,
  });

  const customerSubject = data.isSendQuery
    ? `We received your query — Trekora`
    : "We received your trek planning request — Trekora";

  const requestLine = data.isSendQuery
    ? `your query about ${data.destinationLabel}`
    : "your Plan My Trek request";

  const customerText = [
    `Hi ${data.name},`,
    "",
    "Thank you for reaching out to Trekora.",
    "",
    `We received ${requestLine}.`,
    "",
    "Our Himalayan trek expert will contact you within 1 hour (Mon–Sat, 9AM–9PM IST).",
    data.destinationLabel !== "Not specified" && !data.isSendQuery
      ? `Destination interest: ${data.destinationLabel}`
      : null,
    data.isSendQuery && data.message
      ? ["", "Your message:", data.message]
      : null,
    "",
    "— Trekora",
    "query@trekora.in",
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const customerHtml = `
    <p>Hi ${escapeHtml(data.name)},</p>
    <p>Thank you for ${data.isSendQuery ? `your query about <strong>${escapeHtml(data.destinationLabel)}</strong>` : "your <strong>Plan My Trek</strong> request"} with Trekora.</p>
    <p>Our expert will contact you within <strong>1 hour</strong> (Mon–Sat, 9AM–9PM IST).</p>
    ${
      data.message
        ? `<p style="margin-top:12px"><strong>Your message</strong></p><pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;font-size:13px">${escapeHtml(data.message)}</pre>`
        : ""
    }
    <p>— Trekora<br/><a href="mailto:query@trekora.in">query@trekora.in</a></p>
  `;

  await sendMail({
    to: data.email,
    subject: customerSubject,
    text: customerText,
    html: customerHtml,
  });
}
