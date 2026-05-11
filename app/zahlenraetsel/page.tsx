"use client";

import { useState, useEffect, useCallback } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyEquation, evaluateEquation, isValidEquation, TileStatus } from "@/lib/zahlenraetsel";
import { markGamePlayed } from "@/lib/streak";
import { ShareCard } from "@/components/ShareCard";
import { cn } from "@/lib/utils";

const MAX_GUESSES = 6;

const STATUS_CLASS: Record<TileStatus, string> = {
  empty: "border-[var(--color-empty-border)]",
  tbd: "border-[var(--color-tbd-border)]",
  correct: "bg-[#6aaa64] text-white border-[#6aaa64]",
  present: "bg-[#c9b458] text-white border-[#c9b458]",
  absent: "bg-[var(--color-absent)] text-white border-transparent",
};

const KEYS = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "×"],
  ["0", "÷", "=", "⌫"],
];

export default function ZahlenraetselPage() {
  const [solution] = useState(() => getDailyEquation());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [evaluations, setEvaluations] = useState<TileStatus[][]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [toast, setToast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const len = solution.length;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const shake = useCallback(() => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  }, []);

  const handleKey = useCallback((key: string) => {
    if (status !== "playing") return;
    if (key === "⌫") { setCurrent(c => c.slice(0, -1)); return; }
    if (key === "ENTER") {
      if (current.length !== len) { showToast(`Braucht ${len} Zeichen!`); shake(); return; }
      if (!current.includes("=")) { showToast("Gleichung braucht ="); shake(); return; }
      if (!isValidEquation(current)) { showToast("Mathematisch falsch!"); shake(); return; }
      const ev = evaluateEquation(current, solution);
      const newGuesses = [...guesses, current];
      setGuesses(newGuesses);
      setEvaluations(e => [...e, ev]);
      setCurrent("");
      if (current === solution) {
        setStatus("won");
        markGamePlayed("zahlenraetsel");
        setTimeout(() => setShowShare(true), 1500);
      } else if (newGuesses.length >= MAX_GUESSES) {
        setStatus("lost");
        setTimeout(() => setShowShare(true), 1500);
      }
      return;
    }
    if (current.length < len) setCurrent(c => c + key);
  }, [status, current, guesses, solution, len, showToast, shake]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      if (e.key === "Backspace") handleKey("⌫");
      else if (e.key === "Enter") handleKey("ENTER");
      else if (/^[0-9]$/.test(e.key)) handleKey(e.key);
      else if (e.key === "+") handleKey("+");
      else if (e.key === "-") handleKey("-");
      else if (e.key === "*") handleKey("×");
      else if (e.key === "/") handleKey("÷");
      else if (e.key === "=") handleKey("=");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleKey]);

  // Build char→best-status map for keyboard coloring
  const charStates: Record<string, TileStatus> = {};
  const priority: Record<TileStatus, number> = { correct: 3, present: 2, absent: 1, tbd: 0, empty: 0 };
  guesses.forEach((g, gi) => {
    g.split("").forEach((ch, ci) => {
      const s = evaluations[gi]?.[ci] ?? "empty";
      if ((priority[s] ?? 0) > (priority[charStates[ch]] ?? 0)) charStates[ch] = s;
    });
  });

  const emojiGrid = guesses.map((g, gi) =>
    evaluations[gi]?.map(s => s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛").join("") ?? ""
  ).join("\n");

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      {toast && (
        <div className="toast" style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
          {toast}
        </div>
      )}
      <main className="flex flex-col flex-1 items-center py-6 px-4 gap-5">
        <div className="text-center">
          <h2 className="text-2xl font-black">ZAHLENRÄTSEL</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Errate die {len}-stellige Gleichung · {MAX_GUESSES} Versuche</p>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: MAX_GUESSES }).map((_, row) => {
            const isCurrent = row === guesses.length && status === "playing";
            const displayStr = isCurrent ? current : guesses[row] ?? "";
            const ev = evaluations[row];
            return (
              <div key={row} className={cn("flex gap-1.5", isCurrent && shaking && "row-shake")}>
                {Array.from({ length: len }).map((_, col) => {
                  const ch = displayStr[col] ?? "";
                  const s: TileStatus = ev ? ev[col] : ch ? "tbd" : "empty";
                  return (
                    <div key={col} className={cn("w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-bold rounded border-2 transition-colors", STATUS_CLASS[s])}>
                      {ch}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {status === "won" && <p className="text-xl font-black text-[#6aaa64]">🎉 Richtig!</p>}
        {status === "lost" && (
          <div className="text-center">
            <p className="text-xl font-black mb-1">Die Gleichung war:</p>
            <p className="text-3xl font-mono font-black tracking-wider">{solution}</p>
          </div>
        )}

        {/* On-screen keyboard */}
        <div className="flex flex-col gap-2 mt-2">
          {KEYS.map((row, ri) => (
            <div key={ri} className="flex gap-2 justify-center">
              {row.map((key) => {
                const s = charStates[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleKey(key === "=" ? "ENTER" : key)}
                    className={cn(
                      "w-14 h-12 rounded-xl font-bold text-sm transition-colors select-none",
                      s === "correct" && "bg-[#6aaa64] text-white",
                      s === "present" && "bg-[#c9b458] text-white",
                      s === "absent" && "bg-[var(--color-absent)] text-white",
                      !s && (key === "⌫" ? "bg-[var(--foreground)] text-[var(--background)]" : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-[var(--card-border)]")
                    )}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
          <button
            onClick={() => handleKey("ENTER")}
            className="mt-1 h-12 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-bold text-sm px-8 mx-auto block"
          >
            EINGABE
          </button>
        </div>

        <div className="text-xs text-[var(--muted)] space-y-0.5 text-center">
          <p>Standard-Rechenreihenfolge gilt: × und ÷ vor + und −</p>
        </div>
      </main>

      {showShare && (
        <ShareCard
          title="Zahlenrätsel"
          status={status as "won" | "lost"}
          emojiGrid={emojiGrid}
          attempts={guesses.length}
          maxAttempts={MAX_GUESSES}
          solution={status === "lost" ? solution : undefined}
          onClose={() => setShowShare(false)}
          nextGame="Quördle"
          nextGameHref="/quoerdle"
        />
      )}
    </div>
  );
}
