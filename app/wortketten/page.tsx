"use client";

import { useState, useEffect } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyWortketten, differsBy1, VALID_WORDS } from "@/lib/wortketten";
import { cn } from "@/lib/utils";

export default function WortkettenPage() {
  const puzzle = getDailyWortketten();
  const [chain, setChain] = useState<string[]>([puzzle.start]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [won, setWon] = useState(false);

  const current = chain[chain.length - 1];

  function submit() {
    const word = input.trim().toUpperCase();
    if (word.length !== puzzle.start.length) {
      setError(`Wort muss ${puzzle.start.length} Buchstaben haben`);
      return;
    }
    if (!differsBy1(current, word)) {
      setError("Nur ein Buchstabe darf sich unterscheiden!");
      return;
    }
    if (!VALID_WORDS.has(word)) {
      setError("Unbekanntes Wort!");
      return;
    }
    if (chain.includes(word)) {
      setError("Wort bereits verwendet!");
      return;
    }
    const newChain = [...chain, word];
    setChain(newChain);
    setInput("");
    setError(null);
    if (word === puzzle.target) setWon(true);
  }

  function undo() {
    if (chain.length > 1) {
      setChain((c) => c.slice(0, -1));
      setError(null);
    }
  }

  const steps = chain.length - 1;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex flex-col flex-1 items-center py-8 px-4 gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-black">WORT-KETTEN</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Ändere einen Buchstaben pro Schritt</p>
        </div>

        <div className="flex items-center gap-4 text-lg font-bold">
          <div className="px-4 py-2 rounded-xl bg-[#6aaa64]/20 text-[#6aaa64] border border-[#6aaa64]/30">
            {puzzle.start}
          </div>
          <span className="text-[var(--muted)]">→</span>
          <div className="px-4 py-2 rounded-xl bg-[#c9b458]/20 text-[#c9b458] border border-[#c9b458]/30">
            {puzzle.target}
          </div>
        </div>

        <p className="text-sm text-[var(--muted)]">
          Mindestschritte: <strong>{puzzle.minSteps}</strong> · Deine Schritte: <strong>{steps}</strong>
        </p>

        {/* Chain */}
        <div className="flex flex-col items-center gap-1">
          {chain.map((word, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={cn(
                  "px-6 py-2 rounded-xl font-bold text-lg border-2 font-mono",
                  word === puzzle.target
                    ? "bg-[#6aaa64]/20 border-[#6aaa64] text-[#6aaa64]"
                    : i === 0
                    ? "bg-[var(--card)] border-[var(--foreground)]"
                    : "bg-[var(--card)] border-[var(--card-border)]"
                )}
              >
                {word.split("").map((ch, ci) => (
                  <span
                    key={ci}
                    className={cn(
                      i > 0 && chain[i - 1][ci] !== ch && "text-[#DD0000]"
                    )}
                  >
                    {ch}
                  </span>
                ))}
              </div>
              {i < chain.length - 1 && <span className="text-[var(--muted)] text-xs">↓</span>}
            </div>
          ))}
        </div>

        {won ? (
          <div className="text-center">
            <p className="text-2xl font-black mb-1">🎉 Geschafft!</p>
            <p className="text-[var(--muted)] text-sm">
              {steps} Schritte{steps === puzzle.minSteps ? " — Perfekt!" : steps === puzzle.minSteps + 1 ? " — Fast perfekt!" : ""}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value.toUpperCase()); setError(null); }}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                maxLength={puzzle.start.length}
                placeholder={`${puzzle.start.length} Buchstaben...`}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] font-mono font-bold text-center text-lg uppercase focus:outline-none focus:border-[var(--foreground)]"
              />
              <button
                onClick={submit}
                className="px-4 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-bold"
              >
                →
              </button>
            </div>
            {error && <p className="text-sm text-[#DD0000] font-medium">{error}</p>}
            {chain.length > 1 && (
              <button
                onClick={undo}
                className="text-sm text-[var(--muted)] underline hover:text-[var(--foreground)] transition-colors"
              >
                Letzten Schritt rückgängig
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
