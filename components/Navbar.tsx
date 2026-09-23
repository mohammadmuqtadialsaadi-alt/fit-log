"use client";

import Link from "next/link";
import { Dumbbell, ClipboardList, Bookmark } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-wide text-white"
        >
          <Dumbbell size={24} strokeWidth={2.5} />
          <span>FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wider text-[#ccff00] transition hover:text-white"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="text-sm font-bold uppercase tracking-wider text-white/60 transition hover:text-[#ccff00]"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-3 py-2 text-xs font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            <ClipboardList size={14} />
            <span>Plan</span>
            <span>0</span>
          </Link>

          <Link
            href="/my-plan"
            className="hidden items-center gap-1.5 rounded-full border border-white/30 px-3 py-2 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:flex"
          >
            <Bookmark size={14} />
            <span>Saved</span>
            <span>0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}