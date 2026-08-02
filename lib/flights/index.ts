export { flightAgent, type FlightAgent } from "./agent";
export { flightTools } from "./tools";

// The booking step is exported separately and on purpose: it is the only code
// that spends money and is never reachable from the agent's tool loop.
export {
  confirmAndBook,
  buildOrderPayload,
  validatePassengersAgainstOffer,
  type BookResult,
  type ValidationResult,
} from "./booking";

export { searchOffers, getOffer, DuffelError } from "./duffel";
export * from "./types";
