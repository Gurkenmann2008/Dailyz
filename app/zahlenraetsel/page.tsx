"use client";

import { useState, useEffect, useCallback } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyEquation, evaluateEquation, isValidEquation, TileStatus } from "@/lib/zahlenraetsel";
import { cn } from "@/lib/utils";

const MAX_GUESSES = 6;
const KEYS = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "×"],
  ["0", "÷", "=", "⌫"],
];

const TILE_COLORS: Record<TileStatus, string> = {
  empty: "",
  tbd: "border-[var(--color-tbd-border)] bg-transparent",
  correct: "bg-[#6aaa64] text-white border-[#6aaa64]",
  present: "bg-[#c9b458] text-white border-[#c9b458]",
  absent: "bg-[var(--color-absent)] text-white border-[var(--color-absent)]",
};

export default function ZahlenraetselPage() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [evaluations, setEvaluations] = useState<TileStatus[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [toast, setToast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  useEffect(() => { setSolution(getDailyEquation()); }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  function handleKey(key: string) {
    if (gameStatus !== "playing") return;
    if (key === "⌫") { setCurrent((c) => c.slice(0, -1)); return; }
    if (key === "ENTER" || (key === "=" && current.includes("="))) {
      if (current.length !== solution.length) { showToast("Falsche Länge!"); shake(); return; }
      if (!current.includes("=")) { showToast("Gleichung braucht ="); shake(); return; }
      if (!isValidEquation(current)) { showToast("Ungültige Gleichung!"); shake(); return; }
      const ev = evaluateEquation(current, solution);
      const newGuesses = [...guesses, current];
      const newEvals = [...evaluations, ev];
      setGuesses(newGuesses);
      setEvaluations(newEvals);
      setCurrent("");
      if (current === solution) { setGameStatus("won"); return; }
      if (newGuesses.length >= MAX_GUESSES) setGameStatus("lost");
      return;
    }
    if (current.length < solution.length) setCurrent((c) => c + key);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      if (e.key === "Backspace") handleKey("⌫");
      else if (e.key === "Enter") handleKey("ENTER");
      else if (/^[0-9+\-×÷=]$/.test(e.key)) handleKey(e.key);
      else if (e.key === "*") handleKey("×");
      else if (e.key === "/") handleKey("÷");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, current, guesses, evaluations, solution]);

  function shake() { setShaking(true); setTimeout(() => setShaking(false), 500); }

  if (!solution) return null;
  const len = solution.length;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      {toast && (
        <div className="toast" style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
          {toast}
        </div>
      )}
      <main className="flex flex-col flex-1 items-center py-8 px-4 gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-black">ZAHLENRÄTSEL</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Errate die Gleichung in {MAX_GUESSES} Versuchen</p>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: MAX_GUESSES }).map((_, row) => {
            const guess = guesses[row] ?? "";
            const ev = evaluations[row];
            const isCurrent = row === guesses.length && gameStatus === "playing";
            const displayStr = isCurrent ? current : guess;
            return (
              <div key={row} className={cn("flex gap-1.5", isCurrent && shaking && "row-shake")}>
                {Array.from({ length: len }).map((_, col) => {
                  const char = displayStr[col] ?? "";
                  const status: TileStatus = ev ? ev[col] : char ? "tbd" : "empty";
                  return (
                    <div
                      key={col}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center text-sm font-bold rounded border-2 border-[var(--color-empty-border)] transition-colors",
                        TILE_COLORS[status]
                      )}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {gameStatus === "won" && <p className="text-xl font-black">🎉 Richtig!</p>}
        {gameStatus === "lost" && (
          <div className="text-center">
            <p className="text-xl font-black mb-1">Die Gleichung war:</p>
            <p className="text-2xl font-mono font-black">{solution}</p>
          </div>
        )}

        {/* Keyboard */}
        <div className="flex flex-col gap-1.5">
          {KEYS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => key === "=" ? handleKey("ENTER") : handleKey(key)}
                  className={cn(
                    "w-12 h-12 rounded-lg font-bold text-sm transition-colors",
                    key === "⌫" || key === "="
                      ? "bg-[var(--foreground)] text-[var(--background)]"
                      : "bg-[var(--card)] border border-[var(--card-border)] hover:bg-[var(--card-border)]"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
          <button
            onClick={() => handleKey("ENTER")}
            className="mt-1 w-full max-w-[220px] mx-auto h-12 rounded-lg bg-[var(--foreground)] text-[var(--background)] font-bold text-sm"
          >
            EINGABE
          </button>
        </div>
      </main>
    </div>
  );
}
