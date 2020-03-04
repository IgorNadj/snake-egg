import { Strategy } from './strategy/Strategy';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from './strategy/GrowSnakeThatCanOnlyMoveInOneValidDirection';
import { MarkAdjacentToSnake } from './strategy/MarkAdjacentToSnake';

export const Strategies: Strategy[] = [
    new GrowSnakeThatCanOnlyMoveInOneDirection(),
    new MarkAdjacentToSnake(),
];