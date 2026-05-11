export interface CrosswordPuzzle {
  day: number;
  grid: (string | null)[][];
  clues: {
    across: { number: number; clue: string; row: number; col: number; length: number }[];
    down: { number: number; clue: string; row: number; col: number; length: number }[];
  };
}

// 5x5 grid: null = black cell, string = letter
export const PUZZLES: CrosswordPuzzle[] = [
  {
    day: 1,
    grid: [
      ["B", "R", "O", "T", null],
      ["A", null, "S", null, "H"],
      ["U", "H", "R", "E", "N"],
      [null, null, "E", null, "D"],
      ["S", "P", "N", null, null],
    ],
    clues: {
      across: [
        { number: 1, clue: "Wird beim Bäcker gekauft", row: 0, col: 0, length: 4 },
        { number: 4, clue: "Zeitanzeige, rund oder eckig", row: 2, col: 0, length: 4 },
        { number: 5, clue: "Plural von Hand", row: 4, col: 0, length: 3 },
      ],
      down: [
        { number: 1, clue: "Baustoff aus Lehm und Stroh", row: 0, col: 0, length: 3 },
        { number: 2, clue: "Befindet sich im Gehäuse (Computer)", row: 0, col: 2, length: 5 },
        { number: 3, clue: "Tierische Lautäußerung (Hund)", row: 0, col: 4, length: 4 },
      ],
    },
  },
  {
    day: 2,
    grid: [
      ["S", "T", "E", "R", "N"],
      ["A", null, "R", null, "E",],
      ["L", "A", "D", "E", "T"],
      ["Z", null, "E", null, "Z"],
      [null, "T", "N", "E", "E"],
    ],
    clues: {
      across: [
        { number: 1, clue: "Leuchtet am Nachthimmel", row: 0, col: 0, length: 5 },
        { number: 3, clue: "Lädt Batterien auf", row: 2, col: 0, length: 5 },
        { number: 5, clue: "___ und Jetzt", row: 4, col: 1, length: 4 },
      ],
      down: [
        { number: 1, clue: "Speisefisch (heißt wie eine Stadt)", row: 0, col: 0, length: 4 },
        { number: 2, clue: "Geht in die Schule", row: 0, col: 2, length: 5 },
        { number: 4, clue: "Gegenteil von alt", row: 0, col: 4, length: 5 },
      ],
    },
  },
];

export function getDailyKreuzwort(): CrosswordPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return PUZZLES[diff % PUZZLES.length];
}
