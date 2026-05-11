export type TileStatus = "empty" | "tbd" | "correct" | "present" | "absent";
export type GameStatus = "playing" | "won" | "lost";
export type LetterState = "correct" | "present" | "absent";

export function evaluateGuess(guess: string, solution: string): TileStatus[] {
  const result: TileStatus[] = Array(5).fill("absent") as TileStatus[];
  const sol = solution.split("");
  const g = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (g[i] === sol[i]) {
      result[i] = "correct";
      sol[i] = "#";
      g[i] = "*";
    }
  }

  for (let i = 0; i < 5; i++) {
    if (g[i] === "*") continue;
    const idx = sol.indexOf(g[i]);
    if (idx !== -1) {
      result[i] = "present";
      sol[idx] = "#";
    }
  }

  return result;
}

export function computeLetterStates(
  guesses: string[],
  evaluations: TileStatus[][]
): Record<string, LetterState> {
  const states: Record<string, LetterState> = {};
  guesses.forEach((guess, gi) => {
    guess.split("").forEach((letter, i) => {
      const next = evaluations[gi][i] as LetterState;
      const current = states[letter];
      if (current === "correct") return;
      if (next === "correct" || !current || (next === "present" && current === "absent")) {
        states[letter] = next;
      }
    });
  });
  return states;
}

export const WIN_MESSAGES = [
  "Brilliant!", "Hervorragend!", "Beeindruckend!", "Toll gemacht!",
  "Gut gespielt!", "Puh, gerade noch!"
];
