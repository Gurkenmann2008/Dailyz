import Link from "next/link";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { DailyProgress } from "@/components/homepage/DailyProgress";
import { auth } from "@/auth";

const GAMES = [
  { href: "/wortle",        emoji: "🟩", title: "Wörtle",           description: "Errate das Wort des Tages in 6 Versuchen.",           color: "#6aaa64",  premium: false, id: "wortle",        isNew: false },
  { href: "/zahlenraetsel", emoji: "🔢", title: "Zahlenrätsel",     description: "Errate die Gleichung des Tages in 6 Versuchen.",      color: "#60a5fa",  premium: false, id: "zahlenraetsel", isNew: false },
  { href: "/buchstaben",    emoji: "🔤", title: "Buchstaben",       description: "Bilde so viele Wörter wie möglich aus 7 Buchstaben.", color: "#f59e0b",  premium: true,  id: "buchstaben",    isNew: true  },
  { href: "/verbindungen",  emoji: "🔗", title: "Verbindungen",     description: "Finde 4 Gruppen mit je 4 zusammengehörigen Wörtern.", color: "#c084fc",  premium: true,  id: "verbindungen",  isNew: false },
  { href: "/quoerdle",      emoji: "🟦", title: "Quördle",          description: "4 Wörtle-Boards gleichzeitig. 9 Versuche.",           color: "#818cf8",  premium: true,  id: "quoerdle",      isNew: false },
  { href: "/kreuzwort",     emoji: "✏️", title: "Mini-Kreuzwort",   description: "Ein 5×5 Kreuzworträtsel, täglich neu.",               color: "#f59e0b",  premium: true,  id: "kreuzwort",     isNew: false },
  { href: "/stadtlandfuss", emoji: "🌍", title: "Stadt-Land-Fluss", description: "Täglich ein Buchstabe, 60 Sekunden, 5 Kategorien.",   color: "#34d399",  premium: true,  id: "stadtlandfuss", isNew: false },
  { href: "/schaetzling",   emoji: "🎯", title: "Schätzling",       description: "Schätze Zahlen: Preise, Höhen, Jahreszahlen.",        color: "#fb923c",  premium: true,  id: "schaetzling",   isNew: false },
  { href: "/wortketten",    emoji: "⛓️", title: "Wort-Ketten",      description: "Von Wort A zu Wort B – ein Buchstabe pro Schritt.",   color: "#f87171",  premium: true,  id: "wortketten",    isNew: false },
  { href: "/flagge",        emoji: "🏳️", title: "Flagge",           description: "Erkenne das Land an seiner Flagge.",                  color: "#a3e635",  premium: true,  id: "flagge",        isNew: false },
];

export default async function HomePage() {
  const session = await auth();
  const isPremium = (session?.user as { isPremium?: boolean })?.isPremium ?? false;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <DailyProgress games={GAMES} isPremium={isPremium} isLoggedIn={!!session} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-8 px-4 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#FFCE00]/8 dark:bg-[#FFCE00]/4 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto">
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-7 h-7 rounded-lg bg-black dark:bg-white" />
              <div className="w-7 h-7 rounded-lg bg-[#DD0000]" />
              <div className="w-7 h-7 rounded-lg bg-[#FFCE00]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-3">DAILYZ</h1>
            <p className="text-lg md:text-xl font-medium text-[var(--muted)] mb-1">Dein tägliches Rätsel-Erlebnis</p>
            <p className="text-sm text-[var(--muted)] mb-5">10 Spiele · täglich neue Rätsel · 2 kostenlos</p>

            {/* Social proof numbers */}
            <div className="flex items-center justify-center gap-6 text-sm text-[var(--muted)] mb-5">
              <span>🧩 <strong className="text-[var(--foreground)]">12.450</strong> Rätsel heute gelöst</span>
              <span>👥 <strong className="text-[var(--foreground)]">3.200</strong> aktive Spieler</span>
            </div>

            {!session && (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <Link href="/anmelden" className="px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold text-sm hover:opacity-90 transition-opacity">
                  Kostenlos anmelden
                </Link>
                <Link href="/preise" className="px-6 py-2.5 rounded-full border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors">
                  Premium ansehen →
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Game Grid */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest">Heute spielen</h2>
            {!isPremium && (
              <Link href="/preise" className="text-xs text-[#FFCE00] font-semibold hover:underline">⭐ Alle 10 freischalten</Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {GAMES.map((game) => {
              const locked = game.premium && !isPremium;
              return (
                <Link key={game.href} href={locked ? "/preise" : game.href} className="group block">
                  <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 hover:shadow-lg transition-all duration-200 h-full overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: game.color }} />

                    {/* New badge */}
                    {game.isNew && !locked && (
                      <div className="absolute top-3 right-3 px-1.5 py-0.5 rounded-md bg-[#DD0000] text-white text-[10px] font-black uppercase">NEU</div>
                    )}

                    {locked && (
                      <div className="absolute inset-0 rounded-2xl bg-[var(--background)]/75 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1">
                        <span className="text-2xl">🔒</span>
                        <span className="text-xs font-black uppercase tracking-wider" style={{ color: game.color }}>Premium</span>
                        <span className="text-[10px] text-[var(--muted)]">ab 1,99€/Monat</span>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{game.emoji}</span>
                      {!locked && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: game.color + "20", color: game.color }}>Täglich</span>}
                    </div>
                    <h3 className="text-base font-bold mb-1 group-hover:text-[#FFCE00] transition-colors leading-tight">{game.title}</h3>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{game.description}</p>
                    {!locked && (
                      <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                        Jetzt spielen
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Premium CTA */}
          {!isPremium && (
            <div className="mt-8 rounded-2xl border border-[#FFCE00]/30 bg-gradient-to-r from-[#FFCE00]/10 to-[#DD0000]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-lg font-black mb-0.5">⭐ 8 weitere Spiele freischalten</p>
                <p className="text-sm text-[var(--muted)]">Nur 1,99€/Monat oder <strong>14,99€/Jahr</strong> — das sind 6 Cent täglich</p>
              </div>
              <Link href="/preise" className="shrink-0 px-6 py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors whitespace-nowrap">
                Premium werden →
              </Link>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[var(--card-border)] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-sm bg-black dark:bg-white" />
              <div className="w-3 h-3 rounded-sm bg-[#DD0000]" />
              <div className="w-3 h-3 rounded-sm bg-[#FFCE00]" />
            </div>
            <span className="font-bold">DAILYZ</span>
          </div>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/preise" className="hover:text-[var(--foreground)] transition-colors">Preise</Link>
            <Link href="/archiv" className="hover:text-[var(--foreground)] transition-colors">Archiv</Link>
            <Link href="/anmelden" className="hover:text-[var(--foreground)] transition-colors">Anmelden</Link>
          </div>
          <p>© 2025 Dailyz</p>
        </div>
      </footer>
    </div>
  );
}
