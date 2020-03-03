import { SolveStep } from './step/SolveStep';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from './step/GrowSnakeThatCanOnlyMoveInOneValidDirection';
import { MarkAdjacentToSnake } from './step/MarkAdjacentToSnake';

export const Steps: SolveStep[] = [
    new GrowSnakeThatCanOnlyMoveInOneDirection(),
    new MarkAdjacentToSnake(),
];