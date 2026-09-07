import type { Metadata } from "next";
import Image from "next/image";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { WorkHillsHero } from "@/components/work-hills-hero";

export const metadata: Metadata = {
  title: "Work & Projects — AI, Marketing & Research",
  description:
    "Case studies by Koshin: Snap Toronto (identity and site design for a Toronto AI workshop series), Sanctions Precedent (AI-powered sanctions research engine), The Window Seat (a travel personality quiz built on real travel essays), detour (a Chrome extension that hides US layovers), Toronto Cafe Roulette, and Tattoos by Jess (social media growth marketing). Built with Next.js, Claude API, and Supabase.",
  openGraph: {
    title: "Work & Projects — AI, Marketing & Research | Koshin",
    description:
      "Student developer and marketer case studies: identity and site design for a Toronto AI workshop series, an AI sanctions research engine, a travel personality quiz built on real travel essays, a Chrome extension that hides US layovers, a curated Toronto cafe finder, and growing a tattoo artist's audience by 2k.",
    url: "https://kbathmax.com/work",
  },
  alternates: { canonical: "https://kbathmax.com/work" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Koshin — Student Developer",
  description: "AI-powered software projects by a 17-year-old developer and student founder.",
  itemListElement: [
    {
      "@type": "SoftwareApplication",
      position: 1,
      name: "Sanctions Precedent",
      description: "AI-powered sanctions research engine built with Next.js, Claude API, and Supabase.",
      applicationCategory: "ResearchApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 2,
      name: "Toronto Cafe Roulette",
      description: "A curated roulette of Toronto's best independent cafes for coffee chats.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 3,
      name: "detour",
      description:
        "Chrome extension that hides flight results routing through the US or its territories on Google Flights.",
      applicationCategory: "TravelApplication",
      operatingSystem: "Chrome",
      url: "https://detour-landing-roan.vercel.app",
    },
    {
      "@type": "CreativeWork",
      position: 4,
      name: "Snap Toronto — identity & site design",
      description:
        "Identity and site design for a Toronto AI workshop series: condensed display type, a hand-drawn mark, and full-bleed photography of the businesses it serves.",
      url: "https://snaptoronto.org",
    },
    {
      "@type": "CreativeWork",
      position: 5,
      name: "Toronto's Hot Take Slideshow Night — event poster",
      description:
        "Poster design for a Toronto slideshow night: hand-drawn brush lettering over a photograph of the room.",
    },
    {
      "@type": "CreativeWork",
      position: 6,
      name: "Ocean Management — brand identity & deck",
      description:
        "Identity and pitch deck for a Toronto influencer management agency: a geometric wordmark with the brand's shapes set into its counters.",
    },
    {
      "@type": "SoftwareApplication",
      position: 7,
      name: "The Window Seat",
      description: "A travel personality quiz matching you to three countries from a database of real first-person travel essays.",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
    },
  ],
};

type Project = {
  id: string;
  name: string;
  href: string;
  description: string;
  image: string;
  /** Live site is down — flags the card with a red marker. */
  unavailable?: boolean;
};

const projects: Project[] = [
  {
    id: "toronto-cafe-roulette",
    name: "Toronto Cafe Roulette",
    href: "https://toronto-cafe-roulette.vercel.app/",
    description:
      "Spin the wheel and discover your next coffee chat. A curated roulette of Toronto's best independent cafes, hand-picked for quality and atmosphere.",
    image: "/toronto-cafe-roulette-hero.png",
  },
  {
    id: "tattoos-by-jess",
    name: "Tattoos by Jess",
    href: "https://www.instagram.com/tattoosbyjess.ca",
    description:
      "Full-stack social media marketing for an independent tattoo artist. Grew her combined following by 2k and booked her out months in advance.",
    image: "/tattoos-by-jess-hero.png",
  },
  {
    id: "sanctions-precedent",
    name: "Sanctions Precedent",
    href: "https://sanctions-precedent-qo0om9rrh-koshin2.vercel.app",
    description:
      "An AI-powered research engine that surfaces historical sanctions precedents by sector, intensity, and geopolitical objective. Built for policy analysts and legal researchers.",
    image: "/sanctions-precedent-hero.png",
    unavailable: true,
  },
  {
    id: "detour",
    name: "detour",
    href: "https://detour-landing-roan.vercel.app",
    description:
      "A Chrome extension for people who would rather not transit the United States. On Google Flights it hides every itinerary connecting through the US or its territories — a filter no major search engine offers. No account, no analytics, no network calls: your on/off preference and the last result count stay on your own machine.",
    image: "/detour-landing-hero.jpg",
  },
  {
    id: "the-window-seat",
    name: "The Window Seat",
    href: "https://thewindowseat.vercel.app",
    description:
      "A travel personality quiz for builders and founders. Six questions return three countries, each framed by the lesson it tends to teach — matched deterministically against a database built from real first-person travel essays, with every entry citing its source.",
    image: "/thewindowseat-hero.png",
  },
];

type Shot = {
  src: string;
  alt: string;
  /** Caption under the shot — what part of the design it shows. */
  label: string;
  width: number;
  height: number;
};

type DesignProject = {
  id: string;
  name: string;
  /** Omitted for pieces with nowhere to link out to — print and event work. */
  href?: string;
  role: string;
  year: string;
  description: string;
  shots: Shot[];
};

const designWork: DesignProject[] = [
  {
    id: "snap-toronto",
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
    ],
  },
  {
    id: "hot-take-slideshow-night",
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
    name: "Ocean Management",
    role: "Brand identity & deck",
    year: "2026",
    description:
      "Identity and pitch deck for a Toronto influencer management agency. A geometric sans wordmark with two of its counters knocked out and replaced by the brand's own shapes — a red pill carrying the year, a gold one carrying the wave mark — over a warm off-white. Where the deck needs to raise its voice it goes full-bleed gold with justified all-caps.",
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

/**
 * Brand work is still being built in private. Set SHOW_BRAND_WORK=true in
 * .env.local to see it in dev; it stays off (and out of the client bundle)
 * everywhere it isn't set, so nothing ships to production.
 */
const SHOW_BRAND_WORK = process.env.SHOW_BRAND_WORK === "true";

/** One shot in the design gallery — clicks through to the live site when there is one. */
function Screenshot({ shot, href, full = false }: { shot: Shot; href?: string; full?: boolean }) {
  const frameClass = "block rounded-[1rem] overflow-hidden transition-transform duration-500";
  const frameStyle = { background: '#e2e2e2', boxShadow: '0 6px 24px rgba(18,35,63,0.13)' };
  const image = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={full ? "(min-width: 768px) 1152px, 100vw" : "(min-width: 768px) 560px, 100vw"}
      className="w-full h-auto"
    />
  );

  return (
    <figure>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${frameClass} hover:-translate-y-1.5`}
          style={frameStyle}
        >
          {image}
        </a>
      ) : (
        <div className={frameClass} style={frameStyle}>
          {image}
        </div>
      )}
      <figcaption className="text-xs mt-3 px-1 leading-relaxed" style={{ color: 'rgba(18,35,63,0.55)' }}>
        {shot.label}
      </figcaption>
    </figure>
  );
}

export default function WorkPage() {
  return (
    <div style={{ background: '#d9d9d9', minHeight: '100dvh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* ── Hills Hero ── */}
      <WorkHillsHero />

      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-32 pb-32">

        {/* ── Builds ── */}
        <section id="builds" className="scroll-mt-28">
          <FadeUp>
            <h2
              className="font-extrabold text-4xl md:text-5xl tracking-tighter mb-3"
              style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
            >
              Builds
            </h2>
            <p className="text-base mb-10 md:mb-14 max-w-xl leading-relaxed" style={{ color: 'rgba(18,35,63,0.70)' }}>
              Things I&apos;ve shipped — most of them live, all of them started as an experiment.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {projects.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.08}>
                <div id={project.id} className="group scroll-mt-28">
                  {/* Image — clicks through to live project */}
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="block rounded-[1rem] overflow-hidden mb-4 transition-transform duration-500 group-hover:-translate-y-1.5" style={{ background: '#e2e2e2', boxShadow: '0 6px 24px rgba(18,35,63,0.13)' }}>
                    <div className="aspect-[16/10] relative">
                      <Image
                        src={project.image}
                        alt={`${project.name} — project by Koshin`}
                        fill
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                    </div>
                  </a>

                  {/* Info */}
                  <div className="px-1">
                    <h3
                      className="font-bold text-xl mb-1.5 flex items-center gap-1.5"
                      style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
                    >
                      {project.name}
                      {project.unavailable && (
                        <AlertCircle className="h-4 w-4 shrink-0" style={{ color: '#c0392b' }} aria-hidden />
                      )}
                    </h3>
                    {project.unavailable && (
                      <p className="text-xs font-semibold mb-1.5" style={{ color: '#c0392b' }}>
                        (currently unavailable)
                      </p>
                    )}
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(18,35,63,0.72)' }}>
                      {project.description}
                    </p>

                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-black transition-opacity hover:opacity-100"
                      style={{ color: '#2f5d9e', opacity: 0.85 }}
                    >
                      View Project <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Design ── */}
        <section id="design" className="scroll-mt-28">
          <FadeUp>
            <h2
              className="font-extrabold text-4xl md:text-5xl tracking-tighter mb-3"
              style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
            >
              Design
            </h2>
            <p className="text-base mb-10 md:mb-14 max-w-xl leading-relaxed" style={{ color: 'rgba(18,35,63,0.70)' }}>
              Identity and interface work — the look of a thing before it&apos;s the code of a thing.
            </p>
          </FadeUp>

          <div className="space-y-20 md:space-y-28">
            {designWork.map((project) => (
              <div key={project.id} id={`design-${project.id}`} className="scroll-mt-28">
                {/* Header */}
                <FadeUp>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end mb-6 md:mb-8 pb-6" style={{ borderBottom: '1px solid rgba(18,35,63,0.14)' }}>
                    <div className="md:col-span-5">
                      <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2" style={{ color: 'rgba(18,35,63,0.45)' }}>
                        {project.role} · {project.year}
                      </p>
                      <h3
                        className="font-extrabold text-3xl md:text-4xl tracking-tighter"
                        style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <div className="md:col-span-7 md:pl-8">
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(18,35,63,0.72)' }}>
                        {project.description}
                      </p>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-black transition-opacity hover:opacity-100"
                          style={{ color: '#2f5d9e', opacity: 0.85 }}
                        >
                          Visit {project.href.replace('https://', '')} <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </FadeUp>

                {/* Screenshots — hero full width, then the tall one beside a stack of the short ones */}
                {project.shots.length <= 2 ? (
                  <div
                    className={`grid grid-cols-1 gap-6 md:gap-8 items-start${
                      project.shots.length === 2 ? " md:grid-cols-2" : ""
                    }`}
                  >
                    {project.shots.map((shot, i) => (
                      <FadeUp key={shot.src} delay={i * 0.08}>
                        <Screenshot
                          shot={shot}
                          href={project.href}
                          full={project.shots.length === 1}
                        />
                      </FadeUp>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                    {project.shots.slice(0, 2).map((shot, i) => (
                      <FadeUp
                        key={shot.src}
                        delay={i * 0.08}
                        className={i === 0 ? "md:col-span-2" : undefined}
                      >
                        <Screenshot shot={shot} href={project.href} full={i === 0} />
                      </FadeUp>
                    ))}
                    <div className="space-y-6 md:space-y-8">
                      {project.shots.slice(2).map((shot, i) => (
                        <FadeUp key={shot.src} delay={(i + 2) * 0.08}>
                          <Screenshot shot={shot} href={project.href} />
                        </FadeUp>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Brand work — in progress, private until it's ready ── */}
        {SHOW_BRAND_WORK && (
          <section id="brand-work" className="scroll-mt-28">
            <FadeUp>
              <h2
                className="font-extrabold text-4xl md:text-5xl tracking-tighter mb-3"
                style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
              >
                Brand work
              </h2>
              <p className="text-base max-w-xl leading-relaxed" style={{ color: 'rgba(18,35,63,0.70)' }}>
                Marketing, content, and growth work for brands. In progress.
              </p>
            </FadeUp>
          </section>
        )}

        {/* ── Contact ── */}
        <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto py-16">
          <FadeUp>
            <div
              className="rounded-[2rem] p-6 md:p-12 relative overflow-hidden"
              style={{ background: '#e2e2e2', boxShadow: '0 10px 40px rgba(18,35,63,0.12)' }}
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(47,93,158,0.06)' }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2
                    className="font-extrabold text-4xl tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
                  >
                    Let&apos;s build
                    <br />
                    something together.
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#d9d9d9', borderTop: '1px solid rgba(18,35,63,0.10)' }}>
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-black tracking-tighter"
            style={{ fontFamily: "'Public Sans', sans-serif", color: '#12233f' }}
          >
            koshin<span style={{ color: '#2f5d9e' }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(18,35,63,0.45)' }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
