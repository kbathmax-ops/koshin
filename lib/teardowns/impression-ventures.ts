import type { Shot, Teardown, TeardownSection } from "./types";

const dir = "/case-studies/impression-ventures";

/*
 * Callout copy is a first draft — rewrite freely. x/y are percentages of the
 * screenshot, so arrows stay pinned at any width. Within a row, list callouts
 * left to right so the arrows never cross.
 */
const after = `${dir}/after`;
const shot = (file: string, alt: string, width: number, height: number): Shot => ({
  src: `${after}/${file}`,
  alt,
  width,
  height,
});

/*
 * My version of each section, from the redesign concept at
 * /work/case-studies/impression-ventures/redesign. Fixes are listed in the
 * same order as that section's callouts.
 */
const REDESIGN: Record<string, NonNullable<TeardownSection["mine"]>> = {
  "hero": {
    headline: "The original promise, <clearer focus>",
    shot: shot("latest-hero.webp", "Current hero: original headline, larger Pitch Us button, North America outline and vertical portfolio carousel", 2000, 1559),
    fixes: [
      {
            "title": "Original words",
            "why": "The headline is retained from the existing site, supported by its North American Seed-round focus."
      },
      {
            "title": "Navigation stays visible",
            "why": "The intro links move into a fixed header as you scroll."
      },
      {
            "title": "Regional focus",
            "why": "The enlarged North America outline anchors the hero around Toronto and New York."
      },
      {
            "title": "Portfolio proof",
            "why": "Company logos run vertically beside the headline, with links to their existing profiles."
      },
      {
            "title": "A larger pitch action",
            "why": "The blue Pitch Us button is prominent beneath the supporting sentence."
      }
]
  },
  "menu": {
    headline: "From intro <to header>",
    shot: shot("impression-centred-glass-intro.png", "Current intro: centred wordmark and navigation over the large glass Impression mark", 1280, 720),
    fixes: [
      {
            "title": "Links from arrival",
            "why": "Pitch Us, Portfolio, About, Team and Careers are available in the opening composition."
      },
      {
            "title": "Native scroll transition",
            "why": "The wordmark and links shrink into persistent navigation without intercepting scrolling."
      },
      {
            "title": "Immediate access",
            "why": "Investor Login and Skip intro remain visible in the utility bar."
      }
]
  },
  "portfolio": {
    headline: "Portfolio proof <beside the promise>",
    shot: shot("latest-hero.webp", "Vertical portfolio logo carousel beside the current hero headline", 2000, 1559),
    fixes: [
      {
            "title": "Authentic logos",
            "why": "Wealthsimple, Brim, Symend, Owl, 401GO and Trustate use the existing portfolio assets."
      },
      {
            "title": "Existing company profiles",
            "why": "Each company links to its original profile."
      },
      {
            "title": "One clear route",
            "why": "View Full Portfolio links directly to the complete collection."
      },
      {
            "title": "Vertical movement",
            "why": "The logo carousel occupies the right side of the hero; reduced motion and keyboard access are supported."
      }
]
  },
  "where-we-invest": {
    headline: "Fintech and Seed, <plainly stated>",
    shot: shot("latest-invest.webp", "Current Where we invest section showing fintech focus and Seed-stage investment criteria", 2000, 797),
    fixes: [
      {
            "title": "One section title",
            "why": "Where we invest introduces two readable columns."
      },
      {
            "title": "Sector and stage",
            "why": "Fintech specialists and Seed-stage experts state the firm’s focus directly."
      },
      {
            "title": "Shorter source copy",
            "why": "The existing website’s paragraphs are simplified into readable supporting text."
      },
      {
            "title": "Concrete entry criteria",
            "why": "Cheque size, round size, geography, a built product and a first customer are visible together."
      },
      {
            "title": "No unqualified performance figures",
            "why": "The current homepage omits historical percentages whose date and basis have not been established."
      }
]
  },
  "founder-support": {
    headline: "We don\u2019t just fund, <we partner>",
    shot: shot("latest-support.webp", "Four portrait cards with wireframe graphics for lead investments, introductions, operational support and guidance", 2000, 1063),
    fixes: [
      {
            "title": "Four concrete forms of support",
            "why": "Lead investments, introductions, operational support and guidance each have their own card."
      },
      {
            "title": "Wireframe visuals",
            "why": "Simple line drawings give each card a distinct visual anchor."
      },
      {
            "title": "Source-based descriptions",
            "why": "The explanations are shortened from the original website without adding promises."
      },
      {
            "title": "Room to read",
            "why": "Four portrait cards provide clear spacing for the heading, drawing and explanation."
      },
      {
            "title": "More detail on About",
            "why": "The About link leads to the existing strategy and team page."
      }
]
  },
  "testimonials": {
    headline: "Founder photos <beside their words>",
    shot: shot("latest-testimonials.webp", "Authentic founder photo beside the original Owl.co quote, with name, role and manual carousel controls", 2000, 1125),
    fixes: [
      {
            "title": "No filler heading",
            "why": "The section starts with the founder’s words."
      },
      {
            "title": "Authentic testimonials",
            "why": "The full original Owl.co and Trustate quotes are preserved."
      },
      {
            "title": "Horizontal composition",
            "why": "Original founder photos sit beside the quote instead of above it."
      },
      {
            "title": "Manual controls",
            "why": "Previous and next controls switch between the two testimonials without autoplay."
      }
]
  },
  "team": {
    headline: "Support on the homepage, <team on About>",
    shot: shot("latest-support.webp", "Founder support cards replace the homepage team profiles", 2000, 1063),
    fixes: [
      {
            "title": "One clear message",
            "why": "The partnership statement introduces the practical support."
      },
      {
            "title": "Support comes first",
            "why": "Founders can read what the firm offers after an investment."
      },
      {
            "title": "Team remains accessible",
            "why": "The Team header link goes to the existing About page team anchor."
      },
      {
            "title": "No homepage profiles",
            "why": "Team biographies and portraits remain on the original interior page."
      }
]
  },
  "advisors": {
    headline: "Advisors remain <on About>",
    shot: shot("impression-centred-glass-intro.png", "The current homepage navigation links to the original About page instead of displaying advisor profiles", 1280, 720),
    fixes: [
      {
            "title": "No extra homepage section",
            "why": "Advisor profiles are omitted from the redesigned homepage."
      },
      {
            "title": "A consistent homepage",
            "why": "The homepage focuses on investment fit, portfolio, support and founder voices."
      },
      {
            "title": "Existing biographies",
            "why": "The original About page retains the team and advisor information."
      },
      {
            "title": "Direct access",
            "why": "About and Team remain visible in the intro and compact header."
      }
]
  },
  "media": {
    headline: "Original coverage, <clearly dated>",
    shot: shot("latest-media.webp", "Current media section with dated original article links for Goose Insurance, Afficiency and Safekeep", 2000, 1153),
    fixes: [
      {
            "title": "Text on a plain surface",
            "why": "Headlines no longer compete with a background photograph."
      },
      {
            "title": "Original dates retained",
            "why": "The section presents coverage with its original dates, without describing it as recent news."
      },
      {
            "title": "Readable editorial rows",
            "why": "Each story has a date, headline and source."
      },
      {
            "title": "Working destinations",
            "why": "The retained articles link to Business Wire and FinTech Global; the placeholder announcement is omitted."
      }
]
  },
  "closing": {
    headline: "Pitch and contact, <kept simple>",
    shot: shot("latest-footer.webp", "Current minimal footer with Pitch Us, contact email, investor access and navigation", 2000, 423),
    fixes: [
      {
            "title": "Consistent pitch action",
            "why": "Pitch Us uses the existing submission destination throughout the homepage."
      },
      {
            "title": "Clear identity",
            "why": "The footer uses Impression Ventures and the current copyright year."
      },
      {
            "title": "Useful links",
            "why": "Contact, Team, Careers, Investor Login and Media kit remain accessible."
      }
]
  },
};

