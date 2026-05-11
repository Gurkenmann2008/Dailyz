"use client";

import { useEffect, useState } from "react";
import { getStreak, isStreakAtRisk } from "@/lib/streak";
import { cn } from "@/lib/utils";

export function StreakDisplay() {
  const [count, setCount] = useState(0);
  const [atRisk, setAtRisk] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCount(getStreak().count);
    setAtRisk(isStreakAtRisk());
    setMounted(true);
  }, []);

  if (!mounted || count === 0) return null;

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-bold", atRisk ? "bg-[#DD0000]/15 text-[#DD0000] animate-pulse" : "bg-[#FFCE00]/15 text-[#FFCE00]")}>
      <span>🔥</span>
      <span>{count}</span>
      {atRisk && <span className="text-xs font-normal hidden sm:inline">in Gefahr!</span>}
    </div>
  );
}
