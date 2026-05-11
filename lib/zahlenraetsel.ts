export const EQUATIONS: string[] = [
  "3+4×2=11",
  "12÷4+1=4",
  "5×3-2=13",
  "8+6÷2=11",
  "7×2-5=9",
  "4+8÷2=8",
  "9-3×2=3",
  "6×4÷8=3",
  "15-3×4=3",
  "2×7+1=15",
  "10÷2+3=8",
  "4×4-2=14",
  "18÷3-1=5",
  "5+3×3=14",
  "8×2-7=9",
  "6+4×3=18",
  "20÷4+2=7",
  "3×5-4=11",
  "9+6÷3=11",
  "7×3-8=13",
];

export type TileStatus = "empty" | "tbd" | "correct" | "present" | "absent";

export function getDailyEquation(): string {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return EQUATIONS[diff % EQUATIONS.length];
}

export function evaluateEquation(guess: string, solution: string): TileStatus[] {
  const result: TileStatus[] = Array(solution.length).fill("absent") as TileStatus[];
  const sol = solution.split("");
  const g = guess.split("");

  for (let i = 0; i < solution.length; i++) {
    if (g[i] === sol[i]) {
      result[i] = "correct";
      sol[i] = "#";
      g[i] = "*";
    }
  }

  for (let i = 0; i < solution.length; i++) {
    if (g[i] === "*") continue;
    const idx = sol.indexOf(g[i]);
    if (idx !== -1) {
      result[i] = "present";
      sol[idx] = "#";
    }
  }

  return result;
}

export function isValidEquation(eq: string): boolean {
  try {
    const [lhs, rhs] = eq.split("=");
    if (!lhs || !rhs) return false;
    const normalized = lhs.replace(/×/g, "*").replace(/÷/g, "/");
    // eslint-disable-next-line no-eval
    const result = Function(`"use strict"; return (${normalized})`)();
    return Math.abs(result - Number(rhs)) < 0.0001;
  } catch {
    return false;
  }
}
