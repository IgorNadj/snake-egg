import { Puzzle, GridCell } from "../Puzzle";
import { Grid } from "../Grid";


export type HintCell = number | null;

/**
 * A hinted puzzle is one that is ready for a human to play, it is mostly blank and has
 * some cells in the grid already filled in to give hints to the human 
 */
export class HintedPuzzle {

    protected hintGrid: Grid<HintCell>;

    constructor(readonly width: number, readonly height: number, readonly maxNumber: number) {
        this.hintGrid = new Grid(width, height);
    }

    public static createWithAllHints(puzzle: Puzzle): HintedPuzzle {
        const hinted = new HintedPuzzle(puzzle.width, puzzle.height, puzzle.maxNumber);
        let hintGrid: Grid<HintCell> = new Grid(puzzle.width, puzzle.height);
        puzzle.placedPolyominos.forEach((poly) => {
            poly.getAbsolutePoints().forEach((point) => {
                hintGrid = hintGrid.set(point.x, point.y, poly.size);
            });
        });
        hinted.hintGrid = hintGrid;
        return hinted;
    }

    public setHintGrid(grid: Grid<HintCell>) {
        this.hintGrid = grid;
    }

    public getHintGrid(): Grid<HintCell> {
        return this.hintGrid;
    }

}