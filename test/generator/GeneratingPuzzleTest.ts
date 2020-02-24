import { expect } from 'chai';
import { Polyomino } from 'polyomino';
import { GeneratingPuzzle, GridCell } from "../../src/generator/GeneratingPuzzle";


describe("GeneratingPuzzle", () => {

  it("returns a new puzzle when placing", () => {
    const originalPuzzle = new GeneratingPuzzle(5, 5, 3);

    const poly = Polyomino.get(1).first();

    const newPuzzle = originalPuzzle.place(poly, 1, 1);

    expect(originalPuzzle === newPuzzle).to.equal(false);
  });

  it("can generate a grid", () => {
    let puzzle = new GeneratingPuzzle(2, 2, 1);

    const poly = Polyomino.get(1).first();

    puzzle = puzzle.place(poly, 0, 0);

    const grid = puzzle.getGrid();

    const expected = [
      [GridCell.POLY, GridCell.SNAKE],
      [GridCell.SNAKE, GridCell.SNAKE],
    ];

    expect(grid).to.deep.equal(expected);
  })

  it("can find neihbours to a grid cell", () => {
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
    };

    expect(neighbours).to.deep.equal(expected);
  })

  


});