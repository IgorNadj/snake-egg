import { SolveStep } from "./SolveStep";
import { SolvingPuzzle } from "../SolvingPuzzle";
import { GridCell, Puzzle } from "../../Puzzle";

export class MarkAdjacentToSnake implements SolveStep {

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
        }

        return puzzle;
    }

}