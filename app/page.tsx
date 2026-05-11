import Link from "next/link";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { Lock } from "lucide-react";
import { auth } from "@/auth";

const GAMES = [
  {
    href: "/wortle",
    emoji: "🟩",
    title: "Wörtle",
    description: "Errate das Wort des Tages in 6 Versuchen.",
    color: "#6aaa64",
    premium: false,
  },
  {
    href: "/verbindungen",
    emoji: "🔗",
    title: "Verbindungen",
    description: "Finde 4 Gruppen mit je 4 zusammengehörigen Wörtern.",
    color: "#c084fc",
    premium: true,
  },
  {
    href: "/zahlenraetsel",
    emoji: "🔢",
    title: "Zahlenrätsel",
    description: "Errate die Gleichung in 6 Versuchen.",
    color: "#60a5fa",
    premium: true,
  },
  {
    href: "/kreuzwort",
    emoji: "✏️",
    title: "Mini-Kreuzwort",
    description: "Ein 5×5 Kreuzworträtsel, täglich neu.",
    color: "#f59e0b",
    premium: true,
  },
  {
    href: "/wortketten",
    emoji: "⛓️",
    title: "Wort-Ketten",
    description: "Von Wort A zu Wort B – ein Buchstabe pro Schritt.",
    color: "#f87171",
    premium: true,
  },
  {
    href: "/flagge",
    emoji: "🏳️",
    title: "Flagge",
    description: "Erkenne das Land an seiner Flagge.",
    color: "#34d399",
    premium: false,
  },
];

export default async function HomePage() {
  const session = await auth();
  const isPremium = (session?.user as { isPremium?: boolean })?.isPremium ?? false;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 px-4 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFCE00]/10 dark:bg-[#FFCE00]/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 mb-6">
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white" />
              <div className="w-8 h-8 rounded-lg bg-[#DD0000]" />
              <div className="w-8 h-8 rounded-lg bg-[#FFCE00]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">DAILYZ</h1>
            <p className="text-xl md:text-2xl font-medium text-[var(--muted)] mb-2">
              Dein tägliches Rätsel-Erlebnis
            </p>
            <p className="text-sm text-[var(--muted)]">
              6 Spiele · täglich neue Rätsel · kostenlos starten
            </p>
            {!session && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Link
                  href="/anmelden"
                  className="px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Kostenlos anmelden
                </Link>
                <Link
                  href="/preise"
                  className="px-6 py-2.5 rounded-full border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors"
                >
                  Premium ansehen
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Game Grid */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest">
              Heute spielen
            </h2>
            {!isPremium && (
              <Link
                href="/preise"
                className="text-xs text-[#FFCE00] font-semibold hover:underline"
              >
                ⭐ Alle freischalten
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAMES.map((game) => {
              const locked = game.premium && !isPremium;
              return (
                <Link
                  key={game.href}
                  href={locked ? "/preise" : game.href}
                  className="group block"
                >
                  <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 hover:border-[var(--muted)] hover:shadow-lg transition-all duration-200 h-full">
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: game.color }}
                    />
                    {locked && (
                      <div className="absolute inset-0 rounded-2xl bg-[var(--background)]/60 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="flex flex-col items-center gap-1">
                          <Lock size={22} className="text-[#FFCE00]" />
                          <span className="text-xs font-bold text-[#FFCE00]">Premium</span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{game.emoji}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: game.color + "22", color: game.color }}
                      >
                        Täglich
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFCE00] transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{game.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {locked ? "Freischalten" : "Jetzt spielen"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Premium banner for free users */}
          {!isPremium && (
            <div className="mt-8 rounded-2xl border border-[#FFCE00]/30 bg-[#FFCE00]/5 p-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-bold mb-0.5">⭐ Alle Spiele freischalten</p>
                <p className="text-sm text-[var(--muted)]">
                  Nur 1,99€/Monat — alle 6 Spiele + Archiv + werbefrei
                </p>
              </div>
              <Link
                href="/preise"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors"
              >
                Premium →
              </Link>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[var(--card-border)] py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-sm bg-black dark:bg-white" />
              <div className="w-3 h-3 rounded-sm bg-[#DD0000]" />
              <div className="w-3 h-3 rounded-sm bg-[#FFCE00]" />
            </div>
            <span className="font-bold">DAILYZ</span>
          </div>
          <div className="flex gap-6">
            <Link href="/preise" className="hover:text-[var(--foreground)] transition-colors">Preise</Link>
            <Link href="/archiv" className="hover:text-[var(--foreground)] transition-colors">Archiv</Link>
            <Link href="/anmelden" className="hover:text-[var(--foreground)] transition-colors">Anmelden</Link>
          </div>
          <p>© 2025 Dailyz — Täglich neue Rätsel</p>
        </div>
      </footer>
    </div>
  );
}
