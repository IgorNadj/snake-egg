import { expect } from 'chai';
import { PuzzleHelper, SnakeDirection } from '../src/PuzzleHelper';
import { Neighbours, Grid } from '../src/grid/Grid';
import { GridCell } from '../src/Puzzle';
import { PointInt } from 'polyomino';


describe("PuzzleHelper", () => {

    it("getValidSnakeDirections works", () => {
        /*
         * _ . .
         * 1 . _
         * _ _ _
         */
        // Given the target point is in the middle, it can only move down

        const neighbours: Neighbours<GridCell> = {
            top: GridCell.SNAKE,
            right: null,
            bottom: null,
            left: GridCell.POLY,
            topRight: GridCell.SNAKE,
            bottomRight: null,
            bottomLeft: null,
            topLeft: null,
        }

        const actual = PuzzleHelper.getValidSnakeDirections(neighbours);

        expect(actual.size).to.equal(1);

        expect(actual.first()).to.equal(SnakeDirection.bottom);
    });

    it("snakeLoopsImmediately works", () => {
        /*
         * _ . .
         * _ . .
         * _ _ _
         */
        // Given the target point is in the middle, the snake is looping

        const neighbours: Neighbours<GridCell> = {
            top: GridCell.SNAKE,
            right: GridCell.SNAKE,
            bottom: null,
            left: null,
            topRight: GridCell.SNAKE,
            bottomRight: null,
            bottomLeft: null,
            topLeft: null,
        }

        expect(PuzzleHelper.snakeLoopsImmediately(neighbours)).to.equal(true);
    });

    it("getSnakeLength works", () => {
        /*
          * . . 1 .
          * 1 . . .
          */

        let grid = new Grid(4, 2);

        grid = grid.fromArray([
            [GridCell.SNAKE, GridCell.SNAKE, 1, GridCell.SNAKE],
            [1, GridCell.SNAKE, GridCell.SNAKE, GridCell.SNAKE],
        ]);

        expect(PuzzleHelper.getSnakeLength(grid, new PointInt(0, 0))).to.equal(6);
    });

    it("countSnakeAdjacentSegments works", () => {
        /*
         * . 1 .
         * 1 . .
         * . . 1
         */
        // Given the target point is in the middle, it should only count horizontal 
        // and vertical adjacent, so there are 2 snake segments adjacent. 

        let grid = new Grid(3, 3);

        grid = grid.fromArray([
            [GridCell.SNAKE, 1, GridCell.SNAKE],
            [1, GridCell.SNAKE, GridCell.SNAKE],
            [GridCell.SNAKE, GridCell.SNAKE, 1],
        ]);

        expect(PuzzleHelper.countSnakeAdjacentSegments(grid, 1, 1)).to.equal(2);
    });

});