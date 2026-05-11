"use client";

import { useEffect, useState } from "react";
import { getStreak, getPlayedToday, isStreakAtRisk, StreakData, PlayedToday } from "@/lib/streak";

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({ count: 0, maxStreak: 0, lastDate: "" });
  const [played, setPlayed] = useState<PlayedToday>({ date: "", games: [] });
  const [atRisk, setAtRisk] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
    setPlayed(getPlayedToday());
    setAtRisk(isStreakAtRisk());
  }, []);

  function refresh() {
    setStreak(getStreak());
    setPlayed(getPlayedToday());
    setAtRisk(isStreakAtRisk());
  }

  return { streak, played, atRisk, refresh };
}
