import { SolveStep } from "./SolveStep";
import { SolvingPuzzle } from "../SolvingPuzzle";
import { GridCell, Puzzle, SnakeDirection } from "../../Puzzle";

export class GrowSnakeThatCanOnlyMoveInOneDirection implements SolveStep {

    public solveStep(puzzle: SolvingPuzzle): SolvingPuzzle {

        for (let x = 0; x < puzzle.width; x++) {
            for (let y = 0; y < puzzle.height; y++) {
                if (puzzle.getSolveGrid().get(x, y) !== GridCell.SNAKE) {
                    continue;
                }

                const solveNeighbours = puzzle.getSolveGrid().getGridNeighbours(x, y);

                const isSnakeHead = Puzzle.isSnakeHead(solveNeighbours);

                if (!isSnakeHead) {
                    continue;
                }

                let validSnakeDirections = Puzzle.getValidSnakeDirections(solveNeighbours);

                if (y < 0) {
                    validSnakeDirections = validSnakeDirections.remove(SnakeDirection.top);
                }
                if (y >= puzzle.height) {
                    validSnakeDirections = validSnakeDirections.remove(SnakeDirection.bottom);
                }
                if (x < 0) {
                    validSnakeDirections = validSnakeDirections.remove(SnakeDirection.left);
                }
                if (x >= puzzle.width) {
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
        }

        return puzzle;
    }

}