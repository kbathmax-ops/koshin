/**
 * Every project, shared by the /work index and the /work/[slug] detail pages.
 *
 * Story fields are the part a hiring reader actually cares about, so they are
 * written in Koshin's own words rather than generated. Anything still unwritten
 * is wrapped in `todo()` — it renders as a visibly unfinished block, and
 * `grep TODO_COPY` lists everything left to write.
 */

export const TODO_PREFIX = "TODO_COPY:";

const todo = (prompt: string) => `${TODO_PREFIX} ${prompt}`;

export const isTodo = (copy: string) => copy.startsWith(TODO_PREFIX);

export const todoPrompt = (copy: string) => copy.slice(TODO_PREFIX.length).trim();

export type ProjectStory = {
  /** Why this got built at all — the problem, the itch, the bet. */
  intention?: string;
  /** How it got figured out: what was looked into, tried, thrown away. */
  process?: string[];
  /** What it taught him. The reason the page exists. */
  learnings?: string[];
};

export type ProjectDetails = {
  problem: string[];
  solution: string;
  features: string[];
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  image: string;
  detailImage?: { src: string; alt: string; width: number; height: number };
  /** The live thing, when there is one to visit. */
  liveUrl?: string;
  /** Wording for the outbound link when "View live site" is wrong. */
  linkLabel?: string;
  /** Live site is down — flags the card with a red marker. */
  unavailable?: boolean;
  /** Shipped but waiting on a store review — flags the card with a green light. */
  inReview?: boolean;
  /** Open the portfolio write-up before the live site. */
  detailFirst?: boolean;
  details?: ProjectDetails;
  story?: ProjectStory;
};

