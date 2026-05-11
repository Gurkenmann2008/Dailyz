import Link from "next/link";
import { PlatformHeader } from "@/components/layout/PlatformHeader";

const GAMES = [
  {
    href: "/wortle",
    emoji: "🟩",
    title: "Wörtle",
    description: "Errate das Wort des Tages in 6 Versuchen.",
    color: "#6aaa64",
    tag: "Täglich",
  },
  {
    href: "/verbindungen",
    emoji: "🔗",
    title: "Verbindungen",
    description: "Finde 4 Gruppen mit je 4 zusammengehörigen Wörtern.",
    color: "#c084fc",
    tag: "Täglich",
  },
  {
    href: "/zahlenraetsel",
    emoji: "🔢",
    title: "Zahlenrätsel",
    description: "Errate die Gleichung in 6 Versuchen.",
    color: "#60a5fa",
    tag: "Täglich",
  },
  {
    href: "/kreuzwort",
    emoji: "✏️",
    title: "Mini-Kreuzwort",
    description: "Ein 5×5 Kreuzworträtsel, täglich neu.",
    color: "#f59e0b",
    tag: "Täglich",
  },
  {
    href: "/wortketten",
    emoji: "⛓️",
    title: "Wort-Ketten",
    description: "Von Wort A zu Wort B – ein Buchstabe pro Schritt.",
    color: "#f87171",
    tag: "Täglich",
  },
];

export default function HomePage() {
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
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
              DAILYZ
            </h1>
            <p className="text-xl md:text-2xl font-medium text-[var(--muted)] mb-2">
              Dein tägliches Rätsel-Erlebnis
            </p>
            <p className="text-sm text-[var(--muted)]">
              5 Spiele · täglich neue Rätsel · kostenlos spielen
            </p>
          </div>
        </section>

        {/* Game Grid */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest mb-6">
            Heute spielen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAMES.map((game) => (
              <Link key={game.href} href={game.href} className="group block">
                <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 hover:border-[var(--muted)] hover:shadow-lg transition-all duration-200 h-full">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: game.color }}
                  />
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{game.emoji}</span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: game.color + "22",
                        color: game.color,
                      }}
                    >
                      {game.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFCE00] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {game.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                    Jetzt spielen
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--card-border)] py-8 text-center text-sm text-[var(--muted)]">
        <div className="flex justify-center gap-1 mb-2">
          <div className="w-3 h-3 rounded-sm bg-black dark:bg-white" />
          <div className="w-3 h-3 rounded-sm bg-[#DD0000]" />
          <div className="w-3 h-3 rounded-sm bg-[#FFCE00]" />
        </div>
        <p>DAILYZ — Täglich neue Rätsel für Deutschland</p>
      </footer>
    </div>
  );
}
