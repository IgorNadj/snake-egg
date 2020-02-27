import { expect } from 'chai';
import { Polyomino, PointInt } from 'polyomino';
import { GeneratingPuzzle, GridCell, Neighbours } from "../../src/generator/GeneratingPuzzle";


describe("GeneratingPuzzle", () => {

  it("returns a new puzzle when placing a poly", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 1, 1);

    expect(originalPuzzle === newPuzzle).to.equal(false);
  });

  it("getGrid works", () => {
    let puzzle = new GeneratingPuzzle(2, 2, 1);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 0, 0);

    const grid = puzzle.getGrid();

    const expected = [
      [GridCell.POLY, GridCell.SNAKE],
      [GridCell.SNAKE, GridCell.SNAKE],
    ];

    expect(grid).to.deep.equal(expected);
  });

  it("getGridNeighbours works", () => {
    /*
     * 1 .
     * . .
     */

    let puzzle = new GeneratingPuzzle(2, 2, 1);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 0, 0);

    const grid = puzzle.getGrid();

    const neighbours = puzzle.getGridNeighbours(grid, 1, 0);

    const expected = {
      top: null,
      right: null,
      bottom: GridCell.SNAKE,
      left: GridCell.POLY,
      topRight: null,
      bottomRight: null,
      bottomLeft: GridCell.SNAKE,
      topLeft: null,
    };

    expect(neighbours).to.deep.equal(expected);
  });

  it("countSnakeAdjacentSegments works", () => {
    const puzzle = new GeneratingPuzzle(3, 3, 1);

    /*
     * . 1 .
     * 1 . .
     * . . 1
     */
    // Given the target point is in the middle, it should only count horizontal 
    // and vertical adjacent, so there are 2 snake segments adjacent. 

    const neighbours: Neighbours = {
      top: GridCell.POLY,
      right: GridCell.SNAKE,
      bottom: GridCell.SNAKE,
      left: GridCell.POLY,
      topRight: GridCell.SNAKE,
      bottomRight: GridCell.POLY,
      bottomLeft: GridCell.SNAKE,
      topLeft: GridCell.SNAKE,
    }

    expect(puzzle.countSnakeAdjacentSegments(neighbours)).to.equal(2);
  });

  it("getSnakeLength works", () => {
    /*
      * . . 1 .
      * 1 . . .
      */
    let puzzle = new GeneratingPuzzle(4, 2, 1);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 2, 0);
    puzzle = puzzle.place(poly, 0, 1);

    expect(puzzle.getSnakeLength(new PointInt(0, 0))).to.equal(6);
  });

});