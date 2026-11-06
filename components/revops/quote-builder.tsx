"use client";

import { useMemo, useState } from "react";
import { Check, CheckCircle } from "lucide-react";
import {
  BUNDLE_MIN,
  BUSINESS_TYPES,
  CARE_PRICE,
  LOCATION_BANDS,
  WORKFLOWS,
  buildQuote,
  usd,
} from "@/lib/revops-pricing";

const rule = "rgb(var(--ink-rgb) / 0.14)";
const muted = "rgb(var(--ink-rgb) / 0.55)";
const field =
  "w-full bg-white border border-[var(--ink)] rounded-none px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--ink)] placeholder:text-[var(--ink)]/40 text-[var(--ink)] text-sm transition-shadow disabled:opacity-50";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="py-8" style={{ borderTop: `1px solid ${rule}` }}>
      <legend className="sr-only">{title}</legend>
      <p className="flex items-baseline gap-3 mb-5" aria-hidden>
        <span className="text-xs font-semibold tabular-nums" style={{ color: muted }}>
          0{n}
        </span>
        <span className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </span>
      </p>
      {children}
    </fieldset>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="text-sm font-medium px-4 py-2 transition-colors"
      style={{
        fontFamily: "var(--font-display)",
        background: active ? "var(--ink)" : "transparent",
        color: active ? "#ffffff" : "var(--ink)",
        border: `1px solid ${active ? "var(--ink)" : rule}`,
        borderRadius: "999px",
      }}
    >
      {children}
    </button>
  );
}