export const projects: Project[] = [
  {
    slug: "undo",
    name: "UNDO",
    description:
      "A game and brand concept for practising critical thinking. Less autopilot, more you.",
    image: "/undo-logo.png",
    liveUrl:
      "https://drive.google.com/file/d/1Fd81UCkRmUkJVN_puyMvyzRtIn0E-QO_/view?usp=sharing",
    linkLabel: "View on Google Drive",
  },
  {
    slug: "relay",
    name: "Relay",
    description:
      "Relay is a GTM coordination prototype that coordinates marketing & sales teams.",
    image: "/relay-handoff.png",
    // The old link pointed at a chatgpt.site domain that redirects to ChatGPT.
    // Left off until there's a real URL to send people to.
    unavailable: true,
    story: {
      intention: todo(
        "What made you build a GTM coordination tool? What did you watch go wrong between marketing and sales that made this feel worth prototyping?",
      ),
      process: [
        todo("Who did you talk to, or what did you read, about how GTM teams actually hand off work?"),
        todo("What did the first version look like, and what did you cut or rebuild after trying it?"),
      ],
      learnings: [
        todo("What do you understand about go-to-market now that you didn't before building this?"),
      ],
    },
  },
  {
    slug: "way-compass",
    name: "WAY",
    description:
      "A pocket compass concept for finding friends in crowded places when cell service is unreliable.",
    image: "/way-compass-hero.jpg",
    detailImage: {
      src: "/way.png",
      alt: "WAY product reference showing front, rear, left edge, right edge, top edge, and front three-quarter views",
      width: 1536,
      height: 1024,
    },
    liveUrl: "https://way-compass.vercel.app",
    linkLabel: "Explore the interactive WAY site",
    detailFirst: true,
    details: {
      problem: [
        "At crowded events, it is easy to lose sight of friends and family. Toronto's World Cup watch parties and summer street festivals made that clear to me. Find My can be too imprecise to help you spot someone nearby, especially when cell service is unreliable.",
        "At Guelph homecoming, I kept getting separated from my friends. Music, shouting, and a crowd of people who looked familiar made finding them harder than I expected. With no cell service, I needed a way to tell which direction to walk.",
      ],
      solution:
        "The idea came to me when I was locked out of a friend's apartment. WAY is a compact, affordable friend-finding compass designed to clip onto a keychain. After connecting with friends, you would select a person and follow a visual direction indicator and proximity lights to find them.",
      features: [
        "A bright arrow and 12-segment LED ring point toward the selected friend.",
        "Illuminated distance marks show when you are getting closer.",
        "One button cycles between friends; holding it sends an SOS alert to the group.",
        "Vibration confirms selections and provides feedback without a speaker.",
        "A thin, bead-blasted recycled aluminum body is designed to feel solid while weighing less than 42 grams.",
        "An impact-resistant translucent polycarbonate face protects the display.",
        "An integrated loop attaches to keys, a bag, or a lanyard.",
        "Bluetooth connects the compass to a phone for setup.",
        "A proposed sub-GHz radio and GNSS system would share locations without cellular service.",
      ],
      note: "WAY is a design concept. Its weight, cost, radio range, and location accuracy are targets that still need hardware testing.",
    },
  },
  {
    slug: "human-and-chimp",
    name: "Chimp and Human",
    description:
      "3D simulator of the viral chimp vs human fight built with the help of GPT-6 Astra.",
    image: "/human-and-chimp-hero.png",
    liveUrl: "https://chimpvshuman.space",
    story: {
      intention: todo(
        "Why this one? Was it the meme, the 3D challenge, seeing if you could ship something on a trend fast?",
      ),
      process: [
        todo("How did you work with GPT-6 Astra here — what did it do well, where did you have to take over?"),
        todo("What was hardest to get right in the 3D simulation?"),
      ],
      learnings: [
        todo("What did building on a viral moment teach you about timing and attention?"),
      ],
    },
  },
  {
    slug: "detour",
    name: "detour",
    description:
      "A Chrome extension that hides Google Flights itineraries connecting through the US.",
    image: "/detour-landing-hero.jpg",
    liveUrl: "https://detour-landing-roan.vercel.app",
    inReview: true,
    story: {
      intention: todo(
        "Who is this for and what problem were they having? Was this your own travel frustration or something you heard from others?",
      ),
      process: [
        todo("How did you work out which itineraries to hide — what does it actually read off the page?"),
        todo("What did building for the Chrome Web Store change about how you scoped it?"),
      ],
      learnings: [
        todo("What did you learn about shipping a browser extension versus a website?"),
      ],
    },
  },
  {
    slug: "toronto-cafe-roulette",
    name: "Toronto Cafe Roulette",
    description:
      "A roulette of Toronto coffee shops to discover the city & your next coffee chat.",
    image: "/toronto-cafe-roulette-hero.png",
    liveUrl: "https://toronto-cafe-roulette.vercel.app/",
    story: {
      intention: todo(
        "What were you trying to make easier — picking a cafe, or having the coffee chat itself?",
      ),
      process: [
        todo("Where did the cafe list come from, and how did you decide what counted?"),
        todo("Why a roulette rather than a map or a ranked list?"),
      ],
      learnings: [
        todo("What did you learn about making something small that people actually open twice?"),
      ],
    },
  },
  {
    slug: "tattoos-by-jess",
    name: "Tattoos by Jess",
    description: "Made a friend's tattoo shop go viral.",
    image: "/tattoos-by-jess-hero.png",
    liveUrl: "https://www.instagram.com/tattoosbyjesss/",
    linkLabel: "View on Instagram",
    story: {
      intention: todo(
        "What state was the shop's presence in when you started, and what were you trying to get for Jess — bookings, followers, something else?",
      ),
      process: [
        todo("What did you actually change: the content, the posting cadence, the positioning? Name the moves."),
        todo("What did you try that flopped before something worked?"),
      ],
      learnings: [
        todo("This is your strongest marketing proof point — what does it prove you can do? Numbers if you have them."),
      ],
    },
  },
  {
    slug: "the-window-seat",
    name: "The Window Seat",
    description:
      "A quiz for ambitious people to consider travel for their personal growth.",
    image: "/thewindowseat-hero.png",
    liveUrl: "https://thewindowseat.vercel.app",
    story: {
      intention: todo(
        "What belief about travel and growth were you trying to get across, and why a quiz instead of an essay?",
      ),
      process: [
        todo("How did you write the questions — what were you trying to surface about the person taking it?"),
        todo("How did you decide what the results should tell someone?"),
      ],
      learnings: [
        todo("What did you learn about getting people to finish something and act on it?"),
      ],
    },
  },
  {
    slug: "sanctions-precedent",
    name: "Sanctions Precedent",
    description:
      "An AI research engine that finds historical sanctions precedents by sector, intensity, and geopolitical objective, built for policy analysts.",
    image: "/sanctions-precedent-hero.png",
    unavailable: true,
    story: {
      intention: todo(
        "This connects to the Halifax forum and wanting to work in national defense — say that. What does a policy analyst do today that this was meant to replace?",
      ),
      process: [
        todo("Where did the sanctions data come from, and how did you decide on sector / intensity / objective as the axes?"),
        todo("How did you use the Claude API here — what was the retrieval doing versus the model?"),
      ],
      learnings: [
        todo("What did going deep on a policy domain teach you about building tools for experts?"),
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
