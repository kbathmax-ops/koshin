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

/** One block of a long-form write-up: paragraphs first, then any list. */
export type CaseStudySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  image: string;
  /** Logos sit inside the frame instead of filling it. */
  imageFit?: "contain";
  detailImage?: { src: string; alt: string; width: number; height: number };
  /** The live thing, when there is one to visit. */
  liveUrl?: string;
  /** Wording for the outbound link when "View live site" is wrong. */
  linkLabel?: string;
  /** Live site is down — flags the card with a red marker. */
  unavailable?: boolean;
  /** Shipped but waiting on a store review — flags the card with a green light. */
  inReview?: boolean;
  /** Show an interactive 3D model in place of the outbound link. */
  model?: "way";
  /** Open the portfolio write-up before the live site. */
  detailFirst?: boolean;
  details?: ProjectDetails;
  story?: ProjectStory;
  /** Long-form write-up, rendered in order on the detail page. */
  caseStudy?: CaseStudySection[];
  /** Filter on the /work grid. Defaults to "product". */
  category?: "product" | "revops";
  /** Title on the /work grid card, when it should differ from the page title. */
  cardName?: string;
  /** Kept on file (its detail page still builds) but left off the /work index. */
  hidden?: boolean;
};

export const projects: Project[] = [
  {
    slug: "client-reporting",
    name: "AI Client Reporting",
    cardName: "AI Client Reporting Case Study",
    description:
      "A weekly reporting system for marketing agencies. It pulls ad data, flags problems, has Claude write the client note, and checks every number before it's sent.",
    image: "/case-studies/client-reporting/dashboard.png",
    detailImage: {
      src: "/case-studies/client-reporting/how-it-works.png",
      alt: "Hand-drawn diagram: ad platforms feed connectors into a weekly engine that calculates metrics, flags problems and has Claude write a note, which is fact-checked and sent to a Google Sheet, Looker Studio and the client's inbox. An optional MCP layer sits underneath.",
      width: 1600,
      height: 1040,
    },
    detailFirst: true,
    category: "revops",
    caseStudy: [
      {
        title: "The problem",
        paragraphs: [
          "Every marketing agency sends its clients a weekly performance report. And someone has to build it.",
          "That means opening Meta, Google Ads and GA4 for each client, copying numbers into a sheet, working out what moved and writing it up. Agency owners put it at 1-2 hours per client, every week.",
          "The person who can explain a number is usually a strategist. So senior time goes into copy-paste.",
          "Problems surface late, too. A campaign whose costs doubled can hide inside an account total that moved 9%, and overspend usually shows up first on the invoice.",
        ],
      },
      {
        title: "What I built",
        paragraphs: [
          "One command that runs every Monday at 7am (cron or n8n kicks it off). For each client it:",
        ],
        bullets: [
          "Pulls 90 days of daily data from Meta Ads, Google Ads and GA4 through connectors I can swap out.",
          "Compares this week with last week, month to date, per channel and per campaign, and checks budget pacing.",
          "Runs 4 rules: CPA up more than 30%, ROAS down more than 25%, spend above 110% of pace, CTR down more than 20%.",
          "Hands the flags to Claude, which writes the client note in the agency's voice.",
          "Checks every number in that note, then writes everything to 5 Google Sheet tabs that feed Looker Studio.",
          "Emails each client a branded report with a link to their live dashboard.",
        ],
      },
      {
        title: "Rules find the problems, Claude explains them",
        paragraphs: [
          "I could've asked Claude to read the numbers and decide what's wrong. I didn't.",
          "Rules cost next to nothing and give the same answer every run. The agency tunes them in 1 settings file.",
          "Each rule ignores campaigns with too little data (under 10 conversions, say), so one bad Tuesday on a tiny campaign doesn't set off an alarm.",
          "Claude gets the summary: totals, channels, top campaigns, pacing and the flags. It never sees the daily rows, so it can't quote a figure the code didn't calculate.",
        ],
      },
      {
        title: "The code checks Claude",
        paragraphs: [
          "A wrong number in a client report costs the agency trust. So nothing goes out until the note passes 3 checks:",
        ],
        bullets: [
          "Structure: every section's there, the headline's under 90 characters, and there are 2 or 3 next steps.",
          "Coverage: every flag shows up in exactly 1 of Claude's problem items, so Claude can't skip one or mention it twice.",
          "Numbers: every % and $ figure in the note has to match a number Claude was given, within rounding.",
        ],
      },
      {
        title: "When a check fails",
        paragraphs: [
          "Claude gets 1 retry with the errors spelled out.",
          "If the structure or coverage check still fails, that client's report stops and the agency gets an alert. Every other client's report still goes out.",
        ],
      },
      {
        title: "What it caught",
        paragraphs: [
          "I tested it on 3 made-up clients and hid 1 problem in each one's last 7 days. The system doesn't know where.",
        ],
        bullets: [
          "Northwind Outdoor (online store): ROAS was 3.43 against a target of 4, down 9%. That reads like a soft week. Underneath, one Meta campaign's cost per sale had gone from $42.78 to $93.22.",
          "Halcyon Dental: cost per lead was on target. But Google Ads was at 127% of budget pace, on course for about $15,262 against a $12,000 month. Spend had run hot all month, so week-over-week comparisons saw nothing; the pacing rule caught it.",
          "Brightline Software: one Meta ad's click-through rate slid from 1.07% to 0.74% over 10 days. That's an audience getting sick of an ad.",
        ],
      },
      {
        title: "Adding clients and data sources",
        paragraphs: [
          "Each client is one block in a YAML file: budget, goals, tone of voice, banned words, recipients and dashboard link.",
          "So the dental client's note comes out warm and calls leads \"booked appointments\". The online store's note is direct and leads with revenue.",
          "Every connector returns data in the same shape. Swapping sample data for Windsor.ai, Supermetrics or the platform APIs means changing 1 file.",
        ],
      },
      {
        title: "Where it stands",
        paragraphs: [
          "It's a working build on sample data. No agency is paying for it yet.",
          "The full run works end to end and 46 automated tests pass. Live Google Sheets and email sending are built, but I haven't pointed them at real accounts.",
          "And the 1-2 hours saved is the industry's number. I haven't measured it myself.",
        ],
      },
      {
        title: "What's next",
        bullets: [
          "Connect real ad accounts, then bolt on Shopify, a CRM or CallRail so sales and leads come from where they actually happened.",
          "An MCP layer, so someone can ask Claude \"why did Northwind's CPA jump?\" in Slack and get an answer from the same Sheet.",
          "A 4-week pilot next to one agency's manual process, counting hours spent and problems caught on each side.",
        ],
      },
      {
        title: "Stack",
        paragraphs: [
          "Python, the Claude API (structured output), Pydantic, Jinja, Google Sheets, Looker Studio, Resend or SMTP, and cron or n8n.",
        ],
      },
    ],
  },
  {
    slug: "lead-to-revenue",
    name: "Lead-to-Revenue Loop",
    cardName: "Lead-to-Revenue Case Study",
    description:
      "A weekly system for businesses with a front desk and a till, like dental practices and gyms. It follows every ad lead to the sale and tells Meta and Google who actually paid.",
    image: "/case-studies/lead-to-revenue/how-it-works.png",
    detailImage: {
      src: "/case-studies/lead-to-revenue/how-it-works.png",
      alt: "Hand-drawn diagram: ad accounts, a CRM and a till system feed a weekly engine that matches each sale to its lead, measures reply time, show rate and cost per paying customer, checks for leaks and has Claude write a fact-checked note. It sends a branded email with a call-back list, fills a Google Sheet, and passes matched sales back to Meta and Google as offline conversions.",
      width: 1600,
      height: 1040,
    },
    detailFirst: true,
    category: "revops",
    caseStudy: [
      {
        title: "The problem",
        paragraphs: [
          "A dental practice running Meta ads gets told its leads cost $9. The report never says which of those leads paid.",
          "After the form fill, the lead waits for the front desk to reply, books or doesn't, shows up or doesn't, and pays at the till. Each step lives in a different system: the ad account, the CRM, the booking app and the POS.",
          "So owners judge ads on cost per lead. A campaign can look cheap and still bring in very few people who buy.",
          "And a lot of the money leaks out after the ad. A lead who waits 2 hours for a reply books far less often than one who hears back in 5 minutes.",
        ],
      },
      {
        title: "What I built",
        paragraphs: ["One command that runs every Monday at 7am. For each business it:"],
        bullets: [
          "Pulls leads and reply times from the CRM, sales from the till and spend from the ad accounts.",
          "Matches each till sale to the lead it came from, by phone or email.",
          "Measures reply time, booking rate, show rate and ad spend per paying customer.",
          "Runs 5 rules that look for leaking revenue.",
          "Has Claude write the weekly note in the business's voice, then checks every number in it.",
          "Emails the owner a report with a call-back list, and sends the week's buyers back to Meta and Google.",
        ],
      },
      {
        title: "Matching a sale to its lead",
        paragraphs: [
          "Till data is messy. The same person is (512) 200-0142 in the CRM and +15122000142 at the till, or MAYA@GMAIL.COM instead of maya@gmail.com.",
          "So the code cuts phone numbers to 10 digits and lower-cases emails. Then it credits each sale to the most recent lead from that person in the 45 days before it.",
          "Some sales never match (someone pays on their partner's card, or a regular walks in). Those get reported as walk-ins and repeat visits, and they don't count as ad revenue.",
        ],
      },
      {
        title: "Rules find the leaks",
        paragraphs: ["5 rules run on the numbers before Claude sees anything:"],
        bullets: [
          "Median reply time over 15 minutes, counting only leads that arrived during opening hours. A form sent at midnight doesn't count against the front desk.",
          "More than 10% of the week's leads never got a reply.",
          "Show rate down more than 15% on last week.",
          "A campaign that's cheaper per lead than average but brings in under half the account's revenue per ad dollar.",
          "Ad spend per paying customer over 125% of the owner's target.",
        ],
      },
      {
        title: "The rule I had to rewrite",
        paragraphs: [
          "My first cheap-leads rule flagged dental implants, because only 7% of implant leads became patients.",
          "But each implant patient pays about $2,400, so the campaign earned $2.63 for every $1 it spent. Now a campaign needs cheap leads and a weak return before it gets flagged.",
        ],
      },
      {
        title: "The code checks Claude",
        paragraphs: [
          "Claude gets totals only. It never sees a lead's name, email or phone number, and a test makes sure of it.",
          "Every leak has to show up in Claude's note exactly once, and every $ and % figure has to match a number the code calculated. If a check fails, Claude gets 1 retry with the errors spelled out.",
        ],
      },
      {
        title: "What it caught",
        paragraphs: [
          "I tested it on 3 made-up businesses, each with 90 days of leads and till sales, and hid 1 problem in each. The system doesn't know where.",
        ],
        bullets: [
          "Halcyon Dental: the front desk got short-staffed. Median reply time went from 6 minutes to 2.1 hours, 27% of leads never heard back, and bookings fell 44%. That week's revenue still looked fine, because patients booked earlier were still paying, so I told Claude to say the drop lands over the next 2 weeks.",
          "Ironside Strength (gym): Meta's free 7-day pass form cost $8.66 per lead, so it got 70% more budget. Only 1.2% of those leads joined, at $706 per member. Google search brought members in at $119.",
          "Lumen Aesthetics (med spa): reminder texts stopped sending. The show rate fell from 87% to 50% in a week, and cost per new client went from $193 to $330 against a $200 target.",
        ],
      },
      {
        title: "The call-back list",
        paragraphs: [
          "Every report ends with the leads worth chasing today: anyone from the week who never heard back, plus anyone from the last 3 days who got a reply but didn't book.",
          "Each one comes with a ready-to-send text and a rough value. Halcyon's list had 57 leads, worth about $7,400 if they book at the practice's normal rate (that's an estimate, and probably a generous one).",
        ],
      },
      {
        title: "Telling Meta and Google who paid",
        paragraphs: [
          "Ad platforms aim at whatever you report back to them, and by default that's a form fill.",
          "So each week the matched sales go back as offline conversions: Meta Conversions API events with hashed email and phone, and a Google Ads import file keyed on the click ID. That should push bidding toward people who look like buyers. I haven't run it against a live ad account yet.",
        ],
      },
      {
        title: "Where it stands",
        paragraphs: [
          "It's a working build on sample data. No business is using it yet.",
          "The full run works end to end and 42 automated tests cover it. The Meta upload, Google Sheets and email are built, but none of them has touched a real account.",
          "The CRM and till connections are stubs with the HubSpot and Square field mappings written down. And the demo notes so far come from a template fallback, since I ran it without an API key.",
        ],
      },
      {
        title: "What's next",
        bullets: [
          "Connect one real CRM and till system, probably HubSpot and Square.",
          "Add CallRail, since a lot of dental and med spa leads phone in.",
          "An instant text reply for new leads, since slow replies were behind Halcyon's 44% drop in bookings.",
          "A 4-week pilot with one practice, comparing bookings and cost per patient before and after.",
        ],
      },
      {
        title: "Stack",
        paragraphs: [
          "Python, the Claude API (structured output), Pydantic, Jinja, Google Sheets, the Meta Conversions API, Google Ads offline imports, Resend or SMTP, and cron or n8n.",
        ],
      },
    ],
  },
  {
    slug: "undo",
    name: "UNDO",
    description:
      "A game and brand concept for practising critical thinking. Less autopilot, more you.",
    image: "/undo-logo.png",
    imageFit: "contain",
    liveUrl:
      "https://drive.google.com/file/d/1Fd81UCkRmUkJVN_puyMvyzRtIn0E-QO_/view?usp=sharing",
    linkLabel: "View on Google Drive",
  },
  {
    slug: "relay",
    name: "Relay",
    hidden: true,
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
    cardName: "WAY Case Study",
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
    model: "way",
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
    slug: "toronto-cafe-roulette",
    name: "Toronto Cafe Roulette",
    description:
      "A roulette of Toronto coffee shops to discover the city & your next coffee chat.",
    image: "/toronto-cafe-roulette-hero.png",
    liveUrl: "https://caffein.cafe",
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
    slug: "the-window-seat",
    hidden: true,
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
    hidden: true,
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
