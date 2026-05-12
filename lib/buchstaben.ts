export interface BuchstabenPuzzle {
  center: string;
  outer: [string, string, string, string, string, string];
  words: string[];    // all valid words for this puzzle
  pangrams: string[]; // words using all 7 letters (bonus)
}

// Scoring: 4-letter = 1pt, 5+ = length pts, pangram = length + 7 pts
export function scoreWord(word: string, puzzle: BuchstabenPuzzle): number {
  const allLetters = new Set([puzzle.center, ...puzzle.outer]);
  const wordLetters = new Set(word.split(""));
  const isPangram = [...allLetters].every((l) => wordLetters.has(l));
  if (word.length === 4) return isPangram ? 12 : 1;
  return isPangram ? word.length + 7 : word.length;
}

export function isValidEntry(word: string, puzzle: BuchstabenPuzzle): string | null {
  if (word.length < 4) return "Mindestens 4 Buchstaben!";
  const allowed = new Set([puzzle.center, ...puzzle.outer]);
  for (const ch of word) {
    if (!allowed.has(ch)) return `'${ch}' ist nicht erlaubt`;
  }
  if (!word.includes(puzzle.center)) return `Muss '${puzzle.center}' enthalten!`;
  if (!puzzle.words.includes(word)) return "Nicht im Wörterbuch";
  return null;
}

export const PUZZLES: BuchstabenPuzzle[] = [
  {
    center: "R",
    outer: ["E", "S", "T", "N", "A", "L"],
    pangrams: ["LATERNS"],
    words: [
      "RATEN","RATTEN","RASTE","RASTER","RENTE","RENTEN","REGEN","RESTE",
      "STERN","STERNE","STAHL","STERAN","STAREN",
      "TALER","TALENT","TALER","TANNEN","TREUE",
      "NATTER","NARREN","NERVEN",
      "LASTER","LATERN","LATERNE","LERNT","LEITER","LENKER",
      "ARTEL","ARSEN","LATERNS","NALTER",
      "SENTAR","ALTERN","ALTERE","ALTERS","RENTAL","TALER",
    ],
  },
  {
    center: "E",
    outer: ["N", "I", "G", "T", "A", "L"],
    pangrams: ["EINLAGE","GALINETTE"],
    words: [
      "EINE","EIGEN","EILTE","EINGABE","EINLAGE","EINIGE",
      "GENIE","GENIAL","GENIALEN","GELTE","GLEITEN",
      "NETT","NETTE","NEIN","NAGEL","NAGLE",
      "TINTE","TIGER","TEILTE","TEILEN",
      "LEGEN","LEITEN","LEITE","LEINER","LEINE",
      "ALGAE","ANGEL","ANGELN","LAGEN","LAGET",
      "GALIENT","NIETEN","NIETE","NIENTE",
    ],
  },
  {
    center: "A",
    outer: ["T", "S", "C", "H", "E", "N"],
    pangrams: ["NACHAHMEST"],
    words: [
      "ACHT","ACHSE","ACHTEN","AHNEN","ANTEN",
      "BACH","BACHE","BACKEN",
      "CACHE","CASES",
      "DACHS","DATES",
      "ECHSE","ECHT","ESSEN",
      "FACHE","FAHNE","FAHNEN",
      "HASEN","HASTE","HASTEN","HÄSCHEN","HEISE",
      "MATCH","MATCHES","MASCHE","MASCHEN","MACHT","MACHEN",
      "NACHT","NÄCHTE","NAHEN","NAHEN","NASE","NASEN",
      "SACHE","SACHEN","SACHT","SAHNE","SANFT","SCHACHTE",
      "TACHE","TASTE","TASCHE","TASCHEN","TATEN",
      "ACHTEN","ANSEHEN","ANTASTE",
    ],
  },
  {
    center: "L",
    outer: ["I", "E", "B", "A", "N", "D"],
    pangrams: ["LEBENDIG","BINDELA"],
    words: [
      "LIED","LIEDER","LIEBE","LADEN","LADE","LABEN","LABEL",
      "LADE","LADEN","LAND","LANDE","LANDI",
      "EILE","EILEND","ENKEL","EDEL","EBEND",
      "BAND","BANDE","BLENDE","BLEND","BILDER",
      "IDEE","IDEAL","INDIA",
      "NEID","NEIDE","NEBEL","NEBEL",
      "DIELE","DIENE","DIENEN","DIELEN","DIEBEL",
      "LABEL","LIBERAL","LEBENDIG",
    ],
  },
  {
    center: "G",
    outer: ["R", "O", "S", "E", "N", "A"],
    pangrams: ["ORGANSE","GARONES"],
    words: [
      "GARN","GARNE","GÄREN","GERNE","GESO","GONSEN",
      "REGEN","REGEN","ROSE","ROSEN","ROGGEN",
      "ORGAN","ORGANE","ORANGE","ORANGEN",
      "SEGOR","SEGEN","SANGEN","SANGER","SANG",
      "ENGEL","ENGAGER","ENGEN",
      "NAGEN","NAGER","NASE",
      "ORANG","ORGANE",
    ],
  },
  {
    center: "M",
    outer: ["A", "R", "K", "T", "E", "I"],
    pangrams: ["MARKTREIF"],
    words: [
      "MARK","MARKT","MARKE","MARKEN","MÄRKTE",
      "ARME","ARMER","ARMER",
      "REIM","REIME","REIFER","REIFT",
      "KARTE","KARTEN","KRIM","KRIMI",
      "TREIF","TRICK",
      "EIMARK","EIMER","EIMER",
      "TIMER","TIEFE","TIER",
      "MÄKLER","MIKRO","MIKRAT",
      "MATERIE","MARKET","MARKIERT",
    ],
  },
  {
    center: "H",
    outer: ["A", "U", "S", "T", "E", "R"],
    pangrams: ["HAUSTIERE"],
    words: [
      "HAUS","HAASE","HASTE","HASE","HASEN","HALTEN",
      "HUSTEN","HUSTER","HÜTER",
      "AUER","AUERS",
      "STAHL","STAUER","STEUER","STEUER",
      "RASTEN","RAUSTE","RESTE",
      "TASTE","TAUSCHE","TAUSCHER",
      "ERAST","ERASTE",
      "HAUSTIER","HAUSTIERE",
    ],
  },
  {
    center: "W",
    outer: ["E", "I", "T", "R", "A", "S"],
    pangrams: ["WEITRATS","WAITERS"],
    words: [
      "WEIT","WEITE","WEITER","WEISE","WAISE","WARTE","WARTEN","WASSER",
      "WATER","WIRTS","WIRTE",
      "EITER","EISTER",
      "RATES","RASTER","RASTE",
      "TASTE","TASTER",
      "SWARE","SWAT",
      "WAITS","WAITER","WAITERS",
    ],
  },
];

export function getDailyBuchstaben(): BuchstabenPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return PUZZLES[diff % PUZZLES.length];
}

export function getMaxScore(puzzle: BuchstabenPuzzle): number {
  return puzzle.words.reduce((sum, w) => sum + scoreWord(w, puzzle), 0);
}

export function getRankLabel(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 1) return "🏆 Königin der Bienen!";
  if (pct >= 0.7) return "⭐ Meisterin";
  if (pct >= 0.5) return "🐝 Expertin";
  if (pct >= 0.3) return "🌸 Gut!";
  if (pct >= 0.15) return "🌱 Anfängerin";
  return "🥚 Einsteigerin";
}
