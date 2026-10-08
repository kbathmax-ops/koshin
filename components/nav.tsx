"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isWork = pathname?.startsWith("/work");
  const isStory = pathname === "/story";

  return (
    <nav
      className="fixed top-6 left-0 right-0 z-50 px-4"
      style={{ viewTransitionName: 'site-nav' }}
    >
      <div
        className={cn(
          "bg-[var(--paper-sunk)]/75 backdrop-blur-xl w-fit mx-auto flex items-center gap-8 md:gap-10 pl-5 pr-5 py-2.5 text-sm transition-shadow duration-300",
          scrolled
            ? "shadow-[0_10px_40px_rgb(var(--ink-rgb)_/_0.10)]"
            : "shadow-[0_10px_30px_rgb(var(--ink-rgb)_/_0.05)]"
        )}
      >
        {/* Logo */}
        <Link
          href="/story"
          className="text-base font-medium text-[var(--ink)] tracking-tighter"
          style={{ fontFamily: "var(--font-display)" }}
        >
          koshin
          <span className="text-[var(--ink)]">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/story"
            className={cn(
              "font-medium tracking-tight transition-colors duration-200",
              isStory
                ? "text-[var(--ink)]"
                : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Story
          </Link>
          <Link
            href="/work"
            className={cn(
              "font-medium tracking-tight transition-colors duration-200",
              isWork
                ? "text-[var(--ink)]"
                : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
            )}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="text-[var(--ink)]/70 font-medium hover:text-[var(--ink)] transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden -m-3 p-3 flex items-center justify-center text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 w-fit mx-auto flex justify-center">
          <div className="bg-[var(--paper-sunk)]/95 backdrop-blur-xl shadow-[0_10px_30px_rgb(var(--ink-rgb)_/_0.08)] px-6 py-2 flex flex-col items-center text-center min-w-[9rem]">
          <Link
            href="/story"
            className="font-medium text-[var(--ink)] hover:text-[var(--ink)] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Story
          </Link>
          <Link
            href="/work"
            className="font-medium text-[var(--ink)] hover:text-[var(--ink)] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="font-medium text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
