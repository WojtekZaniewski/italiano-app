import type { Scenario } from '../types';
import { scenarios } from './scenarios';
import { scenariosExtended } from './scenarios-extended';

export const allScenarios: Scenario[] = [...scenarios, ...scenariosExtended];
