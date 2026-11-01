import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";
import { SelectedWorks } from "@/components/selected-works";
import { Pricing } from "@/components/revops/pricing";
import { QuoteBuilder } from "@/components/revops/quote-builder";
import { projects } from "@/lib/projects";

const revopsProjects = projects.filter((p) => !p.hidden && p.category === "revops");

const description =
  "A free call to find the manual tasks AI can take over at your business, then fixed-price builds for ski areas, gyms and studios, and med spas.";

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

const steps = [
  { title: "We get on a 20-minute call", body: "You walk me through a normal week: where inquiries come in and what happens after someone books." },
  { title: "I send you a list", body: "Within 3 days you get the manual tasks AI can take over and a fixed price to build each one." },
  { title: "I build the ones you pick", body: "Most take 1 to 2 weeks. You pay half upfront and half at launch, and you can stop after any one of them." },
  { title: "It keeps running", body: "Optional monthly care covers fixes when a tool changes and one small addition a month." },
];

const faqs = [
  {
    q: "What does the AI do?",
    a: "It reads and answers routine inquiries, drafts follow-ups, sorts new leads and writes your weekly numbers into one email. Refunds and medical questions always go to a person on your team.",
  },
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
              AI for small businesses
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
              Let&apos;s find the manual work AI can take off your plate.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-snug" style={{ color: muted }}>
              I&apos;m Koshin, an independent consultant. We sit down on a free 20-minute call, go through how you handle inquiries and bookings, and I show you where AI would save your staff hours each week.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://calendly.com/kbathmax/ai-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--ink)] text-white border border-[var(--ink)] px-6 py-3.5 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Book a free call
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

      {/* How the call works */}
      <section aria-labelledby="steps-title" style={{ background: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: "rgb(var(--ink-rgb) / 0.5)" }}>
            How it works
          </p>
          <h2
            id="steps-title"
            className="max-w-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
            }}
          >
            It starts with a call.
          </h2>
          <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: rule, border: `1px solid ${rule}` }}>
            {steps.map((s, i) => (
              <li key={s.title} style={{ background: "var(--paper)" }}>
                <FadeUp delay={i * 0.05} className="h-full">
                  <div className="p-6 md:p-8 h-full">
                    <span className="text-xs font-semibold tabular-nums" style={{ color: "rgb(var(--ink-rgb) / 0.5)" }}>
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-medium tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
                      {s.body}
                    </p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ol>
          <a
            href="https://calendly.com/kbathmax/ai-audit"
                target="_blank"
                rel="noopener noreferrer"
            className="mt-10 inline-block bg-[var(--ink)] text-white border border-[var(--ink)] px-6 py-3.5 font-medium hover:bg-white hover:text-[var(--ink)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Book a free call
          </a>
        </div>
      </section>

      <SelectedWorks products={revopsProjects} designs={[]} title="Automations" filters={false} headingAs="h2" />

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

      <footer style={{ background: "var(--paper)", borderTop: "1px solid rgb(var(--ink-rgb) / 0.10)" }}>
        <div className="flex flex-col items-center gap-2 px-6 py-12 md:px-12 md:py-14">
          <span
            className="text-lg font-medium tracking-tighter"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            koshin<span style={{ color: "var(--ink)" }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "rgb(var(--ink-rgb) / 0.45)" }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
