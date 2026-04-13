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

  const isWork = pathname === "/work" || pathname?.startsWith("/work");
  const isStory = pathname === "/story";

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4">
      <div
        className={cn(
          "bg-[#fcf9ef]/70 backdrop-blur-xl rounded-full max-w-4xl mx-auto flex justify-between items-center gap-8 px-8 py-4 transition-shadow duration-300",
          scrolled
            ? "shadow-[0_10px_40px_rgba(28,28,22,0.10)]"
            : "shadow-[0_10px_30px_rgba(28,28,22,0.05)]"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black text-[#173321] tracking-tighter"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          koshin
          <span className="text-[#9d4305]">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/story"
            className={cn(
              "font-bold tracking-tight transition-colors duration-200",
              isStory
                ? "text-[#9d4305]"
                : "text-[#173321]/70 hover:text-[#9d4305]"
            )}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Story
          </Link>
          <Link
            href="/work"
            className={cn(
              "font-bold tracking-tight transition-colors duration-200",
              isWork
                ? "text-[#9d4305]"
                : "text-[#173321]/70 hover:text-[#9d4305]"
            )}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="text-[#173321]/70 font-medium hover:text-[#9d4305] transition-colors duration-200"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            className="bg-[#173321] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#9d4305] transition-colors duration-200 active:scale-95"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#173321]/70 hover:text-[#173321] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 max-w-4xl mx-auto bg-[#fcf9ef]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(28,28,22,0.08)] px-8 py-6 flex flex-col gap-4">
          <Link
            href="/story"
            className="font-bold text-[#173321] hover:text-[#9d4305] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Story
          </Link>
          <Link
            href="/work"
            className="font-bold text-[#173321] hover:text-[#9d4305] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="font-medium text-[#173321]/70 hover:text-[#9d4305] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            className="bg-[#173321] text-white px-6 py-2.5 rounded-full font-bold text-sm text-center hover:bg-[#9d4305] transition-colors"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
