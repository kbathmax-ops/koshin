import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";

const description =
  "1-on-1 lessons in Toronto on using AI to automate the busywork in your business and your personal life, with Claude, ChatGPT, Grok and Gemini. The first 30 minutes are free.";

export const metadata: Metadata = {
  title: "Tutoring",
  description,
  openGraph: {
    title: "Tutoring | Koshin Bathmax",
    description,
    url: "https://kbathmax.com/tutoring",
  },
  alternates: { canonical: "https://kbathmax.com/tutoring" },
};

const PHONE = "647-563-5617";
const rule = "rgb(var(--ink-rgb) / 0.14)";
const muted = "rgb(var(--ink-rgb) / 0.62)";
const eyebrow = "rgb(var(--ink-rgb) / 0.5)";
// Navy from the printed flyer's "30 MIN." line.
const navy = "#0b2a6b";

const h2Style = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: "-0.035em",
  color: "var(--ink)",
} as const;

const topics = [
  { group: "Business", title: "Customer messages", body: "Draft replies to emails, texts and reviews in your voice, so you approve them instead of writing them." },
  { group: "Business", title: "Quotes, invoices and posts", body: "Turn a few notes into a quote, an invoice or a week of social posts." },
  { group: "Business", title: "Admin and paperwork", body: "Sort receipts, summarize contracts, and fill in the spreadsheets you keep putting off." },
  { group: "Personal", title: "Inbox and calendar", body: "Summarize long email threads, pull out what needs a reply, and plan your week." },
  { group: "Personal", title: "Money and errands", body: "Track spending, compare prices, and build meal plans and grocery lists." },
  { group: "Personal", title: "Trips and projects", body: "Plan a trip day by day, or break a side project into steps you'll get done." },
];

const sessions = [
  { name: "First consult", price: "Free", cadence: "30 min", line: "We pick one task you do every week and get AI doing it before you leave.", featured: true },
  { name: "Lesson", price: "$50", cadence: "1 hour", line: "Hands-on, on your own laptop and accounts. We automate whatever you pick." },
  { name: "4-lesson pack", price: "$180", cadence: "4 hours", line: "One lesson a week for a month, one new task handed off each week." },
  { name: "Business setup", price: "$250", cadence: "90 min", line: "We set AI up to handle 3 tasks you or your staff do every week." },
];

const steps = [
  { title: "Call or text me", body: "Tell me what eats up your week and we'll pick a time." },
  { title: "We meet for 30 minutes", body: "In person in Toronto or over a video call. Bring your laptop." },
  { title: "You decide what's next", body: "Book more lessons if it helped. If not, no hard feelings." },
];

const faqs = [
  { q: "Do I need to be good with tech?", a: "No. If you can send an email, you can do this. We go at your pace." },
  { q: "What does automate mean here?", a: "Getting AI to do a task you'd otherwise do by hand, like writing the first draft of a reply or sorting a list. You still check its work before anything goes out." },
  { q: "Which AI tools do you teach?", a: "Claude, ChatGPT, Grok and Gemini. The free versions are enough to start, and I'll tell you if a paid plan is worth it for what you want." },
  { q: "Where do we meet?", a: "A library or coffee shop in Toronto, or over a video call if that's easier." },
  { q: "How do I pay?", a: "The first 30 minutes are free. After that, e-transfer or cash at the end of each lesson." },
];

function Button({ href, children, solid }: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <a
      href={href}
      className={
        solid
          ? "bg-[var(--ink)] text-white border border-[var(--ink)] px-6 py-3.5 font-medium hover:bg-[#0b2a6b] hover:border-[#0b2a6b] transition-colors duration-200"
          : "border border-[var(--ink)] px-6 py-3.5 font-medium text-[var(--ink)] hover:border-[#0b2a6b] hover:text-[#0b2a6b] transition-colors duration-200"
      }
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </a>
  );
}

