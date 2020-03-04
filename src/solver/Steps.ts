import { SolveStep } from './strategy/SolveStep';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from './strategy/GrowSnakeThatCanOnlyMoveInOneValidDirection';
import { MarkAdjacentToSnake } from './strategy/MarkAdjacentToSnake';

export const Steps: SolveStep[] = [
    new GrowSnakeThatCanOnlyMoveInOneDirection(),
    new MarkAdjacentToSnake(),
];