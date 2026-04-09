import type { ReadingText } from '../types';
import { readings } from './readings';
import { readingsExtended } from './readings-extended';

export const allReadings: ReadingText[] = [...readings, ...readingsExtended];
