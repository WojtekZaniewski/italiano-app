import type { SRSCard, SessionExercise, CEFRLevel, VocabEntry } from '../types';
import { getDueCards } from './srs';

export interface SessionPlan {
  exercises: SessionExercise[];
  estimatedMinutes: number;
  srsCount: number;
  newCount: number;
  listeningCount: number;
  scenarioCount: number;
}

export function generateDailySession(
  allCards: SRSCard[],
  level: CEFRLevel,
  availableVocab: VocabEntry[],
  split: { srsReview: number; newContent: number; listening: number; scenario: number },
  totalMinutes: number = 20,
): SessionPlan {
  const exercises: SessionExercise[] = [];
  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const levelIdx = levelOrder.indexOf(level);
  // Never review/learn more than 1 level below the user's current level
  const minLevelIdx = Math.max(0, levelIdx - 1);

  // Calculate exercise counts based on split (each exercise ~1 minute)
  const totalExercises = totalMinutes;
  const srsCount = Math.round(totalExercises * split.srsReview / 100);
  const newCount = Math.round(totalExercises * split.newContent / 100);
  const listeningCount = Math.round(totalExercises * split.listening / 100);
  const scenarioCount = Math.round(totalExercises * split.scenario / 100);

  // 1. SRS Review Cards — only cards at user's level and at most 1 level below.
  // A B2 user will not spend session time reviewing A1/A2 words.
  const relevantCards = allCards.filter(c => {
    const cIdx = levelOrder.indexOf(c.level);
    return cIdx >= minLevelIdx && cIdx <= levelIdx;
  });
  const dueCards = getDueCards(relevantCards.length > 0 ? relevantCards : allCards);
  const srsCards = dueCards.slice(0, srsCount);
  for (const card of srsCards) {
    exercises.push({ type: 'srs_review', data: card, completed: false, xpEarned: 0 });
  }

  // 2. New vocabulary — current level first, then 1 level below only if needed.
  const existingIds = new Set(allCards.map(c => c.italian));
  const newVocab = availableVocab
    .filter(v => {
      const vIdx = levelOrder.indexOf(v.level);
      return !existingIds.has(v.italian) && vIdx >= minLevelIdx && vIdx <= levelIdx;
    })
    .sort((a, b) => {
      const aIdx = levelOrder.indexOf(a.level);
      const bIdx = levelOrder.indexOf(b.level);
      if (bIdx !== aIdx) return bIdx - aIdx; // higher level first
      return a.frequency - b.frequency;
    })
    .slice(0, newCount);

  for (const vocab of newVocab) {
    exercises.push({
      type: 'new_vocab',
      data: vocab,
      completed: false,
      xpEarned: 0,
    });
  }

  // 3. Listening/shadowing exercises
  for (let i = 0; i < listeningCount; i++) {
    exercises.push({
      type: i % 2 === 0 ? 'listening' : 'shadowing',
      data: { level },
      completed: false,
      xpEarned: 0,
    });
  }

  // 4. Scenario exercises
  for (let i = 0; i < scenarioCount; i++) {
    exercises.push({
      type: i % 2 === 0 ? 'scenario' : 'grammar',
      data: { level },
      completed: false,
      xpEarned: 0,
    });
  }

  // Interleave everything (critical for retention)
  shuffle(exercises);

  // But always start with a few SRS reviews to warm up
  const srsExercises = exercises.filter(e => e.type === 'srs_review');
  const otherExercises = exercises.filter(e => e.type !== 'srs_review');
  const warmup = srsExercises.splice(0, Math.min(3, srsExercises.length));
  const interleaved = [...warmup, ...shuffle([...srsExercises, ...otherExercises])];

  return {
    exercises: interleaved,
    estimatedMinutes: totalMinutes,
    srsCount: srsCards.length,
    newCount: newVocab.length,
    listeningCount,
    scenarioCount,
  };
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
