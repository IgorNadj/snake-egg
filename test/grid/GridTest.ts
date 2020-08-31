import { expect } from 'chai';
import { Grid } from '../../src/grid/Grid';
import { Set } from 'immutable';
import { PointInt } from 'polyomino';

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

    it('equals works', () => {
        let grid1: Grid<any> = new Grid(2, 2, [[1, 2], [null, null]]);

        let grid2: Grid<any> = new Grid(2, 2, [[null, 2], [null, 4]]);

        expect(grid1.equals(grid2)).to.be.false;
        expect(grid2.equals(grid1)).to.be.false;

        expect(grid1.equals(grid1)).to.be.true;
        expect(grid2.equals(grid2)).to.be.true;
    })

    it('cellsDifferent works', () => {
        let grid1: Grid<any> = new Grid(2, 2);
        grid1 = grid1.fromArray([[1, 2], [null, null]]);

        let grid2: Grid<any> = new Grid(2, 2);
        grid2 = grid2.fromArray([[null, 2], [null, 4]]);

        const diffSelf = grid1.cellsDifferent(grid1);

        expect(diffSelf.size).to.equal(0);

        const diffOneWay = grid2.cellsDifferent(grid1);
        const diffTheOtherWay = grid1.cellsDifferent(grid2);

        expect(diffOneWay.toArray()).to.deep.equal(diffTheOtherWay.toArray());

        expect(diffOneWay.size).to.equal(2);
        expect(diffOneWay.toJS()[0]).to.deep.equal(new PointInt(0, 0));
        expect(diffOneWay.toJS()[1]).to.deep.equal(new PointInt(1, 1));
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

    it("countAdjacentCells works", () => {
        /*
         * 1 0
         * 0 0
         */

        let grid: Grid<number> = new Grid(2, 2);
        grid = grid.fromArray([[1, 0], [0, 0]]);

        const numAdjacentZeros = grid.countAdjacentCells(1, 1, 0);

        expect(numAdjacentZeros).to.equal(2);
    });

    it("countAdjacentCells works with multiple", () => {
        /*
         * 1 9
         * 8 8
         */

        let grid: Grid<number> = new Grid(2, 2);
        grid = grid.fromArray([[1, 9], [8, 8]]);

        const numAdjacent8or9 = grid.countAdjacentCells(1, 1, [8, 9]);

        expect(numAdjacent8or9).to.equal(2);
    });

    it("orthogonallyConnectedRegions works", () => {
        /*
         * Grid:
         *
         *   _ 5 5
         *
         * has:
         *  - a 5 region in the top right (size 1),
         */
        const grid = new Grid<any>(3, 1, [
            [null, 5, 5],
        ]);

        const regions = grid.orthogonallyConnectedRegions(5);

        expect(regions.size).to.equal(1);

        expect(regions.toArray()[0].size).to.equal(2);
    });

    it("orthogonallyConnectedRegions works complex test", () => {
        /*
         * Grid:
         *
         *   5 _ 5 w 5 5
         *   _ 5 5 _ _ _
         *
         * has:
         *  - a 5 region in the top left (size 1),
         *  - a 5 region in the middle (size 3),
         *  - and a 5 region in the top right (size 2)
         */
        const grid = new Grid<any>(6, 2, [
            [5, null, 5, 'w', 5, 5],
            [null, 5, 5, null, null, null],
        ]);

        const regions = grid.orthogonallyConnectedRegions(5);

        expect(regions.size).to.equal(3);

        const regionsArr = regions.toArray();

        // top left region
        expect(regionsArr[0].size).to.equal(1);

        const firstPoint = regionsArr[0].cells.first(new PointInt(-1, -1)); // default just to appease the type monkey

        expect(firstPoint.equals(new PointInt(0, 0))).to.be.true;

        // middle region
        expect(regionsArr[1].size).to.equal(3);

        // top right
        expect(regionsArr[2].size).to.equal(2);
    });

    it("count works", () => {
        let grid: Grid<number> = new Grid(2, 2);

        grid = grid.fromArray([[1, 2], [2, 2]]);

        expect(grid.count(2)).to.equal(3);
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