// Pricing for the /revops page. The quote builder and /api/quote both read
// from here, so the server recomputes every quote instead of trusting the
// numbers a browser sends.

export type Tier = {
  id: string;
  name: string;
  price: string;
  cadence?: string;
  line: string;
  includes: string[];
  featured?: boolean;
};

export const TIERS: Tier[] = [
  {
    id: "call",
    name: "Discovery call",
    price: "Free",
    line: "20 minutes on a call going through your week to discuss what manual tasks AI can take over.",
    includes: [
      "We look at your bookings and inbox together",
      "Within 48 hours, a written list of possible fixes, with a price for each",
    ],
  },
  {
    id: "first-fix",
    name: "First fix",
    price: "From $800",
    line: "One workflow, built and handed over in about 2 weeks.",
    includes: [
      "One workflow from the list below",
      "Connected to the tools you use",
      "A short video showing your team how it works",
      "30 days of fixes after launch",
    ],
    featured: true,
  },
  {
    id: "system",
    name: "Revenue system",
    price: "From $3,000",
    line: "Inquiry to booking to repeat visit, as one system.",
    includes: [
      "3 or more workflows that pass leads between each other",
      "A weekly report on inquiries, bookings, no-shows and revenue",
      "10% off the combined workflow price",
      "60 days of fixes after launch",
    ],
  },
  {
    id: "care",
    name: "Monthly care",
    price: "$450",
    cadence: "/mo",
    line: "I keep everything running. Cancel any month.",
    includes: [
      "Monitoring and fixes when a tool changes",
      "3 small additions per month",
    ],
  },
];

export type Workflow = {
  id: string;
  name: string;
  line: string;
  price: number;
  weeks: number;
};

export const WORKFLOWS: Workflow[] = [
  {
    id: "inquiry-replies",
    name: "Inquiry and FAQ replies",
    line: "Answers the questions your inbox gets every day, and hands the rest to staff.",
    price: 1200,
    weeks: 2,
  },
  {
    id: "booking-followups",
    name: "Booking follow-ups and reminders",
    line: "Chases unfinished bookings and sends reminders so fewer people no-show.",
    price: 1000,
    weeks: 1.5,
  },
  {
    id: "lead-pipeline",
    name: "Lead pipeline",
    line: "Every form, call, email and DM lands in one list with a status and an owner.",
    price: 1500,
    weeks: 2,
  },
  {
    id: "review-requests",
    name: "Review requests",
    line: "Asks happy customers for a Google review a day after their visit.",
    price: 600,
    weeks: 1,
  },
  {
    id: "rebooking",
    name: "Rebooking and win-back emails",
    line: "Brings back people who haven't booked in a while, with an offer you pick.",
    price: 900,
    weeks: 1.5,
  },
  {
    id: "intake-forms",
    name: "Intake forms and staff handoff",
    line: "Collects waivers and intake details before the visit and sends them to the right person.",
    price: 800,
    weeks: 1,
  },
  {
    id: "revenue-report",
    name: "Weekly revenue report",
    line: "A Monday email with inquiries, bookings, no-shows and revenue by week.",
    price: 1200,
    weeks: 1.5,
  },
];

export type BusinessType = { id: string; label: string };

export const BUSINESS_TYPES: BusinessType[] = [
  { id: "ski", label: "Ski or winter tourism" },
  { id: "fitness", label: "Gym or studio" },
  { id: "medspa", label: "Med spa" },
  { id: "other", label: "Something else" },
];

export type LocationBand = { id: string; label: string; multiplier: number };

export const LOCATION_BANDS: LocationBand[] = [
  { id: "1", label: "1 location", multiplier: 1 },
  { id: "2-3", label: "2 to 3", multiplier: 1.2 },
  { id: "4+", label: "4 or more", multiplier: 1.4 },
];

export const CARE_PRICE = 450;
export const BUNDLE_MIN = 3;
export const BUNDLE_DISCOUNT = 0.1;

export type QuoteInput = {
  workflowIds: string[];
  locations: string;
  care: boolean;
};

export type Quote = {
  lines: { name: string; price: number }[];
  subtotal: number;
  multiplier: number;
  discount: number;
  total: number;
  care: number;
  weeks: number;
};

const roundTo50 = (n: number) => Math.round(n / 50) * 50;

export function buildQuote({ workflowIds, locations, care }: QuoteInput): Quote {
  const picked = WORKFLOWS.filter((w) => workflowIds.includes(w.id));
  const multiplier = LOCATION_BANDS.find((b) => b.id === locations)?.multiplier ?? 1;

  const lines = picked.map((w) => ({ name: w.name, price: roundTo50(w.price * multiplier) }));
  const subtotal = lines.reduce((sum, l) => sum + l.price, 0);
  const discount = picked.length >= BUNDLE_MIN ? roundTo50(subtotal * BUNDLE_DISCOUNT) : 0;

  // Workflows overlap in setup, so each one after the first adds 60% of its time.
  const sorted = [...picked].sort((a, b) => b.weeks - a.weeks);
  const weeks = sorted.reduce((sum, w, i) => sum + (i === 0 ? w.weeks : w.weeks * 0.6), 0);

  return {
    lines,
    subtotal,
    multiplier,
    discount,
    total: subtotal - discount,
    care: care ? CARE_PRICE : 0,
    weeks: Math.ceil(weeks),
  };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
