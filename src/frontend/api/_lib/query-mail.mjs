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
  const source = String(body?.source ?? "Plan My Trek").trim();
  const formType = String(body?.formType ?? "").trim().toLowerCase();
  const pagePath = String(body?.pagePath ?? "").trim();

  const isLeadMagnet =
    formType === "lead_magnet" ||
    Boolean(body?.leadMagnet) ||
    /get free guide|free trek planning guide|newsletter|lead magnet/i.test(source) ||
    /free trek planning guide/i.test(destinationLabel);
  const isDestinationPlan =
    !isLeadMagnet &&
    (formType === "destination_plan" ||
      /plan your destination trip/i.test(source) ||
      Boolean(body?.phoneOptional && formType !== "yatra_plan"));
  const isYatraPlan =
    !isLeadMagnet &&
    !isDestinationPlan &&
    (formType === "yatra_plan" || /plan your pilgrimage/i.test(source));
  const isSendQuery =
    !isLeadMagnet &&
    !isDestinationPlan &&
    !isYatraPlan &&
    (formType === "send_query" ||
      formType === "contact" ||
      /send query|contact page|enquiry modal/i.test(source));
  const preferredDates = String(body?.preferredDates ?? "").trim();

  if (isSendQuery && !message) {
    return { ok: false, error: "Please write a message." };
  }

  if (!isDestinationPlan && !isLeadMagnet) {
    if (phoneCountry === "IN" && phone.length !== 10) {
      return { ok: false, error: "Enter a valid 10-digit mobile number." };
    }
    if (phoneCountry !== "IN" && (phone.length < 7 || phone.length > 15)) {
      return { ok: false, error: "Enter a valid phone number." };
    }
  }

  const phoneDisplay =
    phone.length === 0
      ? "Not provided"
      : phoneCountry === "IN"
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
      preferredDates,
      message,
      source,
      formType,
      pagePath,
      isSendQuery,
      isDestinationPlan,
      isYatraPlan,
      isLeadMagnet,
    },
  };
}

