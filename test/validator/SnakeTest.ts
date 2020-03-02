import { expect } from 'chai';
import { Polyomino } from 'polyomino';
import { Snake } from "../../src/validator/Snake";
import { GeneratingPuzzle } from '../../src/generator/GeneratingPuzzle';


describe("Snake", () => {

    it("fails empty puzzle", () => {
        const puzzle = new GeneratingPuzzle(5, 5, 3);
        expect(Snake.isValid(puzzle)).to.equal(false);
    });

    it("validates", () => {
        /*
         * 3 .
         * 3 .
         * 3 .
         */
        const puzzle = fillCells([[0, 0], [0, 1], [0, 2]], 2, 3);
        expect(Snake.isValid(puzzle)).to.equal(true);
    });

    it("allows snake to turn", () => {
        /*
         * 3 .
         * 3 .
         * . .
         */
        const puzzle = fillCells([[0, 0], [0, 1]], 2, 3);
        expect(Snake.isValid(puzzle)).to.equal(true);
    });

    it("fails when snake touches itself", () => {
        /*
         * . . 4 4
         * 1 . 4 4
         * . . . .
         * . 1 . 2
         * . . . 2
         */
        const puzzle = fillCells([
            [2, 0], [3, 0],
            [0, 1], [2, 1], [3, 1],
            [1, 3], [3, 3],
            [3, 4],
        ], 4, 5);
        expect(Snake.isValid(puzzle)).to.equal(false);
        /*
         * 2 . .
         * 2 . .
         */
        const puzzle2 = fillCells([
            [0, 0],
            [0, 1],
        ], 3, 2);
        expect(Snake.isValid(puzzle2)).to.equal(false);
    });

    it("alllows snake to touch itself diagonally", () => {
        /*
         * . . 6 6
         * 1 . 6 6
         * . . 6 6
         * . 1 . .
         * . . . 1
         */
        const puzzle = fillCells([
            [2, 0], [3, 0],
            [0, 1], [2, 1], [3, 1],
            [2, 2], [3, 2],
            [1, 3],
            [3, 4],
        ], 4, 5);
        expect(Snake.isValid(puzzle)).to.equal(true);
    });

    it("disallows multiple snakes", () => {
        /*
         * . 3 .
         * . 3 .
         * . 3 .
         */
        const puzzle = fillCells([[1, 0], [1, 1], [1, 2]], 3, 3);
        expect(Snake.isValid(puzzle)).to.equal(false);
        /*
         * . 5 .
         * . 5 5
         * . 5 5
         */
        const puzzle2 = fillCells([
            [1, 0],
            [1, 1], [2, 1],
            [1, 2], [2, 2],
        ], 3, 3);
        expect(Snake.isValid(puzzle2)).to.equal(false);

    });

    it("disallows looping snake", () => {
        /*
         * . . .
         * . 1 .
         * . . .
         */
        const puzzle = fillCells([
            [1, 1],
        ], 3, 3);
        expect(Snake.isValid(puzzle)).to.equal(false);
    });

    it("disallows multiple, looping snakes", () => {
        /*
         * . . .
         * . 1 .
         * . . .
         * 3 3 3
         * . . .
         * . 1 .
         * . . .
         */
        const puzzle = fillCells([
            [1, 1],
            [0, 3], [1, 3], [2, 3],
            [1, 5],
        ], 3, 7);
        expect(Snake.isValid(puzzle)).to.equal(false);
        /*
         * . . .
         * 3 3 3
         * . . .
         * . 1 .
         * . . .
         */
        const puzzle2 = fillCells([
            [0, 1], [1, 1], [2, 1],
            [1, 3],
        ], 3, 5);
        expect(Snake.isValid(puzzle2)).to.equal(false);
    });

    function fillCells(cells: Array<[number, number]>, width: number, height: number): GeneratingPuzzle {
        let puzzle = new GeneratingPuzzle(width, height, 5);
        for (let cell of cells) {
            puzzle = puzzle.place(Polyomino.get(1).first(), cell[0], cell[1]);
        }
        return puzzle;
    }

});