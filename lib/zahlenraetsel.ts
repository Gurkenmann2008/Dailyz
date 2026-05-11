export type TileStatus = "empty" | "tbd" | "correct" | "present" | "absent";

// All equations are exactly 8 characters, mathematically correct with standard precedence
export const EQUATIONS: string[] = [
  "3+4×2=11", "12÷4+1=4", "5×3-2=13", "8+6÷2=11", "4×4-2=14",
  "18÷3-1=5", "5+3×3=14", "2×7+1=15", "10÷2+3=8", "6+4×3=18",
  "20÷4+2=7", "3×5-4=11", "9+6÷3=11", "7×3-8=13", "5×4-3=17",
  "8×2+1=17", "9×2-5=13", "6×3+2=20", "5×3+3=18", "4×5-3=17",
  "8×3-7=17", "9×2+1=19", "6×4-7=17", "14-3×2=8", "17-2×5=7",
  "24÷8+1=4", "36÷4-6=3", "4+15÷3=9", "2+18÷6=5", "1+24÷8=4",
  "9-15÷3=4", "7+4×3=19", "8+3×4=20", "15÷3+3=8", "16÷4+4=8",
  "21÷3-5=2", "25÷5-3=2", "3×6+2=20", "2×9-8=10", "6×3-8=10",
  "4×3+4=16", "7×2+4=18", "3×4+6=18", "9×3-7=20", "6×2+4=16",
  "5×4-8=12", "7×2+2=16", "4×3-2=10", "8×3-4=20", "3×7-1=20",
];

export function getDailyEquation(): string {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return EQUATIONS[diff % EQUATIONS.length];
}

function safeEval(expr: string): number {
  const norm = expr.replace(/×/g, "*").replace(/÷/g, "/");
  const tokens: Array<number | string> = [];
  let i = 0;
  while (i < norm.length) {
    if (/[0-9]/.test(norm[i])) {
      let num = "";
      while (i < norm.length && /[0-9]/.test(norm[i])) num += norm[i++];
      tokens.push(parseInt(num, 10));
    } else {
      tokens.push(norm[i++]);
    }
  }
  // Handle × and ÷ first
  for (let j = 1; j < tokens.length; j += 2) {
    if (tokens[j] === "*" || tokens[j] === "/") {
      const a = tokens[j - 1] as number;
      const b = tokens[j + 1] as number;
      tokens.splice(j - 1, 3, tokens[j] === "*" ? a * b : a / b);
      j -= 2;
    }
  }
  let result = tokens[0] as number;
  for (let j = 1; j < tokens.length; j += 2) {
    result = tokens[j] === "+" ? result + (tokens[j + 1] as number) : result - (tokens[j + 1] as number);
  }
  return result;
}

export function isValidEquation(eq: string): boolean {
  if (!/^[0-9+\-×÷=]+$/.test(eq)) return false;
  const parts = eq.split("=");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;
  try {
    const result = safeEval(parts[0]);
    return Math.abs(result - Number(parts[1])) < 0.0001 && !isNaN(result);
  } catch {
    return false;
  }
}

export function evaluateEquation(guess: string, solution: string): TileStatus[] {
  const result: TileStatus[] = Array(solution.length).fill("absent") as TileStatus[];
  const sol = solution.split("");
  const g = guess.split("");
  for (let i = 0; i < solution.length; i++) {
    if (g[i] === sol[i]) { result[i] = "correct"; sol[i] = "#"; g[i] = "*"; }
  }
  for (let i = 0; i < solution.length; i++) {
    if (g[i] === "*") continue;
    const idx = sol.indexOf(g[i]);
    if (idx !== -1) { result[i] = "present"; sol[idx] = "#"; }
  }
  return result;
}
