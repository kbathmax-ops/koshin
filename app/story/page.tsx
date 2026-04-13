import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";

export const metadata: Metadata = {
  title: "Story — Koshin",
  description:
    "The story behind the work — where Koshin has been and where he's going.",
  alternates: { canonical: "https://portfolio-koshin2.vercel.app/story" },
};

export default function Story() {
  return (
    <>
      <Nav />

      <main className="pt-32 pb-32 px-6 lg:px-12 max-w-[900px] mx-auto">
        {/* Back link */}
        <FadeUp>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-on-surface-variant font-bold text-sm hover:text-primary transition-colors mb-16"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </FadeUp>

        {/* Header */}
        <FadeUp delay={0.04}>
          <p className="text-secondary font-black uppercase tracking-[0.4em] text-sm mb-6">
            The Story
          </p>
          <h1
            className="text-7xl lg:text-[110px] font-black text-primary leading-[0.85] tracking-tighter mb-16"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Where I&apos;ve been &amp; where I&apos;m going.
          </h1>
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.06}>
          <div className="h-px bg-outline-variant mb-20" />
        </FadeUp>

        {/* Origin */}
        <FadeUp delay={0.08}>
          <section className="mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-6 block">
              01 — Origin
            </span>
            <h2
              className="text-3xl lg:text-4xl font-black text-primary mb-6 leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              I started building because I couldn&apos;t stop asking &ldquo;why
              doesn&apos;t this exist yet?&rdquo;
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              I&apos;m Koshin — 17, still in school, and already deep into
              shipping real products. I picked up coding not because I had a
              plan, but because I had problems I wanted to solve. The first few
              projects were rough. A lot of things broke, a lot of ideas
              flopped. But each one taught me something the next one needed.
            </p>
          </section>
        </FadeUp>

        {/* What I've built */}
        <FadeUp delay={0.1}>
          <section className="mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-6 block">
              02 — What I&apos;ve built
            </span>
            <h2
              className="text-3xl lg:text-4xl font-black text-primary mb-10 leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Three production launches, zero shortcuts.
            </h2>

            <div className="space-y-6">
              {/* Euro Summer */}
              <div className="bg-surface-container-low rounded-[1.5rem] p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-2xl font-black text-primary"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Euro Summer Planner
                  </h3>
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0">
                    Travel Tech
                  </span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  A full-stack travel app for planning multi-city European trips.
                  Day-by-day itineraries, packing lists, and budget tracking —
                  built because I was planning a trip myself and the existing
                  tools were terrible. First time I went from idea to shipped
                  product with real users.
                </p>
              </div>

              {/* Sanctions Precedent */}
              <div className="bg-error-container rounded-[1.5rem] p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-2xl font-black text-on-error-container"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Sanctions Precedent
                  </h3>
                  <span className="bg-on-error-container/10 text-on-error-container px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0">
                    AI Research
                  </span>
                </div>
                <p className="text-on-error-container/70 leading-relaxed">
                  An AI-powered policy research engine that surfaces legal
                  precedents in sanctions law. Built for professionals who
                  spend hours doing what this does in seconds. Taught me how
                  to scope a B2B product and make AI genuinely useful — not
                  just impressive.
                </p>
              </div>

              {/* AI Compass / Travel agent */}
              <div className="bg-surface-container rounded-[1.5rem] p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-2xl font-black text-primary"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    AI Travel Agent
                  </h3>
                  <span className="bg-tertiary text-on-primary-container px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shrink-0">
                    In Progress
                  </span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  The next evolution of travel planning — an agent that doesn&apos;t
                  just suggest, it books. Multi-step reasoning, real-time data,
                  and a UX that doesn&apos;t feel like a chatbot. Still building,
                  but this is the one I&apos;m most excited about.
                </p>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* Where I'm going */}
        <FadeUp delay={0.12}>
          <section className="mb-20">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-secondary mb-6 block">
              03 — Where I&apos;m going
            </span>
            <h2
              className="text-3xl lg:text-4xl font-black text-primary mb-6 leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              I want to build things that actually change how people move
              through the world.
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mb-6">
              Travel tech is just the start. I&apos;m interested in any space
              where AI can cut through friction — where something that takes
              hours of human effort can be reduced to seconds of good software.
            </p>
            <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
              Long-term I want to run a company. Short-term I want to work
              alongside people who are building something real — whether
              that&apos;s an internship, a contract, or a collaboration. If
              that sounds like you, reach out.
            </p>
          </section>
        </FadeUp>

        {/* Divider */}
        <FadeUp delay={0.14}>
          <div className="h-px bg-outline-variant mb-16" />
        </FadeUp>

        {/* CTA row */}
        <FadeUp delay={0.16}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-3 bg-primary text-on-primary px-8 py-4 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all shadow-xl group"
            >
              See the Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work#contact"
              className="inline-flex items-center gap-3 bg-surface-container-high text-primary px-8 py-4 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all"
            >
              Get in touch
            </Link>
          </div>
        </FadeUp>
      </main>
    </>
  );
}
