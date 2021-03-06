import {expect} from 'chai';
import {PuzzleHelper, SnakeDirection} from '../../src/helper/PuzzleHelper';
import {Grid, Neighbours} from '../../src/grid/Grid';
import {GridCell, Puzzle} from '../../src/Puzzle';
import {PointInt} from 'polyomino';
import {EGG, HintCell} from '../../src/hinter/HintedPuzzle';


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

    it("getValidSnakeDirections works with eggs", () => {
        /*
         * _ . o
         * 1 . _
         * _ _ _
         */
        // Given the target point is in the middle, it can only move down

        const neighbours: Neighbours<HintCell> = {
            top: GridCell.SNAKE,
            right: null,
            bottom: null,
            left: GridCell.POLY,
            topRight: EGG,
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


    it("snakeLoopsImmediately works with eggs", () => {
        /*
         * _ . o
         * _ . .
         * _ _ _
         */
        // Given the target point is in the middle, the snake is looping

        const neighbours: Neighbours<HintCell> = {
            top: GridCell.SNAKE,
            right: GridCell.SNAKE,
            bottom: null,
            left: null,
            topRight: EGG,
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

    it("getSnakeLength works with eggs", () => {
        /*
          * o . 1 o
          * 1 . . .
          */

        let grid = new Grid(4, 2);

        grid = grid.fromArray([
            [EGG, GridCell.SNAKE, 1, EGG],
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

    it("countSnakeAdjacentSegments works with eggs", () => {
        /*
         * . 1 .
         * 1 . o
         * . . 1
         */
        // Given the target point is in the middle, it should only count horizontal 
        // and vertical adjacent, so there are 2 snake segments adjacent. 

        let grid = new Grid(3, 3);

        grid = grid.fromArray([
            [GridCell.SNAKE, 1, GridCell.SNAKE],
            [1, GridCell.SNAKE, EGG],
            [GridCell.SNAKE, GridCell.SNAKE, 1],
        ]);

        expect(PuzzleHelper.countSnakeAdjacentSegments(grid, 1, 1)).to.equal(2);
    });

    it("getSnakeEnds works", () => {
        /*
         * . .
         *   .
         * o . 1
         */
        // Given the above, ends are top left and bottom left

        const grid = new Grid(3, 3, [
            [GridCell.SNAKE, GridCell.SNAKE, null],
            [null, GridCell.SNAKE, null],
            [EGG, GridCell.SNAKE, 1],
        ]);

        const ends = PuzzleHelper.getSnakeEnds(grid);

        expect(ends.size).to.equal(2);

        expect(ends.toArray()[0].x).to.equal(0);
        expect(ends.toArray()[0].y).to.equal(0);

        expect(ends.toArray()[1].x).to.equal(0);
        expect(ends.toArray()[1].y).to.equal(2);
    });

    it("isSnakeHead works", () => {
        /*
         * . .
         *   .
         * o . 1
         */
        // Given the above, head is top left and bottom left

        const grid = new Grid(3, 3, [
            [GridCell.SNAKE, GridCell.SNAKE, null],
            [null, GridCell.SNAKE, null],
            [EGG, GridCell.SNAKE, 1],
        ]);

        expect(PuzzleHelper.isSnakeHead(grid, 0, 0)).to.be.true;
        expect(PuzzleHelper.isSnakeHead(grid, 1, 0)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 2, 0)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 0, 1)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 1, 1)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 2, 1)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 0, 2)).to.be.true;
        expect(PuzzleHelper.isSnakeHead(grid, 1, 2)).to.be.false;
        expect(PuzzleHelper.isSnakeHead(grid, 2, 2)).to.be.false;
    });

    it("getSnakeBody works", () => {
        /*
         * . .
         *   .
         * o . 1
         */
        // Given the above, body is middle column

        const grid = new Grid(3, 3, [
            [GridCell.SNAKE, GridCell.SNAKE, null],
            [null, GridCell.SNAKE, null],
            [EGG, GridCell.SNAKE, 1],
        ]);

        const body = PuzzleHelper.getSnakeBody(grid);

        expect(body.size).to.equal(3);

        expect(body.toArray()[0].x).to.equal(1);
        expect(body.toArray()[0].y).to.equal(0);

        expect(body.toArray()[1].x).to.equal(1);
        expect(body.toArray()[1].y).to.equal(1);

        expect(body.toArray()[2].x).to.equal(1);
        expect(body.toArray()[2].y).to.equal(2);
    });

});