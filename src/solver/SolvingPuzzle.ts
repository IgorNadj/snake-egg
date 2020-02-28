import { HintedPuzzle } from "../hinter/HintedPuzzle";
import { Grid, GridCell } from "../Puzzle";
import { PlacedPolyomino } from "../polyomino/PlacedPolyomino";
import { Set } from "immutable";



export class SolvingPuzzle extends HintedPuzzle {

    readonly solveGrid: Grid;

	constructor(readonly width: number, readonly height: number, readonly maxNumber: number, placedPolyominos: Set<PlacedPolyomino> | null = null, solveGrid: Grid | null = null) {
        super(width, height, maxNumber, placedPolyominos);
        if (solveGrid) {
            this.solveGrid = solveGrid;
        } else {
			this.solveGrid = Array(this.height).fill(null).map(() => Array(this.width).fill(null));
        }
	}

    public setSolveGrid(solveGrid: Grid): SolvingPuzzle {
        return new SolvingPuzzle(this.width, this.height, this.maxNumber, this.placedPolyominos, solveGrid)
    }

    public solve(x: number, y: number, contents: GridCell) {
        if (x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1) return;
        if (this.solveGrid[y][x] === null) {
            this.solveGrid[y][x] = contents;
        }
    }

    public renderSolving(): string {
		return '\n' + this.solveGrid.map((row) => row.map((cell) => cell === null ? '_' : cell).join('') + '\n')
			.join('');
    }

}