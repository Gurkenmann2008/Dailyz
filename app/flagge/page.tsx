"use client";

import { useState } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyFlagge } from "@/lib/flagge";
import { cn } from "@/lib/utils";

export default function FlaggePage() {
  const puzzle = getDailyFlagge();
  const [selected, setSelected] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(false);

  const answered = selected !== null;
  const correct = selected === puzzle.country;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex flex-col flex-1 items-center py-12 px-4 gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-black">FLAGGE</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Welches Land gehört zu dieser Flagge?</p>
        </div>

        <div className="text-[10rem] leading-none select-none" role="img" aria-label="Flagge">
          {puzzle.flag}
        </div>

        {answered ? (
          <div className="text-center">
            {correct ? (
              <>
                <p className="text-3xl font-black text-[#6aaa64] mb-1">🎉 Richtig!</p>
                <p className="text-lg font-bold">{puzzle.country}</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-black text-[#DD0000] mb-1">Falsch!</p>
                <p className="text-[var(--muted)]">Die Antwort war: <strong className="text-[var(--foreground)]">{puzzle.country}</strong></p>
              </>
            )}
            <p className="text-sm text-[var(--muted)] mt-3 max-w-xs">{puzzle.hint}</p>
          </div>
        ) : (
          <div className="w-full max-w-sm flex flex-col gap-3">
            {puzzle.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelected(option)}
                className="py-4 px-6 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] font-bold text-sm hover:border-[var(--foreground)] transition-all active:scale-[0.98]"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {!answered && (
          <button
            onClick={() => setHintVisible((v) => !v)}
            className="text-xs text-[var(--muted)] underline hover:text-[var(--foreground)] transition-colors"
          >
            {hintVisible ? "Hinweis ausblenden" : "Hinweis anzeigen"}
          </button>
        )}

        {hintVisible && !answered && (
          <p className="text-sm text-[var(--muted)] italic max-w-xs text-center">{puzzle.hint}</p>
        )}

        {answered && (
          <div className="flex gap-2 items-center">
            <div className={cn("w-5 h-5 rounded-full", correct ? "bg-[#6aaa64]" : "bg-[#DD0000]")} />
            <span className="text-sm text-[var(--muted)]">Morgen gibt es eine neue Flagge</span>
          </div>
        )}
      </main>
    </div>
  );
}
