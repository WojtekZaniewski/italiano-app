import type { UserProgress, Achievement, SRSCard } from '../types';

// XP rewards
export const XP_REWARDS = {
  srsCorrect: 10,
  srsIncorrect: 2,
  srsStreak5: 25,
  srsStreak10: 50,
  grammarExercise: 15,
  scenarioComplete: 50,
  scenarioPerfect: 100,
  readingComplete: 30,
  shadowingClip: 20,
  writingSubmit: 25,
  goldlistReview: 10,
  dailySessionComplete: 100,
  placementTest: 200,
  perfectSession: 150,
};

// Level thresholds
const LEVEL_THRESHOLDS = [
  { name: 'Principiante I', minXp: 0 },
  { name: 'Principiante II', minXp: 500 },
  { name: 'Principiante III', minXp: 1500 },
  { name: 'Intermedio I', minXp: 3000 },
  { name: 'Intermedio II', minXp: 6000 },
  { name: 'Intermedio III', minXp: 10000 },
  { name: 'Avanzato I', minXp: 16000 },
  { name: 'Avanzato II', minXp: 24000 },
  { name: 'Avanzato III', minXp: 35000 },
  { name: 'Madrelingua', minXp: 50000 },
];

export function getLevel(totalXp: number): { name: string; level: number; nextThreshold: number; progress: number } {
  let current = LEVEL_THRESHOLDS[0];
  let next = LEVEL_THRESHOLDS[1];

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_THRESHOLDS[i].minXp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] || { name: 'MAX', minXp: current.minXp + 10000 };
      break;
    }
  }

  const progress = (totalXp - current.minXp) / (next.minXp - current.minXp);
  return { name: current.name, level: LEVEL_THRESHOLDS.indexOf(current) + 1, nextThreshold: next.minXp, progress: Math.min(1, progress) };
}

export function addXp(progress: UserProgress, amount: number): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const dailyXp = { ...progress.dailyXpHistory };
  dailyXp[today] = (dailyXp[today] || 0) + amount;

  return {
    ...progress,
    xp: progress.xp + amount,
    totalXp: progress.totalXp + amount,
    dailyXpHistory: dailyXp,
  };
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let streak = progress.streak;
  if (progress.lastSessionDate === today) {
    // Already updated today
    return progress;
  } else if (progress.lastSessionDate === yesterday) {
    streak += 1;
  } else if (progress.lastSessionDate !== today) {
    streak = 1;
  }

  return {
    ...progress,
    streak,
    longestStreak: Math.max(streak, progress.longestStreak),
    lastSessionDate: today,
  };
}

// Achievement definitions
const ACHIEVEMENT_DEFS = [
  { id: 'first_session', name: 'Prima Lezione', description: 'Ukończ pierwszą sesję', icon: '🎯', check: (p: UserProgress) => p.sessionsCompleted >= 1 },
  { id: 'streak_7', name: 'Una Settimana', description: '7 dni z rzędu', icon: '🔥', check: (p: UserProgress) => p.streak >= 7 },
  { id: 'streak_30', name: 'Un Mese', description: '30 dni z rzędu', icon: '💪', check: (p: UserProgress) => p.streak >= 30 },
  { id: 'streak_100', name: 'Cento Giorni', description: '100 dni z rzędu', icon: '⭐', check: (p: UserProgress) => p.streak >= 100 },
  { id: 'words_50', name: 'Primo Passo', description: 'Naucz się 50 słów', icon: '📚', check: (p: UserProgress) => p.wordsLearned >= 50 },
  { id: 'words_200', name: 'Vocabolario', description: 'Naucz się 200 słów', icon: '📖', check: (p: UserProgress) => p.wordsLearned >= 200 },
  { id: 'words_500', name: 'Poliglotta', description: 'Naucz się 500 słów', icon: '🏆', check: (p: UserProgress) => p.wordsLearned >= 500 },
  { id: 'words_1000', name: 'Mille Parole', description: 'Naucz się 1000 słów', icon: '👑', check: (p: UserProgress) => p.wordsLearned >= 1000 },
  { id: 'xp_1000', name: 'Studente', description: 'Zdobądź 1000 XP', icon: '✨', check: (p: UserProgress) => p.totalXp >= 1000 },
  { id: 'xp_10000', name: 'Esperto', description: 'Zdobądź 10,000 XP', icon: '💎', check: (p: UserProgress) => p.totalXp >= 10000 },
  { id: 'sessions_10', name: 'Abitudine', description: 'Ukończ 10 sesji', icon: '🎓', check: (p: UserProgress) => p.sessionsCompleted >= 10 },
  { id: 'sessions_50', name: 'Dedicato', description: 'Ukończ 50 sesji', icon: '🏅', check: (p: UserProgress) => p.sessionsCompleted >= 50 },
  { id: 'hours_10', name: 'Dieci Ore', description: '10 godzin nauki', icon: '⏰', check: (p: UserProgress) => p.totalMinutes >= 600 },
];

export function checkAchievements(progress: UserProgress): Achievement[] {
  const earned = progress.achievements.map(a => a.id);
  const newAchievements: Achievement[] = [];
  const today = new Date().toISOString().split('T')[0];

  for (const def of ACHIEVEMENT_DEFS) {
    if (!earned.includes(def.id) && def.check(progress)) {
      newAchievements.push({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        dateEarned: today,
      });
    }
  }

  return newAchievements;
}

export function getWeeklyChallenges(progress: UserProgress, cards: SRSCard[]) {
  // Sum XP earned in the last 7 days
  const today = new Date();
  let weeklyXp = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(today.getTime() - i * 86400000).toISOString().split('T')[0];
    weeklyXp += progress.dailyXpHistory[d] ?? 0;
  }

  // Words that reached box 3+ (considered "learned")
  const wordsLearned = cards.filter(c => c.box >= 3).length;

  return [
    {
      id: 'weekly_xp', title: 'Zdobądź 500 XP w tym tygodniu',
      target: 500, current: Math.min(weeklyXp, 500), unit: 'XP', xpReward: 150,
    },
    {
      id: 'words_learned', title: 'Opanuj 20 słów (skrzynka 3+)',
      target: 20, current: Math.min(wordsLearned, 20), unit: 'słów', xpReward: 200,
    },
    {
      id: 'sessions', title: 'Ukończ 5 sesji dziennych',
      target: 5, current: Math.min(progress.sessionsCompleted, 5), unit: 'sesji', xpReward: 100,
    },
    {
      id: 'streak', title: 'Utrzymaj passę 7 dni',
      target: 7, current: Math.min(progress.streak, 7), unit: 'dni', xpReward: 250,
    },
    {
      id: 'total_time', title: 'Spędź 60 minut na nauce',
      target: 60, current: Math.min(progress.totalMinutes, 60), unit: 'minut', xpReward: 100,
    },
  ];
}
