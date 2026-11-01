import { Check } from "lucide-react";
import { FadeUp } from "@/components/fade-up";
import { TIERS } from "@/lib/revops-pricing";

const rule = "rgb(var(--ink-rgb) / 0.14)";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-28" style={{ background: "#ffffff" }}>
      <div className="px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-14 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: "rgb(var(--ink-rgb) / 0.5)" }}>
          Pricing
        </p>
        <h2
          id="pricing-title"
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
          Fixed prices, agreed before I start.
        </h2>
        <p className="mt-5 max-w-xl text-base md:text-lg" style={{ color: "rgb(var(--ink-rgb) / 0.62)" }}>
          Every project starts with the free call. You get a written price for each fix, and you only pay for the ones you want built.
        </p>
      </div>

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}` }}
      >
        {TIERS.map((tier, i) => (
          <li
            key={tier.id}
            className="relative border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
            style={{
              borderColor: rule,
              background: tier.featured ? "var(--ink)" : "#ffffff",
              color: tier.featured ? "#ffffff" : "var(--ink)",
            }}
          >
            <FadeUp delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col p-6 md:p-8">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <span className="text-[10px] uppercase tracking-[0.18em] font-semibold px-2 py-1" style={{ border: "1px solid rgb(255 255 255 / 0.35)" }}>
                      Fixed price
                    </span>
                  )}
                </div>

                <p className="mt-6 flex items-baseline gap-1" style={{ fontFamily: "var(--font-display)" }}>
                  <span style={{ fontSize: "clamp(2rem, 3.2vw, 2.75rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {tier.price}
                  </span>
                  {tier.cadence && <span className="text-sm opacity-60">{tier.cadence}</span>}
                </p>

                <p className="mt-4 text-sm leading-relaxed" style={{ opacity: 0.7 }}>
                  {tier.line}
                </p>

                <ul className="mt-6 space-y-2.5 text-sm">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2} style={{ opacity: 0.6 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.id === "call" ? "https://calendly.com/kbathmax/ai-audit" : "#quote"}
                  {...(tier.id === "call" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-auto pt-8 text-sm font-medium inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.id === "call" ? "Book the call" : tier.id === "care" ? "Add it to a quote" : "Build a quote"} →
                </a>
              </div>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
