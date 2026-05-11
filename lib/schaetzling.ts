export interface SchaetzlingQuestion {
  question: string;
  unit: string;
  answer: number;
  emoji: string;
  hint: string;
  tolerance: number; // % tolerance for "close" display
}

export const QUESTIONS: SchaetzlingQuestion[] = [
  { question: "Wie hoch ist der Kölner Dom?", unit: "Meter", answer: 157, emoji: "⛪", hint: "Eines der höchsten Bauwerke des Mittelalters", tolerance: 10 },
  { question: "Wie viele Einwohner hat München?", unit: "Tausend", answer: 1500, emoji: "🏙️", hint: "Größte Stadt Bayerns", tolerance: 15 },
  { question: "In welchem Jahr fiel die Berliner Mauer?", unit: "", answer: 1989, emoji: "🧱", hint: "Ende des Kalten Krieges in Deutschland", tolerance: 2 },
  { question: "Wie lang ist der Rhein?", unit: "km", answer: 1230, emoji: "🌊", hint: "Längster Fluss der durch Deutschland fließt", tolerance: 10 },
  { question: "Wie viele Bundesländer hat Deutschland?", unit: "", answer: 16, emoji: "🗺️", hint: "Inklusive Stadtstaaten", tolerance: 0 },
  { question: "In welchem Jahr wurde das Brandenburger Tor gebaut?", unit: "", answer: 1791, emoji: "🚪", hint: "Frühklassizismus, kurz vor der Französischen Revolution", tolerance: 5 },
  { question: "Wie viele Kilometer ist Berlin von München entfernt?", unit: "km", answer: 585, emoji: "🚂", hint: "In der Luftlinie, von Nord nach Süd", tolerance: 10 },
  { question: "Was kostet ein neuer VW Golf (ca.)?", unit: "€", answer: 32000, emoji: "🚗", hint: "Das meistverkaufte Auto Deutschlands", tolerance: 20 },
  { question: "Wie hoch ist die Zugspitze?", unit: "Meter", answer: 2962, emoji: "🏔️", hint: "Höchster Berg Deutschlands", tolerance: 5 },
  { question: "Wie viele Einwohner hat Deutschland?", unit: "Millionen", answer: 84, emoji: "🇩🇪", hint: "Bevölkerungsreichstes Land der EU", tolerance: 5 },
  { question: "In welchem Jahr wurde der Eiffelturm gebaut?", unit: "", answer: 1889, emoji: "🗼", hint: "Gebaut für die Weltausstellung in Paris", tolerance: 3 },
  { question: "Wie lang ist der Nil?", unit: "km", answer: 6650, emoji: "🌍", hint: "Längster Fluss der Welt", tolerance: 10 },
  { question: "Wie viele Länder gibt es auf der Erde?", unit: "", answer: 195, emoji: "🌐", hint: "Von der UN anerkannte Staaten", tolerance: 5 },
  { question: "Wie hoch ist Mount Everest?", unit: "Meter", answer: 8849, emoji: "🏔️", hint: "Höchster Berg der Welt", tolerance: 3 },
  { question: "Was kostet ein Liter Vollmilch (ca.)?", unit: "Cent", answer: 115, emoji: "🥛", hint: "Im deutschen Supermarkt", tolerance: 20 },
  { question: "Wie viele Stufen hat der Eiffelturm bis zur ersten Etage?", unit: "", answer: 347, emoji: "🗼", hint: "Wer die Treppe nimmt, macht Sport", tolerance: 15 },
  { question: "Wie alt ist das Kolosseum in Rom?", unit: "Jahre", answer: 1950, emoji: "🏛️", hint: "Fertiggestellt um 80 n. Chr.", tolerance: 10 },
  { question: "Wie viele Kilometer läuft ein Marathonläufer?", unit: "km", answer: 42, emoji: "🏃", hint: "Klassische olympische Laufdistanz", tolerance: 2 },
  { question: "Wie viele Spielfelder fasst der Amazonas-Regenwald?", unit: "Millionen km²", answer: 5, emoji: "🌳", hint: "Größter tropischer Regenwald der Welt", tolerance: 20 },
  { question: "In welchem Jahr wurde das Internet erfunden?", unit: "", answer: 1989, emoji: "💻", hint: "Tim Berners-Lee entwickelte das World Wide Web", tolerance: 5 },
];

export function getDailySchaetzling(): SchaetzlingQuestion {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return QUESTIONS[diff % QUESTIONS.length];
}

export function getHint(guess: number, answer: number): "correct" | "zu_hoch" | "zu_niedrig" | "sehr_nah" {
  const pct = Math.abs(guess - answer) / answer;
  if (guess === answer) return "correct";
  if (pct <= 0.05) return "sehr_nah";
  return guess > answer ? "zu_hoch" : "zu_niedrig";
}

export function getClosenessPercent(guess: number, answer: number): number {
  const ratio = Math.min(guess, answer) / Math.max(guess, answer);
  return Math.round(ratio * 100);
}
