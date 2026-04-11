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
    const FORMSPREE_ID = "YOUR_FORM_ID";
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
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
        <p className="font-black text-xl text-primary" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        disabled={status === "sending"}
        className="w-full bg-surface-container border-none rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/30 placeholder:text-on-surface-variant/40 text-on-surface font-medium transition-all disabled:opacity-50"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        disabled={status === "sending"}
        className="w-full bg-surface-container border-none rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/30 placeholder:text-on-surface-variant/40 text-on-surface font-medium transition-all disabled:opacity-50"
      />
      <textarea
        name="message"
        placeholder="Tell me about your project"
        rows={3}
        required
        disabled={status === "sending"}
        className="w-full bg-surface-container border-none rounded-[1.5rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/30 placeholder:text-on-surface-variant/40 text-on-surface font-medium transition-all resize-none disabled:opacity-50"
      />
      {status === "error" && (
        <p className="text-sm text-red-600 font-medium">Something went wrong. Try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-primary text-white py-4 rounded-full font-black text-base hover:bg-secondary transition-colors duration-200 active:scale-95 disabled:opacity-50"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
