import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { SelectedWorks } from "@/components/selected-works";
import { Pricing } from "@/components/revops/pricing";
import { QuoteBuilder } from "@/components/revops/quote-builder";
import { SiteFooter } from "@/components/site-footer";
import { revopsProjects } from "@/lib/projects";

const description =
  "Custom workflows and revenue operations for ski areas, gyms and studios, and med spas. Fixed prices and an instant quote.";

export const metadata: Metadata = {
  title: "revops",
  description,
  openGraph: {
    title: "revops | Koshin Bathmax",
    description,
    url: "https://kbathmax.com/revops",
  },
  alternates: { canonical: "https://kbathmax.com/revops" },
};

const rule = "rgb(var(--ink-rgb) / 0.14)";
const muted = "rgb(var(--ink-rgb) / 0.62)";

const niches = [
  {
    name: "Ski and winter tourism",
    leak: "Lesson and group inquiries pile up in December, and the same 20 questions get answered by hand.",
  },
  {
    name: "Gyms and studios",
    leak: "January trial signups go cold because nobody follows up after the first class.",
  },
  {
    name: "Med spas",
    leak: "Consult requests wait a day for a reply, and past clients never get asked to rebook.",
  },
];

const faqs = [
  {
    q: "What tools do you work with?",
    a: "Whatever you already pay for. That usually means your booking system (Mindbody, Vagaro, Boulevard, Checkfront and similar), Gmail or Outlook, Google Sheets, and your website forms. I connect them, and your staff keep using them the way they do now.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. I build it, test it with real inquiries, and send a short video that shows your staff what changed. If something breaks during the fix period, you email me and I fix it.",
  },
  {
    q: "Who owns what you build?",
    a: "You do. Everything runs in accounts you own, and you get the logins and a written handoff when it's done.",
  },
  {
    q: "How do I pay?",
    a: "Half when we agree on the price, half at launch. Monthly care is billed at the start of each month.",
  },
];

export default function RevopsPage() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      {/* Hero */}
      <header style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: "rgb(var(--ink-rgb) / 0.5)" }}>
              RevOps for small businesses
            </p>
            <h1
              className="max-w-5xl"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
                fontWeight: 700,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
                color: "var(--ink)",
              }}
            >
              More bookings from the inquiries you already get.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-snug" style={{ color: muted }}>
              I&apos;m Koshin, an independent consultant. I build the workflows that answer inquiries and chase unfinished bookings, so your front desk spends its hours on the people in the room.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="bg-[var(--ink)] text-white border border-[var(--ink)] px-6 py-3.5 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Build a quote
              </a>
              <a
                href="#pricing"
                className="border border-[var(--ink)] px-6 py-3.5 font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                See pricing
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Who it's for */}
        <ul className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}>
          {niches.map((n, i) => (
            <li key={n.name} className="border-b md:border-b-0 md:border-r md:last:border-r-0 last:border-b-0" style={{ borderColor: rule }}>
              <FadeUp delay={i * 0.06}>
                <div className="p-6 md:p-10">
                  <h2 className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                    {n.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: muted }}>
                    {n.leak}
                  </p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </header>

      <SelectedWorks projects={revopsProjects} designs={[]} title="Automations" filters={false} headingAs="h2" />

      <Pricing />

      <QuoteBuilder />

      {/* FAQ */}
      <section aria-labelledby="faq-title" style={{ background: "#ffffff", borderTop: `1px solid ${rule}` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2
            id="faq-title"
            className="lg:col-span-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
            }}
          >
            Questions
          </h2>
          <dl className="lg:col-span-8">
            {faqs.map((f) => (
              <div key={f.q} className="py-6" style={{ borderTop: `1px solid ${rule}` }}>
                <dt className="text-base font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {f.q}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed max-w-2xl" style={{ color: muted }}>
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <SiteFooter paper />
    </div>
  );
}
