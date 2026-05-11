import { auth } from "@/auth";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import Link from "next/link";
import { Lock } from "lucide-react";

const GAMES = [
  { id: "wortle", label: "Wörtle", emoji: "🟩", href: "/wortle" },
  { id: "verbindungen", label: "Verbindungen", emoji: "🔗", href: "/verbindungen" },
  { id: "zahlenraetsel", label: "Zahlenrätsel", emoji: "🔢", href: "/zahlenraetsel" },
  { id: "kreuzwort", label: "Mini-Kreuzwort", emoji: "✏️", href: "/kreuzwort" },
  { id: "wortketten", label: "Wort-Ketten", emoji: "⛓️", href: "/wortketten" },
  { id: "flagge", label: "Flagge", emoji: "🏳️", href: "/flagge" },
];

function getPastDates(count: number) {
  const dates: string[] = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export default async function ArchivPage() {
  const session = await auth();
  const isPremium = session?.user?.isPremium ?? false;
  const pastDates = getPastDates(14);

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black">Archiv</h1>
            <p className="text-sm text-[var(--muted)] mt-0.5">Vergangene Rätsel nochmal spielen</p>
          </div>
          {isPremium && (
            <span className="px-3 py-1 rounded-full bg-[#FFCE00]/20 text-[#FFCE00] border border-[#FFCE00]/40 text-xs font-bold">
              ⭐ Premium
            </span>
          )}
        </div>

        {!isPremium ? (
          <div className="rounded-2xl border-2 border-[#FFCE00]/40 bg-[#FFCE00]/5 p-10 text-center">
            <Lock size={40} className="mx-auto mb-4 text-[#FFCE00]" />
            <h2 className="text-xl font-black mb-2">Premium-Feature</h2>
            <p className="text-[var(--muted)] text-sm mb-6 max-w-sm mx-auto">
              Mit Premium-Abo kannst du alle vergangenen Rätsel der letzten 30 Tage nochmal spielen.
            </p>
            <Link
              href="/preise"
              className="inline-block px-6 py-3 rounded-xl bg-[#FFCE00] text-black font-black text-sm hover:bg-[#f0c000] transition-colors"
            >
              Jetzt Premium werden für 1,99€/Monat
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {pastDates.map((date) => {
              const d = new Date(date);
              const label = d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
              return (
                <div key={date}>
                  <h3 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">{label}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {GAMES.map((game) => (
                      <Link
                        key={game.id}
                        href={`${game.href}?date=${date}`}
                        className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 hover:border-[var(--muted)] transition-colors"
                      >
                        <span className="text-xl">{game.emoji}</span>
                        <span className="text-sm font-medium">{game.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
