import { expect } from 'chai';
import { Grid } from '../src/Grid';

describe("Grid", () => {

    it("get works", () => {
        let grid: Grid<number> = new Grid(3, 3);

        const actual = grid.set(0, 0, 5);

        expect(actual.get(0, 0)).to.equal(5);
    });

    it("set works", () => {
        const grid: Grid<number> = new Grid(3, 3);

        const actual = grid.set(0, 0, 5);

        expect(actual.get(0, 0)).to.equal(5);
    });

    it("setAll works", () => {
        const grid: Grid<number> = new Grid(2, 2);

        const actual = grid.setAll(5);

        expect(actual.get(0, 0)).to.equal(5);
        expect(actual.get(1, 0)).to.equal(5);
        expect(actual.get(0, 1)).to.equal(5);
        expect(actual.get(1, 1)).to.equal(5);
    });

    it("fromArray works", () => {
        const grid: Grid<number> = new Grid(2, 2);

        const actual = grid.fromArray([[1, 2], [3, 4]]);

        expect(actual.get(0, 0)).to.equal(1);
        expect(actual.get(1, 0)).to.equal(2);
        expect(actual.get(0, 1)).to.equal(3);
        expect(actual.get(1, 1)).to.equal(4);
    });

    it("toArray works", () => {
        let grid: Grid<number> = new Grid(2, 2);
        grid = grid.fromArray([[1, 2], [3, 4]]);

        expect(grid.toArray()).to.deep.equal([[1, 2], [3, 4]]);
    });


    it("getGridNeighbours works", () => {
        /*
         * 1 0
         * 0 0
         */

        let grid: Grid<number> = new Grid(2, 2);
        grid = grid.fromArray([[1, 0], [0, 0]]);

        const neighbours = grid.getGridNeighbours(1, 0);

        const expected = {
            top: null,
            right: null,
            bottom: 0,
            left: 1,
            topRight: null,
            bottomRight: null,
            bottomLeft: 0,
            topLeft: null,
        };

        expect(neighbours).to.deep.equal(expected);
    });

    it("is immutable", () => {
        const grid: Grid<number> = new Grid(3, 3);

        const grid2 = grid.set(0, 0, 5);

        expect(grid === grid2).to.equal(false);
        expect(grid.get(0, 0)).to.equal(null);
    });

    it("renders", () => {
        let grid: Grid<number> = new Grid(2, 2);
        grid = grid.set(0, 0, 5);

        expect(grid.render()).to.equal('5_\n__\n');
    });

});