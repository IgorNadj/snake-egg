import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { GridCell } from "../Puzzle";
import { Grid } from "../Grid";


/**
 * A Solver uses a Solving Puzzle to gradually solve a hinted puzzle.
 */
export class SolvingPuzzle {

    protected solveGrid: Grid<GridCell>;
    readonly width: number; // convenience
    readonly height: number; // convenience
    readonly maxNumber: number; // convenience

    constructor(readonly hintedPuzzle: HintedPuzzle, solveGrid?: Grid<GridCell>) {
        this.width = hintedPuzzle.width;
        this.height = hintedPuzzle.height;
        this.maxNumber = hintedPuzzle.maxNumber;
        if (solveGrid) {
            this.solveGrid = solveGrid;
        } else {
            this.solveGrid = new Grid(hintedPuzzle.width, hintedPuzzle.height);
        }
    }

    public getSolveGrid(): Grid<GridCell> {
        return this.solveGrid;
    }

    public setSolveGrid(solveGrid: Grid<GridCell>): SolvingPuzzle {
        return new SolvingPuzzle(this.hintedPuzzle, solveGrid);
    }

    public solve(x: number, y: number, contents: GridCell): SolvingPuzzle {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            // out of bounds
            return this;
        }
        if (this.solveGrid.get(x, y) !== null) {
            // already solved
            return this;
        }

        const newSolveGrid = this.solveGrid.set(x, y, contents);
        return new SolvingPuzzle(this.hintedPuzzle, newSolveGrid);
    }

}