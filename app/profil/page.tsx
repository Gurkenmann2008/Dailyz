import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import Image from "next/image";

const GAME_LABELS: Record<string, string> = {
  wortle: "Wörtle",
  verbindungen: "Verbindungen",
  zahlenraetsel: "Zahlenrätsel",
  kreuzwort: "Mini-Kreuzwort",
  wortketten: "Wort-Ketten",
  flagge: "Flagge",
};

export default async function ProfilPage({ searchParams }: { searchParams: Promise<{ premium?: string }> }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/anmelden");

  const params = await searchParams;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { gameStats: { orderBy: { createdAt: "desc" } } },
  });
  if (!user) redirect("/anmelden");

  const gameGroups = Object.entries(GAME_LABELS).map(([id, label]) => {
    const stats = user.gameStats.filter((s) => s.game === id);
    const total = stats.length;
    const won = stats.filter((s) => s.won).length;
    const streak = calcStreak(stats.map((s) => s.date));
    return { id, label, total, won, streak };
  });

  function calcStreak(dates: string[]) {
    const sorted = [...dates].sort().reverse();
    let streak = 0;
    const today = new Date().toISOString().split("T")[0];
    let current = today;
    for (const d of sorted) {
      if (d === current) {
        streak++;
        const prev = new Date(current);
        prev.setDate(prev.getDate() - 1);
        current = prev.toISOString().split("T")[0];
      } else break;
    }
    return streak;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10">
        {params.premium === "success" && (
          <div className="mb-6 rounded-xl bg-[#6aaa64]/20 border border-[#6aaa64]/40 text-[#6aaa64] px-4 py-3 text-sm font-medium text-center">
            🎉 Premium aktiviert! Danke für dein Abo.
          </div>
        )}

        {/* Profile card */}
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 mb-6">
          <div className="flex items-center gap-4">
            {user.image && (
              <Image src={user.image} alt="Profilbild" width={56} height={56} className="rounded-full" />
            )}
            <div className="flex-1">
              <h1 className="text-xl font-black">{user.name ?? "Spieler"}</h1>
              <p className="text-sm text-[var(--muted)]">{user.email}</p>
            </div>
            {user.isPremium ? (
              <span className="px-3 py-1 rounded-full bg-[#FFCE00]/20 text-[#FFCE00] border border-[#FFCE00]/40 text-xs font-bold">
                ⭐ Premium
              </span>
            ) : (
              <a
                href="/preise"
                className="px-3 py-1 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Upgrade
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <h2 className="text-sm font-semibold text-[var(--muted)] uppercase tracking-widest mb-4">Statistiken</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {gameGroups.map((g) => (
            <div key={g.id} className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4">
              <p className="text-xs text-[var(--muted)] mb-2">{g.label}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-black">{g.won}</p>
                  <p className="text-xs text-[var(--muted)]">von {g.total}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#FFCE00]">{g.streak}</p>
                  <p className="text-xs text-[var(--muted)]">Serie</p>
                </div>
              </div>
              {g.total > 0 && (
                <div className="mt-2 h-1.5 rounded-full bg-[var(--card-border)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#6aaa64]"
                    style={{ width: `${Math.round((g.won / g.total) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sign out */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] underline transition-colors"
          >
            Abmelden
          </button>
        </form>
      </main>
    </div>
  );
}
