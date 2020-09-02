import { Strategy } from './strategy/Strategy';
import { GrowSnakeThatCanOnlyMoveInOneDirection } from './strategy/GrowSnakeThatCanOnlyMoveInOneValidDirection';
import { MarkOrthogonalToSnakeBody } from './strategy/MarkOrthogonalToSnakeBody';
import {WrapCompletedPolyWithSnake} from "./strategy/WrapCompletedPolyWithSnake";

export const Strategies: Strategy[] = [
    new GrowSnakeThatCanOnlyMoveInOneDirection(),
    new MarkOrthogonalToSnakeBody(),
    new WrapCompletedPolyWithSnake(),
];