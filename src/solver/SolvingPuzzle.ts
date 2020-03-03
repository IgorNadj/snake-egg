import { HintedPuzzle, HintCell } from "../hinter/HintedPuzzle";
import { GridCell } from "../Puzzle";
import { Grid } from "../Grid";


export type SolveCell = GridCell | number;

/**
 * A Solver uses a Solving Puzzle to gradually solve a hinted puzzle.
 */
export class SolvingPuzzle {

    protected solveGrid: Grid<SolveCell>;
    readonly width: number; // convenience
    readonly height: number; // convenience
    readonly maxNumber: number; // convenience

    constructor(readonly hintedPuzzle: HintedPuzzle, solveGrid?: Grid<SolveCell>) {
        this.width = hintedPuzzle.width;
        this.height = hintedPuzzle.height;
        this.maxNumber = hintedPuzzle.maxNumber;
        if (solveGrid) {
            this.solveGrid = solveGrid;
        } else {
            this.solveGrid = this.createSolveGridFromHintGrid(hintedPuzzle.getHintGrid());
        }
    }

    public getSolveGrid(): Grid<SolveCell> {
        return this.solveGrid;
    }

    public setSolveGrid(solveGrid: Grid<SolveCell>): SolvingPuzzle {
        return new SolvingPuzzle(this.hintedPuzzle, solveGrid);
    }

    public solve(x: number, y: number, contents: SolveCell): SolvingPuzzle {
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

    protected createSolveGridFromHintGrid(hintGrid: Grid<HintCell>): Grid<SolveCell> {
        let solveGrid: Grid<SolveCell> = new Grid(hintGrid.width, hintGrid.height);
        for (let y = 0; y < hintGrid.height; y++) {
            for (let x = 0; x < hintGrid.width; x++) {
                solveGrid = solveGrid.set(x, y, hintGrid.get(x, y));
            }
        }
        return solveGrid;
    }

}