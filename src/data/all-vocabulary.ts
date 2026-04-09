import type { VocabEntry } from '../types';
import { vocabulary } from './vocabulary';
import { vocabularyB } from './vocabulary-b';

export const allVocabulary: VocabEntry[] = [...vocabulary, ...vocabularyB];
