"use client";

import { useState, useEffect, useCallback } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyVerbindungen, DIFFICULTY_COLORS, DIFFICULTY_LABELS, VerbindungenPuzzle } from "@/lib/verbindungen";
import { cn } from "@/lib/utils";

type GroupResult = { title: string; difficulty: 0 | 1 | 2 | 3; words: string[] };

export default function VerbindungenPage() {
  const [puzzle, setPuzzle] = useState<VerbindungenPuzzle | null>(null);
  const [words, setWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<GroupResult[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const [gameOver, setGameOver] = useState<"won" | "lost" | null>(null);

  useEffect(() => {
    const p = getDailyVerbindungen();
    setPuzzle(p);
    const all = p.groups.flatMap((g) => g.words);
    setWords(shuffle(all));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  function shuffle(arr: string[]) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function toggle(word: string) {
    if (gameOver) return;
    if (selected.includes(word)) {
      setSelected((s) => s.filter((w) => w !== word));
    } else if (selected.length < 4) {
      setSelected((s) => [...s, word]);
    }
  }

  function submit() {
    if (!puzzle || selected.length !== 4) return;
    const match = puzzle.groups.find(
      (g) => selected.every((w) => g.words.includes(w)) && !solved.find((s) => s.title === g.title)
    );
    if (match) {
      const newSolved = [...solved, match];
      setSolved(newSolved);
      setWords((w) => w.filter((word) => !match.words.includes(word)));
      setSelected([]);
      if (newSolved.length === puzzle.groups.length) setGameOver("won");
    } else {
      const oneAway = puzzle.groups.find(
        (g) => selected.filter((w) => g.words.includes(w)).length === 3 && !solved.find((s) => s.title === g.title)
      );
      if (oneAway) showToast("Knapp daneben!");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= 4) setGameOver("lost");
    }
  }

  if (!puzzle) return null;

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
          <h2 className="text-2xl font-black">VERBINDUNGEN</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Finde 4 Gruppen mit je 4 Wörtern</p>
        </div>

        {/* Solved groups */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          {solved.map((g) => (
            <div
              key={g.title}
              className="rounded-xl p-4 text-center font-bold"
              style={{ background: DIFFICULTY_COLORS[g.difficulty] }}
            >
              <div className="text-xs uppercase tracking-wider mb-1 opacity-70">{g.title}</div>
              <div className="text-sm">{g.words.join("  ·  ")}</div>
            </div>
          ))}
        </div>

        {/* Word grid */}
        {!gameOver && (
          <div className={cn("w-full max-w-lg grid grid-cols-4 gap-2", shaking && "row-shake")}>
            {words.map((word) => (
              <button
                key={word}
                onClick={() => toggle(word)}
                className={cn(
                  "rounded-xl py-4 px-2 text-sm font-bold uppercase tracking-wide transition-all duration-150 border-2",
                  selected.includes(word)
                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)]"
                    : "bg-[var(--card)] border-[var(--card-border)] hover:border-[var(--muted)]"
                )}
              >
                {word}
              </button>
            ))}
          </div>
        )}

        {gameOver === "won" && (
          <div className="text-center">
            <p className="text-2xl font-black mb-2">🎉 Gewonnen!</p>
            <p className="text-[var(--muted)] text-sm">{mistakes === 0 ? "Perfekt! Keine Fehler!" : `Mit ${mistakes} Fehler${mistakes !== 1 ? "n" : ""}.`}</p>
          </div>
        )}
        {gameOver === "lost" && (
          <div className="text-center">
            <p className="text-2xl font-black mb-2">😔 Verloren</p>
            {puzzle.groups.filter(g => !solved.find(s => s.title === g.title)).map(g => (
              <div key={g.title} className="rounded-xl p-3 mt-2 text-sm font-bold" style={{ background: DIFFICULTY_COLORS[g.difficulty] }}>
                <span className="opacity-70 text-xs uppercase">{g.title}:</span> {g.words.join(", ")}
              </div>
            ))}
          </div>
        )}

        {/* Controls */}
        {!gameOver && (
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn("w-4 h-4 rounded-full border-2", i < mistakes ? "bg-[var(--foreground)] border-[var(--foreground)]" : "border-[var(--muted)]")}
                />
              ))}
            </div>
            <button
              onClick={() => setSelected([])}
              className="px-4 py-2 rounded-full border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors"
            >
              Abwählen
            </button>
            <button
              onClick={submit}
              disabled={selected.length !== 4}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-colors",
                selected.length === 4
                  ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                  : "bg-[var(--card)] text-[var(--muted)] cursor-not-allowed"
              )}
            >
              Einreichen
            </button>
          </div>
        )}

        <div className="flex gap-4 text-xs text-[var(--muted)]">
          {DIFFICULTY_LABELS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm" style={{ background: DIFFICULTY_COLORS[i] }} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
