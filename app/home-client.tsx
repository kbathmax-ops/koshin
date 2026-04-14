"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Terminal, Palette, Zap, Mail } from "lucide-react";
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
            {/* ── Archive section ── */}
            <section className="mt-24 mb-32">
              <FadeUp>
                <div className="flex items-end justify-between mb-16 px-2">
                  <div>
                    <p
                      className="font-black uppercase text-sm mb-4"
                      style={{
                        color: "#9d4305",
                        letterSpacing: "0.4em",
                        fontFamily: "var(--font-manrope), Manrope, sans-serif",
                      }}
                    >
                      Selected Lab Work
                    </p>
                    <h2
                      className="font-black leading-none"
                      style={{
                        fontFamily:
                          "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                        fontSize: "clamp(3.5rem, 7vw, 7rem)",
                        color: "#173321",
                      }}
                    >
                      THE ARCHIVE.
                    </h2>
                  </div>
                  <p
                    className="hidden lg:block text-right max-w-xs text-sm font-medium"
                    style={{ color: "#424842" }}
                  >
                    A curated collection of real projects and experiments in AI,
                    travel, and the future of the web.
                  </p>
                </div>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Large image card */}
                <FadeUp delay={0.04} className="md:col-span-8">
                  <div className="bg-surface-container rounded-[2rem] overflow-hidden min-h-[480px] relative group">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9JGjLVE3XuFuzZhYfPp_Y2bc5JjfxSNISNmZePObkfKg9gr74hFA-2n7dK0fEk0ezpH2eiBpNLBAnRS7LQVSaw-oVouPyyYNcniFkRMFBBPqTP8MDa2LpHXvRukRinrSBErkjgElOGJr3gyBWCgIX1tGnvS9srdTvRSzI6IFj4i8HZboerSOHT1xZdJSZHzp1FGXPk2o8uw2gXLgyEodqo_q9eBK3QAdQ6Dr6gJIr_D3b9TPUHSjb_mi9dVdoc4xts7SwF6T0ca1E"
                      alt="AI Travel Agent — student developer project"
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div
                      className="absolute inset-0 p-10 flex flex-col justify-end"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(23,51,33,0.85) 0%, transparent 60%)",
                      }}
                    >
                      <span
                        className="w-fit px-4 py-1 rounded-full text-xs font-black mb-4 text-white"
                        style={{ backgroundColor: "#9d4305" }}
                      >
                        Case Study
                      </span>
                      <h3
                        className="text-3xl font-black text-white"
                        style={{
                          fontFamily:
                            "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                        }}
                      >
                        AI Travel Agent
                      </h3>
                    </div>
                  </div>
                </FadeUp>

                {/* Stats + expertise */}
                <FadeUp delay={0.08} className="md:col-span-4 flex flex-col gap-6">
                  <div
                    className="p-10 rounded-[2rem] flex-1 flex flex-col justify-center text-center"
                    style={{ backgroundColor: "#3c2b00" }}
                  >
                    <span
                      className="text-6xl font-black mb-2"
                      style={{
                        fontFamily:
                          "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                        color: "#f6be39",
                      }}
                    >
                      03+
                    </span>
                    <p
                      className="uppercase font-black text-xs"
                      style={{
                        letterSpacing: "0.2em",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      Production Launches
                    </p>
                  </div>
                  <div className="bg-surface-container-high p-8 rounded-[2rem] flex-1">
                    <h4
                      className="text-lg font-bold mb-6"
                      style={{
                        fontFamily:
                          "var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', sans-serif",
                        color: "#173321",
                      }}
                    >
                      Core Expertise
                    </h4>
                    <ul className="space-y-4">
                      {[
                        { icon: Terminal, label: "Full-stack Engineering" },
                        { icon: Palette, label: "Motion & UI Design" },
                        { icon: Zap, label: "AI Agent Architecture" },
                      ].map(({ icon: Icon, label }) => (
                        <li key={label} className="flex items-center gap-3">
                          <Icon
                            className="h-5 w-5 shrink-0"
                            style={{ color: "#9d4305" }}
                          />
                          <span
                            className="font-bold text-sm"
                            style={{ color: "#424842" }}
                          >
                            {label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>

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
