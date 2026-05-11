export interface SLFPuzzle {
  letter: string;
  official: { stadt: string; land: string; fluss: string; tier: string; beruf: string };
}

const PUZZLES: SLFPuzzle[] = [
  { letter: "B", official: { stadt: "Berlin", land: "Brasilien", fluss: "Brenz", tier: "Bär", beruf: "Bäcker" } },
  { letter: "M", official: { stadt: "München", land: "Mexiko", fluss: "Main", tier: "Maus", beruf: "Maurer" } },
  { letter: "H", official: { stadt: "Hamburg", land: "Holland", fluss: "Havel", tier: "Hase", beruf: "Heilpraktiker" } },
  { letter: "K", official: { stadt: "Köln", land: "Kenia", fluss: "Kocher", tier: "Kuh", beruf: "Koch" } },
  { letter: "F", official: { stadt: "Frankfurt", land: "Frankreich", fluss: "Fulda", tier: "Fuchs", beruf: "Förster" } },
  { letter: "S", official: { stadt: "Stuttgart", land: "Spanien", fluss: "Saale", tier: "Schaf", beruf: "Schreiner" } },
  { letter: "D", official: { stadt: "Dresden", land: "Dänemark", fluss: "Donau", tier: "Dachs", beruf: "Dachdecker" } },
  { letter: "L", official: { stadt: "Leipzig", land: "Lettland", fluss: "Lahn", tier: "Löwe", beruf: "Lehrer" } },
  { letter: "N", official: { stadt: "Nürnberg", land: "Norwegen", fluss: "Neckar", tier: "Nashorn", beruf: "Notar" } },
  { letter: "R", official: { stadt: "Rostock", land: "Rumänien", fluss: "Rhein", tier: "Reh", beruf: "Richter" } },
  { letter: "A", official: { stadt: "Augsburg", land: "Argentinien", fluss: "Aller", tier: "Adler", beruf: "Arzt" } },
  { letter: "E", official: { stadt: "Erfurt", land: "Ecuador", fluss: "Elbe", tier: "Elch", beruf: "Elektriker" } },
  { letter: "G", official: { stadt: "Göttingen", land: "Griechenland", fluss: "Glan", tier: "Gorilla", beruf: "Gärtner" } },
  { letter: "W", official: { stadt: "Wiesbaden", land: "Wales", fluss: "Weser", tier: "Wolf", beruf: "Winzer" } },
  { letter: "T", official: { stadt: "Tübingen", land: "Tschechien", fluss: "Trave", tier: "Tiger", beruf: "Tischler" } },
];

export const TIMER_SECONDS = 60;

export function getDailySLF(): SLFPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return PUZZLES[diff % PUZZLES.length];
}

export function scoreSLFAnswer(input: string, official: string, letter: string): { points: number; label: string } {
  const up = input.trim().toUpperCase();
  const off = official.toUpperCase();
  if (!up || up[0] !== letter.toUpperCase()) return { points: 0, label: "Kein Punkt" };
  if (up === off) return { points: 5, label: "Gleich wie Musterlösung" };
  return { points: 10, label: "Einzigartig! 🎉" };
}
