import type { Teardown } from "./types";

const dir = "/case-studies/impression-ventures";

/*
 * Callout copy is a first draft — rewrite freely. x/y are percentages of the
 * screenshot, so arrows stay pinned at any width. Within a row, list callouts
 * left to right so the arrows never cross.
 */
export const impressionVentures: Teardown = {
  slug: "impression-ventures",
  firm: "Impression Ventures",
  url: "https://impression.ventures",
  date: "2026-10-07",
  thesis:
    "Impression Ventures has the proof a founder wants to see: 84% of its investments went on to raise a Series A or exit. The site hides it mid-card, under headlines that could belong to any fund. This is a section-by-section look at what gets in the way, and what I'd change.",
  disclaimer:
    "Independent critique for my portfolio. Not affiliated with or endorsed by Impression Ventures. Screenshots are of their public site, shown for commentary.",
  sections: [
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
            title: "Stale dates",
            body: "The newest story shown is from early 2023. Dated news on a homepage makes the whole site look unmaintained.",
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
            title: "New type style",
            body: "A third headline style, and a new coral accent, appear only at the very end. The pitch should have looked this loud from the top.",
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
  ],
  principles: [
    {
      title: "Lead with proof",
      body: "The 84% stat does more than any adjective. Put it where the claim is.",
    },
    {
      title: "One voice",
      body: "One headline style, one accent colour, used the same way in every section.",
    },
    {
      title: "Founders first",
      body: "Every primary button should lead to a pitch. LPs can find their login in the footer.",
    },
  ],
};
