export interface StreakData {
  count: number;
  maxStreak: number;
  lastDate: string; // YYYY-MM-DD
}

export interface PlayedToday {
  date: string;
  games: string[];
}

const STREAK_KEY = "dailyz-streak";
const PLAYED_KEY = "dailyz-played";

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, maxStreak: 0, lastDate: "" };
  } catch {
    return { count: 0, maxStreak: 0, lastDate: "" };
  }
}

export function getPlayedToday(): PlayedToday {
  try {
    const today = getToday();
    const raw = localStorage.getItem(PLAYED_KEY);
    if (!raw) return { date: today, games: [] };
    const data: PlayedToday = JSON.parse(raw);
    if (data.date !== today) return { date: today, games: [] };
    return data;
  } catch {
    return { date: getToday(), games: [] };
  }
}

export function markGamePlayed(gameId: string): { streak: StreakData; playedToday: PlayedToday } {
  const today = getToday();
  const played = getPlayedToday();
  if (!played.games.includes(gameId)) played.games.push(gameId);
  played.date = today;
  localStorage.setItem(PLAYED_KEY, JSON.stringify(played));

  // Update streak
  const streak = getStreak();
  if (streak.lastDate === today) {
    localStorage.setItem(STREAK_KEY, JSON.stringify(streak));
    return { streak, playedToday: played };
  }
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const newCount = streak.lastDate === yesterday.toISOString().split("T")[0] ? streak.count + 1 : 1;
  const newStreak: StreakData = { count: newCount, maxStreak: Math.max(streak.maxStreak, newCount), lastDate: today };
  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
  return { streak: newStreak, playedToday: played };
}

export function isStreakAtRisk(): boolean {
  const streak = getStreak();
  if (streak.count === 0) return false;
  const today = getToday();
  const played = getPlayedToday();
  if (played.games.length > 0) return false; // already played today
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return streak.lastDate === yesterday.toISOString().split("T")[0];
}
