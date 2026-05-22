import { normalizeIndianPhoneDigits } from "./indian-phone.mjs";
import { adminInbox, escapeHtml, sendMail } from "./smtp-mail.mjs";

const ORG_LABELS = {
  corporate: "Corporate",
  school: "School",
  college: "College",
};

export function validateCorporateQuotePayload(body) {
  const orgType = String(body?.orgType ?? "corporate").trim().toLowerCase();
  const orgLabel =
    ORG_LABELS[orgType] ?? ORG_LABELS.corporate;

  const company = String(body?.company ?? "").trim();
  const contactName = String(body?.contactName ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phoneCountry =
    String(body?.phoneCountry ?? "IN").trim().toUpperCase() || "IN";
  const phoneRaw = String(body?.phone ?? "").replace(/\D/g, "");
  const phone =
    phoneCountry === "IN"
      ? normalizeIndianPhoneDigits(phoneRaw)
      : phoneRaw;

  const groupSize = String(body?.groupSize ?? "").trim() || "Not specified";
  const budget = String(body?.budget ?? "").trim() || "Not specified";
  const preferredDates =
    String(body?.preferredDates ?? "").trim() || "Not specified";
  const requirements = String(body?.requirements ?? "").trim();

  if (!company) {
    return { ok: false, error: "Please enter your organization name." };
  }
  if (contactName.length < 2) {
    return { ok: false, error: "Please enter a contact name." };
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

  const phoneDisplay =
    phoneCountry === "IN"
      ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
      : `+${phone}`;

  return {
    ok: true,
    data: {
      orgType,
      orgLabel,
      company,
      contactName,
      email,
      phone,
      phoneDisplay,
      groupSize,
      budget,
      preferredDates,
      requirements,
      pagePath: String(body?.pagePath ?? "/corporate").trim(),
    },
  };
}

export async function sendCorporateQuoteEmails(data) {
  const adminTo = adminInbox();
  const subject = `Custom Quote — ${data.company} (${data.orgLabel})`;

  const text = [
    `New custom quote request — ${data.orgLabel}`,
    "",
    `Organization: ${data.company}`,
    `Contact: ${data.contactName}`,
    `Email: ${data.email}`,
    `Mobile: ${data.phoneDisplay}`,
    `Group size: ${data.groupSize}`,
    `Budget per person: ${data.budget}`,
    `Preferred month: ${data.preferredDates}`,
    `Page: ${data.pagePath}`,
    data.requirements
      ? ["", "Trip goals & requirements:", data.requirements]
      : null,
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#111">Custom itinerary quote request</h2>
    <p style="font-family:system-ui,sans-serif;color:#444;font-size:14px">${escapeHtml(data.orgLabel)} · Get a Custom Quote</p>
    <table cellpadding="0" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;color:#222;margin-top:12px">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Organization</td><td><strong>${escapeHtml(data.company)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Contact</td><td>${escapeHtml(data.contactName)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Mobile</td><td>${escapeHtml(data.phoneDisplay)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Group size</td><td>${escapeHtml(data.groupSize)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Budget / person</td><td>${escapeHtml(data.budget)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Preferred month</td><td>${escapeHtml(data.preferredDates)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Page</td><td>${escapeHtml(data.pagePath)}</td></tr>
    </table>
    ${
      data.requirements
        ? `<p style="font-family:system-ui,sans-serif;margin-top:16px"><strong>Trip goals &amp; requirements</strong></p><pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;font-size:13px">${escapeHtml(data.requirements)}</pre>`
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

  const customerSubject = "We received your custom quote request — Trekora";
  const customerText = [
    `Hi ${data.contactName},`,
    "",
    "Thank you for your custom itinerary quote request with Trekora.",
    "",
    `Organization type: ${data.orgLabel}`,
    `Organization: ${data.company}`,
    "",
    "Our team will send a tailored quote within 4 hours (Mon–Sat, 9AM–9PM IST).",
    data.requirements ? ["", "Your requirements:", data.requirements] : null,
    "",
    "— Trekora",
    "query@trekora.in",
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const customerHtml = `
    <p>Hi ${escapeHtml(data.contactName)},</p>
    <p>Thank you for requesting a <strong>custom quote</strong> with Trekora.</p>
    <p>We received your ${escapeHtml(data.orgLabel.toLowerCase())} enquiry for <strong>${escapeHtml(data.company)}</strong>.</p>
    <p>Our team will share a tailored itinerary and quote within <strong>4 hours</strong> (Mon–Sat, 9AM–9PM IST).</p>
    ${
      data.requirements
        ? `<p style="margin-top:12px"><strong>Your requirements</strong></p><pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px;font-size:13px">${escapeHtml(data.requirements)}</pre>`
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