export function QuoteBuilder() {
  const [businessType, setBusinessType] = useState("");
  const [locations, setLocations] = useState(LOCATION_BANDS[0].id);
  const [workflowIds, setWorkflowIds] = useState<string[]>(["inquiry-replies"]);
  const [care, setCare] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const quote = useMemo(() => buildQuote({ workflowIds, locations, care }), [workflowIds, locations, care]);
  const toBundle = BUNDLE_MIN - workflowIds.length;

  function toggle(id: string) {
    setWorkflowIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (workflowIds.length === 0) {
      setStatus("error");
      setError("Pick at least one workflow.");
      return;
    }
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          business: data.get("business"),
          website: data.get("website"),
          notes: data.get("notes"),
          company: data.get("company"),
          businessType,
          locations,
          workflowIds,
          care,
        }),
      });
      if (res.ok) {
        setSentTo(String(data.get("email") ?? ""));
        setStatus("sent");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "Something went wrong. Try again.");
        setStatus("error");
      }
    } catch {
      setError("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-28" style={{ background: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-24 md:pb-32">
        <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-4" style={{ color: muted }}>
          Quote
        </p>
        <h2
          id="quote-title"
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
          Here are my prices.
        </h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Options */}
          <div className="lg:col-span-7">
            <Step n={1} title="What kind of business? (optional)">
              <div className="flex flex-wrap gap-2">
                {BUSINESS_TYPES.map((t) => (
                  <Chip key={t.id} active={businessType === t.id} onClick={() => setBusinessType((cur) => (cur === t.id ? "" : t.id))}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </Step>

            <Step n={2} title="How many locations?">
              <div className="flex flex-wrap gap-2">
                {LOCATION_BANDS.map((b) => (
                  <Chip key={b.id} active={locations === b.id} onClick={() => setLocations(b.id)}>
                    {b.label}
                  </Chip>
                ))}
              </div>
              {locations !== "1" && (
                <p className="mt-3 text-xs" style={{ color: muted }}>
                  More locations means more calendars and inboxes to connect, so prices go up {Math.round((quote.multiplier - 1) * 100)}%.
                </p>
              )}
            </Step>

            <Step n={3} title="Which workflows?">
              <ul className="space-y-2">
                {WORKFLOWS.map((w) => {
                  const on = workflowIds.includes(w.id);
                  const price = Math.round((w.price * quote.multiplier) / 50) * 50;
                  return (
                    <li key={w.id}>
                      <label
                        className="flex items-start gap-4 p-4 cursor-pointer transition-colors"
                        style={{
                          background: on ? "#ffffff" : "transparent",
                          border: `1px solid ${on ? "var(--ink)" : rule}`,
                        }}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(w.id)} className="sr-only" />
                        <span
                          aria-hidden
                          className="mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center"
                          style={{ border: "1px solid var(--ink)", background: on ? "var(--ink)" : "#ffffff" }}
                        >
                          {on && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-baseline justify-between gap-4">
                            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                              {w.name}
                            </span>
                            <span className="text-sm tabular-nums">{usd(price)}</span>
                          </span>
                          <span className="block mt-1 text-sm leading-snug" style={{ color: muted }}>
                            {w.line}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs" style={{ color: muted }}>
                {toBundle > 0
                  ? `Add ${toBundle} more and you get 10% off the workflows.`
                  : "10% bundle discount applied."}
              </p>
            </Step>

            <Step n={4} title="Want me to look after it?">
              <label
                className="flex items-start gap-4 p-4 cursor-pointer"
                style={{ background: care ? "#ffffff" : "transparent", border: `1px solid ${care ? "var(--ink)" : rule}` }}
              >
                <input type="checkbox" checked={care} onChange={() => setCare((c) => !c)} className="sr-only" />
                <span
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center"
                  style={{ border: "1px solid var(--ink)", background: care ? "var(--ink)" : "#ffffff" }}
                >
                  {care && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </span>
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                      Monthly care
                    </span>
                    <span className="text-sm tabular-nums">{usd(CARE_PRICE)}/mo</span>
                  </span>
                  <span className="block mt-1 text-sm leading-snug" style={{ color: muted }}>
                    Fixes when a tool changes, plus 3 small additions a month. Cancel any month.
                  </span>
                </span>
              </label>
            </Step>
          </div>

          {/* Summary + send */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto bg-white" style={{ border: "1px solid var(--ink)" }}>
              <div className="p-6 md:p-8" style={{ borderBottom: `1px solid ${rule}` }}>
                <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: muted }}>
                  Your estimate
                </p>
                <p
                  className="mt-3 tabular-nums"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}
                  aria-live="polite"
                >
                  {usd(quote.total)}
                </p>
                <p className="mt-2 text-sm" style={{ color: muted }}>
                  {quote.lines.length === 0
                    ? "Pick a workflow to see a price."
                    : `One-time, about ${quote.weeks} ${quote.weeks === 1 ? "week" : "weeks"} to build${quote.care ? `, plus ${usd(quote.care)}/mo` : ""}.`}
                </p>

                {quote.lines.length > 0 && (
                  <dl className="mt-6 space-y-2 text-sm">
                    {quote.lines.map((l) => (
                      <div key={l.name} className="flex justify-between gap-4">
                        <dt>{l.name}</dt>
                        <dd className="tabular-nums">{usd(l.price)}</dd>
                      </div>
                    ))}
                    {quote.discount > 0 && (
                      <div className="flex justify-between gap-4" style={{ color: muted }}>
                        <dt>Bundle discount</dt>
                        <dd className="tabular-nums">-{usd(quote.discount)}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              <div className="p-6 md:p-8">
                {status === "sent" ? (
                  <div className="flex flex-col items-start gap-3 py-2">
                    <CheckCircle className="h-8 w-8" />
                    <p className="text-lg font-medium" style={{ fontFamily: "var(--font-display)" }}>
                      Quote sent.
                    </p>
                    <p className="text-sm" style={{ color: muted }}>
                      Check {sentTo || "your inbox"} for the breakdown. Reply to it with a few times that work and I&apos;ll set up the free call.
                    </p>
                    <button type="button" onClick={() => setStatus("idle")} className="mt-1 text-sm font-medium underline underline-offset-4">
                      Build another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-[0.35rem]">
                    <p className="text-sm font-medium mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      Email me this quote
                    </p>
                    <input name="name" type="text" placeholder="Your name" required maxLength={60} disabled={status === "sending"} className={field} />
                    <input name="email" type="email" placeholder="Email" required maxLength={254} disabled={status === "sending"} className={field} />
                    <input name="business" type="text" placeholder="Business name" required maxLength={80} disabled={status === "sending"} className={field} />
                    <input name="website" type="text" placeholder="Website (optional)" maxLength={200} disabled={status === "sending"} className={field} />
                    <textarea
                      name="notes"
                      placeholder="Anything I should know? (optional)"
                      rows={3}
                      maxLength={2000}
                      disabled={status === "sending"}
                      className={`${field} resize-none`}
                    />
                    {/* Honeypot, hidden from people */}
                    <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                    {status === "error" && <p className="text-sm text-red-600 font-medium pt-1">{error}</p>}
                    <button
                      type="submit"
                      disabled={status === "sending" || quote.lines.length === 0}
                      className="w-full mt-2 bg-[var(--ink)] text-white border border-[var(--ink)] py-3.5 rounded-none font-medium text-base hover:bg-white hover:text-[var(--ink)] transition-colors duration-200 disabled:opacity-50"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {status === "sending" ? "Sending…" : "Send my quote"}
                    </button>
                    <p className="pt-2 text-xs leading-relaxed" style={{ color: muted }}>
                      This is an estimate. I confirm the final price after the free call, and you don&apos;t pay anything until you agree to it.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
