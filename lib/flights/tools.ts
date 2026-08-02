import { tool } from "ai";
import { z } from "zod";
import { getOffer, searchOffers } from "./duffel";
import {
  buildOrderPayload,
  validatePassengersAgainstOffer,
} from "./booking";
import {
  isoDurationToMinutes,
  offerDigest,
  summarizeOffer,
} from "./format";
import type { OrderPassengerInput } from "./types";

const iata = z
  .string()
  .length(3)
  .regex(/^[A-Za-z]{3}$/, "Use a 3-letter IATA code, e.g. JFK")
  .transform((s) => s.toUpperCase());

const passengerType = z.enum(["adult", "child", "infant_without_seat"]);
const cabinClass = z.enum([
  "economy",
  "premium_economy",
  "business",
  "first",
]);

// --- searchFlights: turn a route into a ranked, compact list of real offers.
const searchFlights = tool({
  description:
    "Search real, bookable flight offers for one or more slices (one-way = one slice, round-trip = two). Returns a ranked list with offer ids the user can drill into. Always use real IATA codes.",
  inputSchema: z.object({
    slices: z
      .array(
        z.object({
          origin: iata,
          destination: iata,
          departureDate: z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
        }),
      )
      .min(1),
    passengers: z.array(passengerType).min(1),
    cabinClass: cabinClass.default("economy"),
    maxConnections: z.number().int().min(0).max(2).optional(),
  }),
  execute: async ({ slices, passengers, cabinClass, maxConnections }) => {
    const request = await searchOffers({
      slices: slices.map((s) => ({
        origin: s.origin,
        destination: s.destination,
        departure_date: s.departureDate,
      })),
      passengers,
      cabinClass,
      maxConnections,
    });

    if (request.offers.length === 0) {
      return { offerRequestId: request.id, count: 0, offers: [] };
    }

    const ranked = [...request.offers].sort(
      (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount),
    );
    const top = ranked.slice(0, 8).map(offerDigest);
    const cheapest = top[0]?.id;
    const fastest = [...top].sort(
      (a, b) => (a.durationMinutes ?? 1e9) - (b.durationMinutes ?? 1e9),
    )[0]?.id;

    return {
      offerRequestId: request.id,
      liveMode: request.live_mode,
      count: request.offers.length,
      showing: top.length,
      cheapestOfferId: cheapest,
      fastestOfferId: fastest,
      offers: top,
      note: "Prices/availability expire quickly. Call getOfferDetails before quoting a final price.",
    };
  },
});

// --- getOfferDetails: fresh, full breakdown of one offer + booking checklist.
const getOfferDetails = tool({
  description:
    "Fetch the latest details for a single offer id: full itinerary, layovers, fare conditions, price, expiry, and exactly which passenger records the booking will need. Call this before preparing a booking so the price is current.",
  inputSchema: z.object({ offerId: z.string() }),
  execute: async ({ offerId }) => {
    const offer = await getOffer(offerId);
    const expired = new Date(offer.expires_at).getTime() < Date.now();
    return {
      offerId: offer.id,
      expired,
      expiresAt: offer.expires_at,
      price: { amount: offer.total_amount, currency: offer.total_currency },
      summary: summarizeOffer(offer),
      durationMinutes: isoDurationToMinutes(offer.slices[0]?.duration),
      requiredPassengers: offer.passengers.map((p) => ({
        id: p.id,
        type: p.type,
      })),
      bookingFieldsPerPassenger: [
        "id (use the id above)",
        "given_name",
        "family_name",
        "born_on (YYYY-MM-DD)",
        "title (mr|mrs|ms|miss|dr)",
        "gender (m|f)",
        "email",
        "phone_number (E.164, e.g. +442080160508)",
      ],
    };
  },
});

// --- prepareBooking: validate + assemble the order, but DO NOT book.
// This is the handoff artifact. The returned payload is what a human passes to
// confirmAndBook(). This tool never spends money and never calls POST /air/orders.
const prepareBooking = tool({
  description:
    "Validate passenger details against an offer and assemble the exact booking payload for human review. This NEVER books or charges anything — it produces a plan the user must confirm. Returns ready=false with errors if anything is missing or the offer expired.",
  inputSchema: z.object({
    offerId: z.string(),
    passengers: z
      .array(
        z.object({
          id: z.string().describe("Must match a requiredPassengers id"),
          given_name: z.string(),
          family_name: z.string(),
          born_on: z.string(),
          title: z.enum(["mr", "mrs", "ms", "miss", "dr"]),
          gender: z.enum(["m", "f"]),
          email: z.string(),
          phone_number: z.string(),
        }),
      )
      .min(1),
  }),
  execute: async ({ offerId, passengers }) => {
    const offer = await getOffer(offerId);
    const expired = new Date(offer.expires_at).getTime() < Date.now();

    const validation = validatePassengersAgainstOffer(
      offer,
      passengers as OrderPassengerInput[],
    );

    const ready = validation.ok && !expired;
    const errors = [...validation.errors];
    if (expired) {
      errors.unshift(
        `Offer expired at ${offer.expires_at}. Re-search to get a fresh, bookable offer.`,
      );
    }

    return {
      ready,
      errors,
      offerId: offer.id,
      liveMode: offer.live_mode,
      price: { amount: offer.total_amount, currency: offer.total_currency },
      expiresAt: offer.expires_at,
      confirmationSummary: summarizeOffer(offer),
      // The exact body for confirmAndBook(). Only meaningful when ready=true.
      payload: ready
        ? buildOrderPayload(offer, passengers as OrderPassengerInput[])
        : null,
      handoff:
        ready && !offer.live_mode
          ? "TEST MODE: pass `payload` to confirmAndBook() to place the test order."
          : ready
            ? "LIVE: a human must explicitly call confirmAndBook(payload) to pay and book."
            : "Not ready — resolve errors above first.",
    };
  },
});

export const flightTools = {
  searchFlights,
  getOfferDetails,
  prepareBooking,
};
