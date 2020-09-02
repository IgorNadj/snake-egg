import { HintedPuzzle, HintCell, EGG } from "../hinter/HintedPuzzle";
import { GridCell } from "../Puzzle";
import { Grid } from "../grid/Grid";
import {GridRegion} from "../grid/GridRegion";
import {Map, Set} from "immutable";


export type SolveCell = GridCell | typeof EGG | number | null;

export type SolvePolyCell = number | GridCell.POLY;

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
            if (solveGrid.width !== this.width || solveGrid.height !== this.height) {
                throw 'Size mismatch';
            }
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

    /**
     * Get complete or incomplete regions present on the map
     */
    public regions(): Map<SolvePolyCell, Set<GridRegion>> {
        let map = Map<SolvePolyCell, Set<GridRegion>>();

        map = map.set(GridCell.POLY, this.getSolveGrid().orthogonallyConnectedRegions(GridCell.POLY));

        for (let i = 1; i <= this.maxNumber; i++) {
            const regionsOfThisSize = this.getSolveGrid().orthogonallyConnectedRegions(i);
            if (!regionsOfThisSize.isEmpty()) {
                map = map.set(i, regionsOfThisSize);
            }
        }

        return map;
    }

    public completeRegions(): Map<number, GridRegion> {
        let completeRegions = Map<number, GridRegion>();

        const regions = this.regions();

        for (let i = 1; i <= this.maxNumber; i++) {
            const regionsOfThisSize = regions.get(i);
            if (regionsOfThisSize && regionsOfThisSize.size === 1) {
                // only one region of this size, e.g. one "5" region
                const theOnlyRegionOfThisSize: GridRegion | null = regionsOfThisSize.first();

                if (theOnlyRegionOfThisSize && theOnlyRegionOfThisSize.size === i) {
                    // the region is complete, e.g. 5 cells are part of the "5" region

                    completeRegions = completeRegions.set(i, theOnlyRegionOfThisSize);
                }
            }
        }

        return completeRegions;
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