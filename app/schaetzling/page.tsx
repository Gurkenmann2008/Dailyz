"use client";

import { useState } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailySchaetzling, getHint, getClosenessPercent } from "@/lib/schaetzling";
import { markGamePlayed } from "@/lib/streak";
import { cn } from "@/lib/utils";

const MAX_GUESSES = 5;

type HintType = "correct" | "zu_hoch" | "zu_niedrig" | "sehr_nah";

const HINT_CONFIG: Record<HintType, { label: string; color: string; emoji: string }> = {
  correct: { label: "Richtig!", color: "#6aaa64", emoji: "🎯" },
  sehr_nah: { label: "Sehr nah!", color: "#c9b458", emoji: "🔥" },
  zu_hoch: { label: "Zu hoch ↓", color: "#DD0000", emoji: "📉" },
  zu_niedrig: { label: "Zu niedrig ↑", color: "#60a5fa", emoji: "📈" },
};

export default function SchaetzlingPage() {
  const puzzle = getDailySchaetzling();
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<{ value: number; hint: HintType }[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");

  function submit() {
    const val = parseInt(input.replace(/[^0-9]/g, ""), 10);
    if (isNaN(val) || val <= 0) return;
    const hint = getHint(val, puzzle.answer);
    const newGuesses = [...guesses, { value: val, hint }];
    setGuesses(newGuesses);
    setInput("");
    if (hint === "correct" || hint === "sehr_nah") {
      setStatus("won");
      markGamePlayed("schaetzling");
    } else if (newGuesses.length >= MAX_GUESSES) {
      setStatus("lost");
    }
  }

  const latestHint = guesses[guesses.length - 1]?.hint;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex flex-col flex-1 items-center py-8 px-4 gap-6 max-w-md mx-auto w-full">
        <div className="text-center">
          <h2 className="text-2xl font-black">SCHÄTZLING</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Schätze die richtige Zahl · {MAX_GUESSES} Versuche</p>
        </div>

        {/* Question card */}
        <div className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 text-center">
          <div className="text-5xl mb-4">{puzzle.emoji}</div>
          <h3 className="text-lg font-bold mb-2">{puzzle.question}</h3>
          {puzzle.unit && <p className="text-sm text-[var(--muted)]">Antwort in: <strong>{puzzle.unit}</strong></p>}
          <p className="text-xs text-[var(--muted)] mt-2 italic">{puzzle.hint}</p>
        </div>

        {/* Guesses list */}
        {guesses.length > 0 && (
          <div className="w-full flex flex-col gap-2">
            {guesses.map((g, i) => {
              const closeness = getClosenessPercent(g.value, puzzle.answer);
              const cfg = HINT_CONFIG[g.hint];
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-[var(--card)] border border-[var(--card-border)]">{i + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{g.value.toLocaleString("de-DE")} {puzzle.unit}</span>
                      <span className="text-sm font-bold" style={{ color: cfg.color }}>{cfg.emoji} {cfg.label}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--card-border)] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${closeness}%`, background: cfg.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Latest hint big display */}
        {latestHint && latestHint !== "correct" && (
          <div className="text-4xl font-black" style={{ color: HINT_CONFIG[latestHint].color }}>
            {HINT_CONFIG[latestHint].emoji} {HINT_CONFIG[latestHint].label}
          </div>
        )}

        {status === "won" && (
          <div className="text-center">
            <p className="text-3xl font-black text-[#6aaa64]">🎯 Richtig!</p>
            <p className="text-[var(--muted)] text-sm mt-1">Die Antwort war: <strong>{puzzle.answer.toLocaleString("de-DE")} {puzzle.unit}</strong></p>
            <p className="text-[var(--muted)] text-xs mt-1">In {guesses.length} Versuch{guesses.length !== 1 ? "en" : ""}</p>
          </div>
        )}

        {status === "lost" && (
          <div className="text-center">
            <p className="text-2xl font-black text-[#DD0000]">😔 Nicht getroffen!</p>
            <p className="text-[var(--muted)] mt-1">Die Antwort war: <strong className="text-[var(--foreground)]">{puzzle.answer.toLocaleString("de-DE")} {puzzle.unit}</strong></p>
          </div>
        )}

        {/* Input */}
        {status === "playing" && (
          <div className="w-full flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              {Array.from({ length: MAX_GUESSES }).map((_, i) => (
                <div key={i} className={cn("w-3 h-3 rounded-full border-2", i < guesses.length ? "bg-[var(--foreground)] border-[var(--foreground)]" : "border-[var(--muted)]")} />
              ))}
              <span className="ml-1">{guesses.length}/{MAX_GUESSES} Versuche</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder={`Deine Schätzung${puzzle.unit ? ` in ${puzzle.unit}` : ""}...`}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] font-bold text-lg focus:outline-none focus:border-[var(--foreground)] transition-colors"
              />
              <button
                onClick={submit}
                className="px-5 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-sm hover:opacity-90"
              >
                Schätzen
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
