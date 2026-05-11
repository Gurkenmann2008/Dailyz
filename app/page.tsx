import Link from "next/link";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { DailyProgress } from "@/components/homepage/DailyProgress";
import { auth } from "@/auth";

const GAMES = [
  { href: "/wortle",       emoji: "🟩", title: "Wörtle",          description: "Errate das Wort des Tages in 6 Versuchen.",              color: "#6aaa64", premium: false, id: "wortle" },
  { href: "/quoerdle",     emoji: "🟦", title: "Quördle",         description: "4 Wörtle-Boards gleichzeitig. 9 Versuche.",              color: "#818cf8", premium: true,  id: "quoerdle" },
  { href: "/zahlenraetsel",emoji: "🔢", title: "Zahlenrätsel",    description: "Errate die Gleichung in 6 Versuchen.",                   color: "#60a5fa", premium: false, id: "zahlenraetsel" },
  { href: "/verbindungen", emoji: "🔗", title: "Verbindungen",    description: "Finde 4 Gruppen mit je 4 zusammengehörigen Wörtern.",    color: "#c084fc", premium: true,  id: "verbindungen" },
  { href: "/kreuzwort",    emoji: "✏️", title: "Mini-Kreuzwort",  description: "Ein 5×5 Kreuzworträtsel, täglich neu.",                  color: "#f59e0b", premium: true,  id: "kreuzwort" },
  { href: "/wortketten",   emoji: "⛓️", title: "Wort-Ketten",    description: "Von Wort A zu Wort B – ein Buchstabe pro Schritt.",      color: "#f87171", premium: true,  id: "wortketten" },
  { href: "/stadtlandfuss",emoji: "🌍", title: "Stadt-Land-Fluss",description: "Täglich ein Buchstabe, 60 Sekunden, 5 Kategorien.",      color: "#34d399", premium: false, id: "stadtlandfuss" },
  { href: "/schaetzling",  emoji: "🎯", title: "Schätzling",      description: "Schätze Zahlen: Preise, Höhen, Jahreszahlen.",           color: "#fb923c", premium: false, id: "schaetzling" },
  { href: "/flagge",       emoji: "🏳️", title: "Flagge",          description: "Erkenne das Land an seiner Flagge.",                    color: "#a3e635", premium: false, id: "flagge" },
];

export default async function HomePage() {
  const session = await auth();
  const isPremium = (session?.user as { isPremium?: boolean })?.isPremium ?? false;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />

      <main className="flex-1">
        {/* Daily progress bar – client component */}
        <DailyProgress games={GAMES} isPremium={isPremium} isLoggedIn={!!session} />

        {/* Hero */}
        <section className="relative overflow-hidden pt-10 pb-8 px-4 text-center">
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
            <p className="text-lg md:text-xl font-medium text-[var(--muted)] mb-1">
              Dein tägliches Rätsel-Erlebnis
            </p>
            <p className="text-sm text-[var(--muted)]">9 Spiele · täglich neue Rätsel · kostenlos starten</p>
            {!session && (
              <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
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
              <Link href="/preise" className="text-xs text-[#FFCE00] font-semibold hover:underline">⭐ Alle 9 freischalten</Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAMES.map((game) => {
              const locked = game.premium && !isPremium;
              return (
                <Link key={game.href} href={locked ? "/preise" : game.href} className="group block">
                  <div className="relative rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 hover:shadow-lg transition-all duration-200 h-full overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: game.color }} />

                    {locked && (
                      <div className="absolute inset-0 rounded-2xl flex items-end justify-start p-5"
                        style={{ background: `linear-gradient(135deg, ${game.color}18 0%, ${game.color}08 100%)` }}>
                        <div className="absolute inset-0 bg-[var(--background)]/70 backdrop-blur-[2px] rounded-2xl" />
                        <div className="relative z-10 flex flex-col items-center w-full gap-1">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: game.color + "30" }}>
                            <span className="text-lg">🔒</span>
                          </div>
                          <span className="text-xs font-black uppercase tracking-wider" style={{ color: game.color }}>Premium</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{game.emoji}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: game.color + "20", color: game.color }}>
                        Täglich
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-[#FFCE00] transition-colors">{game.title}</h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">{game.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                      {locked ? "Freischalten" : "Jetzt spielen"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Premium CTA banner */}
          {!isPremium && (
            <div className="mt-8 rounded-2xl border border-[#FFCE00]/30 bg-gradient-to-r from-[#FFCE00]/10 to-[#DD0000]/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-lg font-black mb-0.5">⭐ Alle 9 Spiele freischalten</p>
                <p className="text-sm text-[var(--muted)]">Nur 1,99€/Monat — alle Spiele + Archiv + werbefrei</p>
                <p className="text-xs text-[var(--muted)] mt-1">Oder spare 37% mit dem Jahresabo für 14,99€</p>
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
