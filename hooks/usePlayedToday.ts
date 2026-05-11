"use client";

import { useEffect, useState } from "react";
import { getPlayedToday, markGamePlayed } from "@/lib/streak";

export function usePlayedToday() {
  const [playedGames, setPlayedGames] = useState<string[]>([]);

  useEffect(() => {
    setPlayedGames(getPlayedToday().games);
  }, []);

  function markPlayed(gameId: string) {
    const result = markGamePlayed(gameId);
    setPlayedGames(result.playedToday.games);
    // Sync to API if user is logged in
    const today = new Date().toISOString().split("T")[0];
    fetch("/api/game-stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ game: gameId, date: today, won: true }),
    }).catch(() => {});
  }

  return { playedGames, markPlayed };
}
