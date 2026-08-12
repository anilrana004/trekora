import {
  sendCorporateQuoteEmails,
  validateCorporateQuotePayload,
} from "../_lib/corporate-quote-mail.mjs";
import { smtpErrorMessage } from "../_lib/smtp-mail.mjs";

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid JSON body" });
  }

  const validated = validateCorporateQuotePayload(body);
  if (!validated.ok) {
    return res.status(400).json({ ok: false, error: validated.error });
  }

  try {
    await sendCorporateQuoteEmails(validated.data);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/corporate-quote]", err);
    return res.status(500).json({ ok: false, error: smtpErrorMessage(err) });
  }
}
