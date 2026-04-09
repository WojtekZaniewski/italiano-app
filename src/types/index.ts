// CEFR Levels
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// SRS / Leitner Box System
export interface SRSCard {
  id: string;
  type: 'vocab' | 'phrase' | 'grammar' | 'sentence';
  italian: string;
  polish: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  context?: string; // topic tag
  level: CEFRLevel;
  box: 1 | 2 | 3 | 4 | 5;
  nextReview: string; // ISO date
  totalReviews: number;
  correctReviews: number;
  lastReviewed?: string;
  dateAdded: string;
}

export type ConfidenceRating = 1 | 2 | 3 | 4;

// Vocabulary
export interface VocabEntry {
  id: string;
  italian: string;
  polish: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'article' | 'interjection' | 'phrase';
  gender?: 'masculine' | 'feminine';
  plural?: string;
  exampleIt: string;
  examplePl: string;
  level: CEFRLevel;
  topic: string;
  conjugation?: string; // for verbs: infinitive form info
  frequency: number; // 1-3000 rank
}

// Grammar
export interface GrammarLesson {
  id: string;
  title: string;
  titlePl: string;
  level: CEFRLevel;
  order: number;
  concept: string;
  buildingBlocks: GrammarExercise[];
  explanation: string; // shown AFTER exercises
  explanationPl: string;
}

export interface GrammarExercise {
  prompt: string; // "How would you say: I want to eat"
  answer: string; // "Voglio mangiare"
  components: string[]; // ["voglio", "mangiare"]
  hint?: string;
}

// Scenarios
export interface Scenario {
  id: string;
  title: string;
  titlePl: string;
  description: string;
  level: CEFRLevel;
  setting?: string;
  dialogueSteps: DialogueStep[];
  vocabulary?: string[]; // key vocab IDs for this scenario
}

export interface DialogueStep {
  speaker: 'ai' | 'user';
  text: string; // for AI: what they say. For user: expected response pattern
  translation: string;
  hints?: string[];
  hint?: string; // single hint shorthand (also accepted)
  acceptableResponses?: string[]; // patterns that count as correct
  timeLimit?: number; // seconds
}

// Reading
export interface ReadingText {
  id: string;
  title: string;
  level: CEFRLevel;
  category: 'news' | 'story' | 'dialogue' | 'essay' | 'culture';
  italian: string;
  translations: Record<string, string>; // word -> Polish translation for tap-to-translate
  comprehensionQuestions: ComprehensionQuestion[];
}

export interface ComprehensionQuestion {
  question: string; // in Italian
  options: string[];
  correctIndex: number;
  explanationPl: string;
}

// Shadowing
export interface ShadowingClip {
  id: string;
  text: string;
  translation: string;
  level: CEFRLevel;
  durationMs: number;
  words: string[];
}

// Goldlist
export interface GoldlistEntry {
  id: string;
  phrase: string;
  translation: string;
  dateAdded: string;
  nextReviewDate: string;
  cycle: number;
  remembered: boolean;
}

// User Progress
export interface UserProgress {
  level: CEFRLevel;
  xp: number;
  totalXp: number;
  streak: number;
  longestStreak: number;
  lastSessionDate: string;
  dailyGoalMinutes: number;
  totalMinutes: number;
  wordsLearned: number;
  sessionsCompleted: number;
  placementTestTaken: boolean;
  placementTestDate?: string;
  moduleProgress: Record<string, number>; // module -> % complete
  weakAreas: string[];
  commonErrors: string[];
  achievements: Achievement[];
  weeklyXpHistory: number[]; // last 12 weeks
  dailyXpHistory: Record<string, number>; // date -> xp
  settings: UserSettings;
}

export interface UserSettings {
  dailyGoalMinutes: number;
  sessionSplit: {
    srsReview: number;
    newContent: number;
    listening: number;
    scenario: number;
  };
  immersionMode: boolean; // Italian-only interface
  ttsSpeed: number; // 0.75 - 1.25
  autoPlayAudio: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

// Session
export interface SessionConfig {
  totalMinutes: number;
  exercises: SessionExercise[];
}

export interface SessionExercise {
  type: 'srs_review' | 'new_vocab' | 'grammar' | 'listening' | 'shadowing' | 'scenario' | 'reading' | 'writing';
  data: any;
  completed: boolean;
  xpEarned: number;
}

// Writing
export interface WritingSubmission {
  id: string;
  date: string;
  original: string;
  corrected: string;
  corrections: WritingCorrection[];
  score: number;
}

export interface WritingCorrection {
  original: string;
  corrected: string;
  explanation: string;
  type: 'grammar' | 'spelling' | 'word_choice' | 'style';
}

// Placement Test
export interface PlacementQuestion {
  id: string;
  type: 'vocab' | 'grammar' | 'listening' | 'translation';
  level: CEFRLevel;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
}
