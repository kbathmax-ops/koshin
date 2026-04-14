"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Mail } from "lucide-react";
import { Nav } from "@/components/nav";
import { FadeUp } from "@/components/fade-up";

type Phase = "intro" | "revealed";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HomeClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Lock scroll during intro sequence
    document.body.style.overflow = "hidden";

    // Start block compression after 1.6s
    const t1 = setTimeout(() => setPhase("revealed"), 1600);

    // Show below-fold content after compression finishes (~1.0s transition)
    const t2 = setTimeout(() => {
      setContentVisible(true);
      document.body.style.overflow = "";
    }, 2700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  const isRevealed = phase === "revealed";

  return (
    <>
      <Nav />

      <main className="min-h-screen">
        {/* ── Cinematic split hero ── */}
        <motion.section
          className="flex flex-col md:flex-row overflow-hidden"
          initial={{
            height: "100dvh",
            marginTop: "0px",
            marginLeft: "0px",
            marginRight: "0px",
            borderRadius: "0px",
          }}
          animate={
            isRevealed
              ? {
                  height: "520px",
                  marginTop: "5.5rem",
                  marginLeft: "1.5rem",
                  marginRight: "1.5rem",
                  borderRadius: "2rem",
                }
              : {
                  height: "100dvh",
                  marginTop: "0px",
                  marginLeft: "0px",
                  marginRight: "0px",
                  borderRadius: "0px",
                }
          }
          transition={{ duration: 1.05, ease: EASE }}
        >
          {/* ── ABOUT block ── */}
          <div
            className="relative overflow-hidden md:flex-1"
            style={{
              backgroundColor: "#173321",
              flexShrink: 0,
            }}
          >
            <Link href="/story" className="absolute inset-0 group block">
              {/* Intro: giant ghost text centered */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                animate={{ opacity: isRevealed ? 0 : 1 }}
                transition={{ duration: 0.35, ease: "easeIn" }}
              >
                <span
                  className="font-black leading-none tracking-tighter"
                  style={{
                    fontFamily: "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(4rem, 16vw, 18rem)",
                    color: "rgba(255,255,255,0.13)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  ABOUT
                </span>
              </motion.div>

              {/* Vertical label (visible during intro, extreme opacity) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                animate={{ opacity: isRevealed ? 0 : 0.5 }}
                transition={{ duration: 0.35 }}
              >
                <span
                  className="font-black tracking-[0.5em] text-xs uppercase"
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    position: "absolute",
                    right: "2.5rem",
                    fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  }}
                >
                  story · about · origins
                </span>
              </motion.div>

              {/* Hero content — fades in after blocks compress */}
              <motion.div
                className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
                transition={{
                  duration: 0.65,
                  delay: isRevealed ? 0.55 : 0,
                  ease: EASE,
                }}
              >
                <div>
                  <p
                    className="text-[11px] uppercase font-black mb-6"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.35em",
                      fontFamily: "var(--font-manrope), Manrope, sans-serif",
                    }}
                  >
                    About
                  </p>
                  <h2
                    className="font-black text-white leading-none tracking-tighter"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)",
                    }}
                  >
                    Koshin
                  </h2>
                  <p
                    className="mt-5 text-base leading-relaxed max-w-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    17. Student founder. Building in the open — one shipped
                    product at a time.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-2 text-sm font-black transition-colors group-hover:text-white"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    Read Story
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>

              {/* Hover glow overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.04]" />
            </Link>
          </div>

          {/* ── BUILDS block ── */}
          <div
            className="relative overflow-hidden md:flex-[1.5]"
            style={{ backgroundColor: "#fcf9ef", flexShrink: 0 }}
          >
            <Link href="/work" className="absolute inset-0 group block">
              {/* Intro: giant ghost text centered */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                animate={{ opacity: isRevealed ? 0 : 1 }}
                transition={{ duration: 0.35, ease: "easeIn" }}
              >
                <span
                  className="font-black leading-none tracking-tighter"
                  style={{
                    fontFamily:
                      "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(3.5rem, 13vw, 15rem)",
                    color: "rgba(23,51,33,0.09)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  BUILDS
                </span>
              </motion.div>

              {/* Vertical label (visible during intro) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                animate={{ opacity: isRevealed ? 0 : 0.5 }}
                transition={{ duration: 0.35 }}
              >
                <span
                  className="font-black tracking-[0.5em] text-xs uppercase"
                  style={{
                    color: "rgba(23,51,33,0.2)",
                    writingMode: "vertical-rl",
                    position: "absolute",
                    left: "2.5rem",
                    fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  }}
                >
                  work · builds · projects
                </span>
              </motion.div>

              {/* Hero content */}
              <motion.div
                className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: isRevealed ? 1 : 0 }}
                transition={{
                  duration: 0.65,
                  delay: isRevealed ? 0.68 : 0,
                  ease: EASE,
                }}
              >
                <div>
                  <span
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6 w-fit"
                    style={{
                      backgroundColor: "rgba(23,51,33,0.09)",
                      color: "#173321",
                      letterSpacing: "0.15em",
                      fontFamily: "var(--font-manrope), Manrope, sans-serif",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: "#f6be39" }}
                    />
                    Available for hire
                  </span>

                  <h2
                    className="font-black leading-none tracking-tighter"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                      fontSize: "clamp(3.5rem, 6vw, 6rem)",
                      color: "#173321",
                    }}
                  >
                    BUILDS
                  </h2>
                  <p
                    className="mt-5 text-base leading-relaxed max-w-sm font-medium"
                    style={{ color: "#424842" }}
                  >
                    Crafting high-performance digital products with a focus on{" "}
                    <span className="font-bold" style={{ color: "#9d4305" }}>
                      AI
                    </span>{" "}
                    and{" "}
                    <span className="font-bold" style={{ color: "#9d4305" }}>
                      travel tech
                    </span>
                    .
                  </p>
                </div>

                <span
                  className="inline-flex items-center gap-2 text-sm font-black transition-colors"
                  style={{ color: "rgba(23,51,33,0.5)" }}
                >
                  See the Work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.div>

              {/* Decorative ambient blur */}
              <div
                className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                style={{ backgroundColor: "rgba(23,51,33,0.05)" }}
              />
            </Link>
          </div>
        </motion.section>

        {/* ── Below-fold content ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="px-6 lg:px-12 max-w-[1400px] mx-auto">
            {/* ── Widgets ── */}
            <section className="mt-16 mb-32">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sanctions Precedent */}
                <FadeUp delay={0.1} className="md:col-span-4">
                  <Link href="/work#sanctions-precedent">
                    <div className="bg-error-container p-10 rounded-[2rem] relative overflow-hidden group h-full min-h-[200px] hover:-translate-y-1 transition-transform duration-300">
                      <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-error-container/60 mb-3 block">
                          Live
                        </span>
                        <h4
                          className="font-black text-3xl leading-tight text-on-error-container"
                          style={{
                            fontFamily:
                              "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                          }}
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

                {/* Contact CTA */}
                <FadeUp delay={0.12} className="md:col-span-8">
                  <Link href="/work#contact">
                    <div className="bg-surface-container-low p-10 rounded-[2rem] flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-transform duration-300 h-full min-h-[200px]">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h4
                            className="text-2xl font-black"
                            style={{
                              fontFamily:
                                "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                              color: "#173321",
                            }}
                          >
                            Have a project in mind?
                          </h4>
                          <p
                            className="font-medium text-sm mt-1"
                            style={{ color: "#424842" }}
                          >
                            Currently available for projects and internships.
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        className="h-8 w-8 group-hover:translate-x-3 transition-transform duration-300 shrink-0"
                        style={{ color: "#9d4305" }}
                      />
                    </div>
                  </Link>
                </FadeUp>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-surface-container-low mt-24">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-12 py-14 max-w-7xl mx-auto">
              <div>
                <span
                  className="text-lg font-black tracking-tighter block mb-1"
                  style={{
                    fontFamily:
                      "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                    color: "#173321",
                  }}
                >
                  koshin<span style={{ color: "#9d4305" }}>.</span>
                </span>
                <p
                  className="text-xs uppercase font-semibold"
                  style={{
                    letterSpacing: "0.2em",
                    color: "rgba(23,51,33,0.4)",
                  }}
                >
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
                    className="text-xs uppercase font-semibold transition-colors hover:opacity-100"
                    style={{
                      letterSpacing: "0.2em",
                      color: "rgba(23,51,33,0.5)",
                    }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </motion.div>
      </main>
    </>
  );
}
