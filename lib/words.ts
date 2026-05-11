export const SOLUTIONS: string[] = [
  "SCHAF", "TISCH", "BRAND", "BLUME", "STEIN",
  "BRUST", "TRAUM", "SPORT", "KRAFT", "STURM",
  "KREUZ", "STERN", "VOGEL", "GRIFF", "PLATZ",
  "PFERD", "BRIEF", "FROST", "MUSIK", "RECHT",
  "WOCHE", "PREIS", "KREIS", "BLATT", "FISCH",
  "STADT", "NACHT", "FEUER", "BAUCH", "KATZE",
  "ANGST", "DRUCK", "BUSCH", "GEIST", "FEIND",
  "FREMD", "PFEIL", "SCHAL", "SCHUH", "BUCHE",
  "EICHE", "BIRKE", "DURST", "FARBE", "GABEL",
  "INSEL", "JACKE", "KLEID", "LAMPE", "MAUER",
  "NEBEL", "RAUCH", "WANGE", "ACKER", "BEERE",
  "EBENE", "FEDER", "GASSE", "HAFEN", "KAMIN",
  "LACHS", "NARBE", "ORDEN", "PERLE", "REGEN",
  "TIGER", "VATER", "WIESE", "ENGEL", "BODEN",
  "LEBEN", "LIEBE", "BRAUT", "MAGEN", "ZUNGE",
  "REISE", "RIESE", "ZWERG", "KERZE", "KRIEG",
  "GNADE", "OSTEN", "PILLE", "HACKE", "FLUSS",
  "DIELE", "SUCHT", "GREIS", "DACHS", "FORST",
  "GARDE", "LEHRE", "RENTE", "WETTE", "DECKE",
  "GLEIS", "TREUE", "RUDER", "RASEN", "WAISE",
];

export const ALL_VALID: Set<string> = new Set([
  ...SOLUTIONS,
  "HALLO", "TESTE", "SPIEL", "WORTE", "ZEIGE",
  "BUNTE", "HALTE", "WAHRE", "TIEFE", "ECKEN",
  "PFADE", "MEERE", "STUHL", "TRUHE", "BIRNE",
  "ERNTE", "TEILE", "RUINE", "RESTE", "SIPPE",
  "BROTE", "TINTE", "MIENE", "WEISE", "BIENE",
  "SENSE", "HEIDE", "LINIE", "METZE", "FINTE",
  "KRONE", "LAUBE", "GRUBE", "FALKE", "SCHNE",
  "MAGDE", "LAUGE", "SAURE", "DAUER", "FEIGE",
  "REIFE", "LUNGE", "GESTE", "KISTE", "KETTE",
]);

const START_DATE = new Date("2024-01-01T00:00:00Z");

export function getDayNumber(): number {
  const now = new Date();
  const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const startUTC = START_DATE.getTime();
  return Math.floor((todayUTC - startUTC) / 86400000);
}

export function getDailyWord(): string {
  return SOLUTIONS[getDayNumber() % SOLUTIONS.length];
}

export function isValidWord(word: string): boolean {
  return ALL_VALID.has(word.toUpperCase());
}
