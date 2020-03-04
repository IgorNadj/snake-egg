import { expect } from 'chai';
import { Grid } from '../../src/grid/Grid';
import { Solver } from '../../src/solver/Solver';
import { GridCell } from '../../src/Puzzle';
import { SolvingPuzzle } from '../../src/solver/SolvingPuzzle';
import { HintCell, HintedPuzzle } from '../../src/hinter/HintedPuzzle';

describe("Solver", () => {

    it("can solve a trivial puzzle", () => {
        /*
         * Hinted grid:
         *
         * o _ 2 2 _ _ _ o
         * 1 _ _ _ _ 3 3 3
         *  
         * has solution:
         * 
         * o . 2 2 . . . o
         * 1 . . . . 3 3 3
         */

        let hintGrid: Grid<HintCell> = new Grid(8, 2);

        hintGrid = hintGrid.fromArray([
            [GridCell.SNAKE, null, 2, 2, null, null, null, GridCell.SNAKE],
            [1, null, null, null, null, 3, 3, 3],
        ]);

        const hintedPuzzle = new HintedPuzzle(8, 2, 3, hintGrid);

        const solver = new Solver();

        const solveResults = solver.solve(hintedPuzzle);

        const expectedSolveGrid = [
            [GridCell.SNAKE, GridCell.SNAKE, 2, 2, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE],
            [1, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, 3, 3, 3],
        ];

        expect(solveResults.hasSolution).to.equal(true);
        if (solveResults.hasSolution) {
            expect(solveResults.solution).to.not.equal(null);
            if (solveResults.solution !== null && solveResults.solution !== undefined) {
                expect(solveResults.solution.getSolveGrid().toArray()).to.deep.equal(expectedSolveGrid);
            }
        }
    });

    // it.skip("can solve a moderately complicated puzzle", () => {
    //     /*
    //      * Hinted grid:
    //      *
    //      * _ _ _ _ _
    //      * _ 1 _ _ _
    //      * _ _ _ _ _
    //      * _ _ _ _ _
    //      * 2 _ o 4 o
    //      * 
    //      * has solution:
    //      * 
    //      * . . . 3 3
    //      * . 1 . . 3
    //      * . . 4 . .
    //      * 2 . 4 4 .
    //      * 2 . o 4 o
    //      */

    //     let hintGrid: Grid<HintCell> = new Grid(5, 5);
    //     hintGrid = hintGrid.set(1, 1, 1)
    //         .set(0, 4, 2)
    //         .set(3, 4, 4);

    //     const solvingPuzzle = new SolvingPuzzle(5, 5, 4, hintGrid);

    //     const solver = new Solver();

    //     console.log('before', hintedPuzzle.getHintGrid().render());

    //     const solution = solver.solve(hintedPuzzle);

    //     console.log('before', solution.getSolveGrid().render());

    //     const expected = [
    //         [GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, GridCell.POLY],
    //         [GridCell.SNAKE, GridCell.POLY, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY],
    //         [GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, GridCell.SNAKE, GridCell.SNAKE],
    //         [GridCell.POLY, GridCell.SNAKE, GridCell.POLY, GridCell.POLY, GridCell.SNAKE],
    //         [GridCell.POLY, GridCell.SNAKE, GridCell.SNAKE, GridCell.POLY, GridCell.SNAKE],
    //     ];

    //     expect(solution.getSolveGrid().toArray()).to.deep.equal(expected);
    // });

});