// Minimal Duffel API types covering only the fields this agent reads.
// Source of truth: https://duffel.com/docs/api/v2 (Duffel-Version: v2).

export type CabinClass = "first" | "business" | "premium_economy" | "economy";
export type PassengerType = "adult" | "child" | "infant_without_seat";
export type Title = "mr" | "mrs" | "ms" | "miss" | "dr";
export type Gender = "m" | "f";

export interface Airline {
  name: string;
  iata_code: string | null;
}

export interface Airport {
  iata_code: string | null;
  name: string;
  city_name: string | null;
  time_zone: string | null;
}

export interface SegmentStop {
  airport: Airport;
  duration: string | null; // ISO 8601 duration
}

export interface Segment {
  id: string;
  origin: Airport;
  destination: Airport;
  departing_at: string; // ISO 8601
  arriving_at: string; // ISO 8601
  duration: string | null; // ISO 8601, e.g. "PT7H55M"
  marketing_carrier: Airline;
  operating_carrier: Airline;
  marketing_carrier_flight_number: string;
  operating_carrier_flight_number: string | null;
  stops: SegmentStop[];
}

export interface Slice {
  id: string;
  origin: Airport;
  destination: Airport;
  duration: string | null;
  segments: Segment[];
}

// Returned on offers (and offer requests) — these ids are what an order's
// passengers must reference.
export interface OfferPassenger {
  id: string;
  type: PassengerType;
  given_name: string | null;
  family_name: string | null;
}

export interface ConditionChange {
  allowed: boolean;
  penalty_amount: string | null;
  penalty_currency: string | null;
}

export interface OfferConditions {
  refund_before_departure: ConditionChange | null;
  change_before_departure: ConditionChange | null;
}

export interface Offer {
  id: string;
  live_mode: boolean;
  expires_at: string; // ISO 8601 — offer is unbookable after this
  total_amount: string;
  total_currency: string;
  base_amount: string | null;
  tax_amount: string | null;
  total_emissions_kg: string | null;
  owner: Airline;
  passengers: OfferPassenger[];
  slices: Slice[];
  conditions: OfferConditions | null;
}

export interface OfferRequest {
  id: string;
  live_mode: boolean;
  offers: Offer[];
}

// ---- Order (booking) request shapes — used only at the handoff step. ----

export interface OrderPassengerInput {
  id: string; // must match an Offer.passengers[].id
  given_name: string;
  family_name: string;
  born_on: string; // YYYY-MM-DD
  title: Title;
  gender: Gender;
  email: string;
  phone_number: string; // E.164, e.g. "+442080160508"
  infant_passenger_id?: string;
}

export interface OrderPayment {
  type: "balance" | "arc_bsp_cash" | "card";
  amount: string;
  currency: string;
}

export interface CreateOrderPayload {
  type: "instant" | "hold";
  selected_offers: string[];
  payments: OrderPayment[];
  passengers: OrderPassengerInput[];
}

export interface Order {
  id: string;
  booking_reference: string; // airline PNR
  live_mode: boolean;
  total_amount: string;
  total_currency: string;
  payment_status: {
    awaiting_payment: boolean;
    paid_at: string | null;
  };
  slices: Slice[];
  passengers: OfferPassenger[];
}
