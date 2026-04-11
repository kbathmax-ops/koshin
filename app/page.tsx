import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, Palette, Zap, Mail } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";

export const metadata: Metadata = {
  title: "Koshin — Student Developer & AI Builder",
  description:
    "Portfolio of Koshin — 17-year-old student developer building AI-powered travel software, sanctions research tools, and B2B SaaS with Next.js and Claude API.",
  alternates: { canonical: "https://portfolio-koshin2.vercel.app" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Koshin",
  url: "https://portfolio-koshin2.vercel.app",
  sameAs: ["https://github.com/koshinbathmax"],
  jobTitle: "Student Developer & Founder",
  description:
    "17-year-old developer and student founder building AI-powered travel software, sanctions research tools, and B2B SaaS platforms.",
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "Claude API",
    "AI Agent Architecture",
    "Full-stack Development",
    "Supabase",
    "Stripe",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <main className="pt-32 px-6 lg:px-12 max-w-[1400px] mx-auto">
        {/* ── Split Hero ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[780px]">
          {/* Left — BUILD */}
          <FadeUp>
            <div className="bg-surface-container-low rounded-[2rem] p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden group min-h-[780px]">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim" />
                  Available for hire
                </span>
                <h1
                  className="text-[110px] lg:text-[160px] font-black text-primary leading-[0.8] tracking-tighter mb-8"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  BUILD
                </h1>
              </div>

              <div className="relative z-10 max-w-md">
                <p className="text-xl lg:text-2xl font-medium text-on-surface-variant leading-relaxed">
                  Crafting high-performance digital products with a focus on{" "}
                  <span className="text-secondary font-bold">AI</span> and{" "}
                  <span className="text-secondary font-bold">travel tech</span>.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Next.js", "TypeScript", "Claude API"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-highest px-4 py-2 rounded-full text-sm font-bold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
            </div>
          </FadeUp>

          {/* Right — STORY */}
          <FadeUp delay={0.08}>
            <div className="bg-primary rounded-[2rem] p-10 lg:p-16 flex flex-col justify-between relative overflow-hidden group min-h-[780px]">
              {/* Ghost text */}
              <div className="relative z-10 text-right">
                <span
                  className="text-[110px] lg:text-[160px] font-black text-on-primary-container leading-[0.8] tracking-tighter opacity-20"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  STORY
                </span>
              </div>

              {/* Featured card */}
              <div className="relative z-10 bg-white/10 backdrop-blur-md p-8 lg:p-10 rounded-[1.5rem] border border-on-primary-container/10">
                <p className="text-on-primary text-xs uppercase tracking-[0.3em] font-black mb-4">
                  Featured Project
                </p>
                <h3
                  className="text-3xl lg:text-4xl font-bold text-on-primary mb-4 leading-tight"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Euro Summer Planner
                </h3>
                <p className="text-on-primary/70 text-base mb-8 max-w-sm leading-relaxed">
                  A travel app for planning multi-city European trips —
                  day-by-day itineraries, packing lists, and budget tracking.
                </p>
                <Link
                  href="/work#euro-summer"
                  className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all shadow-xl group/btn"
                >
                  View Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>

              {/* Background image overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-15 grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-30 rounded-[2rem] overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW2QqBVa-4RhclIfxZ51hTPZVitsYjZmhx7EQm4jyIdtXggvA1ECEDFJ5uKUFzaedogBEXHtoCKyl5S9yEer55cCsI4doOnXs9DscG604nQ3Vh-LdlzRwkh9GkrOgHHKcomBF0vyFk3rCf5Zp9CZtL50o3p-WkmbHF4gdXTfDhif64x5l0OfkvMpM7hKOrT1xmVFCuX0-YNWoTt-_6D5baThqHwEolpdgptXpRvvKx3kIfhjgU_GpuC_BU8-0v6hOyMdE5YVxdXhba"
                  alt="Koshin portfolio — student developer and AI builder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ── Widget Grid ── */}
        <section className="mt-24 mb-32">
          <FadeUp>
            <div className="flex items-end justify-between mb-16 px-2">
              <div>
                <p className="text-secondary font-black uppercase tracking-[0.4em] text-sm mb-4">
                  Selected Lab Work
                </p>
                <h2
                  className="text-6xl lg:text-8xl font-black text-primary leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  THE ARCHIVE.
                </h2>
              </div>
              <p className="hidden lg:block text-right max-w-xs text-on-surface-variant font-medium text-sm">
                A curated collection of real projects and experiments in AI,
                travel, and the future of the web.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Widget 1: Large image card */}
            <FadeUp delay={0.04} className="md:col-span-8">
              <div className="bg-surface-container rounded-[2rem] overflow-hidden min-h-[480px] relative group">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JGjLVE3XuFuzZhYfPp_Y2bc5JjfxSNISNmZePObkfKg9gr74hFA-2n7dK0fEk0ezpH2eiBpNLBAnRS7LQVSaw-oVouPyyYNcniFkRMFBBPqTP8MDa2LpHXvRukRinrSBErkjgElOGJr3gyBWCgIX1tGnvS9srdTvRSzI6IFj4i8HZboerSOHT1xZdJSZHzp1FGXPk2o8uw2gXLgyEodqo_q9eBK3QAdQ6Dr6gJIr_D3b9TPUHSjb_mi9dVdoc4xts7SwF6T0ca1E"
                  alt="Student developer workspace — Next.js and AI development"
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-10 flex flex-col justify-end">
                  <span className="bg-secondary text-white w-fit px-4 py-1 rounded-full text-xs font-black mb-4">
                    Case Study
                  </span>
                  <h3
                    className="text-3xl font-black text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    AI Travel Agent
                  </h3>
                </div>
              </div>
            </FadeUp>

            {/* Widget 2: Stats + expertise */}
            <FadeUp delay={0.08} className="md:col-span-4 flex flex-col gap-6">
              <div className="bg-tertiary text-on-primary-container p-10 rounded-[2rem] flex-1 flex flex-col justify-center text-center">
                <span
                  className="text-6xl font-black mb-2 text-tertiary-fixed-dim"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  03+
                </span>
                <p className="uppercase tracking-widest font-black text-xs text-on-primary-container/70">
                  Production Launches
                </p>
              </div>
              <div className="bg-surface-container-high p-8 rounded-[2rem] flex-1">
                <h4
                  className="text-lg font-bold mb-6 text-primary"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Core Expertise
                </h4>
                <ul className="space-y-4">
                  {[
                    { icon: Terminal, label: "Full-stack Engineering" },
                    { icon: Palette, label: "Motion & UI Design" },
                    { icon: Zap, label: "AI Agent Architecture" },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-secondary shrink-0" />
                      <span className="font-bold text-on-surface-variant text-sm">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            {/* Widget 3: Sanctions Precedent */}
            <FadeUp delay={0.1} className="md:col-span-4">
              <Link href="/work#sanctions-precedent">
                <div className="bg-error-container p-10 rounded-[2rem] relative overflow-hidden group h-full min-h-[200px] hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-error-container/60 mb-3 block">
                      Live
                    </span>
                    <h4
                      className="text-on-error-container font-black text-3xl leading-tight"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Sanctions Precedent
                    </h4>
                    <p className="text-on-error-container/70 font-medium mt-4 text-sm">
                      AI-powered policy research engine
                    </p>
                  </div>
                  <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="h-36 w-36 text-on-error-container" />
                  </div>
                </div>
              </Link>
            </FadeUp>

            {/* Widget 4: CTA */}
            <FadeUp delay={0.12} className="md:col-span-8">
              <Link href="/work#contact">
                <div className="bg-surface-container-low p-10 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full min-h-[200px]">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4
                        className="text-2xl font-black text-primary"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        Have a project in mind?
                      </h4>
                      <p className="text-on-surface-variant font-medium text-sm mt-1">
                        Currently available for projects and internships.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-secondary group-hover:translate-x-3 transition-transform duration-300 shrink-0" />
                </div>
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low mt-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-12 py-14 max-w-7xl mx-auto">
          <div>
            <span
              className="text-lg font-black text-primary tracking-tighter block mb-1"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              koshin<span className="text-secondary">.</span>
            </span>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-primary/40">
              Built with Next.js & Vercel. © 2026
            </p>
          </div>
          <div className="flex gap-10">
            {[
              { label: "GitHub", href: "https://github.com/koshinbathmax" },
              { label: "Work", href: "/work" },
              { label: "Contact", href: "/work#contact" },
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
