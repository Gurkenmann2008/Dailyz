"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function PlatformHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="w-full border-b border-[var(--card-border)] sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="flex gap-0.5 h-4">
            <div className="w-3 rounded-sm bg-black dark:bg-white" />
            <div className="w-3 rounded-sm bg-[#DD0000]" />
            <div className="w-3 rounded-sm bg-[#FFCE00]" />
          </div>
          <span className="text-2xl font-black tracking-tight">DAILYZ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--muted)]">
          <Link href="/wortle" className="hover:text-[var(--foreground)] transition-colors">Wörtle</Link>
          <Link href="/verbindungen" className="hover:text-[var(--foreground)] transition-colors">Verbindungen</Link>
          <Link href="/zahlenraetsel" className="hover:text-[var(--foreground)] transition-colors">Zahlenrätsel</Link>
          <Link href="/kreuzwort" className="hover:text-[var(--foreground)] transition-colors">Kreuzwort</Link>
          <Link href="/wortketten" className="hover:text-[var(--foreground)] transition-colors">Wort-Ketten</Link>
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
              aria-label="Theme wechseln"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
