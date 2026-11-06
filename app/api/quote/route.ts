import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  BUSINESS_TYPES,
  LOCATION_BANDS,
  WORKFLOWS,
  buildQuote,
  usd,
  type Quote,
} from "@/lib/revops-pricing";
import { REVOPS_URL } from "@/lib/revops-host";

// Sends from Koshin's Gmail over SMTP. Needs GMAIL_USER and GMAIL_APP_PASSWORD
// (a 16-character app password, which requires 2-step verification on the account).
const GMAIL_USER = process.env.GMAIL_USER?.trim();
// Google shows app passwords in 4-letter groups; drop the spaces if they were pasted.
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

const transporter =
  GMAIL_USER && GMAIL_APP_PASSWORD
    ? nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
      })
    : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 60;
const MAX_BUSINESS_LEN = 80;
const MAX_EMAIL_LEN = 254;
const MAX_WEBSITE_LEN = 200;
const MAX_NOTES_LEN = 2000;

// Same best-effort limiter as /api/contact, tighter because every request
// sends a message to an outside address from a personal Gmail account.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

// Strips characters that could be used to inject extra email headers.
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, " ").trim();
}

// Name and business go into the email sent to the visitor's address, so links
// are stripped to keep the form from being used to mail spam to strangers.
function stripLinks(value: string): string {
  return value
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/www\.\S+/gi, "")
    .replace(/\S+\.(com|net|org|io|co|ru|xyz|info|biz|app|me|link|top|site)\b\S*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function quoteTable(quote: Quote): string {
  const width = 38;
  const row = (label: string, value: string) =>
    `  ${label.padEnd(width, " ")}${value.padStart(10, " ")}`;

  const rows = quote.lines.map((l) => row(l.name, usd(l.price)));
  if (quote.discount) rows.push(row("Bundle discount (10%)", `-${usd(quote.discount)}`));
  rows.push(row("Total", usd(quote.total)));
  if (quote.care) rows.push(row("Monthly care (optional)", `${usd(quote.care)}/mo`));
  return rows.join("\n");
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, business, website, notes, businessType, locations, workflowIds, care, company } =
    (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field people never see. Bots fill it; pretend it worked.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof business !== "string" ||
    typeof locations !== "string" ||
    !Array.isArray(workflowIds)
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const trimmedEmail = email.trim();
  const safeName = stripLinks(sanitizeHeaderValue(name));
  const safeBusiness = stripLinks(sanitizeHeaderValue(business));
  const trimmedWebsite = typeof website === "string" ? website.trim() : "";
  const trimmedNotes = typeof notes === "string" ? notes.trim() : "";

  if (!safeName || !trimmedEmail || !safeBusiness) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (
    safeName.length > MAX_NAME_LEN ||
    safeBusiness.length > MAX_BUSINESS_LEN ||
    trimmedEmail.length > MAX_EMAIL_LEN ||
    trimmedWebsite.length > MAX_WEBSITE_LEN ||
    trimmedNotes.length > MAX_NOTES_LEN
  ) {
    return NextResponse.json({ error: "One or more fields are too long" }, { status: 400 });
  }

  if (!EMAIL_RE.test(trimmedEmail)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Business type is optional in the form.
  const typeLabel = BUSINESS_TYPES.find((t) => t.id === businessType)?.label ?? "(not given)";
  const locationLabel = LOCATION_BANDS.find((b) => b.id === locations)?.label;
  const validIds = workflowIds.filter(
    (id): id is string => typeof id === "string" && WORKFLOWS.some((w) => w.id === id),
  );

  if (!locationLabel || validIds.length === 0) {
    return NextResponse.json({ error: "Pick at least one workflow" }, { status: 400 });
  }

  if (!transporter || !GMAIL_USER) {
    console.error("Quote email skipped: GMAIL_USER or GMAIL_APP_PASSWORD is not set");
    return NextResponse.json({ error: "Email isn't set up yet" }, { status: 500 });
  }

  const quote = buildQuote({ workflowIds: validIds, locations, care: care === true });
  const safeEmail = sanitizeHeaderValue(trimmedEmail);
  const firstName = safeName.split(" ")[0];
  const table = quoteTable(quote);

  const visitorText = [
    `Hi ${firstName},`,
    "",
    `Thanks for building a quote on kbathmax.com. Here's what you picked for ${safeBusiness} (${locationLabel.toLowerCase()}):`,
    "",
    table,
    "",
    `Timeline: about ${quote.weeks} ${quote.weeks === 1 ? "week" : "weeks"} from kickoff.`,
    "",
    "This is an estimate. I confirm the final price after a free 20-minute call, where we go through your booking flow and the tools each workflow has to connect to. If the price changes, I'll tell you why before you pay anything.",
    "",
    "Reply with 2 or 3 times that work for you this week and I'll send an invite.",
    "",
    "Koshin",
    REVOPS_URL.replace("https://", ""),
  ].join("\n");

  const ownerText = [
    `New quote request from ${safeName} <${safeEmail}>`,
    "",
    `Business: ${safeBusiness}`,
    `Type: ${typeLabel}`,
    `Locations: ${locationLabel}`,
    `Website: ${trimmedWebsite || "(none)"}`,
    "",
    table,
    "",
    `Timeline: about ${quote.weeks} weeks`,
    "",
    "Notes:",
    trimmedNotes || "(none)",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `Koshin Bathmax <${GMAIL_USER}>`,
      to: safeEmail,
      replyTo: GMAIL_USER,
      subject: `Your quote for ${safeBusiness}: ${usd(quote.total)}`,
      text: visitorText,
    });

    await transporter.sendMail({
      from: `kbathmax.com quotes <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: safeEmail,
      subject: `Quote request: ${safeBusiness}, ${usd(quote.total)}`,
      text: ownerText,
    });
  } catch (err) {
    console.error("Quote email failed", err);
    return NextResponse.json({ error: "Failed to send quote" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, total: quote.total });
}
