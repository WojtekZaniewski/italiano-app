import type { UserProgress, SRSCard, GoldlistEntry, WritingSubmission } from '../types';

const KEYS = {
  progress: 'italiano_progress',
  srsCards: 'italiano_srs_cards',
  goldlist: 'italiano_goldlist',
  writings: 'italiano_writings',
  sessionHistory: 'italiano_session_history',
} as const;

function load<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, data: unknown): void {
  localStorage.setItem(key, JSON.stringify(data));
}

const defaultProgress: UserProgress = {
  level: 'A1',
  xp: 0,
  totalXp: 0,
  streak: 0,
  longestStreak: 0,
  lastSessionDate: '',
  dailyGoalMinutes: 20,
  totalMinutes: 0,
  wordsLearned: 0,
  sessionsCompleted: 0,
  placementTestTaken: false,
  moduleProgress: {},
  weakAreas: [],
  commonErrors: [],
  achievements: [],
  weeklyXpHistory: new Array(12).fill(0),
  dailyXpHistory: {},
  settings: {
    dailyGoalMinutes: 20,
    sessionSplit: { srsReview: 40, newContent: 20, listening: 20, scenario: 20 },
    immersionMode: false,
    ttsSpeed: 1.0,
    autoPlayAudio: true,
  },
};

export function loadProgress(): UserProgress {
  return load(KEYS.progress, defaultProgress);
}

export function saveProgress(p: UserProgress): void {
  save(KEYS.progress, p);
}

export function loadSRSCards(): SRSCard[] {
  return load(KEYS.srsCards, []);
}

export function saveSRSCards(cards: SRSCard[]): void {
  save(KEYS.srsCards, cards);
}

export function loadGoldlist(): GoldlistEntry[] {
  return load(KEYS.goldlist, []);
}

export function saveGoldlist(entries: GoldlistEntry[]): void {
  save(KEYS.goldlist, entries);
}

export function loadWritings(): WritingSubmission[] {
  return load(KEYS.writings, []);
}

export function saveWritings(w: WritingSubmission[]): void {
  save(KEYS.writings, w);
}

export function resetAllData(): void {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k));
}

export function exportData(): string {
  const data: Record<string, unknown> = {};
  Object.entries(KEYS).forEach(([name, key]) => {
    const val = localStorage.getItem(key);
    if (val) data[name] = JSON.parse(val);
  });
  return JSON.stringify(data, null, 2);
}
