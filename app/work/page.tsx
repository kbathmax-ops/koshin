import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { WorkHillsHero } from "@/components/work-hills-hero";

export const metadata: Metadata = {
  title: "Work & Projects — AI, Marketing & Research",
  description:
    "Case studies by Koshin: Sanctions Precedent (AI-powered sanctions research engine), Ember (wildfire alert app), and Tattoos by Jess (social media growth marketing). Built with Next.js, Claude API, and Supabase.",
  openGraph: {
    title: "Work & Projects — AI, Marketing & Research | Koshin",
    description:
      "Student developer and marketer case studies: AI sanctions research engine, wildfire alert app, and growing a tattoo artist's audience by 2k and booking her out months in advance.",
    url: "https://portfolio-koshin2.vercel.app/work",
  },
  alternates: { canonical: "https://portfolio-koshin2.vercel.app/work" },
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
      name: "Ember",
      description: "Hyperlocal wildfire smoke alert app for BC and AB residents, with address-level AQHI monitoring.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
    },
  ],
};

type Project = {
  id: string;
  name: string;
  href: string;
  description: string;
  tags: string[];
  image: string;
  problem: string;
  solution: string;
  stack: string[];
};

const projects: Project[] = [
  {
    id: "sanctions-precedent",
    name: "Sanctions Precedent",
    href: "https://sanctions-precedent-qo0om9rrh-koshin2.vercel.app",
    description:
      "An AI-powered research engine that surfaces historical sanctions precedents by sector, intensity, and geopolitical objective. Built for policy analysts and legal researchers.",
    tags: ["Claude API", "Supabase"],
    image: "/sanctions-precedent-hero.png",
    problem: "Policy analysts searching for comparable sanctions cases have to trawl through thousands of legal documents manually. There's no searchable, structured database.",
    solution: "Natural language search over a curated Supabase corpus of historical sanctions regimes. Claude analyzes the query, retrieves relevant precedents, and synthesises a structured brief.",
    stack: ["Next.js", "Claude API", "Anthropic SDK", "Supabase"],
  },
  {
    id: "ember",
    name: "Ember",
    href: "https://ember-app-psi.vercel.app/",
    description:
      "Hyperlocal wildfire smoke alerts for BC and AB residents. Alerts tied to your exact address, not your entire community.",
    tags: ["Next.js", "Claude API"],
    image: "/ember-hero.png",
    problem: "Community-wide air quality alerts are too broad. They don't tell you whether your specific address is actually in a danger zone.",
    solution: "Address-level AQHI monitoring with a reserve-list system that SMS-notifies you the moment smoke reaches your location.",
    stack: ["Next.js", "Claude API", "TypeScript", "Vercel"],
  },
  {
    id: "toronto-cafe-roulette",
    name: "Toronto Cafe Roulette",
    href: "https://toronto-cafe-roulette.vercel.app/",
    description:
      "Spin the wheel and discover your next coffee chat. A curated roulette of Toronto's best independent cafes, hand-picked for quality and atmosphere.",
    tags: ["Next.js", "Design"],
    image: "/toronto-cafe-roulette-hero.png",
    problem: "Toronto has hundreds of incredible independent cafes but finding the right one for a coffee chat means scrolling through generic Yelp lists and guessing.",
    solution: "A dead-simple roulette that surfaces only high-quality, curated spots. Spin once, get a great cafe, stop overthinking it.",
    stack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
  {
    id: "tattoos-by-jess",
    name: "Tattoos by Jess",
    href: "https://www.instagram.com/tattoosbyjess.ca",
    description:
      "Full-stack social media marketing for an independent tattoo artist. Grew her combined following by 2k and booked her out months in advance.",
    tags: ["Growth Marketing", "Social Media"],
    image: "/tattoos-by-jess-hero.png",
    problem: "Jess had exceptional work but no real online presence. She was relying entirely on word-of-mouth with no pipeline of inbound bookings.",
    solution: "Built and executed a content strategy across platforms, optimized her profile positioning, and turned her social into a booking engine that filled her calendar months out.",
    stack: ["Instagram", "Content Strategy", "Brand Positioning", "Audience Growth"],
  },
];

export default function WorkPage() {
  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* ── Hills Hero ── */}
      <WorkHillsHero />

      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 pb-32">

        {/* ── Project cards ── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.08}>
                <div id={project.id} className="group scroll-mt-28">
                  {/* Image — clicks through to live project */}
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="block rounded-[1.5rem] overflow-hidden mb-8 transition-transform duration-500 group-hover:-translate-y-2" style={{ background: '#111111', boxShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
                    <div className="aspect-[16/10] relative">
                      <Image
                        src={project.image}
                        alt={`${project.name} — project by Koshin`}
                        fill
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </a>

                  {/* Info */}
                  <div className="px-2">
                    <h3
                      className="font-bold text-3xl mb-3"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-base leading-relaxed max-w-md mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {project.description}
                    </p>


                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-black transition-opacity hover:opacity-100"
                        style={{ color: '#c4956a', opacity: 0.85 }}
                      >
                        View Project <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto py-16">
          <FadeUp>
            <div
              className="rounded-[2rem] p-12 relative overflow-hidden"
              style={{ background: '#111111', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(196,149,106,0.06)' }} />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2
                    className="font-extrabold text-4xl tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
                  >
                    Let&apos;s build
                    <br />
                    something together.
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                    website design, building projects with ai, growth marketing? Open to everything marketing-engineer-esque
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex flex-col items-center gap-2 px-12 py-14">
          <span
            className="text-lg font-black tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#ffffff' }}
          >
            koshin<span style={{ color: '#c4956a' }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
