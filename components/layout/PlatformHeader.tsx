"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { UserMenu } from "@/components/auth/UserMenu";
import { StreakDisplay } from "@/components/StreakDisplay";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/wortle", label: "Wörtle" },
  { href: "/quoerdle", label: "Quördle" },
  { href: "/zahlenraetsel", label: "Zahlenrätsel" },
  { href: "/verbindungen", label: "Verbindungen" },
  { href: "/kreuzwort", label: "Kreuzwort" },
  { href: "/wortketten", label: "Wort-Ketten" },
  { href: "/stadtlandfuss", label: "Stadt-Land-Fluss" },
  { href: "/schaetzling", label: "Schätzling" },
  { href: "/flagge", label: "Flagge" },
];

export function PlatformHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="w-full border-b border-[var(--card-border)] sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14 gap-3">
        <Link href="/" className="flex items-center gap-2 select-none shrink-0" onClick={() => setMobileOpen(false)}>
          <div className="flex gap-0.5 h-4">
            <div className="w-3 rounded-sm bg-black dark:bg-white" />
            <div className="w-3 rounded-sm bg-[#DD0000]" />
            <div className="w-3 rounded-sm bg-[#FFCE00]" />
          </div>
          <span className="text-2xl font-black tracking-tight">DAILYZ</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-4 text-sm font-medium text-[var(--muted)] overflow-x-auto">
          {NAV.slice(0, 5).map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[var(--foreground)] transition-colors whitespace-nowrap">
              {n.label}
            </Link>
          ))}
          <Link href="/preise" className="hover:text-[var(--foreground)] transition-colors">Preise</Link>
        </nav>

        <div className="flex items-center gap-2">
          <StreakDisplay />
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
              aria-label="Theme wechseln"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <UserMenu />
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menü"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[var(--card-border)] bg-[var(--background)] px-4 py-3 grid grid-cols-2 gap-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/preise" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors">Preise</Link>
          <Link href="/archiv" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors">Archiv</Link>
        </div>
      )}
    </header>
  );
}
