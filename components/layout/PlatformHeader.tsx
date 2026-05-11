"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { UserMenu } from "@/components/auth/UserMenu";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/wortle", label: "Wörtle" },
  { href: "/verbindungen", label: "Verbindungen" },
  { href: "/zahlenraetsel", label: "Zahlenrätsel" },
  { href: "/kreuzwort", label: "Kreuzwort" },
  { href: "/wortketten", label: "Wort-Ketten" },
  { href: "/flagge", label: "Flagge" },
];

export function PlatformHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="w-full border-b border-[var(--card-border)] sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <Link href="/" className="flex items-center gap-2 select-none" onClick={() => setMobileOpen(false)}>
          <div className="flex gap-0.5 h-4">
            <div className="w-3 rounded-sm bg-black dark:bg-white" />
            <div className="w-3 rounded-sm bg-[#DD0000]" />
            <div className="w-3 rounded-sm bg-[#FFCE00]" />
          </div>
          <span className="text-2xl font-black tracking-tight">DAILYZ</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[var(--muted)]">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-[var(--foreground)] transition-colors">
              {n.label}
            </Link>
          ))}
          <Link href="/preise" className="hover:text-[var(--foreground)] transition-colors">
            Preise
          </Link>
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
          <UserMenu />
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menü"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--card-border)] bg-[var(--background)] px-4 py-3 flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMobileOpen(false)}
              className={cn("py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors")}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/preise"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            Preise
          </Link>
          <Link
            href="/archiv"
            onClick={() => setMobileOpen(false)}
            className="py-2.5 px-3 rounded-lg text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            Archiv
          </Link>
        </div>
      )}
    </header>
  );
}
