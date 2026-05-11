"use client";

import { useState, useEffect, useCallback } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyQuoerdleWords, QUOERDLE_MAX_GUESSES } from "@/lib/quoerdle";
import { evaluateGuess, computeLetterStates, TileStatus, LetterState } from "@/lib/game";
import { isValidWord } from "@/lib/words";
import { markGamePlayed } from "@/lib/streak";
import { ShareCard } from "@/components/ShareCard";
import { cn } from "@/lib/utils";

const WORD_LEN = 5;
const ROWS = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Y", "X", "C", "V", "B", "N", "M", "⌫"],
];

const TILE_BG: Record<TileStatus, string> = {
  empty: "border-[var(--color-empty-border)] bg-transparent",
  tbd: "border-[var(--color-tbd-border)] bg-transparent",
  correct: "bg-[#6aaa64] border-[#6aaa64] text-white",
  present: "bg-[#c9b458] border-[#c9b458] text-white",
  absent: "bg-[var(--color-absent)] border-transparent text-white",
};

function MiniBoard({ solution, guesses, currentGuess, solved, isCurrent, shaking }:
  { solution: string; guesses: string[]; currentGuess: string; solved: boolean; isCurrent: boolean; shaking: boolean }) {
  return (
    <div className={cn("rounded-xl border border-[var(--card-border)] p-2 bg-[var(--card)]", solved && "border-[#6aaa64]")}>
      {solved && <div className="text-center text-xs font-bold text-[#6aaa64] mb-1">✓ {solution}</div>}
      <div className="flex flex-col gap-0.5">
        {Array.from({ length: QUOERDLE_MAX_GUESSES }).map((_, row) => {
          const isCurrentRow = isCurrent && row === guesses.length && !solved;
          const word = row < guesses.length ? guesses[row] : isCurrentRow ? currentGuess : "";
          const ev = row < guesses.length ? evaluateGuess(guesses[row], solution) : null;
          return (
            <div key={row} className={cn("flex gap-0.5", isCurrentRow && shaking && "row-shake")}>
              {Array.from({ length: WORD_LEN }).map((_, col) => {
                const ch = word[col] ?? "";
                const s: TileStatus = ev ? ev[col] : ch ? "tbd" : "empty";
                return (
                  <div key={col} className={cn("w-7 h-7 flex items-center justify-center text-[11px] font-bold border rounded uppercase", TILE_BG[s])}>
                    {ch}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function QuoerdlePage() {
  const [solutions] = useState<[string, string, string, string]>(() => getDailyQuoerdleWords());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [solved, setSolved] = useState([false, false, false, false]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [toast, setToast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const allSolved = solved.every(Boolean);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const handleKey = useCallback((key: string) => {
    if (gameStatus !== "playing") return;
    const upper = key.toUpperCase();
    if (upper === "⌫" || upper === "BACKSPACE") { setCurrent(c => c.slice(0, -1)); return; }
    if (upper === "ENTER") {
      const guess = current.toUpperCase();
      if (guess.length < WORD_LEN) { showToast("Zu wenig Buchstaben!"); setShaking(true); setTimeout(() => setShaking(false), 500); return; }
      if (!isValidWord(guess)) { showToast("Nicht im Wörterbuch!"); setShaking(true); setTimeout(() => setShaking(false), 500); return; }
      const newGuesses = [...guesses, guess];
      setGuesses(newGuesses);
      setCurrent("");
      const newSolved = solutions.map((sol, i) => solved[i] || guess === sol) as [boolean, boolean, boolean, boolean];
      setSolved(newSolved);
      if (newSolved.every(Boolean)) {
        setGameStatus("won");
        markGamePlayed("quoerdle");
        setTimeout(() => setShowShare(true), 1000);
      } else if (newGuesses.length >= QUOERDLE_MAX_GUESSES) {
        setGameStatus("lost");
        setTimeout(() => setShowShare(true), 1000);
      }
      return;
    }
    if (/^[A-ZÄÖÜ]$/.test(upper) && current.length < WORD_LEN) setCurrent(c => c + upper);
  }, [gameStatus, current, guesses, solutions, solved, showToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (!e.metaKey && !e.ctrlKey) handleKey(e.key); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleKey]);

  // Combined keyboard states (best state across all unsolved boards)
  const priority: Record<string, number> = { correct: 3, present: 2, absent: 1 };
  const letterStates: Record<string, LetterState> = {};
  solutions.forEach((sol, si) => {
    if (solved[si]) return;
    const evals = guesses.map(g => evaluateGuess(g, sol));
    const ls = computeLetterStates(guesses, evals);
    Object.entries(ls).forEach(([ch, s]) => {
      if ((priority[s] ?? 0) > (priority[letterStates[ch]] ?? 0)) letterStates[ch] = s;
    });
  });

  const emojiGrid = solutions.map((sol, i) => {
    const boardGuesses = guesses.slice(0, solved[i] ? guesses.findIndex(g => g === sol) + 1 : guesses.length);
    return boardGuesses.map(g => evaluateGuess(g, sol).map(s => s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛").join("")).join("\n");
  }).join("\n\n");

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      {toast && (
        <div className="toast" style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", zIndex: 100 }}>
          {toast}
        </div>
      )}
      <main className="flex flex-col flex-1 items-center py-4 px-2 gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-black">QUÖRDLE</h2>
          <p className="text-xs text-[var(--muted)] mt-1">
            4 Wörter gleichzeitig · {guesses.length}/{QUOERDLE_MAX_GUESSES} Versuche ·{" "}
            <span className="text-[#6aaa64]">{solved.filter(Boolean).length}/4 gelöst</span>
          </p>
        </div>

        {/* 4 boards in 2×2 */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-sm sm:max-w-md">
          {solutions.map((sol, i) => (
            <MiniBoard
              key={i}
              solution={sol}
              guesses={guesses}
              currentGuess={current}
              solved={solved[i]}
              isCurrent={!solved[i]}
              shaking={shaking && !solved[i]}
            />
          ))}
        </div>

        {gameStatus === "won" && <p className="text-xl font-black text-[#6aaa64]">🎉 Alle 4 gelöst!</p>}
        {gameStatus === "lost" && (
          <div className="text-center text-sm text-[var(--muted)]">
            Die Wörter waren: {solutions.map((s, i) => solved[i] ? <span key={i} className="text-[#6aaa64] font-bold"> {s}</span> : <span key={i} className="text-[#DD0000] font-bold"> {s}</span>)}
          </div>
        )}

        {/* Keyboard */}
        <div className="flex flex-col gap-1.5 w-full max-w-[500px] px-1">
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex justify-center gap-1.5">
              {row.map((key) => {
                const state = letterStates[key];
                return (
                  <button
                    key={key}
                    className={cn("key", state ? `key-${state}` : "key-default")}
                    style={{ width: key === "ENTER" || key === "⌫" ? 64 : 43 }}
                    onPointerDown={e => { e.preventDefault(); handleKey(key); }}
                  >
                    {key === "ENTER" ? "↵" : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      {showShare && (
        <ShareCard
          title="Quördle"
          status={gameStatus as "won" | "lost"}
          emojiGrid={emojiGrid}
          attempts={guesses.length}
          maxAttempts={QUOERDLE_MAX_GUESSES}
          onClose={() => setShowShare(false)}
          nextGame="Zahlenrätsel"
          nextGameHref="/zahlenraetsel"
        />
      )}
    </div>
  );
}