const withRedesign = (sections: TeardownSection[]) => sections.flatMap((section) => {
  const updated = { ...section, mine: REDESIGN[section.id] ?? section.mine };
  if (section.id !== "where-we-invest") return [updated];
  return [updated, {
    ...section,
    id: "founder-support",
    label: "Founder support",
    headline: "Practical support <after the cheque>",
    mine: REDESIGN["founder-support"],
  }];
});

export const impressionVentures: Teardown = {
  slug: "impression-ventures",
  firm: "Impression Ventures",
  url: "https://impression.ventures",
  date: "2026-10-07",
  thesis:
    "Impression Ventures invests in startups revolutionizing financial technology, from banking, insurance, and wealth management.",
  disclaimer:
    "Independent critique for my portfolio. Not affiliated with or endorsed by Impression Ventures. Screenshots are of their public site, shown for commentary.",
  sections: withRedesign([
    {
      id: "hero",
      label: "Hero",
      headline: "The hero <says nothing>",
      theirs: {
        src: `${dir}/01-hero.webp`,
        alt: "Impression Ventures homepage hero: 'Backing bold ideas that revolutionize financial services' on a blue background, with Portfolio and Investor Login buttons and a 'Send us your pitch' ring",
        width: 2000,
        height: 1130,
        callouts: [
          {
            x: 45,
            y: 52,
            side: "top",
            title: "Generic claim",
            body: "\"Bold ideas that revolutionize financial services\" could sit on any fintech fund's homepage. Nothing here says who they are or why a founder should pick them.",
          },
          {
            x: 81,
            y: 6.5,
            side: "top",
            title: "Nav hidden",
            body: "A hamburger menu on a wide desktop screen hides five links that would easily fit in the header.",
          },
          {
            x: 9,
            y: 62,
            side: "bottom",
            title: "Empty shapes",
            body: "The pale diagonals are decoration with no job — they don't frame the type or lead the eye anywhere.",
          },
          {
            x: 37,
            y: 75,
            side: "bottom",
            title: "Wrong 2nd CTA",
            body: "\"Investor Login\" gets the second slot in the hero. LPs already have the link; founders are the audience who need guiding.",
          },
          {
            x: 77,
            y: 68,
            side: "bottom",
            title: "Pitch CTA buried",
            body: "The one action founders came for — send a pitch — is small coral ring text on blue, rotating, and easy to read past.",
          },
        ],
      },
    },
    {
      id: "menu",
      label: "Menu",
      headline: "A menu <you scroll to find>",
      theirs: {
        src: `${dir}/01b-menu.webp`,
        alt: "Impression Ventures menu: opening it shows an empty blue screen with only the logo and a close arrow; the links (Pitch Us, Portfolio, About, Team, Careers), an Investor Login button and contact details sit below the fold",
        width: 2000,
        height: 2151,
        pending: true,
        callouts: [
          {
            x: 50,
            y: 25,
            side: "top",
            title: "Opens to nothing",
            body: "Tapping the three lines opens an empty blue screen. There's nothing to click until you scroll down to find the links.",
          },
          {
            x: 25,
            y: 72,
            side: "bottom",
            title: "Links below the fold",
            body: "Pitch Us, Portfolio, About, Team and Careers only appear after scrolling. A menu should show its options the moment it opens.",
          },
          {
            x: 65,
            y: 80,
            side: "bottom",
            title: "Investor Login again",
            body: "The only button in the menu is \"Investor Login\" — once more it outranks \"Pitch Us\".",
          },
        ],
      },
    },
    {
      id: "portfolio",
      label: "Portfolio",
      headline: "A portfolio <you can't see>",
      theirs: {
        src: `${dir}/02-portfolio.webp`,
        alt: "Impression Ventures portfolio carousel: cards for Fraction, Goose, HONK and Juno under a white overlay, each with a year pill and a stage pill",
        width: 2000,
        height: 699,
        callouts: [
          {
            x: 25,
            y: 45,
            side: "top",
            title: "Washed out",
            body: "A white wash sits over every logo and photo, so the companies they're proudest of look faded and disabled.",
          },
          {
            x: 70,
            y: 40,
            side: "top",
            title: "No outcomes",
            body: "Each card shows a year and a stage, but nothing about what happened next — raised, grew, exited.",
          },
          {
            x: 24.5,
            y: 80,
            side: "bottom",
            title: "Unreadable pills",
            body: "Green text on a green pill, and pale blue on pale blue. The year and stage are the only data here, and they're the hardest thing to read.",
          },
          {
            x: 93,
            y: 55,
            side: "bottom",
            title: "Carousel hides most",
            body: "A sideways carousel shows four companies at a time and cuts off the edges. Most of the portfolio is never seen.",
          },
        ],
      },
    },
    {
      id: "where-we-invest",
      label: "Where we invest",
      headline: "The proof is <buried>",
      theirs: {
        src: `${dir}/03-where-we-invest.webp`,
        alt: "Where We Invest section: an all-caps heading beside a sentence-case headline, and four pastel cards — Fintech Specialists, Seed Stage Experts, Lead Investments, Guide and Engage — with long body copy and an 84% stat inside card 02",
        width: 2000,
        height: 1992,
        callouts: [
          {
            x: 26,
            y: 10,
            side: "top",
            title: "Split header",
            body: "A header on the left and a header plus subheader on the right pull the eye in two directions and hurt readability. Keep it to one simple title, or move the extra copy to its own page.",
          },
          {
            x: 70,
            y: 13,
            side: "top",
            title: "Subheader overload",
            body: "\"Let's reshape the financial landscape of tomorrow, together\" plus \"our approach is like family\" add two more lines to read before the content starts, and say little a founder can use.",
          },
          {
            x: 30,
            y: 59,
            side: "bottom",
            title: "Too text heavy",
            body: "Nice brand identity, but the cards are extremely text heavy — card 01 alone runs eleven lines. A main page shouldn't read like this; the detail belongs on its own page.",
          },
          {
            x: 57,
            y: 63.5,
            side: "bottom",
            title: "84% buried",
            body: "\"84% went on to raise a Series A or exit\" is the strongest thing on the site, and it's halfway down the second card.",
          },
          {
            x: 61,
            y: 73,
            side: "bottom",
            title: "Fine print",
            body: "A tiny italic footnote under the stat quietly narrows it. Proof works better when the caveat sits next to it in plain sight.",
          },
        ],
      },
    },
    {
      id: "testimonials",
      label: "Testimonials",
      headline: "One quote <at a time>",
      theirs: {
        src: `${dir}/04-testimonials.webp`,
        alt: "Hear It From Others section: a two-part heading and a carousel with one founder headshot and quote signed 'Dan, CEO', with left and right arrow buttons",
        width: 2000,
        height: 935,
        callouts: [
          {
            x: 30,
            y: 15,
            side: "top",
            title: "Same pattern again",
            body: "The all-caps label plus sentence-case headline pattern repeats, so every section opens the same way.",
          },
          {
            x: 75,
            y: 19,
            side: "top",
            title: "Says it twice",
            body: "\"Real stories, real success\" and \"our collaborative approach has helped…\" say the same thing in two sizes.",
          },
          {
            x: 25,
            y: 60,
            side: "bottom",
            title: "Messy photos",
            body: "The photos don't match — a studio headshot on grey, then an office shot. Unless they're consistent, drop them. A horizontally scrolling row of quotes would show more at once than one slide behind arrows.",
          },
          {
            x: 48.5,
            y: 86,
            side: "bottom",
            title: "\"Dan, CEO\"",
            body: "First name only. A testimonial with no full name or company next to it is hard to trust.",
          },
        ],
      },
    },
    {
      id: "team",
      label: "Team",
      headline: "Faces <before ethos>",
      theirs: {
        src: `${dir}/04b-team.webp`,
        alt: "Who We Are section: a split heading 'Meet Our Team: Driving Venture Capital Success' and five tall black-and-white headshots with no names",
        width: 2000,
        height: 1217,
        callouts: [
          {
            x: 17,
            y: 5,
            side: "top",
            title: "Split header again",
            body: "The same left-header, right-header-plus-subheader layout as every other section, with one more stock line: \"Driving Venture Capital Success\".",
          },
          {
            x: 72,
            y: 17,
            side: "top",
            title: "Ethos missing",
            body: "Founders and investors want to know what the fund believes and how it backs companies. That belongs here, not a row of portraits.",
          },
          {
            x: 30,
            y: 72,
            side: "bottom",
            title: "Hover for names",
            body: "Names only appear on hover. Putting a face to the firm is nice, but to a new founder or investor five unnamed portraits feel random, and hovering each one costs time.",
          },
          {
            x: 83,
            y: 85,
            side: "bottom",
            title: "Takes a whole screen",
            body: "Tall portrait strips fill the viewport on the main page. Faces fit better in an About page, kept small.",
          },
        ],
      },
    },
    {
      id: "advisors",
      label: "Advisors",
      headline: "Faces, <no names>",
      theirs: {
        src: `${dir}/05-advisors.webp`,
        alt: "Our Advisors section: five black-and-white headshots in a three-plus-two grid, with no names or titles",
        width: 2000,
        height: 957,
        callouts: [
          {
            x: 22,
            y: 8,
            side: "top",
            title: "Tiny heading",
            body: "\"Our Advisors\" is set smaller than body copy elsewhere on the site, so the section has no clear start.",
          },
          {
            x: 80,
            y: 31,
            side: "top",
            title: "Crowded right",
            body: "Every headshot sits hard against the right edge of its frame, leaving two-thirds of each card empty grey.",
          },
          {
            x: 30,
            y: 80,
            side: "bottom",
            title: "Who are they?",
            body: "No names, roles or links. I want to see a name next to each face and a one-line background on who they are — anonymous faces lend no credibility.",
          },
          {
            x: 75,
            y: 75,
            side: "bottom",
            title: "Too much space",
            body: "Five large photos in a three-column grid take a full screen and leave an empty slot that looks like a missing image. Better moved to the About page.",
          },
        ],
      },
    },
    {
      id: "media",
      label: "In the media",
      headline: "News that <looks old>",
      theirs: {
        src: `${dir}/06-media.webp`,
        alt: "Find Impression in the media: a tinted team photo with blue heading text over it, beside a list of four press headlines dated 2022 to 2023",
        width: 2000,
        height: 1121,
        callouts: [
          {
            x: 27,
            y: 24,
            side: "top",
            title: "Lost headline",
            body: "Blue heading text over a busy, pink-tinted photo — the window blinds and skyline run straight through the letters.",
          },
          {
            x: 82,
            y: 29,
            side: "top",
            title: "3+ years old",
            body: "Every story is more than three years old. Unless it still applies today, skip this section — dated news on a homepage makes the whole site look unmaintained.",
          },
          {
            x: 55,
            y: 58,
            side: "bottom",
            title: "Easy to skip",
            body: "A plain list of text links is easy to scroll past. A horizontal row with a picture for each story would earn a second look.",
          },
          {
            x: 67,
            y: 40,
            side: "bottom",
            title: "Same opening",
            body: "Most titles start with \"Impression Ventures…\", so the eye can't pick out what each story is about.",
          },
        ],
      },
    },
    {
      id: "closing",
      label: "Closing CTA",
      headline: "A third voice <at the end>",
      theirs: {
        src: `${dir}/07-closing.webp`,
        alt: "Closing section: large 'Got what it takes to be bold?' headline with a coral Pitch Us button, then a footer with links and a filled Investor Login button",
        width: 2000,
        height: 929,
        callouts: [
          {
            x: 55,
            y: 41,
            side: "top",
            title: "CTA too low",
            body: "Solid footer, but the strongest pitch button on the site only shows up at the very bottom, in a new coral accent. It should be much higher — this loud from the top.",
          },
          {
            x: 50,
            y: 97,
            side: "bottom",
            title: "Wrong domain",
            body: "The copyright line names impressionventures.com, but the site lives at impression.ventures.",
          },
          {
            x: 84,
            y: 82,
            side: "bottom",
            title: "LPs win again",
            body: "In the footer, \"Investor Login\" is the only filled button — still the strongest thing in the row.",
          },
        ],
      },
    },
  ]),
  redesignHref: "/work/case-studies/impression-ventures/redesign",
  collateral: [
    { src: `${dir}/brand/poster-pitch-night.png`, alt: "Pitch Night event poster: blue, tall white PITCH NIGHT, an orange date block and event details", width: 1200, height: 1696 },
    { src: `${dir}/brand/poster-breakfast.png`, alt: "Fintech Breakfast event poster: orange, italic serif Breakfast, and a cup holding a rising blue bar chart", width: 1200, height: 1696 },
    { src: `${dir}/brand/napkins.png`, alt: "Two cocktail napkins: a white one with a blue IV monogram and an orange one reading Sketch your pitch here above a grid", width: 2400, height: 1600 },
    { src: `${dir}/brand/cup.png`, alt: "Paper coffee cup with an orange lid and a blue sleeve reading GOT WHAT IT TAKES?", width: 1600, height: 1600 },
  ],
  principles: [
    {
      title: "Lead with proof",
      body: "Company logos and authentic founder testimonials support the investment proposition.",
    },
    {
      title: "One voice",
      body: "One headline style, one accent colour, used the same way in every section.",
    },
    {
      title: "Less on the homepage",
      body: "Team and advisor profiles stay on About. The homepage focuses on the investment proposition, fit, founder support, testimonials and dated coverage.",
    },
    {
      title: "Founders first",
      body: "Every primary button should lead to a pitch. LPs can find their login in the footer.",
    },
  ],
};
