"use client";

import { useState, useRef, useEffect } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyBuchstaben, isValidEntry, scoreWord, getMaxScore, getRankLabel } from "@/lib/buchstaben";
import { markGamePlayed } from "@/lib/streak";
import { cn } from "@/lib/utils";

const ALPHABET = "QWERTZUIOPASDFGHJKLYXCVBNMÄÖÜ".split("");

export default function BuchstabenPage() {
  const puzzle = getDailyBuchstaben();
  const maxScore = getMaxScore(puzzle);
  const hexLetters = [puzzle.outer[0], puzzle.outer[1], puzzle.center, puzzle.outer[2], puzzle.outer[3], puzzle.outer[4], puzzle.outer[5]];

  const [input, setInput] = useState("");
  const [found, setFound] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [solved, setSolved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 1800);
  }

  function addLetter(l: string) {
    setInput(i => i + l);
    inputRef.current?.focus();
  }

  function deleteLast() { setInput(i => i.slice(0, -1)); }

  function shuffleOuter() {
    // just a visual shuffle — no real state change needed
  }

  function submit() {
    const word = input.toUpperCase().trim();
    if (found.includes(word)) { showToast("Schon gefunden!", false); setInput(""); return; }
    const err = isValidEntry(word, puzzle);
    if (err) { showToast(err, false); setInput(""); return; }

    const pts = scoreWord(word, puzzle);
    const isPangram = puzzle.pangrams.includes(word);
    const newScore = score + pts;
    const newFound = [...found, word];
    setFound(newFound);
    setScore(newScore);
    setInput("");
    showToast(isPangram ? `🎉 Pangram! +${pts}` : `+${pts} Punkt${pts !== 1 ? "e" : ""}`, true);

    if (newFound.length >= puzzle.words.length) {
      setSolved(true);
      markGamePlayed("buchstaben");
    }
  }

  // Hex positions: top-left, top-right, middle-left, center, middle-right, bottom-left, bottom-right
  // Layout: 3 rows — [0,1] / [2,CENTER,3] / [4,5]
  const outerLetters = puzzle.outer;

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      {toast && (
        <div
          className={cn("toast", toast.ok ? "bg-[#6aaa64]" : "bg-[#DD0000]")}
          style={{ position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)", zIndex: 100 }}
        >
          {toast.msg}
        </div>
      )}

      <main className="flex flex-col flex-1 items-center py-6 px-4 gap-5 max-w-lg mx-auto w-full">
        <div className="text-center">
          <h2 className="text-2xl font-black">BUCHSTABEN</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Bilde Wörter mit dem mittleren Buchstaben · mind. 4 Zeichen</p>
        </div>

        {/* Score bar */}
        <div className="w-full">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-[var(--muted)]">{getRankLabel(score, maxScore)}</span>
            <span className="font-bold">{score} Punkte</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--card-border)] overflow-hidden">
            <div className="h-full rounded-full bg-[#FFCE00] transition-all duration-500" style={{ width: `${Math.min((score / maxScore) * 100, 100)}%` }} />
          </div>
        </div>

        {/* Found words */}
        <div className="w-full flex flex-wrap gap-1.5 min-h-[40px]">
          {found.map((w) => (
            <span key={w} className={cn("px-2.5 py-0.5 rounded-full text-sm font-bold", puzzle.pangrams.includes(w) ? "bg-[#FFCE00] text-black" : "bg-[var(--card)] border border-[var(--card-border)]")}>
              {w}
            </span>
          ))}
          {found.length === 0 && <span className="text-sm text-[var(--muted)] italic">Noch keine Wörter gefunden...</span>}
        </div>

        {/* Input display */}
        <div
          className="text-2xl font-black tracking-widest min-h-[40px] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {input.split("").map((ch, i) => (
            <span key={i} style={{ color: ch === puzzle.center ? "#FFCE00" : "var(--foreground)" }}>{ch}</span>
          ))}
          <span className="animate-pulse">|</span>
        </div>
        <input ref={inputRef} className="sr-only" value={input} onChange={e => setInput(e.target.value.toUpperCase())} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); submit(); } else if (e.key === "Backspace" && input === "") e.preventDefault(); }} />

        {/* Honeycomb */}
        <div className="relative" style={{ width: 240, height: 200 }}>
          {/* Row 1: outer[0], outer[1] */}
          {[outerLetters[0], outerLetters[1]].map((l, i) => (
            <button key={l} onClick={() => addLetter(l)}
              className="absolute w-16 h-16 rounded-xl bg-[var(--card)] border-2 border-[var(--card-border)] font-black text-xl hover:bg-[var(--card-border)] active:scale-95 transition-all"
              style={{ top: 0, left: i === 0 ? 40 : 120 }}
            >{l}</button>
          ))}
          {/* Row 2: outer[2], CENTER, outer[3] */}
          <button onClick={() => addLetter(outerLetters[2])}
            className="absolute w-16 h-16 rounded-xl bg-[var(--card)] border-2 border-[var(--card-border)] font-black text-xl hover:bg-[var(--card-border)] active:scale-95 transition-all"
            style={{ top: 72, left: 0 }}
          >{outerLetters[2]}</button>
          <button onClick={() => addLetter(puzzle.center)}
            className="absolute w-16 h-16 rounded-xl bg-[#FFCE00] border-2 border-[#f0c000] font-black text-xl text-black hover:brightness-95 active:scale-95 transition-all shadow-lg"
            style={{ top: 72, left: 80 }}
          >{puzzle.center}</button>
          <button onClick={() => addLetter(outerLetters[3])}
            className="absolute w-16 h-16 rounded-xl bg-[var(--card)] border-2 border-[var(--card-border)] font-black text-xl hover:bg-[var(--card-border)] active:scale-95 transition-all"
            style={{ top: 72, left: 160 }}
          >{outerLetters[3]}</button>
          {/* Row 3: outer[4], outer[5] */}
          {[outerLetters[4], outerLetters[5]].map((l, i) => (
            <button key={l} onClick={() => addLetter(l)}
              className="absolute w-16 h-16 rounded-xl bg-[var(--card)] border-2 border-[var(--card-border)] font-black text-xl hover:bg-[var(--card-border)] active:scale-95 transition-all"
              style={{ top: 144, left: i === 0 ? 40 : 120 }}
            >{l}</button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button onClick={deleteLast} className="px-5 py-2.5 rounded-xl border border-[var(--card-border)] font-bold text-sm hover:bg-[var(--card)] transition-colors">⌫</button>
          <button onClick={() => setInput("")} className="px-5 py-2.5 rounded-xl border border-[var(--card-border)] font-bold text-sm hover:bg-[var(--card)] transition-colors">Löschen</button>
          <button onClick={submit} className="px-6 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-black text-sm hover:opacity-90 transition-opacity">Eingabe</button>
        </div>

        <div className="text-xs text-[var(--muted)] text-center space-y-1">
          <p>Wörter müssen den <span className="font-bold text-[#FFCE00]">gelben Buchstaben</span> enthalten</p>
          <p>{found.length}/{puzzle.words.length} Wörter gefunden · Pangrams erscheinen in Gold</p>
        </div>

        {solved && (
          <div className="text-center">
            <p className="text-2xl font-black text-[#6aaa64]">🏆 Alle Wörter gefunden!</p>
            <p className="text-[var(--muted)] text-sm mt-1">{score} von {maxScore} möglichen Punkten</p>
          </div>
        )}
      </main>
    </div>
  );
}
