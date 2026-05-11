export interface VerbindungenPuzzle {
  day: number;
  groups: {
    title: string;
    words: string[];
    difficulty: 0 | 1 | 2 | 3;
  }[];
}

export const VERBINDUNGEN_PUZZLES: VerbindungenPuzzle[] = [
  {
    day: 1,
    groups: [
      { title: "Himmelsrichtungen", words: ["NORD", "SÜD", "OST", "WEST"], difficulty: 0 },
      { title: "Jahreszeiten", words: ["FRÜHLING", "SOMMER", "HERBST", "WINTER"], difficulty: 1 },
      { title: "___ Ball", words: ["FUß", "HAND", "BASKET", "VOLLEY"], difficulty: 2 },
      { title: "Farben im Deutschen", words: ["ROT", "BLAU", "GRÜN", "GELB"], difficulty: 3 },
    ],
  },
  {
    day: 2,
    groups: [
      { title: "Haustiere", words: ["HUND", "KATZE", "VOGEL", "FISCH"], difficulty: 0 },
      { title: "Planeten", words: ["MARS", "VENUS", "SATURN", "JUPITER"], difficulty: 1 },
      { title: "Deutsche Städte", words: ["BERLIN", "MÜNCHEN", "HAMBURG", "KÖLN"], difficulty: 2 },
      { title: "___ Kuchen", words: ["KÄSE", "STEIN", "APFEL", "ZIMT"], difficulty: 3 },
    ],
  },
  {
    day: 3,
    groups: [
      { title: "Musikinstrumente", words: ["GITARRE", "KLAVIER", "TROMPETE", "GEIGE"], difficulty: 0 },
      { title: "Gemüse", words: ["KAROTTE", "TOMATE", "GURKE", "PAPRIKA"], difficulty: 1 },
      { title: "Berufe", words: ["ARZT", "LEHRER", "BÄCKER", "PILOT"], difficulty: 2 },
      { title: "___ Zeit", words: ["FREIZEIT", "ARBEITSZEIT", "REISEZEIT", "MAHLZEIT"], difficulty: 3 },
    ],
  },
];

export const DIFFICULTY_COLORS = ["#f5dd63", "#a0c35a", "#b0c4ef", "#ba81c5"] as const;
export const DIFFICULTY_LABELS = ["Einfach", "Mittel", "Schwer", "Sehr schwer"] as const;

export function getDailyVerbindungen(): VerbindungenPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return VERBINDUNGEN_PUZZLES[diff % VERBINDUNGEN_PUZZLES.length];
}
