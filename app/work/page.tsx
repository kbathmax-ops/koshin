import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";
import { WorkHillsHero } from "@/components/work-hills-hero";

export const metadata: Metadata = {
  title: "Work & Projects — AI, Travel & Policy Research",
  description:
    "Case studies by Koshin: Sanctions Precedent (AI-powered sanctions research engine), Euro Summer Planner (travel app), and AI Travel Agent (B2B SaaS). Built with Next.js, Claude API, and Supabase.",
  openGraph: {
    title: "Work & Projects — AI, Travel & Policy Research | Koshin",
    description:
      "Student developer case studies: AI sanctions research engine, travel planning app, and autonomous B2B booking agent — built with Next.js and Claude API.",
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
      description: "AI-powered sanctions research engine built with Next.js, Claude API, and Supabase. Surfaces historical sanctions precedents by sector, intensity, and geopolitical objective.",
      applicationCategory: "ResearchApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 2,
      name: "Euro Summer Planner",
      description: "Travel planning web app for multi-city European itineraries. Built with Next.js and TypeScript.",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
    },
    {
      "@type": "SoftwareApplication",
      position: 3,
      name: "AI Travel Agent",
      description: "B2B AI autopilot for travel agencies using Claude Managed Agents API. Cuts booking time from hours to minutes.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
    },
  ],
};

const projects = [
  {
    id: "sanctions-precedent",
    name: "Sanctions Precedent",
    description:
      "An AI-powered research engine that surfaces historical sanctions precedents by sector, intensity, and geopolitical objective — built for policy analysts and legal researchers.",
    tags: ["Claude API", "Supabase"],
    tagColors: ["bg-primary-container text-on-primary-container", "bg-tertiary-fixed-dim text-on-tertiary-fixed"],
    image: "/sanctions-precedent-hero.png",
    year: "2025",
    status: "Live",
    problem: "Policy analysts searching for comparable sanctions cases have to trawl through thousands of legal documents manually — there's no searchable, structured database.",
    solution: "Natural language search over a curated Supabase corpus of historical sanctions regimes. Claude analyzes the query, retrieves relevant precedents, and synthesises a structured brief with sector, intensity, and outcome.",
    stack: ["Next.js", "Claude API", "Anthropic SDK", "OpenAI", "Supabase"],
  },
  {
    id: "euro-summer",
    name: "Euro Summer Planner",
    description:
      "A collaborative itinerary builder for long-form European trips. Designed with a focus on tactile map interactions and day-by-day planning.",
    tags: ["Next.js", "TypeScript"],
    tagColors: ["bg-primary-container text-on-primary-container", "bg-secondary-container text-on-secondary-container"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNE8-wu4P5WDdPGNyiM6qUC8Refww4EcTaGZMOxG-xz5MK9HymbXhVboOpua6OKyS3kNmVFolgFxes2tGQPxPLFFpmE-wWAih5pBkHqLbTyfkMM71slNnmR8FouIvI0Pprv5v9HJadYTlHlV_C62kZohyMRObiLj6bYm9ZXBbWeKSKLdfieIWAHVWixWHSnm3kDJEgfjrTNpHDZrC4rpsRHhv5WIRUbo7hl1NMEDdZKDKPxY08qzREZJ4lJ2AjyDukfjp3l5N68YGP",
    year: "2025",
    status: "Live",
    problem: "Planning a multi-city Euro trip involves dozens of tabs, spreadsheets, and hours coordinating transport and accommodation.",
    solution: "A single web app with drag-and-drop city planning, auto-calculated travel times, and a shareable day-by-day itinerary.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel"],
  },
];

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* ── Hills Hero ── */}
      <WorkHillsHero />

      <main className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">

        {/* ── Selected Works ── */}
        <section>
          <FadeUp>
            <div className="flex justify-between items-baseline mb-16">
              <h2
                className="font-extrabold text-4xl text-primary tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Selected Works
              </h2>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-on-surface-variant">
                2025 — 2026
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <FadeUp
                key={project.id}
                delay={i * 0.08}
                className={i % 2 === 1 ? "md:mt-24" : ""}
              >
                <div id={project.id} className="group cursor-pointer scroll-mt-28">
                  {/* Image */}
                  <div className="bg-surface-container-low rounded-[1.5rem] overflow-hidden mb-8 shadow-[0_10px_30px_rgba(28,28,22,0.05)] transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="aspect-[16/10] relative">
                      <Image
                        src={project.image}
                        alt={`${project.name} — project by Koshin, student developer`}
                        fill
                        className="object-cover mix-blend-multiply opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, ti) => (
                        <span
                          key={tag}
                          className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider ${project.tagColors[ti]}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3
                      className="font-bold text-3xl mb-3 text-primary"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-on-surface-variant text-base leading-relaxed max-w-md mb-6">
                      {project.description}
                    </p>

                    {/* Mini case study */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-surface-container-low rounded-[1rem] p-4">
                        <p className="text-xs font-black text-secondary uppercase tracking-widest mb-2">
                          Problem
                        </p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {project.problem}
                        </p>
                      </div>
                      <div className="bg-surface-container-low rounded-[1rem] p-4">
                        <p className="text-xs font-black text-secondary uppercase tracking-widest mb-2">
                          Solution
                        </p>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-bold text-primary"
                        >
                          {s}
                        </span>
                      ))}
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
            <div className="bg-surface-container-low rounded-[2rem] p-12 shadow-[0_10px_30px_rgba(28,28,22,0.05)] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2
                    className="font-extrabold text-4xl text-primary tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Let&apos;s build
                    <br />
                    something together.
                  </h2>
                  <p className="text-on-surface-variant">
                    Available for technical internships and freelance projects.
                    I reply to everything.
                  </p>
                  <div className="mt-8 flex gap-3 items-center">
                    <span className="text-secondary">@</span>
                    <span className="font-bold text-primary text-sm">
                      github.com/koshinbathmax
                    </span>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </FadeUp>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low mt-24">
        <div className="flex flex-col items-center gap-2 px-12 py-14">
          <span
            className="text-lg font-black text-primary tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            koshin<span className="text-secondary">.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary/40">
            © 2026
          </p>
        </div>
      </footer>
    </>
  );
}
