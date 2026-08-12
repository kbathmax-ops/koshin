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
    "Case studies by Koshin: Snap Toronto (teaching AI to small business owners across the Americas), Sanctions Precedent (AI-powered sanctions research engine), Toronto Cafe Roulette, and Tattoos by Jess (social media growth marketing). Built with Next.js, Claude API, and Supabase.",
  openGraph: {
    title: "Work & Projects — AI, Marketing & Research | Koshin",
    description:
      "Student developer and marketer case studies: teaching AI to small business owners across the Americas, an AI sanctions research engine, a curated Toronto cafe finder, and growing a tattoo artist's audience by 2k.",
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
      "@type": "EducationalOrganization",
      position: 1,
      name: "Snap Toronto",
      description:
        "Events and webinars teaching small business owners in cities across the Americas how to use AI for admin work — invoicing, scheduling, and follow-ups.",
      url: "https://snaptoronto.org",
    },
    {
      "@type": "SoftwareApplication",
      position: 2,
      name: "Sanctions Precedent",
      description: "AI-powered sanctions research engine built with Next.js, Claude API, and Supabase.",
      applicationCategory: "ResearchApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 3,
      name: "Toronto Cafe Roulette",
      description: "A curated roulette of Toronto's best independent cafes for coffee chats.",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 4,
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
    id: "snap-toronto",
    name: "Snap Toronto",
    href: "https://snaptoronto.org",
    description:
      "Teaching AI to small business owners in cities across the Americas — events and webinars on using it for the admin work nobody enjoys: invoicing, scheduling, follow-ups. What I'm building during my gap year.",
    image: "/snap-toronto-hero.png",
  },
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
    id: "the-window-seat",
    name: "The Window Seat",
    href: "https://thewindowseat.vercel.app",
    description:
      "A travel personality quiz for builders and founders. Six questions return three countries, each framed by the lesson it tends to teach — matched deterministically against a database built from real first-person travel essays, with every entry citing its source.",
    image: "/thewindowseat-hero.png",
  },
];

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

        {/* ── Project cards ── */}
        <section>
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
                  <p style={{ color: 'rgba(18,35,63,0.70)' }}>
                    looking for growth, content, ugc, ai consulting? I'll get back to you within a day
                  </p>
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
