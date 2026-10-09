import type { Teardown } from "./types";
import { impressionVentures } from "./impression-ventures";

/** Every teardown. Adding one = a new file + one entry here. */
export const teardowns: Teardown[] = [impressionVentures];

export const getTeardown = (slug: string) => teardowns.find((t) => t.slug === slug);
