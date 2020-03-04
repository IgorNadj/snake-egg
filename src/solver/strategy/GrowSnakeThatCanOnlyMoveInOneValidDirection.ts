import { Strategy } from "./Strategy";
import { SolvingPuzzle } from "../SolvingPuzzle";
import { GridCell } from "../../Puzzle";
import { PuzzleHelper, SnakeDirection } from "../../helper/PuzzleHelper";

export class GrowSnakeThatCanOnlyMoveInOneDirection implements Strategy {

    public solveStep(puzzle: SolvingPuzzle): SolvingPuzzle {

        const snakeEnds = PuzzleHelper.getSnakeEnds(puzzle.getSolveGrid());

        for (const snakeEnd of snakeEnds) {
            const x = snakeEnd.x;
            const y = snakeEnd.y;

            const solveNeighbours = puzzle.getSolveGrid().getGridNeighbours(x, y);

            let validSnakeDirections = PuzzleHelper.getValidSnakeDirections(solveNeighbours);

            if (y <= 0) {
                validSnakeDirections = validSnakeDirections.remove(SnakeDirection.top);
            }
            if (y >= puzzle.height - 1) {
                validSnakeDirections = validSnakeDirections.remove(SnakeDirection.bottom);
            }
            if (x <= 0) {
                validSnakeDirections = validSnakeDirections.remove(SnakeDirection.left);
            }
            if (x >= puzzle.width - 1) {
                validSnakeDirections = validSnakeDirections.remove(SnakeDirection.right);
            }

            if (validSnakeDirections.size === 1) {
                const direction = validSnakeDirections.first();
                if (direction === SnakeDirection.top) {
                    puzzle = puzzle.solve(x, y - 1, GridCell.SNAKE);
                    return puzzle;
                }
                if (direction === SnakeDirection.right) {
                    puzzle = puzzle.solve(x + 1, y, GridCell.SNAKE);
                    return puzzle;
                }
                if (direction === SnakeDirection.bottom) {
                    puzzle = puzzle.solve(x, y + 1, GridCell.SNAKE);
                    return puzzle;
                }
                if (direction === SnakeDirection.left) {
                    puzzle = puzzle.solve(x - 1, y, GridCell.SNAKE);
                    return puzzle;
                }
            }
        }

        return puzzle;
    }
}