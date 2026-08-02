import { duffelFetch, getOffer } from "./duffel";
import type {
  CreateOrderPayload,
  Offer,
  Order,
  OrderPassengerInput,
} from "./types";

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PHONE_RE = /^\+[1-9]\d{6,14}$/; // E.164
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Pure check: do the supplied passengers satisfy what this offer requires?
export function validatePassengersAgainstOffer(
  offer: Offer,
  passengers: OrderPassengerInput[],
): ValidationResult {
  const errors: string[] = [];
  const required = offer.passengers.map((p) => p.id).sort();
  const provided = passengers.map((p) => p.id).sort();

  if (required.length !== provided.length) {
    errors.push(
      `Offer needs ${required.length} passenger(s) but ${provided.length} were provided.`,
    );
  }
  for (const id of required) {
    if (!provided.includes(id)) {
      errors.push(`Missing details for offer passenger id "${id}".`);
    }
  }
  for (const id of provided) {
    if (!required.includes(id)) {
      errors.push(`Passenger id "${id}" does not belong to this offer.`);
    }
  }

  passengers.forEach((p, i) => {
    const who = `passenger ${i + 1} (${p.given_name || "?"} ${p.family_name || "?"})`;
    if (!p.given_name?.trim()) errors.push(`${who}: given_name is required.`);
    if (!p.family_name?.trim()) errors.push(`${who}: family_name is required.`);
    if (!DATE_RE.test(p.born_on)) errors.push(`${who}: born_on must be YYYY-MM-DD.`);
    if (!p.title) errors.push(`${who}: title is required.`);
    if (!p.gender) errors.push(`${who}: gender is required.`);
    if (!EMAIL_RE.test(p.email)) errors.push(`${who}: email looks invalid.`);
    if (!PHONE_RE.test(p.phone_number))
      errors.push(`${who}: phone_number must be E.164, e.g. +442080160508.`);
  });

  return { ok: errors.length === 0, errors };
}

// Pure assembly of the exact body Duffel expects. No network call.
export function buildOrderPayload(
  offer: Offer,
  passengers: OrderPassengerInput[],
): CreateOrderPayload {
  return {
    type: "instant",
    selected_offers: [offer.id],
    payments: [
      {
        type: "balance",
        amount: offer.total_amount,
        currency: offer.total_currency,
      },
    ],
    passengers,
  };
}

// =========================================================================
// THE ONLY FUNCTION THAT SPENDS MONEY.
//
// It is intentionally NOT wrapped as an agent tool and is not imported by
// agent.ts or tools.ts — so the LLM has no path to call it. A human invokes
// this explicitly after reviewing the prepared plan.
// =========================================================================
export interface BookResult {
  order: Order;
  priceChanged: boolean;
}

export async function confirmAndBook(
  payload: CreateOrderPayload,
): Promise<BookResult> {
  const offerId = payload.selected_offers[0];

  // Final guard: re-fetch the offer and confirm it is still bookable at the
  // exact price the human approved. Refuse on any drift.
  const fresh = await getOffer(offerId);
  if (new Date(fresh.expires_at).getTime() < Date.now()) {
    throw new Error(
      `Offer ${offerId} expired at ${fresh.expires_at}. Re-search and prepare a new booking.`,
    );
  }

  const approved = payload.payments[0];
  const priceChanged =
    fresh.total_amount !== approved.amount ||
    fresh.total_currency !== approved.currency;
  if (priceChanged) {
    throw new Error(
      `Price changed since approval: was ${approved.amount} ${approved.currency}, ` +
        `now ${fresh.total_amount} ${fresh.total_currency}. Re-confirm before booking.`,
    );
  }

  const order = await duffelFetch<Order>("POST", "/air/orders", payload);
  return { order, priceChanged: false };
}
