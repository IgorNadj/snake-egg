import { Strategy } from "./Strategy";
import { SolvingPuzzle } from "../SolvingPuzzle";
import { GridCell } from "../../Puzzle";
import { PuzzleHelper } from "../../helper/PuzzleHelper";

export class MarkAdjacentToSnake implements Strategy {

    public solveStep(puzzle: SolvingPuzzle): SolvingPuzzle {

        const snakeEnds = PuzzleHelper.getSnakeEnds(puzzle.getSolveGrid());

        for (const snakeEnd of snakeEnds) {
            const x = snakeEnd.x;
            const y = snakeEnd.y;

            const solveNeighbours = puzzle.getSolveGrid().getGridNeighbours(x, y);

            if (solveNeighbours.top === GridCell.SNAKE) {
                // we came from above, topRight and topLeft must be POLY
                puzzle = puzzle.solve(x - 1, y - 1, GridCell.POLY);
                puzzle = puzzle.solve(x + 1, y - 1, GridCell.POLY);
            }
            if (solveNeighbours.right === GridCell.SNAKE) {
                // we came from right, topRight and bottomRight must be POLY
                puzzle = puzzle.solve(x + 1, y - 1, GridCell.POLY);
                puzzle = puzzle.solve(x + 1, y + 1, GridCell.POLY);
            }
            if (solveNeighbours.bottom === GridCell.SNAKE) {
                // we came from below, bottomRight and bottomLeft must be POLY
                puzzle = puzzle.solve(x - 1, y + 1, GridCell.POLY);
                puzzle = puzzle.solve(x + 1, y + 1, GridCell.POLY);
            }
            if (solveNeighbours.left === GridCell.SNAKE) {
                // we came from left, topLeft and bottomLeft must be POLY
                puzzle = puzzle.solve(x - 1, y - 1, GridCell.POLY);
                puzzle = puzzle.solve(x - 1, y + 1, GridCell.POLY);
            }
        }

        return puzzle;
    }

}