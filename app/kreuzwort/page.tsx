"use client";

import { useState, useEffect, useRef } from "react";
import { PlatformHeader } from "@/components/layout/PlatformHeader";
import { getDailyKreuzwort } from "@/lib/kreuzwort";
import { cn } from "@/lib/utils";

export default function KreuzwortPage() {
  const puzzle = getDailyKreuzwort();
  const size = 5;

  // user input grid
  const [userGrid, setUserGrid] = useState<string[][]>(
    Array.from({ length: size }, () => Array(size).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [direction, setDirection] = useState<"across" | "down">("across");
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlack = (r: number, c: number) => puzzle.grid[r][c] === null;

  function selectCell(r: number, c: number) {
    if (isBlack(r, c)) return;
    if (selectedCell && selectedCell[0] === r && selectedCell[1] === c) {
      setDirection((d) => (d === "across" ? "down" : "across"));
    } else {
      setSelectedCell([r, c]);
    }
    inputRef.current?.focus();
  }

  function handleInput(key: string) {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (key === "Backspace") {
      setUserGrid((g) => {
        const ng = g.map((row) => [...row]);
        ng[r][c] = "";
        return ng;
      });
      return;
    }
    if (/^[A-ZÄÖÜ]$/.test(key.toUpperCase())) {
      setUserGrid((g) => {
        const ng = g.map((row) => [...row]);
        ng[r][c] = key.toUpperCase();
        return ng;
      });
      // Advance cursor
      if (direction === "across") {
        for (let nc = c + 1; nc < size; nc++) {
          if (!isBlack(r, nc)) { setSelectedCell([r, nc]); break; }
        }
      } else {
        for (let nr = r + 1; nr < size; nr++) {
          if (!isBlack(nr, c)) { setSelectedCell([nr, c]); break; }
        }
      }
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!selectedCell) return;
      handleInput(e.key === "Backspace" ? "Backspace" : e.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell, direction, userGrid]);

  function isCorrect(r: number, c: number) {
    return checked && puzzle.grid[r][c] !== null && userGrid[r][c] === puzzle.grid[r][c];
  }
  function isWrong(r: number, c: number) {
    return checked && puzzle.grid[r][c] !== null && userGrid[r][c] !== "" && userGrid[r][c] !== puzzle.grid[r][c];
  }

  const isSolved = puzzle.grid.every((row, r) =>
    row.every((cell, c) => cell === null || userGrid[r][c] === cell)
  );

  // Cell number map
  const cellNumbers: Record<string, number> = {};
  let num = 1;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (isBlack(r, c)) continue;
      const startsAcross = (c === 0 || isBlack(r, c - 1)) && c + 1 < size && !isBlack(r, c + 1);
      const startsDown = (r === 0 || isBlack(r - 1, c)) && r + 1 < size && !isBlack(r + 1, c);
      if (startsAcross || startsDown) {
        cellNumbers[`${r},${c}`] = num++;
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHeader />
      <input ref={inputRef} className="sr-only" readOnly />
      <main className="flex flex-col flex-1 items-center py-8 px-4 gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-black">MINI-KREUZWORT</h2>
          <p className="text-xs text-[var(--muted)] mt-1">5×5 Kreuzworträtsel · Rätsel #{puzzle.day}</p>
        </div>

        {isSolved && (
          <div className="text-center text-xl font-black text-[#6aaa64]">🎉 Fertig! Hervorragend!</div>
        )}

        {/* Grid */}
        <div
          className="grid gap-0.5 border border-[var(--foreground)]"
          style={{ gridTemplateColumns: `repeat(${size}, 2.5rem)` }}
        >
          {Array.from({ length: size }).map((_, r) =>
            Array.from({ length: size }).map((_, c) => {
              const black = isBlack(r, c);
              const sel = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const num = cellNumbers[`${r},${c}`];
              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => !black && selectCell(r, c)}
                  className={cn(
                    "w-10 h-10 relative border border-[var(--card-border)] flex items-center justify-center",
                    black && "bg-[var(--foreground)]",
                    !black && "cursor-pointer",
                    sel && "bg-[#FFCE00]/40",
                    isCorrect(r, c) && "bg-[#6aaa64]/30",
                    isWrong(r, c) && "bg-[#DD0000]/30",
                  )}
                >
                  {num && (
                    <span className="absolute top-0 left-0.5 text-[8px] font-bold text-[var(--muted)]">
                      {num}
                    </span>
                  )}
                  {!black && (
                    <span className="text-sm font-bold uppercase">{userGrid[r][c]}</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setDirection((d) => d === "across" ? "down" : "across")}
            className="px-4 py-2 rounded-full border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            {direction === "across" ? "→ Waagerecht" : "↓ Senkrecht"}
          </button>
          <button
            onClick={() => setChecked((c) => !c)}
            className="px-4 py-2 rounded-full border border-[var(--card-border)] text-sm font-medium hover:bg-[var(--card)] transition-colors"
          >
            {checked ? "Prüfung aus" : "Prüfen"}
          </button>
        </div>

        {/* Clues */}
        <div className="w-full max-w-md grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-[var(--muted)]">Waagerecht</h3>
            {puzzle.clues.across.map((c) => (
              <div key={c.number} className="mb-1.5">
                <span className="font-bold mr-1">{c.number}.</span>
                <span className="text-[var(--muted)]">{c.clue}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-[var(--muted)]">Senkrecht</h3>
            {puzzle.clues.down.map((c) => (
              <div key={c.number} className="mb-1.5">
                <span className="font-bold mr-1">{c.number}.</span>
                <span className="text-[var(--muted)]">{c.clue}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
