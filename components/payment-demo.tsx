"use client";

import { useState, useEffect, FormEvent } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle, Lock, Globe } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const STRIPE_APPEARANCE: StripeElementsOptions["appearance"] = {
  theme: "flat",
  variables: {
    colorPrimary: "#9d4305",
    colorBackground: "#fefcf5",
    colorText: "#173321",
    colorDanger: "#c0392b",
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    spacingUnit: "4px",
    borderRadius: "10px",
    fontSizeBase: "14px",
  },
  rules: {
    ".Input": {
      border: "1.5px solid rgba(23,51,33,0.12)",
      boxShadow: "none",
      padding: "12px 14px",
      backgroundColor: "#fefcf5",
      color: "#173321",
    },
    ".Input:focus": {
      border: "1.5px solid #9d4305",
      boxShadow: "0 0 0 3px rgba(157,67,5,0.10)",
    },
    ".Label": {
      color: "rgba(23,51,33,0.6)",
      fontWeight: "600",
      fontSize: "11px",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: "6px",
    },
    ".Tab": {
      border: "1.5px solid rgba(23,51,33,0.10)",
      backgroundColor: "#fefcf5",
    },
    ".Tab:hover": {
      backgroundColor: "rgba(157,67,5,0.04)",
    },
    ".Tab--selected": {
      border: "1.5px solid #9d4305",
      backgroundColor: "rgba(157,67,5,0.05)",
    },
    ".TabIcon--selected": { fill: "#9d4305" },
    ".TabLabel--selected": { color: "#9d4305" },
  },
};

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("loading");
    setErrorMsg("");

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.href },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Payment failed.");
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(23,51,33,0.08)" }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: "#173321" }} />
        </div>
        <div>
          <p
            className="text-lg font-black tracking-tight"
            style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}
          >
            Payment confirmed
          </p>
          <p className="text-sm mt-1" style={{ color: "rgba(23,51,33,0.5)" }}>
            I&apos;ll be in touch within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
        }}
      />

      {errorMsg && (
        <p className="text-sm font-medium" style={{ color: "#c0392b" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || status === "loading"}
        className="w-full py-3.5 rounded-xl text-sm font-black tracking-wide transition-all duration-200 disabled:opacity-50"
        style={{
          background: "#173321",
          color: "#fcf9ef",
          fontFamily: "var(--font-plus-jakarta-sans)",
        }}
      >
        {status === "loading" ? "Processing…" : "Pay $250.00"}
      </button>

      <div className="flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" style={{ color: "rgba(23,51,33,0.35)" }} />
        <span className="text-xs" style={{ color: "rgba(23,51,33,0.35)" }}>
          Secured by Stripe
        </span>
      </div>
    </form>
  );
}

export function PaymentDemo() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", { method: "POST" })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setFetchError(true);
      })
      .catch(() => setFetchError(true));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Section label */}
      <div className="mb-8">
        <span
          className="text-xs font-black uppercase tracking-[0.25em]"
          style={{ color: "rgba(23,51,33,0.35)", fontFamily: "var(--font-manrope)" }}
        >
          payments
        </span>
        <h2
          className="mt-2 text-3xl font-black tracking-tight leading-tight"
          style={{
            color: "#173321",
            fontFamily: "var(--font-plus-jakarta-sans)",
          }}
        >
          Stripe integration,{" "}
          <span style={{ color: "#9d4305" }}>live on this page.</span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed max-w-lg" style={{ color: "rgba(23,51,33,0.55)" }}>
          Every site I build ships with full payment flows. Try it below —
          use card{" "}
          <span className="font-bold" style={{ color: "#173321" }}>
            4242 4242 4242 4242
          </span>{" "}
          with any future date and CVC.
        </p>
      </div>

      {/* Browser chrome mockup */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 4px 32px rgba(23,51,33,0.10), 0 1px 4px rgba(23,51,33,0.06)",
          border: "1px solid rgba(23,51,33,0.08)",
        }}
      >
        {/* Tab bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "rgba(23,51,33,0.04)", borderBottom: "1px solid rgba(23,51,33,0.07)" }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28ca41" }} />
          </div>

          {/* Fake URL bar */}
          <div
            className="flex-1 mx-4 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{ background: "rgba(23,51,33,0.05)", border: "1px solid rgba(23,51,33,0.08)" }}
          >
            <Lock className="w-3 h-3 shrink-0" style={{ color: "rgba(23,51,33,0.3)" }} />
            <span
              className="text-xs truncate"
              style={{ color: "rgba(23,51,33,0.45)", fontFamily: "var(--font-manrope)" }}
            >
              yourproject.com/checkout
            </span>
          </div>

          {/* Active tab */}
          <div
            className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5"
            style={{ background: "#fcf9ef", border: "1px solid rgba(23,51,33,0.08)" }}
          >
            <Globe className="w-3 h-3" style={{ color: "#9d4305" }} />
            <span
              className="text-xs font-bold"
              style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}
            >
              Payment
            </span>
          </div>
        </div>

        {/* Checkout page content */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ background: "#fcf9ef" }}
        >
          {/* Left: order summary */}
          <div
            className="p-8 border-b md:border-b-0 md:border-r"
            style={{ borderColor: "rgba(23,51,33,0.07)" }}
          >
            <p
              className="text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ color: "rgba(23,51,33,0.35)", fontFamily: "var(--font-manrope)" }}
            >
              Order Summary
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}
                  >
                    Website Project Deposit
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(23,51,33,0.45)" }}>
                    Full-stack Next.js build
                  </p>
                </div>
                <span
                  className="font-black text-sm shrink-0"
                  style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}
                >
                  $250.00
                </span>
              </div>

              <div
                className="border-t pt-4"
                style={{ borderColor: "rgba(23,51,33,0.07)" }}
              >
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: "rgba(23,51,33,0.45)" }}>
                    Subtotal
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "#173321" }}>
                    $250.00
                  </span>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "rgba(23,51,33,0.45)" }}>
                    Tax
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "#173321" }}>
                    $0.00
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-sm font-black" style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}>
                    Total
                  </span>
                  <span className="text-sm font-black" style={{ color: "#173321", fontFamily: "var(--font-plus-jakarta-sans)" }}>
                    $250.00
                  </span>
                </div>
              </div>
            </div>

            {/* Test mode badge */}
            <div
              className="mt-8 inline-flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background: "rgba(157,67,5,0.08)", border: "1px solid rgba(157,67,5,0.15)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#9d4305" }} />
              <span className="text-xs font-bold" style={{ color: "#9d4305", fontFamily: "var(--font-manrope)" }}>
                Test mode — no real charge
              </span>
            </div>
          </div>

          {/* Right: payment form */}
          <div className="p-8">
            <p
              className="text-xs font-black uppercase tracking-[0.2em] mb-6"
              style={{ color: "rgba(23,51,33,0.35)", fontFamily: "var(--font-manrope)" }}
            >
              Payment Details
            </p>

            {fetchError ? (
              <div
                className="rounded-xl p-4 text-sm"
                style={{ background: "rgba(192,57,43,0.06)", color: "#c0392b", border: "1px solid rgba(192,57,43,0.15)" }}
              >
                <p className="font-bold mb-1">Stripe keys not configured</p>
                <p className="text-xs" style={{ color: "rgba(192,57,43,0.8)" }}>
                  Add <code className="font-mono">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and{" "}
                  <code className="font-mono">STRIPE_SECRET_KEY</code> to <code className="font-mono">.env.local</code>.
                </p>
              </div>
            ) : !clientSecret ? (
              <div className="space-y-3">
                {[80, 60, 100].map((w, i) => (
                  <div
                    key={i}
                    className="h-11 rounded-xl animate-pulse"
                    style={{ background: "rgba(23,51,33,0.06)", width: `${w}%` }}
                  />
                ))}
              </div>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
              >
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
