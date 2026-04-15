import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { ContactForm } from "@/components/contact-form";

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
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9JGjLVE3XuFuzZhYfPp_Y2bc5JjfxSNISNmZePObkfKg9gr74hFA-2n7dK0fEk0ezpH2eiBpNLBAnRS7LQVSaw-oVouPyyYNcniFkRMFBBPqTP8MDa2LpHXvRukRinrSBErkjgElOGJr3gyBWCgIX1tGnvS9srdTvRSzI6IFj4i8HZboerSOHT1xZdJSZHzp1FGXPk2o8uw2gXLgyEodqo_q9eBK3QAdQ6Dr6gJIr_D3b9TPUHSjb_mi9dVdoc4xts7SwF6T0ca1E",
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
  {
    id: "ai-travel-agent",
    name: "AI Travel Agent",
    description:
      "An autonomous booking assistant that handles reservations and logistics for travel agencies using a supervisor-agent architecture.",
    tags: ["Claude API", "Next.js"],
    tagColors: ["bg-tertiary-fixed-dim text-on-tertiary-fixed", "bg-error-container text-on-error-container"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWbuk_r5heu3OVFoNhcwWwydJu9JeTyQXiyMB5YjRfSo96MV2LWJLvqPOQcy4ktmge6Svo1i0uhiP8TwG6orUXUWvjS4Jbj0nOCRrHyqHvj5yalNN3HLoVl6LffHAedeJYUyP501LZaIo8DOEqxYlQwsOZL-aCB75RHjJzigMOlxdfUrZys08cb4a6XwhYQUBv4zJxSi_a4tj3IfHqwyErW4Ftv2_v7YekZ_uHJiUvghXsTfLp09WobgBQPstI9U2DQnmnK0FBoVWg",
    year: "2026",
    status: "In Progress",
    problem: "Small travel agencies spend 3–5 hours per booking on research, itinerary drafting, and client communication.",
    solution: "Supervisor agent → 3 specialists (Itinerary Builder, Research Agent, Comms Agent). Input a client brief, get a full PDF + email draft in under 10 minutes.",
    stack: ["Next.js", "Claude Managed Agents API", "Anthropic SDK", "Stripe"],
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

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-28 space-y-32">
        {/* ── About: The Narrative ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <FadeUp className="lg:col-span-8">
            <h1
              className="font-extrabold text-7xl md:text-8xl tracking-tighter leading-[0.9] text-primary mb-12"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              High school senior,
              <br />
              <span className="text-secondary">building for good.</span>
            </h1>
            <div className="space-y-6 max-w-2xl text-lg md:text-xl text-on-surface-variant leading-relaxed">
              <p>
                I don&apos;t believe in waiting for permission. While most are
                checking boxes, I&apos;m building platforms. I&apos;ve spent
                the last few years turning side-projects into high-performance
                tools — from consumer travel apps to B2B AI SaaS.
              </p>
              <p>
                My philosophy:{" "}
                <span className="font-bold text-primary">build real things</span>
                . I ship in the Next.js + Claude API stack, deploy on Vercel,
                and focus relentlessly on the details that make software feel
                premium.
              </p>
            </div>
          </FadeUp>

          {/* Polaroid card */}
          <FadeUp delay={0.1} className="lg:col-span-4 pb-4">
            <div className="bg-surface-container p-6 rounded-[1.5rem] shadow-[0_10px_30px_rgba(28,28,22,0.05)] rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-square relative rounded-[1rem] overflow-hidden mb-5">
                <Image
                  src="/koshin.jpg"
                  alt="Koshin — high school senior, building for good"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-black text-secondary mb-1">
                Current Focus
              </p>
              <p
                className="font-bold text-lg text-primary"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                High school senior, building for good.
              </p>
            </div>
          </FadeUp>
        </section>

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
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-12 py-14 max-w-7xl mx-auto">
          <span
            className="text-lg font-black text-primary tracking-tighter"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            koshin<span className="text-secondary">.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary/40 text-center">
            Built with Next.js & Vercel. © 2026
          </p>
          <div className="flex gap-8">
            {[
              { label: "Source", href: "https://github.com/koshinbathmax" },
              { label: "Home", href: "/" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs uppercase tracking-[0.2em] font-semibold text-primary/50 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
