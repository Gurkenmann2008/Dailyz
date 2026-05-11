"use client";

import { LetterState } from "@/lib/game";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Y", "X", "C", "V", "B", "N", "M", "⌫"],
];

interface KeyboardProps {
  letterStates: Record<string, LetterState>;
  onKey: (key: string) => void;
}

export function Keyboard({ letterStates, onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[500px] mx-auto px-1">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const state = letterStates[key];
            const colorClass = state ? `key-${state}` : "key-default";
            const isWide = key === "ENTER" || key === "⌫";
            return (
              <button
                key={key}
                className={`key ${colorClass}`}
                style={{ width: isWide ? 64 : 43 }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  onKey(key);
                }}
                aria-label={key}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
