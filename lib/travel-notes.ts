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
  /** A few sentences: the place, and what you got up to there. */
  blurb: string;
};

export const TRAVEL_NOTES: TravelNote[] = [
  {
    name: 'Canada',
    blurb:
      'The place I call home & my favourite country. Been to the east coast, Quebec, yet to visit the west. Some of the smartest, most underrated builders live in Canada + freshwater lakes are not something to be taken for granted.',
  },
  {
    name: 'United States',
    blurb: 'NYC 3x - went for the hustle energy. Kid me learned dreams are possible in NYC.',
  },
  {
    name: 'Dominican Republic',
    blurb:
      'Sold this grad trip to my grade for a year. Learned to cherish the fleeting bonding weeks with your people.',
  },
  {
    name: 'Peru',
    blurb: 'Headed there soon - can’t wait :)',
  },
  {
    name: 'South Korea',
    blurb:
      'The motherland + insane infrastructure. Started travelling with an economic perspective after Korea. Their rise to power is one of the most fascinating stories I’ve known.',
  },
  {
    name: 'Spain',
    blurb:
      'Second favourite country. Reminded me that we are one people, and we are meant to live, not just survive. Most beautiful beaches I’ve ever seen.',
  },
  {
    name: 'England',
    blurb: 'Magical in August. South Bank.',
  },
  {
    name: 'France',
    blurb:
      'Never been to Paris, only to the south. Inspired by Italian architecture, slow-paced life & kindness of locals.',
  },
  {
    name: 'Monaco',
    blurb:
      '10 minutes in, I saw a child on a massive yacht. Told myself it’s a non-negotiable & I need one of those.',
  },
  {
    name: 'Italy',
    blurb: 'Spent 3 hours in Ventimiglia. Great - once again, a slow-paced way of life.',
  },
];

const BY_NAME = new Map(TRAVEL_NOTES.map((n) => [n.name, n]));

/** A note only counts as written once it has a blurb — empty ones stay inert. */
export function getTravelNote(name: string): TravelNote | undefined {
  const note = BY_NAME.get(name);
  return note && note.blurb.trim() ? note : undefined;
}
