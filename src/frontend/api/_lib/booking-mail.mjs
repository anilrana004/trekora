import { adminInbox, escapeHtml, sendMail } from "./smtp-mail.mjs";

function formatInr(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "—";
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function formatDateLabel(value) {
  if (!value) return "—";
  const trimmed = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-").map(Number);
    const local = new Date(y, m - 1, d);
    if (!Number.isNaN(local.getTime())) {
      return local.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return String(value);
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function normalizeSections(body) {
  if (!Array.isArray(body?.sections)) return [];
  return body.sections
    .map((section) => {
      const title = String(section?.title ?? "").trim();
      const fields = Array.isArray(section?.fields)
        ? section.fields
            .map((f) => ({
              label: String(f?.label ?? "").trim(),
              value: String(f?.value ?? "").trim(),
            }))
            .filter((f) => f.label && f.value)
        : [];
      if (!title || fields.length === 0) return null;
      return { title, fields };
    })
    .filter(Boolean);
}

function sectionsPlainText(sections) {
  return sections
    .map((section) => {
      const lines = section.fields.map((f) => `${f.label}: ${f.value}`);
      return [`── ${section.title} ──`, ...lines].join("\n");
    })
    .join("\n\n");
}

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
const MAX_SINGLE_ATTACHMENT_BYTES = 5 * 1024 * 1024;

function normalizeAttachments(body) {
  if (!Array.isArray(body?.attachments)) return [];
  const out = [];
  let total = 0;
  for (const raw of body.attachments) {
    const filename = String(raw?.filename ?? "").trim();
    const contentType =
      String(raw?.contentType ?? "application/octet-stream").trim() ||
      "application/octet-stream";
    const contentBase64 = String(raw?.contentBase64 ?? "").trim();
    const label = String(raw?.label ?? filename).trim() || filename;
    const sizeBytes = Number(raw?.sizeBytes) || 0;
    if (!filename || !contentBase64) continue;
    const decodedLen = Math.floor((contentBase64.length * 3) / 4);
    if (decodedLen > MAX_SINGLE_ATTACHMENT_BYTES) continue;
    total += decodedLen;
    if (total > MAX_ATTACHMENT_BYTES) break;
    out.push({
      filename,
      contentType,
      label,
      sizeBytes: sizeBytes || decodedLen,
      contentBase64,
    });
  }
  return out;
}

function toNodemailerAttachments(attachments) {
  return attachments.map((a) => ({
    filename: a.filename,
    content: Buffer.from(a.contentBase64, "base64"),
    contentType: a.contentType,
  }));
}

function attachmentListText(attachments) {
  if (!attachments.length) return "None";
  return attachments
    .map((a) => `- ${a.label}: ${a.filename}`)
    .join("\n");
}

function sectionsHtml(sections) {
  if (sections.length === 0) return "";
  return sections
    .map(
      (section) => `
    <h3 style="margin:1.25rem 0 0.5rem;font-size:15px;color:#1a1a1a">${escapeHtml(section.title)}</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tbody>
        ${section.fields
          .map(
            (f) => `
        <tr>
          <td style="padding:6px 10px 6px 0;vertical-align:top;color:#555;width:38%;font-weight:600">${escapeHtml(f.label)}</td>
          <td style="padding:6px 0;vertical-align:top;color:#1a1a1a">${escapeHtml(f.value)}</td>
        </tr>`,
          )
          .join("")}
      </tbody>
    </table>`,
    )
    .join("");
}

export function validateBookingPayload(body) {
  const name = String(body?.travelerName ?? body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const trekName = String(body?.trekName ?? body?.itemName ?? "").trim();
  const batchDate = String(body?.batchDate ?? "").trim();

  if (!name) return { ok: false, error: "Traveler name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "A valid phone number is required." };
  }
  if (!trekName) return { ok: false, error: "Trek name is required." };
  if (!batchDate) return { ok: false, error: "Batch date is required." };

  return {
    ok: true,
    data: {
      bookingRef: String(body?.bookingRef ?? "").trim() || null,
      source: String(body?.source ?? "Website Booking").trim(),
      trekName,
      trekSlug: String(body?.trekSlug ?? "").trim() || null,
      batchDate,
      groupSize: Number(body?.groupSize) || 1,
      totalAmount: body?.totalAmount != null ? Number(body.totalAmount) : null,
      travelerName: name,
      email,
      phone,
      addOns: Array.isArray(body?.addOns)
        ? body.addOns.map(String)
        : body?.addOns
          ? [String(body.addOns)]
          : [],
      sections: normalizeSections(body),
      details: String(body?.details ?? "").trim() || null,
      attachments: normalizeAttachments(body),
    },
  };
}

export async function sendBookingEmails(data) {
  const adminTo = adminInbox();
  const ref = data.bookingRef || "Pending";
  const subject = `New Booking — ${data.trekName} — ${data.travelerName}`;
  const addOnLine =
    data.addOns.length > 0 ? data.addOns.join(", ") : "None selected";
  const formSections =
    data.sections?.length > 0 ? data.sections : [];
  const detailsBlock =
    formSections.length > 0
      ? sectionsPlainText(formSections)
      : data.details || "";
  const sectionsBlockHtml = sectionsHtml(formSections);
  const attachmentLines = attachmentListText(data.attachments);
  const mailAttachments = toNodemailerAttachments(data.attachments);
  const attachmentHtml =
    data.attachments.length > 0
      ? `<p style="margin-top:12px"><strong>Uploaded documents (${data.attachments.length})</strong> are attached to this email.</p><ul>${data.attachments.map((a) => `<li>${escapeHtml(a.label)}: ${escapeHtml(a.filename)}</li>`).join("")}</ul>`
      : "";

  const textLines = [
    `New booking request (${data.source})`,
    "",
    `Reference: ${ref}`,
    `Trek: ${data.trekName}`,
    data.trekSlug ? `Slug: ${data.trekSlug}` : null,
    `Batch date: ${formatDateLabel(data.batchDate)}`,
    `Group size: ${data.groupSize}`,
    data.totalAmount != null
      ? `Estimated total: ${formatInr(data.totalAmount)}`
      : null,
    "",
    `Lead traveler: ${data.travelerName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Add-ons: ${addOnLine}`,
    "",
    "Uploaded documents:",
    attachmentLines,
    detailsBlock ? ["", "Full booking form:", detailsBlock] : null,
  ]
    .flat()
    .filter(Boolean);

  const text = textLines.join("\n");

  const html = `
    <h2>${escapeHtml(data.source)}</h2>
    <p><strong>Reference:</strong> ${escapeHtml(ref)}</p>
    <p><strong>Trek:</strong> ${escapeHtml(data.trekName)}</p>
    <p><strong>Batch date:</strong> ${escapeHtml(formatDateLabel(data.batchDate))}</p>
    <p><strong>Group size:</strong> ${escapeHtml(String(data.groupSize))}</p>
    ${
      data.totalAmount != null
        ? `<p><strong>Estimated total:</strong> ${escapeHtml(formatInr(data.totalAmount))}</p>`
        : ""
    }
    <hr />
    <p><strong>Lead traveler:</strong> ${escapeHtml(data.travelerName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Add-ons:</strong> ${escapeHtml(addOnLine)}</p>
    ${
      sectionsBlockHtml ||
      (data.details
        ? `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(data.details)}</pre>`
        : "")
    }
    ${attachmentHtml}
  `;

  await sendMail({
    to: adminTo,
    subject:
      data.attachments.length > 0
        ? `${subject} [${data.attachments.length} doc${data.attachments.length > 1 ? "s" : ""}]`
        : subject,
    text,
    html,
    replyTo: data.email,
    attachments: mailAttachments,
  });

  const customerSubject = `Trekora booking received — ${ref}`;
  const customerText = [
    `Hi ${data.travelerName},`,
    "",
    "Thank you for your booking request with Trekora.",
    "",
    `Reference: ${ref}`,
    `Trek: ${data.trekName}`,
    `Batch date: ${formatDateLabel(data.batchDate)}`,
    `Group size: ${data.groupSize}`,
    data.totalAmount != null
      ? `Estimated total: ${formatInr(data.totalAmount)}`
      : null,
    detailsBlock ? ["", "Your submitted details:", detailsBlock] : null,
    "",
    "Our team will contact you within 2 hours to confirm your spot and share payment details.",
    "",
    "— Trekora",
    "query@trekora.in",
  ]
    .flat()
    .filter(Boolean)
    .join("\n");

  const customerSummaryHtml = sectionsBlockHtml
    ? `<p style="margin-top:1rem"><strong>Your submitted details:</strong></p>${sectionsBlockHtml}`
    : "";

  const customerHtml = `
    <p>Hi ${escapeHtml(data.travelerName)},</p>
    <p>Thank you for your booking request with <strong>Trekora</strong>.</p>
    <ul>
      <li><strong>Reference:</strong> ${escapeHtml(ref)}</li>
      <li><strong>Trek:</strong> ${escapeHtml(data.trekName)}</li>
      <li><strong>Batch date:</strong> ${escapeHtml(formatDateLabel(data.batchDate))}</li>
      <li><strong>Group size:</strong> ${escapeHtml(String(data.groupSize))}</li>
      ${
        data.totalAmount != null
          ? `<li><strong>Estimated total:</strong> ${escapeHtml(formatInr(data.totalAmount))}</li>`
          : ""
      }
    </ul>
    ${customerSummaryHtml}
    ${
      data.attachments.length > 0
        ? `<p>We received your <strong>${data.attachments.length}</strong> uploaded document(s) and will review them with your booking.</p>`
        : ""
    }
    <p>Our team will contact you within <strong>2 hours</strong> to confirm your spot and share payment details.</p>
    <p>— Trekora<br/><a href="mailto:query@trekora.in">query@trekora.in</a></p>
  `;

  await sendMail({
    to: data.email,
    subject: customerSubject,
    text: customerText,
    html: customerHtml,
  });
}
