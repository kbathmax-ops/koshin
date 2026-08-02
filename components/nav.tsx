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
    <nav className="fixed top-6 left-0 right-0 z-50 px-4">
      <div
        className={cn(
          "bg-[#eeeeee]/75 backdrop-blur-xl rounded-full max-w-4xl mx-auto flex justify-between items-center gap-8 px-8 py-4 transition-shadow duration-300",
          scrolled
            ? "shadow-[0_10px_40px_rgba(18,35,63,0.10)]"
            : "shadow-[0_10px_30px_rgba(18,35,63,0.05)]"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black text-[#12233f] tracking-tighter"
          style={{ fontFamily: "'Public Sans', sans-serif" }}
        >
          koshin
          <span className="text-[#2f5d9e]">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/story"
            className={cn(
              "font-bold tracking-tight transition-colors duration-200",
              isStory
                ? "text-[#2f5d9e]"
                : "text-[#12233f]/70 hover:text-[#2f5d9e]"
            )}
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Story
          </Link>
          <Link
            href="/work"
            className={cn(
              "font-bold tracking-tight transition-colors duration-200",
              isWork
                ? "text-[#2f5d9e]"
                : "text-[#12233f]/70 hover:text-[#2f5d9e]"
            )}
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="text-[#12233f]/70 font-medium hover:text-[#2f5d9e] transition-colors duration-200"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden -m-3 p-3 flex items-center justify-center text-[#12233f]/70 hover:text-[#12233f] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 max-w-4xl mx-auto bg-[#eeeeee]/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(18,35,63,0.08)] px-6 py-2 flex flex-col">
          <Link
            href="/story"
            className="font-bold text-[#12233f] hover:text-[#2f5d9e] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Story
          </Link>
          <Link
            href="/work"
            className="font-bold text-[#12233f] hover:text-[#2f5d9e] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Work
          </Link>
          <Link
            href="/work#contact"
            className="font-medium text-[#12233f]/70 hover:text-[#2f5d9e] transition-colors py-3"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
