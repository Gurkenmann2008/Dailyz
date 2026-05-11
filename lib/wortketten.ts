export interface WortkettenPuzzle {
  start: string;
  target: string;
  minSteps: number;
  hint?: string;
}

export const PUZZLES: WortkettenPuzzle[] = [
  { start: "KALT", target: "WARM", minSteps: 4, hint: "KALT→MALT→MALT→MART→WART→WARM" },
  { start: "HUND", target: "BUND", minSteps: 1 },
  { start: "BOOT", target: "BROT", minSteps: 2 },
  { start: "LICHT", target: "NICHT", minSteps: 1 },
  { start: "HAUS", target: "MAUS", minSteps: 1 },
  { start: "BAUM", target: "RAUM", minSteps: 1 },
  { start: "WELT", target: "GELT", minSteps: 2 },
  { start: "SAND", target: "BAND", minSteps: 1 },
  { start: "GELD", target: "WELT", minSteps: 2 },
  { start: "ZIEL", target: "VIEL", minSteps: 1 },
];

export const VALID_WORDS = new Set([
  "KALT","MALT","MART","WART","WARM","HUND","BUND","FUND","BOOT","BROT","GROT",
  "LICHT","NICHT","RICHT","HAUS","MAUS","LAUS","BAUM","RAUM","SAUM","WELT","GELT",
  "SAND","BAND","LAND","HAND","WAND","GELD","FELD","HELD","ZIEL","VIEL","KIEL",
  "BROT","GROT","TROT","HAUT","LAUT","FAUT","MALT","WALT","HALT","GALT",
  "MANN","BANN","KANN","DANN","WANN","RANN","TANN",
  "BETT","NETT","FETT","WETT","LETT",
  "LIED","BIED","RIET","NIET","MIET",
  "ROSE","LOSE","DOSE","POSE","NOSE",
]);

export function getDailyWortketten(): WortkettenPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return PUZZLES[diff % PUZZLES.length];
}

export function differsBy1(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diffs = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++;
    if (diffs > 1) return false;
  }
  return diffs === 1;
}
