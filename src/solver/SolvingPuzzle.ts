import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { GridCell } from "../Puzzle";
import { Grid } from "../Grid";


/**
 * A Solver uses a Solving Puzzle to gradually solve a hinted puzzle.
 */
export class SolvingPuzzle extends HintedPuzzle {

    protected solveGrid: Grid<GridCell>;

    constructor(readonly width: number, readonly height: number, readonly maxNumber: number, solveGrid: Grid<GridCell> | null = null) {
        super(width, height, maxNumber);
        if (solveGrid) {
            this.solveGrid = solveGrid;
        } else {
            this.solveGrid = new Grid(this.width, this.height);
        }
    }

    public getSolveGrid(): Grid<GridCell> {
        return this.solveGrid;
    }

    public setSolveGrid(solveGrid: Grid<GridCell>): SolvingPuzzle {
        return new SolvingPuzzle(this.width, this.height, this.maxNumber, solveGrid)
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
        return new SolvingPuzzle(this.width, this.height, this.maxNumber, newSolveGrid);
    }

}