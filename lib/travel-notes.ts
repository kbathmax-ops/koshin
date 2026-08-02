/*
 * Notes for each X on the travel map.
 *
 * `name` MUST match the mark name in lib/travel-map-data.ts (that file is
 * generated — don't edit it; edit this one). Places without an entry here are
 * still plotted, they just aren't clickable.
 */

export type TravelNote = {
  /** Matches the mark name on the map. */
  name: string;
  /** Optional line under the title — city, region, whatever fits. */
  where?: string;
  /** Optional — "Summer 2023", "2019 & 2024", however you want it. */
  when?: string;
  /** A few sentences: the place, and what you got up to there. */
  blurb: string;
};

export const TRAVEL_NOTES: TravelNote[] = [
  {
    name: 'Canada',
    where: 'Home base',
    when: 'Add the years',
    blurb: 'Placeholder — a few lines about home: where you grew up, the trips across the country, what keeps pulling you back.',
  },
  {
    name: 'United States',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — the US story goes here: the cities, the drives, the people you met along the way.',
  },
  {
    name: 'Dominican Republic',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — the DR write-up: the coast, the food, the pace of it, and what stuck with you.',
  },
  {
    name: 'South Korea',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — Korea notes: the language, the late nights, the culture shock that turned into comfort.',
  },
  {
    name: 'Spain',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — Spain: what you did there and the one moment you still bring up.',
  },
  {
    name: 'England',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — England: what you did there and the one moment you still bring up.',
  },
  {
    name: 'France',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — France: what you did there and the one moment you still bring up.',
  },
  {
    name: 'Monaco',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — Monaco: what you did there and the one moment you still bring up.',
  },
  {
    name: 'Italy',
    where: 'Add a city',
    when: 'Add the years',
    blurb: 'Placeholder — Italy: what you did there and the one moment you still bring up.',
  },
];

const BY_NAME = new Map(TRAVEL_NOTES.map((n) => [n.name, n]));

/** A note only counts as written once it has a blurb — empty ones stay inert. */
export function getTravelNote(name: string): TravelNote | undefined {
  const note = BY_NAME.get(name);
  return note && note.blurb.trim() ? note : undefined;
}
