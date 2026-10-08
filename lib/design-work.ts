/* Design pieces shown in the /work grid, after the builds. */

export type Shot = {
  src: string;
  alt: string;
  /** Caption under the shot — what part of the design it shows. */
  label: string;
  width: number;
  height: number;
};

export type DesignProject = {
  id: string;
  name: string;
  /** Omitted for pieces with nowhere to link out to — print and event work. */
  href?: string;
  role: string;
  year: string;
  description: string;
  /** One line for the /work grid. */
  tagline: string;
  shots: Shot[];
};

export const designWork: DesignProject[] = [
  {
    id: "way",
    tagline: "A keychain compass for finding friends when cell service drops.",
    name: "WAY",
    href: "https://way-compass.vercel.app",
    role: "Product design",
    year: "2026",
    description:
      "A keychain compass for finding friends in a crowd when cell service drops. A bead-blasted aluminum body with an integrated loop, a black face carrying a bright arrow inside a 12-segment green LED ring, and a single button for cycling between friends.",
    shots: [
      {
        src: "/way.png",
        alt: "WAY product reference showing front, rear, left edge, right edge, top edge, and front three-quarter views",
        label: "Product reference — front, rear, edges, and three-quarter view",
        width: 1536,
        height: 1024,
      },
    ],
  },
  {
    id: "snap-toronto",
    tagline: "Identity and site for my Toronto AI workshop series.",
    name: "Snap Toronto",
    href: "https://snaptoronto.org",
    role: "Identity & site design",
    year: "2026",
    description:
      "Identity and site design for the AI workshop series I run in Toronto. Condensed display type set at poster scale, a hand-drawn stick figure as the mark, and full-bleed photography of the small businesses it's actually for. The case gets made in numbers rather than adjectives.",
    shots: [
      {
        src: "/design/snap-toronto-hero.jpg",
        alt: "Snap Toronto homepage hero — condensed display type over a street photograph",
        label: "Homepage — display type over full-bleed street photography",
        width: 1600,
        height: 850,
      },
      {
        src: "/design/snap-toronto-workshops.jpg",
        alt: "Snap Toronto workshops section — three full-height photo panels labelled by trade",
        label: "Workshops — edge-to-edge photo panels, labelled by trade",
        width: 1600,
        height: 1032,
      },
      {
        src: "/design/snap-toronto-stats.png",
        alt: "Snap Toronto statistics section — oversized numerals beside cited claims",
        label: "Stats — oversized numerals, every claim cited",
        width: 1600,
        height: 386,
      },
      {
        src: "/design/snap-toronto-cta.png",
        alt: "Snap Toronto call to action — headline with an accent underline above a pill button",
        label: "Sign-up — accent underline, single pill button",
        width: 1600,
        height: 472,
      },
      {
        src: "/design/snap-toronto-wordmark.png",
        alt: "Snap Toronto wordmark — SNAP TORONTO stacked in condensed type with the stick figure walking across the letters",
        label: "Wordmark — the mark walking the top of its own type",
        width: 1940,
        height: 860,
      },
    ],
  },
  {
    id: "hot-take-slideshow-night",
    tagline: "Brush-lettered poster for a Toronto slideshow night.",
    name: "Toronto's Hot Take Slideshow Night",
    role: "Event poster",
    year: "2026",
    description:
      "Poster for a slideshow night at 300 Campbell Ave, where people present their take on a random topic to a full room. A hand-drawn brush wordmark over a photograph of the crowd, with the grotesque set tight underneath so the date and address still hold up at feed size.",
    shots: [
      {
        src: "/design/hot-take-slideshow-night.jpg",
        alt: "Toronto's Hot Take Slideshow Night poster — brush lettering over a photo of a packed room watching a projector",
        label: "Poster — brush wordmark over the room, details set tight beneath",
        width: 1600,
        height: 790,
      },
    ],
  },
  {
    id: "ocean-management",
    tagline: "Brand identity and pitch deck for an influencer agency.",
    name: "Ocean Management",
    role: "Brand identity & deck",
    year: "2026",
    description:
      "Identity and pitch deck for a Toronto influencer management agency. A geometric sans wordmark on a warm off-white, with two of its counters knocked out and replaced by the brand's own shapes: a red pill carrying the year, a gold one carrying the wave mark. Where the deck needs to raise its voice it goes full-bleed gold with justified all-caps.",
    shots: [
      {
        src: "/design/ocean-management-cover.jpg",
        alt: "Ocean Management deck cover — geometric wordmark with coloured pills set into its counters",
        label: "Cover — the mark set into the counters of its own wordmark",
        width: 1600,
        height: 900,
      },
      {
        src: "/design/ocean-management-statement.jpg",
        alt: "Ocean Management statement slide — justified all-caps type on a gold field",
        label: "Statement slide — justified all-caps on brand gold",
        width: 1600,
        height: 900,
      },
    ],
  },
];