export default function TutoringPage() {
  return (
    <div style={{ background: "var(--paper)", minHeight: "100dvh" }}>
      <Nav />

      {/* Hero */}
      <header style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-16 md:pb-24">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-6" style={{ color: eyebrow }}>
              AI Tutoring <span style={{ color: navy }}>·</span> Toronto
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
              Automate your life with AI, <span style={{ color: navy }}>1&nbsp;on&nbsp;1.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-snug" style={{ color: muted }}>
              I&apos;m Koshin, a student in Toronto. I show people how to hand the repetitive parts of their business and their personal life to Claude, ChatGPT, Grok and Gemini. The first 30 minutes are free.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`tel:${PHONE}`} solid>
                Call or text {PHONE}
              </Button>
              <Button href="#topics">What we can automate</Button>
            </div>
          </FadeUp>
        </div>
      </header>

      {/* Free-consult band, same as the strip on the poster */}
      <div style={{ background: navy, color: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p
            className="uppercase"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            First 30 minutes free
          </p>
          <p className="text-sm md:text-base font-semibold md:text-right leading-snug">
            Claude, ChatGPT, Grok, Gemini.
            <br className="hidden md:block" /> In person or on a call.
          </p>
        </div>
      </div>

      {/* Topics */}
      <section id="topics" aria-labelledby="topics-title" className="scroll-mt-28" style={{ background: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: eyebrow }}>
            Topics
          </p>
          <h2 id="topics-title" className="max-w-3xl" style={h2Style}>
            What we can automate.
          </h2>
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: rule, border: `1px solid ${rule}` }}>
            {topics.map((t, i) => (
              <li key={t.title} style={{ background: "var(--paper)" }}>
                <FadeUp delay={i * 0.04} className="h-full">
                  <div className="p-6 md:p-8 h-full">
                    <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: navy }}>
                      0{i + 1} · {t.group}
                    </span>
                    <h3 className="mt-3 text-lg font-medium tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                      {t.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>
                      {t.body}
                    </p>
                  </div>
                </FadeUp>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sessions */}
      <section aria-labelledby="sessions-title" style={{ background: "#ffffff" }}>
        <div className="px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-14 max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: eyebrow }}>
            Sessions
          </p>
          <h2 id="sessions-title" className="max-w-3xl" style={h2Style}>
            Start free, keep going if it helps.
          </h2>
        </div>
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}
        >
          {sessions.map((s, i) => (
            <li
              key={s.name}
              className="border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
              style={{
                borderColor: rule,
                background: s.featured ? navy : "#ffffff",
                color: s.featured ? "#ffffff" : "var(--ink)",
              }}
            >
              <FadeUp delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col p-6 md:p-8">
                  <h3 className="text-base font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {s.name}
                  </h3>
                  <p className="mt-6 flex items-baseline gap-2" style={{ fontFamily: "var(--font-display)" }}>
                    <span style={{ fontSize: "clamp(2rem, 3.2vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {s.price}
                    </span>
                    <span className="text-sm" style={{ opacity: s.featured ? 0.9 : 0.6 }}>{s.cadence}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed" style={{ opacity: s.featured ? 1 : 0.7 }}>
                    {s.line}
                  </p>
                </div>
              </FadeUp>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-title" style={{ background: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: eyebrow }}>
            How it works
          </p>
          <h2 id="steps-title" className="max-w-3xl" style={h2Style}>
            It starts with a text.
          </h2>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: rule, border: `1px solid ${rule}` }}>
            {steps.map((s, i) => (
              <li key={s.title} style={{ background: "var(--paper)" }}>
                <FadeUp delay={i * 0.05} className="h-full">
                  <div className="p-6 md:p-8 h-full">
                    <span className="text-xs font-bold tabular-nums" style={{ color: navy }}>
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
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={`sms:${PHONE}`} solid>
              Text me
            </Button>
            <Button href={`tel:${PHONE}`}>Call {PHONE}</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" style={{ background: "#ffffff", borderTop: `1px solid ${rule}` }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <h2
            id="faq-title"
            className="lg:col-span-4"
            style={{ ...h2Style, fontSize: "clamp(2rem, 4vw, 3rem)" }}
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
            koshin<span style={{ color: navy }}>.</span>
          </span>
          <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "rgb(var(--ink-rgb) / 0.45)" }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