export async function sendPlanTrekEmails(data) {
  const adminTo = adminInbox();
  const subject = data.isLeadMagnet
    ? `Free Trek Planning Guide — ${data.email}`
    : data.isDestinationPlan
      ? `Destination Trip Plan — ${data.name} — ${data.destinationLabel}`
      : data.isYatraPlan
        ? `Yatra / Pilgrimage Plan — ${data.name} — ${data.destinationLabel}`
        : data.isSendQuery
          ? `Trek Query — ${data.name} — ${data.destinationLabel}`
          : `Plan My Trek — ${data.name}${data.destinationLabel !== "Not specified" ? ` — ${data.destinationLabel}` : ""}`;

  const inquiryLabel = data.isLeadMagnet
    ? "Free Trek Planning Guide"
    : data.isDestinationPlan
      ? "Destination Trip Plan"
      : data.isYatraPlan
        ? "Yatra / Pilgrimage Plan"
        : data.isSendQuery
          ? "Send Query"
          : "Plan My Trek";

  const text = [
    `New ${inquiryLabel} inquiry (${data.source})`,
    data.pagePath ? `Page: ${data.pagePath}` : null,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Mobile: ${data.phoneDisplay}`,
    `Destination: ${data.destinationLabel}`,
    data.preferredDates ? `Preferred travel dates: ${data.preferredDates}` : null,
    data.destination ? `Slug: ${data.destination}` : null,
    data.message ? ["", "Message / requirements:", data.message] : null,
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2 style="font-family:system-ui,sans-serif;color:#111">${escapeHtml(inquiryLabel)} inquiry</h2>
    <p style="font-family:system-ui,sans-serif;color:#444;font-size:14px">${escapeHtml(data.source)}</p>
    ${
      data.pagePath
        ? `<p style="font-family:system-ui,sans-serif;color:#666;font-size:13px">Page: ${escapeHtml(data.pagePath)}</p>`
        : ""
    }
    <table cellpadding="0" cellspacing="0" style="font-family:system-ui,sans-serif;font-size:14px;color:#222;margin-top:12px">
      <tr><td style="padding:6px 12px 6px 0;color:#666">Name</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Mobile</td><td>${escapeHtml(data.phoneDisplay)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#666">Destination</td><td>${escapeHtml(data.destinationLabel)}</td></tr>
      ${
        data.preferredDates
          ? `<tr><td style="padding:6px 12px 6px 0;color:#666">Travel dates</td><td>${escapeHtml(data.preferredDates)}</td></tr>`
          : ""
      }
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

  const customerSubject = data.isLeadMagnet
    ? "Your free Trek Planning Guide — Trekora"
    : data.isDestinationPlan
      ? "We received your destination trip plan — Trekora"
      : data.isYatraPlan
        ? "We received your pilgrimage plan — Trekora"
        : data.isSendQuery
          ? `We received your query — Trekora`
          : "We received your trek planning request — Trekora";

  const requestLine = data.isLeadMagnet
    ? "your request for the free Trek Planning Guide (PDF)"
    : data.isDestinationPlan
      ? `your destination trip plan for ${data.destinationLabel}`
      : data.isYatraPlan
        ? `your pilgrimage plan for ${data.destinationLabel}`
        : data.isSendQuery
          ? `your query about ${data.destinationLabel}`
          : "your Plan My Trek request";

  const customerText = [
    `Hi ${data.name},`,
    "",
    "Thank you for reaching out to Trekora.",
    "",
    `We received ${requestLine}.`,
    "",
    data.isLeadMagnet
      ? "We will email your PDF guide shortly. You will also receive trek tips and batch updates from Trekora."
      : data.isYatraPlan
        ? "Our yatra specialist will contact you within 1 hour (Mon–Sat, 9AM–9PM IST)."
        : "Our Himalayan trek expert will contact you within 1 hour (Mon–Sat, 9AM–9PM IST).",
    data.isDestinationPlan && data.preferredDates
      ? `Preferred travel dates: ${data.preferredDates}`
      : null,
    data.destinationLabel !== "Not specified" &&
    !data.isSendQuery &&
    !data.isDestinationPlan &&
    !data.isYatraPlan &&
    !data.isLeadMagnet
      ? `Destination interest: ${data.destinationLabel}`
      : (data.isDestinationPlan || data.isYatraPlan) &&
          data.destinationLabel !== "Not specified"
        ? `${data.isYatraPlan ? "Yatra" : "Destination"}: ${data.destinationLabel}`
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
    <p>Thank you for ${
      data.isLeadMagnet
        ? "requesting the <strong>free Trek Planning Guide (PDF)</strong>"
        : data.isDestinationPlan
          ? `your <strong>destination trip plan</strong> for <strong>${escapeHtml(data.destinationLabel)}</strong>`
          : data.isYatraPlan
            ? `your <strong>pilgrimage plan</strong> for <strong>${escapeHtml(data.destinationLabel)}</strong>`
            : data.isSendQuery
              ? `your query about <strong>${escapeHtml(data.destinationLabel)}</strong>`
              : "your <strong>Plan My Trek</strong> request"
    } with Trekora.</p>
    ${
      data.isLeadMagnet
        ? "<p>Check your inbox shortly for the guide link. Our team may also share personalised trek suggestions for Uttarakhand &amp; Himachal.</p>"
        : ""
    }
    ${
      data.isDestinationPlan && data.preferredDates
        ? `<p>Preferred travel dates: <strong>${escapeHtml(data.preferredDates)}</strong></p>`
        : ""
    }
    ${
      data.isLeadMagnet
        ? ""
        : "<p>Our expert will contact you within <strong>1 hour</strong> (Mon–Sat, 9AM–9PM IST).</p>"
    }
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
