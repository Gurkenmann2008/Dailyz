"use client";

import { useEffect, useState } from "react";
import { getPlayedToday, getStreak, isStreakAtRisk } from "@/lib/streak";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Game { id: string; title: string; premium: boolean; href: string }

interface Props {
  games: Game[];
  isPremium: boolean;
  isLoggedIn: boolean;
}

export function DailyProgress({ games, isPremium }: Props) {
  const [playedIds, setPlayedIds] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [atRisk, setAtRisk] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPlayedIds(getPlayedToday().games);
    setStreak(getStreak().count);
    setAtRisk(isStreakAtRisk());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const availableGames = games.filter(g => !g.premium || isPremium);
  const playedCount = playedIds.filter(id => games.some(g => g.id === id)).length;
  const totalAvailable = availableGames.length;
  const pct = totalAvailable > 0 ? (playedCount / totalAvailable) * 100 : 0;

  return (
    <div className="border-b border-[var(--card-border)] bg-[var(--card)]/50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Streak banner */}
        {streak > 0 && (
          <div className={cn("flex items-center justify-between mb-2.5 rounded-xl px-3 py-2", atRisk ? "bg-[#DD0000]/10 border border-[#DD0000]/20" : "bg-[#FFCE00]/10 border border-[#FFCE00]/20")}>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <span className="font-black text-sm">{streak} Tage am Stück!</span>
                {atRisk && <span className="ml-2 text-xs text-[#DD0000] font-bold">⚠ Streak in Gefahr — spiel heute noch!</span>}
              </div>
            </div>
            {streak >= 7 && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFCE00]/20 text-[#FFCE00]">🏆 {streak}er-Serie!</span>}
          </div>
        )}

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[var(--muted)] whitespace-nowrap">
            Heute: {playedCount}/{totalAvailable}
          </span>
          <div className="flex-1 h-2 rounded-full bg-[var(--card-border)] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: pct === 100 ? "#6aaa64" : pct > 60 ? "#c9b458" : "#FFCE00",
              }}
            />
          </div>
          <div className="flex gap-1">
            {games.map(g => {
              const played = playedIds.includes(g.id);
              const locked = g.premium && !isPremium;
              return (
                <Link key={g.id} href={locked ? "/preise" : g.href}
                  className={cn("w-2 h-2 rounded-full transition-colors", played ? "bg-[#6aaa64]" : locked ? "bg-[var(--muted)]/30" : "bg-[var(--card-border)]")}
                  title={g.title}
                />
              );
            })}
          </div>
          {pct === 100 && <span className="text-xs font-bold text-[#6aaa64]">✓ Alles gespielt!</span>}
        </div>
      </div>
    </div>
  );
}
