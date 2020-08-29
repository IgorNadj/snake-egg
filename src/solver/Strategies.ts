import { Strategy } from './strategy/Strategy';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from './strategy/GrowSnakeThatCanOnlyMoveInOneValidDirection';
import { MarkOrthogonalToSnakeBody } from './strategy/MarkOrthogonalToSnakeBody';

export const Strategies: Strategy[] = [
    new GrowSnakeThatCanOnlyMoveInOneDirection(),
    new MarkOrthogonalToSnakeBody(),
];