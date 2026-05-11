export interface FlaggePuzzle {
  flag: string;
  country: string;
  options: string[];
  hint: string;
}

const COUNTRIES = [
  { flag: "🇩🇪", country: "Deutschland", hint: "Europäisches Land mit Bratwurst und Bier" },
  { flag: "🇫🇷", country: "Frankreich", hint: "Land des Eiffelturms" },
  { flag: "🇮🇹", country: "Italien", hint: "Stiefelförmige Halbinsel" },
  { flag: "🇪🇸", country: "Spanien", hint: "Land des Flamenco und der Siesta" },
  { flag: "🇯🇵", country: "Japan", hint: "Land der aufgehenden Sonne" },
  { flag: "🇧🇷", country: "Brasilien", hint: "Größtes Land Südamerikas" },
  { flag: "🇨🇦", country: "Kanada", hint: "Nordamerikanisches Land mit Ahornblatt" },
  { flag: "🇦🇺", country: "Australien", hint: "Kontinent und Inselstaat" },
  { flag: "🇨🇳", country: "China", hint: "Bevölkerungsreichstes Land der Welt" },
  { flag: "🇮🇳", country: "Indien", hint: "Land mit dem Taj Mahal" },
  { flag: "🇲🇽", country: "Mexiko", hint: "Land des Tequilas" },
  { flag: "🇦🇷", country: "Argentinien", hint: "Tango und Messi kommen von hier" },
  { flag: "🇳🇱", country: "Niederlande", hint: "Land der Tulpen und Windmühlen" },
  { flag: "🇵🇹", country: "Portugal", hint: "Westlichstes Land Kontinentaleuropas" },
  { flag: "🇬🇷", country: "Griechenland", hint: "Heimat der Antike und Olympia" },
  { flag: "🇵🇱", country: "Polen", hint: "Östlicher EU-Nachbar Deutschlands" },
  { flag: "🇹🇷", country: "Türkei", hint: "Verbindet Europa und Asien" },
  { flag: "🇸🇦", country: "Saudi-Arabien", hint: "Ölreiches Königreich auf der Arabischen Halbinsel" },
  { flag: "🇿🇦", country: "Südafrika", hint: "Land am Kap der Guten Hoffnung" },
  { flag: "🇳🇴", country: "Norwegen", hint: "Skandinavisches Land der Fjorde" },
  { flag: "🇸🇪", country: "Schweden", hint: "ABBA und IKEA kommen von hier" },
  { flag: "🇨🇭", country: "Schweiz", hint: "Alpenland mit vier Sprachen" },
  { flag: "🇦🇹", country: "Österreich", hint: "Deutschsprachiger Nachbar Deutschlands" },
  { flag: "🇰🇷", country: "Südkorea", hint: "Land der K-Pop und Samsung" },
  { flag: "🇷🇺", country: "Russland", hint: "Flächenmäßig größtes Land der Welt" },
  { flag: "🇺🇸", country: "USA", hint: "Land der Freiheitsstatue" },
  { flag: "🇬🇧", country: "Vereinigtes Königreich", hint: "Inselstaat mit Big Ben" },
  { flag: "🇧🇪", country: "Belgien", hint: "Hauptstadt der EU liegt hier" },
  { flag: "🇺🇦", country: "Ukraine", hint: "Größtes Land vollständig in Europa" },
  { flag: "🇮🇱", country: "Israel", hint: "Land am Mittelmeer und Toten Meer" },
];

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = seed;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function getDailyFlagge(): FlaggePuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const day = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  const puzzle = COUNTRIES[day % COUNTRIES.length];
  const others = COUNTRIES.filter((c) => c.country !== puzzle.country);
  const shuffled = seededShuffle(others, day);
  const options = seededShuffle(
    [puzzle.country, shuffled[0].country, shuffled[1].country, shuffled[2].country],
    day + 42
  );
  return { flag: puzzle.flag, country: puzzle.country, options, hint: puzzle.hint };
}
