import type { Offer, Segment, Slice } from "./types";

// Parse an ISO 8601 duration like "PT7H55M" into total minutes.
export function isoDurationToMinutes(iso: string | null): number | null {
  if (!iso) return null;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return null;
  const hours = m[1] ? parseInt(m[1], 10) : 0;
  const mins = m[2] ? parseInt(m[2], 10) : 0;
  return hours * 60 + mins;
}

export function formatMinutes(total: number | null): string {
  if (total == null) return "unknown";
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function localTime(iso: string, timeZone: string | null): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
      ...(timeZone ? { timeZone } : {}),
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function carrier(seg: Segment): string {
  const code = seg.marketing_carrier.iata_code ?? "??";
  return `${seg.marketing_carrier.name} ${code}${seg.marketing_carrier_flight_number}`;
}

export function summarizeSlice(slice: Slice): string {
  const first = slice.segments[0];
  const last = slice.segments[slice.segments.length - 1];
  const stops = slice.segments.length - 1;
  const stopLabel =
    stops === 0
      ? "nonstop"
      : `${stops} stop${stops > 1 ? "s" : ""} (${slice.segments
          .slice(0, -1)
          .map((s) => s.destination.iata_code)
          .join(", ")})`;

  const legs = slice.segments
    .map((s) => {
      const dep = `${s.origin.iata_code} ${localTime(s.departing_at, s.origin.time_zone)}`;
      const arr = `${s.destination.iata_code} ${localTime(s.arriving_at, s.destination.time_zone)}`;
      return `    ${carrier(s)}: ${dep} -> ${arr} (${formatMinutes(isoDurationToMinutes(s.duration))})`;
    })
    .join("\n");

  return [
    `  ${first.origin.iata_code} -> ${last.destination.iata_code} | ${stopLabel} | ${formatMinutes(isoDurationToMinutes(slice.duration))} total`,
    legs,
  ].join("\n");
}

function conditionLine(offer: Offer): string {
  const c = offer.conditions;
  if (!c) return "  Fare conditions: not provided by airline.";
  const fmt = (
    label: string,
    cond: { allowed: boolean; penalty_amount: string | null; penalty_currency: string | null } | null,
  ) => {
    if (!cond) return `${label}: unknown`;
    if (!cond.allowed) return `${label}: not allowed`;
    if (cond.penalty_amount)
      return `${label}: allowed (penalty ${cond.penalty_amount} ${cond.penalty_currency})`;
    return `${label}: allowed, no penalty`;
  };
  return `  ${fmt("Refund", c.refund_before_departure)} | ${fmt("Change", c.change_before_departure)}`;
}

export interface OfferDigest {
  id: string;
  airline: string;
  price: string;
  stops: number;
  durationMinutes: number | null;
  departsAt: string;
  arrivesAt: string;
}

// Compact one-liner data for ranking/listing search results.
export function offerDigest(offer: Offer): OfferDigest {
  const slice = offer.slices[0];
  const last = slice.segments[slice.segments.length - 1];
  return {
    id: offer.id,
    airline: offer.owner.name,
    price: `${offer.total_amount} ${offer.total_currency}`,
    stops: slice.segments.length - 1,
    durationMinutes: isoDurationToMinutes(slice.duration),
    departsAt: slice.segments[0].departing_at,
    arrivesAt: last.arriving_at,
  };
}

// Full human-readable breakdown of a single offer for the "talk you through it"
// step and the final confirmation summary.
export function summarizeOffer(offer: Offer): string {
  const expiry = new Date(offer.expires_at);
  const expired = expiry.getTime() < Date.now();
  const lines: string[] = [];
  lines.push(
    `${offer.owner.name} — ${offer.total_amount} ${offer.total_currency}${offer.live_mode ? "" : " (TEST MODE)"}`,
  );
  if (offer.base_amount && offer.tax_amount) {
    lines.push(`  Base ${offer.base_amount} + tax ${offer.tax_amount} ${offer.total_currency}`);
  }
  offer.slices.forEach((s, i) => {
    lines.push(`  Slice ${i + 1}:`);
    lines.push(summarizeSlice(s));
  });
  lines.push(conditionLine(offer));
  if (offer.total_emissions_kg) {
    lines.push(`  Est. CO2: ${offer.total_emissions_kg} kg`);
  }
  lines.push(
    expired
      ? `  ⚠️ EXPIRED at ${offer.expires_at} — must re-search before booking.`
      : `  Price held until ${offer.expires_at}.`,
  );
  return lines.join("\n");
}
