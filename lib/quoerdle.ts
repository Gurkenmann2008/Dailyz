import { SOLUTIONS } from "./words";

export function getDailyQuoerdleWords(): [string, string, string, string] {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const day = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  const len = SOLUTIONS.length;
  return [
    SOLUTIONS[(day * 7 + 0) % len],
    SOLUTIONS[(day * 7 + 11) % len],
    SOLUTIONS[(day * 7 + 23) % len],
    SOLUTIONS[(day * 7 + 37) % len],
  ];
}

export const QUOERDLE_MAX_GUESSES = 9;
