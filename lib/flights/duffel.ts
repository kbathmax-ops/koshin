import type {
  CabinClass,
  Offer,
  OfferRequest,
  PassengerType,
} from "./types";

const DUFFEL_BASE = "https://api.duffel.com";
const DUFFEL_VERSION = "v2";

export class DuffelError extends Error {
  status: number;
  errors: unknown;
  constructor(status: number, message: string, errors: unknown) {
    super(message);
    this.name = "DuffelError";
    this.status = status;
    this.errors = errors;
  }
}

function token(): string {
  const t = process.env.DUFFEL_API_TOKEN;
  if (!t) {
    throw new Error(
      "DUFFEL_API_TOKEN is not set. Add a test token (duffel_test_...) to .env.local.",
    );
  }
  return t;
}

// Single low-level entry point. Read helpers below use it; the booking step
// (POST /air/orders) lives in booking.ts and imports this directly — it is
// deliberately NOT reachable from any agent tool.
export async function duffelFetch<T>(
  method: "GET" | "POST",
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${DUFFEL_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Duffel-Version": DUFFEL_VERSION,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify({ data: body }) : undefined,
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const errors = json?.errors ?? json;
    const first = Array.isArray(errors) ? errors[0] : undefined;
    const msg =
      first?.title && first?.message
        ? `${first.title}: ${first.message}`
        : `Duffel request failed (${res.status})`;
    throw new DuffelError(res.status, msg, errors);
  }

  return json.data as T;
}

export interface SliceInput {
  origin: string; // IATA code
  destination: string; // IATA code
  departure_date: string; // YYYY-MM-DD
}

export interface SearchInput {
  slices: SliceInput[];
  passengers: PassengerType[];
  cabinClass?: CabinClass;
  maxConnections?: number;
  supplierTimeoutMs?: number;
}

// Create an offer request and return the offers it produces.
// return_offers=true (default) embeds offers in the response.
export async function searchOffers(input: SearchInput): Promise<OfferRequest> {
  const params = new URLSearchParams({ return_offers: "true" });
  if (input.supplierTimeoutMs) {
    params.set("supplier_timeout", String(input.supplierTimeoutMs));
  }
  return duffelFetch<OfferRequest>(
    "POST",
    `/air/offer_requests?${params.toString()}`,
    {
      slices: input.slices,
      passengers: input.passengers.map((type) => ({ type })),
      cabin_class: input.cabinClass ?? "economy",
      ...(input.maxConnections !== undefined
        ? { max_connections: input.maxConnections }
        : {}),
    },
  );
}

// Re-fetch a single offer. Use this right before booking to confirm the price
// and expiry are still current — offers go stale fast.
export async function getOffer(offerId: string): Promise<Offer> {
  return duffelFetch<Offer>(
    "GET",
    `/air/offers/${encodeURIComponent(offerId)}?return_available_services=false`,
  );
}
