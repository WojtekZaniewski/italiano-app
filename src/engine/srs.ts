import type { SRSCard, ConfidenceRating, VocabEntry, CEFRLevel } from '../types';

// Leitner box intervals in days
const BOX_INTERVALS: Record<number, number> = {
  1: 0,   // review every session
  2: 2,
  3: 5,
  4: 14,
  5: 30,
};

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function createCardFromVocab(vocab: VocabEntry): SRSCard {
  return {
    id: `vocab_${vocab.id}`,
    type: 'vocab',
    italian: vocab.italian,
    polish: vocab.polish,
    exampleSentence: vocab.exampleIt,
    exampleTranslation: vocab.examplePl,
    context: vocab.topic,
    level: vocab.level,
    box: 1,
    nextReview: today(),
    totalReviews: 0,
    correctReviews: 0,
    dateAdded: today(),
  };
}

export function createCard(
  italian: string,
  polish: string,
  type: SRSCard['type'],
  level: CEFRLevel,
  context?: string,
  exampleSentence?: string,
  exampleTranslation?: string,
): SRSCard {
  return {
    id: `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    italian,
    polish,
    exampleSentence,
    exampleTranslation,
    context,
    level,
    box: 1,
    nextReview: today(),
    totalReviews: 0,
    correctReviews: 0,
    dateAdded: today(),
  };
}

export function reviewCard(card: SRSCard, confidence: ConfidenceRating): SRSCard {
  const now = today();
  const correct = confidence >= 3;

  let newBox: 1 | 2 | 3 | 4 | 5;
  if (!correct) {
    // Drop to box 1 on incorrect
    newBox = 1;
  } else if (confidence === 4 && card.box < 5) {
    // Easy: jump up 1 box (or 2 if already high)
    newBox = Math.min(5, card.box + 1) as 1 | 2 | 3 | 4 | 5;
  } else if (confidence === 3 && card.box < 5) {
    // Okay: move up 1 box
    newBox = Math.min(5, card.box + 1) as 1 | 2 | 3 | 4 | 5;
  } else {
    newBox = card.box;
  }

  const interval = BOX_INTERVALS[newBox];
  const nextReview = interval === 0 ? now : addDays(now, interval);

  return {
    ...card,
    box: newBox,
    nextReview,
    totalReviews: card.totalReviews + 1,
    correctReviews: card.correctReviews + (correct ? 1 : 0),
    lastReviewed: now,
  };
}

export function getDueCards(cards: SRSCard[]): SRSCard[] {
  const now = today();
  return cards
    .filter(c => c.nextReview <= now)
    .sort((a, b) => {
      // Priority: lower box first (more urgent), then oldest review date
      if (a.box !== b.box) return a.box - b.box;
      return a.nextReview.localeCompare(b.nextReview);
    });
}

export function getCardStats(cards: SRSCard[]) {
  const total = cards.length;
  const due = getDueCards(cards).length;
  const mastered = cards.filter(c => c.box === 5).length;
  const learning = cards.filter(c => c.box >= 2 && c.box <= 4).length;
  const newCards = cards.filter(c => c.box === 1 && c.totalReviews === 0).length;
  const boxCounts = [0, 0, 0, 0, 0];
  cards.forEach(c => boxCounts[c.box - 1]++);

  const avgAccuracy = total > 0
    ? cards.reduce((sum, c) => sum + (c.totalReviews > 0 ? c.correctReviews / c.totalReviews : 0), 0) / total
    : 0;

  return { total, due, mastered, learning, newCards, boxCounts, avgAccuracy };
}

export function getCardsForLevel(cards: SRSCard[], level: CEFRLevel): SRSCard[] {
  const levelOrder: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const idx = levelOrder.indexOf(level);
  return cards.filter(c => levelOrder.indexOf(c.level) <= idx);
}
