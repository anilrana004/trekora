import { parseIndianMobile } from "./indian-phone.mjs";
import { adminInbox, escapeHtml, sendMail } from "./smtp-mail.mjs";

function formatInPhone(digits) {
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function validateCallbackPayload(body) {
  const phoneDigits = parseIndianMobile(body?.phone);
  if (!phoneDigits) {
    return {
      ok: false,
      error: "Enter a valid 10-digit Indian mobile number.",
    };
  }

  const preferredTime = String(body?.preferredTime ?? "").trim();
  const source = String(body?.source ?? "Callback request").trim();
  const pagePath = String(body?.pagePath ?? "").trim();

  return {
    ok: true,
    data: {
      phone: phoneDigits,
      phoneDisplay: formatInPhone(phoneDigits),
      preferredTime: preferredTime || "Not specified",
      source,
      pagePath: pagePath || "—",
    },
  };
}

export async function sendCallbackEmail(data) {
  const adminTo = adminInbox();
  const subject = `Callback request — ${data.phoneDisplay}`;

  const text = [
    "New callback request (Call Me Back)",
    "",
    `Phone: ${data.phoneDisplay}`,
    `Preferred time: ${data.preferredTime}`,
    `Source: ${data.source}`,
    `Page: ${data.pagePath}`,
    "",
    "Please call the customer within 1 hour (9AM–9PM IST).",
  ].join("\n");

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#111">Callback request</h2>
    <p style="font-family:system-ui,sans-serif;color:#444;font-size:14px">${escapeHtml(data.source)}</p>
    <table cellpadding="0" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;color:#222;margin-top:12px">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Phone</td><td><strong><a href="tel:+91${escapeHtml(data.phone)}">${escapeHtml(data.phoneDisplay)}</a></strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Preferred time</td><td>${escapeHtml(data.preferredTime)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Page</td><td>${escapeHtml(data.pagePath)}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;margin-top:16px;font-size:13px;color:#666">Call within 1 hour (9AM–9PM IST).</p>
  `;

  await sendMail({
    to: adminTo,
    subject,
    text,
    html,
  });
}
