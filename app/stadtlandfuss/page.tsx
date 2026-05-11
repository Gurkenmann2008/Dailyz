"use client";

import { useState, useEffect, useRef } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailySLF, scoreSLFAnswer, TIMER_SECONDS } from "@/lib/stadtlandfuss";
import { markGamePlayed } from "@/lib/streak";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "stadt", label: "🏙️ Stadt" },
  { id: "land", label: "🌍 Land" },
  { id: "fluss", label: "🌊 Fluss" },
  { id: "tier", label: "🐾 Tier" },
  { id: "beruf", label: "👷 Beruf" },
] as const;

type CategoryId = "stadt" | "land" | "fluss" | "tier" | "beruf";

export default function StadtLandFlussPage() {
  const puzzle = getDailySLF();
  const [answers, setAnswers] = useState<Record<CategoryId, string>>({ stadt: "", land: "", fluss: "", tier: "", beruf: "" });
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [phase, setPhase] = useState<"playing" | "done">("playing");
  const [scores, setScores] = useState<Record<CategoryId, { points: number; label: string } | null>>({ stadt: null, land: null, fluss: null, tier: null, beruf: null });
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setTimeLeft(prev => {
      if (prev <= 1) { finalize(); return 0; }
      return prev - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  function finalize() {
    setPhase("done");
    const s: Record<CategoryId, { points: number; label: string }> = {} as never;
    for (const cat of CATEGORIES) {
      s[cat.id] = scoreSLFAnswer(answers[cat.id], puzzle.official[cat.id], puzzle.letter);
    }
    setScores(s);
    markGamePlayed("stadtlandfuss");
  }

  const total = Object.values(scores).reduce((sum, s) => sum + (s?.points ?? 0), 0);
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <main className="flex flex-col flex-1 items-center py-8 px-4 gap-6 max-w-xl mx-auto w-full">
        <div className="text-center w-full">
          <h2 className="text-2xl font-black">STADT-LAND-FLUSS</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Buchstabe des Tages</p>
        </div>

        {/* Letter + Timer */}
        <div className="flex items-center justify-between w-full">
          <div className="text-7xl font-black text-[#FFCE00] leading-none">{puzzle.letter}</div>
          {phase === "playing" && (
            <div className="text-right">
              <div className={cn("text-3xl font-black tabular-nums", timeLeft <= 10 && "text-[#DD0000]")}>
                {timeLeft}s
              </div>
              <div className="w-20 h-2 rounded-full bg-[var(--card-border)] mt-1 overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", timeLeft > 20 ? "bg-[#6aaa64]" : timeLeft > 10 ? "bg-[#c9b458]" : "bg-[#DD0000]")}
                  style={{ width: `${timerPct}%` }}
                />
              </div>
            </div>
          )}
          {phase === "done" && (
            <div className="text-right">
              <p className="text-3xl font-black text-[#FFCE00]">{total}</p>
              <p className="text-xs text-[var(--muted)]">Punkte</p>
            </div>
          )}
        </div>

        {/* Input fields */}
        <div className="w-full flex flex-col gap-3">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id}>
              <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1 block">{cat.label}</label>
              <div className="flex gap-2 items-center">
                <input
                  ref={i === 0 ? firstRef : undefined}
                  type="text"
                  disabled={phase === "done"}
                  value={answers[cat.id]}
                  onChange={e => setAnswers(a => ({ ...a, [cat.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === "Enter" && i < CATEGORIES.length - 1) {
                      (document.querySelectorAll("input")[i + 1] as HTMLInputElement)?.focus();
                    } else if (e.key === "Enter" && i === CATEGORIES.length - 1) {
                      finalize();
                    }
                  }}
                  placeholder={`${cat.label.split(" ")[1]} mit ${puzzle.letter}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[var(--card-border)] bg-[var(--card)] font-medium focus:outline-none focus:border-[var(--foreground)] transition-colors disabled:opacity-60"
                />
                {phase === "done" && scores[cat.id] && (
                  <div className={cn("shrink-0 text-right min-w-[60px]")}>
                    <span className={cn("text-lg font-black", scores[cat.id]!.points === 10 ? "text-[#6aaa64]" : scores[cat.id]!.points === 5 ? "text-[#c9b458]" : "text-[var(--muted)]")}>
                      +{scores[cat.id]!.points}
                    </span>
                  </div>
                )}
              </div>
              {phase === "done" && (
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-[var(--muted)]">{scores[cat.id]?.label}</span>
                  <span className="font-medium">Musterlösung: <strong>{puzzle.official[cat.id]}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>

        {phase === "playing" && (
          <button
            onClick={finalize}
            className="w-full py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-sm hover:opacity-90 transition-opacity"
          >
            Fertig! Auswerten →
          </button>
        )}

        {phase === "done" && (
          <div className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-5 text-center">
            <p className="text-3xl font-black mb-1">{total} Punkte</p>
            <p className="text-sm text-[var(--muted)]">
              {total >= 40 ? "🏆 Perfekt!" : total >= 25 ? "⭐ Sehr gut!" : total >= 15 ? "👍 Gut gemacht!" : "💪 Morgen wieder!"}
            </p>
            <p className="text-xs text-[var(--muted)] mt-2">10 Punkte = einzigartige Antwort · 5 Punkte = Musterlösung · 0 = Leer/Falsch</p>
          </div>
        )}
      </main>
    </div>
  );
}
