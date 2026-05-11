"use client";

import { TileStatus } from "@/lib/game";
import { Tile } from "./Tile";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

interface BoardProps {
  guesses: string[];
  currentGuess: string;
  evaluations: TileStatus[][];
  shakingRow: number | null;
  revealingRow: number | null;
  bouncingRow: number | null;
}

export function Board({
  guesses,
  currentGuess,
  evaluations,
  shakingRow,
  revealingRow,
  bouncingRow,
}: BoardProps) {
  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    const isCompleted = i < guesses.length;
    const isCurrent = i === guesses.length;
    const word = isCompleted ? guesses[i] : isCurrent ? currentGuess : "";
    const statuses: TileStatus[] = isCompleted
      ? evaluations[i]
      : Array(WORD_LENGTH).fill("empty");

    return { word, statuses, isCompleted, isCurrent };
  });

  return (
    <div className="flex flex-col gap-1.5 items-center">
      {rows.map(({ word, statuses, isCompleted }, i) => (
        <div
          key={i}
          className={`flex gap-1.5${shakingRow === i ? " row-shake" : ""}`}
        >
          {Array.from({ length: WORD_LENGTH }, (_, j) => {
            const letter = word[j] ?? "";
            const rawStatus = statuses[j];
            const status: TileStatus =
              isCompleted
                ? rawStatus
                : letter
                ? "tbd"
                : "empty";

            return (
              <Tile
                key={j}
                letter={letter}
                status={status}
                position={j}
                isRevealing={revealingRow === i}
                isBouncing={bouncingRow === i}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
