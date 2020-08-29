import {Strategy} from "./Strategy";
import {SolvingPuzzle} from "../SolvingPuzzle";
import {GridCell} from "../../Puzzle";
import {PuzzleHelper} from "../../helper/PuzzleHelper";

export class MarkAdjacentToSnake implements Strategy {

    public solve(puzzle: SolvingPuzzle): SolvingPuzzle {

        const bodyCells = PuzzleHelper.getSnakeBody(puzzle.getSolveGrid());

        for (const bodyCell of bodyCells) {
            const x = bodyCell.x;
            const y = bodyCell.y;

            const solveNeighbours = puzzle.getSolveGrid().getGridNeighbours(x, y);

            if (solveNeighbours.top === null) {
                puzzle = puzzle.solve(x, y - 1, GridCell.POLY);
            }
            if (solveNeighbours.right === null) {
                puzzle = puzzle.solve(x + 1, y, GridCell.POLY);
            }
            if (solveNeighbours.bottom === null) {
                puzzle = puzzle.solve(x, y + 1, GridCell.POLY);
            }
            if (solveNeighbours.left === null) {
                puzzle = puzzle.solve(x - 1, y, GridCell.POLY);
            }
        }

        return puzzle;
    }

}