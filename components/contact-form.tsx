"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <CheckCircle className="h-10 w-10 text-secondary" />
        <p className="font-medium text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
          Message sent!
        </p>
        <p className="text-on-surface-variant text-sm">I&apos;ll get back to you within a day or two.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-bold text-secondary hover:underline"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[0.35rem]">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        disabled={status === "sending"}
        className="w-full bg-white border border-[var(--ink)] rounded-none px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[var(--ink)] placeholder:text-[var(--ink)]/40 text-[var(--ink)] transition-shadow disabled:opacity-50"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        disabled={status === "sending"}
        className="w-full bg-white border border-[var(--ink)] rounded-none px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[var(--ink)] placeholder:text-[var(--ink)]/40 text-[var(--ink)] transition-shadow disabled:opacity-50"
      />
      <textarea
        name="message"
        placeholder="Tell me about your project"
        rows={3}
        required
        disabled={status === "sending"}
        className="w-full bg-white border border-[var(--ink)] rounded-none px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[var(--ink)] placeholder:text-[var(--ink)]/40 text-[var(--ink)] transition-shadow resize-none disabled:opacity-50"
      />
      {status === "error" && (
        <p className="text-sm text-red-600 font-medium">Something went wrong. Try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-[var(--ink)] text-white border border-[var(--ink)] py-3.5 rounded-none font-medium text-base hover:bg-white hover:text-[var(--ink)] transition-colors duration-200 disabled:opacity-50"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
